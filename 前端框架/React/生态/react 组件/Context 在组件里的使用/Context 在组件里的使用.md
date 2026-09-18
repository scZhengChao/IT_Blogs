# Context 在组件里的使用

## 目录

- [创建上下文  相对独立  Provider  Consumer](#创建上下文-相对独立ProviderConsumer)
- [高阶组件配合 context](#高阶组件配合context)
- [Context,HOOKS在函数式组件中的使用](#ContextHOOKS在函数式组件中的使用)

> Context 上下文
> **context（provider，inject）  单项数据流；**

**每个上下文 都不同； 类似vue的store里的state；如果在一个文件里申明的上下文在那另一个文件里要用；请单独写一个文件集中管理；然后在导出**

完全相同 常用组件库的开发 简单的redux  

跨层级组件之间通信  状态共享

### **创建上下文  相对独立  Provider  Consumer**

```javascript 
 const Context = React.createContext()
//获取Provider 和 comsumer  一切皆组件的思想
const Provider = Context.Provider
const Consumer = Context.Consumer
function Child(props) {    
    return (        
          <div onClick={ e => props.add(e)}>            
            {props.counter}        
      </div>    
    )
}
export default class context extends Component {    
    state={        
      counter:0    
     }    
     add=()=>{        
         this.setState(  {counter:this.state.counter +1})    
     }    
    render() {        
        return (            
          <Provider value={{counter:this.state.counter,add:this.add }}>                
              <Consumer>{value=><Child {...value}></Child>}</Consumer>                
              <Consumer>{value=><Child {...value}></Child>}</Consumer>                
                <Consumer>{value=><Child {...value}></Child>}</Consumer>            
           </Provider>       
    )    
   }
}
```


**实战官网**

：

### **高阶组件配合 context**

```javascript 
 //可以传参的高阶组件  
const  withConsumer = Consumer => Comp=> props=>{    
    return  <Consumer >{ value=> <Comp {...value}></Comp> } </Consumer>
}
 const Child = withConsumer(Consumer)(
   (props)=>(<div onClick={e=>props.add(e)}>{props.counter}</div>)
)
export default class context extends Component {    
        state={        counter:0    }    
        add=()=>{        this.setState(  {counter:this.state.counter +1})    }   
        render() {        
                return (            
                  <Provider 
                      value={{counter:this.state.counter,add:this.add           
                  }}>                
                        <Child/>                
                        <Child />                
                        <Child />                
                     {/* <Consumer>{value=><Child {...value}></Child>}</Consumer>*/}            
        </Provider>       
      )    
  }
}
```


### **Context,HOOKS在函数式组件中的使用**

\*\*数据解耦 context useReducer useContext  provider  \*\*​

```vue 
 import React, { useState ,useEffect,useReducer,useContext} from "react";
const Context = React.createContext()

function Fruitlist ({fruites,onsetFruit}){    
  return (        
      <ul>            
          {fruites.map(f=><li key={f} onClick={()=>onsetFruit(f)}>{f}</li>)}        
    </ul>    
)}

// 声明输入组件 
function FruitAdd(props) {      
    // 输入内容状态及设置内容状态的方法      
    const [pname, setPname] = useState("");     
    useEffect(()=>{       
      console.log('FruitAdd')    
    },[])    
  
    // 使用useContext获取上下文   这个地方就是Provider 提供的value 上下文
    const { dispatch,fruites} = useContext(Context)    
    // 键盘事件处理
   const onAddFruit = e => {            
       if (e.key === "Enter") {                  
         // props.onAddFruit(pname);               
         dispatch({type:'add',payload:pname})               
        setPname("");            
       }   
   };      
  return (           
      <div>                  
        <input                    
            type="text"                    
            value={pname}                    
        onChange={e => setPname(e.target.value)}                    
        onKeyDown={onAddFruit}                  
      />            
    </div>      
  ); 
} 

 // 添加fruit状态维护fruitReducer // 理解为vue里 的 mutationsfunction
fruitReducer(state, action) {     
  switch (action.type) {            
    case "init":              
      return action.payload;        
    case "add":              
      return [...state, action.payload];        
    default:              
      return state;      
  }
} 

export default function HooksTest() {      
  // useState(initialState)，接收初始状态，返回一个由状态和其更新函数组成的数组      
  const [fruit, setFruit] = useState("");      
  // const [fruites,setFruits] =useState([])   
  //只要setFruie执行都会重新执行该函数   
  
  // useReducer(reducer，initState)     
  //参数一 是reducer     
  //参数二 是 初始值   
  // 这个地方可以理解为 小型的state 和 dispatch  传入到 reducer ,initState
  const [fruites, dispatch] = useReducer(fruitReducer, []);     
  
  // 异步获取我的水果列表    
  useEffect(()=>{        
    console.log('useEffect')        
    setTimeout(() => {                    
      // setFruits(['香蕉','西瓜'])               
      dispatch({type:'init',payload:['香蕉','西瓜']})         
    }, 1000);    
  },[]) 
  // 只要后面的依赖 变 就会执行    
  
  // 异步获取我的水果列表    
  // useEffect(()=>{    
  //     console.log('useEffect')    
  //     setTimeout(() => {           
  //         setFruits(['香蕉','西瓜'])        
  //     }, 1000);     
  //     document.title = fruit;     
  // },[fruit]) 
  // 只要后面的依赖 变 就会执行   
  
  // useEffect(() => {        
  //     const timer = setInterval(() => {            
  //         console.log('msg');                
  //     }, 1000);     
  //     return function(){            
  //         clearInterval(timer);        
  //     }      
  // }, []);       
  return (            
    <Context.Provider  value={{fruites,dispatch}} >            
    // 注意;这个地方没有 Consumer
        <div>                      
        <p>{fruit === "" ? "请选择喜爱的水果：" : `您的选择是：${fruit}`}</p>                
      <Fruitlist fruites={fruites} onsetFruit={setFruit}/>                
      {/* <FruitAdd onAddFruit={pname => setFruits([...fruites, pname])} />     */}               
      {/* <FruitAdd onAddFruit={pname=>dispatch({type: 'add', payload: pname})} />  */}     
      <FruitAdd  />              
    </div>         
    </Context.Provider>    
  ); 
}
```
