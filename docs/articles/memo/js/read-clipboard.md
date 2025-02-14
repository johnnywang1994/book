# 如何用 Web API 讀取剪貼簿內容

## 可用方法
- [navigator.clipboard.readText](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/readText)
- [navigator.clipboard.read](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/read)

### 注意
透過手機瀏覽器功能中的『分享 -> 拷貝』 寫入剪貼簿的內容，不是單純的文字。故如果用 readText() 讀取的話，只會取到空字串。需要透過 read() 取得 [ClipboardItem](https://developer.mozilla.org/en-US/docs/Web/API/ClipboardItem)，並將 blob 判斷後轉換格式

```js
try {
  const clipboardItems = await navigator.clipboard.read();

  for (const clipboardItem of clipboardItems) {
    for (const type of clipboardItem.types) {
      if(type === 'text/plain' || type === 'text/uri-list'){
        const blob = await clipboardItem.getType(type);
        const text = await blob.text();
        console.log('text: ', text);
      }
    }
  }
} catch (error) {
  console.log(error);
}
```

## 支援度
| <div style="width:140px">瀏覽器</div> | 行為 | 備註 |
| -------- | -------- | -------- |
| **Desktop**     |      |      |
| Chrome     | 跳出要求權限的彈窗     | 使用者拒絕後，要打開不容易 |
| Safari     | 點擊按鈕後，需再點系統的“貼上”     | 每次點擊的行為都一樣 |
| Firefox     |  ❌    |      |
| **Mobile - iOS**     |      |      |
| LIFF     |  點擊按鈕後，需再點系統的“貼上”    |  |
| IAB      |  點擊按鈕後，需再點系統的“貼上”   |   同上   |
| Safari   |  點擊按鈕後，需再點系統的“貼上”    |  同上    |
| **Mobile - Android**     |      |      |
| LIFF     |  ❌    |      |
| IAB     |   ❌   |      |
| Chrome     |  跳出要求權限的彈窗   |  使用者拒絕後，要打開不容易  |