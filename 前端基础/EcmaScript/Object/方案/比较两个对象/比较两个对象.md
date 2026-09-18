# 比较两个对象

当你需要比较两个对象，js的等于只能判断对象的地址是否相同，当地址不相同的时候无法判断两个对象的键值对是否一致。

```javascript 
const isEqual = (...objects) => objects.every(obj => JSON.stringify(obj) === JSON.stringify(objects[0]))
isEqual({name: 'jack'}, {name: 'jack'}) // true
isEqual({name: 'jack'}, {name: 'jack1'}, {name: 'jack'}) // false

```
