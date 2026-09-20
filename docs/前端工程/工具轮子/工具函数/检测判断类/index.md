# 检测判断类

## 目录

- [获取手机型号和系统和平台](#获取手机型号和系统和平台)
- [检测两个dom节点是否覆盖重叠](#检测两个dom节点是否覆盖重叠)
- [判断是否是NodeJs环境](#判断是否是NodeJs环境)
- [判断标准浏览器环境](#判断标准浏览器环境)
- [判断类型集合](#判断类型集合)
- [判断是否工作日](#判断是否工作日)
- [判断两个对象是否键值相同](#判断两个对象是否键值相同)
- [检测设备类型](#检测设备类型)
- [判断 浏览器内置函数](#判断-浏览器内置函数)
- [判断数据是不是引用类型的数据 ](#判断数据是不是引用类型的数据-)
  - [是否为PC端](#是否为PC端)
  - [检查浏览器是否支持触摸事件 ](#检查浏览器是否支持触摸事件-)
    - [检查JSON字符串是否有效](#检查JSON字符串是否有效)
- [类型检测](#类型检测)
  - [数字型的字符串](#数字型的字符串)
- [检查 大小写 是否打开](#检查-大小写-是否打开)
- [检测黑暗模式](#检测黑暗模式)

#### **获取手机型号和系统**和平台

```typescript 
https://www.npmjs.com/package/mobile-detect    
npm install mobile-detect --save

Browser： var md = new MobileDetect(window.navigator.userAgent);
Node.js / Express： md = new MobileDetect(req.headers['user-agent']);

console.log( md.mobile() );          // 'Sony'
console.log( md.phone() );           // 'Sony'
console.log( md.tablet() );          // null
console.log( md.userAgent() );       // 'Safari'
console.log( md.os() );              // 'AndroidOS'
console.log( md.is('iPhone') );      // false
console.log( md.is('bot') );         // false
console.log( md.version('Webkit') );         // 534.3
console.log( md.versionStr('Build') );       // '4.1.A.0.562'
console.log( md.match('playstation|xbox') ); // false

https://www.jianshu.com/p/1cd82224f3bd

或者：常用的
判断业务是否是 iphone、华为、小米、oppo、view、三星 打开
function judgeBrand(sUserAgent) {
       var isIphone = sUserAgent.match(/iphone/i) == "iphone";
       var isHuawei = sUserAgent.match(/huawei/i) == "huawei";
       var isHonor = sUserAgent.match(/honor/i) == "honor";
       var isOppo = sUserAgent.match(/oppo/i) == "oppo";
       var isOppoR15 = sUserAgent.match(/pacm00/i) == "pacm00";
       var isVivo = sUserAgent.match(/vivo/i) == "vivo";
       var isXiaomi = sUserAgent.match(/mi\s/i) == "mi ";
       var isXiaomi2s = sUserAgent.match(/mix\s/i) == "mix ";
       var isRedmi = sUserAgent.match(/redmi/i) == "redmi";
       var isSamsung = sUserAgent.match(/sm-/i) == "sm-";


       if (isIphone) {
           return 'iphone';
       } else if (isHuawei || isHonor) {
           return 'huawei';
       } else if (isOppo || isOppoR15) {
           return 'oppo';
       } else if (isVivo) {
           return 'vivo';
       } else if (isXiaomi || isRedmi || isXiaomi2s) {
           return 'xiaomi';
       } else if (isSamsung) {
           return 'samsung';
       } else {
           return 'default';
       }
   }
   
   var brand = judgeBrand(navigator.userAgent.toLowerCase());

判断业务是否是 微信 打开
function isWeChat() {
        var ua = navigator.userAgent.toLowerCase();
        return (/micromessenger/.test(ua)) ? true : false;
    }
判断是在什么平台打开 pad 、pc 、mobile phone
function checkAgent() {
       var sUserAgent = navigator.userAgent.toLowerCase();
       var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
       var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
       var bIsMidp = sUserAgent.match(/midp/i) == "midp";
       var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
       var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
       var bIsAndroid = sUserAgent.match(/android/i) == "android";
       var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
       var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";


       if (!(bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM || bIsIpad)) {
           return 'pc';
       } else if(bIsIpad){
           return 'pad';
       }else{
           return 'phone';
       }
   }

手机品牌userAgent库 http://www.fynas.com/ua
```


#### 检测两个dom节点是否覆盖重叠

有些场景下我们需要判断dom是否发生碰撞了或者重叠了，我们可以通过**getBoundingClientRect**获取到dom的x1,y1,x2,y2坐标然后进行坐标比对即可判断出来

```javascript 
function overlaps = (a, b) {
   return (a.x1 < b.x2 && b.x1 < a.x2) || (a.y1 < b.y2 && b.y1 < a.y2);
}
```


#### 判断是否是NodeJs环境

前端的日常开发是离不开nodeJs的，通过判断全局环境来检测是否是nodeJs环境

```javascript 
function isNode(){
    return typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
}
```


### 判断标准浏览器环境

```typescript 
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}
```


# 判断类型集合

```javascript 
export const checkStr = (str, type) => {
        switch (type) {
            case 'phone': //手机号码
                return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
            case 'tel': //座机
                return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
            case 'card': //身份证
                return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
            case 'pwd': //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
                return /^[a-zA-Z]\w{5,17}$/.test(str)
            case 'postal': //邮政编码
                return /[1-9]\d{5}(?!\d)/.test(str);
            case 'QQ': //QQ号
                return /^[1-9][0-9]{4,9}$/.test(str);
            case 'email': //邮箱
                return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
            case 'money': //金额(小数点2位)
                return /^\d*(?:\.\d{0,2})?$/.test(str);
            case 'URL': //网址
                return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
            case 'IP': //IP
                return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
            case 'date': //日期时间
                return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
            case 'number': //数字
                return /^[0-9]$/.test(str);
            case 'english': //英文
                return /^[a-zA-Z]+$/.test(str);
            case 'chinese': //中文
                return /^[\\u4E00-\\u9FA5]+$/.test(str);
            case 'lower': //小写
                return /^[a-z]+$/.test(str);
            case 'upper': //大写
                return /^[A-Z]+$/.test(str);
            case 'HTML': //HTML标记
                return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
            default:
                return true;
        }
    }
```


# 判断是否工作日

```javascript 
export const isWeekday = (date) => date.getDay() % 6 !== 0;
console.log(isWeekday(new Date(2021, 0, 11))); 
```


# 判断两个对象是否键值相同

```javascript 
export const isObjectEqual = (a, b) => {
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);
  if (aProps.length !== bProps.length) {
    return false;
  }
  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];
    if (a[propName] !== b[propName]) {
      return false;
    }
  }
  return true;
}
```


# 检测设备类型

使用正则表达式来检测 navigator.userAgent 属性判断设备是在移动设备还是在台式机/笔记本电脑打开。

```javascript 
const detectDeviceType = () =>/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
```


# 判断 浏览器内置函数

内置函数toString后的主体代码块为 \[native code] ，而非内置函数则为相关代码，所以非内置函数可以进行拷贝(toString后掐头去尾再由Function转)

```javascript 
functionisNative(value) {
 return typeof value ==='function '&& /native code/.test(value.toString())
}
```


# 判断数据是不是引用类型的数据&#x20;

```javascript 
function isObject(value) {
  let type=typeof value; 
  return value !=null && (type=='object ' || type=='function');
}
```


## 是否为PC端

```javascript 
export const isPC = () => {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}
```


## 检查浏览器是否支持触摸事件&#x20;

```javascript 
const touchSupported = () => {
  ('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch);
}
console.log(touchSupported());
```


#### 检查JSON字符串是否有效

由于我在场边创建的大多数离线浏览器实用程序都需要用户上传数据文件，其中一些需要 JSON 格式，这是对 JSON 文件进行数据格式验证检查的简单直接的方法 是：

```javascript 
function isValidJSON(str) {
try {
JSON.parse(str);
return true;
  } catch (e) {
return false;
  }
}
// returns a Boolean

```


# 类型检测

```javascript 
// 提取原始数据类型
function typeTest(data, e) {  
  var n = Object.prototype.toString.call(data).substring(8).replace("]", "");//或者Object.prototype.toString.call(data).slice(8, -1)

  // [object String]  
  // String Number Boolean Function Null Undefined Object Array Date RegExp Error  Symbol PromiseSet  
  return e ? n === e : n
}

或者参考vue
const isArray = Array.isArray

const isString = (val) => typeof val === 'string'
const isSymbol = (val) => typeof val === 'symbol'

const toTypeString = (value) => Object.prototype.toString.call(value)
const isMap = (val) => toTypeString(val) === '[object Map]'
const isSet = (val) => toTypeString(val) === '[object Set]'
const isDate = (val) => toTypeString(val) === '[object Date]'
const isPromise = (val) => {  
    return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

// isPlainObject 判断是不是普通对象（排除正则、数组、日期、new Boolean、new Number、new String 这些特殊的对象）
function isPlainObject(val) {
  if (Object.prototype.toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}
const isObject = (val) => val !== null && typeof val === 'object'
isObject([]) // true
isPlainObject([]) // false

function isFunction(val) {
  return Object.prototype.toString.call(val) === '[object Function]';
}

function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

function isBlob(val) {
  return Object.prototype.toString.call(val) === '[object Blob]';
}


function isFile(val) {
  return Object.prototype.toString.call(val) === '[object File]';
}


function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

function isUndefined(val) {
  return typeof val === 'undefined';
}


// 先判断不是 `undefined`和`null`
// 再判断 `val`存在构造函数，因为`Buffer`本身是一个类
// 最后通过自身的`isBuffer`方法判断

function isBuffer(val) {
  return val !== null 
          && !isUndefined(val) 
          && val.constructor !== null 
          && !isUndefined(val.constructor)
          && typeof val.constructor.isBuffer === 'function' 
          && val.constructor.isBuffer(val);
}




var paramsString = "q=URLUtils.searchParams&topic=api"
var searchParams = new URLSearchParams(paramsString);

for (let p of searchParams) {
  console.log(p);
}

// 输出 
[ 'q', 'URLUtils.searchParams' ]
[ 'topic', 'api' ]

searchParams.has("topic") === true; // true
searchParams.get("topic") === "api"; // true
searchParams.getAll("topic"); // ["api"]
searchParams.get("foo") === null; // true
searchParams.append("topic", "webdev");
searchParams.toString(); // "q=URLUtils.searchParams&topic=api&topic=webdev"
searchParams.set("topic", "More webdev");
searchParams.toString(); // "q=URLUtils.searchParams&topic=More+webdev"
searchParams.delete("topic");
searchParams.toString(); // "q=URLUtils.searchParams"

```


## 数字型的字符串

```javascript 
const isString = (val) => typeof val === 'string'
    const isIntegerKey = (key) => isString(key) && key !== 'NaN' && key[0] !== '-' &&    '' + parseInt(key, 10) === key;
    // 例子:
    isIntegerKey('a'); // false
    isIntegerKey('0'); // true
    isIntegerKey('011'); // false
    isIntegerKey('11'); // true
    isIntegerKey('-11'); // false
    isIntegerKey(11); // false
    isIntegerKey('NaN'); // false
```


# **检查 大小写 是否打开**

```javascript 
//您可以使用 KeyboardEvent.getModifierState() 来检测是否 Caps Lock 打开。

const passwordInput = document.getElementById('password');
passwordInput.addEventListener('keyup', function (event) {
  if (event.getModifierState('CapsLock')) {
  
   }
});     

```


# 检测黑暗模式

随着黑暗模式的普及，如果用户在他们的设备中启用了黑暗模式，那么将你的应用程序切换到黑暗模式是非常理想的。幸运的是，可以利用媒体查询来使这项任务变得简单。

```javascript 
const isDarkMode = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches。
// 测试
console.log(isDarkMode())。

```


根据caniuse的数据，matchMedia的支持率为97.19%。
