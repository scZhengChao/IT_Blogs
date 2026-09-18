# instanceof

- 如果 target 为基本数据类型直接返回 false
- 判断 Fn.prototype 是否在 target 的隐式原型链上

```javascript 
const _instanceof = (target, Fn) => {
if ((typeof target !== 'object' && typeof target !== 'function') || target === null)
returnfalse

let proto = target.__proto__
while (true) {
    if (proto === null) returnfalse
    if (proto === Fn.prototype) returntrue
    proto = proto.__proto__
  }
}
functionA() {}
const a = new A()
console.log(_instanceof(a, A)) // true
console.log(_instanceof(1, A)) // false
```
