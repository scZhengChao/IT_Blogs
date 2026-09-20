# 中间件

## 目录

- [中间件：（Array\<Function>）](#中间件ArrayFunction)
  - [自定义中间件](#自定义中间件)
  - [中间件（处理异步操作）](#中间件处理异步操作)

# **中间件：（Array\<Function>）**

- **是一个函数； 且必须返回一个函数，** 
- **第一个函数参数 midApi  {state，dispatch（） }**
- **第二个函数的参数 第一个是dispatch 后面的依次为上一个函数的返回值，且返回值是新的 dispatch**

\*\*   dispatch 的返回值 就是action\*\*​

**返回的函数执行后的返回值**才是真正&#x20;

\*\*最为第二个中间件返回的函数 \*\*的参数 

    ***所有中间件的执行结果是返回一个改装后的dispatch***

**看下面例子**

**一个函数， 返回一个函数 ，该函数的入参是上一个函数返回处理过的dispatch 该函数的执行的返回值；是他自己处理过的dispatch**

**第一个函数**

**接受getState 和  (...args)=>dispatch(...args)**

## **自定义中间件**

```typescript 
function logger ({getstate}){
// 返回中间件的真正的执行函数  接受一个dispatch 返回一个dispatch
    return next => action =>{
        //执行中间件任务
        console.log(action.type + '执行了！！')
        //执行下一个中间件  最终执行的函数；如果是最后一个，就是 原dispatch 函数， 其他的情况下为传入的 dispatch函数
        return next(action)
    }

}
```


\*\*thunk 实现 \*\*​

```typescript 
const thunk = ({dispatch,getState}) => next => action => {    
    //增加唯一处理函数action的能力
    if (typeof action == 'function') { 
      //action默认是对象， 当action为函数时；
      //该函数 接受dispatch 和 getState 且 执行的返回值
      return action(next, getState) 
    }    
    //不是函数直接跳过
    return next(action)
}
```


**// 从外到里执行；从右到左执行**

const store = createStore(counterReducer,applyMiddleware(thunk,logger))

## **中间件（处理异步操作）**

**和koa，express 的中间件原理非常相似； action等到所有中间件 进行完了 ，在到reducer返回state更新store**

![  ](./assets/image/32e9b1ecaf13b3802d25cd40f0d358b7_WllZiNymrR.png "  ")

![  ](./assets/image/a64848a2fe2c6eafa7ca9956ad37ef5c_ui1IGYs_V2.png "  ")

**react默认只支持同步，实现异步任务需要中间件的支持**

```javascript 
 npm install redux-thunk redux-logger --save；

import { createStore, applyMiddleware } from "redux"; 
import logger from "redux-logger"; 
import thunk from "redux-thunk";
//注意：中间件有顺序；从前到后一次执行
const store = createStore(fruitReducer, applyMiddleware(thunk，logger));
```


**logger**

![  ](./assets/image/4f7cdbfcf07cee1a1263943d85a02d3e_P6zG1yUTaz.png "  ")

**thunk**

```javascript 
 const store = createStore(fruitReducer, applyMiddleware(thunk，logger));
//返回的是一个对象而不是函数；在函数里进行异步调用
{
    add:(num)=>({type:'add',payload:num}),  
    minus:()=>({type:'minus'}),
    //返回的是一个对象而不是函数
    asyncAdd:()=>dispatch=>{
        // 异步调用
        setTimeout(()=>{
              dispatch({type:'add'})
        },1000)
    }
}
```


**thunk 会判断你返回的是一个函数时，传给你dispatch； 等你做完异步操作时，手动dispatch**

**combinReducer  模块化 ；合并reducer(类似vuex的modules）**

```javascript 
 import { combineReducers } from 'redux'
const store = createStore(
    combineReducers({counterReduer}),
    applyMiddleware(thunk,logger)
)

//store/counter.js
export const add=(num)=>({type:'add',payload:num});
export const minus = ()=>({type:'minus'});
export const asyncAdd = ()=>dispatch=>{
            // 异步调用
            setTimeout(()=>{
                dispatch({type:'add'})
            },1000)
        }

// vuex 是直接拿值修改；redux 是相同输入必定有相同输出的纯函数，是可预测的；返回一个新的值
// reducer 就相当于 vuex  里的 mutations；但是它认为不应该修改原来的值； 而是返回一个全新的对象；初始化state并定义state的修改规则
export const counterReduer =  function(state=0,action){  
    const num = action.payload || 1
     switch (action.type) {      
        case 'add':        
            return state + num      
        case 'minus':        
            return state - num      
        default:        
            return state   
    }
}
//components
import { add , minus , asyncAdd} from '../store/counter'
@connect(
    state=>({num:state.counterReduer}),
    {
       add,minus,asyncAdd
    }
)
```


**combineReducers 的缺点 ，虽然是 redux 内置的，但是分块后取不到所有的state，等vuex 可以从modules 的名字拿到； redux就只能从store.getState取到**

[redux-saga](./redux-saga/index.md "redux-saga")

[redux-thunk](./redux-thunk/index.md "redux-thunk")

[react-redux](./react-redux/index.md "react-redux")
