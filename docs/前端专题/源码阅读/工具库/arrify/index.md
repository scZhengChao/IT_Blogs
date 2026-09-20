# arrify

## 目录

- [arrify 的用法](#arrify-的用法)
- [源码解析](#源码解析)
- [重点解析](#重点解析)
- [遍历器](#遍历器)

GitHub 地址：[github.com/sindresorhu…](https://link.juejin.cn/?target=https://github.com/sindresorhus/arrify "github.com/sindresorhu…")

也可以用 `github1s` 访问，速度更快：[https://github1s.com/sindresorhus/arrify/blob/HEAD/index.js](https://github1s.com/sindresorhus/arrify/blob/HEAD/index.js "https://github1s.com/sindresorhus/arrify/blob/HEAD/index.js")

## arrify 的用法

```typescript 
import arrify from 'arrify';

arrify('🦄');
//=> ['🦄']

arrify(['🦄']);
//=> ['🦄']

arrify(new Set(['🦄']));
//=> ['🦄']

arrify(null);
//=> []

arrify(undefined);
//=> []
```


## 源码解析

```typescript 
export default function arrify(value) {
  if (value === null || value === undefined) {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === 'string') {
    return [value];
  }

  if (typeof value[Symbol.iterator] === 'function') {
    return [...value];
  }

  return [value];
}

```


# 重点解析

# 遍历器

它主要是把\*\* ****`Map`****，****`Set`****，****`TypedArray`****，函数的 ****`arguments`**** 对象，****`NodeList`****对象这些类型的数据转换为数组 \*\*，这也是我们在业务中常用的将具有 Iterator 接口的数据结构转换数组的方法！对于对象（`Object`），arrify 函数返回的值是 `[value]`，也就是直接把这个对象放到一个数组中。

**那又为什么不能去掉第三个 if 判断的逻辑呢？**

因为\*\* ****`String`****是具有默认的 Iterator 接口 \*\*，如果把第三个 if 判断去掉了，那就只会走原本的第四个 if 判断逻辑，它会把字符串的每个字符作为数组元素的值，而不是把整个字符串作为数组的第一个元素值。举个例子：

```typescript 
import arrify from 'arrify';
arrify('123');  // ['1', '2', '3']
```


两者返回值截然不同，所以不能去掉第三个 if 判断。不仅不能去掉，而且 `typeof value === 'string'` 的判断必须在 `typeof value[Symbol.iterator] === 'function'` 前面，否则返回值还是同去掉第三个 if 判断的一样。
