# Rspack - 以 Rust 打造的快速構建工具

Hi 大家好，我是 Johnny，今天要介紹的是一個叫做 Rspack 的構建工具，是以 Rust 搭建的快速構建引擎

## 特點
- 快速的 Dev 啟動性能
- 高效的 Build 性能

## 使用 Rspack
- 建立專案
```bash
$ npm create rspack@latest
$ yarn create rspack
```
- 配置問題選項
  - 專案名稱
  - template(react, react-ts, vue)

Rspack 預設在 `rspack.config.js` 中配置打包相關設定

### rspack.config.js
以下為選擇 `react-ts` template 後產生的預設配置
```js
module.exports = {
	context: __dirname,
	entry: {
		main: "./src/main.tsx"
	},
	builtins: {
		html: [
			{
				template: "./index.html"
			}
		]
	},
	module: {
		rules: [
			{
				test: /\.svg$/,
				type: "asset"
			}
		]
	}
};
```

### 啟動
```bash
$ npm run dev
$ yarn dev
```


## 特性
### Language 語言支援
- Typescript/JSON
TypeScript/JSON 是 Rspack 一等公民，內建自動透過 SWC 處理將 ts 轉譯到 js，但僅為 `Transpile-only`，若需要對語法進行檢查，則需要另外配置工具如 tsc 對類型檢查
- JSX/TSX
JSX/TSX 也是 Rspack 一等公民，內建處理，若使用非 React 的 library 則可以配置類似如下
```js
module.exports = {
  builtins: {
    react: {
      pragma: 'h',
      pragmaFrag: 'Fragment',
    },
  },
};
```
- CSS
CSS 也是 Rspack 一等公民，內建處理，`*.module.css` 結尾的文件視為 CSS Modules 檔案類型
- PostCSS/LESS/SASS
Rspack 已完成兼容，可配置如下
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                // ...
              },
            },
          },
        ],
        type: 'css',
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'less-loader',
            options: {
              // ...
            },
          },
        ],
        type: 'css',
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: 'sass-loader',
            options: {
              // ...
            },
          },
        ],
        type: 'css',
      },
    ],
  },
};
```
- TailwindCSS
安裝依賴 `npm install -D tailwindcss autoprefixer postcss postcss-loader`，範例配置 css 如下
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: {
                  tailwindcss: {},
                  autoprefixer: {},
                },
              },
            },
          },
        ],
        type: 'css',
      },
    ],
  }
}
```

### Asset Module
資源是 Rspack 一等公民，不需要安裝任何 loader 來處理，支援的資源類型如下
- `asset/inline`: 轉為 `Base64` DataURI（取代 url-loader）
- `asset/resource`: 轉為單獨文件輸出（取代 file-loader）
- `asset`: 根據條件(體積)自動轉為 `inline` or `resource`，預設 `<= 8096 bytes` 會以 inline 處理，反之則為 resource
- `asset/source`: 轉為字符串輸出（取代 raw-loader）

### Web Worker
Web Worker 是 Rspack 一等公民，不需要任何 loader 就可直接使用
```js
new Worker(new URL('./worker.js', import.meta.url));
```

> 但需注意不支援使用變數在 `new Worker` 中，比如下面這樣將不會有效果
```js
const url = new URL('./path/to/worker.js', import.meta.url);
const worker = new Worker(url);
```


### 模組解析
Rspack 中使用 `nodejs_resolver` 來解析模組路徑，路徑別名配置跟 webpack 相同
```js
module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}
```
若使用 ts 也記得在 `tsconfig.json` 中加上
```json
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
  }
}
```

### devServer
`devServer` 配置可以和 webpack 無縫銜接，預設在 dev 模式啟用 HMR，以下是一個配置範例
```js
module.exports = {
  devServer: {
    hot: true,
    compress: true,
    historyApiFallback: true,
    client: {
      logging: "info",
      overlay: false,
    },
    open: true,
  },
}
```