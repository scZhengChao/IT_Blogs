# Buffer.from

## 目录

- [Buffer.from](#Bufferfrom)
  - [参数和用法示例](#参数和用法示例)
    - [1. 从字符串创建 Buffer](#1-从字符串创建-Buffer)
    - [2. 从数组创建 Buffer](#2-从数组创建-Buffer)
    - [3. 从另一个 Buffer 创建（复制）](#3-从另一个-Buffer-创建复制)
    - [4. 从ArrayBuffer创建 Buffer](#4-从ArrayBuffer创建-Buffer)
  - [与new Buffer()的区别](#与new-Buffer的区别)
  - [总结](#总结)

# Buffer.from

`Buffer.from()`用于从各种数据源（如字符串、数组、另一个 Buffer 等）创建一个新的`Buffer`实例。

`Buffer.from()`是 Node.js 中用于\*\*创建`Buffer`\*\***实例的一个静态方法。**

```javascript 
Buffer.from(array)
Buffer.from(arrayBuffer[, byteOffset[, length]])
Buffer.from(buffer)
Buffer.from(string[, encoding])

1. const buf = Buffer.from('runoob', 'ascii'); //第二个表示 编码 方式 默认utf-8

// Node.js 目前支持的字符编码包括：
// ascii - 仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的。
// utf8 - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8 。
// utf16le - 2 或 4 个字节，小字节序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。
// ucs2 - utf16le 的别名。
// base64 - Base64 编码。
// latin1 - 一种把 Buffer 编码成一字节编码的字符串的方式。
// binary - latin1 的别名。
// hex - 将每个字节编码为两个十六进制字符。


```


## 参数和用法示例

### 1. 从字符串创建 Buffer

```javascript 
const buf = Buffer.from('Hello, 世界', 'utf8');
console.log(buf); // <Buffer 48 65 6c 6c 6f 2c 20 e4 b8 96 e7 95 8c>
```


- `string`: 要转换成 Buffer 的字符串。
- `encoding`（可选）：字符串的编码方式，默认为`'utf8'`。

### 2. 从数组创建 Buffer

```javascript 
const buf = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f]);
console.log(buf); // <Buffer 48 65 6c 6c 6f>
console.log(buf.toString()); // 'Hello'
```


- `array`: 一个包含 0 到 255 之间整数的数组。

***

### 3. 从另一个 Buffer 创建（复制）

```javascript 
const buf1 = Buffer.from('Hello');
const buf2 = Buffer.from(buf1);
buf1[0] = 0xff;
console.log(buf1.toString()); // 'ÿello'
console.log(buf2.toString()); // 'Hello' （buf2 是 buf1 的副本，不受影响）
```


- `buffer`: 源 Buffer 对象，`Buffer.from(buffer)`会**复制**其内容，而不是共享内存。

> ⚠️ 注意：`Buffer.from(buffer)`和直接赋值`let buf2 = buf1`是不同的。后者是引用赋值，修改`buf1`会影响`buf2`；而前者是创建一个新的 Buffer 副本。

### 4. 从`ArrayBuffer`创建 Buffer

```javascript 
const ab = new ArrayBuffer(8);
const view = new Uint8Array(ab);
view[0] = 0x41;
view[1] = 0x42;

const buf = Buffer.from(ab, 0, 2); // 从 ArrayBuffer 的第 0 位开始，取 2 个字节
console.log(buf); // <Buffer 41 42>
```


- `arrayBuffer`: 一个`ArrayBuffer`对象。
- `byteOffset`（可选）：开始位置，默认为 0。
- `length`（可选）：要复制的字节数，默认到`arrayBuffer`结束。

## 与`new Buffer()`的区别

在 Node.js 早期版本中，可以使用`new Buffer(size)`或`new Buffer(string)`来创建 Buffer。但这种方式存在**安全漏洞**，因为如果传入的参数是用户可控的，可能会导致内存分配异常或信息泄露。

从 **Node.js v6** 开始，官方推荐使用`Buffer.from()`、`Buffer.alloc()`和`Buffer.allocUnsafe()`来代替`new Buffer()`，因为这些方法更加安全、可预测。

- `Buffer.from()`: 从已有数据创建 Buffer（复制数据）。
- `Buffer.alloc(size)`: 创建一个指定大小的 Buffer，并用零填充（安全）。
- `Buffer.allocUnsafe(size)`: 创建一个指定大小的 Buffer，**不初始化内存**（更快但不安全，需要手动覆盖）。

## 总结

| 方法                           | 作用                        | 是否安全  | 是否复制数据    |
| ---------------------------- | ------------------------- | ----- | --------- |
| \`Buffer.from()\`            | 从字符串、数组、Buffer 等创建 Buffer | ✅ 安全  | ✅ 复制      |
| \`new Buffer()\`             | （已废弃）从各种数据创建 Buffer       | ❌ 不安全 | 视情况       |
| \`Buffer.alloc(size)\`       | 创建指定大小的 Buffer，并用零填充      | ✅ 安全  | ✅ 初始化     |
| \`Buffer.allocUnsafe(size)\` | 创建指定大小的 Buffer，不初始化       | ❌ 不安全 | ✅ 分配但不初始化 |

***

如果你有具体的使用场景或代码示例，我也可以帮你进一步分析如何使用`Buffer.from()`。
