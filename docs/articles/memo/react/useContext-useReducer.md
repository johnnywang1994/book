# React useContext & useReducer 搭配

這篇是學習 React 的 useContext, useReducer 的一種實作方式，將相關程式碼放在一起方便閱讀，只是一個使用的範例提供紀錄與理解，實際開發時建議將各模組拆分出去


## 基礎實作範例

```jsx
import React, { useReducer, useContext } from 'react'
import { render } from 'react-dom'

// create Context
const StoreContext = React.createContext()

// action types
const actions = {
  add(state, action) {
    return {
      ...state,
      count: state.count + 1
    }
  }
}

// reducer
// use type to match keys in actions
function storeReducer(state, action) {
  const fn = actions[action.type]
  if (!!fn) return fn.call(state, state, action)
  throw Error(`action type ${action.type} not found`)
}

// StoreProvider
// initialize useReducer and Context Provider
function StoreProvider({ children }) {
  // initialize & bind reducer
  const [state, dispatch] = useReducer(storeReducer, {
    profile: {
      username: 'johnny',
      age: 30
    },
    count: 0,
  })
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

// children get context states with useContext
function InfoBlock() {
  const { state, dispatch } = useContext(StoreContext)

  const handlerClick = () => {
    dispatch({ type: 'add' })
    console.log(state)
  }

  return (
    <div onClick={handlerClick}>
      <h3>{state.profile.username}</h3>
      <p>{state.profile.age}</p>
      <p>count {state.count}</p>
    </div>
  )
}

// bind & apply StoreProvider to App
function App() {
  return (
    <StoreProvider>
      <InfoBlock />
    </StoreProvider>
  )
}

render(<App />, document.getElementById('app'))
```


## Constate 使用範例

- [NPM constate](https://www.npmjs.com/package/constate)

```js
// context/profile.js
import { useState, useCallback } from 'react';
import constate from 'constate';
import services from '../services';

export const [ProfileProvider, useProfileContext] = constate(({ useModal }) => {
  const [profile, setProfile] = useState({});
  console.log(useModal);

  const getProfile = useCallback(async () => {
    const res = await services.getProfile();
    setProfile(res);
  }, []);

  return [profile, getProfile];
});
```

```js
// context/modal.js
import { useState, useCallback } from 'react';
import constate from 'constate';

export const [ModalProvider, useModalContext] = constate(() => {
  const [modal, setModal] = useState({
    name: '',
    data: {},
  });

  const updateModal = useCallback((name, data) => {
    setModal((state) => ({
      name,
      data: data || state.data,
    }));
  }, []);

  const closeModal = useCallback(() => {
    setModal(() => ({ name: '', data: {}}));
  }, []);

  return [modal, updateModal, closeModal];
});
```

```jsx
// context/index.js
import { ProfileProvider, useProfileContext } from './Profile';
import { ModalProvider, useModalContext } from './Modal';

const Providers = [
  ProfileProvider,
  ModalProvider,
];

const hooks = {
  useProfileContext,
  useModalContext,
};

// wrap all provider, and pass hooks to constate
export default function ConstateProvider(props) {
  const { children } = props;
  let element = children;
  for (let i = 0;i < Providers.length; i++) {
    const Provider = Providers[i];
    element = (
      <Provider {...props} {...hooks}>{element}</Provider>
    );
  }
  return element;
}

export { useProfileContext } from './Profile';
export { useModalContext } from './Modal';
```