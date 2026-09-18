# 获取状态

## 目录

- [select](#select)
- [hooks](#hooks)

# select

`select(selector, ...args)`

```javascript 
selector: Function - 一个 (state, ...args) => args 的函数。
   它接受当前 state 和一些可选参数，并返回当前 Store state 上的一部分数据。
args: Array<any> - 传递给选择器的可选参数，将追加在 getState 后。
```


如果调用 select 的参数为空（即 yield select()），那么 effect 会取得完整的 state（与调用 getState() 的结果相同）

```javascript 
// state
state = {
 cart: {...}
}

// selector
const getCart = state => state.cart

// saga.js
import { take, fork, select } from 'redux-saga/effects'
function* checkout() {
 // 使用被导出的选择器查询 state
 const cart = yield select(getCart)
 // ... 调用某些 API，然后发起一个 success/error action
}
export default function* rootSaga() {
 while (true) {
   yield take('CHECKOUT_REQUEST')
   yield fork(checkout)
 }
}
```


# hooks

```javascript 
import React, { useEffect } from 'react'
// react-redux提供的hook工具函数
import { useDispatch, useSelector } from 'react-redux'
// useSelector : 读取redux的state的数据
// useDispatch : 修改redux的state的数据

const Login = ({history}) => {
  const dispatch = useDispatch()
  let num = useSelector(state => state.count.num)
  let uid = useSelector(state => state.user.uid)

  // hack处理方案，完成登录成功后，路由跳转
  // 只要 uid 发生改变（由零变为2000），这个函数就被触发
  useEffect(() => {
    // uid初始值为0，只要你登录成功，则一定会大于0，表示登录成功，跳转到后台
    if (uid > 0) history.push('/')
  }, [uid])

  const doLogin = () => {
    // 进行登录，它是一个异步的，交给saga，saga会完成异步操作，通知reducer完成同步修改redux中的state数据改变
    // reducer把state中的数据修改后，因为我在当前的组件中有通过useEffect来依赖此state中的值的变化，所以它只要变化了，我就可以来跳转，从而可以确认redux中的数据一定是存在后才跳转的
    dispatch({ type: 'asyncLogin', payload: { username: 'admin', password: 'admin888' } })
  }

  return (
    <div>
      <h3>
        {num} -- {uid}
      </h3>
      <button onClick={doLogin}>进入系统</button>
    </div>
  )
}

export default Login

```
