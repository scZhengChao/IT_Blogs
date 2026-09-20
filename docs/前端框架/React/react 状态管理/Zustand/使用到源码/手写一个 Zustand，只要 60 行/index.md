# 手写一个 Zustand，只要 60 行

提到状态管理，大家可能首先想到的是 redux。

redux 是老牌状态管理库，能完成各种基本功能，并且有着庞大的中间件生态来扩展额外功能。

但 redux 经常被人诟病它的使用繁琐。

近两年，React 社区出现了很多新的状态管理库，比如 zustand、jotai、recoil 等，都完全能替代 redux，而且更简单。

zustand 算是其中最流行的一个。

看 star 数，redux 有 60k，而 zustand 也有 38k 了：

redux：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cff2e7881119434190c0d26c7ad32073~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=698\&h=526\&s=44430\&e=png\&b=ffffff)

zustand：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ccb38193ae9c41e4b68fd08f01bf8bfe~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=638\&h=530\&s=49287\&e=png\&b=ffffff)

看 npm 包的周下载量，redux 有 880w，而 zustand 也有 260w 了：

redux：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c8b363b562a4995932c74a62bfb728e~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=812\&h=606\&s=53403\&e=png\&b=fefefe)

zustand：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d962af6d26c4b3ab6c87f35c6d18561~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=688\&h=592\&s=51901\&e=png\&b=fefefe)

从各方面来说，zustand 都在快速赶超 redux。

那 zustand 为什么会火起来呢？

我觉得主要是因为简单，zustand 用起来真的是没有什么学习成本，没有 redux 的 action、reducer 等概念。

而且功能很强大，zustand 也有中间件，可以给它额外扩展功能。

既然功能上能替代 redux，那为什么不选择一个更简单的呢？

下面我们就来试试看：

```yaml 
npx create-react-app zustand-test

```


![](./image/image_fFVnNVxhpK.png)

用 cra 创建个 react 项目。

进入项目把它跑起来：

```yaml 
npm run start

```


浏览器访问下：

![](./image/image_oReLOAmdm9.png)

没啥问题。

然后安装 zustand:

```yaml 
npm install --save zustand

```


改下 App.js

```javascript 
import { create } from 'zustand'

const useXxxStore = create((set) => ({
  aaa: '',
  bbb: '',
  updateAaa: (value) => set(() => ({ aaa: value })),
  updateBbb: (value) => set(() => ({ bbb: value })),
}))

export default function App() {
  const updateAaa = useXxxStore((state) => state.updateAaa)
  const aaa = useXxxStore((state) => state.aaa)

  return (
    <div>
        <input
          onChange={(e) => updateAaa(e.currentTarget.value)}
          value={aaa}
        />
        <Bbb></Bbb>
    </div>
  )
}

function Bbb() {
  return <div>
    <Ccc></Ccc>
  </div>
}

function Ccc() {
  const aaa = useXxxStore((state) => state.aaa)
  return <p>hello, {aaa}</p>
}

```


用 create 函数创建一个 store，定义 state 和修改 state 的方法。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/976ff3a9b79f41a4beb72f7e02d38f07~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=812\&h=250\&s=46699\&e=png\&b=1f1f1f)

然后在组件里调用 create 返回的函数，取出属性或者方法在组件里用：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fecf937f65af47be8685eb15262b115d~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=962\&h=520\&s=84753\&e=png\&b=202020)

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/66f53d0566a84b50bc076ca481fa97d5~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=738\&h=182\&s=35891\&e=png\&b=212121)

这就是 zustand 的全部用法了，就这么简单。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ab61fe8aa604e3bb7ddc20e79f61764~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=604\&h=430\&s=35942\&e=gif\&f=19\&b=fefefe)

有的同学说，不是还有中间件么？

其实中间件并不是 zustand 自己实现的功能。

你看这个 create 方法的参数，它是一个接受 set、get、store 的三个参数的函数：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a789b7bbb5214082aac31e915909574b~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=816\&h=244\&s=46190\&e=png\&b=1f1f1f)

那我们可不可以包一层，自己拿到 get、set、store，对这些做一些修改，之后返回一个接受三个参数的函数呢？

比如这样：

```javascript 
function logMiddleware(func) {
  return function(set, get, store) {

    function newSet(...args) {
      console.log('调用了 set，新的 state：', get());
      return set(...args)
    }
  
    return func(newSet, get, store)
  }
}

```


我接受之前的函数，然后对把 set、get、store 修改之后再调用它：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5707cf2971a744b9b2d2a1d3f3ac30f0~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=846\&h=656\&s=106639\&e=png\&b=1f1f1f)

这样不就给 zustand 的 set 方法加上了额外的功能么？

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/371915a1fcd44ff5bf7c9245106e76d5~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=996\&h=1088\&s=175445\&e=gif\&f=30\&b=fefefe)

这个就是中间件，和 redux 的中间件是一样的设计。

它并不需要 zustand 本身做啥支持，只要把 create 的参数设计成一个函数，这个函数接收 set、get 等函作为参数，那就自然支持了中间件。

zustand 内置了一些中间件，比如 immer、persist。

persist 就是同步 store 数据到 localStorage 的。

我们试一下：

![](./image/image_4og9yH2mol.png)

效果如下：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d5312dfe9c34bd7af988bb9eb7cbd0a~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1988\&h=870\&s=132902\&e=png\&b=fefefe)

而且，中间件是可以层层嵌套的：

我们把自己写的 log 和内置的 persist 结合起来：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35a2546e1697420c8d9b81f2c3332380~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1070\&h=590\&s=123116\&e=png\&b=202020)

效果如下：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/314e9cb8372b456a92b6274b199e4c2d~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=966\&h=800\&s=99743\&e=png\&b=ffffff)

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/179b386d20414054920cdbe29e476fa7~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1802\&h=838\&s=123496\&e=png\&b=fefefe)

因为中间件不就是修改 set、get 这些参数么，这些 set、get 是可以层层包装的，所以自然中间件也就可以层层嵌套。

redux 和 zustand 的中间件一脉相承，都是很巧妙的设计。

学完了 zustand 的功能后，你觉得写这样一个 zustand 需要多少代码呢？

其实不到 100 行就能搞定。

不信我们试试看：

state 是全局状态，listeners 是监听器。

然后 setState 修改状态、getState 读取状态、subscribe 添加监听器、destroy 清除所有监听器。

这些都很容易理解。

至于 replace，这是 zustand 在 set 状态的时候默认是合并，你也可以传一个 true 改成替换：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/52c507fec2a7487e90961e1f235c613c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1396\&h=382\&s=52079\&e=png\&b=ffffff)

那如果状态变了，如何触发渲染呢？

useState 就可以。

这样写：

```javascript 
function useStore(api, selector) {
    const [,forceRender ] = useState(0);
    useEffect(() => {
        api.subscribe((state, prevState) => {
            const newObj = selector(state);
            const oldobj = selector(prevState);

            if(newObj !== oldobj) {
                forceRender(Math.random());
            }       
        })
    }, []);
    return selector(api.getState());
}

```


`selector` 说的是传入的这个函数：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cde3193d934d4e769325a2ccc9f7fa56~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=924\&h=510\&s=79066\&e=png\&b=1f1f1f)

我们用 `useState` 设置随机数来触发渲染。

监听 state 的变化，变了之后，根据新旧 `state` 调用 `selector` 函数的结果，来判断是否需要重新渲染。

然后定义 create 方法：

```javascript 
export const create = (createState) => {
    const api = createStore(createState)

    const useBoundStore = (selector) => useStore(api, selector)

    Object.assign(useBoundStore, api);

    return useBoundStore
}

```


它就是先调用 createStore 创建 store。

然后返回 useStore 的函数，用于组件内调用。

测试下：

把 create 函数换成我们自己的，其余代码不变：

![](./image/image_GevJlXbIIy.png)

可以看到，功能依然正常：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35c48201496242a9945776fa9515fc46~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1146\&h=910\&s=111556\&e=png\&b=ffffff)

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b766f587cd14122a83401d85685f3bd~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1814\&h=970\&s=144316\&e=png\&b=fefefe)

我们的 my-zustand 已经能够完美替代 zustand 了。

全部代码如下：

```javascript 
import { useEffect, useState } from "react";

const createStore = (createState) => {
    let state;
    const listeners = new Set();
  
    const setState = (partial, replace) => {
      const nextState = typeof partial === 'function' ? partial(state) : partial

      if (!Object.is(nextState, state)) {
        const previousState = state;

        if(!replace) {
            state = (typeof nextState !== 'object' || nextState === null)
                ? nextState
                : Object.assign({}, state, nextState);
        } else {
            state = nextState;
        }
        listeners.forEach((listener) => listener(state, previousState));
      }
    }
  
    const getState = () => state;
  
    const subscribe= (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    }
  
    const destroy= () => {
      listeners.clear()
    }
  
    const api = { setState, getState, subscribe, destroy }

    state = createState(setState, getState, api)

    return api
}

function useStore(api, selector) {
    const [,forceRender ] = useState(0);
    useEffect(() => {
        api.subscribe((state, prevState) => {
            const newObj = selector(state);
            const oldobj = selector(prevState);

            if(newObj !== oldobj) {
                forceRender(Math.random());
            }       
        })
    }, []);
    return selector(api.getState());
}

export const create = (createState) => {
    const api = createStore(createState)

    const useBoundStore = (selector) => useStore(api, selector)

    Object.assign(useBoundStore, api);

    return useBoundStore
}

```


60 多行代码。

其实，代码还可以进一步简化。

react 有一个 hook 就是用来定义外部 store 的，store 变化以后会触发 rerender：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec7c78b9bf784e038339d3f4f5d5dfef~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1648\&h=706\&s=131461\&e=png\&b=fefefe)

有了这个 useSyncExternalStore 的 hook，我们就不用自己监听 store 变化触发 rerender 了：

![](./image/image_v8G_xUsgqr.png)

可以简化成这样：

```javascript 
function useStore(api, selector) {
    function getState() {
        return selector(api.getState());
    }
    
    return useSyncExternalStore(api.subscribe, getState)
}

```


这样，my-zustand 就完美了。

```javascript 
import { useSyncExternalStore } from "react";

const createStore = (createState) => {
    let state;
    const listeners = new Set();
  
    const setState = (partial, replace) => {
      const nextState = typeof partial === 'function' ? partial(state) : partial

      if (!Object.is(nextState, state)) {
        const previousState = state;

        if(!replace) {
            state = (typeof nextState !== 'object' || nextState === null)
                ? nextState
                : Object.assign({}, state, nextState);
        } else {
            state = nextState;
        }
        listeners.forEach((listener) => listener(state, previousState));
      }
    }
  
    const getState = () => state;
  
    const subscribe= (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    }
  
    const destroy= () => {
      listeners.clear()
    }
  
    const api = { setState, getState, subscribe, destroy }

    state = createState(setState, getState, api)

    return api
}

function useStore(api, selector) {
    function getState() {
        return selector(api.getState());
    }
    
    return useSyncExternalStore(api.subscribe, getState)
}

export const create = (createState) => {
    const api = createStore(createState)

    const useBoundStore = (selector) => useStore(api, selector)

    Object.assign(useBoundStore, api);

    return useBoundStore
}

```
