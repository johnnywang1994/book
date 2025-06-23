# Awesome Vite 一個由社群維護的 template 集大成

<SocialBlock hashtags="javascript,typescript,vite" />

Hi 大家好，我是 Johnny

相信用過 Vite 的大家都知道，由於 Vite 實在太香又太快，讓許多不同開發框架的開發者都相繼將自己的底層搭建工具改為 Vite 了，包含了 Vue, React, Nuxt, Svelte, Laravel...等等，簡直像是軟體開源者的一場平台遷移運動，雖然 Webpack 還沒有完全被捨棄，但 Vite 作為一個新的底層工具已經取得了很大的成功。

但隨著加入使用 Vite 的工具爆炸式增長，Vite 核心官方除了最基本的內建 template 以外，已無力維護所有周邊的 template 生態，此時正是社群自發的組成後援會的時機拉～

今天這篇主要介紹一個由社群共同維護的 vite template 專案 [Awesome Vite](https://github.com/vitejs/awesome-vite#templates)，裡面包山包海，由各開發者共同開發維護許多常見的工具整合 template，底下我們實際下載一個 [vue-ts-starter](https://github.com/yugasun/vue-ts-starter) 來試試看


## Vue TS starter
vue ts starter 內建安裝包含了下列工具
-   [x] [Vue3.0](https://vuejs.org/)
-   [x] [Vue Router](https://github.com/vuejs/router)
-   [x] [TypeScript](https://www.typescriptlang.org/)
-   [x] [Vite](https://vitejs.dev/) Next Generation Frontend Tooling
-   [x] [vite-plugin-pwa](https://github.com/antfu/vite-plugin-pwa) Zero-config PWA for Vite
-   [x] [Pinia](https://pinia.vuejs.org/) The Vue Store that you will enjoy using
-   [x] [Element Plus](https://github.com/element-plus/element-plus) 🎉 A Vue.js 3 UI Library made by Element team
-   [x] [vueuse](https://github.com/vueuse/vueuse) Collection of essential Vue Composition Utilities for Vue 2 and 3
-   [x] [axios](https://github.com/axios/axios) Promise based HTTP client for the browser and node.js
-   [x] [Tailwindcss](https://tailwindcss.com/) A utility-first CSS framework for rapid UI development
-   [x] [msw](https://mswjs.io/docs/) Seamless REST/GraphQL API mocking library for browser and Node.js.
-   [x] [ESLint](https://eslint.org/)
-   [x] [Prettier](https://prettier.io/)
-   [x] [Airbnb Style Guide](https://github.com/airbnb/javascript)
-   [x] [Commitlint](https://github.com/conventional-changelog/commitlint) Lint commit messages
-   [x] [Commitizen](https://github.com/commitizen/cz-cli) The commitizen command line utility.


## 下載跑起來
由於作者似乎是用 `pnpm`，還沒安裝 `pnpm` 的童鞋可以使用 `npm install -g pnpm` 安裝到全局喔
```bash
# 0. Clone project
git clone https://github.com/yugasun/vue-ts-starter

# 1. Install dependencies
pnpm install

# 2. Start develop server
pnpm dev

# 3. Build
pnpm build
```


## 打開 vite.config.ts 看看
```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import * as path from 'path';
import { ManifestOptions, VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import replace from '@rollup/plugin-replace';
import { createHtmlPlugin } from 'vite-plugin-html';

// PWA config
const pwaOptions: Partial<VitePWAOptions> = {
    mode: 'development',
    base: '/',
    includeAssets: ['favicon.svg'],
    manifest: {
        name: 'PWA Router',
        short_name: 'PWA Router',
        theme_color: '#ffffff',
        icons: [
            {
                src: 'pwa-192x192.png', // <== don't add slash, for testing
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/pwa-512x512.png', // <== don't remove slash, for testing
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: 'pwa-512x512.png', // <== don't add slash, for testing
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any maskable',
            },
        ],
    },
    devOptions: {
        enabled: process.env.SW_DEV === 'true',
        /* when using generateSW the PWA plugin will switch to classic */
        type: 'module',
        navigateFallback: 'index.html',
    },
};

const replaceOptions = {
    __DATE__: new Date().toISOString(),
    __RELOAD_SW__: '',
};
const claims = process.env.CLAIMS === 'true';
const reload = process.env.RELOAD_SW === 'true';

if (process.env.SW === 'true') {
    pwaOptions.srcDir = 'src';
    pwaOptions.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts';
    pwaOptions.strategies = 'injectManifest';
    (pwaOptions.manifest as Partial<ManifestOptions>).name =
        'PWA Inject Manifest';
    (pwaOptions.manifest as Partial<ManifestOptions>).short_name = 'PWA Inject';
}

if (claims) pwaOptions.registerType = 'autoUpdate';

if (reload) {
    replaceOptions.__RELOAD_SW__ = 'true';
}

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/assets/styles/element/index.scss" as *;`,
            },
        },
    },
    plugins: [
        vue(),
        createHtmlPlugin({
            minify: true,
            /**
             * Data that needs to be injected into the index.html ejs template
             */
            inject: {
                data: {
                    title: 'vue-ts-starter',
                },
            },
        }),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        VitePWA(pwaOptions),
        replace(replaceOptions),
    ],
    server: {
        port: 8080,
        hmr: {
            host: '127.0.0.1',
            port: 8080,
        },
    },
});
```

設定包含了 `PWA`, `auto import`, `sass` 等等的配置，對於每次都要重新配置一次環境的開發者可以作為一份參考也是很不錯的。


## 結論
其實 template 的目的並不一定是要開發者完全使用他的工具，而是作為一份參考，在開發者需要的時候可以根據需要下載並移植自己專案需要的工具設定，開發者間彼此互相參考、學習成長的過程才是這些工具最大的用途～

像筆者我這次在觀看這 template 的過程中，就看到了一個有關 `sass` 我從來沒有認真思考過的問題 [@use vs @import](https://sass-lang.com/documentation/at-rules/use#differences-from-import)，對於一個使用了 `sass` 若干年的開發者而言，我真的自慚形穢ＸＤ，因為離題了就把連結附在這給大家參考摟

感謝大家的觀看，我們下次見摟～

<SocialBlock hashtags="javascript,typescript,vite" />