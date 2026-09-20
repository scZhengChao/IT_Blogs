# redux-saga

## 目录

- [redux-saga](#redux-saga)

## redux-saga

- 概述：redux-saga使副作用（数据获取，浏览器缓存获取）易于管理，执行，测试和失败处理
- npm install --save redux-saga

出现原因： reducer 是纯函数；相同的输入的到相同的输出；

![  ](bea21134270199bf38f35d072cf71b02_wW9kh6VNAA.png "  ")

本身是中间件；让副作用在自己本身的逻辑里进行；派发出去的都是纯对象；

```javascript 
 // store/saga.js

// call 是调用异步操作
//put 状态更新
//takeevery 监听
import  { call,put,takeEvery } from 'redux-saga/effects'  // 底层使用的es6 的 generate


// 模拟登录
const UserService = {  
    login(uname) {    
        return new Promise((resolve, reject) => {      
            setTimeout(() => {        
                if (uname === "Jerry") {          
                    resolve({ id: 1, name: "Jerry", age: 18 });        
                } else {          
                    reject("用户名或密码错误");        
                }      
            }, 1000);    
        });  
    }
};
//worker saga
// * gennerate 用同步的方式写异步的代码  流程控制  虽然await 的方法更加简单；但是yield 这个方法更加强大
function* login(action){
    try{
        yield put({type:'requestLogin'})
        // 调用异步请求
        const result = yield call(UserService.login,action.uname);
        yield put({type:'loginSuccess',result})
    }catch(error){
        yield put({type:'loginFailure',payload:error})
    }
}


//watcher saga
function* mySaga(){
    yield takeEvery('login',login)
}

export default mySaga


store/user
// 导出user的reducer
export const user = (  
        state = { isLogin: false, loading: false, error: "" },  
        action
    ) => {  
        switch (action.type) {    
            case "requestLogin":      
                return { isLogin: false, loading: true, error: "" };    
            case "loginSuccess":      
                return { isLogin: true, loading: false, error: "" };    
            case "loginFailure":      
                return { isLogin: false, loading: false, error: action.message };    
            default:      
                return state;  
        }
    };


// 派发动作依然是对象而非函数 简单的action creater 对象
export function login(uname) {  
    return { type: "login", uname };
}


store/index.js
import { createStore ,applyMiddleware ,combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {counterReduer } from './counter'
import createSagaMiddle from 'redux-saga'
import mySaga from './sagas'
import { user} from './user' // reducer


// // vuex 是直接拿值修改；redux 是相同输入必定有相同输出的纯函数，是可预测的；返回一个新的值
// // reducer 就相当于 vuex  里的 mutations；但是它认为不应该修改原来的值； 而是返回一个全新的对象；初始化state并定义state的修改规则
// const counterReduer =  function(state=0,action){  
//     const num = action.payload || 1
//      switch (action.type) {      
//         case 'add':        
//             return state + num      
//         case 'minus':        
//             return state - num      
//         default:        
//             return state   
//     }
// }


//创建saga中间键
const mid = createSagaMiddle()


//reducer 告诉store，并定义好state的修改规则
const store = createStore(
    combineReducers({counterReduer,user}),
    applyMiddleware(logger,mid)
)
// 运行saga 监听 真正的作业务的内容
mid.run(mySaga)

export default store
```
