# in

## 目录

- [映射类型](#映射类型)
  - [in](#in)

# 映射类型

TS允许将一个类型映射成另外一个类型。

## **in**

介绍映射类型之前，先介绍一下 `in` 操作符，用来对联合类型实现遍历。

```javascript 
type Person = "name" | "school" | "major"

type Obj =  {
  [p in Person]: string
}

```
