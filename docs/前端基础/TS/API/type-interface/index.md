# type/interface

## 目录

- [接口Interface：](#接口Interface)
- [类型别名type    ](#类型别名type----)
  - [类型和类型别名 ](#类型和类型别名-)
  - [泛型：](#泛型)
  - [交叉类型](#交叉类型)
  - [联合类型](#联合类型)
  - [元组](#元组)
  - [typeof](#typeof)
- [interface 和 type 的相似之处 ](#interface-和-type-的相似之处-)
  - [继承 vs 交叉](#继承-vs-交叉)
  - [实现 ](#实现-)
  - [interface 和 type 的区别 ](#interface-和-type-的区别-)
    - [并集和交集类型 ](#并集和交集类型-)
    - [声明合并 ](#声明合并-)
    - [元组类型 ](#元组类型-)

# 接口Interface：

&#x20;     可以用于对象的形状描述，函数的类型描述，类的行为进行抽象

&#x20;     与 type相反，**接口仅限于对象类型**。**它们是描述对象及其属性的一种方式**。**在这方面，接口被限制为对象类型**

&#x20;     思想：实现（implements）**不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces）**，用 implements 关键字来实现

&#x20;      门是一个类，防盗门是门的子类。防盗门有一个报警器的功能，给防盗门添加一个报警方法。车类，也有报警器的功能，就可以考虑把报警器提取出来，作为一个接口，防盗门和车都去实现它

```javascript 
 interface Action{ 定义接口
    readonly id: number;//只读属性  只能创建的时候被赋值
    name:string;
    age?:number;//可选
    [propName: string]: any;//任意属性  必填属性和可选属性都必须是任意属性的子属性
    eat?():string //可选方法的返回值
 }
```


- 实现（implements）

**一个类只能继承自另一个类，但是可以实现多个接口；**接口**interface可以被一个类class实现（implements），但是类型别名是不行的**。

```javascript 
 interface Common {
    name:string
}
interface Person<T> extends Common {
    age:T,
    sex:string
}
```


# 类型别名type   &#x20;

TypeScript 有 boolean、number、string 等基本类型。如果我们想**声明高级类型**，我们就需要使用**类型别名**。

类型别名指的是**为类型创建新名称**。

类型别名声明可用于任何基元类型、联合或交集。

## 类型和类型别名&#x20;

**需要注意的是**，我们**并没有定义一个新类型**。使用type关键字可能会让我们觉得是创建一个新类型，但我们只是给一**个类型一个新名称。所以我们所以 type 时，不是在创建新的类别，而是定义类型的一个别名而已。**

## 泛型：

```javascript 
type Person<T> = {
    age:T,
    sex:string
}
//函数：
type Person<T> = (age:T,sex:string)=>void
```


type不但不能被extends和implements，就连自己也不能extends和implements其它类型，

好在我们可以用交叉类型代替extends来达到同样的效果。

- 说到这里，你就会发现type可以使用联合类型、交叉类型还有元组等类型，

## **交叉类型**

```javascript 
 type People<T> = {
    age:T,
    sex:string
} & Common


```


## **联合类型**

```javascript 
 type p1 = People<number> | Person<number>
```


## **元组**

```javascript 
 type p2 = [People<number>, Person<number>]
```


## **typeof**

```javascript 
class Config {
    setPerson:(age:number,sex:string){
  
    }
}
type T = typeof Config
let C:T = class{
        setPerson:(age:number,sex:string){
       
         }
}

type Name = string                              // 基本类型
type arrItem = number | string                  // 联合类型
const arr: arrItem[] = [1,'2', 3]
type Person = { 
  name: Name 
}


type Student = Person & { grade: number  }       // 交叉类型
type Teacher = Person & { major: string  } 
type StudentAndTeacherList = [Student, Teacher]  // 元组类型
const list:StudentAndTeacherList = [
  { name: 'lin', grade: 100 }, 
  { name: 'liu', major: 'Chinese' }
]


```


# interface 和 type 的相似之处&#x20;

## 继承 vs 交叉

```typescript 
interface Child extends IParent1, IParent2 { } 
```


- 接口 继承 接口

```javascript 
 interface PartialPointX { x: number; } 
interface Point extends PartialPointX { y: number; } 
```


- 接口 继承 别名

```javascript 
 type PartialPointX = { x: number; }; 
interface Point extends PartialPointX { y: number; } 
```


- 别名 交叉 别名

```javascript 
 type PartialPointX = { x: number; }; 
type Point = PartialPointX & { y: number; }; 
```


- 别名 交叉 接口

```javascript 
 interface PartialPointX { x: number; } 
type Point = PartialPointX & { y: number; }; 
```


## 实现&#x20;

**类可以实现接口以及类型 。但是，类不能实现联合类型。**

```javascript 
 interface Point {
 x: number;
 y: number;
}

class SomePoint implements Point {
 x = 1;
 y = 2;
}

type AnotherPoint = {
 x: number;
 y: number;
};

class SomePoint2 implements AnotherPoint {
 x = 1;
 y = 2;
}

type PartialPoint = { x: number; } | { y: number; };

// Following will throw an error
class SomePartialPoint implements PartialPoint {
 x = 1;
 y = 2;
}

```


## interface 和 type 的区别&#x20;

### 并集和交集类型&#x20;

虽然接口可以被扩展和合并，但它们**不能以联合和交集的形式组合**在一起。类型可以使用联合和交集操作符来形成新的类型。

```javascript 
 // object
type PartialPointX = { x: number; };
type PartialPointY = { y: number; };

// 并集
type PartialPoint = PartialPointX | PartialPointY;

// 交集
type PartialPoint = PartialPointX & PartialPointY;

```


### 声明合并&#x20;

TypeScript编译器**合并两个或多个具有相同名称的接口**。这不**适用于类型**。如果我们尝试创建具有相同名称但不同的属性的两种类型，则TypeScript编译器将抛出错误。

```javascript 
 // These two declarations become:
// interface Point { x: number; y: number; }
interface Point { x: number; }
interface Point { y: number; }

const point: Point = { x: 1, y: 2 };
```


### 元组类型&#x20;

**元组(数组)只能通过type关键字进行定义。**

```javascript 
 type Point = [x: number, y: number]; 
```


没有办法使用接口声明元组。不过，我们可以在接口内部使用元组

```javascript 
 interface Point {
  coordinates: [number, number]
}
```
