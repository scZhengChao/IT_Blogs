# 创建对象

## 目录

- [create](#create)

# create

**`Object.create()`** 方法用于创建一个新对象，***使用现有的对象来作为新创建对象的原型（prototype）***。

```javascript 
Object.create(proto);           
//和{}  相比  没有继承 Object对象上的属性， 
//也就是没有原型链的指向 ；
//创建纯净的对象

let object2 = Object.create({ age: 24 })

let bool = Object.hasOwn(object2, 'age') // false 
//  age在她的原型链上 并不在自己的属性上
```


```typescript 
var obj = Object.create({name: 'johan', age: 23}) // obj 继承了属性name 和 age
var obj2 = Object.create(null) // obj2 不继承任何属性和方法
var obj3 = Object.create(Object.prototype) // 与 {} 和 new Object() 一个意思
var obj4 = Object.create({}, {
    property1: {
        value: true,
        writable: true
    }
})  // 第二个参数与 Object.defineProperties() 一致
```
