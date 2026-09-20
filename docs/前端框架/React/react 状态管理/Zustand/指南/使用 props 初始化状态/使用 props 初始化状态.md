# 使用 props 初始化状态

## 目录

- [使用 createStore 的存储创建器](#使用-createStore-的存储创建器)
- [使用 React.createContext 创建上下文](#使用-ReactcreateContext-创建上下文)
- [基本组件使用](#基本组件使用)
- [常见模式](#常见模式)
  - [包装上下文提供者](#包装上下文提供者)
  - [将上下文逻辑提取到自定义钩子中](#将上下文逻辑提取到自定义钩子中)
  - [可选地允许使用自定义等式函数](#可选地允许使用自定义等式函数)

在需要[依赖注入](https://zh.wikipedia.org/wiki/依赖注入 "依赖注入")的情况下，例如当一个存储应该用组件的 `props` 进行初始化时，**推荐的方法**是使用带有 `React.context` 的原生存储。

## 使用 `createStore` 的存储创建器

```javascript 
import { createStore } from 'zustand'

interface BearProps {
    bears: number
}

interface BearState extends BearProps {
    addBear: () => void
}

type BearStore = ReturnType<typeof createBearStore>

const createBearStore = (initProps?: Partial<BearProps>) => {
    const DEFAULT_PROPS: BearProps = {
        bears: 0,
    }
    return createStore<BearState>()((set) => ({
        ...DEFAULT_PROPS,
        ...initProps,
        addBear: () => set((state) => ({ bears: ++state.bears })),
    }))
}
```


## 使用 `React.createContext` 创建上下文

```javascript 
import { createContext } from 'react'

export const BearContext = createContext<BearStore | null>(null)
```


## 基本组件使用

```javascript 
// Provider 实现
import { useRef } from 'react'

function App() {
    const store = useRef(createBearStore()).current
    return (
        <BearContext.Provider value={store}>
            <BasicConsumer />
        </BearContext.Provider>
    )
}
```


```javascript 
// Consumer 组件
import { useContext } from 'react'
import { useStore } from 'zustand'

function BasicConsumer() {
    const store = useContext(BearContext)
    if (!store) throw new Error('树中缺少 BearContext.Provider')
    const bears = useStore(store, (s) => s.bears)
    const addBear = useStore(store, (s) => s.addBear)
    return (
        <>
            <div>{bears} 熊。</div>
            <button onClick={addBear}>添加熊</button>
        </>
    )
}
```


## 常见模式

### 包装上下文提供者

```javascript 
// Provider 包装器
import { useRef } from 'react'

type BearProviderProps = React.PropsWithChildren<BearProps>

function BearProvider({ children, ...props }: BearProviderProps) {
    const storeRef = useRef<BearStore>()
    if (!storeRef.current) {
        storeRef.current = createBearStore(props)
    }
    return (
        <BearContext.Provider value={storeRef.current}>
            {children}
        </BearContext.Provider>
    )
}
```


### 将上下文逻辑提取到自定义钩子中

```javascript 
// 模仿 `create` 返回的钩子
import { useContext } from 'react'
import { useStore } from 'zustand'

function useBearContext<T>(selector: (state: BearState) => T): T {
    const store = useContext(BearContext)
    if (!store) throw new Error('树中缺少 BearContext.Provider')
    return useStore(store, selector)
}
```


```javascript 
// 自定义钩子的 Consumer 使用
function CommonConsumer() {
    const bears = useBearContext((s) => s.bears)
    const addBear = useBearContext((s) => s.addBear)
    return (
        <>
            <div>{bears} 熊。</div>
            <button onClick={addBear}>添加熊</button>
        </>
    )
}
```


### 可选地允许使用自定义等式函数

```javascript 
//  通过使用 useStoreWithEqualityFn 而不 是 useStore 允许自定义等式函数
import { useContext } from 'react'
import { useStoreWithEqualityFn } from 'zustand/traditional'

function useBearContext<T>(
    selector: (state: BearState) => T,
    equalityFn?: (left: T, right: T) => boolean,
): T {
    const store = useContext(BearContext)
    if (!store) throw new Error('树中缺少 BearContext.Provider')
    return useStoreWithEqualityFn(store, selector, equalityFn)
}
```
