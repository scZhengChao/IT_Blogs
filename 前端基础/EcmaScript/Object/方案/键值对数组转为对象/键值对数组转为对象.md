# 键值对数组转为对象

## 目录

- [fromEntries ](#fromEntries-)
  - [使用场景：](#使用场景)
    - [将 Map 结构转为对象： ](#将-Map-结构转为对象-)
    - [配合URLSearchParams将查询字符串转为对象:](#配合URLSearchParams将查询字符串转为对象)

# fromEntries&#x20;

Object.fromEntries()方法是Object.entries()的逆操作，用于将一个键值对数组转为对象。&#x20;

```javascript 
 Object.fromEntries([
  ['foo', 'bar'],
  ['baz', 42]
])
// { foo: "bar", baz: 42 }
```


## 使用场景：

### 将 Map 结构转为对象：&#x20;

```javascript 
 // 例一
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
]);

Object.fromEntries(entries)
// { foo: "bar", baz: 42 }

// 例二
const map = new Map().set('foo', true).set('bar', false);
Object.fromEntries(map)
// { foo: true, bar: false }
```


### 配合URLSearchParams将查询字符串转为对象:

```javascript 
 Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'))
// { foo: "bar", baz: "qux" }
```
