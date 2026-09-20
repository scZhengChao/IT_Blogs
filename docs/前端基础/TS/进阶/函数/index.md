# 函数

## 目录

- [获取函数的入参](#获取函数的入参)
- [获取函数的返回值类型](#获取函数的返回值类型)

# 获取函数的入参

```typescript 
function test(lzwme: string, idx: number) {
return { lzwme, idx };
}

// 获取 test 函数的参数类型
type TestArgsType = Parameters<typeof test>; // TestArgsType => [lzwme: string, idx: number]

// 获取 idx 参数的类型
type IdxType = Parameters<typeof test>[1]; // IdxType => number
```


*Parameters* 的定义如下：

```typescript 
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

```


通过 *infer P*，*Parameters* 获取到函数 *T* 的参数类型列表 *P* 并返回。如果 *T* 不是函数，则返回 *never*

# 获取函数的返回值类型

要获取函数的返回值类型，可以使用 *ReturnType* 工具。*ReturnType* 是一个预定义的类型工具，它可以获取到一个函数的返回值类型。以下是一个示例：

```typescript 
// 获取 test 函数的返回值类型
type TestReturnType = ReturnType<typeof test>; // TestReturnType => { lzwme: string, idx: number }

```


*ReturnType* 的定义如下：

```typescript 
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

```


与 *Parameters* 类似，*ReturnType* 通过 *infer R* 获取并返回函数 *T* 的返回值类型

[函数重载](./函数重载/index.md "函数重载")
