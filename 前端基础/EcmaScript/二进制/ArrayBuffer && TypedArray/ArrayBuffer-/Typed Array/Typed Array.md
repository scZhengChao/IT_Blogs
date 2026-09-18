# Typed Array

## 目录

- [Typed Array](#Typed-Array)
  - [Uint8Array 到底是什么](#Uint8Array-到底是什么)

## Typed Array

Typed Array 是一系列的视图集合，包括

`Int8Array`：8位有符号整数，长度1个字节，范围是`[-128 ~ 128]`。

`Uint8Array`：8位无符号整数，长度1个字节，范围是`[0 ~ 255)`。

`Uint8ClampedArray`：8位无符号整数，长度1个字节，溢出处理不同，是针对 Canvas 元素的专有类型。

`Int16Array`：16位有符号整数，长度2个字节，范围是`[-32768 ~ 32767]`。

`Uint16Array`：16位无符号整数，长度2个字节，范围是`[0 ~ 65536)`。

`Int32Array`：32位有符号整数，长度4个字节。

`Uint32Array`：32位无符号整数，长度4个字节。

`Float32Array`：32位浮点数，长度4个字节。

`Float64Array`：64位浮点数，长度8个字节。

*ps: 不要把 U int 看成 Unit，int 是整数，Uint 是无符号整数！*

看到定义可能很多人还是不明白表达的是什么意思，我们以 Uint8Array 做说明。

#### Uint8Array 到底是什么

首先我们知道在计算机中，一个字节有 8 位:

形象表示：`[0] [0] [0] [0] [0] [0] [0] [0]` 我们将这一个8位的连续内存当作一个“基本长度”。

下面我们创建一个 Uint8Array：

```javascript 
const u8 = new Uint8Array(5) // 创建一个 Uint8Array 实例，长度是 5，未赋值之前 5 位都是 0，具有 5 个“基本长度”
​
u8[0] = 1 // 给第一位赋值
u8[1] = 2 // 给第二位赋值
​
// 如果赋超过 255 的值，会被进位后舍去。比如 520 -> 255 进位 * 2 -> 520 - 255 * 2 -> 10，最后就是 10

```


创建完成后（二进制的）：

- 第一位形象表示：`[0] [0] [0] [0] [0] [0] [0] [1]`
- 第二位形象表示：`[0] [0] [0] [0] [0] [0] [1] [0]`

所以 Uint8Array 就是这样在内存中的一串二进制数据。那他有什么用呢？

我们说了计算机中的**所有数据都是二进制的**，Uint8Array 就是计算机中的数据，**而且可以是任意类型的数据**，可以是普通**的数字，也可以是文件**，**更多的我们用它来处理文件**。普通数字、字符有自己的字面标识符不需要使用到它。

回到开头我们说的一个常见示例：将 dataUrl 转成 blob 对象，一般我们会将编码取出转换成二进制数据

```javascript 
const [binaryType, base64Str] = dataUrl.split(',')
​
const binaryStr = window.atob(base64Str)
```


ps:

- `window.btoa`：binary to ascii，**二进制数据用 ascii 码编码——编码**
- `window.atob`：ascii to binary，**ascii 码编码的数据解析回原始的二进制数据——解码**

要想变回 blob 对象，我们需要通过`Blob`构造函数来处理，`Blob`构造函数，接收` Typed Array` 作为参数，那么问题来了，**这么多类型的 Typed Array，我们用哪一个呢？**

这取决于**要构造的数据他们能表示的最大值**（比如英文单字符，一个字节，8位就能表示完，最多只到 127，用 Uint8Array 足以）和他们匹配上即可，示例中的 binaryStr 最大能表示 255 个字符，所以我们只需要取无符号的 8 位整数，也就是 Uint8Array。（这里就明白了为什么一些工具方法中总是把 dataUrl 的数据通过 Uint8Array 来构造了吧！）

**小知识点：**

> 在 js 中，binary string 是一种字符集，类似于 ascii、unicode 字符集，用来表示二进制数据。
> 在 ascii 中，对于单字节字符，一**个字节是 8 位，除去符号位最多 127 个字符。**
> 在 binary string 中，没有符号位，**所以能表示 255 个字符。(2^8 - 1)**
> UTF-8、UTF-16、UTF-32 中的 "UTF" 是 "Unicode Transformation Format" 的缩写，**意思是"Unicode 转换格式"，**后面的数字表明至少使用多少个比特位来存储字符, 比如**：UTF-8 最少需要8个比特位也就是 1 个字节来存**储，对应的，\*\* UTF-16 和 UTF-32 分别需要最少 2 个字节 和 4 个字节来存储\*\*

**可能有人好奇那我不能用 Uint16Array 来处理吗？** 答案是可以的，只不过 Uint16Array 一个字符会用两个字节来表示，纵使一个字节就能表示完，另一个字节也会以 0 的形式存在内存中，导致内存占用翻倍。

下面继续 dataUrl 到 blob 的转换：

```javascript 
const u8a = new Uint8Array(asciiStr.length)
​
for(let i = 0; i++; i <= asciiStr.length) {
  u8a[i] = asciiStr.charCodeAt(i) 
  // charCodeAt 给定字符对应的 玛点，直接给字符是不行的，Typed Array 中的每一位都是数字，记住他是一个整数型数组，给非数字会被视为 0 
}
​
const blob = new Blob([u8a], { binaryType })

```


*ps: 玛点，二维表中行与列交汇的点，码点值(即码点编号)通常来说就是其所对应的字符的编号。如果想知道具体指可以百度一下对应的编码表😄*

至此就解开了我们的疑惑，为什么 dataUrl to blob 总是用 Uint8Array 作为中间人？因为他是最合适的。
