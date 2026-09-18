# koa-compose

## 目录

- [防止多次调用next()](#防止多次调用next)
- [如果所有中间件执行完毕，执行传入的next](#如果所有中间件执行完毕执行传入的next)
- [koa调用](#koa调用)
  - [koa-compose的设计思想](#koa-compose的设计思想)
    - [如果我不调用next()会发生什么？](#如果我不调用next会发生什么)

简化版：[koa-compose 洋葱模型](<koa-compose 洋葱模型.md> "koa-compose 洋葱模型")

源码：

```javascript 
use strict'

/**
 * @param {Array} middleware
 * @return {Function}
 */
const composeSlim = (middleware) => async (ctx, next) => {
  const dispatch = (i) => async () => {
    const fn = i === middleware.length
      ? next
      : middleware[i]
    if (!fn) return
    return await fn(ctx, dispatch(i + 1))
  }
  return dispatch(0)()
}

/** @typedef {import("koa").Middleware} Middleware */

/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {...(Middleware | Middleware[])} middleware
 * @return {Middleware}
 * @api public
 */

const compose = (...middleware) => {
  const funcs = middleware.flat()

  for (const fn of funcs) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  if (process.env.NODE_ENV === 'production') return composeSlim(funcs)

  return async (ctx, next) => {
    const dispatch = async (i) => {
      const fn = i === funcs.length
        ? next
        : funcs[i]
      if (!fn) return

      let nextCalled = false
      let nextResolved = false
      const nextProxy = async () => {
        if (nextCalled) throw Error('next() called multiple times')
        nextCalled = true
        try {
          return await dispatch(i + 1)
        } finally {
          nextResolved = true
        }
      }
      const result = await fn(ctx, nextProxy)
      if (nextCalled && !nextResolved) {
        throw Error(
          'Middleware resolved before downstream.\n\tYou are probably missing an await or return'
        )
      }
      return result
    }
    return dispatch(0)
  }
}

/**
 * Expose compositor.
 */

module.exports = compose
```


#### 防止多次调用`next()`

```typescript 
      let nextCalled = false
      let nextResolved = false
      const nextProxy = async () => {
        if (nextCalled) throw Error('next() called multiple times')
        nextCalled = true
        try {
          return await dispatch(i + 1)
        } finally {
          nextResolved = true
        }
      }

```


#### 如果所有中间件执行完毕，执行传入的`next`

```javascript 
const fn = i === middleware.length
      ? next
      : middleware[i]

```


# koa调用

```javascript 
const compose = require('koa-compose');

class Application {
  constructor() {
    this.middleware = []; // 存储所有用户注册的中间件
  }

  use(fn) {
    this.middleware.push(fn); // 把中间件添加到数组中
  }

  async handleRequest(ctx, fnMiddleware) {
    // 调用组合后的中间件函数
    await fnMiddleware(ctx);
  }

  callback() {
    // 使用 koa-compose 将所有中间件组合成一个函数
    const fn = compose(this.middleware);

    // 返回一个供 HTTP Server 调用的回调函数
    return (req, res) => {
      const ctx = this.createContext(req, res); // 创建 Koa 的上下文对象
      return this.handleRequest(ctx, fn); // 调用组合中间件
    };
  }
}
```


## `koa-compose`的设计思想

`koa-compose`的设计非常精妙，它通过递归和闭包的方式实现了中间件的流程控制，核心思想包括：

1. **递归调用** &#x20;

   使用`dispatch(i)`函数递归地**调用下一个中间件，直到所有中间件执行完毕。**
2. **闭包保存状态** &#x20;

   通过闭包变量`index`记录当前执行到的中间件位置，确保每次调用`next()`都能正确地进入下一个中间件。
3. **Promise 链** &#x20;

   使用`Promise.resolve()`包裹中间件的调用，**使得无论是同步还是异步中间件，都能统一返回 Promise**，支持`async/await`。
4. **防止多次调用**\*\*`next()`\*\* &#x20;

   通过判断`i <= index`来防止用户在中间件中多次调用`next()`，避免重复执行。

### 如果我不调用`next()`会发生什么？

- 如果某个中间件没有调用`next()`，那么**后续的中间件将不会被执行；**
- 这在某些场景下是有用的，比如你**希望某个中间件直接处理请求并返回响应**，而不继续传递下去。

示例：

```javascript 
app.use(async (ctx, next) => {
  if (ctx.path === '/block') {
    ctx.body = 'Blocked!';
    // 不调用 next()，后续中间件不会执行
    return;
  }
  await next(); // 否则继续传递
});
```
