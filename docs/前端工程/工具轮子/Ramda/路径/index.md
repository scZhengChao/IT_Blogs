# 路径

## 目录

- [pathOr](#pathOr)
- [modifyPath](#modifyPath)

## [pathOr](https://ramdajs.com/docs/#pathOr "pathOr")

```javascript 
R.pathOr('N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
R.pathOr('N/A', ['a', 'b'], {c: {b: 2}}); //=> "N/A"

```


# modifyPath

使用给定的函数，修改对象中指定路径的值。

如果对象上没有对应的属性，那么这个函数不会被调用，且**对象不会被改变**。 所有的**非基础类型是通过引用****拷贝到****新的对象上**。

```javascript 
const person = {name: 'James', address: { zipCode: '90216' }};
R.modifyPath(['address', 'zipCode'], R.reverse, person); //=> {name: 'James', address: { zipCode: '61209' }}

// Can handle arrays too
const person = {name: 'James', addresses: [{ zipCode: '90216' }]};
R.modifyPath(['addresses', 0, 'zipCode'], R.reverse, person); //=> {name: 'James', addresses: [{ zipCode: '61209' }]}

```


[更新状态](<../../../../前端框架/React/状态管理/Zustand/指南/更新状态/index.md> "更新状态")
