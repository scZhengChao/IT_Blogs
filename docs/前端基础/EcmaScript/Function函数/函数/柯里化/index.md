# 柯里化

## 目录

- [函数柯里化](#函数柯里化)
  - [1.柯里化](#1柯里化)
    - [方法一](#方法一)
    - [方法二](#方法二)
    - [场景：](#场景)
  - [2.反柯里化](#2反柯里化)
    - [方法：](#方法)
    - [场景](#场景)
    - [通过函数调用生成反柯里化函数](#通过函数调用生成反柯里化函数)

# **函数柯里化**

\*\*          在 ****`JavaScript `****中，函数柯里化是函数式编程的重要思想，也是高阶函数中一个重要的应用，其含义是给****函数分步传递参数****，****每次传递部分参数****，并返回一个更具体的函数接收剩下的参数，这中间可嵌套多层这样的接收部分参数的函数，直至返回最后结果。\*\*

## **1.柯里化**

下面例子中都设计到

**了闭包；递归；的函数思想，延展运算符，高阶函数等技巧**

### **方法一**

```javascript 
function curry(fn){
  if(fn.length === 1) return fn
  const generator = (...args)=>{
    if(args.length === fn.length){
      return fn(...args)
    }else{
      return (...args2)=>{
          return generator(...args,...args2)
      }
    }
  }
  return generator
}

//使用：example
let add = (a,b,c,d)=>a+b+c+d
let curried = curry(add)
console.log(curried(1)(2)(3)(4))
```


### **方法二**

和方法一大概类似 用了call apply等es5的方法，apply执行函数传入数组；call执行函数单个入川

ES5

```javascript 
function currying(func, args) {
  // 形参个数
  var arity = func.length;
  // 上一次传入的参数
  var args = args || [];
  return function() {
      // 将参数转化为数组
      var _args = [].slice.call(arguments);
      // 将上次的参数与当前参数进行组合并修正传参顺序
      Array.prototype.unshift.apply(_args, args);
     // 如果参数不够，返回闭包函数继续收集参数
     if (_args.length < arity) {
        return currying.call(null, func, _args);
      }
      // 参数够了则直接执行被转化的函数
      return func.apply(null, _args);
  }
}
```


ES6

```javascript 
function currying(func, args = []) {
  let arity = func.length;
  return function(..._args) {
    _args.unshift(...args);
    if (_args.length < arity) {
      return currying(func, _args);
    }
    return func(..._args);
  }
}

//使用：example

let add = (a,b,c,d)=>a+b+c+d
let curried = currying(add,[1])
console.log(curried(2)(3)(4))
```


柯里化的一个很大的好处是可以帮助我们基于一个被转换函数，通过**对参数的拆分实现不同功能的函数**，如下面的例子。

### **场景：**

```javascript 
//柯里化通用式应用 —— 普通函数
//被转换函数，用于检测传入的字符串是否符合正则表达式


function checkFun(reg, str) {
  return reg.test(str);
}

// 转换柯里化
const check = currying(checkFun);

//  产生新的功能函数 
const checkPhone = check(/^1[34578]\d{9}$/);
const checkEmail = check(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/);

或者
//柯里化通用式应用 —— 高阶函数
// 被转换函数，按照传入的回调函数对传入的数组进行映射
function mapFun(func, array) {
  return array.map(func);
}

// 转换柯里化
const getNewArray = currying(mapFun);

// 产生新的功能函数
const createPercentArr = getNewArray(item => `${item * 100}%`);
const createDoubleArr = getNewArray(item => item * 2);

// 使用新的功能函数
let arr = [1, 2, 3, 4, 5];
let percentArr = createPercentArr(arr);

// ['100%', '200%', '300%', '400%', '500%',]
let doubleArr = createDoubleArr(arr);

// [2, 4, 6, 8, 10]
```


## **2.反柯里化**

           反柯里化的思想与柯里化正好相反，如果说柯里化的过程是将**函数拆分成功能更具体化的函数**，那反柯里化的作用则在于**扩大函数的适用性，使本来作为特定对象所拥有的功能函数可以被任意对象所使用**。

### 方法：

```javascript 
//反柯里化通用式 ES5

function uncurring(fn) {

  return function() {

    // 取出要执行 fn 方法的对象，同时从 arguments 中删除

    var obj = [].shift.call(arguments);

    return fn.apply(obj, arguments);

  }

}

//反柯里化通用式 ES6

function uncurring(fn) {

  return function(...args) {

    return fn.call(...args);

  }

}
```


### 场景

```javascript 
//反柯里化通用式应用

// 构造函数 F

function F() {}

// 拼接属性值的方法

F.prototype.concatProps = function() {

  let args = Array.from(arguments);

  return args.reduce((prev, next) => `${this[prev]}&${this[next]}`);

}

// 使用 concatProps 的对象

const obj = {

  name: 'Panda',

  age: 16

};

// 使用反柯里化进行转化

const concatProps = uncurring(F.prototype.concatProps);

concatProps(obj, 'name', 'age'); // Panda&16
```


            反柯里化还有另外一个应用，用来代替直接使用 call 和 apply，比如检测数据类型的 Object.prototype.toString 等方法，以往我们使用时是在这个方法后面直接调用 call 更改上下文并传参，如果项目中多处需要对不同的数据类型进行验证是很麻的，常规的解决方案是封装成一个检测数据类型的模块。

```javascript 
//检测数据类型常规方案
function checkType(val) {
  return Object.prototype.toString.call(val);
}
```


       如果需要这样封装的功能很多就麻烦了，代码量也会随之增大，其实我们也可以使用另一种解决方案，就是利用反柯里化通用式将这个函数转换并将返回的函数用变量接收，这样我们只需要封装一个 uncurring 通用式就可以了。

```javascript 
//反柯里化创建检测类型函数

const checkType = uncurring(Object.prototype.toString);

checkType(1); // [object Number]
checkType('hello'); // [object String]

checkType(true); // [object Boolean]

```


### 通过函数调用生成反柯里化函数

             在 JavaScript 我们经常使用面向对象的编程方式，在两个类或构造函数之间建立联系实现继承，如果我们对继承的需求仅仅是希望一个构造函数的实例能够使用另一个构造函数原型上的方法 **，那进行繁琐的继承很浪费，简单的继承父子类的关系又不那么的优雅，还不如之间不存在联系。**

```javascript 
//将反柯里化方法扩展到函数原型
Function.prototype.uncurring = function() {
  var self = this;
  return function() {
     //这里难理解了 self 取代了call函数里的this只想，arguments成了call的第一个入参；
    //而call的第一个入参有取代了原函数的this；
    //等价于：  Function.prototype.call.bind(self)(arguments);
    return Function.prototype.call.apply(self, arguments);
  }
}
```


之前的问题通过上面给函数扩展的 uncurring方法完全得到了解决，比如下面的例子。

```javascript 
//函数应用反柯里化原型方法
// 构造函数
function F() {}
F.prototype.sayHi = function() {
  return "I'm " + this.name + ", " + this.age + " years old.";
}

// 希望 sayHi 方法被任何对象使用
sayHi = F.prototype.sayHi.uncurring();
sayHi({ name: 'Panda', age: 20}); // I'm Panda, 20 years old.
```


          在 Function 的原型对象上扩展的 uncurring 中，难点是理解 Function.prototype.call.apply，我们知道在 call 的源码逻辑中 this 指的是调用它的函数，在 call 内部用第一个参数替换了这个函数中的 this，其余作为形参执行了函数。

           而在 Function.prototype.call.apply 中**apply 的第一个参数更换了 call 中的 this，这个用于更换 this 的就是例子中调用 uncurring 的方法 F.prototype.sayHi**，**所以等同于 F.prototype.sayHi.call， arguments 内的参数会传入 call 中，而 arguments 的第一项正是用于修改 F.prototype.sayHi 中 this 的对象。**
