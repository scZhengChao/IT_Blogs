# 源码

## 目录

- [源码解析：](#源码解析)
  - [初级：](#初级)
  - [进阶一点：](#进阶一点)
  - [enhancer/applymiddleware](#enhancerapplymiddleware)
  - [compose](#compose)

# 源码解析：

[【第2426期】各流派React状态管理对比和原理实现 硬核长文 https://mp.weixin.qq.com/s/h8uRkY8wzzP-ajmEIHkzwQ](https://mp.weixin.qq.com/s/h8uRkY8wzzP-ajmEIHkzwQ "【第2426期】各流派React状态管理对比和原理实现 硬核长文 https://mp.weixin.qq.com/s/h8uRkY8wzzP-ajmEIHkzwQ")

上面这篇文章相当深刻

[Redux 通关简洁攻略 -- 看这一篇就够了！ 学这个就够啦\~ https://mp.weixin.qq.com/s/P\_gDYJ2Nq1i5d-Sx2uDFwQ](https://mp.weixin.qq.com/s/P_gDYJ2Nq1i5d-Sx2uDFwQ "Redux 通关简洁攻略 -- 看这一篇就够了！ 学这个就够啦~ https://mp.weixin.qq.com/s/P_gDYJ2Nq1i5d-Sx2uDFwQ")

[  https://blog.csdn.net/weixin\_30606669/article/details/99915980%C2%A0](https://blog.csdn.net/weixin_30606669/article/details/99915980%C2%A0 "  https://blog.csdn.net/weixin_30606669/article/details/99915980%C2%A0")

**要理解数据是如何流动的；**

dispatch --> action --->reducer(state,action)-->store.state  同时 subscribe(）

## **初级：**

```javascript 
export default function createStore(reducer){
    let currentState = undefined;  //状态
    const currentListener = [] ; // 回调函数数组
    function getState(){
        return currentState
    }
    function dispatch(action){
        //修改
        currentState = reducer(currentState,action)
        //变更通知
        currentListener.forEach(cb=>cb())
        return action
    }
    function subscribe(cb){
        currentListener.push(cb)
    }
   //初始化状态 此处的作用 是让流程走一遍 初始化 state ，拿到state的默认值**
   dispatch({type:'@zhengchao-redux'})
    return {
        getState,dispatch,subscribe
    }
}
```


## **进阶一点：**

```javascript 
export  function createStore(reducer,enhancer){
** //如果存在enhancer;增强器 改进dispatch  **
**    // 注意：这个enhancer 可不是applyMiddleware，而是applyMiddleware（..middleware）的执行返回值 **
**    if(enhancer){**
**        //高阶函数 增强 createStore 并且返回一个函数 传入 reducer**
**        return enhancer(createStore)(reducer)**
**    }**
    let currentState = undefined;
    const currentListener = [] ; // 回调函数数组
    function getState(){
        return currentState
    }
    function dispatch(action){
        //修改  dispatch 直接到reducer
**  currentState = reducer(currentState,action)**
        //变更通知
        currentListener.forEach(cb=>cb())
        return action
    }
    function subscribe(cb){
        currentListener.push(cb)
    }
    //初始化状态
    dispatch({type:'@zhengchao-redux'})
    return {
        getState,dispatch,subscribe
    }
}
```


## enhancer/applymiddleware

```javascript 
// 就是 enhancer  函数, 翻译为增强函数  实际上就是applyMiddleware（） 的返回值
// 使dispatch 函数不能直接到 action 到reducer ；先经过中间件 最后到 reducer

export  function applyMiddleware (...middleware){
//接受若干中间件 返回一个强化函数  enhancer
//返回的函数接受createStore 返回一个函数；接受reducer 最为第二个参数 增强dispatch
//args 就是reducer
    return createStore =>(...args) =>{
 // 完成之前createStore的工作； 很简单 就是创建store
     const store = createStore(...args)
 //强化dispatch 不是直接派发一个action 到 reducer 去执行;先取出dispatch**
  // 强化是关键 ： 为的 就是改造dispatch  不能直接到 reducer**
        let dispatch = store.dispatch
// 传递给中间件的参数
        const midApi = {
            getState: store.getState,
            dispatch:(...args)=>dispatch(...args)
        }
//给中间件的传参都穿进去   中间件就是函数**
  const chain = middleware.map(mw=>mw(midApi))
        //强化dispatch ，让他可以按顺序执行中间件函数  ；
        //把多个函数变为一个函数;并把第一个函数的返回值作为第二个函数的入参
        //先经过中间件 在   执行最后的action
        //这里其实返回的的接受action的函数；这个函数在最后 dispatch 的时候执行；返回原来dispath的执行；
dispatch = compose(...chain)(store.dispatch)   // 函数聚合  把多个函数 转为一个函数
        // 返回全新的store，仅更新强化过的dispatch
       // store 是 createStore 的返回值 （包括dispatch getstate， subscribe）
       // 而 dispatch 被 这里的dispatch 给 取代了
        return {
            ...store,
            dispatch
        }
    }
}
```


```javascript 
     const createStore = (reducer, initialState, enhancer) => {
        // 如果传入了 applyMiddleware，那就调用它
        if (enhancer && typeof enhancer === 'function') {
            return enhancer(createStore)(
                reducer,
                initialState
            )
        }
        let state = initialState,
            listeners = [],
            isDispatch = false;
        // 获取 store
        const getState = () => state;
        // 发送一个 action
        const dispatch = (action) => {
            // action 不能同时发送
            if (isDispatch) return action;
            isDispatch = true;
            state = reducer(state, action);
            isDispatch = false;
            // 执行注册的事件
            listeners.forEach(listener => listener(state));
            return action;
        }
        // 监听 store 变化，注册事件
        const subscribe = (listener) => {
            if (typeof listener === "function") {
                listeners.push(listener);
            }
            return () => unsubscribe(listener);
        }
        // 移除注册的事件
        const unsubscribe = (listener) => {
            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        }
        return {
            getState,
            dispatch,
            subscribe,
            unsubscribe
        }
    }
```


## compose

```typescript 
export function compose(...funcs){
    if(funcs.length === 0){
        return arg => arg
    }
    if(funcs.length === 1){
        return funcs[0]
    }

  // 聚合函数数组 [fn1,fn2] =>(…args)=> f1(fn2(…args))  最后返回一个接受dispatch的高阶函数
  //；执行顺序 f2-->f1
  // 这里的 args 就是 上文 store.dispatch
  // 注意 这里的返回值是一个函数 
   return funcs.reduce((left,right)=>(...args)=>left(right(...args)))

}
```


[react-redux](./react-redux/index.md "react-redux")
