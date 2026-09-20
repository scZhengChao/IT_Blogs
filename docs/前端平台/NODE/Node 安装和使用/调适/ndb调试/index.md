# ndb调试

## 目录

- [1. ndb 简介](#1-ndb-简介)
- [2. 安装 ndb](#2-安装-ndb)
  - [全局安装或作为项目依赖：](#全局安装或作为项目依赖)
- [3. 基本使用](#3-基本使用)
  - [启动调试](#启动调试)
  - [界面概览](#界面概览)
- [4. 核心功能详解](#4-核心功能详解)
  - [4.1 设置断点](#41-设置断点)
  - [4.2 控制执行流程](#42-控制执行流程)
  - [4.3 监控变量](#43-监控变量)
  - [4.4 异步调试](#44-异步调试)
  - [4.5 黑盒脚本（Blackboxing）](#45-黑盒脚本Blackboxing)
- [5. 高级技巧](#5-高级技巧)
  - [5.1 调试子进程](#51-调试子进程)
  - [5.2 远程调试](#52-远程调试)
  - [5.3 性能分析](#53-性能分析)
- [6. 实战示例](#6-实战示例)
  - [场景：调试 Express 路由](#场景调试-Express-路由)
  - [场景：调试异步代码](#场景调试异步代码)
- [7. 常见问题](#7-常见问题)
  - [Q1：ndb 与node --inspect的区别？](#Q1ndb-与node---inspect的区别)
  - [Q2：如何调试 TypeScript？](#Q2如何调试-TypeScript)
- [8. 配置文件（ndb.json）](#8-配置文件ndbjson)
- [总结](#总结)

以下是关于**ndb（Node Debugger）** 的详细使用教程，涵盖安装、核心功能、调试技巧以及实战示例，帮助你高效调试 Node.js 应用。

***

### **1. ndb 简介**

**ndb**是由 Google Chrome Labs 开发的 Node.js 调试工具，基于 Chrome DevTools 提供图形化调试界面，支持：

- **断点调试**（Breakpoints）
- **实时变量监控**（Scope Inspection）
- **异步堆栈追踪**（Async Stack Traces）
- **性能分析**（Profiling）
- **黑盒脚本**（Blackboxing）

### **2. 安装 ndb**

#### **全局安装**或作为项目依赖：

```bash 
npm install -g ndb
npm install --save-dev ndb

```


### **3. 基本使用**

#### **启动调试**

```bash 
ndb server.js          # 直接调试入口文件
ndb npm run start      # 调试 npm 脚本
ndb --inspect-brk app  # 在首行断点暂停
```


#### **界面概览**

启动后会自动打开 Chrome DevTools 风格的调试界面：

- **Sources**：查看和编辑代码，设置断点。
- **Console**：执行任意 Node.js 代码。
- **Debugger**：控制执行流程（继续、单步跳过、单步进入）。
- **Profiler**：分析 CPU/内存性能。

***

### **4. 核心功能详解**

#### **4.1 设置断点**

- **在代码行号左侧点击**：添加/移除断点。
- **条件断点**：右键断点 → 输入条件（如`x > 10`）。

#### **4.2 控制执行流程**

| 按钮/快捷键       | 功能              |
| ------------ | --------------- |
| ▶️ F8        | 继续执行（Continue）  |
| ⏭️ F10       | 单步跳过（Step Over） |
| ⏯️ F11       | 单步进入（Step Into） |
| ⏮️ Shift+F11 | 单步跳出（Step Out）  |
| 🔴 (Pause)   | 手动暂停            |

#### **4.3 监控变量**

- **Scope 面板**：查看当前作用域的变量。
- **Watch 表达式**：手动添加变量监控（如`this.state`）。

#### **4.4 异步调试**

- **Async Stack Traces**：追踪`Promise`/`setTimeout`的调用链。
- **Async Stepping**：支持在`await`语句处暂停。

#### **4.5 黑盒脚本（Blackboxing）**

忽略第三方库的调试：

1. 右键文件 →**Blackbox Script**。
2. 或在`ndb.json`配置：

```json 
{
  "blackbox": ["**/node_modules/**"]
}
```


### **5. 高级技巧**

#### **5.1 调试子进程**

```javascript 
ndb --inspect=9229 child.js
```


在父进程中生成子进程时，添加`--inspect`参数。

#### **5.2 远程调试**

```javascript 
ndb --inspect=0.0.0.0:9229 app.js
```


通过`chrome://inspect`连接远程机器。

#### **5.3 性能分析**

- **CPU Profiling**：记录函数执行时间。
- **Heap Snapshot**：分析内存泄漏。

***

### **6. 实战示例**

#### **场景：调试 Express 路由**

```javascript 
// server.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const data = { id: 1, status: 'ok' }; // 在此行设断点
  res.json(data);
});

app.listen(3000);
```


1. 启动调试：

```javascript 
ndb server.js
```


1. 访问`http://localhost:3000`，触发断点。
2. 在**Scope**面板查看`req`/`res`对象。

#### **场景：调试异步代码**

```javascript 
async function fetchData() {
  const response = await fetch('https://api.example.com');
  const data = await response.json(); // 在此行设断点
  return data;
}
```


- 使用**Async Stepping**逐步执行`await`。

### **7. 常见问题**

#### **Q1：ndb 与**\*\*`node --inspect`\*\***的区别？**

- **ndb**：集成 Chrome DevTools，功能更全（如黑盒、性能分析）。
- **`node --inspect`**：需手动连接 DevTools，功能较基础。

#### **Q2：如何调试 TypeScript？**

1. 使用`ts-node`：

```typescript 
ndb --require ts-node/register src/index.ts
```


1. 确保`sourceMap`已启用（`tsconfig.json`）：

```json 
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```


Q3：如何调试 Jest 测试？

```javascript 
ndb jest --runInBand --watch
```


### **8. 配置文件（ndb.json）**

```json 
{
  "blackbox": ["**/tests/**"],
  "env": {
    "NODE_ENV": "development"
  },
  "skipFiles": ["**/node_modules/**"]
}
```


### **总结**

ndb 是 Node.js 调试的终极工具之一，尤其适合：

- **复杂异步代码**（Promise/Async）
- **性能优化**（CPU/内存分析）
- **大型项目**（黑盒脚本减少干扰）

掌握上述技巧后，你的 Node.js 调试效率将大幅提升！ 🚀

[使用](IT/前端平台/NODE/Node%20安装和使用/调适/ndb调试/使用/使用.md "使用")

[崩溃](./崩溃/index.md "崩溃")
