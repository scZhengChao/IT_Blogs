# TypedArray

## 目录

- [（2）TypedArray](#2TypedArray)
  - [① new TypedArray()](#-new-TypedArray)
  - [② BYTES\_PER\_ELEMENT](#-BYTES_PER_ELEMENT)
  - [③ TypedArray.prototype.buffer](#-TypedArrayprototypebuffer)
  - [④ TypedArray.prototype.slice()](#-TypedArrayprototypeslice)
  - [⑤ byteLength 和 length](#-byteLength-和-length)

### （2）TypedArray

TypedArray 对象一共提供 9 种类型的视图，每一种视图都是一种构造函数。如下：

| **元素**  | **类型化数组**         | **字节** | **描述**    |
| ------- | ----------------- | ------ | --------- |
| Int8    | Int8Array         | 1      | 8 位有符号整数  |
| Uint8   | Uint8Array        | 1      | 8 位无符号整数  |
| Uint8C  | Uint8ClampedArray | 1      | 8 位无符号整数  |
| Int16   | Int16Array        | 2      | 16 位有符号整数 |
| Uint16  | Uint16Array       | 2      | 16 位无符号整数 |
| Int32   | Int32Array        | 4      | 32 位有符号整数 |
| Uint32  | Uint32Array       | 4      | 32 位无符号整数 |
| Float32 | Float32Array      | 4      | 32 位浮点    |
| Float64 | Float64Array      | 8      | 64 位浮点    |

来看看这些都是什么意思：

- **Uint8Array：**将 ArrayBuffer 中的每个字节视为一个整数，可能的值从 0 到 255 （一个字节等于 8 位）。 这样的值称为“8 位**无符号**整数”。
- **Uint16Array**：将 ArrayBuffer 中任意两个字节视为一个整数，可能的值从 0 到 65535。 这样的值称为“16 位无符号整数”。
- **Uint32Array：** 将 ArrayBuffer 中任何四个字节视为一个整数，可能值从 0 到 4294967295，这样的值称为“32 位无符号整数”。

这些构造函数生成的对象统称为 `TypedArray` 对象。它们**和正常的数组很类似，都有`length`属性，都能用索引获取数组元素，所有数组的方法都可以在类型化数组上面使用。**

那类型化数组和数组有什么区别呢？

- 类型化数组的元素都是连续的，不会为空；
- 类型化数组的所有成员的类型和格式相同；
- 类型化数组元素默认值为 0；
- 类型化数组本质**上只是一个视图层，不会存储数据，数据都存储在更底层的 ArrayBuffer 对象中。**

下面来看看 TypedArray 都有哪些常用的方法和属性。

#### ① new TypedArray()

TypedArray 的语法如下（**TypedArray只是一个概念，实际使用的是那9个对象**）：

```javascript 
new Int8Array(length);
new Int8Array(typedArray);
new Int8Array(object);
new Int8Array(buffer [, byteOffset [, length]]);

```


可以看到，TypedArray 有多种用法，下面来分别看一下。

- **TypedArray(length)**：通过分配指定长度内容进行分配

```javascript 
let view = new Int8Array(16);
view[0] = 10;
view[10] = 6;
console.log(view);

```


![](image_xOEU5EI--4.png)

这里就生成了一个 16个元素的 Int8Array 数组，除了手动赋值的元素，其他元素的初始值都是 0。

- **TypedArray(typeArray)**：接收一个视图实例作为参数

```javascript 
const view = new Int8Array(new Uint8Array(6));
view[0] = 10;
view[3] = 6;
console.log(view);

```


![](image_3wcB-NZ2Cr.png)

- **TypedArray(object)**：参数可以是一个普通数组

```javascript 
const view = new Int8Array([1, 2, 3, 4, 5]);
view[0] = 10;
view[3] = 6;
console.log(view);

```


输出结果如下：&#x20;

需要注意，TypedArray视图会**开辟一段新的内存**，不会在原数组上建立内存。当然，这里创建的**类型化数组也能转换回普通数组**：

```javascript 
Array.prototype.slice.call(view); // [10, 2, 3, 6, 5]

```


- **TypeArray(buffer \[, byteOffset \[, length]])**：

这种方式有三个参数，其中第一个参数是一个ArrayBuffer对象；第二个参数是视图开始的字节序号，默认从0开始，可选；第三个参数是视图包含的数据个数，默认直到本段内存区域结束。

```javascript 
const buffer = new ArrayBuffer(8);
const view1 = new Int32Array(buffer); 
const view2 = new Int32Array(buffer, 4); 
console.log(view1, view2);

```


![](image_7Z0KIS4TMS.png)

#### ② **BYTES\_PER\_ELEMENT**

每种视图的构造函数都有一个 `BYTES_PER_ELEMENT` 属性，表示这种**数据类型占据的字节数**：

```javascript 
Int8Array.BYTES_PER_ELEMENT // 1
Uint8Array.BYTES_PER_ELEMENT // 1
Int16Array.BYTES_PER_ELEMENT // 2
Uint16Array.BYTES_PER_ELEMENT // 2
Int32Array.BYTES_PER_ELEMENT // 4
Uint32Array.BYTES_PER_ELEMENT // 4
Float32Array.BYTES_PER_ELEMENT // 4
Float64Array.BYTES_PER_ELEMENT // 8

```


`BYTES_PER_ELEMENT` 属性也可以在类型化数组的实例上获取：

```javascript 
const buffer = new ArrayBuffer(16); 
const view = new Uint32Array(buffer); 
console.log(Uint32Array.BYTES_PER_ELEMENT); // 4

```


#### ③ **TypedArray.prototype.buffer**

TypedArray 实例的 buffer 属性会返回内存中对应的 ArrayBuffer对象，只读属性。

```javascript 
const a = new Uint32Array(8);
const b = new Int32Array(a.buffer); 
console.log(a, b);

```


![](image_ukA7MMLQX5.png)

#### ④ **TypedArray.prototype.slice()**

TypeArray 实例的 slice方法可以返回一个指定位置的新的 TypedArray实例。

```javascript 
const view = new Int16Array(8);
console.log(view.slice(0 ,5));

```


#### **⑤ byteLength 和 length**

- `byteLength`：返回 TypedArray 占据的**内存长度，单位为字节**；
- **`length`：返回 TypedArray 元素个数；**

```javascript 
const view = new Int16Array(8);
view.length;      // 8
view.byteLength;  // 16

```
