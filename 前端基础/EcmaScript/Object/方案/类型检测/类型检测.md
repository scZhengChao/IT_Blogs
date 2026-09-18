# 类型检测

## 目录

- [异步函数判断](#异步函数判断)

```javascript 
 //准确的类型检测 ：  比 typeof 更贱准确                               
var n = Object.prototype.toString.call(t).substring(8).replace("]", "");
//[object String]  去掉前一位, 留下后一位

function(t, e) {
  // 检测数据类型,有传(就返回true 或者false ) 否则就返回他的类型 
  var n = Object.prototype.toString.call(t).substring(8).replace("]", ""); 
  return e ? n === e : n
},

```


### 异步函数判断

```javascript 
const isAsyncFunction = (v) => Object.prototype.toString.call(v) === '[object AsyncFunction]'
isAsyncFunction(async function () {}); // true

```
