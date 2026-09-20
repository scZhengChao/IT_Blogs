# ArrayBuffer && TypedArray

## 目录

- [ TypedArray](#-TypedArray)
- [ArrayBuffer](#ArrayBuffer)
  - [连接多个 TypedArray](#连接多个-TypedArray)

### **TypedArray**

TypedArray是 ES6+ **新增的描述二进制数据的类数组数据结构**。但它**本身不可以被实例化**，**甚至无法访问**，你可以把它理解为` Abstract Class`或者 `Interface`。而基于 `TypedArray`，有如下数据类型：

- Uint8ArrayUint 及 Unsigned Int 代表数组的每一项是无符号整型8 代表数据的每一项占 8 个比特位，即一个字节
- Int8Array
- Uint16Array
- Int16Array
- ...

通过 Uint8Array，即可知道 Uint16Array，Int8Array所代表的意义。

```javascript 
const array = new Int32Array([1, 2, 3])


array.length 
// .length 代表 数组的大小 
// 3


array.byteLength
// .btyeLength 代表数据 所占字节大小 
// 12
```


# **ArrayBuffer**

**ArrayBuffer代表二进制数据结构**，**「****并且只读****」，需要转化为 TypedArray进行写操作。**

```javascript 
const array = new Int16Array([1, 2, 3])


 // TypedArray -> ArrayBuffer 
array.buffer


 // ArrayBuffer -> TypedArray 
new Int16Array(array.buffer)


 // buffer.length 代表数据所占用字节大小 
array.buffer.length === array.byteLength
```


### **连接多个 TypedArray**

TypedArray没有像数组那样的 Array.prototype.concat方法用来连接多个 TypedArray。不过它提供了 `TypedArray.prototype.set`可以用来间接连接字符串

[可以参考 MDN 文档：](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/set "可以参考 MDN 文档：")

```javascript 
 // 在位移 offset 位置放置 typedarray 
 typedarray.set(typedarray, offset)
```


原理就是**先分配一块空间足以容纳需要连接的** TypedArray，**然后逐一在对应位置叠加**

```javascript 
function concatenate(constructor, ...arrays) {
  let length = 0;
  for (let arr of arrays) {
    length += arr.length;
  }
  
  let result = new constructor(length);
  let offset = 0;
  for (let arr of arrays) {
     result.set(arr, offset); 
     offset += arr.length; 
  }
  return result;
}


concatenate(Uint8Array, new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6]))
```


同时您还需要对资源的获取有大致的了解，如 XHR，fetch，通过文件上传。

[ArrayBuffer ](./ArrayBuffer-/index.md "ArrayBuffer ")
