# buffer.toString

## 目录

- [语法](#语法)
  - [参数说明](#参数说明)
- [返回值](#返回值)
- [常用编码方式](#常用编码方式)
- [示例](#示例)
  - [1. 默认 UTF-8 编码转换](#1-默认-UTF-8-编码转换)
  - [2. 指定编码（如 hex）](#2-指定编码如-hex)
  - [3. 指定起始和结束位置](#3-指定起始和结束位置)
  - [4. 使用不同编码转换](#4-使用不同编码转换)
- [注意事项](#注意事项)
- [小结](#小结)

在 Node.js 中，`Buffer.prototype.toString()`是`Buffer`类的一个实例方法，用于将`Buffer`中的二进制数据转换为字符串。

***

## 语法

```javascript 
buf.toString([encoding[, start[, end]]])
```


### 参数说明

| 参数           | 类型         | 说明                                |
| ------------ | ---------- | --------------------------------- |
| \`encoding\` | String（可选） | 使用的字符编码，默认为\`'utf8'\`             |
| \`start\`    | Number（可选） | 开始转换的位置，默认为\`0\`                  |
| \`end\`      | Number（可选） | 结束转换的位置（不包含该位置），默认为\`buf.length\` |

***

## 返回值

返回从`Buffer`中解码出来的字符串。

## 常用编码方式

- `'utf8'`：默认编码，支持多语言字符（如中文）
- `'ascii'`：仅支持 7 位 ASCII 字符
- `'latin1'`/`'binary'`：将每个字节转换为对应的 Latin-1 字符
- `'hex'`：将每个字节转换为两位十六进制表示
- `'base64'`：Base64 编码
- `'ucs2'`/`'ucs-2'`/`'utf16le'`/`'utf-16le'`：UTF-16 小端编码

## 示例

### 1. 默认 UTF-8 编码转换

```javascript 
const buf = Buffer.from('Hello, 世界');
console.log(buf.toString()); // 'Hello, 世界'
```


### 2. 指定编码（如 hex）

```javascript 
const buf = Buffer.from('Hello');
console.log(buf.toString('hex')); // '48656c6c6f'
```


### 3. 指定起始和结束位置

```javascript 
const buf = Buffer.from('Hello, 世界');
console.log(buf.toString('utf8', 7, 9)); // '世' （从第7字节到第8字节）
```


> 注意：`start`和`end`是按**字节位置计算的，不是字符位置**。如果 Buffer 中包含多字节字符（如中文），直接按字节截取可能会导致乱码。

### 4. 使用不同编码转换

```javascript 
const buf = Buffer.from('Hello');

console.log(buf.toString('ascii'));     // 'Hello'
console.log(buf.toString('latin1'));    // 'Hello'
console.log(buf.toString('base64'));    // 'SGVsbG8='
console.log(buf.toString('hex'));       // '48656c6c6f'
```


## 注意事项

1. **多字节字符截取问题** &#x20;

   如果 Buffer 中包含多字节字符（如中文、emoji），直接按字节位置截取可能会导致乱码。例如：

```javascript 
const buf = Buffer.from('你好世界');
console.log(buf.toString('utf8', 0, 3)); // 可能出现乱码，因为一个中文字符占3个字节
```


如果你需要按字符而不是字节来截取字符串，建议先转换为字符串再截取：

```javascript 
const str = buf.toString('utf8');
console.log(str.substring(0, 2)); // '你好'

```


1. \*\*`Buffer`\*\***不是字符串** &#x20;

   `Buffer`是用于处理二进制数据的，而`String`是用于处理文本数据的。它们之间可以相互转换，但用途不同。

## 小结

| 方法                                     | 作用                               |
| -------------------------------------- | -------------------------------- |
| \`buf.toString()\`                     | 将 Buffer 转换为字符串，默认使用\`'utf8'\`编码 |
| \`buf.toString(encoding)\`             | 指定编码方式转换                         |
| \`buf.toString(encoding, start, end)\` | 指定编码和字节范围转换                      |
