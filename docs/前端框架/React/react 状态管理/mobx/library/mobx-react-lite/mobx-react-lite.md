# mobx-react-lite

## 目录

- [useLocalObservable创建store](#useLocalObservable创建store)
- [子组建为function组件(使用Context)](#子组建为function组件使用Context)

用法:

```typescript 
import { observer } from "mobx-react-lite" // Or "mobx-react".

const MyComponent = observer(props => ReactElement)


```


MobX 可以独立于 React 运行, 但是他们通常是结合在一起使用, 在 [Mobx的宗旨（The gist of MobX）](https://www.mobxjs.com/the-gist-of-mobx "Mobx的宗旨（The gist of MobX）") 一文中你会经常看见集成React最重要的一部分：用于包裹React Component的 `observer` [HOC](https://reactjs.org/docs/higher-order-components.html "HOC")方法。

`observer` 是你可以自主选择的，[在安装时（during installation）](https://www.mobxjs.com/installation#installation "在安装时（during installation）")独立提供的 React bindings 包。 在下面的例子中,我们将使用更加轻量的[mobx-react-lite](https://github.com/mobxjs/mobx/tree/main/packages/mobx-react-lite "mobx-react-lite")[ 包](https://github.com/mobxjs/mobx/tree/main/packages/mobx-react-lite " 包")。

```typescript 
import React from "react"
import ReactDOM from "react-dom"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"

class Timer {
    secondsPassed = 0

    constructor() {
        makeAutoObservable(this)
    }

    increaseTimer() {
        this.secondsPassed += 1
    }
}

const myTimer = new Timer()

//被`observer`包裹的函数式组件会被监听在它每一次调用前发生的任何变化
const TimerView = observer(({ timer }) => <span>Seconds passed: {timer.secondsPassed}</span>)

ReactDOM.render(<TimerView timer={myTimer} />, document.body)

setInterval(() => {
    myTimer.increaseTimer()
}, 1000)
```


`observer` HOC 将自动订阅 React components 中**任何 *****在渲染期间***** 被使用的 *****可被观察的对象***** 。** 因此, 当任何可被观察的对象 *变化* 发生时候 组件会自动进行重新渲染（re-render）。 它还会确保组件在 *没有变化* 发生的时候不会进行重新渲染（re-render）。 但是, 更改组件的可观察对象的不可读属性, 也不会触发重新渲染（re-render）。

在实际项目中，这一特性使得MobX应用程序能够很好的进行开箱即用的优化，并且通常不需要任何额外的代码来防止过度渲染。

要想让`observer`生效, 并不需要关心这些对象 *如何传递到* 组件的（它们只要能传递给组件即可 ·译者注）, 只需要关心他们是否是可读的。 深层嵌套的可观察对象也没有问题, 复杂的表达式类似 `todos[0].author.displayName` 也是可以使用的。 与其他必须显式声明或预先计算数据依赖关系的框架（例如 selectors）相比，这种发生的订阅机制就显得更加精确和高效。

#### `useLocalObservable`创建store

```javascript 
import React,{createContext} from "react";
import {observer,useLocalObservable} from "mobx-react-lite";
import Child1 from "@/component/Child1";
import Child2 from "@/component/Child2";
import Child3 from "@/component/Child3";

export const Context = createContext(null);

const Parent=()=>{
  // 'useLocalStore' is deprecated, use 'useLocalObservable' instead.
  const storeContext = useLocalObservable(()=>({
    count: 1,
    get double(){return this.count*2;},
    increase(){this.count+=1;},
    decrease(){this.count-=1;},
  }));
  return (
    <Context.Provider value={storeContext}>
      <Child1 />
      <Child2 />
      <Child3 />
    </Context.Provider>
  );
};
export default observer(Parent);

```


#### 子组建为function组件(**使用Context**)

```javascript 
import React, {useContext,useEffect} from "react";
import {observer} from "mobx-react-lite";
import {toJS,reaction,when} from "mobx";
import {Context} from "@/App";
const Child1=()=>{
  const store=useContext(Context);
  useEffect(()=>{
    console.log("store:", toJS(store));
    reaction(
      ()=>store.count,
      (cur, pre)=>{console.log(`cur: ${cur}, pre: ${pre}`);}
    );
    when(
      ()=>store.count < 0,
      ()=>{console.log("...");}
    );
  }, [store]);
  // [mobx-react-lite] 'useObserver(fn)' is deprecated
  // Use `<Observer>{fn}</Observer>`instead, or wrap the entire component in `observer`
  return(
    <div>
      count: {store?.count}|double:{store?.double}    
      <button onClick={()=>store.increase()}>increase</button>
      <button onClick={()=>store.decrease()}>decrease</button>
    </div>
  );
};
export default observer(Child1);

```
