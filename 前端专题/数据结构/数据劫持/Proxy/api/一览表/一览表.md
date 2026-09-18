# 一览表

## 目录

- [概述 ](#概述)
- [拦截操作一览](#拦截操作一览)
- [详细介绍](#详细介绍)
  - [get() ](#get-)
    - [get方法可以继承 ](#get方法可以继承-)
    - [第三个参数：](#第三个参数)
  - [set() ](#set)

# 概述 

           `Proxy` 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（`meta programming`），即对编程语言进行编程。&#x20;

`Proxy` 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

`Proxy` 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。&#x20;

`ES6` 原生提供 Proxy 构造函数，用来生成 Proxy 实例。&#x20;

`Proxy`对象使你能够包装目标对象 通过这样可以拦截和重新定义该对象的基本操作。

```javascript 
 var proxy = new Proxy(target, handler);
```


              `Proxy` 对象的所有用法，都是上面这种形式，不同的只是`handler`参数的写法。其中，`new Proxy()`表示生成一个`Proxy`实例，`target`参数表示所要拦截的目标对象，

`handler`参数也是一个对象，用来定制拦截行为。&#x20;

```javascript 
 var handler = {
  get: function(target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + name;
  },

  apply: function(target, thisBinding, args) {
    return args[0];
  },

  construct: function(target, args) {
    return {value: args[1]};
  }
};

var fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);

fproxy(1, 2) // 1
new fproxy(1, 2) // {value: 2}
fproxy.prototype === Object.prototype // true
fproxy.foo === "Hello, foo" // true
```


# 拦截操作一览

- **`get(target, propKey, receiver)`**：拦截对象属性**的读取**，比如`proxy.foo`和`proxy['foo']`。
- **`set(target, propKey, value, receiver)`**：拦截对象属性**的设**置，比如proxy.foo = v或proxy\['foo'] = v，**返回一个布尔值。**
- **`has(target, propKey)`**：拦截\*\*`propKey in proxy`****的操作**，返回一**个布尔值。\*\*
- **`deleteProperty(target, propKey)`**：拦截**delete proxy\[propKey]的操作**，返回**一个布尔值**。
- **`ownKeys(target)`**：拦截`Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`、`for...in`循环，返回一个数组。该方法**返回目标对象所有自身的属性的属性名，而**Object.keys()的返回结果仅**包括目标对象自身的可遍历属性。**
- **`getOwnPropertyDescriptor(target, propKey)`**：拦截**Object.getOwnPropertyDescriptor(proxy, propKey)，**返回**属性的描述对象**。
- **`defineProperty(target, propKey, propDesc)`**`：`拦截**Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。**
- **`preventExtensions(target)`**：**拦截Object.preventExtensions(proxy)，返回一个布尔值。**
- **`getPrototypeOf(target)`**`：`拦截**Object.getPrototypeOf(proxy)，返回一个对象。**
- **`isExtensible(target)`**：拦截**Object.isExtensible(proxy)，返回一个布尔值。**
- **`setPrototypeOf(target, proto)`**：拦截**Object.setPrototypeOf(proxy, proto)，返回一个布尔值。** 如果目标对象是函数，那么还有两种额外操作可以拦截。
- **`apply(target, object, args)`**：拦截 Proxy 实例作为**函数调用的操作**，比如`proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。`
- **`construct(target, args)`**`：`**拦截 Proxy 实例作为构造函数调用的操作，** 比如`new proxy(...args)`。

# 详细介绍

## get()&#x20;

get方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严**格地说，是操作行为所针对的对象**），其中最后一个参数可选。&#x20;

get方法的用法，上文已经有一个例子，下面是另一个拦截读取操作的例子。&#x20;

```javascript 
 var person = {
  name: "张三"
};

var proxy = new Proxy(person, {
  get: function(target, propKey) {
    if (propKey in target) {
      return target[propKey];
    } else {
      throw new ReferenceError("Prop name \"" + propKey + "\" does not exist.");
    }
  }
});

proxy.name // "张三"
proxy.age // 抛出一个错误
//上面代码表示，如果访问目标对象不存在的属性，会抛出一个错误。如果没有这个拦截函数，访问不存在的属性，只会返回undefined。
```


### get方法可以继承&#x20;

```javascript 
 let proto = new Proxy({}, {
  get(target, propertyKey, receiver) {
    console.log('GET ' + propertyKey);
    return target[propertyKey];
  }
});

let obj = Object.create(proto);
obj.foo // "GET foo"
```


```javascript 
 //get拦截，实现数组读取负数的索引
function createArray(...elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey);
      if (index < 0) {
        propKey = String(target.length + index);
      }
      return Reflect.get(target, propKey, receiver);
    }
  };

  let target = [];
  target.push(...elements);
  return new Proxy(target, handler);
}

let arr = createArray('a', 'b', 'c');
arr[-1] // c
```


```javascript 
 //利用 Proxy，可以将读取属性的操作（get），转变为执行某个函数，从而实现属性的链式操作。
var pipe = function (value) {
  var funcStack = [];
  var oproxy = new Proxy({} , {
    get : function (pipeObject, fnName) {
      if (fnName === 'get') {
        return funcStack.reduce(function (val, fn) {
          return fn(val);
        },value);
      }
      funcStack.push(window[fnName]);
      return oproxy;
    }
  });
  return oproxy;
}

var double = n => n * 2;
var pow    = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;

pipe(3).double.pow.reverseInt.get; // 63

```


```javascript 
 //下面的例子则是利用get拦截，实现一个生成各种 DOM 节点的通用函数dom。
const dom = new Proxy({}, {
  get(target, property) {
    return function(attrs = {}, ...children) {
      const el = document.createElement(property);
      for (let prop of Object.keys(attrs)) {
        el.setAttribute(prop, attrs[prop]);
      }
      for (let child of children) {
        if (typeof child === 'string') {
          child = document.createTextNode(child);
        }
        el.appendChild(child);
      }
      return el;
    }
  }
});

const el = dom.div({},
  'Hello, my name is ',
  dom.a({href: '//example.com'}, 'Mark'),
  '. I like:',
  dom.ul({},
    dom.li({}, 'The web'),
    dom.li({}, 'Food'),
    dom.li({}, '…actually that\'s it')
  )
);
document.body.appendChild(el);
```


### 第三个参数：

```javascript 
//下面是一个get方法的第三个参数的例子，它总是指向原始的读操作所在的那个对象，一般情况下就是 Proxy 实例。
const proxy = new Proxy({}, {
  get: function(target, key, receiver) {
    return receiver;
  }
});
proxy.getReceiver === proxy // true


const d = Object.create(proxy);
d.a === d // true

//上面代码中，d对象本身没有a属性，所以读取d.a的时候，会去d的原型proxy对象找。这时，receiver就指向d，代表原始的读操作所在的那个对象。
const proxy = new Proxy({}, {
  get: function(target, key, receiver) {
    return receiver;
  }
});


//如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错。
const target = Object.defineProperties({}, {
  foo: {
    value: 123,
    writable: false,
    configurable: false
  },
});

const handler = {
  get(target, propKey) {
    return 'abc';
  }
};
const proxy = new Proxy(target, handler);
proxy.foo
// TypeError: Invariant check failed


```


## set() 

set方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。&#x20;

```javascript 
 let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }
    // 对于满足条件的 age 属性以及其他属性，直接保存
    obj[prop] = value;
  }
};

let person = new Proxy({}, validator);
person.age = 100;
person.age // 100
person.age = 'young' // 报错
person.age = 300 // 报错
```


有时，我们会在对象上面设置内部属性，属性名的**第一个字符使用下划线开头，表示这些属性不应该被外部使用**

。结合get和set方法，就可以做到防止这些内部属性被外部读写。&#x20;

```javascript 
 //只要读写的属性名的第一个字符是下划线，一律抛错，从而达到禁止读写内部属性的目的。
const handler = {
  get (target, key) {
    invariant(key, 'get');
    return target[key];
  },
  set (target, key, value) {
    invariant(key, 'set');
    target[key] = value;
    return true;
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}
const target = {};
const proxy = new Proxy(target, handler);
proxy._prop
// Error: Invalid attempt to get private "_prop" property
proxy._prop = 'c'
// Error: Invalid attempt to set private "_prop" property

```
