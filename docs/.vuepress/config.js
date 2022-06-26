const { defaultTheme } = require('vuepress')
const { backToTopPlugin } = require('@vuepress/plugin-back-to-top')
const { mediumZoomPlugin } = require('@vuepress/plugin-medium-zoom')
const { registerComponentsPlugin } = require('@vuepress/plugin-register-components')
const { searchPlugin } = require('@vuepress/plugin-search')
const path = require('path')
const { description } = require('../../package')

module.exports = {
  base: '/book/',
  lang: 'zh-TW',
  title: 'Johnny Wang Blog',
  description: description,

  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'og:image', content: 'https://raw.githubusercontent.com/jwlearn1994/image-uploader/main/2022/04/learn-to-code.jpeg' }],
    // gtag.js
    ['script', { src: 'https://www.googletagmanager.com/gtag/js?id=G-B1QJSJW3P3' }],
    // google adsense
    ['script', { src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5050343387449103', crossorigin: 'anonymous' }],
    // live2d
    // ['script', { src: 'https://unpkg.com/core-js-bundle@3.6.1/minified.js' }],
    ['script', { src: '/book/live2dcubismcore.min.js' }],
    ['script', { src: '/book/live2d-bundle-v1.0.js' }],
  ],

  // theme: '@vuepress/theme-default',
  theme: defaultTheme({
    logo: 'https://vuejs.org/images/logo.png',
    home: '/',
    repo: 'johnnywang1994/book',
    repoLabel: 'johnnywang/book',
    editLink: false,
    lastUpdated: true,
    navbar: [
      {
        text: 'Articles',
        link: '/articles/',
      },
      {
        text: 'Project',
        link: '/project/',
      },
      {
        text: 'Live2d',
        link: '/live2d/',
      },
    ],
    sidebarDepth: 1,
    sidebar: {
      '/articles/': [
        {
          text: 'About Me',
          collapsible: true,
          children: [
            '/articles/README.md',
          ]
        },
        {
          text: 'Javascript',
          collapsible: true,
          children: [
            '/articles/js/webrtc-realtime-meeting.md',
            '/articles/js/temporal-typescript-sdk.md',
            '/articles/js/react-web3-storage.md',
            '/articles/js/react-use-state.md',
            '/articles/js/babel7-decorator-issue.md',
            '/articles/js/koa-vite-ssr.md',
            '/articles/js/live2d-demo.md',
            '/articles/js/canvas-draw-video.md',
            '/articles/js/most-easy-webpack-basic-intro.md',
            '/articles/js/importmap-with-blob.md',
            '/articles/js/delay-promise.md',
            '/articles/js/express-vs-koa.md',
            '/articles/js/matter-mario.md',
            '/articles/js/jsdoc.md',
            '/articles/js/pinia-intro.md',
            '/articles/js/node-ftp-cli.md',
            '/articles/js/vue3-ssr.md',
            '/articles/js/event-loop.md',
            '/articles/js/babel-7.md',
            '/articles/js/esm-server.md',
            '/articles/js/vue-dep-tracking-2020.md',
            '/articles/js/vue-dep-tracking-2019.md',
            '/articles/js/literal-template.md',
            '/articles/js/lock-page-resize.md',
            '/articles/js/date-new-now.md',
            '/articles/js/promise-basic.md',
            '/articles/js/web-component.md',
            '/articles/js/ts-basic.md',
            '/articles/js/ts-advance.md',
            '/articles/js/mvc-mvvm.md',
            '/articles/js/mvvm-practice.md',
          ]
        },
        {
          text: 'CSS & Sass',
          collapsible: true,
          children: [
            '/articles/css/learn-tailwindcss.md',
            '/articles/css/2021-css-report.md',
            '/articles/css/scss-built-in-modules.md',
            '/articles/css/parent-selector.md',
            '/articles/css/landscape-fix-scroll.md',
            '/articles/css/animation-rem.md',
            '/articles/css/mix-blend-mode.md',
          ],
        },
        {
          text: 'Memo',
          collapsible: true,
          children: [
            {
              text: 'Javascript',
              collapsible: true,
              children: [
                '/articles/memo/js/crypto-password.md',
                '/articles/memo/js/test-implement-details.md',
                '/articles/memo/js/jest-basic.md',
                '/articles/memo/js/regexp.md',
                '/articles/memo/js/rxjs-basic.md',
                '/articles/memo/js/gulp-basic.md',
                '/articles/memo/js/clean-code.md',
                '/articles/memo/js/dev-skills.md',
              ]
            },
            {
              text: 'Vue',
              collapsible: true,
              children: [
                '/articles/memo/vue/cypress-vue.md',
                '/articles/memo/vue/vue-jest-memo.md',
                '/articles/memo/vue/vuetify-memo.md',
                '/articles/memo/vue/vuex-basic.md'
              ]
            },
            {
              text: 'React',
              collapsible: true,
              children: [
                '/articles/memo/react/react-styled-components-basic.md',
                '/articles/memo/react/react-styled-components-advanced.md',
                '/articles/memo/react/react-unit-test.md',
                '/articles/memo/react/react-testing-library.md',
                '/articles/memo/react/react-emotion-basic.md',
                '/articles/memo/react/react-styled-jsx.md',
                '/articles/memo/react/react18-concurrent-memo.md',
                '/articles/memo/react/useEffect-lifecycle.md',
                '/articles/memo/react/useContext-useReducer.md',
                '/articles/memo/react/react-router-config.md',
              ]
            },
            {
              text: 'GraphQL',
              collapsible: true,
              children: [
                '/articles/memo/graphql/basic.md',
                '/articles/memo/graphql/advance.md',
                '/articles/memo/graphql/memo.md'
              ]
            },
            {
              text: 'Parse',
              collapsible: true,
              children: [
                '/articles/memo/parse/README.md',
                '/articles/memo/parse/user.md',
                '/articles/memo/parse/session.md',
                '/articles/memo/parse/schema.md',
                '/articles/memo/parse/cloud.md',
              ]
            },
            {
              text: 'CSS',
              collapsible: true,
              children: [
                '/articles/memo/css/scss-basic.md',
              ]
            },
            {
              text: 'Docker',
              collapsible: true,
              children: [
                '/articles/memo/docker/basic.md',
                '/articles/memo/docker/dockerfile-demo.md',
                '/articles/memo/docker/docker-compose.md',
              ],
            },
            {
              text: 'Git Learning',
              collapsible: true,
              children: [
                '/articles/git/what-is-git.md',
                '/articles/git/basic.md',
                '/articles/git/branch.md',
                '/articles/git/merge.md',
                '/articles/git/stash.md',
                '/articles/git/recover.md',
                '/articles/git/remote.md',
                '/articles/git/tag.md',
                '/articles/git/config.md',
                '/articles/git/diff.md',
                '/articles/git/subtree.md',
              ],
            },
            '/articles/memo/youtube-data-api.md',
            '/articles/memo/fb-api-basic.md',
            '/articles/memo/vscode-command.md',
            '/articles/memo/learning.md',
            '/articles/memo/issues.md',
            '/articles/memo/tools.md'
          ],
        },
        {
          text: 'Frontend LearnMap',
          collapsible: true,
          children: [
            '/articles/frontend-learnmap/README.md',
          ],
        },
        {
          text: 'Daily',
          collapsible: true,
          children: [
            '/articles/daily/2022/leisure-memo.md',
            '/articles/daily/2022/life-in-garena.md',
            '/articles/daily/2022/defi-learn.md',
            '/articles/daily/2022/wedding.md',
            '/articles/daily/2021/review-as-frontend.md',
            '/articles/daily/2021/iterm2-zsh.md',
            '/articles/daily/front-end-interview.md'
          ],
        },
      ],
      '/project/': '/project'
    },
  }),

  /**
   * Apply plugins
   *
   * Ref：https://v2.vuepress.vuejs.org/reference/plugin/back-to-top.html#install
   */
  plugins: [
    backToTopPlugin(),
    mediumZoomPlugin(),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
    searchPlugin({
      locales: {
        '/': {
          placeholder: 'Search',
        },
      },
      searchMaxSuggestions: 10,
      isSearchable: (page) => page.path !== '/',
    })
  ]
}
