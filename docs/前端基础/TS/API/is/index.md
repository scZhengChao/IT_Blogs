# is

## 目录

- [缩小参数类型](#缩小参数类型)

## 缩小参数类型

```typescript 
function isString(s) {
  return typeof s === 'string';
}

```


```typescript 
function toUpperCase(x: unknown) {
  if(isString(x)) {
    x.toUpperCase(); // ⚡️ x is still of type unknown
  }
}
```


> ts 抛出了一个错误提示，我们能确信 x 是在类型判断为 string 以后再进行 toupperCase().但是由于这个检验函数(isString)被包裹在 toUpperCase()函数中 **，ts 在判断的时候还是抛出了错误提示**。。

使用 `is` ，这里让我们主动明确的告诉 ts ，在 isString() 这个函数的参数是一个 string。

```typescript 
// ！！！ 使用 is 来确认参数 s 是一个 string 类型
function isString(s): s is string {
  return typeof s === 'string';
}

```


```typescript 
function toUpperCase(x: unknown) {
  if(isString(x)) {
    x.toUpperCase(); // ✅ all good, x is string
  }
}

```
