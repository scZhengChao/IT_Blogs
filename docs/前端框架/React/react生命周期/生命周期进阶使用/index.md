# 生命周期进阶使用

## 目录

- [1. 生命周期图示（16.4）](#1-生命周期图示164)
- [2.加载时：](#2加载时)
- [3 跟新时：](#3-跟新时)
- [4.卸载时：](#4卸载时)
- [5. 场景注意：](#5-场景注意)
  - [getSnapshotBeforeUpdate](#getSnapshotBeforeUpdate)
  - [shouldComponentUpdate](#shouldComponentUpdate)
  - [getDerivedStateFromProps](#getDerivedStateFromProps)
- [6.其他钩子：](#6其他钩子)
- [7.使用示范](#7使用示范)
  - [getDerivedStateFromProps](#getDerivedStateFromProps)
  - [shouldComponentUpdate](#shouldComponentUpdate)
  - [getSnapshotBeforeUpdate](#getSnapshotBeforeUpdate)
  - [componentDidUpdate](#componentDidUpdate)
- [render()](#render)
- [constructor()](#constructor)

[https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram "https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/")

         生命周期图谱

[https://react.docschina.org/docs/react-component.html](https://react.docschina.org/docs/react-component.html "https://react.docschina.org/docs/react-component.html")

        生命周期官网  （

**不清楚的的时候仔细阅读下他们的使用场景**

）

# 1. 生命周期图示（16.4）

![  ](./assets/image/14cbd04cc37bcd24e6fbd6544261feba_XXoYRT2kbo.webp "  ")

# 2.加载时：

1. getProps 和 initState
2. getDerivedStateFromProps(nextProps,prevState)
3. render
4. comonentDidMount

# 3 跟新时：

1. getDerivedStateFromProps（nextProps，prevState）
2. shouldComponentUpdate（nextProps，nextState）
3. render
4. getSnapshotBeforeUpdate（prevProps，prestate）
5. componentDidUpdate（preProps，prevState，snapshot）
6. UNSAFE：UNSAFE\_componentWillMount，
7. UNSAFE\_componentWillUpdate，
8. UNSAFE\_componentWillReceiveProps

# 4.卸载时：

componentWIllUnmount

# 5. 场景注意：

## getSnapshotBeforeUpdate

getSnapshotBeforeUpdate调用于render 之后

；可以读取dom但无法使用dom

他可以是你的组件在

更新前获取一些DOm信息

（例如 滚动位置）

此生命周期的任何返回值 

都将作为参数传递 给ComponentDidUpdate的第三个参数

## shouldComponentUpdate

**当return false 的时候 不会触发 跟新 即 render ，getSnapshotBeforeUpdate，componentDidUpdate 都不会触发**

## getDerivedStateFromProps

16.4新增 生命周期钩子

取代了 componentwillMount componentWillReceiveProps  compoentWillUpdate 3个钩子合为一个

强制开发者在render之前 

只是做无副作用（不能有异步）的操作

，

且局限在props 和 state 之间

返回一个对象 更新state  类似 setState({}), 若返回null 则不更新， 

返回值是必须的

getDerivedStateFromProps   取不到this==undefined 

接受

  nextProps，nextState

使用注意：

初始化和更新时都会执行，

有机会再次对state 进行修改，不会触发引起再次执行生命周期

返回的state 不必要在state里想生命，不声明也可以

此方法适用于

[罕见的用例](https://react.docschina.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state "罕见的用例")

，即 state 的值在任何时候都取决于 props。

# 6.其他钩子：

虽然暂时能用 17版本 应该就会舍弃了

# 7.使用示范

## getDerivedStateFromProps

```vue 
 // 这个地方代替不了watch，因为他是所有的state，props，forceUpdate 都会触发他
//可以说，这个生命周期的功能实际上就是将传入的props映射到state上面。
//在使用getDerivedStateFromProps的时候，遇到了上面说的props在很短的时间内多次变化，也只会触发一次render，也就是只触发一次getDerivedStateFromProps。这样的优点不言而喻。
static getDerivedStateFromProps(nextProps, preState) {   
  const {type} = nextProps;    
  // 当传入的type发生变化的时候，更新state    
  if (type !== prevState.type) {        
    return {            
      type,       
    };    
  }   
  // 否则，对于state不进行任何操作   
    return null;
}

```


## shouldComponentUpdate

```vue 
 shouldComponentUpdate(nextProps,nextStates){ 
// 应该使用这个方法，否则无论state是否有变化都将会导致组件重新渲染
        if(nextStates.someThings === this.state.someThings){
          return false
        }
    }
```


## **getSnapshotBeforeUpdate**

```vue 
    getSnapshotBeforeUpdate(prevProps, prevState) {    //prev 之前的
         //我们是否要添加新的 items 到列表?     
         // 捕捉滚动位置，以便我们可以稍后调整滚动.     
         if (prevProps.list.length < this.props.list.length) {       
             const list = this.listRef.current;       
             return list.scrollHeight - list.scrollTop;     （更新前；旧的）
        }     
        return null;   
    }
```


## componentDidUpdate

```vue 
     componentDidUpdate(prevProps, prevState, snapshot) {     //之前的
        //如果我们有snapshot值, 我们已经添加了 新的items.     
        // 调整滚动以至于这些新的items 不会将旧items推出视图。     
        // (这边的snapshot是 getSnapshotBeforeUpdate方法的返回值)     
        if (snapshot !== null) {       
            const list = this.listRef.current;       
            list.scrollTop = list.scrollHeight - snapshot;     
        }   
    }
```


# render()

\*\* render() 函数应该为纯函数，\*\* ​

这意味着在不修改组件 state 的情况下，每次调用时都返回相同的结果，

**并且它不会直接与浏览器交互。**

          如需与浏览器进行交互，

**请在 componentDidMount() 或其他生命周期方法中执行你的操作。保持 render() 为纯函数，可以使组件更容易思考。**

# constructor()

如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数。

             在 React 组件挂载之前，会调用它的构造函数。在为 React.Component 子类实现构造函数时，应在其他语句之前前调用 

super(props)

。否则，

this.props

 在构造函数中可能会出现未定义的 bug。

通常，在 React 中，构造函数仅用于以下两种情况：

- 通过给 this.state 赋值对象来初始化[内部 state](https://react.docschina.org/docs/state-and-lifecycle.html "内部 state")。
- 为[事件处理函数](https://react.docschina.org/docs/handling-events.html "事件处理函数")绑定实例

      在 

constructor()

 函数中

不要调用 setState() 方法

。如果你的组件需要使用内部 state，请直接在构造函数中为 

this.state 赋值初始 state

：

\*\* 只能在构造函数中直接为 this.state 赋值。如需在其他方法中赋值，你应使用 this.setState() 替代\*\*​

。

      要避免在构造函数中

**引入任何副作用或订阅**

。如遇到此场景，请将

**对应的操作放置在 componentDidMount**

 中。

**注意
避免将 props 的值复制给 state！这是一个常见的错误：
constructor(props) {
&#x20;super(props);
&#x20;// 不要这样做
&#x20;this.state = { color: props.color };}
如此做毫无必要（你可以直接使用 this.props.color），同时还产生了 bug（更新 prop 中的 color 时，并不会影响 state）。
只有在你刻意忽略 prop 更新的情况下使用。此时，应将 prop 重命名为 initialColor 或 defaultColor。必要时，你可以修改它的 key，以强制“重置”其内部 state。
请参阅关于避免派生状态的博文，以了解出现 state 依赖 props 的情况该如何处理。**

派生state

[https://react.docschina.org/blog/2018/06/07/you-probably-dont-need-derived-state.html](https://react.docschina.org/blog/2018/06/07/you-probably-dont-need-derived-state.html "https://react.docschina.org/blog/2018/06/07/you-probably-dont-need-derived-state.html")

**这个地方很重要；**

**getDerivedStateFromPorps 的作用：让组件在props变化时更新state，有点类似computed，不过是直接在哪里修改**
