# jest测试node应用

## 目录

- [使用 Jest 测试 Node.js 应用](#使用-Jest-测试-Nodejs-应用)
  - [安装 Jest](#安装-Jest)
  - [基本配置](#基本配置)
  - [编写测试](#编写测试)
    - [1. 简单的函数测试](#1-简单的函数测试)
    - [2. 异步代码测试](#2-异步代码测试)
    - [3. Mock 函数](#3-Mock-函数)
    - [4. 测试 Express 路由](#4-测试-Express-路由)
  - [运行测试](#运行测试)
  - [高级功能](#高级功能)

# 使用 Jest 测试 Node.js 应用

Jest 是 Facebook 开发的一个流行的 JavaScript 测试框架，非常适合测试 Node.js 应用程序。以下是使用 Jest 测试 Node.js 应用的基本指南。

## 安装 Jest

首先，在你的 Node.js 项目中安装 Jest：

```bash 
npm install --save-dev jest
```


或者在 package.json 中添加 Jest 作为开发依赖后运行`npm install`。

## 基本配置

在 package.json 中添加 Jest 配置：

```json 
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "jest": {
    "testEnvironment": "node",
    "coveragePathIgnorePatterns": [
      "/node_modules/"
    ]
  }
}
```


## 编写测试

### 1. 简单的函数测试

假设有一个`sum.js`文件：

```javascript 
function sum(a, b) {
  return a + b;
}

module.exports = sum;
```


对应的测试文件`sum.test.js`：

```javascript 
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('adds 0 + 0 to equal 0', () => {
  expect(sum(0, 0)).toBe(0);
});
```


### 2. 异步代码测试

对于异步代码，Jest 提供了几种处理方式：

```javascript 
// promise.test.js
const fetchData = require('./fetchData');

test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});

// 或者使用 async/await
test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});
```


### 3. Mock 函数

Jest 可以轻松创建 mock 函数：

```javascript 
// mock.test.js
function forEach(items, callback) {
  for (let item of items) {
    callback(item);
  }
}

test('mock function', () => {
  const mockCallback = jest.fn(x => 42 + x);
  forEach([0, 1], mockCallback);

  // 函数被调用了两次
  expect(mockCallback.mock.calls.length).toBe(2);

  // 第一次调用的第一个参数是 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // 第二次调用的第一个参数是 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // 第一次调用的返回值是 42
  expect(mockCallback.mock.results[0].value).toBe(42);
});
```


### 4. 测试 Express 路由

假设有一个简单的 Express 应用：

```javascript 
// app.js
const express = require('express');
const app = express();

app.get('/user', (req, res) => {
  res.status(200).json({ name: 'John Doe' });
});

module.exports = app;
```


对应的测试文件：

```javascript 
// app.test.js
const request = require('supertest');
const app = require('./app');

describe('GET /user', () => {
  it('responds with json', async () => {
    const response = await request(app)
      .get('/user')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.name).toBe('John Doe');
  });
});
```


## 运行测试

运行所有测试：

```javascript 
npm test
```


**监视模式（文件更改时自动运行测试）：**

```bash 
npm run test:watch
```


生成测试覆盖率报告：

```bash 
npm run test:coverage
```


## 高级功能

1. **Setup 和 Teardown**：

```typescript 
beforeEach(() => {
  // 在每个测试前执行
});

afterEach(() => {
  // 在每个测试后执行
});
```


1. ​**​测试分组​**​：

```typescript 
describe('描述一组测试', () => {
  test('测试1', () => {});
  test('测试2', () => {});
});
```


1. ​**​快照测试​**​：

```javascript 
test('对象匹配', () => {
  const data = { name: 'John', age: 30 };
  expect(data).toMatchSnapshot();
});
```


​**​4. 测试环境变量​**​

```javascript 
// 在测试前设置
process.env.NODE_ENV = 'test';
```


Jest 提供了丰富的功能来测试 Node.js 应用程序，包括异步代码、mock、快照测试等，使其成为 Node.js 开发的强大测试工具。
