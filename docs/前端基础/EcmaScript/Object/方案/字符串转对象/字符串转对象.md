# 字符串转对象

当你需要将一串字符串比如`'{name: "jack"}'`转换成对象时，直接使用JSON.parse将会报错。

```javascript 
const strParse = (str) => JSON.parse(str.replace(/(\w+)\s*:/g, (_, p1) => `"${p1}":`).replace(/\'/g, "\""))

strParse('{name: "jack"}')

```
