# 算法类

## 目录

- [math/number](#mathnumber)
  - [求和](#求和)
  - [平均值](#平均值)
- [随机数范围](#随机数范围)
- [洗牌算法随机](#洗牌算法随机)
- [随机生成六位数字验证码](#随机生成六位数字验证码)
- [获取数组交集](#获取数组交集)
- [过滤对象数组](#过滤对象数组)
- [数组乱序](#数组乱序)
- [生成随机颜色](#生成随机颜色)
- [数组对象去重](#数组对象去重)

# math/number

## 求和

```javascript 
export const sum = (arr) => {
  return arr.reduce((pre, cur) => {
    return pre + cur
  })
}
```


## 平均值

```javascript 
export const average = (arr) => {
  return this.sum(arr) / arr.length
}
```


# 随机数范围

```javascript 
export const random = (min, max) => {
  if (arguments.length === 2) {
    return Math.floor(min + Math.random() * ((max + 1) - min))
  } else {
    return null;
  }
}
```


# 洗牌算法随机

```javascript 
export const shuffle = (arr) => {
  var result = [],
  random;
  while (arr.length > 0) {
    random = Math.floor(Math.random() * arr.length);
    result.push(arr[random])
    arr.splice(random, 1)
  }
  return result;
}
```


# 随机生成六位数字验证码

```javascript 
const code = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");

// 942377
```


# 获取数组交集

```javascript 
const similarity = (arr, values) => arr.filter(v => values.includes(v));
similarity([1, 2, 3], [1, 2, 4]); // [1,2]
```


# 过滤对象数组

很好的处理对象数组list的一种方法

```javascript 
const reducedFilter = (data, keys, fn) => data.filter(fn).map(el => keys.reduce((acc, key) => {
    acc[key] = el[key];
    return acc;
}, {}));

const data = [
    {
        id: 1,
        name: 'john',
        age: 24
    },
    {
        id: 2,
        name: 'mike',
        age: 50
    }
];
 let a = reducedFilter(data, ['id', 'name'], item => item.age > 24); // [{ id: 2, name: 'mike'}]
```


# 数组乱序

在使用需要某种程度的随机化的算法时，你会经常发现洗牌数组是一个相当必要的技能。下面的片段以O(n log n)的复杂度对一个数组进行就地洗牌。

```javascript 
const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5) 
// 测试
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(shuffleArray(arr))

```


# 生成随机颜色

你的应用程序是否依赖随机颜色的生成？不用再看了，下面的代码段可以满足你的要求

```javascript 
const generateRandomHexColor = () =>`#${Math.floor(Math.random()* 0xffffff) .toString(16)}`;
console.log(generateRandomHexColor())

```


# 数组对象去重

```javascript 
//reduce的一个很好的用法
const uniqueElementsBy = (arr, fn) => arr.reduce((acc, v) => {
    if (!acc.some(x => fn(v, x))) acc.push(v);
    return acc;
}, []);


uniqueElementsBy([{
    id: 1,
    name: 'Jhon'
}, {
    id: 2,
    name: 'sss'
}, {
    id: 1,
    name: 'Jhon'
}], (a, b) => a.id == b.id)
// [{id: 1, name: 'Jhon'}, {id: 2, name: 'sss'}]
```
