# Parse Schema Object 章節

- [Link](https://docs.parseplatform.org/js/guide/#schema)

用來描述 Parse 物件的架構，用於 migration 或是 testing 非常方便，對於 Schema 的修改一律建議使用 migration 的方式進行，避免錯誤修改無法回溯查找問題

## Demo
可以直接在線上環境修改 Schema，但請記住一但做了任何修改是回不去的，相關的欄位資料將被移除
```js
// create an instance to manage your class
const mySchema = new Parse.Schema('MyClass');

// gets the current schema data
mySchema.get();

// returns schema for all classes
Parse.Schema.all()

// add any # of fields, without having to create any objects
mySchema
  .addString('stringField')
  .addNumber('numberField')
  .addBoolean('booleanField')
  .addDate('dateField')
  .addFile('fileField')
  .addGeoPoint('geoPointField')
  .addPolygon('polygonField')
  .addArray('arrayField')
  .addObject('objectField')
  .addPointer('pointerField', '_User')
  .addRelation('relationField', '_User');

// new types can be added as they are available
mySchema.addField('newField', 'ANewDataType')

// delete field
mySchema.deleteField('stringField');

// save/update this schema to persist your field changes
mySchema.save().then((result) => {
  // returns save new schema
});
// or
mySchema.update().then((result) => {
  // updates existing schema
});
```

## Indexes
需要 `masterKey` 來執行
```js
// field 必須在加入 index 之前就存在
mySchema.addString('stringField');
const index = {
  stringField: 1
};
mySchema.addIndex('stringFieldIndex', index);
mySchema.save();

// 刪除 index
testSchema.deleteIndex('indexName');
mySchema.save();

mySchema.get().then((result) => {
  // 取得 indexes
  console.log(result.indexes)
});
```

## Purge
清除 schema(class) 中的所有 object，注意這是一項不可逆轉的動作
```js
mySchema.purge();
```

## Class Level Permission
CLP 是一項安全功能，允許開發者以比基於 ACL(Access Control List) 權限控制提供更廣泛的方式限制訪問。

```js
// 修改內建 User schema
const schema = new Parse.Schema('_User');
await schema.get();

schema
  .addString('name')
  // 設定 Schema 的 CLP
  .setCLP({
    get: { requiresAuthentication: true },
    find: { requiresAuthentication: true },
    create: { '*': true },
  });

await schema.update();
```

```js
// 建立 Post Schema，綁定欄位到 _User
const schema = new Parse.Schema('Post');

schema
  .addString('title')
  .addString('body')
  .addPointer('owner', '_User')

  .setCLP({
    find: {
      pointerFields: ['owner'],
    },
    get: {
      pointerFields: ['owner'],
    },
    count: {
      pointerFields: ['owner'],
    },
    create: {
      requiresAuthentication: true,
    },
    update: {
      pointerFields: ['owner'],
    },
    delete: {
      pointerFields: ['owner'],
    },
  });

await schema.save();
```