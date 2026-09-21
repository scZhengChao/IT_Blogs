# Zustand

## 目录

- [基础使用](#基础使用)
- [亮点](#亮点)

> 需要翻墙；文档

[   https://ouweiya.github.io/zustand-zh/docs/guides/updating-state](https://ouweiya.github.io/zustand-zh/docs/guides/updating-state "   https://ouweiya.github.io/zustand-zh/docs/guides/updating-state")

> 官网

[ 一个小型、快速、可扩展的基本状态管理解决方案 - Zustand 一个小型、快速、可扩展的基本状态管理解决方案。Zustand 有一个基于 hooks 的舒适 API。它不是样板文件，也没有倾向，但有足够的约定来明确和流量一样。 https://zustand-cn.js.org/](https://zustand-cn.js.org/ " 一个小型、快速、可扩展的基本状态管理解决方案 - Zustand 一个小型、快速、可扩展的基本状态管理解决方案。Zustand 有一个基于 hooks 的舒适 API。它不是样板文件，也没有倾向，但有足够的约定来明确和流量一样。 https://zustand-cn.js.org/")

> github 地址

[ GitHub - pmndrs/zustand: 🐻 Bear necessities for state management in React 🐻 Bear necessities for state management in React. Contribute to pmndrs/zustand development by creating an account on GitHub. https://github.com/pmndrs/zustand](https://github.com/pmndrs/zustand " GitHub - pmndrs/zustand: 🐻 Bear necessities for state management in React 🐻 Bear necessities for state management in React. Contribute to pmndrs/zustand development by creating an account on GitHub. https://github.com/pmndrs/zustand")

> 英文文档

[ Zustand Documentation Zustand is a small, fast and scalable bearbones state-management solution, it has a comfy api based on hooks https://docs.pmnd.rs/zustand/getting-started/introduction](https://docs.pmnd.rs/zustand/getting-started/introduction " Zustand Documentation Zustand is a small, fast and scalable bearbones state-management solution, it has a comfy api based on hooks https://docs.pmnd.rs/zustand/getting-started/introduction")

# 基础使用

[zustand.zip](https://github.com/scZhengChao/IT_Blogs/releases/download/assets-v1/zustand_k-4c9BBtpR.zip "zustand.zip")

```typescript 
import create from 'zustand'
import a from './model/a'
import b from './model/b'
import log from './middleware/log'
import presistFn from './middleware/presist'

function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg
    }
    if (funcs.length === 1) {
        return funcs[0]
    }
    return funcs.reduce((a, b) =>(...args) => a(b(...args)))
}

const store = (...options) => ({
    ...a(...options),
    ...b(...options)
})
const useBearStore = compose(create,presistFn,log)(store)

export default useBearStore
```


```typescript 
// model
const initialState = { designId: undefined, loading: false ,bears: 0,created:false};

const createFishSlice = (set,get)=>({
    ...initialState,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
})
export default createFishSlice


```


```typescript 
// middleware

//log
const log = (config) => (set, get, api) =>
    config(
        (...args) => {
            console.log('  applying', args)
            set(...args)
            console.log('  new state', get())
        },
        get,
        api
    )
export default log

//presist

import {  persist } from 'zustand/middleware'
const presistFn = (data)=>{
   return persist(data,{
           name: 'food-storage', // unique name
           getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
       }
   )
}
export default presistFn
```


# 亮点

> 可以往函数上合并属性；当初对象用

```typescript 
const createImpl = <T>(createState: StateCreator<T, [], []>) => {
  const api = createStore(createState)

  const useBoundStore: any = (selector?: any) => useStore(api, selector)

  Object.assign(useBoundStore, api)

  return useBoundStore
}
```


[ts](./ts/index.md "ts")

[使用到源码](./使用到源码/index.md "使用到源码")

[指南](./指南/index.md "指南")

[扩展](./扩展/index.md "扩展")

[使用](./使用/index.md "使用")

[中间件](./中间件/index.md "中间件")

[api](./api/index.md "api")
