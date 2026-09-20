# 业务工具类

## 目录

- [通过css检测系统的主题色从而全局修改样式](#通过css检测系统的主题色从而全局修改样式)
- [计算两个坐标之间的距离](#计算两个坐标之间的距离)
- [遍历对象或数组](#遍历对象或数组)
- [严格的身份证校验](#严格的身份证校验)
- [数组](#数组)
  - [类数组转为数组](#类数组转为数组)
  - [数组排序](#数组排序)
  - [去重](#去重)
  - [最大值](#最大值)
  - [最小值](#最小值)
  - [多维数组转一维数组](#多维数组转一维数组)
- [字符串](#字符串)
  - [trim 去除首尾空格](#trim-去除首尾空格)
  - [去除空格](#去除空格)
  - [字符大小写转换](#字符大小写转换)
  - [在字符串中插入新字符串](#在字符串中插入新字符串)
- [快速创建数字数组](#快速创建数字数组)
- [获取两个日期相差天数](#获取两个日期相差天数)
  - [异步上传多个文件](#异步上传多个文件)
- [复制到剪贴板](#复制到剪贴板)
- [判断是不是有变化](#判断是不是有变化)
- [禁止右键、选择、复制](#禁止右键选择复制)
- [利用performance.timing进行性能分析](#利用performancetiming进行性能分析)
- [requestAnimationFrame：](#requestAnimationFrame)
- [toFullScreen：全屏](#toFullScreen全屏)
- [exitFullscreen：退出全屏](#exitFullscreen退出全屏)

#### 通过css检测系统的主题色从而全局修改样式

```javascript 
//@media 的属性 prefers-color-scheme就可以知道当前的系统主题，当然使用前需要查查兼容性
@media (prefers-color-scheme: dark) { //... } 
@media (prefers-color-scheme: light) { //... }


window.addEventListener('theme-mode', event =>{ 
    if(event.mode == 'dark'){}
   if(event.mode == 'light'){} 
})

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => { 
    if (event.matches) {} // dark mode
})

```


#### 计算两个坐标之间的距离

```javascript 
function distance(p1, p2){
    return `Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}
```


### 遍历对象或数组

```typescript 
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *  用一个函数去迭代数组或对象
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 * 如果是数组，回调将会调用value, index, 和整个数组
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 * 如果是对象，回调将会调用value, key, 和整个对象
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
 
function forEach(obj, fn) {
  // Don't bother if no value provided
  // 如果值不存在，无需处理
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  // 如果不是对象类型，强制转成数组类型
  if (typeof obj !== 'object') {
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    // 是数组，for循环执行回调fn
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    // 是对象，for循环执行回调fn
    for (var key in obj) {
       // 只遍历可枚举属性
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
```


# 严格的身份证校验

```javascript 
export const isCardID = (sId) => {
  if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
    console.log('你输入的身份证长度或格式错误')
    return false
  }
  //身份证城市
  var aCity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
  if (!aCity[parseInt(sId.substr(0, 2))]) {
    console.log('你的身份证地区非法')
    return false
  }
  // 出生日期验证
  var sBirthday = (sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2))).replace(/-/g, "/"),
  d = new Date(sBirthday)
  if (sBirthday != (d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate())) {
    console.log('身份证上的出生日期非法')
    return false
  }
  // 身份证号码校验
  var sum = 0,
  weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
  codes = "10X98765432"
  for (var i = 0; i < sId.length - 1; i++) {
    sum += sId[i] * weights[i];
  }
  var last = codes[sum % 11]; 
  //计算出来的最后一位身份证号码
  if (sId[sId.length - 1] != last) {
    console.log('你输入的身份证号非法')
    return false
  }
  return true
}
```


# 数组

## 类数组转为数组

```javascript 
export const formArray = (ary) => {
  var arr = [];
  if (Array.isArray(ary)) {
    arr = ary;
  } else {
    arr = Array.prototype.slice.call(ary);
  };
  return arr;
}
```


## 数组排序

```javascript 
{type} 1：从小到大 2：从大到小 3：随机
export const sort = (arr, type = 1) => {
  return arr.sort((a, b) => {
          switch (type) {
            case 1:
              return a - b;
              break;
            case 2:
              return b - a;
              break;
            case 3:
              return Math.random() - 0.5;
              break;
            default:
              return arr;
          }
    })
}
```


## 去重

```javascript 
export const unique = (arr) => {
  if (Array.hasOwnProperty('from')) {
    return Array.from(new Set(arr));
  } else {
    var n = {}, r = [];
    for (var i = 0; i < arr.length; i++) {
      if (!n[arr[i]]) {
        n[arr[i]] = true;
        r.push(arr[i]);
      }
    }
    return r;
  }
}
```


## 最大值

```javascript 
export const max = (arr) => {
  return Math.max.apply(null, arr);
}
//或者
function max(arr){
    arr = arr.filter(item =>!_isNaN(item)) 
    return arr.length ?Math.max.apply(null, arr) :undefined
}
//max([1, 2, '11', null, 'fdf', []]) ==> 11
```


## 最小值

```javascript 
export const min = (arr) => {
  return Math.min.apply(null, arr);
}
function  min(arr){
  arr = arr.filter(item =>!_isNaN(item))
  return    arr.length ?Math.min.apply(null, arr) :undefined
}

//min([1, 2, '11', null, 'fdf', []]) ==> 1
```


## 多维数组转一维数组

```javascript 
//递归
const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));
deepFlatten([1, [2], [[3], 4], 5]); // [1,2,3,4,5]

//原生api
let data1 = [1, [2], [[3], 4], 5].flat(2)

// 这个地方通通都给转成字符串了
 let data3 = [1, [2], [[3], 4], 5].toString().split(',') 
 console.log(data3)
```


# 字符串

### `trim` 去除首尾空格

```typescript 
// `trim`方法不存在的话，用正则
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

```


## 去除空格

type: 1-所有空格 2-前后空格 3-前空格 4-后空格

```javascript 
export const trim = (str, type) => {
  type = type || 1
  switch (type) {
    case 1:
    return str.replace(/\s+/g, "");
  case 2:
    return str.replace(/(^\s*)|(\s*$)/g, "");
  case 3:
    return str.replace(/(^\s*)/g, "");
  case 4:
    return str.replace(/(\s*$)/g, "");
  default:
    return str;
  }
}

```


## 字符大小写转换

type: 1:首字母大写 2：首字母小写  3：大小写转换 4：全部大写 5：全部小写

```javascript 
export const changeCase = (str, type) => {
  type = type || 4
  switch (type) {
    case 1:
      return str.replace(/\b\w+\b/g, function (word) {
          return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
      });
    case 2:
      return str.replace(/\b\w+\b/g, function (word) {
        return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
      });
    case 3:
      return str.split('').map(function (word) {
        if (/[a-z]/.test(word)) {
          return word.toUpperCase();
        } else {
          return word.toLowerCase()
        }
      }).join('')
    case 4:
      return str.toUpperCase();
    case 5:
      return str.toLowerCase();
    default:
      return str;
  }
}
```


## 在字符串中插入新字符串

```javascript 
export const insertStr = (soure, index, newStr) => {
  var str = soure.slice(0, index) + newStr + soure.slice(index);
  return str;
}
```


# 快速创建数字数组

要创建一个数组并用数字填充它，索引为零：

```javascript 
const numArray = Array.from(new Array(10), (x, i)=> i);
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

```


# 获取两个日期相差天数

**注意：两个日期字符串或者实例 相减 是时间戳**

```javascript 
const getDaysDiffBetweenDates = (dateInitial, dateFinal) => (dateFinal - dateInitial) / (1000 * 3600 * 24);
getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9
```


#### **异步上传多个文件**

```javascript 
function readFileAsB64(file) {
return new Promise((resolve,reject) => {
let fileredr = new FileReader();
        fileredr.onload = () => resolve([fileredr.result, file.name]);
        fileredr.onerror = (err) => reject(err);
        fileredr.readAsDataURL(file);
    });
}
var uploadFile=document.getElementById('uploadFile'); // input[type='file']
uploadFile.addEventListener('change', (ev) => {  
if (!window.FileReader) {
        alert('Your browser does not support HTML5 "FileReader" function required to open a file.');
    } else {
let filesArr=ev.target.files;
let fileReaders=[];
for(let f in filesArr) {
if(!isNaN(f)) fileReaders.push(readFileAsB64(filesArr[f]))
      }
Promise.all(fileReaders).then((outputArrs) => {
for(let o in outputArrs) {
if(!isNaN(o)) {
let fileArr=outputArrs[o]; // [fileredr.result, file.name]
/* TO DO LOGIC HERE */
let image = new Image();
              image.src = fileArr[0];
              image.title = fileArr[1];
              image.height = 100;
document.body.appendChild(image);
            }
          }
      });
    }
});

```


上面的代码片段确保在浏览器继续执行注释后的代码逻辑之前，所有上传的图像文件都已编码为 Base64 字符串 (fileredr.readAsDataURL(file);)：

# **复制到剪贴板**

```javascript 

function copyToClipboard(text) {
    navigator.clipboard?.writeText && navigator.clipboard.writeText（text）
}

```


注意：根据caniuse，该方法对93.08%的全球用户有效。所以必须检查用户的浏览器是否支持该API。为了支持所有用户，你可以使用一个输入并复制其内容。

# 判断是不是有变化

```javascript 

const hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);// 示例
    hasChanged(1, 1); // false
    hasChanged(1, 2); // true
    hasChanged(+0, -0); // false
    hasChanged(NaN, NaN); // false
    // 场景：watch 监测值是不是变化了
    // 扩展 Object.is & ===
    Object.is(+0, -0); // false
    Object.is(NaN, NaN); // true
    +0 === -0 // true
    NaN === NaN // false

```


# 禁止右键、选择、复制

```javascript 
['contextmenu', 'selectstart', 'copy'].forEach(function (ev) {
    document.addEventListener(ev, function (event) {
        return event.returnValue = false
    })
});
```


# 利用performance.timing进行性能分析

详细可见前端性能监控

```javascript 
window.onload = function () {
        setTimeout(function () {
            let t = performance.timing
            console.log('DNS查询耗时 ：' + (t.domainLookupEnd - t.domainLookupStart).toFixed(0)) 
            console.log('TCP链接耗时 ：' + (t.connectEnd - t.connectStart).toFixed(0)) 
            console.log('request请求耗时 ：' +(t.responseEnd - t.responseStart).toFixed(0)) 
            console.log('解析dom树耗时 ：' + (t.domComplete - t.domInteractive).toFixed(0)) 
            console.log('白屏时间 ：' + (t.responseStart - t.navigationStart).toFixed(0)) 
            console.log('domready时间 ：' + (t.domContentLoadedEventEnd - t.navigationStart).toFixed(0)) 
            console.log('onload时间 ：' + (t.loadEventEnd - t.navigationStart).toFixed(0))
            if (t = performance.memory) {
                console.log('js内存使用占比 ：' + (t.usedJSHeapSize / t.totalJSHeapSize * 100).toFixed(2) + '%')
            }
        })
    }
```


# requestAnimationFrame：

window动画（特殊的定时器）

```javascript 
window.requestAnimationFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function (callback) {
            //为了使setTimteout的尽可能的接近每秒60帧的效果
            window.setTimeout(callback, 1000 / 60);
        };
    window.cancelAnimationFrame = window.cancelAnimationFrame ||
        Window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.msCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        function (id) {
            //为了使setTimteout的尽可能的接近每秒60帧的效果
            window.clearTimeout(id);
        }
```


# toFullScreen：全屏

```javascript 
function toFullScreen() {
        let elem = document.body;
        elem.webkitRequestFullScreen ?
            elem.webkitRequestFullScreen() :
            elem.mozRequestFullScreen ?
            elem.mozRequestFullScreen() :
            elem.msRequestFullscreen ?
            elem.msRequestFullscreen() :
            elem.requestFullScreen ?
            elem.requestFullScreen() :
            alert("浏览器不支持全屏");
    }
```


# exitFullscreen：退出全屏

```javascript 
function exitFullscreen() {
        let elem = parent.document;
        elem.webkitCancelFullScreen ?
            elem.webkitCancelFullScreen() :
            elem.mozCancelFullScreen ?
            elem.mozCancelFullScreen() :
            elem.cancelFullScreen ?
            elem.cancelFullScreen() :
            elem.msExitFullscreen ?
            elem.msExitFullscreen() :
            elem.exitFullscreen ?
            elem.exitFullscreen() :
            alert("切换失败,可尝试Esc退出");
    }
```
