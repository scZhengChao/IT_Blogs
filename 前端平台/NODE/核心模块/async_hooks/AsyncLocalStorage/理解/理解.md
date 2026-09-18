# 理解

## 目录

- [AsyncLocalStorage 的核心作用](#AsyncLocalStorage-的核心作用)
- [原理讲解](#原理讲解)
  - [AsyncLocalStorage 的三大核心操作](#AsyncLocalStorage-的三大核心操作)
  - [三、底层原理：异步资源跟踪](#三底层原理异步资源跟踪)
    - [3.1 Node.js 的异步钩子 (async\_hooks)](#31-Nodejs-的异步钩子-async_hooks)
    - [3.2 上下文传播的关键：asyncId 链](#32-上下文传播的关键asyncId-链)
  - [四、实现原理解析](#四实现原理解析)
    - [4.1 数据结构设计](#41-数据结构设计)
    - [4.2 run() 方法的实现](#42-run-方法的实现)
    - [4.3 getStore() 的实现](#43-getStore-的实现)
    - [4.4 异步传播的关键：init 和 before 钩子](#44-异步传播的关键init-和-before-钩子)
    - [实现原理要点：](#实现原理要点)
    - [适用场景：](#适用场景)
    - [选择时机：](#选择时机)
  - [四、具体场景分析](#四具体场景分析)
    - [4.1 Promise 链示例](#41-Promise-链示例)
    - [4.2 setTimeout 示例](#42-setTimeout-示例)

### AsyncLocalStorage 的核心作用

**维护异步调用链的上下文**（如请求跟踪ID、用户身份信息），**解决传统线程存储（thread-local storage）在异步编程中不适用的问题。**

# 原理讲解

### AsyncLocalStorage 的三大核心操作

```javascript 
const storage = new AsyncLocalStorage();

// 1. run: 创建新上下文
storage.run(context, callback);

// 2. getStore: 获取当前上下文
const ctx = storage.getStore();

// 3. exit: 退出上下文
storage.exit(callback);
```


## 三、底层原理：异步资源跟踪

### 3.1 Node.js 的异步钩子 (async\_hooks)

```javascript 
const async_hooks = require('async_hooks');

// 关键生命周期事件
const hooks = {
    init(asyncId, type, triggerAsyncId, resource) {
        // 异步资源创建时调用
    },
    before(asyncId) {
        // 异步回调执行前
    },
    after(asyncId) {
        // 异步回调执行后
    },
    destroy(asyncId) {
        // 异步资源销毁时
    }
};
```


### 3.2 上下文传播的关键：asyncId 链

```markdown 
请求1: asyncId链: 1 → 3 → 5 → 7
请求2: asyncId链: 2 → 4 → 6 → 8

每个异步操作都有自己的asyncId
每个asyncId都有triggerAsyncId指向父级
形成一棵"异步调用树"
```


## 四、实现原理解析

### 4.1 数据结构设计

```javascript 
class SimplifiedAsyncLocalStorage {
    constructor() {
        // 存储所有asyncId到上下文的映射
        this._contextMap = new Map();
        
        // 当前执行的上下文栈
        this._currentContext = null;
        
        // 启用async_hooks跟踪
        this._enableTracking();
    }
    
    _enableTracking() {
        // 初始化async_hooks
        this._asyncHook = async_hooks.createHook({
            init: this._handleInit.bind(this),
            before: this._handleBefore.bind(this),
            after: this._handleAfter.bind(this),
            destroy: this._handleDestroy.bind(this)
        });
        this._asyncHook.enable();
    }
}
```


### 4.2 run() 方法的实现

```javascript 
run(store, callback) {
    // 1. 创建新的上下文
    const previousContext = this._currentContext;
    this._currentContext = { store, parent: previousContext };
    
    // 2. 获取当前asyncId
    const asyncId = async_hooks.executionAsyncId();
    
    // 3. 建立映射：asyncId → 上下文
    this._contextMap.set(asyncId, this._currentContext);
    
    try {
        // 4. 执行回调
        return callback();
    } finally {
        // 5. 恢复之前的上下文
        this._currentContext = previousContext;
    }
}
```


### 4.3 getStore() 的实现

```javascript 
getStore() {
    if (!this._currentContext) {
        return undefined;
    }
    
    // 沿着上下文链向上查找
    let context = this._currentContext;
    while (context) {
        if (context.store !== undefined) {
            return context.store;
        }
        context = context.parent;
    }
    
    return undefined;
}
```


### 4.4 异步传播的关键：init 和 before 钩子

```javascript 
_handleInit(asyncId, type, triggerAsyncId) {
    // 重要：新异步操作继承触发者的上下文
    if (this._contextMap.has(triggerAsyncId)) {
        const parentContext = this._contextMap.get(triggerAsyncId);
        this._contextMap.set(asyncId, parentContext);
    }
}

_handleBefore(asyncId) {
    // 切换当前上下文
    if (this._contextMap.has(asyncId)) {
        const context = this._contextMap.get(asyncId);
        this._currentContext = context;
    }
}

_handleAfter(asyncId) {
    // 恢复上下文
    this._currentContext = null;
}
```


### 实现原理要点：

1. **依赖async\_hooks：跟踪异步操作的生命周期**
2. **asyncId链**：通过triggerAsyncId建立父子关系
3. **上下文传播**：子异步操作继承父级上下文
4. **Map存储**：asyncId到上下文的映射关系
5. **栈式管理**：支持嵌套的上下文环境

### 适用场景：

- 请求级别的状态管理
- 分布式追踪
- 事务管理
- 日志上下文传递
- 用户会话管理

### 选择时机：

- 当需要在异步调用链中传递状态时
- 当不想显式传递上下文参数时
- 当应用有复杂的异步调用关系时

**AsyncLocalStorage 通过 Node.js 底层的异步钩子机制**，巧妙地解决了异步编程中的上下文传递问题，为构建复杂的企业级应用提供了重要支持。

## 四、具体场景分析

### 4.1 Promise 链示例

```javascript 
const storage = new AsyncLocalStorage();

storage.run({ requestId: 'req-123' }, async () => {
    // 当前 asyncId: 1, 存储: { requestId: 'req-123' }
    
    await Promise.resolve().then(() => {
        // init 事件: asyncId: 2, triggerAsyncId: 1
        // 自动继承 asyncId:1 的存储
        console.log(storage.getStore()); // { requestId: 'req-123' }
    });
});
```


### 4.2 setTimeout 示例

```javascript 
storage.run({ userId: 456 }, () => {
    // asyncId: 3
    console.log('Start:', storage.getStore()); // { userId: 456 }
    
    setTimeout(() => {
        // init 事件:
        //   asyncId: 4 (定时器回调的新ID)
        //   triggerAsyncId: 3 (从setTimeout继承)
        // before 事件: asyncId:4 激活
        console.log('Timeout:', storage.getStore()); // { userId: 456 }
        // after 事件: asyncId:4 退出
    }, 100);
    
    console.log('End:', storage.getStore()); // { userId: 456 }
});
```
