# Web URL 中神奇的 createObjectURL method
###### tags: `javascript,typescript,createObjectURL`

<SocialBlock hashtags="javascript,typescript,createObjectURL" />


大家好，我是 Johnny，今天這篇是最近我在公司內部分享的內容，也分享給大家～主要是介紹一個好用的 Web URL API - `createObjectURL`


## 什麼是 createObjectURL

- 建立一個帶有 URL 的 DOMString 以代表參數中所傳入的物件
- 生命週期與創造它的 window 中的 document 相同
- 此物件 URL 代表了所指定的 File 物件、 Blob 物件「參考」

> 1. 每次呼叫 createObjectURL 都會產生一個新的 URL
> 2. 雖然在 window unload 時瀏覽器會自動釋放記憶體，但建議當物件不再被使用時，手動透過 URL.revokeObjectURL() 釋放記憶體，藉此最佳化效能與記憶體用量，具體 `revoke` 時機可[參考這篇](https://stackoverflow.com/a/49346614/2313004)。


### 基本用法
```jsx
// create url "reference" to the fileObject
const url = URL.createObjectURL(fileObject);
// revoke url
URL.revokeObjectURL(url);
```


### 應用 1. 圖片上傳預覽
```jsx
const App = () => {
  const [previewImage, setPreviewImage] = useState();

  const onFileChange = (e) => {
      // ...
  };

  return (
    <>
      <input type="file" onChange={onFileChange} />
      <br />
      {previewImage && <img src={previewImage} />}
    </>
  );
};
```

#### FileReader
- need to create `FileReader` instance
- slow, need to read the whole file as a base64 data URL
- more memory cost
```jsx
const App = () => {
  const [previewImage, setPreviewImage] = useState();

  const onFileChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      // data:image/jpeg;base64,.....
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // ...
};
```


#### createObjectURL
- no need to create anything
- fast, just a reference url to file
- low memory usage
```jsx
const App = () => {
  const [previewImage, setPreviewImage] = useState();

  const onFileChange = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setPreviewImage(url);
  };
  
  // ...
};
```


### 應用 2. Canvas 轉存下載（僅示範）
```jsx
const App = () => {
  const canvasRef = useRef(null);

  const download = (url) => {
    let a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'test');
    a.click();
  };

  const onDownload = (e) => {
     // ...
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";
    ctx.strokeText("Hello World", 10, 50);
  }, []);

  return (
    <>
      <button onClick={onDownload}>Preview</button>
      <div>
        <h5>Canvas:</h5>
        <canvas ref={canvasRef} />
      </div>
    </>
  );
};
```

#### toDataURL
- synchronous and will block UI while doing the different operations, see [Discussion](https://stackoverflow.com/a/59025746)
- slow
- more memory cost
```jsx
const App = () => {
  const canvasRef = useRef(null);

  const onPreview = () => {
    const url = canvasRef.current.toDataURL('image/png', 1.0);
    download(url);
  };

  // ...
};
```

#### createObjectURL
```jsx
const App = () => {
  const canvasRef = useRef(null);

  const onPreview = () => {
    canvasRef.current.toBlob((blob) => {
      download(URL.createObjectURL(blob));
    });
  };

  // ...
};
```


### 應用 3. 即時編譯
```jsx
// index.js
export const sum = (a, b) => {
  return a + b;
};

export default {
  msg: 'hello world'
};
```

```html
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script type="my-module" id="entry" src="index.js"></script>
<script>
  // get our module
  const rawScript = document.querySelector('#entry');
  const url = rawScript.getAttribute('src');

  // request for content
  const request = new XMLHttpRequest();
  request.open('GET', url, false);
  request.send(null);
  
  // compile content
  const { code } = Babel.transform(request.responseText, {
    presets: [
      Babel.availablePresets.react,
    ],
    filename: url,
  });

  // module
  const myModule = new Blob([code], {
    type: 'text/javascript',
  });
  const blobUrl = URL.createObjectURL(myModule);

  // replace script
  const myScript = document.createElement('script');
  myScript.type = 'module';
  myScript.src = blobUrl;
  rawScript.parentNode.replaceChild(myScript, rawScript);
</script>

<script type="module">
  (async () => {
    const { sum } = (await import(blobUrl)).default;
    document.getElementById('output').innerHTML = `1 + 1 = ${sum(1, 1)}`;
  })();
</script>
```


## 特殊情況
### 三星 Browser 無法長按下載 blob url image
筆者實際在日常工作開發中遇過一個特殊情況，場景是在三星 Browser 中使用 canvas 的 toBlob 轉為 image blobUrl，並將該 blobUrl 給到 img tag 渲染，目標是讓用戶能夠長按圖片下載，然後實測後發現，blob image url 在長按後的 menu 不會出現 "Save Image" 按鈕，然而 https, base64 等格式都會正常出現，如果是要在這種場景使用 `createObjectURL` 請優先考慮是否要兼容三星 Browser！！

<SocialBlock hashtags="javascript,typescript,createObjectURL" />
