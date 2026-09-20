# 压缩js

## 目录

- [lz-string](#lz-string)

# lz-string

浏览器***localStorage存储为 5M 然而并不能满足我们的要求***。我们可以压缩的是您可以存储的更多数据。好在JS 有lz - string 库

```typescript 
//引入库
<script src="https://cdn.bootcss.com/lz-string/1.4.4/lz-string.min.js"></script>      
npm install -g lz-string

var string ="自由网freedom。";
var compressed = LZString.compress(string);
string = LZString.decompress(compressed);

compress: ƒ (o)
compressToBase64: ƒ (o)
compressToEncodedURIComponent: ƒ (o)
compressToUTF16: ƒ (o)
compressToUint8Array: ƒ (o)
decompress: ƒ (o)
decompressFromBase64: ƒ (r)
decompressFromEncodedURIComponent: ƒ (r)
decompressFromUTF16: ƒ (o)
decompressFromUint8Array: ƒ (o)

```
