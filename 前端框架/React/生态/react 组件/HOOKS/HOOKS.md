# HOOKS

## 目录

- [函数式组件(无状态|UI):](#函数式组件无状态UI)
- [HOOKs](#HOOKs)
  - [useState：](#useState)
  - [Effect ](#Effect-)
    - [副作用：](#副作用)
  - [useReducer   ](#useReducer)
  - [useContext    ](#useContext)
- [自定义Hooks](#自定义Hooks)
  - [提取自定义 Hook ](#提取自定义-Hook-)
  - [使用自定义 Hook ](#使用自定义-Hook-)

# 函数式组件(无状态|UI):

函数组件**通常无状态**，仅**关注内容展**示，返回**渲染结果即**可无状态(没有state)组件（简写）创建：（**类似class组件的render函数**）

```javascript 
function 组件名(props){}
  const 组件名=(props)=>(jsx)
  const 组件名=props=>jsx
  const 组件名=(props)=>{
  let xx=props.xx
  return html
}

```


无状态组件特点：

- 不能访问this对象(this.ref,this.state  ... )
- 只能访问props
- 无需实例化，渲染性能高
- this.方法/钩子（生命周期)  也不需要

# HOOKs

能够使函数组件 想 class 组件一样使用； 把补全了函数组件的缺点；让你可以在不编写class的情况下使用state以及其他的react 特性

**16.8 新增hooks的特点**

：函数组件状态管理：useState, useEffect    hooks 只能在16.8.x以后使用

1. Hook 使你在无需修改组件结构的情况下复用状态逻辑。
2. 可将组件中相互关联的部分拆分成更小的函数，复杂组件将变得更容易理解
3. 更加简洁，更容易理解的代码

```javascript 
 import React, {  useState ,useEffect,useReducer,useContext } from "react";
```


## **useState：**

**处理函数数组件的状态；初始；改变**

**useState(initialState)，接收初始状态，返回一个由状态和其更新函数组成的数组； 执行更新函数就是更新函数式组件；**

```javascript 
 const [fruit, setFruit] = useState("");  
const [fruites,setFruits] =useState([])  

// 声明列表组件 
function FruitList({fruits, onSetFruit}) {  
    return (    
        <ul>      
            {fruits.map(f =>(<li key={f}  onClick={() => onSetFruit(f)}>{f}</li>))}    
        </ul>  ); 
}

export default function HooksTest() {  
    // 声明数组状态  
    const [fruits, setFruits] = useState(["香蕉", "西瓜"]);  
    return ( 
        <div>    
            {/*添加列表组件*/}      
            <FruitList fruits={fruits} onSetFruit={setFruit}/>    
        </div>  ); 
}
```


## Effect&#x20;

**useEffect就是一个 Effect Hook，给函数组件增加了操作副作用的能力。它跟 class 组件中的 componentDidMount、componentDidUpdate和 componentWillUnmount**

**具有相同的用途，只不过**被合并成了一个 API。**副作用钩子useEffect Hook  类似watch类似computed又像函数式组件执行一次的生命周期；处理函数式组件中的副作用操作；但是什么时候执行取决于依赖函数而不是更新；**

### 副作用：

副作用（Side Eﬀect）是指一个 **function 做了和本身运算返回值无关的**事，

比如：

**修改了全局变量、修改了传入的 参数、甚至是 console.log()，所以 ajax 操作，修改 dom 都是算作副作用。**

你之前可能已经在 React 组件中执行过**数据获取、订阅或者手动修改过 DOM。**

我们统一把这些操作称为“副作用”，或者简称为“作用”。&#x20;

```javascript 
 function ClockFunc(){
    //创建状态， useState返回状态和修改状态函数所组成的的函数数组
    const [date,setDate] = useState(new Date())
    // 定时器是副作用 dom 操作 ajax 调用 需要用法哦useEffec；做了和本身运算返回值无关的事，
    useEffect(()=>{  //组件初始化时候执行一次    非常类似vue的watch
        const timerId = setInterval(() => {
            setDate(new Date())
        }, 1000);

        return ()=>{ //释放函数  ; 结束时调用
            clearInterval(timerId)
        }
    },[]) // 参数二 指的是依赖状态，本例中没有依赖，且执行一次，只要依赖变化了就会执行一次函数
    return (
        <div>{date.toLocaleString()}</div>
    )
}
```


**如果副作用操作对某状态有依赖，务必添加依赖选项**

```javascript 
 useEffect(() => {    
    document.title = fruit; 
}, [fruit]);
```


如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（\[]）作为第二个参数。

**清除工作：有一些副作用是需要清除的，清除工作非常重要的，可以防止引起内存泄露(卸载组件时会执行返回的清除函数)**

```javascript 
 useEffect(() => {    
    const timer = setInterval(() => {        
        console.log('msg');            
    }, 1000);
    return function(){        
        clearInterval(timer);    
    }  
}, []);
```


当你调用 useEffect时，就是在告诉**React 在完成对 DOM 的更改后运行你的“副作用”函数。** 由于副作用函数是在组件内声明的，所以它们可以访问到组件的 props 和 state。默认情况下，

**React 会在每次渲染后调用副作用函数 —— 包括第一次渲染的时候。**（我们会在[使用 Effect Hook](https://react.docschina.org/docs/hooks-effect.html "使用 Effect Hook")中跟 class 组件的生命周期方法做更详细的对比。）

## \*\*useReducer   \*\*​

\*\* useReducer是useState的可选项  类似redux vuex 概念   类似状态提升\*\* useReducer是useState的可选项，

**常用于组件有复杂状态逻辑时**，类似于redux中reducer概念。使状态独立于组件

```javascript 
 
import { useReducer } from "react";

// 添加fruit状态维护fruitReducer
// 理解为vue里的 mutations； redux里的reducer
function fruitReducer(state, action) {  
    switch (action.type) {    
        case "init":      
        return action.payload;    
    case "add":      
        return [...state, action.payload];    
    default:      
        return state;  
    }
}

export default function HooksTest() {  
    // useReducer(reducer，initState)  
    //参数一 是reducer
    //参数二 是 初始值
    const [fruits, dispatch] = useReducer(fruitReducer, []);
    useEffect(() => {    
        setTimeout(() => {      
            // setFruits(["香蕉", "西瓜"]);      
            // 变更状态，派发动作即可      
            dispatch({ type: "init", payload: ["香蕉", "西瓜"] });    
        }, 1000);  
    }, []);
    return (    
        <div>      
            {/*此处修改为派发动作*/}      
            <FruitAdd onAddFruit={pname => dispatch({type: 'add', payload: pname})} />    
        </div>  );
}


```


## \*\*useContext    \*\*​

**useContext用于在快速在函数组件中导入上下文。 一听这个名字 就和 Context 上下文 有关系；但是这里没有consumer**

```javascript 
 import React, { useContext } from "react";
// 创建上下文 
const Context = React.createContext();
export default function HooksTest() {  // ...  
    // useReducer(reducer，initState)  
    //参数一 是reducer
    //参数二 是 初始值
    const [fruites, dispatch] = useReducer(fruitReducer, []);
    // 异步获取我的水果列表
    useEffect(()=>{
        console.log('useEffect')
        setTimeout(() => {        
            // setFruits(['香蕉','西瓜'])   
            dispatch({type:'init',payload:['香蕉','西瓜']})
        }, 1000);
    },[]) // 只要后面的依赖 变 就会执行

    return (    
        {/* 提供上下文的值  这个地方好像只能用value 其他的值 useContext 解不出来*/}     
        <Context.Provider value={{fruits,dispatch}}>      
            <div>        
                {/* 这里不再需要给FruitAdd传递状态mutation函数，实现了解耦 */}        
                <FruitAdd />      
            </div>    
        </Context.Provider>  ); 
}

function FruitAdd(props) {  
    // 输入内容状态及设置内容状态的方法  
    const [pname, setPname] = useState("");  
    useEffect(()=>{
        console.log('FruitAdd')
    },[])

    // 使用useContext获取上下文  
    const {dispatch} = useContext(Context)  
    const onAddFruit = e => {    
        if (e.key === "Enter") {      
            // 直接派发动作修改状态      
            dispatch({ type: "add", payload: pname })      
            setPname("");    
        }  
    };  
    return (    
        <div>      
            <input        
            type="text"        
            value={pname}        
            onChange={e => setPname(e.target.value)}        
            onKeyDown={onAddFruit}      
            />    
        </div>  
    );
}
```


# 自定义Hooks

**组件逻辑提取到可重用的函数中。 共享逻辑。**

目前为止，在 React 中有两种流行的方式来共享组件之间的状态逻辑: [render props](https://react.docschina.org/docs/render-props.html "render props")和[高阶组件](https://react.docschina.org/docs/higher-order-components.html "高阶组件")，现在让我们来看看 Hook 是如何在让你不增加组件的情况下解决相同问题的。

## 提取自定义 Hook&#x20;

当我们想在两个函数之间共享逻辑时，我们会把它提取到第三个函数中。而组件和 Hook 都是函数，所以也同样适用这种方式。&#x20;

自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook。

例如，下面的 

useFriendStatus

是我们第一个自定义的 Hook:

```javascript 
 import { useState, useEffect } from 'react';
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });
  return isOnline;
}

```


## 使用自定义 Hook&#x20;

```javascript 
 function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```


```javascript 
 function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```


1. 这段代码等价于原来的示例代码吗？等价，它的工作方式完全一样。如果
2. 自定义 Hook 是一种自然遵循 Hook 设计的约定，而并不是 React 的特性。
3. 自定义 Hook 必须以 “use” 开头吗？必须如此。这个约定非常重要。
4. 在两个组件中使用相同的 Hook 会共享 state 吗？不会。其中的所有 state 和副作用都是完全隔离的。&#x20;
