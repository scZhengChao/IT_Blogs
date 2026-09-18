# 创建

## 目录

- [create和直接声明](#create和直接声明)

# create和直接声明

- 没有继承 Object对象上是的属性；也就是\*\*没有原型链的指向 \*\*
- 创建纯净的对象

第一个参数：原型对象

第二个参数：描述符

```typescript 
var obj = Object.create({name: 'johan', age: 23}) // obj 继承了属性name 和 age
var obj2 = Object.create(null) // obj2 不继承任何属性和方法
var obj3 = Object.create(Object.prototype) // 与 {} 和 new Object() 一个意思
var obj4 = Object.create({}, {
    property1: {
        value: true,
        writable: true
    }
}) // 第二个参数与 Object.defineProperties() 一致
```


```javascript 
Object.prototype._create = function (proto) {
  const Fn = function () { }
  Fn.prototype = proto
  return new Fn()
}
functionA() { }
const obj = Object.create(A)
const obj2 = Object._create(A)
console.log(obj.__proto__ === A) // true
console.log(obj.__proto__ === A) // true

```
