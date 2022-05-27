# React Router Config 筆記

> 更新：現在新版 `react-router-dom` 已經可以使用 `Outlet` 來寫入子路由，跟 Vue Router 的 `RouterView` 一樣可以很方便的定義子路由位置，詳細請看[官方文件](https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md)

------

撇除 Next.js 這類內建 router 處理的框架，直接用 react router 的寫法真的太虐心，所以紀錄一下一個名為 [react-router-config](https://www.npmjs.com/package/react-router-config) 的用法，讓開發時多一個參考工具使用QQ


## 實作範例

個人愛好像 Vue Router 那樣的 routerView 組件，所以稍微包裝了下這套件方便使用

```jsx
// router.js
import { renderRoutes } from 'react-router-config';
import ViewHome from './views/Home';
import ViewAbout from './views/About';
import ViewAboutDetail from './views/AboutDetail'

// 這邊採用類似裝飾器的 HOC
// 自動處理好 renderRoutes 這步驟，開發時就不用到處 import renderRoutes
function routePipe(WrappedComponent) {
  return function RouterView(props) {
    return (
      <WrappedComponent
        {...props}
        routerView={renderRoutes(props.route.routes)}
      />
    );
  };
}

const routes = [
  {
    path: '/',
    exact: true,
    component: routePipe(ViewHome),
  },
  {
    path: '/about',
    component: routePipe(ViewAbout),
    routes: [
      {
        path: '/about/details',
        component: routePipe(ViewAboutDetail)
      }
    ]
  },
];

export default renderRoutes(routes);
```

```jsx
// App.js
import routerView from './router';

export default function App() {
  return (
    <>
      {routerView}
    </>
  );
}
```

```jsx
// About.js
export default function About({ routerView }) {
  return (
    <div className="view-about">
      Hello About
      {routerView}
    </div>
  );
}
```