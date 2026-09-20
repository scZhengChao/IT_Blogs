# super

## 目录

- [super关键字](#super关键字)
- [用法：](#用法)
  - [函数：](#函数)
  - [对象](#对象)
    - [普通方法](#普通方法)
    - [原型 prototype 上的属性和方法不可以通过 super 调用](#原型-prototype-上的属性和方法不可以通过-super-调用)
    - [静态方法](#静态方法)
  - [任意对象的 super](#任意对象的-super)
  - [显示的指定super](#显示的指定super)

# ***super关键字***

- **super 关键字表示父类的构造函数**,
- 用来**继承父类的this对象**,
- 因为**子类没有自己this对象,而是继承父类的this对象**,然后**对其加工。**

# 用法：

\*\* 既可以当做函数使用,也可以当做对象使用：\*\* ​

## **函数：**

- super当做函数使用时,表示父类的构造函数,子类的构造函数必须执行一次super函数
- super() 只能在子类的构造函数之中，用在其他地方就会报错。

```javascript 
 class A {}
class B extends A {
 constructor() {
  super(); //ES6 要求，子类的构造函数必须执行一次super函数。
 }
}
class A {
 constructor() {
  console.log(new.target.name); //new.target指向当前正在执行的函数
 }
}
class B extends A {
 constructor() {
  super();
 }
}
new A() // A
new B() // B
//可以看到，在super()执行时，它指向的是子类B的构造函数，而不是父类A的构造函数。也就是说，super()内部的this指向的是B。
```


**注意，super虽然代表了父****类A的构造函数，但是返回的是子类B****的实例，即super内部的this指的是B，因此super()在这里相当于A.prototype.constructor.call(this)。**

## 对象

- 在普通方法中，**指向父类的原型对象；super  ==>    Person.prototype**
- 在静态方法中，**指向父类：super ===> Person**
- 赋值：**指向子类this：super===>this**
- 读取：**指向父类的原型对象；super  ==>    Person.prototype**

### 普通方法

```javascript 
 class A {
    c() {
        return 2;
    } 
}
class B extends A {
    constructor() {
        super();
        console.log(super.c()); // 2 super=> a.protoType
    } 
}
let b = new B();
```


\*\*  上面代码中，子类B当中的super.c()，就是将super当作一个对象使用。这时，super在普通方法之中，指向A.prototype，所以super.c()就相当于A.prototype.c()。\*\* ​

通过super调用父类的方法时，**super会绑定子类的this**。(如果父类是箭头函数就会报错)

```javascript 
 class A {
 constructor() {
  this.x = 1;
 }
 s() {
  console.log(this.x);
 }
}

class B extends A {
 constructor() {
  super();
  this.x = 2;
 }
 m() {
  super.s();
 }
}
let b = new B();
b.m() // 2
```


      上面代码中，super.s()虽然调用的是A.prototype.s()，但是A.prototype.s()会绑定子类B的this，导致输出的是2，而不是1。也就是说，实际上执行的是super.s.call(this)。

      由于绑定子类的this，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。

```javascript 
 class A {
 constructor() {
  this.x = 1;
 }
  name=10
  get author() {
    return this.name;
  }
  set author(value) {
    this.name = this.name + value;
  }
}

class B extends A {
 constructor() {
  super();
  this.x = 2;
  super.x = 3;
  console.log(super.x); // undefined
  console.log(this.x); // 3
 }
}

let b = new B();


```


上面代码中，

- super.x赋值为3，这时等同于对this.x赋值为3。
- 而当读取super.x的时候，读的是A.prototype.x，所以返回undefined。

(这个地方 读取 和 赋值的意义不一样)

### 原型 prototype 上的属性和方法不可以通过 super 调用

这个地方注意：只有\*\* 方法 或者 （get set) 是挂载 protoType\*\*上的；属性不会挂载载protoType上

```javascript 
 class A {
        constructor() {
        }
        name=10
        static c = 30
        static test2(){
            console.log(this,'---test2---')
        }
        test(){}
        test2='2'
        get author() {
            return this.name;
        }
        set author(value) {
            this.name = this.name + value;
        }
    }

    class B extends A {
        constructor() {
            super();
        }
        test(){
            console.log(super.test2,super.name,super.author)
        }


    }
    let b = new B()
    b.test()  // undefined undefined 10
```


### 静态方法

- 在静态方法中，指向父类。

```javascript 
class A {
    constructor() {
    }
    static c = 30
}
A.b = 20
class B extends A {
    constructor() {
        super();
    }
    static test(){
        console.log(super.b,super.c)
    }
}
  let b = new B()
  B.test()   // 20 30 
```


## **任意对象的 super**

由于对象总是继承其它对象的，所以可以在任意一个对象中，使用 super 关键字，指向的是该对象的构造函数的 prototype 原型。

```javascript 
let obj = {
  m() {
    return super.constructor.name;
  }
};

obj.m();    // Object
```


## 显示的指定super

注意，使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。（不能console打印出来）

```javascript 
 class A {}

class B extends A {
 constructor() {
  super();
  console.log(super); // 报错
 }
}
```


上面代码中，console.log(super)当中的super，无法看出是作为函数使用，还是作为对象使用，所以 JavaScript 引擎解析代码的时候就会报错。

这时，如果能清晰地表明super的数据类型，就不会报错。
