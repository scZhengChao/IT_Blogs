# 监听storage变化

## 目录

- [定义](#定义)
- [❌错误定义](#错误定义)
- [✔正确定义](#正确定义)
- [使用](#使用)

#### 定义

#### ❌错误定义

```typescript 
import { useEffect, useState } from "react";
export const useStorage = () => {
  const [value, setValue] = useState<string | null>();
  useEffect(() => {
    window.addEventListener("storage", (ev) => setValue(ev.newValue));
    return () =>
      window.removeEventListener("storage", (ev) => setValue(ev.newValue));
  }, []);
  
  return value;
};

```


有了前面几个hook定义经验，这个不是手到擒来啊。结果一使用根本不起作用，百度原因才发现`storage`仅仅对同源下的不同页面起作用，作为单页面应用`SPA`，还得再想办法。

思前想后，在不大动大改的前提下，我重写了`window.localStorage`下的方法，命名保持一直，这样所有之前使用过的页面只需要引入我定义好的`localStorage`，同时去掉`window.`

```typescript 
export const localStorage = {
  getItem: (key: string) => window.localStorage.getItem(key),
  setItem: (key: string, value: any) => window.localStorage.setItem(key, value),
  clear: () => return window.localStorage.clear(),
  removeItem: (key: string) => window.localStorage.removeItem(key),
  key: window.localStorage.key,
  length: window.localStorage.length,
}

```


接下来让每次的修改、删除、清空都可以被监听到。这里我借助的是前面文章提到的中介者模式，负责监听storage的变化。所以正确的定义方法如下

#### ✔正确定义

```react tsx 
import { useState } from 'react';
// 中介者
const mediator = (function (){
    let topics:{
        [key:string]:{
            callback:(value:any)=>void,
            uuid:number,
        }[]
    } = {},
        uuid=0;
    function subscribe(topic:string,callback:(value:any)=>void){
        uuid++
        topics[topic] = topics[topic]?[...topics[topic],{callback,uuid}]:[{callback,uuid}]
    }
    function publish(topic:string,value:string){
        if(topics[topic]){
            topics[topic].map(item=>item.callback(value))
        }
    }
    return {
        install:function (obj:any){
            obj.uuid = uuid
            obj.publish = publish
            obj.subscribe = subscribe
            return obj
        }
    }
})()
// 创建中介者函数
const createMediator = (obj:object)=>mediator.install(obj)
// 记录所有监听的key
const keys:string[] = []
//重写window.localStorage
export const localStorage = {
    getItem:(key:string)=>{
        return window.localStorage.getItem(key)
    },

    setItem:(key:string,value:any)=>{
        //防止重复发布
        if(!keys.includes(key)) keys.push(key)
        const sub = createMediator({})
        //被修改就发布事件
        sub.publish(key,value)
        return window.localStorage.setItem(key,value)
    },
    clear:()=>{
        const sub =createMediator({})
        //被删除就每个key发布事件
        keys.map(key=>sub.publish(key,undefined))
        // 发布后清空记录key的数组
        keys.length = 0;
        return window.localStorage.clear()
    },
    removeItem:(key:string)=>{
        keys.splice(keys.indexOf(key),1)
        const sub = createMediator({})
        //被移除就发布undefined
        sub.publish(key,undefined)
        return window.localStorage.removeItem(key)
    },
    key:window.localStorage.key,
    length:window.localStorage.length,
}
// 监听key最新变化
export const useStorage = (key:string)=>{
    //默认初始值
    const [value,setValue]= useState<null | string>(window.localStorage.getItem(key))
    const sub = createMediator({})
    //为指定的key订阅变更事件
    sub.subscribe(key,(value:any)=>setValue(value))
    return value
}

```


#### 使用

```typescript 
import { localStorage, useStorage } from './useStorage.ts'
export const App = () => {
  
  const random = useStorage('random')
  useEffect(() => console.log(random), [random])
  return (
    <div
      onClick={() =>
        localStorage.setItem('random', Math.random().toString())
      }
    >random: {random} </div>
  )
}

```
