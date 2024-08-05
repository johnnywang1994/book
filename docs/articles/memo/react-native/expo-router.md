# Expo Router

[Expo Router](https://docs.expo.dev/router/installation/) Expo Router 是一個用於 React Native 和 Web 應用程式的基於檔案的路由器

## Install
### Template
推薦使用 template 安裝並自動配置完成
```bash
$ npx create-expo-app@latest
```

### Manual
1. 手動安裝根據版本些微不同
```bash
# SDK 50 or above
$ npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
# SDK 49 or below
$ npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar react-native-gesture-handler
# if app is for Web
$ npx expo install react-native-web react-dom
```
2. 設定 package.json 入口，初始客戶端檔案是 `app/_layout.js`
```json
{
  "main": "expo-router/entry"
}
```
3. 修改 app.json
```json
{
  "expo": {
    "scheme": "your-app-scheme",
    // 如果是開發 Web，還需加入以下設定
    "web": {
      "bundler": "metro"
    }
  }
}
```
4. 修改 babel.config.js
```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // 如果 SDK 49 or below 需加入下方設定
    plugins: ['expo-router/babel'],
  };
};
```
5. 清除 bundler cache
```bash
$ npx expo start -c
```


## Usage
- [Create Pages](https://docs.expo.dev/router/create-pages/)
- `app/_layout.tsx`, `app/index.tsx`

### Dynamic Pages
- `app/blog/[slug].tsx`, `app/blog/[...rest].tsx`
```js
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

export default function Page() {
  const { slug } = useLocalSearchParams();

  return <Text>Blog post: {slug}</Text>;
}
```

### Navigate
- 接受格式 full path `/profile/settings`, relative path `../settings`, 物件 `{ pathname: 'profile', params: { id: '123' } }`
- 預設情況下，Link 將子元件包裝在 `<Text>` 元件中，可以透過傳遞 asChild 屬性來自訂元件，將所有屬性轉送到 Link 元件的第一個子元件
- stack unwinding: Expo Router 使用基於 stack 的導航方法，您 navigate 到的每條新 route 都會新增到 stack。如果您 navigate 到 stack 中已有的 route，stack 將展開回該 route，可以在 `<Link>` 元件上使用 Push 屬性避免此特性
```js
import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function Page() {
  return (
    <View>
      <Link href="/about">About</Link>
      <Link href="/user/bacon">View user</Link>

      <Link href="/other" asChild>
        <Pressable>
          <Text>Home</Text>
        </Pressable>
      </Link>

      {/* dynamic route */}
      <Link
        href={{
          pathname: '/user/[id]',
          params: { id: 'bacon' }
        }}
      >
        View user
      </Link>

      <Link push href="/feed">Push</Link>
      <Link replace href="/feed">Replace</Link>
    </View>
  );
}
```
- [programming navigate](https://docs.expo.dev/router/navigating-pages/#imperative-navigation)
```js
import { router } from 'expo-router';

export function logout() {
  router.replace('/login');
}
```

### Layout Route
- Slot 將渲染目前的子路由，可以將其視為 React 中的 children 屬性。該元件可以與其他元件一起建立佈局
```js
import { Slot } from 'expo-router';

export default function HomeLayout() {
  return (
    <>
      <Header />
      <Slot />
      <Footer />
    </>
  );
}
```
- 可以給定目錄新增單一佈局路由。如果要使用多個佈局路由，請新增多個目錄
```
└── 📁app
    └── 📁home
        └── _layout.js
    └── _layout.js
    └── index.js
```
- 如果你想要多個佈局路由而不修改 URL，請使用 [Group](https://docs.expo.dev/router/layouts/#groups)
```
└── 📁app
    └── 📁(app)
        └── index.js
        └── user.js
    └── 📁(aux)
        └── privacy-policy.js
        └── terms-of-service.js
```

### Error Handling
- [Documentation](https://docs.expo.dev/router/error-handling/)
- 這是針對每個應用程式自動完成的，但您也可以對其進行自訂。可以匯出任何想要渲染的元件。建議提供一個 `/` 的鏈接，以便用戶可以跳轉回主畫面
```js
// app/+not-found.js
import { Unmatched } from 'expo-router';
export default Unmatched;
```
- 從任何路由 export 嵌套的 ErrorBoundary 元件來攔截和格式化元件層級錯誤，當 ErrorBoundary 不存在時，錯誤將被拋出到最近的父級 ErrorBoundary
```tsx
// app/home.tsx
import { View, Text } from 'react-native';
import { type ErrorBoundaryProps } from 'expo-router';

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <View>
      <Text>{error.message}</Text>
      <Text onPress={retry}>Try Again?</Text>
    </View>
  );
}

export default function Page() { ... }
```