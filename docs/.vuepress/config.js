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
    sidebar: {
      '/articles/': [
        {
          text: 'About Me',
          collapsible: true,
          children: [
            '',
          ]
        },
        {
          text: 'Javascript',
          collapsible: true,
          children: [
            'js/most-easy-webpack-basic-intro.md',
            'js/importmap-with-blob.md',
            'js/delay-promise.md',
            'js/express-vs-koa.md',
            'js/matter-mario.md',
            'js/jsdoc.md',
            'js/pinia-intro.md',
            'js/node-ftp-cli.md',
            'js/regexp.md',
            'js/vue3-ssr.md',
            'js/event-loop.md',
            'js/babel-7.md',
            'js/esm-server.md',
            'js/vue-dep-tracking-2020.md',
            'js/vue-dep-tracking-2019.md',
            'js/literal-template.md',
            'js/clean-code.md',
            'js/lock-page-resize.md',
            'js/date-new-now.md',
            'js/promise-basic.md',
            'js/rxjs-basic.md',
            'js/web-component.md',
            'js/ts-basic.md',
            'js/ts-advance.md',
            'js/mvc-mvvm.md',
            'js/mvvm-practice.md',
            'js/gulp-basic.md',
            'js/vuex-basic.md'
          ]
        },
        {
          text: 'CSS & Sass',
          collapsible: true,
          children: [
            'css/2021-css-report.md',
            'css/scss-built-in-modules.md',
            'css/parent-selector.md',
            'css/landscape-fix-scroll.md',
            'css/animation-rem.md',
            'css/scss-basic.md',
            'css/mix-blend-mode.md',
          ],
        },
        {
          text: 'Daily',
          collapsible: true,
          children: [
            'daily/2021/review-as-frontend.md',
            'daily/2021/iterm2-zsh.md',
            'daily/front-end-interview.md'
          ],
        },
        {
          text: 'Git Learning',
          collapsible: true,
          children: [
            'git/what-is-git.md',
            'git/basic.md',
            'git/branch.md',
            'git/merge.md',
            'git/stash.md',
            'git/recover.md',
            'git/remote.md',
            'git/tag.md',
            'git/config.md',
            'git/diff.md',
            'git/subtree.md',
          ],
        },
        {
          text: 'Docker',
          collapsible: true,
          children: [
            'docker/basic.md',
            'docker/dockerfile-demo.md',
            'docker/docker-compose.md',
          ],
        },
        {
          text: 'Google api',
          collapsible: true,
          children: [
            'google/youtube-data-api.md',
          ],
        },
        {
          text: 'Facebook api',
          collapsible: true,
          children: [
            'fb/fb-api-basic.md',
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
