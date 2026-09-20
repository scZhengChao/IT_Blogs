# dva-immer(umi）

## 目录

- [最后，为什么 Redux 会这样设计？](#最后为什么-Redux-会这样设计)
- [dva-immer](#dva-immer)

我们在用dva或者用[react](https://so.csdn.net/so/search?q=react\&spm=1001.2101.3001.7020 "react")-redux的时候，在用到reducer的时候是这样写的：

dva中：

```typescript 
state: {
    name:[],
    count:0
},
reducers: {
    add(state){
        return{
            ...state,
            count:state.count+1
        }
    },
    changeName(state,{ payload }){
        return Object.assgin({},state,{
            name:payload
        })
    }
}
```


react-[redux](https://so.csdn.net/so/search?q=redux\&spm=1001.2101.3001.7020 "redux")中：

```typescript 

const counter = (state = 0, action = {}) => {
    switch(action.type) {
      case 'INCREMENT':
          return state + 1;
      case 'DECREMENT':
          return state - 1;
      default: return state;
    }
}
 
export default counter;

```


不知道大家发现一个点了没，**每次都要返回一个新的state，而不是直接改变state**，为什么？？？接下来就做一个简单的分析，想知道为什么就去看一下redux的源码是怎么设计的，我们[打开源码](https://github.com/reduxjs/redux/blob/master/src/combineReducers.ts "打开源码")的191行，可以看到（如下代码）：

核心：

```typescript 
const nextStateForKey = reducer(previousStateForKey, action) // 获取新的state
hasChanged = hasChanged || nextStateForKey !== previousStateForKey //  是否改变的标识，根据【浅比较】新旧state
```


由此可以看出，我们更新view是根据新旧state是否有差异，如果直接更新旧的state，虽然我们state的值改变了，但是它在栈中的地址是没变的，而我们的【浅比较】后发现没改变（state为嵌套引用数据类型，虽然state的值改变了），所以需要返回新的state，这样如果state改变了就更新view，否则就return default state。

我们在这里引出了一个概念：浅比较（个人理解为，基本数据类型直接比较，引用数据类型只比较栈中的地址，跟浅拷贝、深拷贝类似）。

我们再来看一下react-redux中是如何做【浅比较】的，[查看源码](https://github.com/reduxjs/react-redux/blob/master/src/utils/shallowEqual.js "查看源码")，这里直接贴出来网上其他同学写的[注释版代码](https://github.com/xiaohesong/react-redux/blob/master/src/utils/shallowEqual.js "注释版代码")，已经非常详细了，大家去跟着注释理解一下：

我们再学习源码前，首先了解两个知识点：

**1：**[**Object.is**](http://Object.is "Object.is")**()** 我们在使用=== 严格判断的时候，它不会进行类型转换，也就是说如果两个值一样，必须符合类型也一样。**但是，它还是有两种疏漏的情况：**

```typescript 
+0 === -0 // true，但我们期待它返回false
NaN === NaN // false，我们期待它返回true
```


所以，**Object.is修复了=== 这两种判断不符合预期的情况**，源码中的function is(x,y){…}，[可以理解为Object.is](http://xn--Object-vy7ir9by5zg14fcj7b.is "可以理解为Object.is")()的polyfill

**2：hasOwnProperty(prop)**  `hasOwnProperty`这个方法可以用来**检测一个对象是否含有特定的自身属性**，即是用来判断一个属性是定义在对象本身而不是继承自原型链的。

在JavaScript中没有将`hasOwnProperty`设置为关键词，所以就会出现设置`hasOwnProperty`为函数名的情况。

我们在使用的时候就直接只执行了，如何解决呢？直接使用 Object.prototype.hasOwnProperty.call(obj, ‘name’)即可。

我们再看源码（如下）：

```typescript 
const hasOwn = Object.prototype.hasOwnProperty
// 下面就是进行浅比较了, 有不了解的可以提issue, 到时可以写一篇对比的文章。
function is(x, y) {
  // === 严格判断适用于对象和原始类型。但是有个例外，就是NaN和正负0。
  if (x === y) {
    //这个是个例外，为了针对0的不同，譬如 -0 === 0 => true
    // (1 / x) === (1 / y)这个就比较有意思，可以区分正负0, 1 / 0 => Infinity, 1 / -0 => -Infinity
    return x !== 0 || y !== 0 || 1 / x === 1 / y 
  } else {
    // 这个就是针对上面的NaN的情况
    return x !== x && y !== y
  }
}
 
 
export default function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true  // 这个就是实行了Object.is的功能。实行的是SameValue策略。 
  // is方法之后，我们认为他不相等。不相等的情况就是排除了(+-0, NaN)的情况以及可以证明:
  // 原始类型而言： 两个不是同类型或者两个同类型，值不同。
  // 对象类型而言： 两个对象的引用不同。
 
  
  //下面这个就是，如果objA和objB其中有个不是对象或者有一个是null, 那就认为不相等。
  //不是对象，或者是null.我们可以根据上面的排除来猜想是哪些情况:
  //有个不是对象类型或者有个是null,那么我们就直接返回，认为他不同。其主要目的是为了确保两个都是对象，并且不是null。
  if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
    return false
  }
 
  //如果上面没有返回，那么接下来的objA和objB都是对象了。
 
  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)
 
  //两个对象不同，有可能是引用不同，但是里面的内容却是相同的。例如：{a: 'a'} ==~ {a: 'a'}
  //所以先简单粗暴的判断一级的keys是不是相同的长度。，不是那就肯定不相等，就返回false。
  if (keysA.length !== keysB.length) return false
 
  //下面就是判断相同长度的key了
  // 可以发现，遍历的是objA的keysA。
  //首先判断objB是否包含objA的key,没有就返回false。注意这个是采用的hasOwnPrperty来判断，可以应付大部分的情况。
  //如果objA的key也在ObjB的key里，那就继续判断key对应的value，采用is来对比。哦，可以发现，只会对比到第一级。
 
  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) ||
        !is(objA[keysA[i]], objB[keysA[i]])) {
      return false
    }
  }
 
  return true
}
```


# **最后，为什么 Redux 会这样设计？**

> 因为比较两个 javascript 对象中所有的属性是否完全相同，唯一的办法就是深比较，然而，深比较在真实的应用中代码是非常大的，**非常耗性能的，** 需要比较的次数特别多，所以一个有效的解决方案就是做一个规定，当无论发生任何变化时，开发者都要返回一个新的对象，没有变化时，开发者返回旧的对象，这也就是 redux 为什么要把 reducer 设计成纯函数的原因。

# dva-immer

要介绍的主角出场了，就是[dva-immer](https://github.com/dvajs/dva/tree/master/packages/dva-immer "dva-immer")，先说一下使用办法：/config/config.js中先开启

```typescript 
export default {
  ...
  dva:{
    immer:true
  },
}
```


开启它有啥作用呢？根据分析阶段，我们知道了为啥需要返回新的state，但是在工作中能不能这样来返回state呢？（如下）

```typescript 
add(state){
  state.count = state.count+1 
},
changeName(state,{ payload }){
  state.name = [...state.name,payload]
}
```


答案是可以，这也就是我们开启dva-immer的作用，可以简化reducer的写法，好像也更符合我们的下意识（刚接触reducer的同学），我们就可以抛弃之前这样（return{ …state,count:state.count+1 } ）的写法了。

我们看下为啥开启dva-immer就可以了呢，打开[源码](https://github.com/dvajs/dva/blob/master/packages/dva-immer/src/index.js "源码")，其实很少的代码，我们先主要看引入的immer，[immer](https://immerjs.github.io/immer/docs/introduction "immer")是什么呢？

```typescript 
import produce from 'immer';
```


> Immer 是 mobx 的作者写的一个 immutable 库，核心实现是利用 ES6 的 proxy，几乎以最小的成本实现了 js 的不可变数据结构，简单易用、体量小巧、设计巧妙，满足了我们对JS不可变数据结构的需求。

**使用办法，大家看一下官方demo：**

- nextState：修改后的值
- baseState：原始值
- draftState：草案（临时、快照值）

```typescript 
import produce from "immer"
 
const baseState = [
    {
        todo: "Learn typescript",
        done: true
    },
    {
        todo: "Try immer",
        done: false
    }
]
 
const nextState = produce(baseState, draftState => {
    draftState.push({todo: "Tweet about it"})
    draftState[1].done = true
})
```


![](./assets/image/image_lHFhCmV6GK.png)

简单的理解就是，我们通过produce传入baseState，然后用draftState来修改我们的属性值，然后返回最新的值给nextState。（如下图）

**大家还可以直接把immer用到react-redux的reducer中**

原来：

```typescript 
const byId = (state, action) => {
    switch (action.type) {
        case RECEIVE_PRODUCTS:
            return {
                ...state,
                ...action.products.reduce((obj, product) => {
                    obj[product.id] = product
                    return obj
                }, {})
            }
        default:
            return state
    }
}
```


现在：

```typescript 
import produce from "immer"
 
const byId = produce((draft, action) => {
    switch (action.type) {
        case RECEIVE_PRODUCTS:
            action.products.forEach(product => {
                draft[product.id] = product
            })
    }
})
```


注意：default case也可以省略 **，如果state没有改变，默认就会直接返回默认状态。**

**还可以用在setState中**

原来：

```typescript 
this.setState(prevState => ({
        user: {
            ...prevState.user,
            age: prevState.user.age + 1
        }
    }))
```


现在：

```typescript 
this.setState(
        produce(draft => {
            draft.user.age += 1
        })
    )
```
