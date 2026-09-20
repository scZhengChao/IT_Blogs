# 日期使用函数Date-fns

日期的实用程序函数，帮助开发人员更方便地处理日期。

date-fns 提供最全面、最简单且一致的工具集，用于在浏览器和 Node.js 中操作 JavaScript 日期。

date-fns：[https://date-fns.org/](https://date-fns.org/ "https://date-fns.org/")      ；    [https://date-fns.org/docs/](https://date-fns.org/docs/ "https://date-fns.org/docs/")

用法：以下是 date-fns 库的入门示例：&#x20;

```javascript 
 import  { compareAsc, format }  from'date-fns' 
format( newDate ( 2014 ,  1 ,  11 ),  'yyyy-MM-dd' ) 
 //=> '2014-02-11' const  dates = [   
   new   Date ( 1995 ,  6 ,  2 ),   
   new   Date ( 1987 ,  1 ,  11 ),   
   new   Date ( 1989 ,  6 ,  10 ), 
] 
dates.sort(compareAsc) 
 //=> [ // Wed Feb 11 1987 00:00:00, // Mon Jul 10 1989 00:00:00, // Sun Jul 02 1995 00:00:00 // ]
```
