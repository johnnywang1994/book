import{_ as r,r as n,o as s,c,d as e,e as o,a as d,f as a}from"./app-da643460.js";const l={},i=e("h1",{id:"youtube-data-api-基礎使用筆記",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#youtube-data-api-基礎使用筆記","aria-hidden":"true"},"#"),o(" Youtube Data API 基礎使用筆記")],-1),p=e("p",null,"Youtube API 也屬於 Google API 的內容，\b故使用時必須在 Google API 相關 console 後台裡進行事先設定。",-1),h=e("p",null,"使用方式有兩種，這篇介紹的是利用 API Key 進行調用。",-1),u=e("h2",{id:"environment",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#environment","aria-hidden":"true"},"#"),o(" Environment")],-1),_=e("ol",null,[e("li",null,[e("strong",null,"選擇/創建專案")])],-1),b={href:"https://console.developers.google.com/projectselector2/apis/dashboard",target:"_blank",rel:"noopener noreferrer"},g=e("code",null,"Select a project",-1),m=a('<ol start="2"><li><strong>開啟 API 權限</strong></li></ol><p>建立完 Project 之後，選擇左邊側邊欄的 <code>Library</code> 畫面，搜尋 <code>Youtube Data API</code>，找到後點擊進入，最後按下藍色按鈕的 <code>Enable</code> 開啟該新建專案的權限。開啟後會看到該專案使用此 API 的相關統計資料表單。</p><ol start="3"><li><strong>建立 APIKey</strong></li></ol><p>選擇左側欄的 <code>Credentials</code>，點擊上方 <code>＋ Create Credentials</code>，選擇創建新 <code>API Key</code>，複製並儲存該 key，在後續調用 <code>Youtube Data API</code> 時必須用到。</p><h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h2>',5),y={href:"https://developers.google.com/youtube/v3/docs",target:"_blank",rel:"noopener noreferrer"},I={href:"https://developers.google.com/youtube/v3/docs/videos/list",target:"_blank",rel:"noopener noreferrer"},f=e("code",null,"part",-1),A=e("code",null,"id",-1),P=e("code",null,"key",-1),v=a("<table><thead><tr><th>param</th><th>content</th></tr></thead><tbody><tr><td>\bpart</td><td>設定需要取得的內容範圍(snippet)</td></tr><tr><td>id</td><td>設定需要取得的影片 id</td></tr><tr><td>key</td><td>調用 api 的 project API Key ｜</td></tr></tbody></table><p>因為這個 api 使用 get 調用，可以直接在瀏覽器上輸入如下： <code>https://www.googleapis.com/youtube/v3/videos?part=snippet&amp;key=[YOUR API KEY]&amp;id=[Video ID]</code> 就可以調用到該影片相關資訊，包含<code>標題</code>及<code>縮圖</code>等等。</p><p>也可以一次大量取得許多 id 的影片資訊，只需要將 id 的等號右邊，以 <code>,</code> 號將 id 分隔串連起來即可。</p>",3);function k(x,V){const t=n("ExternalLinkIcon");return s(),c("div",null,[i,p,h,u,_,e("p",null,[o("首先前往 "),e("a",b,[o("Google API console 頁面"),d(t)]),o("，點擊上方 "),g,o(" 按扭，若還沒有任何專案，請建立一個新的專案即可。")]),m,e("p",null,[o("前往 "),e("a",y,[o("Youtube Data API"),d(t)]),o(" 頁面，這邊以 Videos 裡的 list 舉例，前往 "),e("a",I,[o("Videos"),d(t)]),o(" 分頁後，其中必填 params 為 "),f,o(", "),A,o(", "),P,o("，分別用來設定以下內容：")]),v])}const D=r(l,[["render",k],["__file","youtube-data-api.html.vue"]]);export{D as default};