# prototype 和\_\_proto\_\_

## 目录

- [protoType 和 \_\_proto\_\_](#protoType-和-__proto__)
  - [\_\_proto\_\_​](#__proto__)
  - [prototype](#prototype)
- [class中的箭头函数 ](#class中的箭头函数)

[ 轻松理解 JS 中的面向对象，顺便搞懂 prototype 和 \_\_proto\_\_ 这篇文章主要讲一下JS中面向对象以及 \_\_proto\_\_，ptototype和construcator，这几个概念都是相关的，所以一起讲了。 https://mp.weixin.qq.com/s/o6L-NOMDsaaSI3uyCyHMrA](https://mp.weixin.qq.com/s/o6L-NOMDsaaSI3uyCyHMrA " 轻松理解 JS 中的面向对象，顺便搞懂 prototype 和 __proto__ 这篇文章主要讲一下JS中面向对象以及 __proto__，ptototype和construcator，这几个概念都是相关的，所以一起讲了。 https://mp.weixin.qq.com/s/o6L-NOMDsaaSI3uyCyHMrA")

# protoType 和 \_\_proto\_\_

## \_\_**proto**\_\_

`__proto__`属性是**对象独有**的; 而在**js里万物皆为对象**，包括`function`，所以`function`也具有` __proto__` 属性。

`__proto__`这个属性指向**的是对象的构造函数。** 函数的\_\_proto\_\_ 就是Function.prototype

其实，`__proto__`的作用简单来说就**是继承。** 其实看到了一条原型链

a的构造函数是数组，但数组的方法里没有valueOf属性，那为什么a.valueOf不会报错呢？

是`__proto__`帮我们解决了问题。**`__proto__`****的作用就是指向它的原型对象**，也就是通**俗来说的父对象**。当我们**访问一个对象的属性时，****对象内没有这个属性，那么就会访问****`__proto__`****指向的父对象，若父对象也没有则会继续向上查找，直到顶端****`null`**。这就是原型链。

## prototype

`prototype`是**函数和class特有的属性**

它是**从函数指向一个对象**，它的涵义是**函数的原型对象**。也就是这个**函数所创建出来的实例的原型对象**。

- 所以\*\*只有函数 和 ****`class`****类    既有****`prototype`****   又有 \*\***`__proto__`** (可以被`new`，当`new` 的时候会把 **实例原型链的指向**  为 **类或者函数的原型对象** 上
- **对象和实例时没有**\*\*`prototype`只有 \*\*​**`__proto__`**

`Father.prototype = {} `

这个只能在new 之前设置 （**new 的时候 实例会把原型链 指向的原型对象 为 类或者函数的原型对象上）**

Father.prototype.a = {}   仅仅设置原型对象上的属性

**如果你设置了:Father.prototype = {}则实例的原型链 指向的对象 则不再时 类或者函数的 原型对象了: 谨记**

```javascript 
console.log(Father.prototype === father.__proto__)    //false    
```


**记住函数的prototype 和 \_\_proto\_\_ 是同一个东西如果他不是同一个东西了；你就需要注意了**

**例子一：（这是一个经典很好的例子）**

```javascript 
 var father1 = {
    name:'john'
}
var father2 = {
    name:'tom'
    age:20
}
var Son = function(){}     //类上面的prototype的所有声明会提前的,他会直接找到最后的prototype申明,类似set,所以所有的Son,prototype都是全等的.且既有prototype又有__proto__
console.dir(Son)  // 直接找到最后的tom
Son.prototype = father1;


var son1 = new Son(); //son1上只有__proto__ ,实例对象是唯一的.
console.dir(son1)  
alert(son1.name)  //找的__protp__,john
Son.prototype.age = 20; //这种既可以修改类上的也可以修改实例上的
Son.prototype = father2; //这种只能修改类上的
alert(son1.name) //实例上的 john
son1.name = 'tom'
alert(son1.name) //实例上的 tom
console.dir(Son)
alert(Son.name)  //这个地方实际上是函数名  Son  并不会找到Son.prototype.name (tom)
console.log(Son.age)  // undefine  并不会往下层找
console.dir(Son)
alert(son1.age) //实例上的age ==20

例子二：
    function test() {
        this.a = 10
    }
    test.prototype.a = 20
    let t = new test()
    console.dir(test)
    console.log(test.a)
    console.log(typeof t)
    console.log(t.a)


```


# \*\*class中的箭头函数 \*\*​

\*\*   this指向定义时的所在的对象 而不是使用时的对象\*\*​

**this 永远指向实例 且不在是实例的prototype 上 而是在实例对象上 （commit 和 a 平行）**

```javascript 
 
    class Father{
        constructor(){
            this.a = 10
        }
       
        commit=()=>{  // ==》 this.commit = f  （箭头函数 的指向永远指向定义时的对象）
            console.log(this)
            console.log(this.a)
        }
    }
    // 如果不是箭头函数则是指向 使用时的对象
    // let {commit} = new Father()
    // commit()  undefined
    let n = new Father()
    console.log(n)
    n.commit()
```
