# React Native - basic

## Core Components
- [Documentation](https://reactnative.dev/docs/components-and-apis)

| React Native UI Component | Android View       | iOS View             | Web Analog                  | Description                                                                                           |
|---------------------------|--------------------|----------------------|-----------------------------|-------------------------------------------------------------------------------------------------------|
| &lt;View&gt;              | &lt;ViewGroup&gt;  | &lt;UIView&gt;       | A non-scrolling &lt;div&gt; | A container that supports layout with flexbox, style, some touch handling, and accessibility controls |
| &lt;Text&gt;              | &lt;TextView&gt;   | &lt;UITextView&gt;   | &lt;p&gt;                   | Displays, styles, and nests strings of text and even handles touch events                             |
| &lt;Image&gt;             | &lt;ImageView&gt;  | &lt;UIImageView&gt;  | &lt;img&gt;                 | Displays different types of images                                                                    |
| &lt;ScrollView&gt;        | &lt;ScrollView&gt; | &lt;UIScrollView&gt; | &lt;div&gt;                 | A generic scrolling container that can contain multiple components and views                          |
| &lt;TextInput&gt;         | &lt;EditText&gt;   | &lt;UITextField&gt;  | &lt;input type="text"&gt;   | Allows the user to enter text                                                                         |


### View/SafeAreaView
basic page/container view component(like div), eg. styling image or page wrapper

### Text
text string must be wrapped by this component

### Image
- Demo
```js
import { Image } from 'react-native';

// require local image file
const PlaceholderImage = require('./assets/images/background-image.png');

export default function ImageViewer({ placeholderImage, selectedImage }) {
  const imageSource = selectedImage ? { uri: selectedImage } : placeholderImage;
  return (
    <Image source={imageSource} style={{ resizeMode: 'contain' }} />
  );
}
```

### TextInput
- onChangeText
- onSubmitEditing
```js
<TextInput
  style={{height: 40}}
  placeholder="Type here to translate!"
  onChangeText={newText => setText(newText)}
  defaultValue={text}
/>
```

### ScrollView
- `pagingEnabled`: allow paging through views using swiping gestures
- `maximumZoomScale/minimumZoomScale`: on IOS, ScrollView with a single item can be used to allow the user to zoom content

> `ScrollView` 最適合用在有限度尺寸的 small number of things。所有 ScrollView 中的 elements、views 會被渲染, 即便他們並不在顯示在此刻的畫面上. 如果需要一個超出畫面的長列表項目，請使用 `FlatList`

### FlatList
- displays a scrolling list of changing, but similarly structured, data
- only renders elements that are currently showing on the screen, not all the elements at once
- `data`: source of information for the list
- `renderItem`: takes one item from the source and returns a formatted component to render
```js
import { useState } from 'react';
import { StyleSheet, FlatList, Image, Platform, Pressable } from 'react-native';

const emojiList = [
  require('../assets/images/emoji1.png'),
  require('../assets/images/emoji2.png'),
  require('../assets/images/emoji3.png'),
  require('../assets/images/emoji4.png'),
  require('../assets/images/emoji5.png'),
  require('../assets/images/emoji6.png'),
];

export default function EmojiList({ onSelect, onCloseModal }) {
  const [emoji] = useState(emojiList);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onSelect(item);
            onCloseModal();
          }}>
          <Image source={item} key={index} style={styles.image} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
```

### SectionList
render a set of data broken into logical sections, maybe with section headers, similar to UITableViews on iOS

```js
import React from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';

const SectionListBasics = () => {
  return (
    <View>
      <SectionList
        sections={[
          {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
          {
            title: 'J',
            data: [
              'Jackson',
              'James',
              'Jillian',
              'Jimmy',
              'Joel',
              'John',
              'Julie',
            ],
          },
        ]}
        renderItem={({ item }) => <Text>{item}</Text>}
        renderSectionHeader={({section}) => (
          <Text>{section.title}</Text>
        )}
        keyExtractor={item => `basicListEntry-${item}`}
      />
    </View>
  );
};
```

### Pressable
handling press event
```js
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function Button({ label, onPress }) {
  return (
    <View>
      <Pressable onPress={onPress}>
        <Text>{label}</Text>
      </Pressable>
    </View>
  );
}
```

### TouchableOpacity
使視圖正確響應觸控的包裝器。按下時，包裹視圖的不透明度會降低，使其變暗
```js
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const App = () => {
  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);

  return (
    <View>
      <View>
        <Text>Count: {count}</Text>
      </View>
      <TouchableOpacity activeOpacity={0.2} onPress={onPress}>
        <Text>Press Here</Text>
      </TouchableOpacity>
    </View>
  );
};
```


### StyleSheet
```js
import { StyleSheet } from 'react-native';

export default function App() {
  return (
    <Text style={styles.text}>Hello</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontSize: 16,
  },
})
```

### Modal
basic popup modal, should style the modal by yourself
```js
import { Modal } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function EmojiPicker({ isVisible, children, onClose }) {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Choose a sticker</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    position: 'absolute',
    bottom: 0,
    height: '25%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '16%',
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
})
```

### Platform
gives access to information about the platform on which the app is currently running
```js
import { Platform } from 'react-native';

export default function App() {
  const onSaveImageAsync = async () => {
    if (Platform.OS !== 'web') {
      // In mobile
    } else {
      // In Web
    }
  }
}
```


## Hooks
### useWindowDimension
- [Link](https://reactnative.dev/docs/usewindowdimensions)
```js
import React from 'react';
import { View, StyleSheet, Text, useWindowDimensions } from 'react-native';

const App = () => {
  const {height, width, scale, fontScale} = useWindowDimensions();
  return (
    <View>
      <Text>Window Dimension Data</Text>
      <Text>Height: {height}</Text>
      <Text>Width: {width}</Text>
      <Text>Font scale: {fontScale}</Text>
      <Text>Pixel ratio: {scale}</Text>
    </View>
  );
};

export default App;
```


## Trouble Shooting
- [Link](https://reactnative.dev/docs/troubleshooting)