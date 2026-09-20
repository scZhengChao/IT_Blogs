# redux

## 目录

- [createStore() ](#createStore-)
  - [参数 ](#参数-)
- [compose](#compose)
- [applyMiddleware](#applyMiddleware)
- [自定义中间件：](#自定义中间件)

# createStore()&#x20;

- createStore(reducer, \[preloadedState], enhancer)&#x20;
- 创建一个 Redux [store](http://www.redux.org.cn/docs/api/Store.html "store") 来以存放应用中所有的 state。&#x20;
- 应用中应有且仅有一个 store。&#x20;

## 参数&#x20;

- reducer (Function): 接收两个参数，分别是当前的 state 树和要处理的 action，返回新的 state 树。&#x20;
- \[preloadedState] (any): 初始时的 state。 在同构应用中，你可以决定是否把服务端传来的 state 水合（hydrate）后传给它，或者从之前保存的用户会话中恢复一个传给它。如果你使用 combineReducers 创建 reducer，它必须是一个普通对象，与传入的 keys 保持同样的结构。否则，你可以自由传入任何 reducer 可理解的内容。&#x20;
- enhancer (Function): Store enhancer 是一个组合 store creator 的高阶函数，返回一个新的强化过的 store creator。这与 middleware 相似，它也允许你通过复合函数改变 store 接口。&#x20;

      createStore中的第二个参数preloadedState是可选的，如果省略第二个参数preloadedState，直接设置第三个参数composeEnhancers(用于添加中间件的)，那么createStore内部会进行处理，将preloadedState设置为undefined。或者第二个参数和第三个参数都没有的话，preloadedState也是undefined

       createStore()函数运行时会

**先在内部进行一次初始化的dispatch，来使state有一个初始值**

，这个初始化的过程中会&#x20;

**将preloadedState、单一reducer或者combineReducer生成的reducer、reducer中的参数state的默认值三者之间进行处理，得出一个初始化的state。**

1.单一reducer：

<1> 有preloadedState：

```javascript 
const store = createStore(reducer1,{open:55555},composeEnhancers(
    applyMiddleware(thunk)
));

reducer1 = （state={count:0},action）=>{

}
```


上例中的preloadedState = {open:55555}这个参数，那么preloadedState会在初始化的过程中出入reducer1中，从而覆盖掉reducer1中参数state的默认值{count:0}，使得reducer1中的state初始化时为 {open:55555}。

<2> 无preloadedState：

```javascript 
const store = createStore(reducer1,composeEnhancers(

applyMiddleware(thunk)

));

reducer2 = （state={count:0},action）=>{

}
```


上例中的preloadedState = undefined，那么createStore在初始化的过程中显式的将一个undefined传入reducer1中，根据es6函数参数的默认值相关知识可以知道，当显式的传入undefined时 ，参数state的默认值{count:0}会生效，使得reducer1中的state初始化时为 {count:0}。

2\. combineReducer()多个reducer混合

combineReducers的原理：&#x20;

```javascript 
combineReducers = reducers => {         
    return (state = {}, action) => {            
     return Object.keys(reducers).reduce((nextState, key) => {                     
              nextState[key] = reducers[key](state[key], action);                     
             return nextState;            
           },{});        
     }; 
}; 
```


**所以生成的reducer是一个函数，这个函数（reducer）返回的是一个包含各个key的大state。**

reducer = combineReducers({a:reducer1,b:reducer2})

<1> 有preloadedState：

```javascript 
const store = createStore(reducer,{a:{count:11}},composeEnhancers(

  applyMiddleware(thunk)

));

reducer1 = （state={count:0},action）=>{

}

reducer2 = （state={count:0},action）=>{

}
```


有preloadedState时，preloadedState中的key必须与combineReducers中传入的对象的key一样，否则通过combineReducers的原理我们可以看到这个preloadedState还是不会覆盖掉各个子reducer中的state的。preloadedState会首**先替换combineReducers()生成的大的reducer中state设置的默认值空对象{}**,然后通过combineReducers()中传**入的对象的key在 preloadedState找，看preloadedState有没有这个key，如果有的话，就会将preloadedState中的这个key的所对应的值传入到对应的子reducer中，从而将子reducer中的state的默认值替换掉。如果preloadedState中没有这个key，那么传入子reducer中的就是undefined，那么子reducer中state的默认值就会生效。**

上例中我们的preloadedState是{a:{count:11}}，那么初始化中会将子reducer1中的state默认值替换掉，换为{count:11}，而子reducer2还是原始的默认state {count:0}，因为preloadedState中并没有b这个key，所以从combineReducers原理中可以看到传入子reducer2中的state\[key]是一个undefined。

<2> 无preloadedState：

通过<1>中可以看到，如果没有preloadedState，那么combineReducers()生成的那个大的reducer中自带的state的默认值空对象{}就会生效，继而在初始化时，依次在空对象中找相应的key，空对象肯定是没有这个key的，所以初始化时所有的子reducer都是会使用其state设置的那个默认值。

<3>preloadedState为空对象{}，那么combineReducers()生成的那个大的reducer中自带的state的默认值空对象{}就会被preloadedState为空对象{}替换，继而在初始化时，依次在空对象中找相应的key，空对象肯定是没有这个key的，所以初始化时所有的子reducer都是会使用其state设置的那个默认值。<2>和<3>意思差不多

# compose

函数复合

```javascript 
function compose(...funcs){

  if(funcs.length === 0){
  
    return arg=>arg
  
  }
  
  if(funcs.length === 1){
  
    return funcs[0]
  
  }
  
  return funcs.reducer((left,right)=>(...args)=>left(right(...args)))

}
```


# applyMiddleware

applyMiddlewareware 实际上就是 enhancer 增强createStore；也就是redux的中间件机制

export const createThunkMiddleware = ({ dispatch, getState }) => next => action => {...}

三层嵌套关系。

```javascript 
function applyMiddleware (...middleware){
    return function(createStore){
        return (...reducers) =>{
            const store = createStore(...reducers)
            let dispatch = store.dispatch
            const midApi = {
                getState: store.getState,
                dispatch:(action)=>dispatch(action)
              }
           const chain = middleware.map(mw=>mw(midApi)) 
           dispatch = compose(...chain)(store.dispatch) 
           return { 
              ...store,
              dispatch
           }
        }
     }
}
```


# 自定义中间件：

```javascript 
// action 支持函数 并且 结束loadding
function thunkState({ dispatch, getState }) {
  return next => action => {
    try {
      if (getState().loading.loadingQueue.length <= 0) {
        dispatch(finishLoading())
      }
    } catch (e) {
      dispatch(finishLoading())
    }
    if (action && typeof action === 'function') {
      return dispatch(action(getState()))
    }
    return next(action)
  }
}
```


```javascript 
// action 为 promise 时 开启loading
function promise({ dispatch }) {
  return next => action => {
    if (action && typeof action.then === 'function') {
      dispatch(startLoading())
      const finishLoadingAndDispatch = (input) => {
        dispatch(finishLoading())
        dispatch(input)
      }
      return action.then(finishLoadingAndDispatch).catch(finishLoadingAndDispatch)
    }
    return next(action)
  }
}
```


```javascript 
// action 支持数组
function multiDispatcher({ dispatch }) {
  return next => actions => {
    if (Array.isArray(actions)) {
      return actions.map(action => dispatch(action))
    }
    return next(actions)
  }
}
```


```javascript 
export function writeLog(msg:string) {
  try {
    LogReporter.write('\r\n')
    LogReporter.write(`time:${new Date().toLocaleDateString()}`)
    const newMsg = typeof msg === 'string' ? msg : stringify(msg)
    LogReporter.write(`message:${newMsg}`)
  } catch (e) {
    // noting to do
  }
}
```


```javascript 
// 异常日志输出
function errorHandler({ dispatch }) {
  return next => action => {
    if (action instanceof Error) {
      const chinesePatten = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi
      const msg = action.message || ''
      const isFaceBookError = (msg || '').toLowerCase().includes('facebook.github.io')
      if (!isFaceBookError) {
        const position = ['\npos:{ line:', action.line, ',col:', action.column, ' }']
        const devMsg = [msg, ...position].join('')
        if (__DEV__) {
          Toast.showLongCenter(msg)
        } else if (chinesePatten.test(msg)) {
          Toast.showShortCenter(msg)
        }
        logger({ error: true, message: devMsg, action })
      }
      writeLog(msg)
      return action
    }
    try {
      return next(action)
    } catch (error) {
      return dispatch(error)
    }
  }
}
```


```javascript 
// redux-thunk 的源码：  action 支持函数
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }
    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```


```javascript 
// 拦截navigation的调转
export function loginAuthIntercept({ dispatch, getState }) {
  return (next) => (action) => {
    if (action && ['Navigation/PUSH', 'Navigation/NAVIGATE'].includes(action.type)) {
      const userInfo = _.get(getState(), 'user.userInfo', {})
      const routeName = action.page || action.routeName || ''
      if (!routeWhitelist.includes(routeName) && _.isEmpty(userInfo)) {
        return dispatch(pushRoute({ page: 'LaunchPage' }))
      }
    }
    return next(action)
  }
}
```
