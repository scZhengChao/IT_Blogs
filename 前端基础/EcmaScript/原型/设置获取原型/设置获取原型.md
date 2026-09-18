# 设置获取原型

## 目录

- [setPrototypeOf ](#setPrototypeOf-)
- [getPrototypeOf ](#getPrototypeOf-)

# setPrototypeOf&#x20;

`Object.setPrototypeOf`方法的作用与`__proto__`**相同，用来设置一个对象的原型对象**（`prototype`），返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法。

如果第**一个参数不是对象，会自动转为对象**。但是由于返回的**还是第一个参数，所以这个操作不会产生任何效果**。

```javascript 
 // 格式
Object.setPrototypeOf(object, prototype)
// 用法
const o = Object.setPrototypeOf({}, null);
//该方法等同于下面的函数。

function setPrototypeOf(obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
//下面是一个例子。
let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);

proto.y = 20;
proto.z = 40;

obj.x // 10
obj.y // 20
obj.z // 40

```


# getPrototypeOf&#x20;

该方法与`Object.setPrototypeOf`方法配套，**用于读取一个对象的原型对象。**

```javascript 
function Rectangle() {
  // ...
}
const rec = new Rectangle();

Object.getPrototypeOf(rec) === Rectangle.prototype; // true

Object.setPrototypeOf(rec, Object.prototype);
Object.getPrototypeOf(rec) === Rectangle.prototype; // false

//如果参数不是对象，会被自动转为对象。
//如果参数是undefined或null，它们无法转为对象，所以会报错。
```
