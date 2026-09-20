# ArrayBuffer

## 目录

- [（1）ArrayBuffer](#1ArrayBuffer)
  - [① new ArrayBuffer()](#-new-ArrayBuffer)
  - [② ArrayBuffer.prototype.byteLength](#-ArrayBufferprototypebyteLength)
  - [③ ArrayBuffer.prototype.slice()](#-ArrayBufferprototypeslice)
  - [④ ArrayBuffer.isView()](#-ArrayBufferisView)

### （1）ArrayBuffer

ArrayBuffer 对象用来表示**通用的、固定长度的原始二进制数据缓冲区**。ArrayBuffer 的内容不能直接操作，只能通过 DataView 对象或 TypedArrray 对象来访问。这些对象用于读取和写入缓冲区内容。

ArrayBuffer 本身就是一个黑盒，不能直接读写所存储的数据，需要借助以下视图对象来读写：

- **TypedArray**：用来生成内存的视图，通过9个构造函数，可以生成9种数据格式的视图。
- **DataViews**：用来生成内存的视图，可以自定义格式和字节序。

![](./image/image_6RWepkg3NE.png)

TypedArray视图和 DataView视图的区别主要是**字节序**，前者的数组成员都是同一个数据类型，后者的数组成员可以是不同的数据类型。

那 ArrayBuffer 与 Blob 有啥区别呢？根据 ArrayBuffer 和 Blob 的特性，Blob 作为一个整体文件，适合用于传输；当需要对二进制数据进行操作时（比如要修改某一段数据时），就可以使用 ArrayBuffer。

下面来看看 ArrayBuffer 有哪些常用的方法和属性。

#### ① new ArrayBuffer()

ArrayBuffer 可以通过以下方式生成：

```javascript 
new ArrayBuffer(bytelength)

```


`ArrayBuffer()`构造函数可以**分配指定字节数量的缓冲区**，其参数和返回值如下：

- **参数**：它接受一个参数，即 bytelength，表示要创建数组缓冲区的大小（以字节为单位。）；
- **返回值**：返回一个新的指定大小的ArrayBuffer对象，内容初始化为0。

#### ② ArrayBuffer.prototype.byteLength

ArrayBuffer 实例上有一个 byteLength 属性，它是一个只读属性，表示 ArrayBuffer 的 byte 的大小，在 ArrayBuffer 构造完成时生成，不可改变。来看例子：

```javascript 
const buffer = new ArrayBuffer(16); 
console.log(buffer.byteLength);  // 16

```


#### ③ ArrayBuffer.prototype.slice()

ArrayBuffer 实例上还有一个 slice 方法，该方法可以用来截取 ArrayBuffer 实例，它返回一个新的 ArrayBuffer ，它的内容是这个 ArrayBuffer 的字节副本，从 begin（包括），到 end（不包括）。来看例子：

```javascript 
const buffer = new ArrayBuffer(16); 
console.log(buffer.slice(0, 8));  // 16

```


这里会从 buffer 对象上将前8个字节生成一个新的ArrayBuffer对象。这个方法实际上有两步操作，首先会分配一段指定长度的内存，然后拷贝原来ArrayBuffer对象的置顶部分。

#### ④ ArrayBuffer.isView()

ArrayBuffer 上有一个 isView()方法，它的返回值是一个布尔值，如果参数是 ArrayBuffer 的视图实例则返回 true，例如类型数组对象或 DataView 对象；否则返回 false。简单来说，这个方法就**是用来判断参数是否是 TypedArray 实例或者 DataView 实**例：

```javascript 
const buffer = new ArrayBuffer(16);
ArrayBuffer.isView(buffer)   // false

const view = new Uint32Array(buffer);
ArrayBuffer.isView(view)     // true

```
