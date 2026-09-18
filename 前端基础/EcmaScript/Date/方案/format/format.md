# format

## 目录

- [方案一](#方案一)
- [ YYYY-MM-DD 格式](#-YYYY-MM-DD-格式)
- [hh:mm:ss ](#hhmmss-)

# 方案一

```javascript 
// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(H)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd HH:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d H:m:s.S")      ==> 2006-7-2 8:9:4.18   

Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒     };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}
```


调用方法

```javascript 
var time1 = new Date().format("yyyy-MM-dd HH:mm:ss");     
  
var time2 = new Date().format("yyyy-MM-dd");  
```


# &#x20;YYYY-MM-DD 格式

```javascript 
const formatYmd = (date) => date.toISOString().slice(0, 10);
formatYmd(new Date())  // 2023-06-02

```


# hh:mm:ss&#x20;

```javascript 
const formatSeconds = (s) => new Date(s * 1000).toISOString().substr(11, 8)
formatSeconds(200) // 00:03:20

```
