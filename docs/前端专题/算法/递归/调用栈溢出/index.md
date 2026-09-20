# Maximum call stack size exceeded 解决方案

## 目录

- [控制台报错 Maximum call stack size exceeded](#控制台报错-Maximum-call-stack-size-exceeded)
- [为什么JavaScript代码会出现栈溢出？](#为什么JavaScript代码会出现栈溢出)
  - [三种情况](#三种情况)
  - [调用栈](#调用栈)
    - [什么是函数调用](#什么是函数调用)
    - [什么是栈](#什么是栈)
    - [什么是 JavaScript 的调用栈](#什么是-JavaScript-的调用栈)
  - [如何利用好调用栈](#如何利用好调用栈)
    - [1. 如何利用浏览器查看调用栈的信息](#1-如何利用浏览器查看调用栈的信息)
    - [2. 栈溢出（Stack Overflow）](#2-栈溢出Stack-Overflow)
  - [总结](#总结)
  - [思考题](#思考题)
    - [问题](#问题)
    - [参考](#参考)

#### 控制台报错 Maximum call stack size exceeded

> 在js操作，对递归循环操作不当，就会出现该报错。英文意思就是： 超过最大调用堆栈大小

原因

- 调用栈溢出了，检查下自己的代码有没有出现死循环调用，或者大量的递归调用

解决

- 在适当的条件里加 if 判断，停止大量递归无线循环
- 有return 设定跳出循环 或 结束递归

# 为什么JavaScript代码会出现栈溢出？

### 三种情况

**什么样的代码才会在执行之前就进行编译并创建执行上下文？**

1. 当 JavaScript 执行全局代码的时候，会编译全局代码并创建全局执行上下文，而且在整个页面的生存周期内，全局执行上下文只有一份。
2. 当调用一个函数的时候，函数体内的代码会被编译，并创建函数执行上下文，一般情况下，函数执行结束之后，创建的函数执行上下文会被销毁。
3. 当使用 eval 函数的时候，eval 的代码也会被编译，并创建执行上下文。

### 调用栈

栈溢出的错误：

![](https://i-blog.csdnimg.cn/blog_migrate/908945d92812b30f89767463081f18c6.png)

出现这种错误就涉及到了**调用栈**的内容。**调用栈就是用来管理函数调用关系的一种数据结构。因此要讲清楚调用栈，要先弄明白**函数调用和**栈结构**。

#### 什么是函数调用

**函数调用就是运行一个函数，具体使用方式是使用函数名称跟着一对小括号。**

例子：

```javascript 
var a = 2
function add(){
  var b = 10
  return  a+b
}
add()

```


上面例子的全局执行上下文：

![](<../assets/Maximum call stack size exceed/image/image_hfh2XoTj7G.png>)

1. 从全局执行上下文中，取出 add 函数代码。
2. 对 add 函数的这段代码进行编译，并创建该**函数的执行上下文**和**可执行代码**。
3. 执行代码，输出结果。

**完整流程**

![](<../assets/Maximum call stack size exceed/image/image_2-nn5jQThH.png>)

当执行到 add 函数的时候，就有了两个执行上下文

1. 全局执行上下文
2. add 函数的执行上下文

而这些执行上下文是通过一种叫**栈的数据结构来管理**的。

#### 什么是栈

栈就是类似于一端被堵住的单行线，车子类似于栈中的元素，栈中的元素满足**后进先出**的特点。

> 栈容器、入栈、栈满、出栈、空栈

![](<../assets/Maximum call stack size exceed/image/image_PrGAGu5PKX.png>)

#### 什么是 JavaScript 的调用栈

通常把这种用来管理执行上下文的栈称为**执行上下文栈**，又称**调用栈**。

示例：

```javascript 
var a = 2
function add(b,c){
  return b+c
}
function addAll(b,c){
  var d = 10
  result = add(b,c)
  return  a+result+d
}
addAll(3,6)

```


**第一步，创建全局上下文，并将其压入栈底。**

全局执行上下文压栈

![](<../assets/Maximum call stack size exceed/image/image_4GtMeDWFzc.png>)

赋值操作改变执行上下文中的值

![](<../assets/Maximum call stack size exceed/image/image_0k0K61lZaV.png>)

**第二步是调用 addAll 函数。**

执行 addAll 函数时的调用栈

![](<../assets/Maximum call stack size exceed/image/image_fZj-0L7yr_.png>)

**第三步，当执行到 add 函数**

执行 add 函数时的调用栈

![](<../assets/Maximum call stack size exceed/image/image_ehBueUWgv9.png>)

当 add 函数返回时，该函数的执行上下文就会从**栈顶弹出**

![](<../assets/Maximum call stack size exceed/image/image_9eSbrLxM-u.png>)

addAll 的执行上下文也会从栈顶部弹出，此时调用栈中就只剩下全局上下文。

![](<../assets/Maximum call stack size exceed/image/image_bbxvAailTq.png>)

**调用栈是 JavaScript 引擎追踪函数执行的一个机制。**

### 如何利用好调用栈

#### 1. 如何利用浏览器查看调用栈的信息

1. 打开“开发者工具”
2. 点击“Source”标签
3. 选择 JavaScript 代码的页面，然后在第 3 行加上断点，并刷新页面。
4. 你可以看到执行到 add 函数时，执行流程就暂停了
5. 通过右边“call stack”来查看当前的调用栈的情况
6. 栈的最底部是 anonymous，也就是全局的函数入口

![](<../assets/Maximum call stack size exceed/image/image_nGl0gq6vPp.png>)

除了通过断点来查看调用栈，还可以使用 `console.trace()` 来输出当前的函数调用关系

![](https://i-blog.csdnimg.cn/blog_migrate/135c29c01425f6894666ecd345e7a473.png)

#### 2. 栈溢出（Stack Overflow）

**调用栈是有大小的**，当入栈的执行上下文超过一定数目，JavaScript 引擎就会报错，我们把这种错误叫做**栈溢出**。

写递归代码的时候，就很容易出现栈溢出的情况：超过了最大栈调用大小（**Maximum call stack size exceeded**）。

```javascript 
function division(a,b){
    return division(a,b)
}
console.log(division(1,2))

```


![](<../assets/Maximum call stack size exceed/image/image_BVMJJ4KGCS.png>)

原因如下：

1. 首先调用函数 division，并创建执行上下文，压入栈中
2. 这个函数是递归的，并且没有任何终止条件，它会一直创建新的函数执行上下文，并反复将其压入栈中
3. 栈是有容量限制的，超过最大数量后就会出现栈溢出的错误。

**同时这个引发栈溢出的栈大小由于浏览器的厂商、版本各不相同。**

那么怎么知道不同版本的限制大小?

可以在不同的浏览器控制台输入下面的代码

```javascript 
var i = 0;
function inc() {
  i++;
  inc();
}
    
try {
  inc();
}
catch(e) {
  // The StackOverflow sandbox adds one frame that is not being counted by this code
  // Incrementing once manually
  i++;
  console.log('Maximum stack size is', i, 'in your current browser');
}

```


- Internet Explorer
  - [IE6: 1130](<IE6: 1130> "IE6: 1130")
  - [IE7: 2553](<IE7: 2553> "IE7: 2553")
  - [IE8: 1475](<IE8: 1475> "IE8: 1475")
  - [IE9: 20678](<IE9: 20678> "IE9: 20678")
  - [IE10: 20677](<IE10: 20677> "IE10: 20677")
- Mozilla Firefox
  - 3.6: 3000
  - 4.0: 9015
  - 5.0: 9015
  - 6.0: 9015
  - 7.0: 65533
  - 8b3: 63485
  - 17: 50762
  - 18: 52596
  - 19: 52458
  - 42: 281810
- Google Chrome
  - 14: 26177
  - 15: 26168
  - 16: 26166
  - 25: 25090
  - 47: 20878
  - 51: 41753
- Safari
  - 4: 52426
  - 5: 65534
  - 9: 63444
- Opera
  - 10.10: 9999
  - 10.62: 32631
  - 11: 32631
  - 12: 32631
- Edge
  - 87: 13970

### 总结

1. 每调用一个函数，JavaScript 引擎会为其创建执行上下文，并把该执行上下文压入调用栈，然后 JavaScript 引擎开始执行函数代码。
2. 如果在一个函数 A 中调用了另外一个函数 B，那么 JavaScript 引擎会为 B 函数创建执行上下文，并将 B 函数的执行上下文压入栈顶。
3. 当前函数执行完毕后，JavaScript 引擎会将该函数的执行上下文弹出栈。
4. 当分配的调用栈空间被占满时，会引发“堆栈溢出”问题。

### 思考题

#### 问题

**你能优化下这段代码，以解决栈溢出的问题吗？**

执行下面代码：

```javascript 
function runStack (n) {
  if (n === 0) return 100;
  return runStack( n - 2);
}
runStack(50000)

```


![](<../assets/Maximum call stack size exceed/image/image_YdYPYFCsMG.png>)

#### 参考

[**使用es6的蹦床函数解决递归造成的堆栈溢出**](http://t.zoukankan.com/mmykdbc-p-9455826.html "使用es6的蹦床函数解决递归造成的堆栈溢出")

**蹦床函数**：**结合.bind**，使函数调用的时候**是自己的方法，但是确是另一个函数对象，不是本身，这个时候就不会造成内存的泄露，** 发生堆栈溢出了，实现代码如下：

```javascript 
function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}

```


代码实现

```javascript 
function runStack (n) {
  if (n === 0) return 100;
  return runStack.bind(null, n - 2); // 返回自身的一个版本
}
// 蹦床函数，避免递归
function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}
trampoline(runStack(1000000))

```


![](<../assets/Maximum call stack size exceed/image/image_OS6QXE5JQu.png>)
