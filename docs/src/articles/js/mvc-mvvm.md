# MVC, MVVM, MVI 軟體設計架構

本篇是個人學習這些不同軟體架構模式後的一些心得理解筆記，內容並無將所有情況都包含進去，僅加深個人理解使用，請各位大神多多包涵。



## 何謂 MVC

MVC 主要由 Model, View, Controller 三部分所構成，各司其職，將不同功能獨立開來，增加開發的易維護性與擴充性，其中 Model 與 View 之間無法直接溝通，兩者需經由 Controller 進行相關動作的分發。使用前端控制模式，藉由單個 controller 處理應用程式請求，因此 controller 是 MVC 的動作入口。

  - Model: 主要管理 state 相關，定義各種對 state 操作的邏輯方法，並提供對外接口給 Controller 調用。

  - View: 主要管理畫面 UI 相關，處理畫面顯示與使用者互動等等，互動時調用 Controller，並經由 Controller 向 Model 拿取或儲存資料。

  - Controller: 主要管理 Model 與 View 層之間的溝通順暢，定義各種 View 調用時對 Model 操作的邏輯，方便操作的重組或重用。

### BE 環境

後端開發中，Model 對 DB 進行操作，並定義相關資料庫邏輯對應方法，而 Controller 負責定義 HTTP 請求方法路徑對應的邏輯與驗證檢查，除了可以進行較複雜的業務邏輯，也可在此加強相關安全設置的判斷，例如驗證身份並調用 Model 的某個表單方法拿取資料，而 View 則為畫面顯示與使用者操作互動。

### FE 環境

前端開發中，Model 是對資料的相關操作，例如 API 的相關 HTTP 方法，以及對這些資料相關的基礎操作，包含基礎的 CRUD 操作，當然除了 API，應用程式相關的「狀態」也是由 Model 來統一集中管理。Controller 負責定義更高階的複雜業務邏輯，將 Model 裡的相關基礎方法，混合搭配使用，加上業務判斷或檢驗等等，最後藉由接口讓 View 層調用。View 則為畫面顯示與使用者操作互動。 



## 何謂 MVVM

MVVM 主要由 Model, View, ViewModel 組成，Model 與 View 跟 MVC 架構一樣不直接溝通，但溝通橋樑 Controller 由 ViewModel 取代，基本上 ViewModel 與 Controller 的定義和職責幾乎相同，唯一的差別在於，ViewModel 對 View 的黏著度更高，就像是 View 的代理程式，藉由例如 Events 或 Data Binding 等等機制，讓 View 透過 ViewModel 來對 Model 進行資料拿取、儲存或修改的動作。相反的，MVC 的 Controller 對 View 則沒有這麼大的黏著度，我們可以在 Controller 定義相關和 View 層無關的業務邏輯，也因此，相比於 MVVM，MVC 架構可以更容易的進行業務邏輯的擴充與系統擴展，當然，複雜度也比 MVVM 會來得高。

