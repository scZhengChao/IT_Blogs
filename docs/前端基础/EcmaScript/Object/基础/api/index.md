# api

## 目录

- [object.is ](#objectis-)
  - [优缺点：](#优缺点)
- [freeze  冻结对象](#freeze-冻结对象)
- [Object.assign() ](#Objectassign-)
  - [基本用法](#基本用法)
  - [只有一个参数：](#只有一个参数)
  - [常见用途：](#常见用途)

# object.is&#x20;

ES5 比较两个值是否相等，只有两个运算符：相等运算符（==）和严格相等运算符（===）。

## 优缺点：

- 前者会自动转换数据类型，
- **NaN不等于自身，以及+0等于-0。**

JavaScript 缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等。&#x20;

```javascript 
 Object.is()//它用来比较两个值是否严格相等，与严格相等运算符（===）的行为基本一致。
Object.is('foo','foo');//true
Object.is({},{});//false

//与===不同的是
+0===-0//true
NaN===NaN//false
Object.is(+0,-0);//false
Object.is(NaN,NaN);//true

//ES5可以通过下面的代码部署Object.is
Object.defineProperty(object,'is',{
  value:function(x,y){
    if(x===y){
      //针对+0不等于-0的情况
      return x!==0||1/x===1/y;
    }
    return x!==x&&y!==y;
  },
  configurable:true,//配置
  enumerable:false,//枚举
  writable:true//可写
})
```


默认情况下，对象都是可以扩展的，即对象可以添加新的属性和方法。使用Object.preventExtensions()、Object.seal()和Object.freeze()方法都可以标记对象为不可扩展。&#x20;

# freeze  冻结对象

```javascript 
Object.freeze(window.onpopstate) 
//这个只能冻结 oppopstate本身 而不能阻止 window.onpopstate 完全被重写  冻结一个对象本身

Object.isFrozen(obj);  // 判断是否被冻结

```


# Object.assign()&#x20;

## 基本用法

Object.assign()方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。

Object.assign()拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false)。&#x20;

属性名为 Symbol 值的属性，也会被Object.assign()拷贝。&#x20;

Object.assign方法总是拷贝一个属性的值，**而不会拷贝它背后的赋值方法或取值方法。（get）**

## 只有一个参数：

- 如果该参数不是对象，则会先转成对象，然后返回。&#x20;
- 由于undefined和null无法转成对象，所以如果它们作为参数，就会报错。

如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。首先，这些参数都会转成对象，如果

无法转成对象，就会跳过。这意味着，如果undefined和null不在首参数，就不会报错。

```javascript 
 let obj = {a: 1};
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true
```


其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。

但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。

```javascript 
 const v1 = 'abc';
const v2 = true;
const v3 = 10;

const obj = Object.assign({}, v1, v2, v3);
console.log(obj); // { "0": "a", "1": "b", "2": "c" }
```


**Object.assign()方法实行的是浅拷贝，而不是深拷贝。**

也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。&#x20;

```javascript 
 //Object.assign()可以用来处理数组，但是会把数组视为对象。 
Object.assign([1, 2, 3], [4, 5])  // [4, 5, 3]
//Object.assign()只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。
const source = {
  get foo() { return 1 }
};
const target = {};
Object.assign(target, source) // { foo: 1 }
```


## **常见用途：**

1. **为对象添加属性**

```javascript 
 class Point {
  constructor(x, y) {
    Object.assign(this, {x, y});
  }
}
//上面方法通过Object.assign()方法，将x属性和y属性添加到Point类的对象实例。
```


1. **为对象添加方法**

```javascript 
 Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {
    ···
  },
  anotherMethod() {
    ···
  }
});

// 等同于下面的写法
SomeClass.prototype.someMethod = function (arg1, arg2) {
  ···
};
SomeClass.prototype.anotherMethod = function () {
  ···
};

//上面代码使用了对象属性的简洁表示法，直接将两个函数放在大括号中，再使用assign()方法添加到SomeClass.prototype之中。
```


1. **克隆对象**

```javascript 
 function clone(origin) {
  return Object.assign({}, origin);
}
// 注意如果origin 里的key 的值是对象或者函数/数组等引用对象；则是浅拷贝：
```


不过，采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。如果想要保持继承链，可以采用下面的代码。&#x20;

```javascript 
 function clone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}

```


1. **合并多个对象**

```javascript 
 //将多个对象合并到某个对象。
const merge = (target, ...sources) => Object.assign(target, ...sources);
//如果希望合并后返回一个新对象，可以改写上面函数，对一个空对象合并。
const merge = (...sources) => Object.assign({}, ...sources);
```


1. **为属性指定默认值**

```javascript 
 // 有很多插件是这种写法
const DEFAULTS = {
  logLevel: 0,
  outputFormat: 'html'
};

function processContent(options) {
  options = Object.assign({}, DEFAULTS, options);
  console.log(options);
  // ...
}
//注意，由于存在浅拷贝的问题，DEFAULTS对象和options对象的所有属性的值，最好都是简单类型，不要指向另一个对象。否则，DEFAULTS对象的该属性很可能不起作用。 
```
