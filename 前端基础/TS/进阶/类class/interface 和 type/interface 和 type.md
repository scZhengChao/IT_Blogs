# interface 和 type

## 目录

- [type 和 interface 的区别](#type-和-interface-的区别)
  - [两者相同点：](#两者相同点)
  - [两者不同点：](#两者不同点)
- [interface 和 class 的关系](#interface-和-class-的关系)
  - [implements](#implements)
  - [处理公共的属性和方法](#处理公共的属性和方法)
  - [约束构造函数和静态属性](#约束构造函数和静态属性)

# type 和 interface 的区别

## **两者相同点：**

- 都可以定义一个对象或函数
- 都允许继承

**都可以定义一个对象或函数**

```javascript 
type addType = (num1:number,num2:number) => number

interface addType {
    (num1:number,num2:number):number
}
// 这两种写法都可以定义函数类型

```


**都允许继承**

```javascript 
// interface 继承 interface
interface Person { 
  name: string 
}
interface Student extends Person { 
  grade: number 
}
// type 继承 type
type Person = { 
  name: string 
}
type Student = Person & { grade: number  }   // 用交叉类型
// interface 继承 type
type Person = { 
  name: string 
}

interface Student extends Person { 
  grade: number 
}
// type 继承 interface
interface Person { 
  name: string 
}

type Student = Person & { grade: number  }   // 用交叉类型


```


**interface 使用 extends 实现继承， type 使用交叉类型实现继承**

## **两者不同点：**

- interface（接口） 是 TS 设计出来用于定义对象类型的，可以对对象的形状进行描述。
- type 是**类型别名**，用于给各种类型定义别名，让 TS 写起来更简洁、清晰。
- type 可以声明基本类型、联合类型、交叉类型、元组，interface 不行
- interface可以合并重复声明，type 不行

**合并重复声明：**

```javascript 
interface Person {
    name: string
}

interface Person {         // 重复声明 interface，就合并了
    age: number
}

const person: Person = {
    name: 'lin',
    age: 18
}


type Person = {
    name: string
}

type Person = {     // Duplicate identifier 'Person'
    age: number
}

const person: Person = {
    name: 'lin',
    age: 18
}


```


# interface 和 class 的关系

- interface 是 TS 设计出来用于定义对象类型的，可以对对象的形状进行描述。
- interface 同样可以用来约束 class，要实现约束，需要用到 `implements` 关键字。

### implements

- implements 是实现的意思，class 实现 interface。

比如手机有播放音乐的功能，可以这么写：

```javascript 
interface MusicInterface {
    playMusic(): void
}

class Cellphone implements MusicInterface {
    playMusic() {}
}

```


### 处理公共的属性和方法

不同的类有一些共同的属性和方法，使用继承很难完成。

比如汽车（Car 类）也有播放音乐的功能，你可以这么做：

- 用 Car 类继承 Cellphone 类
- 找一个 Car 类和 Cellphone 类的父类，父类有播放音乐的方法，他们俩继承这个父类

很显然这两种方法都不合常理。

实际上，使用 implements，问题就会迎刃而解。

```javascript 
interface MusicInterface {
    playMusic(): void
}

class Car implements MusicInterface {
    playMusic() {}
}

class Cellphone implements MusicInterface {
    playMusic() {}
}

```


这样 Car 类和 Cellphone 类都约束了播放音乐的功能。

再比如，手机还有打电话的功能，就可以这么做，Cellphone 类 implements 两个 interface。

```javascript 
interface MusicInterface {
    playMusic(): void
}

interface CallInterface {
    makePhoneCall(): void
}

class Cellphone implements MusicInterface, CallInterface {
    playMusic() {}
    makePhoneCall() {}
}

```


## 约束构造函数和静态属性

```javascript 
interface CircleStatic {
    new (radius: number): void
    pi: number
}

const Circle:CircleStatic = class Circle {
    static pi: 3.14
    public radius: number
    public constructor(radius: number) {
        this.radius = radius
    }
}

```
