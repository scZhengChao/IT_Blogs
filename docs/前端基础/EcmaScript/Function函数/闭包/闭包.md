# 闭包

## 目录

- [含义](#含义)
  - [闭包的产生](#闭包的产生)
- [优点：](#优点)
- [特性： ](#特性-)
- [缺点：](#缺点)
- [应用](#应用)
  - [缓存](#缓存)
  - [函数重载](#函数重载)
  - [节流和防抖](#节流和防抖)
  - [IIFE](#IIFE)

# 含义

&#x20;      闭包就是通过作用域的嵌套,触发了系统的垃圾回收装置,是局部变量进化成在自由变量或私有变量的一种环境,是连接函数外部和函数内部的桥梁.让我们可以在函数外改变函数内变量的值,但是函数中的变量会一直保存在内存中,ie中还会导致内存 泄漏.

**闭包：闭包就是函数嵌套时，让局部变量变成自由变量的环境，是一种让局部变量进化的方式。**
是一个环境，能够读取其他函数内部的变量。
本质上，闭包是将函数内部和函数外部连接起来的桥梁。

用处：

1. 读取函数内部的变量；
2. 这些变量的值始终保持在内存中，不会在外层函数调用后被自动清除。

## 闭包的产生

- JavaScript三大特性,而闭包产生的原因也正是因为这些特性:

1. 可以在JavaScript函数内部定义新的函数;
2. 内部函数中访问函数中的定义;
3. 在JavaScript中,函数是一等公民,所以函数中既可以传入一个函数又可以作为参数返回一个函数。

# 优点：

1. 可以将一个**变量长期储存在内存中，用于缓存;**
2. 可以**避免全局变量的污染;**
3. 加强封装性，是实现了对**变量的隐藏和封装,让 ****`JavaScript`**** 也能支持私有变量;**

# 特性：&#x20;

1. :函数套函数；
2. 内部函数可以直接使用外部函数的局部变量或参数；
3. 变量或参数不会被垃圾回收机制回收；

# 缺点：

1. 因为**函数外部引用的变量不会被销毁，所以会导致内存消耗很大**，增加了内存消耗量，影响网页性能出现问题;
2. 而且过**度的使用闭包可能会导致内存泄漏**，或程序加载运行过慢卡顿等问题的出现。所以我们可以在**退出函数之前将不使用的局部变量进行删除;**

# 应用

## 缓存

```javascript 
函数缓存(闭包)   
Memoization 用于优化比较耗时的计算，通过将计算结果缓存到内存中，这样对于同样的输入值，下次只需要中内存中读取结果。
function memoizeFunction(func){
    var cache = Object.create(null);
    return function()
    {
        var key = arguments[0];
        if (cache[key])
        {
            return cache[key];
        }
        else
        {
            var val = func.apply(this, arguments);
            cache[key] = val;
            return val;
        }
    };}


//这个函数式递归+闭包结合
var fibonacci = memoizeFunction(function(n){
    return (n === 0 || n === 1) ? n : fibonacci(n - 1) + fibonacci(n - 2);
});  
console.log(fibonacci(100)); // 输出354224848179262000000
console.log(fibonacci(100)); // 输出354224848179262000000


代码中，第2次计算fibonacci(100)则只需要在内存中直接读取结果。 
(同样:这样的函数必须是纯函数,输出可控,对于相同的输入必须得到相同的输出)
```


## 函数重载

**函数重载(闭包)   纯函数  变态**
所谓函数重载(`method overloading`)，**就是函数名称一样，但是输入输出不一样。或者说，允许某个函数有各种不同输入，根据不同的输入，返回不同的结果。**
凭直觉，**函数重载可以通过if…else或者switch实现，这就不去管它了。（比较low但是最简单的方法）**
jQuery之父John Resig提出了一个非常巧(bian)妙(tai)的方法，**利用了闭包。****从效果上来说，****people对象的find方法允许3种不同的输入:**

- **0个参数时，返回所有人名；**
- **1个参数时，根据firstName查找人名并返回；**
- **2个参数时，根据完整的名称查找人名并返回。**

&#x20;         难点在于，people.find只能绑定一个函数，那它为何可以处理3种不同的输入呢？它不可能同时绑定3个函数find0,find1与find2啊！这里的关键在于old属性。由addMethod函数的调用顺序可知，people.find最终绑定的是find2函数。然而，在绑定find2时，old为find1；同理，绑定find1时，old为find0。3个函数find0,find1与find2就这样通过闭包链接起来了。
根据addMethod的逻辑，**当f.length与arguments.length不匹配时，就会去调用old，直到匹配为止。**

```javascript 
function addMethod(object, name, f){　　
    var old = object[name];　　
    object[name] = function()
    {
        //  f.length为函数定义时的参数个数 
        //  arguments.length为函数调用时的参数个数 　　　　 其实这是闭包加递归
        if (f.length === arguments.length)
        {　　
            return f.apply(this, arguments);　　　　
        }
        else if (typeof old === "function")
        {
            console.log(f)
            return old.apply(this, arguments);　　　　//这里的old为相对于它本身的上一个函数,顺序同addmethod()函数的执行顺序
        }　　
    };
}


// 不传参数时，返回所有name
function find0(){　　
    return this.names;}
// 传一个参数时，返回firstName匹配的name
function find1(firstName){　　
    var result = [];　　    
    for (var i = 0; i < this.names.length; i++)
    {　　　　
        if (this.names[i].indexOf(firstName) === 0)
        {　　　　　　
            result.push(this.names[i]);　　　　
        }　　
    }　　
    return result;
}
// 传两个参数时，返回firstName和lastName都匹配的name
function find2(firstName, lastName){　
    var result = [];　　
    for (var i = 0; i < this.names.length; i++)
    {　　　　
        if (this.names[i] === (firstName + " " + lastName))
        {　　　　　　
            result.push(this.names[i]);　　　　
        }　　
    }　　
    return result;
}
var people = {　　
    names: ["Dean Edwards", "Alex Russell", "Dean Tom"]
};


addMethod(people, "find", find0);  //每执行一次,就是命名了一次私有变量    
addMethod(people, "find", find1);
addMethod(people, "find", find2);


console.log(people.find()); // 输出["Dean Edwards", "Alex Russell", "Dean Tom"]
console.log(people.find("Dean")); // 输出["Dean Edwards", "Dean Tom"]
console.log(people.find("Dean", "Edwards")); // 输出["Dean Edwards"]
```


## 节流和防抖

&#x20;   函数节流和防抖：需要注意的一点：函数的节流和函数的去抖**都是通过减少实际逻辑处理过程的执行**来**提高事件处理函数运行性能的手段**，并没有**实质上减少事件的触发次数。**
&#x20;   防抖：设定一个时间间隔，当某个频繁触发的函数执行一次后，在这个时间间隔内不会再次被触发，如果在此期间尝试触发这个函数，**则时间间隔会重新开始计算（****实际上只是执行了最后一次****）**
&#x20;   节流：**设定一个时间间隔，某个频繁触发的函数，在这个时间间隔内只会执行一次**。也就是说，这个频繁触发的函数会以一个**固定的周期执行。**

```javascript 

防抖:
function debounce(method,delay){
  var timer=null;
   return function(){
        var context=this, args=arguments;
        clearTimeout(timer);
        timer=setTimeout(function(){
            method.apply(context,args);
        },delay);
    }
}
节流:
function throttle(method,duration){
    var  begin=new Date();
    return function(){
        var context=this, args=arguments, current=new Date();
        if(current-begin>=duration){
             method.apply(context,args);
             begin=current;
        }
    }
}
```


## `IIFE`

- 这样明显是不行的,为什么呢?虽然我们拥有了跟多的词法作用域了,每个延迟函数都会将 `IIFE` 在每次迭代中创建的作用域封闭起来。但是该错用域是空的,所以 `IIFE`只是一个什么都没有的空作用域。
  ```typescript 
  for (var i = 0; i <= 5; i++) {
    (function (j) {
      setTimeout(() => {
        console.log(j); // 0 1 2 3 4 5 成功输出
      }, 1000);
    })(i);
  }
  ```

- 在这里我们把 `i` 作为参数传递给 `立即执行函数` ,`j` 就是传进来的参数,这个时候 `立即执行函数` 就有自己的作用域变量 `j` 了,问题就迎刃而解了。这就是闭包的力量。
