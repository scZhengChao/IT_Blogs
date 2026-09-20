# Data view

## 目录

- [创建一个Data View](#创建一个Data-View)

DataView **可以理解为对 TypedArray 的封装，更简单易用一些**。

#### 创建一个Data View

```javascript 
const buffer = new ArrayBuffer(8);
const view = new DataView(buffer);
```


原型上有以下方法用于写入和读取，

- getInt8/setInt8：
- getUint8/setUint8
- getInt16/setInt16
- getUint16/setUint16
- getInt32/setInt32
- getUint32/setUint32
- getFloat32/setFloat32
- getFloat64/setFloat64

**示例代码如下：**

```javascript 
const buffer = new ArrayBuffer(16);
const view = new DataView(buffer);
​
// 赋值
view.setInt8(0, 1);
view.setInt16(1, 32767);
​
// 取值
view.getInt8(0); // 1
view.getInt16(1); // 256 
view.getInt16(1); // 32767 用二进制表示就是 0111 1111 1111 1111，第一位为符号位
view.getInt8(1); // 127 如果用 8 位来获取 16 位的整数的数据，多余的部分会被舍去 -> 0111 1111 

```


这里说一下 `getInt8` 和 `getInt16` 之间的转换关系。

在上面的示例代码中，我们给 8 位的整型数组第一个值赋值为了 1，再通过 8 位去取的时候也仍然是 1。但是当我们通过 16 位去取的时候值是 256，为什么不是 1 呢？这里涉及到一个概念“字节序”！

> 字节序，或字节顺序（"Endian"、"endianness" 或 "byte-order"），描述了计算机如何组织字节，组成对应的数字。
> 大部分需占用多个字节的数字排序方式是 **little-endian**（译者注：可称小字节序、低字节序，即低位字节排放在内存的低地址端，高位字节排放在内存的高地址端。与之对应的 big-endian 排列方式相反，可称大字节序、高字节序），所有的英特尔处理器都使用 little-endian。

所以在 8 位中，1 用二进制表示就是 `0000 0001`

而在 16 位中，由于我们使用低字节序，1 用二进制表示就是`0000 0001 0000 0000`，低位的在前面，转换成十进制就是 256 了！
