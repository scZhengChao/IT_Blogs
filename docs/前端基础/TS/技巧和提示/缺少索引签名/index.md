# index signature is missing.

## 目录

- [TypeScript：类型中缺少索引签名](#TypeScript类型中缺少索引签名)
  - [什么是索引签名？](#什么是索引签名)

# TypeScript：类型中缺少索引签名

## 什么是索引签名？

在 [TypeScript](https://geek-docs.com/typescript/typescript-top-tutorials/1000100_typescript_index.html "TypeScript") 中，我们可以使用索引签名来定义一个动态属性。索引签名允许我们使用一个参数来访问对象的属性，而不仅仅是通过点标记语法或方括号语法。

以下是一个使用索引签名的示例：

```typescript 
interface Person {
  name: string;
  age: number;
  [key: string]: any;
}

const person: Person = {
  name: "John",
  age: 20,
  gender: "male",
};

console.log(person.name); // 输出: John
console.log(person.age); // 输出: 20
console.log(person.gender); // 输出: male

```


在上面的例子中，我们定义了一个 `Person` 接口，它有 `name` 和 `age` 属性，并使用索引签名 `[key: string]: any` **来表示该对象可以具有任意其他属性。**
