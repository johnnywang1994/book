# Expo Basic

## Install & Develop

### Install
```bash
# install latest
$ npx create-expo-app@latest MyProject
# or install minimum files for template
$ npx create-expo-app MyProject --template blank
```

### Config in app.json
This is where expo pick up App related settings for App Store


### Run up
- run web/mobile
```bash
# These packages make sure we can open project in Web
$ npm install react-dom react-native-web @expo/metro-runtime
$ npx expo start
```

- run mobile ios only
```bash
# start dev server
$ cd MyProject
$ npm run ios
```

- demo config for Babel JS
```js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          alias: {
            "components": "./components",
            "hooks": "./hooks",
            "assets": "./assets",
          }
        }
      ]
    ],
  };
};
```


## Learn Path
- [react-native-practical-guide-code](https://github.com/academind/react-native-practical-guide-code)
- 基礎：Basics Fundamentals, Dynamic & Adaptive Layouts, Navigation
- 主要：Redux with React Native, Example App, User Input, Http Request
- 進階：User authenticate, Native Device Feature(Camera, Location), Push Notification, Publish App



## Library
### Icons
```bash
$ npx expo install @expo/vector-icons
```

### Image Picker
- [Link](https://docs.expo.dev/tutorial/image-picker/)
provides access to the system's UI to select images and videos from the phone's library or take a photo with the camera
```bash
$ npx expo install expo-image-picker
```

### Gesture
- [Link](https://docs.expo.dev/tutorial/gestures/)
provides built-in native components that can handle gestures
```bash
$ npx expo install react-native-gesture-handler react-native-reanimated
```

### ScreenShot
- [Link](https://docs.expo.dev/tutorial/screenshot/)
  - `react-native-view-shot`: allows taking a screenshot
  - `expo-media-library`: allows accessing a device's media library to save an image
```bash
$ npx expo install react-native-view-shot expo-media-library
```

### Svg
- [Link](https://docs.expo.dev/versions/latest/sdk/svg/)
- [Document](https://github.com/software-mansion/react-native-svg/blob/main/USAGE.md)
```bash
$ npx expo install react-native-svg
```

### Async Store
- [Link](https://docs.expo.dev/versions/latest/sdk/async-storage/)
```bash
$ npx expo install @react-native-async-storage/async-storage
```


## Status Bar/Splash Screen/App Icon
### StatusBar
allows configuring the app's status bar to change the text color, background color, make it translucent, and so on.
```js
import { StatusBar } from 'expo-status-bar';

<StatusBar style="auto" />
<StatusBar style="light" />
```
### Splash screen
a screen that is visible before the contents of the app has had a chance to load. It hides once the app is ready for use and the content is ready to be displayed，config in `app.json` file
- `app.json`
```json
{
  "expo": {
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#25292e"
    }
  }
}
```
### App Icon
same configured by defining a path to the "icon" property in the `app.json` file


## Debugging
[Debugging tools](https://docs.expo.dev/debugging/tools/)
- open devtool menu: `cmd + d`


## More to learn
- [Follow up](https://docs.expo.dev/tutorial/follow-up/)