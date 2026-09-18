# 原型模式（Prototype Pattern）

## 目录

- [应用场景](#应用场景)

JavaScript中的原型继承非常适合原型模式。可以使用原型对象作为其他对象的基础，并在需要时通过克隆来创建新的对象实例。

```javascript 
function PrototypeObject() {}

PrototypeObject.prototype.clone = function () {
  return Object.create(Object.getPrototypeOf(this));
};

// 创建原型对象
const prototypeObj = new PrototypeObject();
prototypeObj.property = 'Prototype Property';

// 克隆对象
const clonedObj = prototypeObj.clone();

console.log(clonedObj.property); // "Prototype Property"


```


### 应用场景

- 大量创建相似对象时的性能优化。
- 原型链继承中的对象复制。
- 动态创建对象的模板。
