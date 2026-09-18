# ReturnType

## 目录

- [源码](#源码)
- [获取函数的返回值类型](#获取函数的返回值类型)

## 源码

在阅读源码之前我们需要了解一下 **infer 这个关键字,** 在条件类型语句中, 我们可以用 infer**声明一个类型变量并且对它进行使用**,我们可以用它获取函数的返回类型， 源码如下;

```javascript 
type ReturnType<T> = T extends (
  ...args: any[]
) => infer R
  ? R
  : any;
//其实这里的 infer R 就是 声明一个变量来承载传入函数签名的返回值类型,  
//简单说就是用它取到函数返回值的类型方便之后使用.

//具体用法
function foo(x: number): Array<number> {
  return [x];
}
 type fn = ReturnType<typeof foo>;
```


# **获取函数的返回值类型**

```typescript 
/**
 * @example
 * type ReturnDataType = string;
 */
type funcType = ()=> string
 type ReturnDataType = ReturnType<funcType>
```
