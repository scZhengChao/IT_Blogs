# infer

## 目录

- [基本概念](#基本概念)
- [核心用法](#核心用法)
  - [1. 提取数组元素类型](#1-提取数组元素类型)
  - [2. 提取函数返回类型](#2-提取函数返回类型)
  - [3. 提取函数参数类型](#3-提取函数参数类型)
  - [4. 提取 Promise 的解析类型](#4-提取-Promise-的解析类型)
- [高级用法](#高级用法)
  - [1. 递归类型解包](#1-递归类型解包)
  - [2. 提取构造函数实例类型](#2-提取构造函数实例类型)
  - [3. 提取元组中的特定位置类型](#3-提取元组中的特定位置类型)
- [实际应用场景](#实际应用场景)
- [注意事项](#注意事项)
- [总结](#总结)

`infer`是 TypeScript 中一个强大的类型推断关键字，主要用于**条件类型（Conditional Types）** 中，它允许我们在类型系统中进行模式匹配并提取类型信息。

## 基本概念

`infer`关键字的作用是**声明一个待推断的类型变量**，它**只能在条件类型**的`extends`**子句中使用**。

```typescript 
type Example<T> = T extends (infer U)[] ? U : never;
```


## 核心用法

### 1. 提取数组元素类型

```typescript 
type ElementType<T> = T extends (infer U)[] ? U : T;

type Num = ElementType<number[]>;       // number
type Str = ElementType<string[]>;       // string
type NotArray = ElementType<boolean>;   // boolean
```


### 2. 提取函数返回类型

```typescript 
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

type FnReturn = ReturnType<() => number>;  // number
```


### 3. 提取函数参数类型

```typescript 
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

type FnParams = Parameters<(a: string, b: number) => void>;  // [string, number]
```


### 4. 提取 Promise 的解析类型

```typescript 
type UnpackPromise<T> = T extends Promise<infer U> ? U : T;

type Resolved = UnpackPromise<Promise<string>>;  // string
```


## 高级用法

### 1. 递归类型解包

```typescript 
type DeepUnpack<T> = T extends Promise<infer U> ? DeepUnpack<U> : T;

type DeepResolved = DeepUnpack<Promise<Promise<string>>>;  // string
```


### 2. 提取构造函数实例类型

```typescript 
type InstanceType<T> = T extends new (...args: any[]) => infer R ? R : any;

class MyClass {}
type MyInstance = InstanceType<typeof MyClass>;  // MyClass
```


### 3. 提取元组中的特定位置类型

```typescript 
type Second<T extends any[]> = T extends [any, infer S, ...any[]] ? S : never;

type SecondElement = Second<[string, number, boolean]>;  // number
```


## 实际应用场景

1. **增强类型安全性**：在需要从复杂类型中提取部分信息时
2. **构建工具类型**：创建通用的类型工具如`ReturnType`、`Parameters`等
3. **高级类型操作**：在复杂类型转换和推导场景中

## 注意事项

1. `infer`**只能在条件类型**的`extends`子句中使用
2. 同一条件类型**中可以有多个**`infer`位置
3. 类型推断是惰性的，**只在需要时进行**

## 总结

`infer`关键字为 TypeScript 的类型系统提供了强大的模式匹配能力，使得我们可以从已有类型中提取和推导出新的类型。它是构建高级工具类型和实现复杂类型操作的基础，熟练掌握`infer`可以显著提升你的类型编程能力。

通过合理使用`infer`，你可以创建更加灵活和强大的类型定义，使你的 TypeScript 代码更加类型安全和易于维护。
