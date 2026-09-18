# 如何用代码实现一个简单的“洋葱模型”？

## 目录

- [如何用代码实现一个简单的“洋葱模型”？](#如何用代码实现一个简单的洋葱模型)
  - [示例代码：实现一个简易的洋葱模型中间件系统](#示例代码实现一个简易的洋葱模型中间件系统)
  - [使用示例](#使用示例)
  - [输出结果](#输出结果)
- [洋葱模型的核心要点](#洋葱模型的核心要点)

## 如何用代码实现一个简单的“洋葱模型”？

下面我们用纯 Node.js（不依赖任何框架）来实现一个最简版的“洋葱模型”中间件系统，帮助你理解其核心原理。

### 示例代码：实现一个简易的洋葱模型中间件系统

```typescript 
// 简易版洋葱模型框架
class MiniOnion {
  constructor() {
    this.middlewares = []; // 存储所有的中间件
  }

  // 注册中间件
  use(middleware) {
    this.middlewares.push(middleware);
  }

  // 处理请求的核心方法
  async handleRequest(ctx) {
    // 创建一个执行中间件的函数
    const dispatch = (index) => {
      if (index === this.middlewares.length) {
        return Promise.resolve(); // 所有中间件执行完毕
      }

      const middleware = this.middlewares[index];
      // 执行当前中间件，并传入 ctx 和下一个中间件的调用函数
      return Promise.resolve(middleware(ctx, () => dispatch(index + 1)));
    };

    // 从第一个中间件开始执行
    await dispatch(0);
  }
}
```


### 使用示例

```typescript 
// 创建一个实例
const app = new MiniOnion();

// 定义上下文对象（模拟请求和响应）
const ctx = {
  req: { url: '/hello' },
  res: { body: '', headers: {} },
};

// 注册中间件1
app.use(async (ctx, next) => {
  console.log('Middleware 1 - 进入');
  ctx.res.headers['X-Middleware-1'] = 'true';
  await next(); // 调用下一个中间件
  console.log('Middleware 1 - 返回');
  ctx.res.body += ' -> Middleware1';
});

// 注册中间件2
app.use(async (ctx, next) => {
  console.log('Middleware 2 - 进入');
  ctx.res.headers['X-Middleware-2'] = 'true';
  await next(); // 调用下一个中间件
  console.log('Middleware 2 - 返回');
  ctx.res.body += ' -> Middleware2';
});

// 注册目标处理逻辑（类似路由处理器）
app.use(async (ctx, next) => {
  console.log('目标处理逻辑');
  ctx.res.body = 'Hello, Onion Model!';
  // 注意：这里没有调用 next()，因为这是最后一个处理逻辑
});

// 开始处理请求
app.handleRequest(ctx).then(() => {
  console.log('最终响应:', ctx.res);
});
```


### 输出结果

运行上面的代码后，控制台会输出如下内容：

```javascript 
Middleware 1 - 进入
Middleware 2 - 进入
目标处理逻辑
Middleware 2 - 返回
Middleware 1 - 返回
最终响应: { body: 'Hello, Onion Model! -> Middleware2 -> Middleware1', headers: { 'X-Middleware-1': 'true', 'X-Middleware-2': 'true' } }
```


## 洋葱模型的核心要点

1. **中间件是函数**：每\*\*个中间件是一个接收`ctx`****和****`next`\*\***的异步函数**。
2. \*\*`next()`\*\***的作用**：调用`next()`会进入下一个中间件，**直到所有中间件执行完，再逐层返回。**
3. **中间件可以修改**\*\*`ctx`**：`ctx`是**共享的上下文对象，可以在不同中间件之间传递数据（如请求、响应、状态等）。\*\*
4. **执行顺序**：**先进后出，类似栈（Stack）的数据结构。**
