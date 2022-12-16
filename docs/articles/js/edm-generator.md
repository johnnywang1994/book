# 開發 Email EDM 你可以更輕鬆

<SocialBlock hashtags="javascript,typescript,email,edm,premailer,gulp" />

嗨，大家好我是 Johnny，今天要來帶大家認識一個偶爾會碰到的開發需求 `Email EDM`。

這個需求通常內容都不多，就一頁，但碰到時總覺得像雞肋一樣，明明內容不多，但卻常常搞得人仰馬翻，網路上找的資源又殘缺不全，明明感覺內容很少很簡單，但就因為搞不清楚限制而到處踩坑。


## 前言
最近想起之前開發 Email EDM 的恐懼，相信有開發過 EDM 需求的工程師一定都碰過以下這些問題
  - 什麼？你說 Email EDM 居然不能用 `<link>`？
  - 什麼？`<style>` 只能放在 `head` 裡？而且為啥有的 email 服務甚至連 `<style>`標籤都不能用？
  - 什麼？為啥有的 email 服務只把 body 裡的東西拿出去用？
  - 什麼？為啥有的 email 服務直接無視我設定的 `doctype` 自己亂插入內容？
  - 什麼？為啥我的 `id`, `class` 都被移除了！？我的精美樣式呢？

通常搞半天，最後為了做到最大相容所有 email 服務，還必須寫 `inline style`...... 天阿!!!!


## Email EDM 開發限制
要開發之前，首先必須釐清每個 Email 服務商是怎麼處理 HTML, CSS style 部分的，由於限制非常混亂，對詳細限制有興趣的朋友可以參考下面這些連結內容
- [HTML <!DOCTYPE>](https://www.w3schools.com/tags/ref_html_dtd.asp)
- [Which doctype should you use in HTML emails](https://www.hteumeuleu.com/2016/which-doctype-should-you-use-in-html-emails/)
- [Designing HTML Emails Tutorial](https://www.youtube.com/watch?v=vsQmiTe_GLQ)
- [style in head](https://www.campaignmonitor.com/css/style-element/style-in-head/)
- [How to make css play nice in html emails](https://customer.io/blog/how-to-make-css-play-nice-in-html-emails-without-breaking-everything/)

懶得看連結文章的朋友也可以看這邊的總結
- 關於 `HTML Doctype`，由於每個 Email 服務商在實作上不同，即使你設定了，也不一定會套用你的設定，一般建議就照常設定簡短的 HTML5 的版本即可，這部分真的沒有統一
- external style 的 `<link>` 基本上會載入東西的會被屏蔽，而 internal style 的 `<style>` 則根據 Email 服務商不同，目前 Gmail 可以在 `<head>` 中使用，但仍然會檢查其內容，檢查不合格的語法會直接忽略。
- CSS 支援語法的部分，也是根據服務商不同，可用的屬性語法也不太相同，具體可以在使用前透過 [CanIEmail](https://www.caniemail.com/) 查詢一下相容性

> 連結文章有些內容較舊了，目前主流 Email 服務像是 [Gmail](https://developers.google.com/gmail/design/css) 其實都支援在 `<head>` 的 `<style>`標籤中使用 CSS，但也還是有限制，其中的 CSS 內容必須是 valid 的，invalid 語法內容會被無情忽略，我相信大部分人是不會知道每個服務商究竟如何判斷 valid, invalid，也因此到目前為止，撰寫 Email EDM 最安全的方法還是 `inline style`（除非你真的很懶得理其他非主流 Email 服務商，那就放膽用吧！）


## 具體安全作法
綜上所述，目前最安全保守的方法就還是使用 `inline css`，也就是在 HTML 標籤上直接寫 `style="xxx"`，然而這種方式寫起來也是最廢時間、費力氣的，重複樣式出現的場景，只要需求改一個字體大小都會讓你想哭爹叫娘，即使你用 `ctrl + D` 全選也很難應對所有情況，譬如你只要改 `a` 標籤的字體大小，但偏偏某些 `span` 也設定了同樣的大小，此時你就必須要捲起袖子一行一行選了顆顆...比如下面這樣

```html
<div style="max-width: 600px; margin: 0 auto; text-align: center">
  <h1 style="margin: 0;font-size: 2em">My Cool EDM</h1>
  <p style="margin: 0;font-size: 1em">This is something very hard to write</p>
  <a href="https://www.google.com" target="_blank" style="color: lightblue; font-size: 1em; text-transform: underline">Go to Google</a>
  <img src="https://fake.test-img.jpg" style="display: block; max-width: 100%" />
  <img src="https://fake.test-img2.jpg"
  style="display: block; max-width: 100%" />
</div>
```

光是兩張圖片就已經搞得我眼花撩亂，更何況你今天要開發的就算只有一頁，如果包含了完整的 header, footer需要動到 CSS Layout，絕對讓你寫到嗨翻天


## Email EDM 救星 - Premailer
這邊推薦大家一款線上編譯的服務叫做 [Premailer](https://premailer.dialect.ca/)，他是一款能夠幫助你把 HTML 中載入的 `<link>`, `<style>`，自動帶入到你寫的 HTML 標籤中，編譯後會自動把 class 裡面的樣式合併到你 HTML tag 中的行內樣式，也因此我們可以直接照常使用 class, style, link 來撰寫我們的 HTML，最後要發送之前，再一次性把他轉為 inline style

- 比如下面這樣的 HTML
```html
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>My EDM</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
    <style>
    h1, p {
      margin: 0;
    }

    p {
      font-size: 1em;
    }

    img {
      display: block;
      max-width: 100%;
    }

    .container {
      margin: 0 auto;
      text-align: center;
    }
    </style>
  </head>
  <body>
    <div class="container" style="max-width: 600px">
      <h1>Hello Title</h1>
      <p>A beautiful picture</p>
      <img src="https://fake.img.com/test.jpg" alt="image not found"/>
    </div>
  </body>
</html>
```
- 經過 `Premailer` 編譯後如下（勾選了 `Remove classes`, `Remove unused IDs`, `Remove comments` 功能）
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html style="line-height: 1.15; -webkit-text-size-adjust: 100%;">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>My EDM</title>
    <style>
      body {
        margin: 0;
      }
      img {
        border-style: none;
      }
      img {
        display: block;
        max-width: 100%;
      }
    </style>
  </head>
  <body style="margin: 0;">
    <div style="max-width: 600px; margin: 0 auto;" align="center">
      <h1 style="font-size: 2em; margin: 0;">Hello Title</h1>
      <p style="font-size: 1em; margin: 0;">A beautiful picture</p>
      <img src="https://fake.img.com/test.jpg" alt="image not found" style="display: block; max-width: 100%; border-style: none;">
    </div>
  </body>
</html>
```

可以看到 Premailer 幫我們把 `.container` 自動轉為了行內樣式，甚至還自動把 `text-center` 轉為 `align="center"` 了，所有其他標籤也都自動帶入了我們在 `normalize.css` 裡的設定，為了使相容性更高，Premailer 還是有把 `head` 中的 `<style>` 保留下來並套用一些較為安全的 css 在內，整體而言算是大幅減少了開發者一行一行重複操作的麻煩時間，誠心推薦


## 全自動化 EDM 生產環境
如果你對於還需要把 HTML 複製貼上去網頁上轉換還是不滿的話，那歡迎試試我製作的 [edm-generator](https://github.com/johnnywang1994/edm-generator)，只需要透過 `git clone` 或是 ZIP 下載到本機中，就可以快速無痛使用 Pug 或是 HTML + Premailer 快速在本地開發摟～，打包時會自動通過 API 呼叫把你的內容傳給 premailer 編譯再放回來，也就不需要另外開啟網頁手動複製貼上了。


<SocialBlock hashtags="javascript,typescript,email,edm,premailer,gulp" />

## 結論
這次整理了一下目前有關於 Email EDM 的一些小小研究，也順手寫了一個小工具方便日後開發使用，也歡迎各位有興趣的朋友下載玩玩看摟，希望這篇文章可以幫助到更多在開發 Email EDM 時遇到困難的朋友們

感謝大家收看，下篇文章見摟 =V=~

