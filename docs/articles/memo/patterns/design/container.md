# Container/Presentational Component

<SocialBlock hashtags="design,pattern,container,presentational" />

## 前言
大家好，我是 Johnny，今天要紀錄分享的是 Patterns 筆記系列的 `Container/Presentational Pattern`


## 介紹
`Container/Presentational Pattern` 是透過明確區分 view 關注點分離，其中：
- Presentational Components: 關注於「HOW」顯示資料，由外部給予資料，並輸出 UI
- Container Components: 關注於「WHAT」資料需要給予用戶使用，主要獲取資料，並控制資料的下放位置

```js
import { useState, useEffect } from 'react';

// Presentational
function DogImages({ dogs }) {
  return dogs.map((dog, i) => <img src={dog} key={i} alt="Dog" />);
}

// Container
function DogImagesContainer() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch("https://dog.ceo/api/breed/labrador/images/random/6")
      .then(res => res.json())
      .then(({ message }) => setDogs(message));
  }, []);

  return (
    <DogImages dogs={dogs} />
  );
}
```


## 結合 hooks 使用
透過 hooks 我們可以快速取代這種模式，或是將這種模式運用得更高效

```js
import { useState, useEffect } from 'react';

export default function useDogImage() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch("https://dog.ceo/api/breed/labrador/images/random/6")
      .then(res => res.json())
      .then(({ message }) => setDogs(message));
  }, []);

  return dogs;
}
```

```js
import useDogImages from './useDogImages';

export default function DogImages() {
  const dogs = useDogImages();

  return dogs.map((dog, i) => <img src={dog} key={i} alt="Dog" />);
}
```

<SocialBlock hashtags="design,pattern,container,presentational" />

## 結論
雖然目前 hooks 可以直接取代這種模式，但在大型專案中，透過把資料獲取位置以及使用位置區分開來，不僅可以提高 component 的複用性，也可以讓資料獲取的能力抽離到 hooks 中提升邏輯的複用性，在實作上可以提升整個程式碼的架構品質

今天分享就到這拉～下篇見！=V=