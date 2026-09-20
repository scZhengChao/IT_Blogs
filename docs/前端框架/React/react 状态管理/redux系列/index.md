# redux系列

## 目录

- [基础应用](#基础应用)
  - [异步action](#异步action)
  - [reducer](#reducer)
  - [store 模块化](#store-模块化)

# 基础应用

## **异步action**

```javascript 
 
异步action + 可复用:    dispatch(asyncAction(xx,xx,xx))  dispatch 接受对象  asyncAtion内部要返回对象
异步action + 可复用:    dispatch(asyncAction)  dispatch 不接受函数  
    需要中间件redux-thunk支持 ,dispatch默认支持对象，不接受函数,中间件用来改装dispatch
    let store = createStore(
      reducer,
      state,
      applyMiddleware(thunk)  applyMiddleware是redux API
    );
    asyncAction = (url,type,id) => (dispatch,getState)=>{dispatch1次 + return fetch+then+dispath2次}

```


[react中间件的概念\_yuanyuanispeak的博客-CSDN博客\_react 中间件 一、中间件的概念为了理解中间件，让我们站在框架作者的角度思考问题：如果要添加功能，你会在哪个环节添加？（1）Reducer：纯函数，只承担计算 State 的功能，不合适承担其他功能，也承担不了，因为理论上，纯函数不能进行读写操作。（2）View：与 State 一一对应，可以看作 State 的视觉层，也不合适承担其他功能。（3）Action：存放数据的对象， https://blog.csdn.net/yuanyuanispeak/article/details/78842963](https://blog.csdn.net/yuanyuanispeak/article/details/78842963 "react中间件的概念_yuanyuanispeak的博客-CSDN博客_react 中间件 一、中间件的概念为了理解中间件，让我们站在框架作者的角度思考问题：如果要添加功能，你会在哪个环节添加？（1）Reducer：纯函数，只承担计算 State 的功能，不合适承担其他功能，也承担不了，因为理论上，纯函数不能进行读写操作。（2）View：与 State 一一对应，可以看作 State 的视觉层，也不合适承担其他功能。（3）Action：存放数据的对象， https://blog.csdn.net/yuanyuanispeak/article/details/78842963")

## **reducer**

纯函数

```javascript 
 import * as types from '../types';
let loginState = {
  c:3,
  d:4
}
let login = (state=loginState,action)=>{
  let {type,payload} = action
  switch(type){
    case types.subtract : return Object.assign({},state,{d:1})
    default : return state
  }
}
export default login
```


## **store 模块化**

```javascript 
 import React from 'react';
import { createStore, applyMiddleware ,combineReducers } from 'redux'
import thunk from "redux-thunk";  
import  login from './module/login.js';
import home from './module/home';

// 合并reducer
let reducer = combineReducers({
  login,
  home
})

let store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store
```


[常见问题](IT/前端框架/React/react%20状态管理/redux系列/常见问题/常见问题.md "常见问题")

[源码](IT/前端框架/React/react%20状态管理/redux系列/源码/源码.md "源码")

[中间件](IT/前端框架/React/react%20状态管理/redux系列/中间件/中间件.md "中间件")

[快速上手](IT/前端框架/React/react%20状态管理/redux系列/快速上手/快速上手.md "快速上手")

[@reduxjs/toolkit](./@reduxjs-toolkit/index.md "@reduxjs/toolkit")
