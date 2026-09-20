# String to TypedArray

## 目录

- [String to TypedArray](#String-to-TypedArray)
- [String to TypedArray 2](#String-to-TypedArray-2)

### **String to TypedArray**

根据上图，由字符串到 TypedArray 的转换，可以通过 \*\*「String -> Blob -> ArrayBuffer -> TypedArray」\*\*的途径。

关于代码中的函数 readBlob可以回翻环节 数据类型 - [Blob](IT/前端基础/EcmaScript/二进制/Blob/Blob.md "Blob")

```javascript 
 const name = '山月' 
 const blob = new Blob(name.split('')) 
 
 
 readBlob(blob, 'ArrayBuffer').then(buffer => new Uint8Array(buffer))
```


也可以通过 Response API 直接转换 **「String -> ArrayBuffer -> TypedArray」**

```javascript 
 const name = '山月' 
 
 new  Response(name).arrayBuffer(buffer => new Uint8Array(buffer))
```


这上边两种方法都是直接通过 API 来转化，如果你更像了解如何手动转换一个字符串和二进制的 TypedArray

### **String to TypedArray 2**

使用 enodeURIComponent 把字符串转化为 utf8，再进行构造 TypedArray。

```javascript 
 function stringToTypedArray(s) { 
   const str = encodeURIComponent(s) 
   const binstr = str.replace(/%([0-9A-F]{2})/g, (_, p1) => { 
     return String.fromCharCode('0x' + p1) 
   }) 
   return new Uint8Array(binstr.split('').map(x => x.charCodeAt(0))) 
 }
```
