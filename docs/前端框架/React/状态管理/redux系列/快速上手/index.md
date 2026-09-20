# 快速上手

## 目录

- [1. 基本设置步骤](#1-基本设置步骤)
  - [安装依赖](#安装依赖)
- [2. Redux 核心概念设置](#2-Redux-核心概念设置)
  - [(1) 创建 store](#1-创建-store)
  - [(2) 使用 Provider 包裹应用](#2-使用-Provider-包裹应用)
- [3. 在函数组件中使用 React-Redux](#3-在函数组件中使用-React-Redux)
  - [方法一：使用 useSelector 和 useDispatch (推荐)](#方法一使用-useSelector-和-useDispatch-推荐)
  - [方法二：使用 connect (传统方式)](#方法二使用-connect-传统方式)
- [4. 异步操作 (使用 Redux Thunk)](#4-异步操作-使用-Redux-Thunk)
  - [(1) 安装中间件](#1-安装中间件)
  - [(2) 配置 store](#2-配置-store)
  - [(3) 创建异步 action](#3-创建异步-action)
  - [(4) 在组件中使用](#4-在组件中使用)
- [5. 最佳实践](#5-最佳实践)
- [6. 现代 Redux (Redux Toolkit 推荐)](#6-现代-Redux-Redux-Toolkit-推荐)

## 1. 基本设置步骤

### 安装依赖

```markdown 
npm install redux react-redux
# 或
yarn add redux react-redux
```


## 2. Redux 核心概念设置

### (1) 创建 store

```javascript 
// store.js
import { createStore } from 'redux';

// 初始状态
const initialState = {
  count: 0
};

// reducer 函数
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

// 创建 store
const store = createStore(rootReducer);

export default store;
```


### (2) 使用 Provider 包裹应用

```javascript 
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```


## 3. 在函数组件中使用 React-Redux

### 方法一：使用 useSelector 和 useDispatch (推荐)

```javascript 
// Counter.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Counter() {
  // 获取状态
  const count = useSelector(state => state.count);
  
  // 获取 dispatch 方法
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
}

export default Counter;
```


### 方法二：使用 connect (传统方式)

```javascript 
// Counter.js
import React from 'react';
import { connect } from 'react-redux';

function Counter({ count, increment, decrement }) {
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

// 映射状态到 props
const mapStateToProps = state => ({
  count: state.count
});

// 映射 dispatch 到 props
const mapDispatchToProps = dispatch => ({
  increment: () => dispatch({ type: 'INCREMENT' }),
  decrement: () => dispatch({ type: 'DECREMENT' })
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```


## 4. 异步操作 (使用 Redux Thunk)

### (1) 安装中间件

```bash 
npm install redux-thunk
```


### (2) 配置 store

```javascript 
// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
```


### (3) 创建异步 action

```javascript 
// actions.js
export const asyncIncrement = () => {
  return dispatch => {
    setTimeout(() => {
      dispatch({ type: 'INCREMENT' });
    }, 1000);
  };
};
```


### (4) 在组件中使用

```javascript 
function Counter() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch(asyncIncrement())}>
        异步增加 (1秒后)
      </button>
    </div>
  );
}
```


## 5. 最佳实践

1. **拆分 reducer**：使用`combineReducers`拆分大型 reducer
2. **action 常量**：使用常量定义 action 类型
3. **action 创建函数**：封装 action 创建逻辑
4. **选择器函数**：封装状态选择逻辑
5. **性能优化**：使用`React.memo`避免不必要的重渲染

```javascript 
// actionTypes.js
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

// actions.js
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });

// selectors.js
export const selectCount = state => state.count;
```


## 6. 现代 Redux (Redux Toolkit 推荐)

考虑使用 Redux Toolkit 简化 Redux 代码:

```bash 
npm install @reduxjs/toolkit
```


```javascript 
// store.js
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    counter: counterReducer
  }
});
```


[高级使用](./高级使用/index.md "高级使用")
