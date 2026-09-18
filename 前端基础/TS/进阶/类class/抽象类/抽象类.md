# 抽象类

## 目录

- [抽象方法和多态](#抽象方法和多态)

其实 TS 还对 JS 扩展了一个新概念——`抽象类`。

所谓抽象类，是指**只能被继承，但不能被实例化的类，就这么简单**。

抽象类有两个特点：

- 抽象类不允许被实例化
- 抽象类中的**抽象方法必须被子类实现**

抽象类用一个 `abstract` 关键字来定义，我们通过两个例子来感受一下抽象类的两个特点。

```javascript 
abstract class Animal {
    constructor(name:string) {
        this.name = name
    }
    public name: string
    public abstract sayHi():void
}

class Dog extends Animal {
    constructor(name:string) {
        super(name)
    }
    public sayHi() {
        console.log('wang')
    }
}

```


很显然，抽象类是一个广泛和抽象的概念，不是一个实体，

官方一点的说法是，在面向对象的概念中，所有的对象都是通过类来描绘的，但是反过来，并不是所有的类都是用来描绘对象的，如果一个类中没有包含足够的信息来描绘一个具体的对象，这样的类就是抽象类。

## 抽象方法和多态

多态是面向对象的三大基本特征之一。

多态指的是，父类定义一个抽象方法，在**多个子类中有不同的实现**，运行的时候不同的子类就对应不同的操作，比如，

```javascript 
abstract class Animal {
    constructor(name:string) {
        this.name = name
    }
    public name: string
    public abstract sayHi():void
}

class Dog extends Animal {
    constructor(name:string) {
        super(name)
    }
    public sayHi() {
        console.log('wang')
    }
}

class Cat extends Animal {
    constructor(name:string) {
        super(name)
    }
    public sayHi() {
        console.log('miao')
    }
}

```
