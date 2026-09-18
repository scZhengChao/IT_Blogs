# reduce

## 目录

- [reduce](#reduce)
  - [api](#api)
  - [示例](#示例)
- [reduceRight](#reduceRight)
- [在React 中的应用](#在React-中的应用)

# **reduce**

## api

```typescript 
array.reduce(function(total, currentValue, currentIndex, arr), initialValue)

total 必需。初始值, 或者计算结束后的返回值。 // 没有传递初始值,就是数组的第一个 ,
currentValue 必需。当前元素。
currentIndex 可选。当前元素的索引。
arr 可选。当前元素所属的数组对象。
initialValue： 可选。传递给函数的初始值。

注意:初始值total必须由initialValue 传进来, 否则自动占据数组第一项,currentValue从第二项开始
```


> 如果数组为空并且没有提供initialValue， 会抛出TypeError 。如果数组仅有一个元素（无论位置如何）并且没有提供initialValue， 或者有提供initialValue但是数组为空，那么此唯一值将被返回并且callback不会被执行。

## 示例

- 累加

```typescript 
var sum = [1,2,3,4,5].reduce((x, y) => x+ y, 10);  // 25

```


- 工厂传送

```typescript 
let add2 = (a)=>{
    return a +2
}
let add5 = (x,y)=>{
    return x + y
}
let add4 = (a)=>{
    return a + 4
}
let mult3 = (b)=>{
    return b +4
}
var test = compose(add4,add5)(1,2); // 7 有最后一个函数的返回值作为上一个函数的参数
console.log(test)

```


- 其他

```typescript 
Array.prototype.selfMap = selfMap

// map
function selfMap(fn,context){
    let arr = Array.prototype.slice.call(this)
    return arr.reduce((pre,item,index,arr)=>{
        return [...pre,fn.call(context,item,index,this)]
    },[])
}

//  filter
function selfFilter(fn,context){
    let arr = Array.prototype.slice.call(this)
    return arr.reduce((pre,item,index,arr)=>{
        return fn.call(context,item,index,this)?[...pre,item]:[...pre]
    },[])
}
```


# reduceRight

`reduceRight() `方法的功能和[reduce()](https://www.runoob.com/jsref/jsref-reduce.html "reduce()") 功能是一样的，不同的是 `reduceRight()` 从数组的**末尾向前**将数组中的数组项做累加。

**注意:** reduce() 对于空数组是不会执行回调函数的。

# 在React 中的应用

我们知道，React 的组件其实**本质上也是一个函数**，那么我们在遇到 `Provider` **嵌套很多**的情况下，也一样可以用本文的思路来解决：

假设我们需要管理一些全局的小状态，Provider 变的越来越多了，有时候会遇到嵌套地狱的情况：

```react tsx 
const StateProviders = ({ children }) => (
  <LogProvider>
    <UserProvider>
      <MenuProvider>
        <AppProvider>
          {children}
        </AppProvider>
      </MenuProvider>
    </UserProvider>
  </LogProvider>
)

function App() {
  return (
    <StateProviders>
      <Main />
    </StateProviders>
  )
}

```


此时我们自己写一个 `composeProvider` 方法：

```react tsx 
function composeProviders(...providers) {
  return ({ children }) =>
    providers.reduce(
      (prev, Provider) => <Provider>{prev}</Provider>,
      children,
    )
}

```


代码就可以简化成这样：

```react tsx 
const StateProviders = composeProviders(
  LogProvider,
  UserProvider,
  MenuProvider,
  AppProvider,
)

function App() {
  return (
    <StateProvider>
      <Main />
    </StateProvider>
  )
}

```
