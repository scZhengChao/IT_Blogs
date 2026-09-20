# 并发冲突/竞态问题

## 目录

- [\[What\]什么是竞态问题](#What什么是竞态问题)
- [\[Why\]为什么会出现竞态问题](#Why为什么会出现竞态问题)
- [\[How\]如何解决竞态问题](#How如何解决竞态问题)
- [方案一](#方案一)
- [方案二](#方案二)
- [方案三](#方案三)
- [方案四](#方案四)
- [方案五](#方案五)
  - [加锁](#加锁)
  - [取消过期请求](#取消过期请求)
  - [忽略过期请求](#忽略过期请求)
- [总结](#总结)

# \[What]什么是竞态问题

它旨在描述一个系统或者进程的输出 依赖于 不受控制的事件执行顺序。这个词语来源于两个信号彼此竞争、影响谁先输出

# \[Why]为什么会出现竞态问题

具体到前端开发中，竞态问题出现的原因是：**我们无法保证异步请求的完成顺序 严格等于它们的开始顺序**

举个例子：用户在搜索框输入关键词进行搜索，若短时间内连续键入两次，第二次的搜索结果比第一次的先返回

在开发者没有实现并发控制的前提下，最终展示的就是第一次搜索的结果，不符合用户的预期

# \[How]如何解决竞态问题

# 方案一

利用[saga](<../../../../前端框架/React/react 状态管理/saga/index.md> "saga") 的 `takeLatest`

# 方案二

[处理竞态问题](../../../../前端框架/React/生态/hooks/精读hooks/useEffect/处理竞态问题/index.md "处理竞态问题") 利用useEffect；react的快照特性 （这个方案只是抛弃了返回）

# 方案三

防抖；闭包等；

# 方案四

利用`ahooks`的`useRequest`；帮你处理了这个问题

# 方案五

[使用 axios 拦截器解决「 前端并发冲突 」 问题](<../../../../前端工程/数据通信/axios/使用 axios 拦截器解决「 前端并发冲突 」 问题/index.md> "使用 axios 拦截器解决「 前端并发冲突 」 问题") ；统一封装取消请求函数调用

## 加锁

1. 给触发元素加锁

维护loading状态，设置按钮在loading=true时禁用

```javascript 
function App() {
  const [loading, setLoading] = useState(false)
  
  // 发送异步请求
  async function getData() {
    setLoading(true)
    const resp = await axios.get('/xxx')
    setLoading(false)
  }
  
  function handleClick() {
    getData()
  }
  
  return (
    <button disabled={loading} onClick={handleClick}>发送请求</div>
  )
}
```


1. 给异步请求函数加锁

使用[ahooks的useLockFn](https://link.juejin.cn/?target=https://ahooks.js.org/zh-CN/hooks/use-lock-fn "ahooks的useLockFn")包裹异步请求函数，在函数正在执行时，再调用函数就会直接return

```javascript 
import { useLockFn } from 'ahooks'

function App() {  
  // 发送异步请求
  const getData = useLockFn(async () => {
    const resp = await axios.get('/xxx')
  })
  
  function handleClick() {
    getData()
  }
  
  return (
    <button onClick={handleClick}>发送请求</div>
  )
}

```


## 取消过期请求

在发起新的请求之前，取消正在进行的请求

1. 使用AbortController

[AbortController](https://link.juejin.cn?target=https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController/AbortController "AbortController")是浏览器内置的API，用于构造一个controller实例

> 0.22.0）都已支持通过AbortController取消请求

使用方法也很简单：将`controller.signal`传入请求函数中，将signal与请求关联起来，在需要的时候调用`controller.abort()`去取消这个请求

```javascript 
const controller = new AbortController();

axios.get('/foo/bar', {
   signal: controller.signal
}).then(function(response) {
   //...
});

// 取消请求
controller.abort()

```


我们也可以将生成controller实例的逻辑封装成hook，简化使用，详见[如何使用AbortController取消请求 - 掘金](https://juejin.cn/post/7355800792074469416 "如何使用AbortController取消请求 - 掘金")

```javascript 
import { useUnmount } from 'ahooks';
import { useRef } from 'react';

export function useAbortController() {
  const controller = useRef<AbortController>(new AbortController());

  useUnmount(() => {
    controller.current.abort();
  });

  return {
    signal: controller.current.signal,
    abort: controller.current.abort,
  };
}

```


1. 使用第三方库[awesome-imperative-promise](https://link.juejin.cn?target=https://github.com/slorber/awesome-imperative-promise "awesome-imperative-promise")

awesome-imperative-promise实现了指令式的promise，支持在promise外部手动调用resolve/reject/cancal等指令

我们可以在每次调用请求函数前，先调用一次cancel方法取消正在进行的请求

```javascript 
import { createImperativePromise } from 'awesome-imperative-promise';

function App() {  
  // 发送异步请求
  const getData = async () => {
    const resp = await axios.get('/xxx')
  }
  
  const { cancel } = createImperativePromise(getData)
  
  function handleClick() {
    cancel()
    getData()
  }
  
  return (
    <button onClick={handleClick}>发送请求</div>
  )
}


```


## 忽略过期请求

允许多个请求同时进行，但只处理最后发起的请求的结果

实现思路是：

- 利用变量latest记录最新一次请求的时间戳
- 在发出请求时，使用当前时间戳标记这次请求的id
- 在请求结束后，当且仅当id取值与latest相等时，才更新数据/视图

```javascript 
import dayjs from 'dayjs'

function App() {  
  const latest = useRef<string>('')
  
  // 发送异步请求
  const getData = async () => {
    // 当前时间戳（毫秒）
    const id = String(dayjs().unix() * 1000)
    latest.current = id
    const resp = await axios.get('/xxx')
    if (id === latest.current) {
      // 更新数据/视图
    }
  }
  
  function handleClick() {
    getData()
  }
  
  return (
    <button onClick={handleClick}>发送请求</div>
  )
}

```


# 总结

在前端常见的搜索、分页切换等场景中，由于**我们无法保证异步请求的完成顺序 严格等于它们的开始顺序**，容易出现竞态问题、导致页面展示的内容不符合预期

要解决竞态问题，可以通过加锁、取消过期请求 或 忽略过期请求的方式

- 加锁：在请求完成前、不允许发出新的请求
  - 优点：实现简单直接
  - 缺点：阻塞用户操作，可能造成用户等待时间较长
- 取消过期请求：在发起新的请求前，取消正在进行的请求
  - 优点：如果请求被取消时还没有到达服务端，可以减轻服务端的压力
  - 缺点：依赖API或者第三方库
- 忽略过期请求：允许多个请求同时进行，但只处理最后发起的请求的结果
  - 优点：实现更通用，不依赖API或第三方库
  - 缺点：如果短时间内多次触发，可能造成服务端处理压力较大
