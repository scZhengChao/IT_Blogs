# 联合类型

## 目录

- [联合类型](#联合类型)
- [声明多个同名 类型变量 也会被推断为联合类型](#声明多个同名-类型变量-也会被推断为联合类型)
- [分发索引](#分发索引)

## 联合类型

如果希望一个**变量可以支持多种类型，** 就可以用联合类型（union types）来定义。

例如，一个变量既支持 number 类型，又支持 string 类型，就可以这么写：

```javascript 
let num: number | string

```


# **声明多个同名 类型变量 也会被推断为联合类型**

```typescript 
type A<T> = T extends { a: infer U, b: infer U } ? U : any; 
type Foo = A<{ a: number, b: string }> // type Foo = string | number

```


**声明多个同名 类型变量 也会被推断为联合类型**

# 分发索引

`T['a' | 'b']`若`[]`内参数是联合类型，则也是分发索引的特性，依次取到值的类型进行联合
