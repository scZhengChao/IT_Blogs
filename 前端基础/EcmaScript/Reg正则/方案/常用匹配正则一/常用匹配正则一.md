# 常用匹配正则一

## 目录

- [手机号：](#手机号)
  - [ 匹配手机号码](#-匹配手机号码)
- [简单网址：](#简单网址)
- [中文监测：](#中文监测)
- [千分位转化](#千分位转化)
- [身份证正则](#身份证正则)
- [检测设备类型](#检测设备类型)
- [时间处理   ](#时间处理)
- [解析cookie；](#解析cookie)
- [数字中文字母](#数字中文字母)
- [匹配电子邮件](#匹配电子邮件)
- [正常数字或者空](#正常数字或者空)
- [解析url](#解析url)
- [驼峰式字符串](#驼峰式字符串)
- [首字母小写转大写](#首字母小写转大写)
- [HTML转义防止XSS](#HTML转义防止XSS)
- [获取网页图片地址](#获取网页图片地址)
- [格式化电话号码](#格式化电话号码)

# 手机号：

- /^1(\[38]\[0-9]|4\[579]|5\[0-3,5-9]|6\[6]|7\[0135678]|9\[89])\d{8}\$/
- /^(13\[0-9]|14\[01456879]|15\[0-3,5-9]|16\[2567]|17\[0-8]|18\[0-9]|19\[0-3,5-9])\d{8}\$/

## \*\* 匹配手机号码\*\*​

我们先从比较简单的匹配手机号码开始。目前国内的手机号码是1(3/4/5/7/8)开头的 11 位数字，因此手机号码的正则可以分解为以下几部分：&#x20;

1. 以 1 开头：/^1/
2. 第 2 位为3、4、5、7、8中的一个：/\[34578]/ 或 /(3|4|5|7|8)/
3. 剩余 3-11 位均为数字，并以数字结尾：/\d{9}\$/
4. 组合起来即为 /^1\[34578]\d{9}\$/ 或 /^1(3|4|5|7|8)\d{9}\$/，因为使用捕获括号存在性能损失，所以推荐使用第一种写法。&#x20;

# 简单网址：

- var reg =/^(https?://)?(\[\da-z.-]+).(\[a-z.]{2,6})(\[/\w\.-] *)*/?\$/

# 中文监测：

```javascript 
  var str = '我从哪里来，我是谁，要到哪里去'
var reg = /^[\u2E80-\u9FFF]+$/
var reg1 = /[\u2E80-\u9FFF]/g
var reg2 = /[\u2E80-\u9FFF]/
匹配中文 ： [\u4e00-\u9fff]
    console.log( reg.test(str) )
    console.log(reg1.test(str))
    console.log(reg2.test(str))
    console.log( str.match(reg1) )
    onsole.log( str.match(reg2) )
    onsole.log(str)
```


# 千分位转化

```javascript 
一：
let  str = '12305030388.9087'
const formatMoney = (money) => {
    return money.replace(new RegExp(`(?!^)(?=(\\d{3})+${money.includes('.') ? '\\.' : '$'})`, 'g'), ',')
}
console.log(formatMoney(str))

二：
//或者  将数字转化为千分位格式
const toDecimalMark = num => num.toLocaleString('en-US');
toDecimalMark(12305030388.9087); // "12,305,030,388.909"
```


# 身份证正则

```javascript 
 const IDReg= /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/;
```


# 检测设备类型

```javascript 
 const detectDeviceType = () =>/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
```


# 时间处理   

```javascript 
 正则表达式y+
    export function dateFormat (value,fmt){
        if(!value) return
        const getDate = new Date(value)
        var o = {
            "M+" :this.getMonth()+1,//月份
            "d+" :this.getDate(),//日
            "h+" :this.getHours(),//小时
            "m+" :this.getMinutes(),//分
            "s+" :this.getSeconds(),//秒
            "q+" :Math.floor((this.getMonth()+3)/3),//季度
            "S" :this.getMilliseconds() //毫秒
        };
        if(/(y+)/.test(fmt)) {    //匹配年份  RegExp.$1匹配以()为标志的正则
            fmt=fmt.replace(RegExp.$1,(this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for(var k in o) {   //判断o中的 k值 是否匹配到
            if(new RegExp("("+ k +")").test(fmt))
            // 补零操作
            fmt = fmt.replace(RegExp.$1,(RegExp.$1.length==1) (o[k]) :(("00"+ o[k]).substr((""+ o[k]).length)));
        }
    return fmt;
    }
```


# 解析cookie；

```javascript 
  sessionKey 为key   
 const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)     
```


# 数字中文字母

```javascript 
 const pattern = new RegExp('[^0-9a-zA-Z\u4e00-\u9fff]','g')
```


# **匹配电子邮件**

标准的电子邮件组成为 \<yourname>@\<domain>.\<extension>\<optional-extension>，&#x20;

每部分的格式标准为（进行了相应的简化，主要为展示如何书写正则）：&#x20;

1. yourname：任意英文字母（a-z/A-Z）、数字（0-9）、下划线（ \_）、英文句点（.）、连字符（-），长度大于 0
2. domain：任意英文字母（a-z/A-Z）、数字（0-9）、连字符（-），长度大于 0
3. extension：任意英文字母（a-z/A-Z），长度 2-8
4. optional-extension："."开头，后面跟任意英文字母（a-z/A-Z），长度 2-8，可选

每部分的正则表达式为：&#x20;

1. yourname：/\[a-z\d. \_-]+/
2. domain：/\[a-z\d-]+/
3. extension： /\[a-z]{2,8}/
4. optional-extension：/(\\.\[a-z]{2,8})?/

组合起来形成最后的正则表达式：/^(\[a-z\d. \_-]+)@(\[a-z\d-]+).(\[a-z]{2,8})(.\[a-z]{2,8})?$/；为了增加可读性可以将每部分用"()"包起来，并不要忘记起始和结束符 ^$。

# 正常数字或者空

```javascript 
if(/(^$)|(^[1-9][0-9]*$)/g.test(value)){
    // do something
}
```


# 解析url

```javascript 
public getQueryString= (url, key)=>{
  const reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i")
  const value = url.split('?')[1].match(reg)
  if (value !== null) return unescape(value[2])
  return null
}
//http://app.zhongwuyun.com/?m=12462006&p=x12rrshs
const printNumber = this.getQueryString(data, 'm')
const printSecretKey = this.getQueryString(data, 'p')

或者

const getQueryByName = (name) => {
  const queryNameRegex = new RegExp(`[?&]${name}=([^&]*)(&|$)`)
  const queryNameMatch = window.location.search.match(queryNameRegex)
  // Generally, it will be decoded by decodeURIComponent
  return queryNameMatch ? decodeURIComponent(queryNameMatch[1]) : ''
}

const name = getQueryByName('name')
const age = getQueryByName('age')

console.log(name, age) // fatfish, 100


```


# **驼峰式字符串**

JS 变量最好用 camelCase 编写，让我们看看如何编写一个将其他大小写格式转换为 camelCase 的函数。

```javascript 

const camelCase = (string) => {
  const camelCaseRegex = /[-_\s]+(.)?/g
  return string.replace(camelCaseRegex, (match, char) => {
    return char ? char.toUpperCase() : ''
  })
}

console.log(camelCase('foo Bar')) // fooBar
console.log(camelCase('foo-bar--')) // fooBar
console.log(camelCase('foo_bar__')) // fooBar

```


# 首字母小写转大写

```javascript 
const capitalize = (string) => {
  const capitalizeRegex = /(?:^|\s+)\w/g
  return string.toLowerCase().replace(capitalizeRegex, (match) => match.toUpperCase())
}

console.log(capitalize('hello world')) // Hello World
console.log(capitalize('hello WORLD')) // Hello World

```


# **HTML转义**防止XSS

```javascript 
const escape = (string) => {
  const escapeMaps = {
    '&': 'amp',
    '<': 'lt',
    '>': 'gt',
    '"': 'quot',
    "'": '#39'
  }
  // The effect here is the same as that of /[&amp;<> "']/g
  const escapeRegexp = new RegExp(`[${Object.keys(escapeMaps).join('')}]`, 'g')
  return string.replace(escapeRegexp, (match) => `&${escapeMaps[match]};`)
}

console.log(escape(`
  <div>
    <p>hello world</p>
  </div>
`))
/*
&lt;div&gt;
  &lt;p&gt;hello world&lt;/p&gt;
&lt;/div&gt;
*/



//逆向
const unescape = (string) => {
  const unescapeMaps = {
    'amp': '&',
    'lt': '<',
    'gt': '>',
    'quot': '"',
    '#39': "'"
  }
  const unescapeRegexp = /&([^;]+);/g
  return string.replace(unescapeRegexp, (match, unescapeKey) => {
    return unescapeMaps[ unescapeKey ] || match
  })
}

console.log(unescape(`
  &lt;div&gt;
    &lt;p&gt;hello world&lt;/p&gt;
  &lt;/div&gt;
`))
/*
<div>
  <p>hello world</p>
</div>
*/


```


# **获取网页图片地址**

```javascript 
const matchImgs = (sHtml) => {
  const imgUrlRegex = /<img[^>]+src="((?:https?:)?\/\/[^"]+)"[^>]*?>/gi
  let matchImgUrls = []
  
  sHtml.replace(imgUrlRegex, (match, $1) => {
    $1 && matchImgUrls.push($1)
  })
  return matchImgUrls
}

console.log(matchImgs(document.body.innerHTML))

```


# **格式化电话号码**

```javascript 
let mobile = '18379836654'  
let mobileReg = /(?=(\d{4})+$)/g   console.log(mobile.replace(mobileReg, '-')) // 183-7983-6654
```
