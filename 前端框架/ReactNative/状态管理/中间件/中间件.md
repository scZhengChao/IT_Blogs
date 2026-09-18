# 中间件

## 目录

- [首先了解中间件在创建store中的作用：](#首先了解中间件在创建store中的作用)
- [其次了解enhancer 在中间件 和 createstore中的作用](#其次了解enhancer-在中间件-和-createstore中的作用)

# 首先了解中间件在创建store中的作用：

```javascript 
const enhancer = compose(
    middlewares,
    applyMiddleware(navigation),
    devToolsEnhander(),
)
const store = createStore(persistReducers, preloadedState, enhancer)

//其中：preloadedState 为初始化 store 值
//enhancer  为增强函数   这是给中间件提供了 入口 增强 reducer
if(enhancer){
    //高阶函数 增强 createStore 并且返回一个函数 传入 reducer
    return enhancer(createStore)(reducer)
}
//其中：persistReducers  reducer 和 routes 和 persist   结合 
const persistReducers = persistReducer(persistOpt, combineReducers({ routes: navReducer, ...reducers })) 

```


# 其次了解enhancer 在中间件 和 createstore中的作用

这个地方可以大致理解：

他是用来增强createstore的；createStore才是主要：reducer 是入参：

**enhancer(createStore)(reducer)**

**enhancer是啥？**

```javascript 
export function applyMiddleware (...middleware){

//接受若干中间件 返回一个强化函数 enhancer

//返回的函数接受createStore返回一个函数；接受reducer 最为第二个参数 增强dispatch

//args 就是reducer

  return createStore =>(...args) =>{

  // 完成之前createStore的工作； 很简单 就是创建store

  const store = createStore(...args)

  //强化dispatch 不是直接派发一个action 到 reducer 去执行;先取出dispatch

  // 强化是关键 ：为的就是改造dispatch 不能直接到reducer

    let dispatch = store.dispatch

      // 传递给中间件的参数

    const midApi = {

        getState: store.getState,

        dispatch:(...args)=>dispatch(...args)

      }

      //给中间件的传参都穿进去   中间件就是函数

    const chain = middleware.map(mw=>mw(midApi))

    //强化dispatch ，让他可以按顺序执行中间件函数；

    //把多个函数变为一个函数;并把第一个函数的返回值作为第二个函数的入参

    //先经过中间件 在 执行最后的action

    //这里其实返回的的接受action的函数；这个函数在最后 dispatch 的时候执行；返回原来dispath的执行；

    dispatch = compose(...chain)(store.dispatch)  // 函数聚合 把多个函数 转为一个函数
    
      //返回全新的store，仅更新强化过的dispatch
       // store 是 createStore 的返回值 （包括dispatch getstate， subscribe）
       // 而 dispatch 被 这里的dispatch 给 取代了

    return {
      ...store,
      dispatch
    }
  }
}
```


可以看出中间首先接受： { getState,dispatch}

返回的函数 接受action；这个action 经历重重的中间件 最后 由dispatch 发送出去：这就是每个中间件都要next(action) 的原因；如果不在next；则中间件链条就在这里断了；

答疑一： next 和 dispatch 的区别：

- dispatch 是增强过的dispatch ：如果你用了dispatch 则是 在走一圈所有的中间件；
- next 则是 上一个中间件； 最有一个中间则是上面全部中间件的累加；是一个闭包的过程
- **compose(...chain)(store.dispatch)  这句代码 就决定了中间件是从右到左 执行**

答疑二： applyMiddleware 是啥？为啥可以在创建store时 和compose用

- 是一个接受中间件 返回一个 接受createStore 和 返回createStore的函数；所以可以那样用；redux 有颇多这样的思想
- 纯净的createStore是啥；接受reducer 和 preloadedState 的函数
- 那这个地方不是增强了两次 dispatch吗？

```javascript 
 /**
 * @flow
 */

import { applyMiddleware } from 'redux'
import _ from 'lodash'
import { startLoading, finishLoading, callableNotLoading } from '../actions/loading'
import { Runnable, IStore } from '../types/lang'
import Toast from '../utils/toastUtils'

function thunkState({ dispatch, getState }: IStore) {
    return (next: Runnable<any>) => (action: any) => {
        try {
            if (getState().loading.loadingQueue.length <= 0) {
                dispatch(finishLoading())
            }
        } catch (e) {
            dispatch(finishLoading())
        }
        if (action && typeof action === 'function') {
            let actionResult = action(getState())
            if (action.disableLoading === true) {
                actionResult = callableNotLoading(actionResult)
            }
            return dispatch(actionResult)
        }
        return next(action)
    }
}

function promise({ dispatch, getState }: IStore) {
    return (next: Runnable<any>) => (action: any) => {
        if (action && typeof action.then === 'function') {
            const isEnableLoading = _.get(getState(), 'loading.enableLoading')
            const enableLoading = isEnableLoading && action.disableLoading !== true
            if (enableLoading) {
                dispatch(startLoading())
            }

            const finishLoadingAndDispatch = (input: any) => {
                if (enableLoading) {
                    dispatch(finishLoading())
                }
                dispatch(input)
            }
            return action.then(finishLoadingAndDispatch).catch(finishLoadingAndDispatch)
        }
        return next(action)
    }
}

function multiDispatcher({ dispatch }: IStore) {
    return (next: Runnable<any>) => (actions: any[]) => {
        if (Array.isArray(actions)) {
            return actions.map(action => dispatch(action))
        }
        return next(actions)
    }
}

function errorHandler({ dispatch }: IStore) {
    return (next: Runnable<any>) => (action: any) => {
        if (!(action instanceof Error)) {
            try {
                return next(action)
            } catch (error) {
                return dispatch(error)
            }
            return
        }

        const chinesePatten = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi
        const msg = action.message || ''
        const isFaceBookError = (msg || '').toLowerCase().includes('facebook.github.io')
        if (!isFaceBookError) {
            if (__DEV__) {
                Toast.showLongBottom(msg)
                // throw action
            } else if (chinesePatten.test(msg)) {
                // const alert = __DEV__ ? '' : '请重新登陆账号，如有问题请联系客服：'
                Toast.showShortBottom(msg)
            }
            // logger({error: true, message: msg, action})
        }
        return action
    }
}

const filterNil = () => (next: Runnable<any>) => (action: Runnable<any>) => {
    if (action) {
        next(action)
    }
}

export default applyMiddleware(multiDispatcher, errorHandler, promise, thunkState, filterNil)

```


action/loadding.ts

```javascript 
/**
 * @flow
 */

import { Callback } from '../types/lang'
import { initialState } from '../reducers/loading/loadingReucer'
import toastUtils from '../utils/toastUtils'
import _ from 'lodash'

export const startLodingTypeKey = 'app/startLoading'
export const cancelLoadingTypeKey = 'app/cancelLoading'

export function startLoading(showText?: string, onCancel?: Callback) {
    return (state: any) => {
        const {
            loading: { showLoadingText },
        } = state
        const text = showText || showLoadingText
        return {
            type: startLodingTypeKey,
            showLoadingText: text,
            isCanCancel: !!onCancel,
            onCancel,
        }
    }
}

export function finishLoading() {
    return {
        type: 'app/finishLoading',
        showLoadingText: initialState.showLoadingText,
    }
}

export function disableLoading() {
    return {
        type: 'app/disableLoading',
    }
}

export function cancelLoading() {
    return {
        type: cancelLoadingTypeKey,
    }
}

export function setLoadingText(showLoadingText?: string) {
    return {
        type: 'app/setLoadingText',
        showLoadingText,
    }
}

export function enableLoading() {
    return {
        type: 'app/enableLoading',
    }
}

export function disableLoadingAction(action: any, ...args: any) {
    const disableLoad: any = disableLoading()
    return [
        disableLoad,
        async (state: any) => {
            try {
                return [await action(state, ...args), enableLoading]
            } catch (e) {
                return [e, enableLoading]
            }
        },
    ]
}

export function disableLoadingActionWrapper(action: any) {
    return (...args: any) => disableLoadingAction(action, ...args)
}

// @ts-ignore
export const callableNotLoading = (fns: any) => {
    if (typeof fns === 'function' || (!!fns && typeof fns.then === 'function')) {
        Object.assign(fns, { disableLoading: true })
    } else if (Array.isArray(fns)) {
        return fns.map(fn => callableNotLoading(fn))
    }
    return fns
}
export const catchMethod = (fn: Callback) => async (...arg: any) => {
    try {
        return await fn(...arg)
    } catch (e) {
        toastUtils.showShortCenter(e.message)
    }
    return Promise.resolve()
}

export function callWithoutLoading(promiseFN: any) {
    // @ts-ignore
    return (...arg: any) => disableLoadingAction(() => callWithLoading(promiseFN)(...arg))
}

export const callWithLoading = (promiseMethod: any) => async (arg: any) => {
    const { callback = _.noop, handleError = false, ...ext } = arg || {}
    try {
        callback(await promiseMethod(ext), null)
    } catch (e) {
        if (!handleError) throw e
        callback(null, e)
    }
    return []
}

export const waitDispatch = (dispatch: any, method: any, args: any) =>
    new Promise((resolve, reject) => {
        dispatch(
            method({
                callback: (data?: any, error?: any) => {
                    data ? resolve(data) : reject(error)
                },
                handleError: true,
                ...args,
            }),
        )
    })

```
