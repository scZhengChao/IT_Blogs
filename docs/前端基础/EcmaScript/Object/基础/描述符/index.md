# 描述符

## 目录

- [getOwnPropertyDescriptor](#getOwnPropertyDescriptor)
- [getOwnPropertyDescriptors](#getOwnPropertyDescriptors)
  - [实现：](#实现)
  - [对象继承：](#对象继承)

# getOwnPropertyDescriptor

获取属性的描述对象

```javascript 
 Object.getOwnPropertyDescriptor(obj,key)
//对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。 
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }

//描述对象的enumerable属性，称为“可枚举性”，如果该属性为false，就表示某些操作会忽略当前属性。
```


另外，ES6 规定，所有 Class 的原型的方法都是不可枚举的。

# getOwnPropertyDescriptors

ES5 的`Object.getOwnPropertyDescriptor()`方法会返回**某个对象属性的描述对象**（

```javascript 
 const obj = {
  foo: 123,
  get bar() { return 'abc' }
};

Object.getOwnPropertyDescriptors(obj)
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: get bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }
```


## 实现：

```javascript 
 function getOwnPropertyDescriptors(obj) {
  const result = {};
  for (let key of Reflect.ownKeys(obj)) {
    result[key] = Object.getOwnPropertyDescriptor(obj, key);
  }
  return result;
}
```


解决Object.assign() 不能拷贝赋值方法的问题：

```javascript 
 //这时，Object.getOwnPropertyDescriptors()方法配合Object.defineProperties()方法，就可以实现正确拷贝。
const source = {
  set foo(value) {
    console.log(value);
  }
};

const target2 = {};
Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
Object.getOwnPropertyDescriptor(target2, 'foo')
// { get: undefined,
//   set: [Function: set foo],
//   enumerable: true,
//   configurable: true }
```


## 对象继承：

```javascript 
 const obj = {
  __proto__: prot,
  foo: 123,
};

//或者

const obj = Object.create(prot);
obj.foo = 123;

// 或者

const obj = Object.assign(
  Object.create(prot),
  {
    foo: 123,
  }
);

//getOwnPropertyDescriptors
const obj = Object.create(
  prot,
  Object.getOwnPropertyDescriptors({
    foo: 123,
  })
);
```
