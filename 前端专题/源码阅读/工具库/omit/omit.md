# omit

## 目录

- [源码地址](#源码地址)
- [omit 用法](#omit-用法)
- [源码解析](#源码解析)

## 源码地址

[github.com/benjycui/om…](https://link.juejin.cn/?target=https://github.com/benjycui/omit.js "github.com/benjycui/om…")

## omit 用法

参考 omit.js 包仓库的用例：

```typescript 
var omit = require('omit.js');
omit({ name: 'Benjy', age: 18 }, [ 'name' ]); // => { age: 18 }
```


可见，omit 函数的作用是删除对象的某个属性，并返回删除属性后的对象。

## 源码解析

```typescript 
function omit(obj, fields) {
  // eslint-disable-next-line prefer-object-spread
  const shallowCopy = Object.assign({}, obj);
  for (let i = 0; i < fields.length; i += 1) {
    const key = fields[i];
    delete shallowCopy[key];
  }
  return shallowCopy;
}

export default omit;
```
