# 时间处理

## 目录

- [days](#days)
  - [前六个月](#前六个月)
  - [本月的第一天和最后一天](#本月的第一天和最后一天)
  - [多少天以前思路](#多少天以前思路)
- [moment](#moment)
  - [指定语言；不然可能引起一些不必要的bug。](#指定语言不然可能引起一些不必要的bug)
  - [获取时间戳](#获取时间戳)
  - [生成指定时间的moment](#生成指定时间的moment)
  - [获取对象](#获取对象)
  - [格式化](#格式化)
  - [获取时间](#获取时间)
  - [获取当月第一天是星期几](#获取当月第一天是星期几)
  - [获取前n天 / 后n天](#获取前n天--后n天)
  - [比较两个时间的大小](#比较两个时间的大小)
  - [两个时间的相差几天](#两个时间的相差几天)
  - [是否是闰年](#是否是闰年)
  - [获取 月份和星期 枚举列表](#获取-月份和星期-枚举列表)
  - [克隆](#克隆)
  - [获取当月总天数](#获取当月总天数)

# days

中文文档；

[安装 | Day.js中文网 Day.js是一个极简的JavaScript库，可以为现代浏览器解析、验证、操作和显示日期和时间。 https://dayjs.fenxianglu.cn/category/#node-js](https://dayjs.fenxianglu.cn/category/#node-js "安装 | Day.js中文网 Day.js是一个极简的JavaScript库，可以为现代浏览器解析、验证、操作和显示日期和时间。 https://dayjs.fenxianglu.cn/category/#node-js")

## 前六个月

```typescript 
import monment from 'dayjs
let beforeMonth = (monthDuration:Number)=>{
  let currentMonth = moment().month();
  let currentYear = moment().year();
  let arr = []
  for(let i = 0;i < monthDuration ; i++ ){
    let handle = moment().subtract(i, 'month')
    let year = handle.year();
    let month = handle.month();
    let template = `${year}年${month+1}月`
    arr.push(template)        
  }
  return arr
}
this.timeDurations = [
  '近七天',
  ...beforeMonth(6)
]
```


## 本月的第一天和最后一天

```typescript 
moment().year(year).month(month-1).startOf('month').format('YYYY-MM-DD')
moment().year(year).month(month-1).endOf('month').format('YYYY-MM-DD')
```


## 多少天以前思路

```typescript 
export const createDateFromDaytoNow = (day:number=90)=>{
  if(day<=0) return {}
  let now = moment()
  const target =  now.subtract(day,'day')
  const nowDay = now.date()
  const targetDay = target.date()

  const data = []
  const diffMonth = now.startOf('month').diff(target.startOf('month'),'month')

  function getItem(beginDay,endDay){
    const allDays = []
    const yearMonth = now.format('YYYY年MM月')
    allDays.push('全部')
    for (let i = beginDay; i <= endDay; i++) {
      if (i < 10) {
        allDays.push(`0${i}`)
      } else {
        allDays.push(`${i}`)
      }
    }
    data.push({
      [yearMonth]: allDays,
    })
  }

  if(diffMonth !== 0){
   const monthArr =  _.range(1, diffMonth + 1)
    monthArr.map((value,index) => {
      if(index === 0 ){
        getItem(1,nowDay)
      }else if(index === monthArr.length-1){
        getItem(targetDay,now.daysInMonth())
      }else{
        getItem(1,now.daysInMonth())
      }
      now = now.subtract(1, 'month')
    })
  }else{
    getItem(targetDay,nowDay)
  }
  return data


}
```


# moment

[ Moment.js 中文网 | 开发文档  http://momentjs.cn/docs/#/manipulating/](http://momentjs.cn/docs/#/manipulating/ " Moment.js 中文网 | 开发文档  http://momentjs.cn/docs/#/manipulating/")

### **指定语言；不然可能引起一些不必要的bug。**

```javascript 
moment.locale('zh-cn');
```


### **获取时间戳**

```javascript 
# 精确到毫秒

moment().valueOf()
## 1584182611042 ；返回值为数值类型

moment().format('x') 
## 返回值为字符串类型


# 精确到秒 
moment().unix()
##  1584182618 精确到秒  返回值为数值类型
moment().format('X') 
##  返回值为字符串类型
```


### **生成指定时间的moment**

```javascript 
moment("1995-12-25");

# 带格式
# 解析器会忽略非字母和数字的字符，因此以下两个都将会返回相同的东西。
moment("12-25-1995", "MM-DD-YYYY");
moment("12/25/1995", "MM-DD-YYYY");
```


### **获取对象**

```javascript 
moment().toObject();
# 返回一个包括：年、月、日、时、分、秒、毫秒的对象
# {
    years: 2020
    months: 2
    date: 14
    hours: 18
    minutes: 47
    seconds: 56
    milliseconds: 526
}
```


### **格式化**

```javascript 
moment().format();
# 2020-03-14T19:14:05+08:00

moment().format('YYYY-MM-DD HH:mm:ss');
# 2020-03-14 19:23:29
```


### **获取时间**

```javascript 
# 获取今天0时0分0秒
moment().startOf('day')

# 获取本周第一天(周日)0时0分0秒
moment().startOf('week')

# 获取本周周一0时0分0秒
moment().startOf('isoWeek')

# 获取当前月第一天0时0分0秒
moment().startOf('month')

# 获取指定日期的0时0分0秒
moment('2019-10-20').startOf('day')

# 获取今天23时59分59秒
moment().endOf('day')

# 获取本周最后一天(周六)23时59分59秒
moment().endOf('week')

# 获取本周周日23时59分59秒
moment().endOf('isoWeek')

# 获取当前月最后一天23时59分59秒
moment().endOf('month')
```


### **获取当月第一天是星期几**

```javascript 
# 用于设置星期几，其中星期日为 0、星期六为 6
moment().startOf('month').day()
```


### **获取前n天 / 后n天**

```javascript 
moment().add(7, 'days');
moment().subtract(7, 'days')
```


### **比较两个时间的大小**

```javascript 
# 第二个参数用于确定精度，且不仅仅是要检查的单个值，因此使用 day 将会检查年份、月份、日期。

moment('2010-10-31').isBefore('2010-12-31', 'day');
# true

moment('2010-10-20').isBefore('2010-12-31', 'year');
# false

moment('2010-10-20').isAfter('2009-12-31', 'year'); 
# true

moment('2010-10-20').isSame('2009-12-31', 'year'); 
# 判断两个时间是否相等

# 需要注意的是， isBefore与isAfter 都是开区间，如果想使用闭区间，应使用
isSameOrBefore
isSameOrAfter
```


### **两个时间的相差几天**

```javascript 
moment([2008, 2, 27]).diff([2007, 0, 28], 'day');
# 424
```


### **是否是闰年**

```javascript 
moment().isLeapYear();
# true

moment([2001]).isLeapYear() 
# false
```


### **获取 月份和星期 枚举列表**

```javascript 
moment.months()

# ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

moment.monthsShort()
# ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

moment.weekdays()
# ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

moment.weekdaysMin()
# ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
```


### **克隆**

所有的 `moment` 都是可变的。 调用任何一种操作方法都会改变原始的 `moment`。 如果要创建副本并对其进行操作，则应在操作 `moment` 之前使用 `moment#clone`。

```javascript 
# 在 moment 上调用 moment() 将会克隆它。
var a = moment([2012]);
var b = moment(a);
a.year(2000);
b.year(); // 2012


# 此外，也可以调用 moment#clone 克隆 moment。
var a = moment([2012]);
var b = a.clone();
a.year(2000);
b.year(); // 2012
```


### **获取当月总天数**

```javascript 
moment().daysInMonth()
```
