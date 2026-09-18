# useDeferredValue

## 目录

- [useDeferredValue 案例参考](#useDeferredValue-案例参考)
  - [你可能遇到的疑惑](#你可能遇到的疑惑)
- [关于 useDeferredValue](#关于-useDeferredValue)
  - [1. 初始化的时候](#1-初始化的时候)
  - [2.使用场景](#2使用场景)
  - [3.单独使用](#3单独使用)

`useDeferredValue`：用于**延迟更新某个值的渲染**，以改善页面的响应性能。它适用于在用户**输入频繁或处理大量数据时**，避免过多的更新操作导致页面卡顿。通过将某个值包装在 `useDeferredValue` 中，React 会**在空闲时间段更新该值**，以保持页面的流畅性。

```javascript 
const deferredText = useDeferredValue(value);
```


- value：要延迟的值。它可以是任何类型。
- deferredText：value 延迟更新的值

**`请先记住 useDeferredValue 几个重要的概念：延迟 可中断的 不紧急的`** !!!

## useDeferredValue 案例参考

我们先看使用 useDeferredValue 前后的差异，再反过来理解 useDeferredValue 。以及他的执行过程和一些注意事项 。

这是一个模拟搜索的案例

```javascript 
import { useState, useDeferredValue, memo } from "react"
const SlowList = memo(({ text }: any)=> {
  console.log("render--")
  let items = [];
  for (let i = 0; i < 250; i++) {
    let startTime = performance.now();
    while (performance.now() - startTime < 1) {
      // 通过循环阻塞来模拟极慢的代码
    }
    items.push(text);
  }

  return (
    <ul>
      {
        items.map((item, index) => {
          return <li key={index}>Text:{item}</li>
        })
      }
    </ul>
  );

});

function App() {
   const [value, setValue] = useState();
   const deferredText = useDeferredValue(value);
  
  const change = (e: any) => {
     setValue(e.target.value)
     console.log("value",value);
    console.log("deferredText",deferredText);
  }

  return (
    <>
      <input type="text" onChange={change} />
      {/* 啥也不传因为 memo，SlowList 并不会执行 <SlowList /> */}
      {/* 使用 useDeferredValue： <SlowList text={deferredText} />  */}
      没有使用 useDeferredValue： <SlowList text={value} />

     </>
  );
}

export default App
```


可以看到啊 我们将 `value` 使用 `useDeferredValue` 延迟渲染后 整个界面的体验就很好了，**当时输入的时 input 实时响应 当你停下时就 li 立马展现你输入的结果。**
这有点像 **防抖** 你也可以这么理解它，**但防抖是设置固定的时间**，而 **useDeferredValue 是等待的空闲的时候，会更自动化一点**。
&#x20;    这就是 useDeferredValue 的优化。 降低（延迟）一个值渲染的优先级，并且它是可中断的。
&#x20;      我们使用 useDeferredValue 将 value 延迟传递给 \<SlowList> 。此时 SlowList 中的 li 更新就会放到最后，**它会让 value 优先渲染 等空闲的时候才会更新 li**

### 你可能遇到的疑惑

在此之前我们要先知道 `useDeferredValue 是降低渲染的优先级` 不是代码执行的优先级。

1. **去掉memo可以吗？**

**不可以 **虽然 deferredText 的值还是延迟的（打印可以看出），但是传递给 SlowList 组件的值**一样时他它也会一直渲染更新**

1. **不使用 useDeferredValue**

如果不使用 useDeferredValue 只有 memo 的话，那当value每次变更时 SlowList 都会执行，每一个变更都会有一个 for 循环的阻塞 所以就会很卡顿

1. **关于案例中打印的一些验证**

在你一直输入的时候你会发现 `deferredText 打印都是相同的值，但是 SlowList 中 render-- 也在打印`。

按理来说 `SlowList 我们已经使用了memo包裹起来了值不变 它这个函数是不会执行的`（你可以打开案列中 `<SlowList>` props 什么都没有的验证下）。是不是很奇怪

其实他不是每次都打印，**阶段性打印**。这就是 useDeferredValue 的特性，他是可`中断的`，如果**存在其他的更新它会让出位置让其他人更新**并返回之前的值

## 关于 useDeferredValue

#### 1. 初始化的时候

```javascript 

function App (){
  const [value, setValue] = useState("");
  const deferredText = useDeferredValue(value);
}

```


刚开始啥也不干的时候他们的值是一样的

#### 2.使用场景

```javascript 
function App (){

  const [value, setValue] = useState();
  const deferredText = useDeferredValue(value);
  
  return (
     <div>
       {value}
       {deferredText}
     </div>
   )
}

```


你会发现这样写没什么变化，他们的值都是一样的。**useDeferredValue 就是为了性能优化而存在的**，你这样写.... 没太大性能消耗体现不出来。多此一举，
要真正体验到useDeferredValue的延迟效果，你可以**将它应用在需要处理大量数据或计算密集型操作的情况下**，如案例中 SlowList 中有一个 延迟循环 一直卡着代码往下走，模拟大量计算。作

#### 3.单独使用

如果我们在单一组件中使用 没有父子概念。（现实是这样想的，但是很显然...）

这样写不仅没有优化**反而十分的卡**因为你这是在当前组件你随意更改一个状态map循环都会走。`deferredText` 似乎需要搭配 `memo` 来使用 ，当然官网还有搭配 `<Suspense>` 来使用。

```javascript 

function App (){

  const [value, setValue] = useState();
  const deferredText = useDeferredValue(value);
  
 const change = (e: any) => {
    setValue(e.target.value);
  }

  return (
     <div>

        <input type="text" onChange={change} />
       
       {
        Array(100).fill("今天不努力明天被抛弃").map((item, index) => {

          console.log("render--")

          let startTime = performance.now();
          while (performance.now() - startTime < 1) {
            // 通过循环阻塞来模拟极慢的代码
          }

          return <li key={index}>{deferredText}</li>
        })
      }

     </div>
   )
}

```
