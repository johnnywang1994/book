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
    // gtag.js
    ['script', { src: 'https://www.googletagmanager.com/gtag/js?id=G-B1QJSJW3P3' }],
    // google adsense
    ['script', { src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5050343387449103', crossorigin: 'anonymous' }]
  ],

  theme: '@vuepress/theme-default',
  themeConfig: {
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
      }
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
            '/articles/js/most-easy-webpack-basic-intro.md',
            '/articles/js/importmap-with-blob.md',
            '/articles/js/delay-promise.md',
            '/articles/js/express-vs-koa.md',
            '/articles/js/matter-mario.md',
            '/articles/js/jsdoc.md',
            '/articles/js/pinia-intro.md',
            '/articles/js/node-ftp-cli.md',
            '/articles/js/regexp.md',
            '/articles/js/vue3-ssr.md',
            '/articles/js/event-loop.md',
            '/articles/js/babel-7.md',
            '/articles/js/esm-server.md',
            '/articles/js/vue-dep-tracking-2020.md',
            '/articles/js/vue-dep-tracking-2019.md',
            '/articles/js/literal-template.md',
            '/articles/js/clean-code.md',
            '/articles/js/lock-page-resize.md',
            '/articles/js/date-new-now.md',
            '/articles/js/promise-basic.md',
            '/articles/js/rxjs-basic.md',
            '/articles/js/web-component.md',
            '/articles/js/ts-basic.md',
            '/articles/js/ts-advance.md',
            '/articles/js/mvc-mvvm.md',
            '/articles/js/mvvm-practice.md',
            '/articles/js/gulp-basic.md',
            '/articles/js/vuex-basic.md'
          ]
        },
        {
          text: 'CSS & Sass',
          collapsible: true,
          children: [
            '/articles/css/2021-css-report.md',
            '/articles/css/scss-built-in-modules.md',
            '/articles/css/parent-selector.md',
            '/articles/css/landscape-fix-scroll.md',
            '/articles/css/animation-rem.md',
            '/articles/css/scss-basic.md',
            '/articles/css/mix-blend-mode.md',
          ],
        },
        {
          text: 'Daily',
          collapsible: true,
          children: [
            '/articles/daily/2022/wedding.md',
            '/articles/daily/2021/review-as-frontend.md',
            '/articles/daily/2021/iterm2-zsh.md',
            '/articles/daily/front-end-interview.md'
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
        {
          text: 'Docker',
          collapsible: true,
          children: [
            '/articles/docker/basic.md',
            '/articles/docker/dockerfile-demo.md',
            '/articles/docker/docker-compose.md',
          ],
        },
        {
          text: 'Google api',
          collapsible: true,
          children: [
            '/articles/google/youtube-data-api.md',
          ],
        },
        {
          text: 'Facebook api',
          collapsible: true,
          children: [
            '/articles/fb/fb-api-basic.md',
          ],
        },
      ],
      '/project/': '/project'
    },
  },

  /**
   * Apply plugins
   *
   * Ref：https://v2.vuepress.vuejs.org/reference/plugin/back-to-top.html#install
   */
  plugins: [
    '@vuepress/back-to-top',
    '@vuepress/medium-zoom',
    [
      '@vuepress/register-components',
      {
        componentsDir: path.resolve(__dirname, './components'),
      }
    ]
  ]
}
