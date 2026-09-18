# redux插件

## 目录

- [redux-persist](#redux-persist)
  - [案例：](#案例)
  - [项目：](#项目)
- [bug：](#bug)

# redux-persist

[Redux-persist使用 - 歆轶 - 博客园 redux-persist作用是将store中的数据缓存到浏览器中，减少数据请求，每当白名单中的数据发生变化，才会进行一次更新缓存的操作，并且这个数据缓存是存在localStorage中的，不是会话级 https://www.cnblogs.com/ljwk/p/9605444.html](https://www.cnblogs.com/ljwk/p/9605444.html "Redux-persist使用 - 歆轶 - 博客园 redux-persist作用是将store中的数据缓存到浏览器中，减少数据请求，每当白名单中的数据发生变化，才会进行一次更新缓存的操作，并且这个数据缓存是存在localStorage中的，不是会话级 https://www.cnblogs.com/ljwk/p/9605444.html")

redux-persist作用是将store中的数据缓存到浏览器中，减少数据请求，每当白名单中的数据发生变化，才会进行一次更新缓存的操作，并且这个数据缓存是存在localStorage中的，不是会话级别的缓存。&#x20;

  安装方式两种：npm install --save redux-persist / yarn add redux-persist&#x20;

  实现方式主要是依靠两个方法：persistStore和persistReducer，使用persistReducer时需要指定persistConfig，这一项就是你需要缓存的数据处理项，它有着黑白名单的处理方式，还需要一个storage的协助&#x20;

## 案例：

import {persistStore, persistReducer} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

// BLACKLIST

const persistConfig = {

  key: 'root', // key是放入localStorage中的key

  storage: storage, // storage简单就可以理解成localStorage的功能封装吧，不过有时候由于版本问题，必要在后一个storage上加一个default属性，可以在console中打出来判断是否需要加

  blacklist: \['navigation'] // navigation不会被存入缓存中，其他会，适用于少部分数据需要实时更新

};

// WHITELIST

const persistConfig = {

  key: 'root',

  storage: storage,

  whitelist: \['navigation'] // navigation会存入缓存，其他不会存，适用于大多数数据并不会实时从后台拿数据

};

然后在处理reducer时用到persistReducer，一种是直接使用，另一种你可能会使用到combineReducers，接下来就是创建store了，可能会用到中间件，不过此时不要理睬中间件创建store的过程，期间和你之前的创建方式一样，在store创建好的外边，加一句话，然后export里包含persistor就好：

const reducers = persistReducer(persistConfig, reducer);&#x20;

const reducers = combineReducers({&#x20;

&#x20;   depReducer: persistReducer(persistConfig, depReducer)&#x20;

&#x20;});&#x20;

const persistor = persistStore(store);&#x20;

导出store就行

## 项目：

import { AsyncStorage } from 'react-native'
import { persistStore, persistReducer } from 'redux-persist'

&#x20;const persistOpt = { key: 'root', storage: AsyncStorage, whitelist, blacklist，timeout: null }

&#x20;const persistReducers = persistReducer(persistOpt, combineReducers({ routes: navReducer, ...reducers })) const store = createStore(persistReducers, enhancer) persistStore(store)

export store

# bug：

Getting error redux-persist: rehydrate for "root" called after timeout ：

const persistConfig = { key: 'root', storage, timeout: null };

[Getting error redux-persist: rehydrate for "root" called after timeout · Issue #717 · rt2zz/redux-persist redux-persist: rehydrate for \&amp;quot;root\&amp;quot; called after timeout., Object { \&amp;quot;INITIALIZING\&amp;quot;: true, \&amp;quot;\_persist\&amp;quot;: Object { \&amp;quot;rehydrated\&amp;quot;: ... https://github.com/rt2zz/redux-persist/issues/717](https://github.com/rt2zz/redux-persist/issues/717 "Getting error redux-persist: rehydrate for \"root\" called after timeout · Issue #717 · rt2zz/redux-persist redux-persist: rehydrate for \&amp;quot;root\&amp;quot; called after timeout., Object { \&amp;quot;INITIALIZING\&amp;quot;: true, \&amp;quot;_persist\&amp;quot;: Object { \&amp;quot;rehydrated\&amp;quot;: ... https://github.com/rt2zz/redux-persist/issues/717")
