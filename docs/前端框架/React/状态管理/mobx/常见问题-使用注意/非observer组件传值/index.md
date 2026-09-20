# 如果你非要传递可观察对象到未被observer包裹的组件中

有时有必要**将可观察的数据结构转换回原生的数据结构**。 例如，将可观察对象传入一个无法跟踪可观察对象的 React 组件时，或者想要获取一个不会再被更改的副本时。

要进行浅转换，用常用的 JavaScript 操作就可以做到：

```typescript 
const plainObject = { ...observableObject }
const plainArray = observableArray.slice()
const plainMap = new Map(observableMap)
```


要将**数据树递归地转换为普通对象**，可使用 [toJS](https://www.mobxjs.com/api#tojs "toJS") 工具函数。 对于类，建议实现一个 `toJSON()` 方法，因为这样会被 `JSON.stringify` 识别出来。
