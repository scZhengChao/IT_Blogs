# 中文乱码

前端rsa[加密](https://so.csdn.net/so/search?q=加密\&spm=1001.2101.3001.7020 "加密")，后端去解密，但是呢有中文的时候解密出来就乱了，想了各种办法未果；

结论，既然中文乱码，我就不传中文就行了哈。在加密之前用

这个方法很巧妙的利用了解决url加密的工具，何乐而不为呢。

```javascript 
// 前端加密前将所有中文encoder掉
// 此函数是js原生函数
var en = encodeURIComponent(str);
 
 
 
// 后台再转换回来就行了
String result = java.net.URLDecoder.decode(en ,"UTF-8");
```
