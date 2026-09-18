# 逆变/协变

## 目录

- [类型兼容性 - 逆变/协变](#类型兼容性---逆变协变)
  - [概念](#概念)
  - [🤣 特性](#-特性)
  - [🤪 类型推导工具中的应用](#-类型推导工具中的应用)
  - [🤭 一个不能理解的例子](#-一个不能理解的例子)

## 类型兼容性 - 逆变/协变

先说，逆变是我在ts接触到的最难理解的部分。

### 概念

集合论中，如果一个集合的所有元素在集合B中都存在，则A是B的子集；

**类型系统中，如果一个类型****的属性更具体，则该类型是子类型****。（因为属性更少则说明该类型约束的更宽泛，是父类型）**（子类型更具体，父类型更宽泛）（子类型可以赋值给父类型） 

类中，如果一个类继承另一个类，可能做了扩展，属性更多，则是子类（子类更具体，父类更宽泛）（子类可以安全覆盖父类）。

**因此，我们可以得出基本的结论：****子类型比父类型更加具体, 父类型比子类型更宽泛****。** 下面我们也将基于类型的可复制性（可分配性）、协变、逆变、双向协变等进行进一步的讲解。

> 协变与逆变(Covariance and contravariance )是在计算机科学中，**描述具有父/子型别关系**的多个型别通过型别构造器、构造出的多个复杂型别之间是否有父/子型别关系的用语。

> 具有父子关系的多个类型，在通过某种构造关系构造成的新的类型，如果**还具有父子关系则是协变的，而关系逆转了（子变父，父变子）就是逆变的**

```typescript 
interface Animal {
  name: string;
}
interface Dog extends Animal {
  break(): void;
}
let Eg1: Animal;
let Eg2: Dog;
// 兼容，可以赋值
Eg1 = Eg2;

let Eg3: Array<Animal>
let Eg4: Array<Dog>
// 兼容，可以赋值
Eg3 = Eg4

type AnimalFn = (arg: Animal) => void
type DogFn = (arg: Dog) => void
let Eg1Fn: AnimalFn;
let Eg2Fn: DogFn;

// 不再可以赋值了，
 // AnimalFn = DogFn不可以赋值了, Animal = Dog是可以的 
Eg1Fn = Eg2Fn;
```


假设可以赋值，则传递参数的约束是原始的更少的 Animal 相关约束，但是调用时的实现却是赋值的 Dog 的实现，会出现实现调用的内容可能比约束更多，譬如实现上 Eg2Fn 里可能调用了只有 Dog 上出现的方法，不安全。所以不允许。

普通情况下，**子类型可以赋值给父类型**。但是**在作为函数参数时，子类型参数的函数不再可以赋值给接受父类型参数的函数。即**`type Fn<T> = (arg: T) => void`**构造器构造后，** ​**父子关系逆转了，此时成为“逆变”。**

为了方便，约定 A → B 指的是以 A 为参数类型，以 B 为返回值类型的函数类型。

参数类型一定是 T 及其子类，那么它也一定满足继承于T的超类。

返回值只能使用 T 及其超类上的方法，那么它是T的子类时才一定可以调用这些方法。

此时，我们称 返回值类型是协变的，而参数类型是逆变的。

A ≼ B 意味着 A 是 B 的子类型。

返回值类型是协变的，意思是 A ≼ B 就意味着 (T → A) ≼ (T → B) 。

参数类型是逆变的，意思是 A ≼ B 就意味着 (B → T) ≼ (A → T)

**即逆变是缩小类型范围的表现，协变是放大类型范围的表现。**

### 🤣 特性

&#x20;     函数的参数类型赋值就被称为逆变，**参数少（父）的可以赋给参数多（子）的那一个**。看起来和类型兼容性（多的可以赋给少的）**相反**。为什么？？？不理解这种反安全性的设计

实现比类型定义更少的参数是合法的，但实现比类型定义更多的参数是违法的。

这个很反直觉，一个理解方式是，**把类型声明当成生产方，实现当成消费方，消费了生产方不存在的参数是行不通的，也就是实现不能比类型定义多出参数。但是生产方提供了更多的内容，消费方不处理是没关系的，也就是实现可以比类型定义少参数。**

**函数类型赋值兼容时函数的返回值就是典型的协变场景**

这是调用结果之间的赋值，要保证安全性。

对于函数类型来说，函数参数的类型兼容是反向的，我们称之为 逆变 ，返回值的类型兼容是正向的，称之为 协变 。

### 🤪 类型推导工具中的应用

- infer 推导的名称相同并且都处于**逆变**的位置，则推导的结果将会是**交叉类型**。

```typescript 
type Bar<T> = T extends {
  a: (x: infer U) => void;
  b: (x: infer U) => void;
} ? U : never;

// type T1 = string
type T1 = Bar<{ a: (x: string) => void; b: (x: string) => void }>;

// type T2 = never
type T2 = Bar<{ a: (x: string) => void; b: (x: number) => void }>;

```


- infer 推导的名称相同并且都处于**协变**的位置，则推导的结果将会是**联合类型**。

```typescript 
type Foo<T> = T extends {
  a: infer U;
  b: infer U;
} ? U : never;
// type T1 = string
type T1 = Foo<{ a: string; b: string }>;
// type T2 = string | number
type T2 = Foo<{ a: string; b: number }>;

```


### 🤭 一个不能理解的例子

```typescript 
// lib.dom.d.ts中EventListener的接口定义
interface EventListener {
  (evt: Event): void;
}
// 简化后的Event
interface Event {
  readonly target: EventTarget | null;
  preventDefault(): void;
}
// 简化合并后的MouseEvent
interface MouseEvent extends Event {
  readonly x: number;
  readonly y: number;
}
// 简化后的Window接口
interface Window {
  // 简化后的addEventListener
  addEventListener(type: string, listener: EventListener)
}
// 日常使用
window.addEventListener('click', (e: Event) => {});
window.addEventListener('mouseover', (e: MouseEvent) => {});

```


可以看到 Window 的 listener 函数要求参数是 Event，但是日常使用时更多时候传入的是 Event 子类型，与上述不符。但是这里可以正常使用，正是`其默认行为是双向协变的原因`。可以通过 tsconfig.js 中修改 strictFunctionType 属性来严格控制协变和逆变。这个双向协变是我不能理解的。。。。
