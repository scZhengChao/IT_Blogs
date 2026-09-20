# 解构

## 目录

- [重复解构对象](#重复解构对象)
- [嵌套对象的解构](#嵌套对象的解构)
- [解构中使用别名](#解构中使用别名)
- [解构时候的重命名及默认值设置](#解构时候的重命名及默认值设置)

## 重复解构对象

一行代码同时获取 **a** 和 **a.b** 。在a和b都要多次用到的情况下，普通人的逻辑就是先解构出 `a` ，再在下一行解构出 `b` 。

```javascript 
const obj = {
  a: {
    b: 1
  },
  c: 2
};

const { a: { b }, a } = obj;

```


## 嵌套对象的解构

```react 
var obj = {
  a: {
    c: 1,
    d: 3
  },
  b: 2
};

var {
  a: {
    c: x,
    d: y
  },
  b: z
} = obj;

console.log(x, y, z);     // 1,3,2
```


## 解构中使用别名

```react 
const object = { number: 10 }  
const { number } = object  
// 使用别名
 const { number: otherNumber } = object
```


# 解构时候的重命名及默认值设置

```typescript 
const obj = {
  a: 1,
  b: 2,
  c: 3
}

const { a: a1, b: b2, c: c3, d: d4 = "default" } = obj

```


通过上面对 `obj` 对象的结构，会得到 `a1`、`b2`、`c3` 和 `d4` 这 4 个变量，同时由于 `obj` 里面没有 `d` 属性，所以 `d4` 会被赋予默认值 `default`。
