# 生成指定时间

## 目录

- [new Date](#new-Date)
- [Date.parse](#Dateparse)
- [取得今天0点：](#取得今天0点)
- [取得今天 23:59:59](#取得今天-235959)
- [n天前](#n天前)
- [本地时间](#本地时间)
- [获取某年某月的第一天](#获取某年某月的第一天)
- [获取某年某月的最后一天](#获取某年某月的最后一天)
- [获取某年月份天数](#获取某年月份天数)

# new Date

```javascript 
 new Date() //没有任何参数，创建的对象自动获取当前日期 
 new  Date(1535610732881); //如果我们想要根据特定的日期和时间创建日期对象，则传入表示日期的毫秒数; 

```


# Date.parse

```javascript 
//Date.parse()接收一个表示日期的字符串参数，然后根据这个 字符串返回相应的毫秒数 
new Date(Date.parse("6/13/2018"));  // "月/日/年" : "1/13/2018"
new Date(Date.parse("January 13,2018"));  // "英文月名 日,年" : "January 13,2018"
new Date(Date.parse("Tue May 25 2018 18:00:00 GMT-0700"));  // "英文星期几 英文月名 日 年 时:分:秒 时区" : "Tue May 25 2018 18:00:00 GMT-0700"
new Date(Date.parse("2018-06-25T00:00:00.123"));  // es5： YYYY-MM-DDTHH:mm:ss.sssZ  : "2018-06-25T00:00:00"

//上面的Date.parse()可以省略 js后台默认会调用 Date.parse()
new Date("6/13/2018");
new Date("January 13,2018");
new Date("Tue May 25 2018 18:00:00 GMT-0700");
new Date("2018-06-25T00:00:00.123");

// Date.UTC()同样是返回日期的毫秒数 
//参数分别为 年份 基于 0 的月份 月中的哪一天 小时 分钟 秒。  这些参数只有前两个是必须的
new Date(Date.UTC(2018,6))
new Date(Date.UTC(2018,6,18,17,30,33));
//同样的Date.UTC()可以省略 js后台默认会调用 Date.UTC()
```


# 取得今天0点：

```javascript 
 js 取得今天0点： 
 const start = new Date(new Date(new Date().toLocaleDateString()).getTime()); 
 console.log(start); //Mon Dec 04 2017 00:00:00 GMT+0800 (中国标准时间)
```


# 取得今天 23:59:59

```javascript 
js 取得今天 23:59:59
const start = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);   不支持IE 
console.log(start); //Mon Dec 04 2017 23:59:59 GMT+0800 (中国标准时间)
```


# n天前

```javascript 
 返回N天谴 
 var curTime = new Date().getTime(); 
 var  startDate = curTime - (n * 3600 * 24 * 1000); 
 
 startDate = new Date(startDate).format('Y-m-d H:i:s') 

```


# 本地时间

```javascript 

const date1 = new Date().toLocaleTimeString() //返回本地时间
const date2 = new Date().toLocaleString()  // 返回本地时间
console.log(date1)  // 10:30:38
console.log(date2) // 2023/6/2 10:30:38

```


# 获取某年某月的第一天

```javascript 
const getFirstDate = (d = new Date()) => new Date(d.getFullYear(), d.getMonth(), 1);
getFirstDate(new Date('2022-04')) // Fri Apr 01 2022 00:00:00 GMT+0800 (中国标准时间)

```


# 获取某年某月的最后一天

```javascript 
const getLastDate = (d = new Date()) => new Date(d.getFullYear(), d.getMonth() + 1, 0);
getLastDate(new Date('2023-03-04')) // Fri Mar 31 2023 00:00:00 GMT+0800 (中国标准时间)

```


# 获取某年月份天数

```javascript 
const getDaysNum = (year, month) => new Date(year, month, 0).getDate()  
const day = getDaysNum(2024, 2) // 29

```
