# blob to binaryString

> 等价于 ：readAsBinaryString （该方法已被废弃）

历史是`readAsBinaryString`存在于 FileReader API 的早期规范中，在[ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer "ArrayBuffer")接口存在之前。

当 ArrayBuffer 接口出现时，`readAsBinaryString`它已被弃用，因为它的所有用例都可以使用该新接口以更好的方式完成。
实际上，`readAsBinaryString`仅将**二进制数据转换为 DOMString (UTF-16)。之后**您无能为力。此外，将其存储为 UTF-16 字符串意味着它在内存中占用的空间比原始数据大小要多得多。再加上字符串是不可变的，我想你可以看到它的工作效率有多低。
最后，如果你真的需要这个字符串，你实际上**可以从一个 ArrayBuffer 做同样的**事情，你只需要调用`String.fromCharCode`这个 ArrayBuffer 的 Uint8 视图。

```javascript 
String.fromCharCode.apply(null, new Uint8Array(arrayBuffer))
```
