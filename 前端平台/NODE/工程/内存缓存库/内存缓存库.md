# 内存缓存库

## 目录

- [1. 安装](#1-安装)
- [2. 基本使用](#2-基本使用)
  - [初始化缓存](#初始化缓存)
  - [设置缓存](#设置缓存)
  - [获取缓存](#获取缓存)
  - [删除缓存](#删除缓存)
  - [检查缓存是否存在](#检查缓存是否存在)
- [3. 高级用法](#3-高级用法)
  - [批量操作](#批量操作)
  - [获取缓存并更新 TTL](#获取缓存并更新-TTL)
  - [获取缓存统计信息](#获取缓存统计信息)
  - [监听缓存事件](#监听缓存事件)
- [4.配置选项](#4配置选项)
  - [配置说明](#配置说明)
- [5. 实际应用示例](#5-实际应用示例)
  - [缓存 API 响应](#缓存-API-响应)
  - [缓存数据库查询](#缓存数据库查询)
- [6. 注意事项](#6-注意事项)
- [总结](#总结)

`node-cache` 是一个轻量级的内存缓存库，适用于 Node.js 应用。它支持键值存储、TTL（过期时间）、统计信息等功能。以下是详细的使用方法和配置指南。

***

## **1. 安装**

```bash 
npm install node-cache
# 或
yarn add node-cache
```


## **2. 基本使用**

### **初始化缓存**

```javascript 
const NodeCache = require("node-cache");
const myCache = new NodeCache();
```


### **设置缓存**

```javascript 
// 设置缓存（键，值，TTL 秒）
myCache.set("key", "value", 10); // 10 秒后过期
```


### **获取缓存**

```typescript 
const value = myCache.get("key");
if (value === undefined) {
  console.log("缓存不存在或已过期");
} else {
  console.log("缓存值:", value);
}
```


### **删除缓存**

```javascript 
myCache.del("key"); // 删除单个键
myCache.flushAll();  // 清空所有缓存
```


### **检查缓存是否存在**

```javascript 
const hasKey = myCache.has("key");
console.log(hasKey ? "存在" : "不存在");
```


## **3. 高级用法**

### **批量操作**

```typescript 
// 批量设置
myCache.mset([
  { key: "key1", val: "value1", ttl: 10 },
  { key: "key2", val: "value2" }, // 无 TTL
]);

// 批量获取
const values = myCache.mget(["key1", "key2"]);
console.log(values); // { key1: "value1", key2: "value2" }
```


### **获取缓存并更新 TTL**

```typescript 
const value = myCache.get("key", true); // true 表示刷新 TTL
```


### **获取缓存统计信息**

```typescript 
const stats = myCache.getStats();
console.log(stats);
// 输出示例：
// {
//   hits: 10,    // 命中次数
//   misses: 2,   // 未命中次数
//   keys: 5,     // 当前缓存键数量
//   ksize: 1024, // 键占用内存（字节）
//   vsize: 2048  // 值占用内存（字节）
// }
```


### **监听缓存事件**

```typescript 
myCache.on("set", (key, value) => {
  console.log(`缓存设置: ${key} = ${value}`);
});

myCache.on("del", (key) => {
  console.log(`缓存删除: ${key}`);
});

myCache.on("expired", (key, value) => {
  console.log(`缓存过期: ${key} = ${value}`);
});
```


## 4.**配置选项**

在初始化 `NodeCache` 时，可以传入配置对象：

```typescript 
const myCache = new NodeCache({
  stdTTL: 60,           // 默认 TTL（秒），0 = 永不过期
  checkperiod: 120,      // 定期检查过期缓存的间隔（秒）
  useClones: true,       // 是否克隆存储的值（避免引用问题）
  deleteOnExpire: true,  // 是否自动删除过期缓存
  maxKeys: 1000,        // 最大缓存键数量（-1 = 无限制）
});
```


### **配置说明**

| 选项                 | 类型          | 默认值      | 说明                       |
| ------------------ | ----------- | -------- | ------------------------ |
| \`stdTTL\`         | \`number\`  | \`0\`    | 默认缓存过期时间（秒），\`0\` 表示永不过期 |
| \`checkperiod\`    | \`number\`  | \`600\`  | 自动清理过期缓存的间隔（秒）           |
| \`useClones\`      | \`boolean\` | \`true\` | 是否深拷贝存储的值（避免引用问题）        |
| \`deleteOnExpire\` | \`boolean\` | \`true\` | 是否自动删除过期缓存               |
| \`maxKeys\`        | \`number\`  | \`-1\`   | 最大缓存键数量（\`-1\` 表示无限制）    |

***

## **5. 实际应用示例**

### **缓存 API 响应**

```javascript 
const axios = require("axios");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 60 }); // 缓存 60 秒

async function fetchData(userId) {
  const cacheKey = `user_${userId}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    console.log("从缓存获取数据");
    return cachedData;
  }

  console.log("从 API 获取数据");
  const response = await axios.get(`https://api.example.com/users/${userId}`);
  cache.set(cacheKey, response.data);
  return response.data;
}

// 使用
fetchData(1).then(data => console.log(data));
```


### **缓存数据库查询**

```javascript 
const db = require("./db"); // 假设有一个数据库模块
const cache = new NodeCache({ stdTTL: 30 });

async function getUserById(id) {
  const cacheKey = `user_${id}`;
  const cachedUser = cache.get(cacheKey);

  if (cachedUser) {
    return cachedUser;
  }

  const user = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  if (user) {
    cache.set(cacheKey, user);
  }
  return user;
}
```


## **6. 注意事项**

1. **内存限制**：`node-cache` 是内存缓存，数据不会持久化，重启后丢失。
2. **大对象缓存**：避免缓存过大的对象，可能导致内存占用过高。
3. **引用问题**：**如果 ****`useClones: false`****，修改缓存值会影响原始对象。**
4. **分布式环境**：**`node-cache` 是单进程缓存，多服务器环境下需改用 Redis。**

## **总结**

`node-cache` 是一个简单易用的内存缓存工具，适用于：

- **短期缓存**（如 API 响应、数据库查询）
- **减少重复计算**
- **提升应用性能**

配置灵活，支持 TTL、事件监听和统计信息，适合中小型 Node.js 应用。
