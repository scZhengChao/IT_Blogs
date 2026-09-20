# react-redux

## 目录

- [核心任务：](#核心任务)
  - [connect 进阶一点](#connect-进阶一点)
  - [provider](#provider)
  - [bindActionCreators](#bindActionCreators)
  - [combineReducers](#combineReducers)

# 核心任务：

```javascript 

/**
 * 属性映射、变更检测和刷新；实现一个Provider组件可以传递store
 *
 * - 实现一个高阶函数工厂connect，可以根据传入状态映射规则函数和派发器函数需要的属性，可以处理变更检测和刷新任务
 * - 实现一个provider 组件可以传递store
 * connect
 */

/**
 * 参数一：mapStateToProps = (state)=>return 对象（把映射到this.props上）
 * 参数二：mapDispatchToProps = (dispathch)=>return {add:()=>dispatch((type:'add'))}
 * 自动刷新
 * 自动渲染
 * 映射到组件属性
 * @connect(
 *    state=>({num:state})
 *  //action creater  一个函数；返回一个action 对象 ; 最终都会被合并到props后  ;保持一个功能单一和纯粹；
 *  //不传第二个函数 默认会把dispatch 搞到this.props上
 *     dispatch =>({  
 *          add:()=>dispatch({type:'add'}),  
 *          minus:()=>dispatch({type:'minus'})
 *     })
 *    或者第二个参数是对象
 *    {
 *        add：（）=>({type:'add'})
 *    }
 *)
 */
import React from 'react'
import PropTypes from 'prop-types' 
import {bindActionCreators} from './kkb-redux'

//@connect 帮你实现了 自动检测更新并且渲染； map state to props; map action to props
export const connect = (mapStateToProps = state=>state, mapDispatchToProps = {}) => (WrapComponent)=>{    
    return class ConnectComponent extends React.Component{  
     //class组件中声明静态的contextTypes可以获取上下文context 这都是框架约定的；自己会执行获取      
       static contextTypes = {            
          store: PropTypes.object        
       } 
        //context 上下文 
       constructor(props, context){
            super(props, context)  
            this.state = {                
                props:{}            
            }        
        }        
        componentDidMount(){            
            const {store} = this.context            
            store.subscribe(()=>this.update())            
            this.update()        
        }     
        //渲染映射
        update(){            
            const {store} = this.context   
            //state  ===》 props         
            const stateProps = mapStateToProps(store.getState())   
            // {add:()=>({type:'add'})}  返回action
            // {add:(...args) => dispatch(creator(...args))}   派发返回的action 
            const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch)    
            //更新状态     
            this.setState({                
                props:    {                    
                    ...this.state.props,                    
                    ...stateProps,  //num：state.num                  
                    ...dispatchProps  , //add:(...args) => dispatch(creator(...args))         
                }            
            })        
        }        
        render(){            
            return <WrapComponent {...this.state.props}></WrapComponent>        
        }    
    } 
}
```


#### connect 进阶一点

```javascript 
const connect = (mapStateToProps, mapDispathToProps) => (WrappedComponent) => {
  return class extends React.Component {
    static contextType = ReactReduxContext;
    constructor(props) {
      super(props);
      this.store = this.context.store;
      this.state = {
        state: this.store.getState()
      };
    }
   componentDidMount() {
      this.store.subscribe((nextState) => {
        // 浅比较
        if (!shadowCompare(nextState, this.state.state)) {
            this.setState({ state: nextState });
        }
      });
    }
    render() {
      const props = {
        ...mapStateToProps(this.state.state),
        ...mapDispathToProps(this.state.state),
        ...this.props
      }
      return <WrappedComponent {...props} />
    }
  }
}
```


### provider

```javascript 
//上下文的定义
export class Provider extends React.Component{
    //老框架定义的约定；创建上下文；会自己执行
    static childContextTypes = {
        store: PropTypes.object;
    }
    getChildContext() {
        return { store: this.store }
    }
    constructor(props, context) {
        super(props, context)
        this.store = props.store
    }
    render() {
        return this.props.children
    }
}

```


### bindActionCreators

```javascript 
// 实现bindActionCreators
// 添加一个bindActionCreators能转换actionCreator为派发函数，redux.js
function bindActionCreator(creator, dispatch){
  return (...args) => dispatch(creator(...args))
}
export function bindActionCreators(creators,dispatch){
    //{add:()=>({type:'add'})} 返回action
    //{add:(...args) => dispatch(creator(...args))}派发返回的action
    return Object.keys(creators).reduce((ret,item)=>{
        ret[item] = bindActionCreator(creators[item],dispatch)
        return ret
    },{})
}
```


### combineReducers

```javascript 
const combineReducers = reducers => {
    const finalReducers = {},
    nativeKeys = Object.keys;
    nativeKeys(reducers).forEach(reducerKey => {
       // 过滤掉不是函数的 reducer
        if(typeof reducers[reducerKey] === "function") {
            finalReducers[reducerKey] = reducers[reducerKey];
        }
    })
   // 返回了一个新的函数
    return (state, action) => {
      let hasChanged = false;
      let nextState = {};
       // 遍历所有的 reducer 函数并执行
        nativeKeys(finalReducers).forEach(key => {
            const reducer = finalReducers[key];
            nextState[key] = reducer(state[key], action);
            hasChanged = hasChanged || nextState[key] !== state[key]
        })
        return hasChanged ? nextState : state;
    }
}

```
