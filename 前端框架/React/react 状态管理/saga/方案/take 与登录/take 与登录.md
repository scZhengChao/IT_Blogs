# take 与登录

## 目录

- [take的灵活使用](#take的灵活使用)
- [错误处理方式](#错误处理方式)

### take的灵活使用

来看一个例子：

```javascript 
import { take, put } from 'redux-saga/effects'

function* watchFirstThreeTodosCreation() {
    for (let i = 0; i < 3; i++) {
        const action = yield take('TODO_CREATED')
    }
    yield put({type: 'SHOW_CONGRATULATION'})
}
// 在这里就是接受了三次添加的action之后就不再接受这个action，而是触发一个祝贺的action，随后这个saga也就结束了，
//直接使用take来实现很简单，但是如果使用takeEvery或是takeLatest的话就难以实现，可以初步看到take的灵活之处。
```


接着来看一个loginFlow：

```javascript 
function* loginFlow() {
    while (true) {
        yield take('LOGIN')
        // ... perform the login logic
        yield take('LOGOUT')
        // ... perform the logout logic
    }
}
// 在使用take实现loginFlow的时候只需要一个逻辑块，流程很清楚，
//但是如果使用takeEvery的话就需要两个逻辑块分别维护login的状态和logout的状态

```


接下来对loginFlow进行完善：

```javascript 
import { take, call, put } from 'redux-saga/effects'
import Api from '...'

function* authorize(user, password) {
    try {
        const token = yield call(Api.authorize, user, password)
        yield put({type: 'LOGIN_SUCCESS', token})
        return token
    } catch(error) {
        yield put({type: 'LOGIN_ERROR', error})
    }
}

function* loginFlow() {
    while (true) {
        const {user, password} = yield take('LOGIN_REQUEST')
        const token = yield call(authorize, user, password)
        if (token) {
            yield call(Api.storeItem, {token})
            yield take('LOGOUT')
            yield call(Api.clearItem, 'token')
        }
    }
}
// 上面的流程是触发login的action后call了authorize的函数，然后就等待执行结果，如果成功就返回token，失败就触发login error。如果login成功就可以进入if块，保存token并等待logout的action，但是如果login失败就有循环到等待login的状态。
// 看似流程很完美，但是问题在于如果用户点击了login之后正在authorize，但是这时用户又想logout了，这时logout的action将会被Miss。 因为整个流程在call的阶段pending着。
```


进一步改造：

```javascript 
import { fork, call, take, put } from 'redux-saga/effects'
import Api from '...'

function* authorize(user, password) {
    try {
        const token = yield call(Api.authorize, user, password)
        yield put({type: 'LOGIN_SUCCESS', token})
        yield call(Api.storeItem, {token})
    } catch(error) {
        yield put({type: 'LOGIN_ERROR', error})
    }
}

function* loginFlow() {
    while (true) {
        const {user, password} = yield take('LOGIN_REQUEST')
        yield fork(authorize, user, password)
        yield take(['LOGOUT', 'LOGIN_ERROR'])
        yield call(Api.clearItem, 'token')
    }
}
//  利用fork代替call可以解决阻塞的问题 
// 但是也带来了新的问题
// 如果在authorize的过程中触发logout，随后authorize成功就会出现问题，就是后续无法直接登出了
```


解决上述问题：

```javascript 
import { take, put, call, fork, cancel } from 'redux-saga/effects'

// 解决方法就是如果logout触发的话就cancel前面login的task

function* loginFlow() {
    while (true) {
        const {user, password} = yield take('LOGIN_REQUEST')
        // fork return a Task object
        const task = yield fork(authorize, user, password)
        const action = yield take(['LOGOUT', 'LOGIN_ERROR'])
        if (action.type === 'LOGOUT')
         yield cancel(task) 
        yield call(Api.clearItem, 'token')
    }
}
```


最后对authorize函数改造一下，来应对如果中途被cancel的情况：

```javascript 
    import { take, call, put, cancelled } from 'redux-saga/effects'
    import Api from '...'

    function* authorize(user, password) {
        try {
            const token = yield call(Api.authorize, user, password)
            yield put({type: 'LOGIN_SUCCESS', token})
            yield call(Api.storeItem, {token})
            return token
        } catch(error) {
            yield put({type: 'LOGIN_ERROR', error})
        } finally {
            if (yield cancelled()) {
            // ... put special cancellation handling code here
            }
        }
    }
     // 对其添加finally块，里面的逻辑即使是task被cancel也会执行的，这样就可以在里面放一些clean的逻辑 
    // 譬如在login触发后authorize的过程中set了isLogin为true，这时有spinner在转，但是随即就触发了logout action，如果不做一些清理的措施，isLogin就会保持true，这时就需要在finally块中做一些清理的逻辑
```


## 错误处理方式

1. try-catch方式：

```javascript 
    import Api from './path/to/api'
    import { call, put } from 'redux-saga/effects'

    // 如果在Api.fetch的过程中报错的话就进入catch

    function* fetchProducts() {
        try {
            const products = yield call(Api.fetch, '/products')
            yield put({ type: 'PRODUCTS_RECEIVED', products })
        }
        catch(error) {
            yield put({ type: 'PRODUCTS_REQUEST_FAILED', error })
        }
    }
```


1. 改造api来避免使用try-catch

```javascript 
    import Api from './path/to/api'
    import { call, put } from 'redux-saga/effects'

    function fetchProductsApi() {
        return Api.fetch('/products')
            .then(response => ({ response }))
            .catch(error => ({ error }))
    }
    // 对api进行了改造，对于是否报错返回不同的内容，由于这里已经catch了error，那么在generator function里面就不需要再做try-catch的操作了

    function* fetchProducts() {
        const { response, error } = yield call(fetchProductsApi)
        if (response)
            yield put({ type: 'PRODUCTS_RECEIVED', products: response })
        else
            yield put({ type: 'PRODUCTS_REQUEST_FAILED', error })
    }
```
