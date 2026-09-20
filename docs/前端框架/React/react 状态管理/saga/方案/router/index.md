# router

## 目录

- [connected-react-router](#connected-react-router)

## connected-[react-router](https://so.csdn.net/so/search?q=react-router\&spm=1001.2101.3001.7020 "react-router")

**描述：**

此库可以让redux中完成路由跳转相关的功能。

安装：`yarn add connected-react-router`

**使用步骤：**

1. 在 src 目录下创建 history.js 文件，并书写如下代码：

```javascript 
// history模块它是react-router-dom安装成功后就存在的，无需手动再安装
import { createBrowserHistory, createHashHistory } from 'history'
const history = createBrowserHistory()
// 告知当前路由的模式为 history模式
export default history

```


1. 在入口文件中把原来的react-router-dom中定义路由模式组件更换：

```javascript 
import React from 'react'
import ReactDOM from 'react-dom'

// 路由
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// 使用connected-react-router库，就需要把原来的路由模式组件进行更换
import { ConnectedRouter as Router } from 'connected-react-router'
import history from './history'

// redux
import { Provider } from 'react-redux'
import store from './store'

import App from './App'

// 后台首页

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)

```


1. 在 reducer 模块中，定义一个 router 的模块

```javascript 
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import history from '@/history'

import user from './user'
import count from './count'

export default combineReducers({
  // 添加一个 router 的模块
  router: connectRouter(history),
  user,
  count
})

```


1. 在redux入口文件中，以中间件的方式把connected-react-router包含到redux中

```javascript 
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
// 中间件
// import thunk from 'redux-thunk'

// 合并后的reducer
import reducer from './reducer'

// saga中间件
import createSagaMiddleware from 'redux-saga'
import mainSaga from './sagas'

// redux中路由
import { routerMiddleware } from 'connected-react-router'
import history from '@/history'

const sagaMiddleware = createSagaMiddleware()

// 在redux入口文件中，以中间件的方式把connected-react-router包含到redux中
const store = createStore(reducer, composeWithDevTools(applyMiddleware(routerMiddleware(history), sagaMiddleware)))

// 运行saga
sagaMiddleware.run(mainSaga)

export default store

```


1. 在 redux 中间件中就可以完成路由跳转：

userSaga.js：

```javascript 
import { put, takeEvery, call } from 'redux-saga/effects'
// put 它是saga提供给我们，用于发送指令给reducer来完成同步操作
// takeEvery 监听每一次dispatch发送的指令

// 通过库，可以完成在redux中实现跳转跳转功能
import { push, replace, goBack } from 'connected-react-router'
// call方法，调用Promise对象
//  引入网络请求方法
import { loginApi } from '@/api/userApi'

export default function* watchSaga() {
  yield takeEvery('asyncLogin', login)
}

// 在此处完成网络请求就可以了
// generator的返回值，不是普通函数这样的返回值，这样在登录成功后，无法让前端的组件完成路由的切换,
// 切换的原则是登录成功后，才能能跳转，登录的过程它是一个异步的，所以此时工作就有点难受，所以需要用到库
function* login({ payload }) {
  // call内部实现了 co 方法，可以将自己的返回值返回给 ret
  let ret = yield call(loginApi, payload)
  // 得到的数据同步到redux中
  if (ret.code === 0) {
    // 通过reducer完成redux中的数据更新  登录成功
    yield put({ type: 'userLogin', payload: ret.data })
    // 跳转到后台首页 -- 在redux中间件中就可以完成路由的跳转
    yield put(push('/'))
  }
}

```


1. 在前台页面不用使用 hack 方式，而是使用当前库实现路由跳转：

```javascript 
import React from 'react'
// react-redux提供的hook工具函数
import { useDispatch, useSelector } from 'react-redux'

const Login = ({ history }) => {
  const dispatch = useDispatch()
  let num = useSelector(state => state.count.num)

  const doLogin = () => {
    // 进行登录，它是一个异步的，交给saga，saga会完成异步操作，通知reducer完成同步修改redux中的state数据改变
    // reducer把state中的数据修改后，因为我在当前的组件中有通过useEffect来依赖此state中的值的变化，所以它只要变化了，我就可以来跳转，从而可以确认redux中的数据一定是存在后才跳转的
    dispatch({ type: 'asyncLogin', payload: { username: 'admin', password: 'admin888' } })
  }

  return (
    <div>
      <h3>
        {num}
      </h3>
      <button onClick={doLogin}>进入系统</button>
    </div>
  )
}

export default Login

```
