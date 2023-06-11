# Rendering Patterns 渲染模式介紹
在日常網頁開發當中，除了程式碼相關撰寫的一些模式外，由於牽涉到實際網頁畫面還有一個重要因素「渲染」，針對網頁畫面渲染的相關開發實踐與作法被稱作「渲染模式 Rendering Patterns」


## 渲染模式的重要性
為了完成達成更好的網頁 UX 體驗，開發者們常會試圖去最佳化一些衡量網頁效能的指標「Core Web Vitals (CWV)」如下圖所示，藉此提升更好的使用者體驗
![](https://www.patterns.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddxwdqwkr%2Fimage%2Fupload%2Ff_auto%2Fv1660456914%2Fpatterns.dev%2Fweb-vitals.png&w=3840&q=75)

而為了盡可能的優化這些指標，工程師們總結、製作出許多能夠達到這些 UX 需求，並最佳化 DX 開發體驗（如下圖所示）的工具、開發環境
![](https://www.patterns.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddxwdqwkr%2Fimage%2Fupload%2Ff_auto%2Fv1658990025%2Fpatterns.dev%2F5.png&w=3840&q=75)

透過使用這些開發環境、模式，開發者能更快、更有效，並且確實的製作出優良 UX 的產品來，這種`由 UX 推導出 DX` 的過程，催生出了許多不同的「渲染模式」，如下圖所示
![](https://www.patterns.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddxwdqwkr%2Fimage%2Fupload%2Ff_auto%2Fv1658990025%2Fpatterns.dev%2F6.png&w=3840&q=75)


## 如何選擇渲染模式
各種「渲染模式」不僅僅只是一個模式，每個渲染模式背後都有一套其所對應重視的 UX 體驗邏輯，並沒有一個絕對的優劣（當然，全世界很多高階架構工程師們，正持續在努力鑽研，試圖找尋出一個絕對優化的真理渲染模式，但單純就目前而言都還在比較與嘗試中）

Chrome 團隊推薦開發者使用靜態或伺服器端渲染模式，而非 [`full rehydration`](https://en.wikipedia.org/wiki/Hydration_(web_development)) 的方式

以下簡單介紹幾種常見的「渲染模式」

## Static Rendering - 靜態渲染
![](https://www.patterns.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddxwdqwkr%2Fimage%2Fupload%2Ff_auto%2Fv1658990025%2Fpatterns.dev%2Fimg1.png&w=3840&q=75)
靜態呈現是一種簡單而強大的模式，用來構建具有幾乎`即時頁面加載`的快速網站，整個 HTML 頁面在構建階段生成（通常稱作 build），並在下一次的 build 前內容不會更改，也因此這種純靜態內容能夠緩存在 CDN 或邊緣網絡上，大幅提升網頁載入的速度

> 靜態渲染適用於內容不需頻繁更動，並且不論觀看者是誰都一律顯示相同內容的網頁，比如電子報、電子廣告等等


### 1. Basic/Plain Static Rendering - 基本/普通靜態渲染
由於現代網頁中常常需要一些動態的自定義內容，也因此「靜態渲染」模式有許多`變體`，其中如上述所說，內容在 build 時就已經構建完成，網頁在使用者請求後直接拿到靜態 HTML 內容進行渲染，並透過 bundle JS 整合就完成載入，又稱作`「Plain Static Rendering」`

這種模式在 `FCP`, `LCP` 方便表現出色，因為內容完全是靜態渲染，也就不會出現 layout shift（佈局偏移）

但大多數情況下，多數的網站（即便像官方網站）為了方便，都還是不可避免的需要載入一些動態內容，也因此出現下面這種變體

![](https://www.patterns.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddxwdqwkr%2Fimage%2Fupload%2Ff_auto%2Fv1658990025%2Fpatterns.dev%2F8.png&w=3840&q=75)

### 2. Static with Client-Side fetch
![](https://www.patterns.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddxwdqwkr%2Fimage%2Fupload%2Ff_auto%2Fv1658990025%2Fpatterns.dev%2F9.png&w=3840&q=75)
假設我們需要製作一個新聞列表區塊，其中新聞內容是動態更動的內容，此時就可以透過這種`靜態渲染搭配 Client-Side fetch` 的模式來讓每個用戶請求獲取最新動態內容，同樣透過靜態渲染的方式預先構建頁面，但針對需要動態替換的 UI 位置，提供 Skeleton 骨架，在頁面載入後使用動態的內容進行替換，如下圖使用 `useSWR` 範例
![](https://www.patterns.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddxwdqwkr%2Fimage%2Fupload%2Ff_auto%2Fv1658990025%2Fpatterns.dev%2F10.png&w=3840&q=75)

這種模式下，用戶載入預生成的靜態 HTML 畫面後，最初會看到動態內容的部分呈現 loading 的樣式佈局，接著 Client-Side 發出 API 請求拿到內容，最終動態內容替換在對應的位置上，流程如下圖
![](https://www.patterns.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddxwdqwkr%2Fimage%2Fupload%2Ff_auto%2Fv1658990025%2Fpatterns.dev%2F12.png&w=3840&q=75)

> 雖然是靜態渲染，對於 `TTFB`, `FCP` 仍有不錯表現，但 `LCP` 將不會是最佳狀態，因為`最大內容` 只能在 API 請求後才能顯示，並且如果 Skeleton UI 無法 match 到動態內容渲染後的佈局，將有更大機率發生 layout shift，除此之外因為每次載入都必須進行 API 請求，也會讓 server 端運行成本更高

![](https://www.patterns.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddxwdqwkr%2Fimage%2Fupload%2Ff_auto%2Fv1658990025%2Fpatterns.dev%2F13.png&w=3840&q=75)

### 3. Static with getStaticProps(Pre-Render)
![](https://www.patterns.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddxwdqwkr%2Fimage%2Fupload%2Ff_auto%2Fv1658990025%2Fpatterns.dev%2F14.png&w=3840&q=75)
這種模式與上一個介紹的最大區別在於，API 請求是在 server 端 build 構建階段進行，並將內容直接用於產出靜態 HTML，藉此消除 Client-Side fetch 請求，最終結果與 `Plain Static Rendering` 相似
![](https://www.patterns.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddxwdqwkr%2Fimage%2Fupload%2Ff_auto%2Fv1658990025%2Fpatterns.dev%2F17.png&w=3840&q=75)
> 隨著網站規模增大，將漸漸不適合使用這模式，因為在構建階段請求的 API 數量將導致 `build 時間拉長`，如果使用的是第三方 API，更可能觸發 `request limit` 或是龐大帳單費用，並且此方法也僅是適用於動態內容本身也不常變動的情況下，畢竟`頻繁的更新內容就表示頻繁多餘的構建次數`

### 4. Incremental Static Regeneration（ISR）- 增量靜態再生
![](https://www.patterns.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddxwdqwkr%2Fimage%2Fupload%2Ff_auto%2Fv1658990025%2Fpatterns.dev%2F18.png&w=3840&q=75)
這個模式主要解決前面提到的 build 時間長、動態內容的問題，透過混合的方式，僅呈現某些靜態頁面，並根據用戶的需求動態載入需要的動態內容，藉此減少了 build 構建時間，並`允許在特定時間後使緩存失效重新構建頁面`

以 NextJS 舉例可以在 `getStaticProps` 中加入 `revalidate` 控制 static cache 的失效時間，並在失效後透過 serverless function 重新構建一次靜態頁面
![](https://www.patterns.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddxwdqwkr%2Fimage%2Fupload%2Ff_auto%2Fv1658990025%2Fpatterns.dev%2F22.png&w=3840&q=75)

> 用戶如果取得一個失效的靜態頁面時，最初仍將看到舊的頁面，同時觸發 server 重新構建，一旦頁面在 server 端重新構建完成，舊的緩存才會失效並使用最新生成的頁面進行更新

使用增量靜態重新生成，我們可以通過每隔幾秒自動重新驗證頁面來顯示動態內容。雖然已經解決了許多問題，但仍然有美中不足的地方
- 「動態內容可能不會像我們定義的間隔那樣頻繁更新，這將導致`不必要的頁面重新生成`和`緩存失效`，進而導致更高的服務器成本」

![](https://www.patterns.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddxwdqwkr%2Fimage%2Fupload%2Ff_auto%2Fv1658990025%2Fpatterns.dev%2F23.png&w=3840&q=75)


### 5. On-demand ISR
![](https://www.patterns.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddxwdqwkr%2Fimage%2Fupload%2Ff_auto%2Fv1658990025%2Fpatterns.dev%2F24.png&w=3840&q=75)
為了解決上述提到 ISR 的 `revalidate` 問題，透過定義「特定的 event」來 trigger 頁面重新構建，而不是單純透過一個固定時間來進行，如下圖所示，由外部觸發（server）針對某一個指定路徑頁面進行 revalidate
![](https://www.patterns.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddxwdqwkr%2Fimage%2Fupload%2Ff_auto%2Fv1658990025%2Fpatterns.dev%2F25.png&w=3840&q=75)

如此一來避免掉原本 ISR 模式多餘的 revalidate 效能消耗
![](https://www.patterns.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddxwdqwkr%2Fimage%2Fupload%2Ff_auto%2Fv1658990025%2Fpatterns.dev%2F26.png&w=3840&q=75)


### 靜態渲染總結
總體而言，靜態生成是一種高效的模式，其變體，尤其是 ISR，可以涵蓋各種使用情境，使我們能夠以合理的成本擁有始終在線的快速動態網站。

但對於某些場景，靜態渲染並不是最佳選擇，例如對於每個用戶都不同的高度動態、個性化的頁面


## Server Side Rendering - 伺服器端渲染
![](https://www.patterns.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddxwdqwkr%2Fimage%2Fupload%2Ff_auto%2Fv1658990025%2Fpatterns.dev%2F27.png&w=3840&q=75)

...to be continue