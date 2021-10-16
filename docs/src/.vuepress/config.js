const { description } = require('../../package')

module.exports = {
  base: '/book/',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Johnny Wang Blog',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
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
          title: 'About Me',
          collapsable: false,
          children: [
            '',
          ]
        },
        {
          title: 'Javascript',
          collapsable: true,
          children: [
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
          ]
        },
        {
          title: 'CSS & Sass',
          collapsable: true,
          children: [
            'css/parent-selector.md',
            'css/landscape-fix-scroll.md',
            'css/animation-rem.md',
            'css/scss-basic.md',
            'css/mix-blend-mode.md',
          ],
        },
        {
          title: 'Git Learning',
          collapsable: true,
          children: [
            'git/what-is-git.md',
            'git/basic.md',
            'git/branch.md',
            'git/merge.md',
            'git/recover.md',
            'git/remote.md',
            'git/tag.md',
            'git/config.md',
            'git/subtree.md',
          ],
        },
        {
          title: 'Docker',
          collapsable: true,
          children: [
            'docker/basic.md',
            'docker/dockerfile-demo.md',
            'docker/docker-compose.md',
          ],
        },
        {
          title: 'Google api',
          collapsable: true,
          children: [
            'google/youtube-data-api.md',
          ],
        },
        {
          title: 'Facebook api',
          collapsable: true,
          children: [
            'fb/fb-api-basic.md',
          ],
        },
        {
          title: 'Interview',
          collapsable: true,
          children: [
            'interview/front-end.md',
          ],
        },
      ],
      '/project/': '/project'
    },
    lastUpdated: true,
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
