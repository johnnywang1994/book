const sidebar = {
  '/articles/': [
    {
      text: 'About Me',
      collapsible: true,
      children: [
        '/articles/README.md',
        '/articles/list.md',
      ]
    },
    {
      text: 'Javascript',
      collapsible: true,
      children: [
        '/articles/js/awesome-vite.md',
        '/articles/js/vue-react-usage-compare.md',
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
        '/articles/css/css-planet.md',
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
            '/articles/memo/js/sequelize-learn.md',
            '/articles/memo/js/es2022.md',
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
            '/articles/memo/react/next-middleware-cookie.md',
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
            '/articles/memo/graphql/apollo-client.md',
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
        '/articles/memo/api-first-learn.md',
        '/articles/memo/what-is-ac.md',
        '/articles/memo/learn-mermaid.md',
        '/articles/memo/sonarcube.md',
        '/articles/memo/youtube-data-api.md',
        '/articles/memo/fb-api-basic.md',
        '/articles/memo/vscode-command.md',
        '/articles/memo/issues.md'
      ],
    },
    {
      text: 'References',
      collapsible: true,
      children: [
        '/articles/references/learning.md',
        '/articles/references/tools.md',
        '/articles/references/frontend-learnmap.md',
      ],
    },
    {
      text: 'Daily',
      collapsible: true,
      children: [
        '/articles/daily/2000/as-an-observer.md',
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
};

export default sidebar;
