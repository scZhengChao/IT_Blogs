# react的状态库最佳实践非zustand莫属

## 目录

- [为什么要用Zustand ？](#为什么要用Zustand-)
- [Redux与Zustand对比](#Redux与Zustand对比)
  - [Redux:](#Redux)
  - [Zustand:](#Zustand)
- [Zustand解决的三个疑难杂症](#Zustand解决的三个疑难杂症)
  - [死节点问题](#死节点问题)
  - [React Concurrent mode 兼容问题](#React-Concurrent-mode-兼容问题)
  - [Context loss 问题](#Context-loss-问题)
- [优势](#优势)
  - [如何使用](#如何使用)
  - [更简洁的方式](#更简洁的方式)
  - [不可变状态](#不可变状态)
  - [兼容redux的Api](#兼容redux的Api)
  - [更方便的获取state的属性](#更方便的获取state的属性)
  - [比react-toolkit更简单的切片](#比react-toolkit更简单的切片)
  - [大量的中间件支持](#大量的中间件支持)
  - [兼容最新的react](#兼容最新的react)
  - [更方便的访问外部的state](#更方便的访问外部的state)
  - [更简单的异步操作](#更简单的异步操作)
- [Zustand的源码实现](#Zustand的源码实现)
  - [create创建store入口](#create创建store入口)
  - [createImpl 初始化](#createImpl-初始化)
  - [use-sync-external-store与useStore](#use-sync-external-store与useStore)
  - [createStore 创建或更新state](#createStore-创建或更新state)
  - [react中全局初始化props原理](#react中全局初始化props原理)
  - [兼容createContext](#兼容createContext)
  - [immer与 zustand中间件的集成原理](#immer与-zustand中间件的集成原理)
  - [兼容redux的中间件的原理](#兼容redux的中间件的原理)
  - [手写个log中间件](#手写个log中间件)
- [Zustand 原理](#Zustand-原理)
  - [原理简述](#原理简述)
  - [Zustand 执行过程](#Zustand-执行过程)

# 为什么要用Zustand ？

react的状态库生态繁荣，最佳实践一直没有，选择简单易上手又能处理复杂状态的库是一件很麻烦的事，Zustand可以说是当前最火热的react的状态管理库，简洁方便快捷，\*\*并解决了死节点问题、****`react Concurrent`****、`Context loss`\*\***问题。**是**解决所有这些问题的唯一的状态库**。毫不夸张的说，**react的状态库最佳实践非zustand莫属**。

docs： [docs.pmnd.rs/zustand/get…](https://link.juejin.cn/?target=https://docs.pmnd.rs/zustand/getting-started/introduction "docs.pmnd.rs/zustand/get…")

[ Zustand Documentation Zustand is a small, fast and scalable bearbones state-management solution, it has a comfy api based on hooks https://docs.pmnd.rs/zustand/getting-started/introduction](https://docs.pmnd.rs/zustand/getting-started/introduction " Zustand Documentation Zustand is a small, fast and scalable bearbones state-management solution, it has a comfy api based on hooks https://docs.pmnd.rs/zustand/getting-started/introduction")

# Redux与Zustand对比

##### **Redux:**

```javascript 
const countReducer = (state = {count: 0}, action: any) => {
  switch(action.type) {
    case 'Increment': return {count: state.count + 1}
    case 'Decrement': return {count: state.count - 1}
    default: return state
  }
}

export const countActions = {
  add: () => ({type: 'Increment'}),
  del: () => ({type: 'Decrement'})
}

export const store = createStore(countReducer)

// comp
import React from 'react'
import { store, countActions } from "./redux";

export default function ReduxTest() {
  const [count, setcount] = React.useState(store.getState().count)

  const handleClick = () => {
    store.dispatch(countActions.add())
    setcount(store.getState().count)
  }
  return (
    <>
      <h3>{count}</h3>
      <button onClick={handleClick}>one up</button>
    </>
  )
}

```


##### **Zustand:**

```javascript 
//  封装共用方法，方便获取state
 export function createSelectors(store) {
  store.use = {}
  for (let k of Object.keys(store.getState())) {
    (store.use)[k] = () => store((s) => s[k])
  }
  return store
}
```


```javascript 
export const useCountStore = create((set, getState, api) => ({
  count: 0,
}))

export const Increment = () =>  useCountStore.setState ((state) => ({ count: state.count + 1 }))
export const Decrement = () => useCountStore.setState((state) => ({ count: state.count - 1 }))
export const getCount = () => createSelectors(useCountStore).use.count()

// comp
import React from 'react'
import { Increment, getCount } from "./store";

export const Zustand = () => {
  return <>
    <div>{getCount()}</div>
    <button onClick={Increment}>one up</button>
  </>
}
```


从Zustand中获取状态值同样很方便, 再也不用像以前大量的hooks的定义状态值了。

```javascript 
import React from 'react'
// ...
export const Zustand = () => {
  const { count, } = useStore(state => state)
  return <>
    <div>{count}</div>
  </>
}


```


从上面的例子我们可以看出，redux要定义reducer、actions、dispatch更新等，而zustand十分简洁易懂， 几行代码搞定。在组件的使用上，redux在组件内部我们还需要定义一个state来触发更新，当然我们一般结合react-redux，是不是就变更复杂了？而在zustand中已经自动缓存了状态，而不用定义useState, 直接调用方法就行。

# Zustand解决的三个疑难杂症

## 死节点问题

docs： [react-redux.js.org/api/hooks#s…](https://link.juejin.cn?target=https://react-redux.js.org/api/hooks#stale-props-and-zombie-children "react-redux.js.org/api/hooks#s…")

具体例子： [codesandbox.io/s/race-cond…](https://link.juejin.cn?target=https://codesandbox.io/s/race-condition-x1h1d?file=/src/App.js "codesandbox.io/s/race-cond…")

我们可以看到了child死节点，更新为3的时候，父组件的counter并没有更新。在一些特殊情况，useSelector的使用可能会出现问题。

```javascript 
import React, { useCallback, useEffect } from "react";
import { incrementAction } from "./actions";
import { connect, useSelector, useDispatch } from "react-redux";

const countersSelector = state => {
  console.log("RUNNING SELECTOR", state.counters);
  return state.counters;
};

class ChildBase extends React.Component {
  componentDidMount() {
    if (this.props.counter < 3) {
      this.props.increment();
    }
  }

  componentDidUpdate() {
    if (this.props.counter < 3) {
      this.props.increment();
    }
  }

  render() {
    return <div>Child: {this.props.counter}</div>;
  }
}

const mapStateToProps = state => ({
  counter: state.counters.counter
});

const mapDispatchToProps = dispatch => ({
  increment: () => dispatch(incrementAction())
});

const Child = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChildBase);

function App(props) {
  console.log("App CALLING USESELECTOR");
  const counters = useSelector(countersSelector);
  console.log(counters);

  return (
    <div className="App">
      <div>App: {counters.counter}</div>
      <Child />
    </div>
  );
}

export default App;

```


```javascript 
export const ACTIONS = {
  INCREMENT: "INCREMENT"
};

export const incrementAction = payload => ({
  type: ACTIONS.INCREMENT,
  payload
});

```


## React Concurrent mode 兼容问题

## Context loss 问题

issues： [github.com/facebook/re…](https://link.juejin.cn/?target=https://github.com/facebook/react/issues/13332 "github.com/facebook/re…")

问题：

```javascript 
ReactDOM.render(
  <TickProvider>
    <Canvas>
      <Square />
    </Canvas>
    <Consumer>{value => value.toFixed(2)}</Consumer>
  </TickProvider>,
  document.getElementById('outside')
);

```


这种情况`Canvas`内部的`Square`是无法得到外部`context`，本质其实是`react`的`createContext`无法在`react`的节点传递到渲染器的节点内，在一些第三方的图表库、3d渲染库会存在**无法获取外部的状态问题**。而`zustand`本身是不需要`Provider`的。

解决方案：

```javascript 
ReactDOM.render(
  <TickProvider>
    <Consumer>
      {value => (
        <Canvas>
          <Provider value={value}>
            <Square />
          </Provider>
        </Canvas>
      )}
    </Consumer>
    <Consumer>{value => value.toFixed(2)}</Consumer>
  </TickProvider>,
  document.getElementById('bridge')
);

```


这样可以解决获取不到的状态，但是canvas很容易被重复渲染，所以canvas和square组件需要**memo()包裹**，防止重复渲染，使用zustand可以轻松解决。

# 优势

## 如何使用

zustand初始化：

```javascript 
import { create } from 'zustand'

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))

```


组件内使用：

```javascript 
function BearCounter() {
  const bears = useStore((state) => state.bears)
  return <h1>{bears} around here...</h1>
}

function Controls() {
  const increasePopulation = useStore((state) => state.increasePopulation)
  return <button onClick={increasePopulation}>one up</button>
}

```


## 更简洁的方式

你甚至可以更简洁

```javascript 
export const useBoundStore = create(() => ({
  count: 0,
  text: 'hello',
}))

export const inc = () =>
  useBoundStore.setState((state) => ({ count: state.count + 1 }))

export const setText = (text) => useBoundStore.setState({ text })

```


## 不可变状态

`zustand`通过`create`返回`useStore`，你可以通过`useStore`处理你的`state`，比如更新、获取、订阅、取消订阅、销毁处理。由于默认对`state`支持浅拷贝，如果要更新深拷贝通过`{state，...newState}`可能并不是一种好的方法，但是zustand可以很好的支持`immer`。

```javascript 
immerInc: () =>
    set(produce((state: State) => { ++state.deep.nested.obj.count })),

```


## 兼容redux的Api

如果你习惯了redux的方法，也可以这么做， 改造下reducer和dispatch。

```javascript 
const types = { increase: 'INCREASE', decrease: 'DECREASE' }

const reducer = (state, { type, by = 1 }) => {
  switch (type) {
    case types.increase:
      return { grumpiness: state.grumpiness + by }
    case types.decrease:
      return { grumpiness: state.grumpiness - by }
  }
}

const useGrumpyStore = create((set) => ({
  grumpiness: 0,
  dispatch: (args) => set((state) => reducer(state, args)),
}))

const dispatch = useGrumpyStore((state) => state.dispatch)
dispatch({ type: types.increase, by: 2 })

```


你甚至也可以使用中间件

```javascript 
import { redux } from 'zustand/middleware'

const useReduxStore = create(redux(reducer, initialState))

```


## 更方便的获取state的属性

```javascript 
import { StoreApi, UseBoundStore } from 'zustand'

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  let store = _store as WithSelectors<typeof _store>
  store.use = {}
  for (let k of Object.keys(store.getState())) {
    ;(store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
  }

  return store
}

//...
const useBearStore = createSelectors(useBearStoreBase)

// get the property
const bears = useBearStore.use.bears()

// get the action
const increase = useBearStore.use.increment()

```


## 比react-toolkit更简单的切片

```javascript 
export const createFishSlice = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
})

export const createBearSlice = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
  eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
})

import { create } from 'zustand'
import { createBearSlice } from './bearSlice'
import { createFishSlice } from './fishSlice'

export const useBoundStore = create((...a) => ({
  ...createBearSlice(...a),
  ...createFishSlice(...a),
}))

```


## 大量的中间件支持

![](./image/image_mfrPPQMjqz.png)

库自带的中间件比如immer、combine处理自定义state和create合并，devtools辅助，persist缓存，redux兼容中间件，还有订阅的钩子。其他中间件[docs.pmnd.rs/zustand/int…](https://link.juejin.cn/?target=https://docs.pmnd.rs/zustand/integrations/third-party-libraries "docs.pmnd.rs/zustand/int…") 。

[ Zustand Documentation Zustand is a small, fast and scalable bearbones state-management solution, it has a comfy api based on hooks https://docs.pmnd.rs/zustand/integrations/third-party-libraries](https://docs.pmnd.rs/zustand/integrations/third-party-libraries " Zustand Documentation Zustand is a small, fast and scalable bearbones state-management solution, it has a comfy api based on hooks https://docs.pmnd.rs/zustand/integrations/third-party-libraries")

## 兼容最新的react

Concurrent 模式在react18得以真正以fiber架构实现了异步。通过使用 useTransition、useDeferredValue，更新对应的 reconcile 过程变为可中断，不再会因为长时间占用主线程而阻塞渲染进程，使得页面的交互过程可以更加流畅。在我们使用诸如 redux、mobx 等第三方状态库时，如果开启了 Concurrent 模式，那么就有可能会出现状态不一致的情形，给用户带来困扰。针对这种情况， `React18 提供了一个新的 hook - useSyncExternalStore给第三方状态库的接口解决这个问题。zustand就使用了use-sync-external-store的useSyncExternalStoreWithSelector的api管理状态。selector获取属性的钩子，以及是否更新的qualityFn函数` 。

```javascript 
export function useStore<TState, StateSlice>(
  api: WithReact<StoreApi<TState>>,
  selector: (state: TState) => StateSlice = api.getState as any,
  equalityFn?: (a: StateSlice, b: StateSlice) => boolean
) {
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getState,
    selector,
    equalityFn
  )
  useDebugValue(slice)
  return slice
}


```


## 更方便的访问外部的state

```javascript 
const useStore = create((set, get) => ({
  sound: 'grunt',
  action: () => {
    const sound = get().sound
    // ...
  },
}))

```


从createState就解决了访问外部的state的问题，`zustand`**本身不用**`useContext`来传递`react`的状态，那么就不会存在渲染器上下文获取不到的情况

## 更简单的异步操作

```javascript 
const useStore = create((set) => ({
  fishies: {},
  fetch: async (pond) => {
    const response = await fetch(pond)
    set({ fishies: await response.json() })
  },
}))

```


再也不用redux-thunk来调用函数的中间件支持了，**不管同步异步**我们可以轻松处理状态

# Zustand的源码实现

## create创建store入口

```javascript 
export const create = (<T>(createState: StateCreator<T, [], []> | undefined) =>
  createState ? createImpl(createState) : createImpl) as Create

```


create就是初始化`store`，简单的缓存判**断是否第一次创建store， 返回的是一个useStore函数, 用于更新store状态的方法。**

## createImpl 初始化

```javascript 
const createImpl = <T>(createState: StateCreator<T, [], []>) => {
  if (
    import.meta.env?.MODE !== 'production' &&
    typeof createState !== 'function'
  ) {
    console.warn(
      "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
    )
  }
  
  // 初始化的api对象,  { setState, getState, subscribe, destroy }
  const api =
    typeof createState === 'function' ? createStore(createState) : createState
   
  // 这里是create返回的useStore, selector代表找到对应state属性的钩子函数，equalityFn这里代表比对的规则，比如shallow浅拷贝
  const useBoundStore: any = (selector?: any, equalityFn?: any) =>
    useStore(api, selector, equalityFn)
   
  // 合并api
  Object.assign(useBoundStore, api)

  return useBoundStore
}

```


createImpl定义了基础的zustand的api，useBounodStore方法内部的useStore将store的控制权交由react更新处理，zustand这里只是包了一层传入selector，quealityFn，然后返回的是useBoundStore，也就是我们create返回的useStore

## use-sync-external-store与useStore

```javascript 
import useSyncExternalStoreExports from 'use-sync-external-store/shim/with-selector'
const { useSyncExternalStoreWithSelector } = useSyncExternalStoreExports
// ...
export function useStore<TState, StateSlice>(
  api: WithReact<StoreApi<TState>>,
  selector: (state: TState) => StateSlice = api.getState as any,
  equalityFn?: (a: StateSlice, b: StateSlice) => boolean
) {
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getState,
    selector,
    equalityFn
  )
  useDebugValue(slice)
  return slice
}

```


这里最关键的是 use-sync-external-store这个库，详情在[github.com/reactwg/rea…](https://link.juejin.cn?target=https://github.com/reactwg/react-18/discussions/86 "github.com/reactwg/rea…")

使用 `useSyncExternalStore` `API` 与自定义 Hook 最大的不同在于，使用 API 我们就是将**状态更新如何触发重渲染的逻辑与时机**交给 `React` 来负责。这样业务层面所提供的外部状态，在接入新的 React 渲染逻辑(如 18 之后出现的 Concurrent 模式)，**从而能够获得更多的框架内部优化机会**，不像自定义 Hook 一定只能基于 Effect 执行逻辑从而存在优化上限。

## createStore 创建或更新state

```javascript 
const createStoreImpl: CreateStoreImpl = (createState) => {
  type TState = ReturnType<typeof createState>
  type Listener = (state: TState, prevState: TState) => void
  let state: TState
  // 所有更新的方法存在一个set集合中
  const listeners: Set<Listener> = new Set()
    
  // set
  const setState: StoreApi<TState>['setState'] = (partial, replace) => {
     // 如果是函数就调用更新state
    const nextState =
      typeof partial === 'function'
        ? (partial as (state: TState) => TState)(state)
        : partial
    if (!Object.is(nextState, state)) {
      const previousState = state
      // 这里判断是要需要浅拷贝，更新state
      state =
        replace ?? typeof nextState !== 'object'
          ? (nextState as TState)
          : Object.assign({}, state, nextState)
      //执行监听器的队列
      listeners.forEach((listener) => listener(state, previousState))
    }
  }

  const getState: StoreApi<TState>['getState'] = () => state

  const subscribe: StoreApi<TState>['subscribe'] = (listener) => {
    listeners.add(listener)
    // Unsubscribe
    return () => listeners.delete(listener)
  }

  const destroy: StoreApi<TState>['destroy'] = () => {
    if (import.meta.env?.MODE !== 'production') {
      console.warn(
        '[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected.'
      )
    }
    listeners.clear()
  }

  const api = { setState, getState, subscribe, destroy }
  state = createState(setState, getState, api)
  return api as any
}

```


createStoreImpl执行后默认创建state，并返回api对象，包含setState、getState、subscribe、destory方法，简单来说他做的就是更新api对象，执行createState创建state对象

`setState`主要根据更新值判断是否需要浅拷贝，并更新state，对于监听器的队列触发一轮。
`getState`得到当前的state
`subscribe` 注册监听器函数，并返回取消订阅的函数
`destory` 清空监听器队列

```javascript 
export const useOneCountStore = create<CountState>((set, getState, api) => ({
  count: 0,
  increasePopulation: () => set((state) => {
    return { count: state.count + 1 }
  }),
  removeAllBears: () => set({ count: 0 }),
}))

```


我们可以从这个例子看出来，create内部的函数，就是createState。在初始化一个store的时候会执行一次。

## react中全局初始化props原理

react一般通过createContext来创建上下文，返回的Context的对象属性中存在Provide提供全局的store状态。在子组件useContext可以获取全局的state。zustand只不过将这个流程封装了一遍，核心还是react的api，并初始化createStore， 并集成一些核心的zustand的api。

## 兼容createContext

```javascript 
function createContext<S extends StoreApi<unknown>>() {
  const ZustandContext = reactCreateContext<S | undefined>(undefined)
    
   // 构造Provider组件
  const Provider = ({
    createStore,
    children,
  }: {
    createStore: () => S
    children: ReactNode
  }) => {
    const storeRef = useRef<S>()

    if (!storeRef.current) {
      storeRef.current = createStore()
    }

    return createElement(
      ZustandContext.Provider,
      { value: storeRef.current },
      children
    )
  }
    
   // 支持react的useContext
  const useContextStore: UseContextStore = (
    selector?: (state: ExtractState<S>) => StateSlice,
    equalityFn?: (a: StateSlice, b: StateSlice) => boolean
  ) => {
    const store = useContext(ZustandContext)
    if (!store) {
      throw new Error(
        'Seems like you have not used zustand provider as an ancestor.'
      )
    }
    return useStore(
      store,
      selector as (state: ExtractState<S>) => StateSlice,
      equalityFn
    )
  }

  // 防止重渲染
  const useStoreApi = () => {
    const store = useContext(ZustandContext)
    if (!store) {
      throw new Error(
        'Seems like you have not used zustand provider as an ancestor.'
      )
    }
    return useMemo<WithoutCallSignature<S>>(() => ({ ...store }), [store])
  }

  return {
    Provider,
    useStore: useContextStore,
    useStoreApi,
  }
}

```


## immer与 zustand中间件的集成原理

使用方法：

```javascript 
import produce from 'immer'

const useStore = create((set) => ({
  lush: { forest: { contains: { a: 'bear' } } },
  set: (fn) => set(produce(fn)),
}))

const set = useStore((state) => state.set)
set((state) => {
  state.lush.forest.contains = null
})

```


这里我们可以细分到对应的方法里面，控制不可变，但是同样我们可以用中间件来全局控制，而不用到处写produce

immerImpl中间件源码：

```javascript 
const immerImpl: ImmerImpl = (initializer) => (set, get, store) => {
  type T = ReturnType<typeof initializer>

  store.setState = (updater, replace, ...a) => {
    const nextState = (
      typeof updater === 'function' ? produce(updater as any) : updater
    ) as ((s: T) => T) | T | Partial<T>

    return set(nextState as any, replace, ...a)
  }

  return initializer(store.setState, get, store)
}


```


中间件执行过程：

![](./image/image_ClKh5zDczS.png)

中间件的实现其实就是通过闭包，一层一层函数嵌套递归，最终将传入的状态值返回更新结果。而每一层函数就是中间件。在zustand中其实就是createState经过中间件的不断的改造，得到新的createState，我们一旦create后，执行createImpl会执行完这里的每个中间件初始化，后续每次set更新state都会进入中间件的执行过程。

所以我们可以看到immerImpl首先将上一轮的createState传入，然后将更新的set、get、store传入下一轮的createState中，**注意这个过程是中间件桥接的初始化的必然过程**，我们可以看到中间件内部执行了setState并返回且执行下一轮的setState，所以当我们useStore执行selector更新，其实执行了一连串的setState。

## 兼容redux的中间件的原理

使用方法：

```javascript 
import { redux } from 'zustand/middleware'
const useReduxStore = create(redux(reducer, initialState))

```


源码：

```javascript 
const reduxImpl: ReduxImpl = (reducer, initial) => (set, _get, api) => {
  type S = typeof initial
  type A = Parameters<typeof reducer>[1]
  ;(api as any).dispatch = (action: A) => {
    ;(set as NamedSet<S>)((state: S) => reducer(state, action), false, action)
    return action
  }
  ;(api as any).dispatchFromDevtools = true

  return { dispatch: (...a) => (api as any).dispatch(...a), ...initial }
}
export const redux = reduxImpl as unknown as Redux

```


在redux方法执行后，返回的是一个createStore, 然后在create方法中传入createStore，执行createStoreImpl(createState)创建store， 注意这里返回的是一个dispatch方法和inital的对象而不是createState。所以reduxImpl是不支持联合其他中间件的。

## 手写个log中间件

```javascript 
const log = (config) => (set, get, api) =>
  config(
    (args) => {
      console.log('  applying', args)
      set(args)
      console.log('  new state', get())
    },
    get,
    api
  )

```


# Zustand 原理

## 原理简述

简单理解为create创建store，然后传入创建后的set，get，api对象，这么做的目的更方便我们处理state，然后将状态交由react控制，通过getState访问Zustand的state， 到这里为止我们获取到useStore，如果要更新state，每次需要调用useStore传入seletor函数，后续的更新操作其实一直调用的是react的状态更新的接口。

而中间件原理就是createState不断嵌套，在执行过程中做你想做的，比如修改setState，但要注意为了能执行下去你需要return新的setState。

## Zustand 执行过程

接下来我们回顾下zustand的用法

```javascript 
import { create } from 'zustand'

// store
const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))

// comp
function BearCounter() {
  const bears = useStore((state) => state.bears)
  return <h1>{bears} around here...</h1>
}

function Controls() {
  const increasePopulation = useStore((state) => state.increasePopulation)
  return <button onClick={increasePopulation}>one up</button>
}

```


Zustand执行过程：

![](./image/image_08iBfnjIDH.png)

我们再也不用原来繁杂的用redux、react-redux、toolkit、thunk等来处理状态，当然mobx基于proxy代理也很简单，但是装饰器、类的写法以及防止重渲染逻辑处理，相比zustand更繁琐些。当然zustand的自身优势也非常明显， 比如在渲染器嵌套的情况下，canvas组件是无法获取外部的上下文等，而zustand可以解决这些特殊场景。所以以后react的状态管理用zustand吧。
