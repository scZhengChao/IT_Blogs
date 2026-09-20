# Date Api

## 目录

- [Date 对象](#Date-对象)
- [Date 对象属性](#Date-对象属性)
- [Date 对象方法](#Date-对象方法)

## Date 对象

Date 对象用于处理日期与时间。创建 Date 对象： **new Date()**

以下四种方法同样可以创建 Date 对象：

```javascript 
var  d  =   new   Date (); 
 var  d  =   new   Date ( milliseconds ); 
 var  d  =   new   Date ( dateString ); 
 var  d  =   new   Date ( year ,  month ,  day ,  hours ,  minutes ,  seconds ,  milliseconds );
```


## Date 对象属性

| 属性&#xA;                                                                               | 描述&#xA;                    |
| ------------------------------------------------------------------------------------- | -------------------------- |
| [constructor](https://www.runoob.com/jsref/jsref-constructor-date.html "constructor") | 返回对创建此对象的 Date 函数的引用。&#xA; |
| [prototype](https://www.runoob.com/jsref/jsref-prototype-date.html "prototype")       | 使您有能力向对象添加属性和方法。&#xA;      |

## Date 对象方法

| 方法&#xA;                                                                                                   | 描述&#xA;                                          |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| [getDate()](https://www.runoob.com/jsref/jsref-getdate.html "getDate()")                                  | 从 Date 对象返回一个月中的某一天 (1 \~ 31)。&#xA;              |
| [getDay()](https://www.runoob.com/jsref/jsref-getday.html "getDay()")                                     | 从 Date 对象返回一周中的某一天 (0 \~ 6)。&#xA;                |
| [getFullYear()](https://www.runoob.com/jsref/jsref-getfullyear.html "getFullYear()")                      | 从 Date 对象以四位数字返回年份。&#xA;                         |
| [getHours()](https://www.runoob.com/jsref/jsref-gethours.html "getHours()")                               | 返回 Date 对象的小时 (0 \~ 23)。&#xA;                    |
| [getMilliseconds()](https://www.runoob.com/jsref/jsref-getmilliseconds.html "getMilliseconds()")          | 返回 Date 对象的毫秒(0 \~ 999)。&#xA;                    |
| [getMinutes()](https://www.runoob.com/jsref/jsref-getminutes.html "getMinutes()")                         | 返回 Date 对象的分钟 (0 \~ 59)。&#xA;                    |
| [getMonth()](https://www.runoob.com/jsref/jsref-getmonth.html "getMonth()")                               | 从 Date 对象返回月份 (0 \~ 11)。&#xA;                    |
| [getSeconds()](https://www.runoob.com/jsref/jsref-getseconds.html "getSeconds()")                         | 返回 Date 对象的秒数 (0 \~ 59)。&#xA;                    |
| [getTime()](https://www.runoob.com/jsref/jsref-gettime.html "getTime()")                                  | 返回 1970 年 1 月 1 日至今的毫秒数。&#xA;                    |
| [getTimezoneOffset()](https://www.runoob.com/jsref/jsref-gettimezoneoffset.html "getTimezoneOffset()")    | 返回本地时间与格林威治标准时间 (GMT) 的分钟差。&#xA;                 |
| [getUTCDate()](https://www.runoob.com/jsref/jsref-getutcdate.html "getUTCDate()")                         | 根据世界时从 Date 对象返回月中的一天 (1 \~ 31)。&#xA;            |
| [getUTCDay()](https://www.runoob.com/jsref/jsref-getutcday.html "getUTCDay()")                            | 根据世界时从 Date 对象返回周中的一天 (0 \~ 6)。&#xA;             |
| [getUTCFullYear()](https://www.runoob.com/jsref/jsref-getutcfullyear.html "getUTCFullYear()")             | 根据世界时从 Date 对象返回四位数的年份。&#xA;                     |
| [getUTCHours()](https://www.runoob.com/jsref/jsref-getutchours.html "getUTCHours()")                      | 根据世界时返回 Date 对象的小时 (0 \~ 23)。&#xA;               |
| [getUTCMilliseconds()](https://www.runoob.com/jsref/jsref-getutcmilliseconds.html "getUTCMilliseconds()") | 根据世界时返回 Date 对象的毫秒(0 \~ 999)。&#xA;               |
| [getUTCMinutes()](https://www.runoob.com/jsref/jsref-getutcminutes.html "getUTCMinutes()")                | 根据世界时返回 Date 对象的分钟 (0 \~ 59)。&#xA;               |
| [getUTCMonth()](https://www.runoob.com/jsref/jsref-getutcmonth.html "getUTCMonth()")                      | 根据世界时从 Date 对象返回月份 (0 \~ 11)。&#xA;               |
| [getUTCSeconds()](https://www.runoob.com/jsref/jsref-getutcseconds.html "getUTCSeconds()")                | 根据世界时返回 Date 对象的秒钟 (0 \~ 59)。&#xA;               |
| getYear()&#xA;                                                                                            | 已废弃。 请使用 getFullYear() 方法代替。&#xA;                |
| [parse()](https://www.runoob.com/jsref/jsref-parse.html "parse()")                                        | 返回1970年1月1日午夜到指定日期（字符串）的毫秒数。&#xA;                |
| [setDate()](https://www.runoob.com/jsref/jsref-setdate.html "setDate()")                                  | 设置 Date 对象中月的某一天 (1 \~ 31)。&#xA;                 |
| [setFullYear()](https://www.runoob.com/jsref/jsref-setfullyear.html "setFullYear()")                      | 设置 Date 对象中的年份（四位数字）。&#xA;                       |
| [setHours()](https://www.runoob.com/jsref/jsref-sethours.html "setHours()")                               | 设置 Date 对象中的小时 (0 \~ 23)。&#xA;                   |
| [setMilliseconds()](https://www.runoob.com/jsref/jsref-setmilliseconds.html "setMilliseconds()")          | 设置 Date 对象中的毫秒 (0 \~ 999)。&#xA;                  |
| [setMinutes()](https://www.runoob.com/jsref/jsref-setminutes.html "setMinutes()")                         | 设置 Date 对象中的分钟 (0 \~ 59)。&#xA;                   |
| [setMonth()](https://www.runoob.com/jsref/jsref-setmonth.html "setMonth()")                               | 设置 Date 对象中月份 (0 \~ 11)。&#xA;                    |
| [setSeconds()](https://www.runoob.com/jsref/jsref-setseconds.html "setSeconds()")                         | 设置 Date 对象中的秒钟 (0 \~ 59)。&#xA;                   |
| [setTime()](https://www.runoob.com/jsref/jsref-settime.html "setTime()")                                  | setTime() 方法以毫秒设置 Date 对象。&#xA;                  |
| [setUTCDate()](https://www.runoob.com/jsref/jsref-setutcdate.html "setUTCDate()")                         | 根据世界时设置 Date 对象中月份的一天 (1 \~ 31)。&#xA;            |
| [setUTCFullYear()](https://www.runoob.com/jsref/jsref-setutcfullyear.html "setUTCFullYear()")             | 根据世界时设置 Date 对象中的年份（四位数字）。&#xA;                  |
| [setUTCHours()](https://www.runoob.com/jsref/jsref-setutchours.html "setUTCHours()")                      | 根据世界时设置 Date 对象中的小时 (0 \~ 23)。&#xA;              |
| [setUTCMilliseconds()](https://www.runoob.com/jsref/jsref-setutcmilliseconds.html "setUTCMilliseconds()") | 根据世界时设置 Date 对象中的毫秒 (0 \~ 999)。&#xA;             |
| [setUTCMinutes()](https://www.runoob.com/jsref/jsref-setutcminutes.html "setUTCMinutes()")                | 根据世界时设置 Date 对象中的分钟 (0 \~ 59)。&#xA;              |
| [setUTCMonth()](https://www.runoob.com/jsref/jsref-setutcmonth.html "setUTCMonth()")                      | 根据世界时设置 Date 对象中的月份 (0 \~ 11)。&#xA;              |
| [setUTCSeconds()](https://www.runoob.com/jsref/jsref-setutcseconds.html "setUTCSeconds()")                | setUTCSeconds() 方法用于根据世界时 (UTC) 设置指定时间的秒字段。&#xA; |
| setYear()&#xA;                                                                                            | 已废弃。请使用 setFullYear() 方法代替。&#xA;                 |
| [toDateString()](https://www.runoob.com/jsref/jsref-todatestring.html "toDateString()")                   | 把 Date 对象的日期部分转换为字符串。&#xA;                       |
| toGMTString()&#xA;                                                                                        | 已废弃。请使用 toUTCString() 方法代替。&#xA;                 |
| [toISOString()](https://www.runoob.com/jsref/jsref-toisostring.html "toISOString()")                      | 使用 ISO 标准返回字符串的日期格式。&#xA;                        |
| [toJSON()](https://www.runoob.com/jsref/jsref-tojson.html "toJSON()")                                     | 以 JSON 数据格式返回日期字符串。&#xA;                         |
| [toLocaleDateString()](https://www.runoob.com/jsref/jsref-tolocaledatestring.html "toLocaleDateString()") | 根据本地时间格式，把 Date 对象的日期部分转换为字符串。&#xA;              |
| [toLocaleTimeString()](https://www.runoob.com/jsref/jsref-tolocaletimestring.html "toLocaleTimeString()") | 根据本地时间格式，把 Date 对象的时间部分转换为字符串。&#xA;              |
| [toLocaleString()](https://www.runoob.com/jsref/jsref-tolocalestring.html "toLocaleString()")             | 据本地时间格式，把 Date 对象转换为字符串。&#xA;                    |
| [toString()](https://www.runoob.com/jsref/jsref-tostring-date.html "toString()")                          | 把 Date 对象转换为字符串。&#xA;                            |
| [toTimeString()](https://www.runoob.com/jsref/jsref-totimestring.html "toTimeString()")                   | 把 Date 对象的时间部分转换为字符串。&#xA;                       |
| [toUTCString()](https://www.runoob.com/jsref/jsref-toutcstring.html "toUTCString()")                      | 根据世界时，把 Date 对象转换为字符串。&#xA;实例：                   |

```纯文本 
var  today  =   new   Date (); 
 var   UTCstring   =  today . toUTCString ();
```


| [UTC()](https://www.runoob.com/jsref/jsref-utc.html "UTC()") | 根据世界时返回 1970 年 1 月 1 日 到指定日期的毫秒数。&#xA; |
| ------------------------------------------------------------ | -------------------------------------- |

| [valueOf()](https://www.runoob.com/jsref/jsref-valueof-date.html "valueOf()") | 返回 Date 对象的原始值。&#xA; |
| ----------------------------------------------------------------------------- | -------------------- |
