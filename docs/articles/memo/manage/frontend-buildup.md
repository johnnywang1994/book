# Frontend Build up 前端基建流程

## 1。標準與文件
這是團隊的共識,也是溝通與合作的基礎
- 文獻資料
  - 新來者文檔（公司,業務,團隊,流程等。）
  - 技術文件
  - 商業文件
  - 項目文檔（舊,新）
  - 計劃文件（每月,每季度,每年）
  - 技術共享交換文件
- 規格
  - 項目目錄規格
  - 代碼編寫規範

## 2。腳手架
開發和維護可以幫助團隊的通用腳手架工具快速初始化項目結構,配置施工工具以及集成開發依賴

## 3。組件
公司項目中有許多公共組件,可以提取這些組件以促進自身和其他項目的重用
- UI組件：antd, element-ui, vant, uview...
- 業務組成部分：table, search...
- 功能組件：dropdown, loading, loadmore, virtual scroll, drag ordering, lazy loading..

## 4。工具/功能庫
前端工具包,例如 axios, loadsh, Day.js, moment.js, big.js等
- 常用方法/ API封裝:
  - 查詢參數分析, 設備設備分析, 環境差異化, localStorage封裝, 日期格式封裝, 數千種十分位格式, 防止發抖, 旋轉,去除組重量, 組展平, 測序, 判斷類型等
  - 常用方法與鉤子分開的組成功能庫，方便在各種項目中使用

## 5。模板
事先根據公司的業務需求,可以對每個端進行封裝,以符合一般開發模板,項目目錄結構,接口請求,狀態管理,代碼規範,git規範,頁面匹配,權限,本地存儲管理等。 以減少開發新項目的準備工作時間，它還可以更好地統一公司的整體代碼規格
- 一般`後台管理`系統基本模板包裝
- 一般`小程序`基本模板包裝
- 一般`H5`的模板包裝
- 一般`Nodejs`的模板包裝
- 其他類型的項目默認模板包裝,以減少工作重複。

## 6。CI / CD施工部署
前端擁有自己的構造和部署系統,以促進在專業化方面的更好的過程控制。許多公司目前正在意識到雲包裝,雲檢測和自動部署，每次git提交代碼後,您都將自動將項目部署到測試環境,預生產環境,生產環境中,而不必每次都手動將cv打包到多個服務器和環境中。

## 7。埋點、追蹤分析
前端團隊可以做的是Web數據埋葬站點收集和數據分析,與可視化相關的系統範圍構建。可以實現規格,SDK,數據收集和分析,PV / UV,鏈接分析,轉換分析,用戶肖像,可視化熱圖,坑粒度數據滲透等的數據化功能

## 8。微前端
將您的大型前端應用程序拆分為多個小型前端應用程序,以便每個小型前端應用程序都有自己的倉庫,可以專注於單個功能