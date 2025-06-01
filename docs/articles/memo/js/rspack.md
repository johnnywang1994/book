# Rspack - 以 Rust 打造的快速構建工具

Hi 大家好，我是 Johnny，今天要介紹的是一個叫做 Rspack 的構建工具，是 ByteDance 團隊以 Rust 搭建的快速構建引擎，具備與 webpack 系統交互的能力

## 特點
- 快速的 Dev 啟動性能
- 高效的 Build 性能
  - mode 為 production 時預設 tree shaking
  - 預設 SplitChunksPlugin 套用拆分模組
- 靈活的配置
  - 支援 dynamic import
  - 內建 package analyze script `rspack build --analyze`, `rspack build --json stats.json`

> 透過 Rust 的高度並行化架構，大幅提升編譯性能，與其他工具性能比較的[描述在這](https://www.rspack.dev/guide/introduction.html#compared-with-webpack)

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
const rspack = require("@rspack/core");
const refreshPlugin = require("@rspack/plugin-react-refresh");
const isDev = process.env.NODE_ENV === "development";
/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
	context: __dirname,
	entry: {
		main: "./src/main.tsx"
	},
	resolve: {
		extensions: ["...", ".ts", ".tsx", ".jsx"]
	},
	module: {
		rules: [
			{
				test: /\.svg$/,
				type: "asset" // 內建處理，不需要額外安裝 loader，但仍需定義 rule
			},
			{
				test: /\.(jsx?|tsx?)$/,
				use: [
					{
						loader: "builtin:swc-loader",
						options: {
							sourceMap: true,
							jsc: {
								parser: {
									syntax: "typescript",
									tsx: true
								},
								transform: {
									react: {
										runtime: "automatic",
										development: isDev,
										refresh: isDev
									}
								}
							},
							env: {
								targets: [
									"chrome >= 87",
									"edge >= 88",
									"firefox >= 78",
									"safari >= 14"
								]
							}
						}
					}
				]
			}
		]
	},
	plugins: [
		new rspack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
		}),
		new rspack.ProgressPlugin({}),
		new rspack.HtmlRspackPlugin({
			template: "./index.html"
		}),
		isDev ? new refreshPlugin() : null
	].filter(Boolean)
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
        type: 'css/auto', // 將 '*.module.css' 視為 css module，否則使用 'css' 即可
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

> 雖然不用安裝 loader，但仍然要記得在 rspack config 中加上對應的處理

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
`devServer` 使用的是`@rspack/dev-server`，配置和 webpack 相似，預設在 dev 模式啟用 HMR，以下是一個配置範例
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
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
}
```


## 跑分比較
- [Official Benchmark](https://www.rspack.dev/zh/misc/benchmark.html)
- [farm-fe/performance-compare](https://github.com/farm-fe/performance-compare)
