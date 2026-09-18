# 克隆

## 目录

- [各种数组克隆方法](#各种数组克隆方法)

#### 各种数组克隆方法

```typescript 
const clone = (arr) => arr.slice(0);
const clone = (arr) => [...arr];
const clone = (arr) => Array.from(arr);
const clone = (arr) => arr.map((x) => x);
const clone = (arr) => JSON.parse(JSON.stringify(arr));
const clone = (arr) => arr.concat([]);

```
