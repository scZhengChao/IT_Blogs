# AsyncLocalStorage

## 目录

- [常用 API 及用法](#常用-API-及用法)
  - [1. 基础使用run](#1-基础使用run)
  - [2. getStore() - 获取当前上下文](#2getStore--获取当前上下文)
  - [3. exit(callback) - 退出上下文](#3exitcallback--退出上下文)
  - [4. 配合 async/await 使用](#4-配合asyncawait使用)
- [实际应用场景](#实际应用场景)
  - [场景 1：请求级日志追踪 (Express/Koa)](#场景-1请求级日志追踪-ExpressKoa)
  - [场景 2：数据库事务管理](#场景-2数据库事务管理)
- [性能优化方案](#性能优化方案)
- [讲解](#讲解)

此类创建通过**异步操作保持一致的存储。**

核心功能：​**​创建异步作用域的上下文存储​​，实现跨异步操作的上下文传递（如请求追踪、用户会话管理）。**

虽然你可以在 `node:async_hooks` 模块之上创建自己的实现，但 `AsyncLocalStorage` 应该是首选，因为它是一种**高性能且内存安全的实现，涉及实现起来并不明显的重要优化。**

以下示例使用 `AsyncLocalStorage` 构建一个简单的日志器，它为传入的 HTTP 请求分配 ID，并将它们包含在每个请求中记录的消息中。

```javascript 
const http = require('node:http');
const { AsyncLocalStorage } = require('node:async_hooks');

const asyncLocalStorage = new AsyncLocalStorage();

function logWithId(msg) {
  const id = asyncLocalStorage.getStore();
  console.log(`${id !== undefined ? id : '-'}:`, msg);
}

let idSeq = 0;
http.createServer((req, res) => {
  asyncLocalStorage.run(idSeq++, () => {
    logWithId('start');
    // Imagine any chain of async operations here
    setImmediate(() => {
      logWithId('finish');
      res.end();
    });
  });
}).listen(8080);

http.get('http://localhost:8080');
http.get('http://localhost:8080');
// Prints:
//   0: start
//   0: finish
//   1: start
//   1: finish
```


run 的第一个**参数是 store，表示要存储的值，第二个参数是回调函数，store 只能在回调函数内访问，** 回调函数内创建的任何异步操作都可以访问该 store。

在这个例子中，我们使用 AsyncLocalStorage 构建了一个简单的 HTTP 请求 traceId，虽然发出了两条请求，但每条请求的 traceId 都是相互独立的，只能在各自的请求中获取到。

### 常用 API 及用法

#### 1. 基础使用run

```javascript 
const { AsyncLocalStorage } = require('async_hooks');
const asyncLocalStorage = new AsyncLocalStorage();

// 设置上下文并执行函数
asyncLocalStorage.run({ traceId: 'req-123' }, () => {
  console.log('Context:', asyncLocalStorage.getStore()); // { traceId: 'req-123' }

  // 嵌套异步操作自动继承上下文
  setTimeout(() => {
    console.log('In timeout:', asyncLocalStorage.getStore()); // 仍可获取上下文
  }, 100);
});
```


#### 2. `getStore()` - 获取当前上下文

```javascript 
// 上下文作用域外返回 undefined
console.log('Outside:', asyncLocalStorage.getStore()); // undefined

// 在 run() 内部获取
asyncLocalStorage.run('Hello', () => {
  console.log('Inside:', asyncLocalStorage.getStore()); // 'Hello'
});
```


#### 3. `exit(callback)` - 退出上下文

```javascript 
asyncLocalStorage.run('A', () => {
  console.log('Before exit:', asyncLocalStorage.getStore()); // 'A'

  asyncLocalStorage.exit(() => {
    console.log('During exit:', asyncLocalStorage.getStore()); // undefined
  });

  console.log('After exit:', asyncLocalStorage.getStore()); // 'A'
});
```


#### 4. 配合 `async/await` 使用

```javascript 
async function processData() {
  const store = asyncLocalStorage.getStore();
  console.log('Processing:', store.traceId);
}

asyncLocalStorage.run({ traceId: 'req-456' }, async () => {
  await processData(); // 输出: Processing: req-456
});
```


### 实际应用场景

#### 场景 1：请求级日志追踪 (Express/Koa)

```javascript 
// middleware.js
const asyncLocalStorage = new AsyncLocalStorage();

export const tracingMiddleware = (req, res, next) => {
  // 为每个请求创建独立上下文
  asyncLocalStorage.run({ traceId: generateUUID() }, () => {
    next();
  });
};

// logger.js
export const logger = {
  log: (message) => {
    const store = asyncLocalStorage.getStore();
    console.log(`[${store.traceId}] ${message}`);
  }
};

// Controller
app.get('/user', (req, res) => {
  logger.log('Fetching user data'); // 自动携带 traceId
});
```


#### 场景 2：数据库事务管理

```typescript 
const dbPool = new Pool();
const asyncLocalStorage = new AsyncLocalStorage();

export const withTransaction = async (callback) => {
  const client = await dbPool.connect();
  try {
    await client.query('BEGIN');
    await asyncLocalStorage.run({ dbClient: client }, callback);
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

// 使用
await withTransaction(async () => {
  const { dbClient } = asyncLocalStorage.getStore();
  await dbClient.query('INSERT INTO users...');
  await dbClient.query('UPDATE accounts...'); // 同一事务
});
```


### 性能优化方案

| 优化点            | 实现方式                                       |
| -------------- | ------------------------------------------ |
| 避免频繁 \`run()\` | 在请求入口初始化上下文                                |
| 减少大对象存储        | 只存必要数据 (如 ID/轻量对象)                         |
| 禁用时跳过          | 用 \`if (asyncLocalStorage.getStore())\` 检查 |

# 讲解

[   https://juejin.cn/post/7360737180392996899?searchId=202512011912438FF1CFD2B156A992716D](https://juejin.cn/post/7360737180392996899?searchId=202512011912438FF1CFD2B156A992716D "   https://juejin.cn/post/7360737180392996899?searchId=202512011912438FF1CFD2B156A992716D")

[理解](IT/前端平台/NODE/核心模块/async_hooks/AsyncLocalStorage/理解/理解.md "理解")
