# pako 压缩

## 目录

- [简介](#简介)
  - [一些特点和功能](#一些特点和功能)
- [api](#api)
- [安装与导入](#安装与导入)
- [将字符串压缩为二进制数据](#将字符串压缩为二进制数据)
- [处理大数据](#处理大数据)
- [注意事项](#注意事项)
  - [1、数据大小限制](#1数据大小限制)
  - [2、浏览器兼容性](#2浏览器兼容性)
  - [3、错误处理](#3错误处理)
  - [4、中文](#4中文)

[ pako - npm zlib port to javascript - fast, modularized, with browser support. Latest version: 2.1.0, last published: 2 years ago. Start using pako in your project by running \`npm i pako\`. There are 3187 other pr https://www.npmjs.com/package/pako](https://www.npmjs.com/package/pako " pako - npm zlib port to javascript - fast, modularized, with browser support. Latest version: 2.1.0, last published: 2 years ago. Start using pako in your project by running `npm i pako`. There are 3187 other pr https://www.npmjs.com/package/pako")

# 简介

pako 是一个流行的 JavaScript 库，用于**在浏览器中进行数据压缩和解压缩操作**。它提供了对常见**的压缩算法（如 Deflate 和 Gzip）** 的实现，使开发者能够在客户端上轻松进行数据压缩和解压缩，以减少数据传输大小和网络带宽消耗。

### 一些特点和功能

支持多种压缩算法：pako 实现了 Deflate 和 Gzip 等常见压缩算法的压缩和解压缩功能。这些算法在网络传输中被广泛使用，能够显著减小数据的大小。

跨平台兼容性：pako 可以在多个平台和环境中使用，包括浏览器、Node.js 和 Web Workers 等。

简单易用的 API：pako 提供了简单的 API，使得压缩和解压缩操作变得简单和直观。你可以通过提供原始数据和选项来执行压缩和解压缩，并获得压缩后的数据或原始数据。

高性能：pako 的实现经过优化，具有较高的性能。它使用原生的 JavaScript 数组和类型化数组操作来处理数据，以提高压缩和解压缩的速度和效率。

# api

![](./assets/image/image_BDz5ykFe3W.png)

| 常用                                                  | 解释                                                                                           |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| \`deflate(data\[, options]) -> Uint8Array\`         | 压缩函数， input类型 UInt8Array或者string ，返回类型为UInt8Array                                            |
| \`inflate(data\[, options]) -> Uint8Array\|String\` | 解压缩函数， input类型 UInt8Array或者string ，返回类型为UInt8Array；如果options:{to:‘string’}，则返回string字符串      |
| \`gzip(data\[, options]) -> Uint8Array\`            | 压缩函数， input类型 UInt8Array或者string ，返回类型为UInt8Array 。                                          |
| \`ungzip(input,options)\`                           | 解压缩函数， input类型 UInt8Array或者string ，返回类型为UInt8Array；如果\`options:{to:'string'}\`，则返回string字符串。 |

# 安装与导入

```html 
<script src="https://cdnjs.cloudflare.com/ajax/libs/pako/2.0.3/pako.min.js"></script>

npm install pako

```


# 将字符串压缩为二进制数据

```javascript 
const input = 'Hello, world!';

const compressed = pako.deflate(input, { to: 'string' });
// 使用 pako.deflate 方法将字符串 input 压缩为二进制数据。选项 { to: 'string' } 指定了输出格式为字符串。

const decompressed = pako.inflate(compressed, { to: 'string' });

console.log(decompressed); // 'Hello, world!'

//pako.inflate 方法将压缩数据 compressed 解压为原始字符串。


```


# 处理大数据

Pako.js 支持流式处理，这对于处理大数据非常有用。以下是一个流式压缩和解压的示例：

```javascript 
const chunk1 = 'Hello, ';

const chunk2 = 'world!';


const deflator = new pako.Deflate();


deflator.push(chunk1, false);


deflator.push(chunk2, true);


const compressedChunks = deflator.result;


console.log(compressedChunks);


const inflator = new pako.Inflate();


inflator.push(compressedChunks);


const decompressedChunks = inflator.result;


console.log(decompressedChunks); // 'Hello, world!'




```


在这个示例中，我们使用`pako.Deflate`和`pako.Inflate`类来进行流式压缩和解压。

# 注意事项

#### 1、数据大小限制

尽管 Pako.js 在处理数据时非常高效，但仍需注意数据大小限制。在浏览器环境中，内存和性能可能会受到大数据量的影响。对于超大数据集，可以考虑分片处理或使用 Web Workers 来提高性能。

#### 2、浏览器兼容性

Pako.js 兼容大多数现代浏览器，但在一些老旧浏览器中可能会遇到兼容性问题。在开发过程中，建议进行跨浏览器测试，确保代码在目标浏览器中正常运行。

#### 3、错误处理

在使用 Pako.js 进行压缩和解压时，务必进行错误处理。以下是一个示例：

```javascript 
try {
  const compressed = pako.deflate(input, { to: 'string' });
  const decompressed = pako.inflate(compressed, { to: 'string' });
  console.log(decompressed);
} catch (err) {
  console.error('An error occurred:', err);
}


```


#### 4、中文

如果压缩内容包含中文文本，压缩时需要使用`encodeURIComponent`来转移一下，解压时需要`decodeURIComponent`来转义回去。否则会出现中文乱码。

[案例](./案例/index.md "案例")
