# DataView

## 目录

- [（3）DataView](#3DataView)
  - [① new DataView()](#-new-DataView)
  - [② buffer、byteLength、byteOffset](#-bufferbyteLengthbyteOffset)
  - [③ 读取内存](#-读取内存)
  - [④ 写入内存](#-写入内存)

### （3）DataView

说完 ArrayBuffer，下面来看看另一种操作 ArrayBuffer 的方式：DataView。**DataView** 视图是一个可以从 二进制 `ArrayBuffer` 对象中读写多种数值类型的底层接口，使用它时，不用考虑不同平台的字节序问题。

DataView视图提供更多操作选项，而且**支持设定字节序**。本来，在设计目的上，ArrayBuffer对象的各种TypedArray视图，是用来向网卡、声卡之类的本机设备传送数据，所以使用本机的字节序就可以了；而DataView视图的设计目的，是用来处理网络设备传来的数据，所以大端字节序或小端字节序是可以自行设定的。

#### ① new DataView()

DataView视图可以通过构造函数来创建，它的参数是一个ArrayBuffer对象，生成视图。其语法如下：

```javascript 
new DataView(buffer [, byteOffset [, byteLength]])

```


其有三个参数：

- `buffer`：一个已经存在的 ArrayBuffer 对象，DataView 对象的数据源。
- `byteOffset`：可选，此 DataView 对象的第一个字节在 buffer 中的字节偏移。如果未指定，则默认从第一个字节开始。
- `byteLength`：可选，此 DataView 对象的字节长度。如果未指定，这个视图的长度将匹配 buffer 的长度。

来看一个例子：

```javascript 
const buffer = new ArrayBuffer(16);
const view = new DataView(buffer);
console.log(view);

```


![](./assets/image/image_cgbzClbkxB.png)

#### ② buffer、byteLength、byteOffset

DataView实例有以下常用属性：

- `buffer`：返回对应的ArrayBuffer对象；
- `byteLength`：返回占据的内存字节长度；
- `byteOffset`：返回当前视图从对应的ArrayBuffer对象的哪个字节开始。

```javascript 
const buffer = new ArrayBuffer(16);
const view = new DataView(buffer);
view.buffer;
view.byteLength;
view.byteOffset;

```


打印结果如下：&#x20;

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/66190fde4bda41d5a7ebba9381d73785~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

#### ③ 读取内存

DataView 实例提供了以下方法来读取内存，它们的参数都是一个字节序号，表示开始读取的字节位置：

- getInt8：读取1个字节，返回一个8位整数。
- getUint8：读取1个字节，返回一个无符号的8位整数。
- getInt16：读取2个字节，返回一个16位整数。
- getUint16：读取2个字节，返回一个无符号的16位整数。
- getInt32：读取4个字节，返回一个32位整数。
- getUint32：读取4个字节，返回一个无符号的32位整数。
- getFloat32：读取4个字节，返回一个32位浮点数。
- getFloat64：读取8个字节，返回一个64位浮点数。

下面来看一个例子：

```javascript 
const buffer = new ArrayBuffer(24);
const view = new DataView(buffer);

// 从第1个字节读取一个8位无符号整数
const view1 = view.getUint8(0);

// 从第2个字节读取一个16位无符号整数
const view2 = view.getUint16(1);

// 从第4个字节读取一个16位无符号整数
const view3 = view.getUint16(3);

```


#### ④ 写入内存

DataView 实例提供了以下方法来写入内存，它们都接受两个参数，第一个参数表示开始写入数据的字节序号，第二个参数为写入的数据：

- setInt8：写入1个字节的8位整数。
- setUint8：写入1个字节的8位无符号整数。
- setInt16：写入2个字节的16位整数。
- setUint16：写入2个字节的16位无符号整数。
- setInt32：写入4个字节的32位整数。
- setUint32：写入4个字节的32位无符号整数。
- setFloat32：写入4个字节的32位浮点数。
- setFloat64：写入8个字节的64位浮点数。
