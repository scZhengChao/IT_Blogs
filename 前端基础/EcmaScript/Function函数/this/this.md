# this

## 目录

- [this绑定的优先级](#this绑定的优先级)
- [万能函数调用方法](#万能函数调用方法)
- [apply:](#apply)
- [bind:](#bind)
  - [作为构造函数调用](#作为构造函数调用)

**call，bind，apply为了简化，今天都不做类型判断和错误边际处理，只把原理讲清楚。**

### this绑定的优先级

- **call:使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数**
- **this：执行上下文的一个变量。**

有人会说，这个有啥讲的我都会，真的嘛，我们看下面的代码

```typescript 
function a() {
  console.log(this, typeof this, "a");
}
function b() {
  console.log(this, typeof this, "b");
}
a.call.call(b, "b"); // [String: 'b'] object b
a.call.call.call(b, "b"); // [String: 'b'] object b
a.call.call.call.call(b, "b"); // [String: 'b'] object b
```


为什么2，3，4个call的结果一样

- a.call(b)：a被调用
- a.call.call(b)：a.call 被调用
- a.cal.call.call(b)：a.call.call 被调用

而call的函数来源于函数原型上，无论call多少次，其实都是调用一次原型上的call函数

```typescript 
function a() {
  console.log(this, "a");
}
function b() {
  console.log(this, "b");
}

console.log(a.call === Function.prototype.call); // true
console.log(a.call === a.call.call); // true
console.log(a.call === a.call.call.call); // true
```


**一个函数进行 call 调用，等同于在一个对象上执行该函数**

`(a.call).call(b, 'b')`，等于在 b 对象上调用 `a.call（Function.prototype.call）` 函数

```typescript 
b.call("b");
```


为什么this是String{"b"}

- this：非严格模式下，Object包装
- this：严格模式下，任意值（传啥是啥）

# 万能函数调用方法

- `Function.prototype.call.call.bind(Function.prototype.call)`
- 前提是没有锁定this哈

```typescript 
const person = {
  hello() {
    console.log("hello", this.name);
  },
};

const call = Function.prototype.call.call.bind(Function.prototype.call);

call(person.hello, { name: "tom" }); // hello tom
```


# **apply:**

```javascript 
//实现自己的myApply
Function.prototype.myApply = function (context, arg) {
    const fn = Symbol('临时属性')
    context[fn] = this
    context[fn](...arg)
    delete context[fn]
}
const obj2 = {
    a: 1
}
 test.myApply(obj2, [2, 3, 4])
```


# **bind:**

```javascript 
bind不会改变原函数的this指向，只会返回一个新的函数（我们想要的那个this指向），并且不会调用。
但是apply和call会改变原函数的this指向并且直接调用
bind的传参会把原本函数的传参挤到所有参数之后
 Function.prototype.myBind = function(objThis,...params){
    const thisFn = this // 储存原函数 以及函数参数
    //对返回的函数 secondParams 二次传参
    let fToBind = function(...secondParams){
        // 判断 this 是否是 这个函数的实例 ； 也就是 fToBind 是否 通过new 调用
        const isNew = this instanceof fToBind
        const context = isNew ? this : Object(objThis) // new调用就绑定到this上,否则就绑定到传入的objThis上
        return thisFn.call(context, ...params, ...secondParams); // 用call调用源函数绑定this的指向并传递参数,返回执行结果
    }
    fToBind.prototype = Object.create(thisFn.prototype); // 复制源函数的prototype给fToBind
    return fToBind; // 返回拷贝的函数
}
```


## 作为构造函数调用

bind 方法还有一个重要的的特点，**绑定函数也可以使用 new 运算符构造，也就是说还可以将 bind 返回的函数作为构造函数。提供的 this 值会被忽略，但传入的参数仍然生效。**

```typescript 
var name = 'Jack';
var Yve = {
    name: 'Yvette'
};
function person(age, job, gender) {
    console.log(this.name, age, job, gender);
}
var bindYve = person.bind(Yve, 22, 'engineer');
var obj = new bindYve('female');
// undefined 22 'engineer' 'female'
```


我们在全局和 Yve 中都声明了 name 值，\*\*但最后 ****`this.name`**** 的结果依然是 undefind，\*\*说明 bind 方法绑定的 this 失效了，原因在于返回函数 bindYve 被作为构造函数调用了，了解 new 关键字原理的童鞋就会知道，此时的 this 已经指向了实例 obj。

**我们可以用 instanceof 来判断返回函数的原型是否在实例的原型链上。**

```typescript 
var func = function (){
    console.log(this instanceof func);
} 

// 作为普通函数调用
func(); 
// false

// 作为构造函数调用
new func(); 
// true
```


不同的调用方法，函数的 this 指向不同，利用这个特点即可得知返回函数是否作为构造函数调用：

- 作为普通函数调用时，this 指向 window，结果为 false；
- 作为构造函数调用时，this 指向实例，实例的 **proto** 属性指向构造函数的 prototype，结果为 true。
