# Jotai

## 目录

- [首先创建基本原子](#首先创建基本原子)
- [在组件中使用原子](#在组件中使用原子)
- [使用计算值创建衍生原子](#使用计算值创建衍生原子)
- [Recipes](#Recipes)
  - [从多个原子创建原子](#从多个原子创建原子)
  - [派生的异步原子](#派生的异步原子)
  - [可以创建可写的派生原子](#可以创建可写的派生原子)
  - [只写原子](#只写原子)
  - [异步操作](#异步操作)
- [全局组件](#全局组件)

如果你觉得 `Redux` 心智负担太重，用起来太繁琐，想要一个轻量，容易使用且性能不错的状态管理库，那就试试看 `Jotai` 吧

[   https://www.npmjs.com/package/jotai](https://www.npmjs.com/package/jotai "   https://www.npmjs.com/package/jotai")

# 首先创建基本原子

原子代表一种状态。您只需要指定一个初始值，它可以是字符串和数字、对象和数组等基本值。您可以创建任意多个基本原子。

```javascript 
import { atom } from 'jotai'

const countAtom = atom(0)
const countryAtom = atom('Japan')
const citiesAtom = atom(['Tokyo', 'Kyoto', 'Osaka'])
const mangaAtom = atom({ 'Dragon Ball': 1984, 'One Piece': 1997, Naruto: 1999 })
```


# 在组件中使用原子

它可以像React.useState那样使用：

```javascript 
import { useAtom } from 'jotai'

function Counter() {
  const [count, setCount] = useAtom(countAtom)
  return (
    <h1>
      {count}
      <button onClick={() => setCount(c => c + 1)}>one up</button>
```


# 使用计算值创建衍生原子

通过将read函数作为第一个参数传递，可以从现有原子创建新的只读原子。get允许您获取任何原子的上下文值。

```javascript 
const doubledCountAtom = atom((get) => get(countAtom) * 2)

function DoubleCounter() {
  const [doubledCount] = useAtom(doubledCountAtom)
  return <h2>{doubledCount}</h2>
```


# Recipes

## 从多个原子创建原子

可以组合多个原子来创建衍生原子。

```javascript 
const count1 = atom(1)
const count2 = atom(2)
const count3 = atom(3)

const sum = atom((get) => get(count1) + get(count2) + get(count3))
```


Or if you like fp patterns ...

```javascript 
const atoms = [count1, count2, count3, ...otherAtoms]
const sum = atom((get) => atoms.map(get).reduce((acc, count) => acc + count))

```


## 派生的异步原子

![](https://camo.githubusercontent.com/739d353c9605109001c329999de192d0870ae420bdc9b244347acd3255f41ab1/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d6e656564735f73757370656e73652d626c61636b)

您也可以将read函数设置为异步函数。

```javascript 
const urlAtom = atom("https://json.host.com")
const fetchUrlAtom = atom(
  async (get) => {
    const response = await fetch(get(urlAtom))
    return await response.json()
  }
)

function Status() {
  // Re-renders the component after urlAtom changed and the async function above concludes
  const [json] = useAtom(fetchUrlAtom)

```


## 可以创建可写的派生原子

在第二个参数处指定写入函数。get将返回原子的当前值。set将更新atoms值。

```javascript 
const decrementCountAtom = atom(
  (get) => get(countAtom),
  (get, set, _arg) => set(countAtom, get(countAtom) - 1),
)

function Counter() {
  const [count, decrement] = useAtom(decrementCountAtom)
  return (
    <h1>
      {count}
      <button onClick={decrement}>Decrease</button>
```


## 只写原子

不要定义读取函数。

```javascript 
const multiplyCountAtom = atom(null, (get, set, by) => set(countAtom, get(countAtom) * by))

function Controls() {
  const [, multiply] = useAtom(multiplyCountAtom)
  return <button onClick={() => multiply(3)}>triple</button>
```


## 异步操作

只需将write函数设置为异步函数，并在准备好后调用set即可。

```javascript 
const fetchCountAtom = atom(
  (get) => get(countAtom),
  async (_get, set, url) => {
    const response = await fetch(url)
    set(countAtom, (await response.json()).count)
  }
)

function Controls() {
  const [count, compute] = useAtom(fetchCountAtom)
  return <button onClick={() => compute("http://count.host.com")}>compute</button>
```


# 全局组件

```javascript 
//index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.less'
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { Provider, useAtom } from "jotai";
import { jotaiStore } from './jotai/index'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <BrowserRouter>
          <Provider unstable_createStore={() => jotaiStore}>
            <App />
          </Provider>
      </BrowserRouter>
);



//jotai
import { atom } from 'jotai'
import { unstable_createStore, useAtom, WritableAtom } from "jotai";
import { useLayoutEffect } from "react";
export const countAtom = atom(1)
export const countryAtom = atom('Japan')
export const citiesAtom = atom(['Tokyo', 'Kyoto', 'Osaka'])
export const mangaAtom = atom({ 'Dragon Ball': 1984, 'One Piece': 1997, Naruto: 1999 })

export const jotaiScope = Symbol();
export const jotaiStore = unstable_createStore();

export const useAtomWithInitialValue = <
    T extends unknown,
    A extends WritableAtom<T, T>,
    >(
    atom: A,
    initialValue: T | (() => T),
) => {
    const [value, setValue] = useAtom(atom);
    useLayoutEffect(() => {
        if (typeof initialValue === "function") {
            // @ts-ignore
            setValue(initialValue());
        } else {
            setValue(initialValue);
        }
    }, []);

    return [value, setValue] as const;
};

```


components 使用

```javascript 
import { useAtom,atom } from 'jotai'
import { countAtom ,jotaiStore} from '../../jotai'

// ---------------使用原子
function Counter() {
    const [count, setCount] = useAtom(countAtom)
    return (
        <h1>
            {count}
            <button onClick={() => setCount(c => c + 1)}>one up</button>
        </h1>
    )
}


// -----------------计算值创建衍生原子

const doubledCountAtom = atom((get) => get(countAtom) * 2)
function DoubleCounter() {
    const [doubledCount] = useAtom(doubledCountAtom)
    return <h2>{doubledCount}</h2>
}

// -------------------------派生的异步原子
const urlAtom = atom("https://json.host.com")
const fetchUrlAtom = atom(
    async (get) => {
        const fetchData =()=> new Promise((resolve)=>{
            get(urlAtom)
            setTimeout(()=>{
                resolve(get(urlAtom)+'返回')
            },2000)
        })
        const response = await fetchData()
        return response
    }
)
function Status() {
    // Re-renders the component after urlAtom changed and the async function above concludes
    const [json] = useAtom(fetchUrlAtom)
    return <div>
        {json }
    </div>
}


// -------------------可写的派生原子
const decrementCountAtom = atom(
    (get) => get(countAtom),
    (get, set, _arg) => set(countAtom, get(countAtom) - 1),
)

function CounterNew() {
    const [count, decrement] = useAtom(decrementCountAtom)
    return (
        <h1>
            {count}
            <button onClick={decrement}>Decrease</button>
        </h1>
    )
}

// -----------------只写原子
const multiplyCountAtom = atom(null, (get, set, by) => set(countAtom, get(countAtom) * by))

function Controls() {
    const [, multiply] = useAtom(multiplyCountAtom)
    return <button onClick={() => multiply(3)}>triple</button>
}


// ---------------------异步操作
const fetchCountAtom = atom(
    (get) => get(countAtom),
    async (_get, set, url) => {
        let fetchData = ()=>new Promise((resovle,reject)=>{
            resovle(10)
        })
        const response = await fetchData()
        set(countAtom, _get(countAtom)*response)
    }
)

function ControlsNew() {
    const [count, compute] = useAtom(fetchCountAtom)
    return <button onClick={() => compute("http://count.host.com")}>compute</button>
}
function JotaiStore(){
    return <button onClick={() => jotaiStore.set(countAtom, 0)}>clear</button>
}

function Jotai(){
    return (<div style={{width:'100%',height:'100%',overflow:"hidden"}}>
        <Counter/>
        <DoubleCounter/>
        <Status/>
        <CounterNew/>
        <Controls/>
        <ControlsNew/>
        <JotaiStore/>
    </div>)
}
export default Jotai
```
