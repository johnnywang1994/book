# Safari IndexedDB Blob 克隆問題解析與修復方案

在開發使用 IndexedDB 儲存包含 Blob 對象的數據時，Safari 瀏覽器可能會遇到 `DataCloneError` 或 `parse_error` 錯誤。這篇文章將深入解析這個問題的根本原因，並說明為什麼我們的修復方案能夠解決這個問題。

## 問題背景
我們在一個專案中使用 IndexedDB 來存儲圖片數據，這些圖片以 Blob 對象的形式存在。當我們嘗試更新已存在的圖片數據時，在 Safari 瀏覽器中會遇到錯誤，而在 Chrome 等其他瀏覽器中則沒有問題。

## 根本原因分析
問題的根本原因是 **Safari 的 IndexedDB 結構化克隆（Structured Clone）機制與 Blob 對象的交互問題**。

### 原本的問題

```typescript
// 原本的代碼
async updateImage(id: string, updates: Partial<Omit<NailImage, 'id'>>): Promise<void> {
  const db = this.ensureDB();
  const existingImage = await db.get('images', id);  // ← 問題開始
  if (existingImage) {
    const updatedImage = { ...existingImage, ...updates };  // ← 問題惡化
    await db.put('images', updatedImage);  // ← 錯誤發生
  }
}
```

### 為什麼會失敗？

1. **第一次讀取**：`db.get()` 從 IndexedDB 讀取時，Safari 會對整個對象進行**結構化克隆**
2. **展開運算符**：`{ ...existingImage, ...updates }` 又創建了一個新對象，觸發了**第二次克隆**
3. **Blob 引用失效**：Safari 在多次克隆含有 Blob 的對象時，Blob 的內部引用可能被破壞
4. **寫入失敗**：`db.put()` 嘗試寫入時，發現 Blob 已經無效，拋出 `DataCloneError` 或 `parse_error`

### 修復方案的原理

```typescript
// 修復後的代碼
async updateImage(id: string, updates: Partial<Omit<NailImage, 'id'>>): Promise<void> {
  const db = this.ensureDB();
  
  // ✅ 使用單個事務
  const tx = db.transaction('images', 'readwrite');
  const store = tx.objectStore('images');
  
  const existingImage = await store.get(id);
  if (existingImage) {
    const updatedImage = { 
      ...existingImage, 
      ...updates,
      // ✅ 關鍵：明確保留原始 Blob 引用
      imageBlob: updates.imageBlob || existingImage.imageBlob
    };
    
    await store.put(updatedImage);
  }
  
  await tx.done;  // ✅ 確保事務完成
}
```

### 為什麼這樣就修好了？

1. **單事務操作**：
   - 在同一個事務（transaction）中完成 `get` 和 `put`
   - Safari 的 IndexedDB 在單個事務內對 Blob 的處理更可靠
   - 避免了跨事務的 Blob 引用失效問題

2. **明確的 Blob 引用保留**：
   ```typescript
   imageBlob: updates.imageBlob || existingImage.imageBlob
   ```
   - 明確告訴 JavaScript：使用原始的 Blob 引用
   - 而不是讓展開運算符隱式複製它
   - Safari 的垃圾回收機制不會誤認為舊 Blob 可以被回收

3. **await tx.done**：
   - 確保事務完全提交後才結束
   - 防止事務被提前中止導致 Blob 引用失效


### 為什麼 Chrome 沒問題？

- **Chrome/V8** 的 IndexedDB 實現對 Blob 的引用管理更寬鬆
- **Safari/WebKit** 更嚴格遵守規範，對結構化克隆中的 Blob 處理更保守
- Chrome 可以容忍多次克隆，Safari 不行


### 類比說明

想像 Blob 是一個**銀行保險箱的鑰匙**：

- **Chrome**：複印鑰匙很寬鬆，多複印幾次沒關係
- **Safari**：複印鑰匙很嚴格，複印多次後原鑰匙會失效（安全考量）

這修復就像是：**直接傳遞原始鑰匙，而不是複印後再複印**。

## 總結

這個 bug 是 Safari 特有的，因為它對 IndexedDB 中包含 Blob 的對象進行結構化克隆時更加嚴格。修復的核心是：

✅ 使用單個事務完成讀寫  
✅ 明確保留 Blob 的原始引用  
✅ 避免隱式的多次克隆  

這是一個很經典的**瀏覽器兼容性問題**，也說明了為什麼前端開發需要在多個瀏覽器上測試！