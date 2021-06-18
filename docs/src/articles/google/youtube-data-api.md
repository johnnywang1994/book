# Youtube Data API 基礎使用筆記

Youtube API 也屬於 Google API 的內容，故使用時必須在 Google API 相關 console 後台裡進行事先設定。

使用方式有兩種，這篇介紹的是利用 API Key 進行調用。


## Environment

1. **選擇/創建專案**

首先前往 [Google API console 頁面](https://console.developers.google.com/projectselector2/apis/dashboard)，點擊上方 `Select a project` 按扭，若還沒有任何專案，請建立一個新的專案即可。

2. **開啟 API 權限**

建立完 Project 之後，選擇左邊側邊欄的 `Library` 畫面，搜尋 `Youtube Data API`，找到後點擊進入，最後按下藍色按鈕的 `Enable` 開啟該新建專案的權限。開啟後會看到該專案使用此 API 的相關統計資料表單。

3. **建立 APIKey**

選擇左側欄的 `Credentials`，點擊上方 `＋ Create Credentials`，選擇創建新 `API Key`，複製並儲存該 key，在後續調用 `Youtube Data API` 時必須用到。


## Usage

前往 [Youtube Data API](https://developers.google.com/youtube/v3/docs) 頁面，這邊以 Videos 裡的 list 舉例，前往 [Videos](https://developers.google.com/youtube/v3/docs/videos/list) 分頁後，其中必填 params 為 `part`, `id`, `key`，分別用來設定以下內容：

| param | content |
| -- | -- |
| part | 設定需要取得的內容範圍(snippet) |
| id | 設定需要取得的影片 id |
| key | 調用 api 的 project API Key ｜

因為這個 api 使用 get 調用，可以直接在瀏覽器上輸入如下：
`https://www.googleapis.com/youtube/v3/videos?part=snippet&key=[YOUR API KEY]&id=[Video ID]`
就可以調用到該影片相關資訊，包含`標題`及`縮圖`等等。

也可以一次大量取得許多 id 的影片資訊，只需要將 id 的等號右邊，以 `,` 號將 id 分隔串連起來即可。