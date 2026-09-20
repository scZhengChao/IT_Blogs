# 基本api

## 目录

- [基本用法](#基本用法)
  - [初始化 LocalForage](#初始化-LocalForage)
  - [存储数据](#存储数据)
  - [读取数据](#读取数据)
  - [删除数据](#删除数据)
  - [检查 key 是否存在](#检查-key-是否存在)
  - [获取所有 keys](#获取所有-keys)
- [3. 高级用法](#3-高级用法)
  - [遍历所有数据](#遍历所有数据)
  - [设置存储驱动（IndexedDB / WebSQL / localStorage）](#设置存储驱动IndexedDB--WebSQL--localStorage)
  - [监听存储变化（IndexedDB 支持）](#监听存储变化IndexedDB-支持)

## **基本用法**

### **初始化 LocalForage**

```typescript 
import localforage from 'localforage';

// 设置存储名称（可选，默认是 'localforage'）
localforage.config({
  name: 'myAppStorage',
});
```


### **存储数据**

```javascript 
// 存储字符串
await localforage.setItem('key', 'value');

// 存储对象
await localforage.setItem('user', { name: 'Alice', age: 25 });

// 存储二进制数据（如 Blob、ArrayBuffer）
const blob = new Blob(['Hello, World!'], { type: 'text/plain' });
await localforage.setItem('file', blob);
```


### **读取数据**

```javascript 
// 获取字符串
const value = await localforage.getItem('key');
console.log(value); // 'value'

// 获取对象
const user = await localforage.getItem('user');
console.log(user); // { name: 'Alice', age: 25 }

// 获取二进制数据
const file = await localforage.getItem('file');
console.log(file instanceof Blob); // true
```


### **删除数据**

```javascript 
await localforage.removeItem('key'); // 删除单个 key
await localforage.clear(); // 清空所有数据
```


### **检查 key 是否存在**

```javascript 
const exists = await localforage.keyExists('key');
console.log(exists); // true/false
```


### **获取所有 keys**

```javascript 
const keys = await localforage.keys();
console.log(keys); // ['key', 'user', 'file']
```


## **3. 高级用法**

### **遍历所有数据**

```typescript 
let i = 0;
const keys = await localforage.keys();

while (i < keys.length) {
  const key = keys[i];
  const value = await localforage.getItem(key);
  console.log(key, value);
  i++;
}
```


### **设置存储驱动（IndexedDB / WebSQL / localStorage）**

LocalForage 会自动选择最优存储方式（优先 IndexedDB，其次 WebSQL，最后 localStorage）。 &#x20;
如果需要强制使用某个驱动：

```typescript 
localforage.setDriver(localforage.INDEXEDDB); // 强制使用 IndexedDB
localforage.setDriver(localforage.WEBSQL);   // 强制使用 WebSQL
localforage.setDriver(localforage.LOCALSTORAGE); // 强制使用 localStorage
```


### **监听存储变化（IndexedDB 支持）**

```typescript 
localforage.on('change', (changes) => {
  console.log('Storage changed:', changes);
});
```
