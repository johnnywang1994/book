# Parse Server 章節

Parse Server 中是一套安裝在 express 的應用程序，可以使用 `MongoDB`, `PostgreSQL` 兩種資料庫

- [Parse Server Guide](https://docs.parseplatform.org/parse-server/guide/)
- [Parse Server API Docs](https://parseplatform.org/parse-server/api/5.2.0/index.html)

## 服務配置範例
```bash
$ npm install parse parse-server
```

透過 docker 配置服務如下，使用 [Parse Dashboard](https://github.com/parse-community/parse-dashboard)，以及啟動本地的 `mongodb`

```yml
version: '3.8'

services:
  mongodb:
    image: mongo:4.2
    ports:
    - "27017:27017"
    volumes:
    - test-mongo-data:/data/db
  dashboard:
    image: parseplatform/parse-dashboard
    command:
    - --dev
    - --appId
    - test-app-id
    - --masterKey
    - test-master-key
    - --serverURL
    - http://127.0.0.1:1337/parse
    ports:
    - "4040:4040"

volumes:
  test-mongo-data:
```


## 建立 Parse Server
構造函數返回一個符合 Express Middleware 的 API 對象。

```js
import express from 'express'
import ParseServer, { RedisCacheAdapter } from 'parse-server';
import { ReadPreference } from 'mongodb';

const app = express()

const parseServerOptions = {
  appId: 'test-app-id',
  masterKey: 'test-master-key',
  cacheAdapter: new RedisCacheAdapter({ url: 'redis://127.0.0.1:6379' }),
  databaseURI: 'mongodb://localhost:27017/parse',
  // if production environment has implemented Replication feature
  // we can set the readPreference of mongodb to speed up reading
  // however, if most of case the local development environment would not support this feature, and should be default setting
  // and be careful when using this feature may cause read/write consistency issue
  // mongodb://localhost:27017?authSource=admin&readConcernLevel=majority&w=majority
  // https://www.mongodb.com/docs/manual/core/read-isolation-consistency-recency/#causal-consistency
  databaseOptions: isProd
    ? {
        enableSchemaHooks: true,
        readPreference: ReadPreference.SECONDARY_PREFERRED,
      }
    : {},

  enableAnonymousUsers: false,
  auth: {},

  fileUpload: {
    enableForPublic: false,
  },

  objectIdSize: 16,
  allowClientClassCreation: false,

  cloud: resolve(__dirname, './cloud.js'), // parse cloud path
  jsonLogs: process.env.NODE_ENV === 'production'
}

const parseServer = new ParseServer(parseServerOptions);

const mountPath = '/parse'
const port = 1337

app.use(mountPath, parseServer)

app.listen(port, () => {
  console.log(`parse-server-example running on port: ${port}`)
})
```


## 開啟 dashboard
- http://localhost:4040

