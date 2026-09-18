# new Function

## 目录

- [什么是函数](#什么是函数)
  - [函数的定义](#函数的定义)
  - [变量提升](#变量提升)
  - [总结](#总结)

## 什么是函数

一个通俗的说法就是：**函数简单的说就是重复执行的代码**块。函数是这样的一段`JavaScript` 代码，它只定义一次，但可能被执行或调用任意次。

### 函数的定义

- 函数声明式定义 `function student(){}` 这种定义方式，**会将函数声明提升到该函数所在作用域的最开头**，也是就无论你在这个函数的最小作用域的那儿使用这种方式声明的函数，在这个作用域内，你都可以调用这个函数为你所用
- 函数表达式 `var student = function(){}`此方式定义的函数，只能在该作用域中，**这段赋值代码执行之后才能通过fun（）调用函数，** 否则，由于变量声明提升，fun === undefined
- new Function 形式 `var student = new Function(arg1 , arg2 ,arg3 ,…, argN , body)` Function构造函数所有的参数都是字符串类型。**除了最后一个参数, 其余的参数都作为生成函数的参数即形参。这里可以没有参数**。最后一个参数, 表示的是要创建函数的函数体。

### 变量提升

首先，抛开函数，我用一个很简单的例子来说明这个问题啊：

```javascript 
  console.log(foo); // undefined
  var foo = '秦时明月';
  console.log(foo)  // 秦时明月

```


其实上面的代码就是

```javascript 
  var foo;
  console.log(foo);
  foo = '秦时明月';
  console.log(foo);

```


此时，首先foo提前声明，直至到赋值，之前foo的值均为undefined，函数声明也是同样的道理，也就是说，你直接声明个函数

```javascript 
  function foo() {}

```


函数提升，相当于

```javascript 
  var foo;
  foo = function() {};

```


来看个例子吧：

```javascript 
  console.log(foo);  // foo() {console.log(123);}
  console.log(foo());//undefined  为啥是undefined下面我会说
  var foo = 456;
  function foo() {
    console.log(123);//123
  }
  console.log(foo); //456
  foo = 789;
  console.log(foo);//789
  console.log(foo());// error

```


来，咱们分析一下执行结果啊，第一句打印的结果是foo这个函数体，咱们可以看出 梳理一下js的执行顺序，上述代码等同于等于：

```javascript 
  var foo;                           // (0)   声明foo,并赋值为undefined
  foo = function() {                 // (1-1) 将一个函数赋值给foo
    console.log(123);                //（2-1） 执行函数，打印123
  }
  console.log(foo);                  //（1-2） foo此时为函数体的引用
  console.log(foo());                //（2-2）首先执行foo()函数，进入（2-1），执行完毕后，函数未有返回体即return，故打印undefined
  foo = 456;                         //（3）再次给foo重新复制一个基本数据类型的456
  console.log(foo);                  // (4)打印出456
  // 再次赋值
  foo = 789                          // (5)又再一次给foo重新复制一个基本数据类型的789
  console.log(foo);                  // (6)打印出789
  console.log(foo());                // (7)此时foo非函数体引用，故不能使用函数调用方法，故报错 foo is not a function

```


在分析一个函数的执行顺序：

```javascript 
  console.log(person)
  console.log(fun)
  var person = '乐鸣'
  console.log(person)

  function fun () {
      console.log(person)
      var person = '秦时明月'
      console.log(person)
  }
  fun()
  console.log(person)
```


等同于

```javascript 
  var fun;
  fun = function() {
    console.log(person)
    var person = '秦时明月'
    console.log(person)
  };
  console.log(person);   // undefined
  console.log(fun);     // 函数体function(){...}
  var person = '清风';
  console.log(person);  // 清风
  fun();               // 执行fun函数   // undefined // 秦时明月
  console.log(person); // 清风

```


咱们可以看到，为啥类似于这样一个函数

```javascript 
  var person = '清风明月';
  function fun(){
    console.log(person);
    var person = '秦时明月';
    console.log(person);
  }

```


打印出来第一个`person`是个`undefined`呢，其实这有牵涉到函数的作用域了，根据犀牛书中说道：
代码在执行时，首先会检查`person`**是否为函数私有变量，如果是**，则**停止查找全局变量中的**`person`，并且该函数中的`person`仅仅在函数体中生效，所以当检测到`person`为`fun`的私有变量是，如果前置，则直接返回`undefined`也就理所当然了。

### 总结

- 第一种和第二种函数的定义的方式其实是第三种`new Function` 的语法糖，当我们定义函数时候都会通过 new Function 来创建一个函数，只是前两种为我们进行了封装，我们看不见了而已，js 中任意函数都是`Function` 的实例。
- `ECMAScript` 定义的 函数实际上是功能完整的对象。
- **函数提升优先级高于变量提升，且不会被同名变量声明时覆盖**，**但是会被变量赋值后覆盖，** 即函数声明变量`init`时，**优先级高于其他变量，并置于作用域最顶**
- **函数私有变量优先级高于全局变量，并且函数私有变量仅在该函数体中有效，一般不影响全局作用域**
