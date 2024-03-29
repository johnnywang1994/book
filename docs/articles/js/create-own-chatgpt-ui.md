# 動手自己做一個 ChatGPT UI 工具吧


## 介紹
Hi 大家好，我是 Johnny。好久不見，最近工作上專案十分繁忙，一直沒空玩玩新的東西，今天這篇是我在學習使用 ChatGPT 的 API 後，開發了一個簡單的 UI 介面紀錄


## OpenAI Api 使用感想
這次使用的是 ChatGPT 的 API，使用上非常方便，可以客製化你要的 AI 回答方式、使用的 model 等，而這次的目標就是把大部分比較有意義的參數設定，搬到我的 UI 介面中，讓使用者可以根據需要隨時調整 AI，並添加了 system prompt 的能力，幫助提出更精準的問題，得到更好的回答內容


## API 串接細節
這次學習過程中，發現 ChatGPT 的 API 其實已經改版過，而網路上很多資源的內容還是關於舊版的（未來某天我的這篇也會變成舊版...，我會盡量保持更新哈哈）

### messages 紀錄
ChatGPT 目前不會自動儲存你跟 AI 的對話，每次發送 api 時，必須手動把需要的對話內容一起送進 `messages` 參數，提供給 AI 作為回答的材料，不然每次提問如果都只給他當前的問題，他都會像失智老人一樣忘記你跟他前面到底討論了什麼

### frequency_penalty vs presence_penalty
- frequency_penalty: 頻率懲罰
數值介於 -2 ~ 2，正的數值會讓 chatgpt 在每次使用同一個 token 時，進行懲罰，假設數值是 1，那原本 token 分數是 100，前面回答過2次 apple，那在後續回答時，再次出現 apple 的分數會是 100 - 2*1，也就是 98

- presence_penalty: 存在懲罰
數值介於 -2 ~ 2，正的數值會讓 chatgpt 在使用一個 token 時後進行懲罰，但只懲罰一次，假設數值是 1，apple 出現過 1次，那後續這個詞的分數都會是 100 - 1，也就是 99，不管 apple 出現幾次都是一樣

### max_tokens 最大回覆 token
這個參數只設定回覆的長度，並不包含用戶提出的問題內容長度，所以最終 api 呈現的使用 total_tokens 可能會大於這數字，並不是 ChatGPT 偷吃 token 喔！（所以如果你不限制傳送的 messages 歷史紀錄長度，總是把所有垃圾都一起送給 GPT，那你的 token 就會超級快速消失，除非你就是要 AI 記得你們之間的所有對話點點滴滴）


## 作品呈現
這次做的最終產品在這邊[Maju GPT UI](https://public-gpt.maju-web.club/)，歡迎有興趣的讀者可以去玩玩看喔，原始碼也開給大家參考 [johnnywang1994/maju-gpt-ui](https://github.com/johnnywang1994/maju-gpt-ui)

這次製作除了加入了深色模式，也同時加入了兩種 deploy 方式，可以自己 host 一個 server，也可以像我的 Demo 一樣透過 serve static bundle 的方式，讓用戶自己輸入 API Key 使用


## 結論
以前都覺得 AI 離自己很遙遠，但實際使用了 ChatGPT 的 API 後覺得，AI 這東西實際可能比大家想像的要更快融入大家的生活中，更多的開發者加入壯大整個社群，雖然我也只是搞了一個複製品ＸＤ，但實際用起來覺得真是太酷了～今天就分享到這拉，掰掰～