# 解析转换类

## 目录

- [将阿拉伯数字翻译成中文的大写数字](#将阿拉伯数字翻译成中文的大写数字)
- [将数字转换为大写金额](#将数字转换为大写金额)
- [进制和RGB互转](#进制和RGB互转)
- [转换元素类型](#转换元素类型)
- [将数字转化为千分位格式](#将数字转化为千分位格式)
- [字符串首位大写](#字符串首位大写)
- [dateFormater：格式化时间](#dateFormater格式化时间)
- [将原始 HTML 字符串编码为 Unicode 实体](#将原始-HTML字符串编码为-Unicode-实体)
- [ 将 XML 转换为 JSON](#-将-XML-转换为-JSON)
- [URL 转换解析](#URL-转换解析)
  - [search 转 object](#search-转-object)
  - [object 转 search](#object-转-search)
  - [search 是否有改参数](#search-是否有改参数)
  - [追加url参数](#追加url参数)
- [驼峰字符串相互转化](#驼峰字符串相互转化)

# 将阿拉伯数字翻译成中文的大写数字

```javascript 
export const numberToChinese = (num) => {
  var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
  var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
  var a = ("" + num).replace(/(^0*)/g, "").split("."),
  k = 0,
  re = "";
  for (var i = a[0].length - 1; i >= 0; i--) {
    switch (k) {
      case 0:
        re = BB[7] + re;
        break;
      case 4:
        if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$").test(a[0]))re = BB[4] + re;
        break;
      case 8:
        re = BB[5] + re;
        BB[7] = BB[5];
        k = 0;
        break;
    }
    if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;
    if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
    k++;
  }
  if (a.length > 1) {
    // 加上小数部分(如果有小数部分)
    re += BB[6];
    for (var i = 0; i < a[1].length; i++)
      re += AA[a[1].charAt(i)];
    }
    if (re == '一十') re = "十";
    if (re.match(/^一/) && re.length == 3)  re = re.replace("一", "");
    return re;
  }

//或者
NumberToChinese(num) {
        var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
        var chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
        var chnUnitChar = ["", "十", "百", "千"];
        function SectionToChinese(section) {
            var strIns = '',
                chnStr = '';
            var unitPos = 0;
            var zero = true;
            while (section > 0) {
                var v = section % 10;
                if (v === 0) {
                    if (!zero) {
                        zero = true;
                        chnStr = chnNumChar[v] + chnStr;
                    }
                } else {
                    zero = false;
                    strIns = chnNumChar[v];
                    strIns += chnUnitChar[unitPos];
                    chnStr = strIns + chnStr;
                }
                unitPos++;
                section = Math.floor(section / 10);
            }
            return chnStr;
        }
        var unitPos = 0;
        var strIns = '',
            chnStr = '';
        var needZero = false;
        if (num === 0) {
            return chnNumChar[0];
        }
        while (num > 0) {
            var section = num % 10000;
            if (needZero) {
                chnStr = chnNumChar[0] + chnStr;
            }
            strIns = SectionToChinese(section);
            strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
            chnStr = strIns + chnStr;
            needZero = (section < 1000) && (section > 0);
            num = Math.floor(num / 10000);
            unitPos++;
        }
        return chnStr;
    }
```


# 将数字转换为大写金额

```javascript 
export const changeToChinese = (Num) => {
        //判断如果传递进来的不是字符的话转换为字符
        if (typeof Num == "number") {
            Num = new String(Num);
        };
        Num = Num.replace(/,/g, "") //替换tomoney()中的“,”
        Num = Num.replace(/ /g, "") //替换tomoney()中的空格
        Num = Num.replace(/￥/g, "") //替换掉可能出现的￥字符
        if (isNaN(Num)) { //验证输入的字符是否为数字
            //alert("请检查小写金额是否正确");
            return "";
        };
        //字符处理完毕后开始转换，采用前后两部分分别转换
        var part = String(Num).split(".");
        var newchar = "";
        //小数点前进行转化
        for (var i = part[0].length - 1; i >= 0; i--) {
            if (part[0].length > 10) {
                return "";
                //若数量超过拾亿单位，提示
            }
            var tmpnewchar = ""
            var perchar = part[0].charAt(i);
            switch (perchar) {
                case "0":
                    tmpnewchar = "零" + tmpnewchar;
                    break;
                case "1":
                    tmpnewchar = "壹" + tmpnewchar;
                    break;
                case "2":
                    tmpnewchar = "贰" + tmpnewchar;
                    break;
                case "3":
                    tmpnewchar = "叁" + tmpnewchar;
                    break;
                case "4":
                    tmpnewchar = "肆" + tmpnewchar;
                    break;
                case "5":
                    tmpnewchar = "伍" + tmpnewchar;
                    break;
                case "6":
                    tmpnewchar = "陆" + tmpnewchar;
                    break;
                case "7":
                    tmpnewchar = "柒" + tmpnewchar;
                    break;
                case "8":
                    tmpnewchar = "捌" + tmpnewchar;
                    break;
                case "9":
                    tmpnewchar = "玖" + tmpnewchar;
                    break;
            }
            switch (part[0].length - i - 1) {
                case 0:
                    tmpnewchar = tmpnewchar + "元";
                    break;
                case 1:
                    if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
                    break;
                case 2:
                    if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
                    break;
                case 3:
                    if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
                    break;
                case 4:
                    tmpnewchar = tmpnewchar + "万";
                    break;
                case 5:
                    if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
                    break;
                case 6:
                    if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
                    break;
                case 7:
                    if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
                    break;
                case 8:
                    tmpnewchar = tmpnewchar + "亿";
                    break;
                case 9:
                    tmpnewchar = tmpnewchar + "拾";
                    break;
            }
            var newchar = tmpnewchar + newchar;
        }
        //小数点之后进行转化
        if (Num.indexOf(".") != -1) {
            if (part[1].length > 2) {
                // alert("小数点之后只能保留两位,系统将自动截断");
                part[1] = part[1].substr(0, 2)
            }
            for (i = 0; i < part[1].length; i++) {
                tmpnewchar = ""
                perchar = part[1].charAt(i)
                switch (perchar) {
                    case "0":
                        tmpnewchar = "零" + tmpnewchar;
                        break;
                    case "1":
                        tmpnewchar = "壹" + tmpnewchar;
                        break;
                    case "2":
                        tmpnewchar = "贰" + tmpnewchar;
                        break;
                    case "3":
                        tmpnewchar = "叁" + tmpnewchar;
                        break;
                    case "4":
                        tmpnewchar = "肆" + tmpnewchar;
                        break;
                    case "5":
                        tmpnewchar = "伍" + tmpnewchar;
                        break;
                    case "6":
                        tmpnewchar = "陆" + tmpnewchar;
                        break;
                    case "7":
                        tmpnewchar = "柒" + tmpnewchar;
                        break;
                    case "8":
                        tmpnewchar = "捌" + tmpnewchar;
                        break;
                    case "9":
                        tmpnewchar = "玖" + tmpnewchar;
                        break;
                }
                if (i == 0) tmpnewchar = tmpnewchar + "角";
                if (i == 1) tmpnewchar = tmpnewchar + "分";
                newchar = newchar + tmpnewchar;
            }
        }

        //替换所有无用汉字
        while (newchar.search("零零") != -1)
            newchar = newchar.replace("零零", "零");
            newchar = newchar.replace("零亿", "亿");
            newchar = newchar.replace("亿万", "亿");
            newchar = newchar.replace("零万", "万");
            newchar = newchar.replace("零元", "元");
            newchar = newchar.replace("零角", "");
            newchar = newchar.replace("零分", "");
        if (newchar.charAt(newchar.length - 1) == "元") {
            newchar = newchar + "整"
        }
        return newchar;
    }
```


# 进制和RGB互转

```javascript 
//16进制 颜色转 RGB进制颜色
export const colorToRGB = (val, opa) => {
  var pattern = /^(#?)[a-fA-F0-9]{6}$/; 
  //16进制颜色值校验规则
  var isOpa = typeof opa == 'number'; 
  //判断是否有设置不透明度
  if (!pattern.test(val)) { 
    //如果值不符合规则返回空字符
    return '';
  }
  var v = val.replace(/#/, ''); 
  //如果有#号先去除#号
  var rgbArr = [];
  var rgbStr = '';
  for (var i = 0; i < 3; i++) {
    var item = v.substring(i * 2, i * 2 + 2);
    var num = parseInt(item, 16);
    rgbArr.push(num);
  }
  rgbStr = rgbArr.join();
  rgbStr = 'rgb' + (isOpa ? 'a' : '') + '(' + rgbStr + (isOpa ? ',' + opa : '') + ')';
  return rgbStr;
}

//RGB 颜色转 16进制颜色 
const RGBToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');  
RGBToHex(255, 165, 1); // 'ffa501'
```


# 转换元素类型

```javascript 
//要将Number元素转换为String元素：
const stringArray = numberArray.map(String);
const stringArray = [1, 2, 3].map(String);
["1", "2", "3"]
//如果数组包含字符串，字符串原样保留。 这也可以用于将String元素转换为Number类型：

const numberArray = stringArray.map(Number);
const stringArray = ["1", "2", "3"].map(String);
[1, 2, 3]
```


# 将数字转化为千分位格式

```javascript 
const toDecimalMark = num => num.toLocaleString('en-US');
toDecimalMark(12305030388.9087); // "12,305,030,388.909"

//或者
function thousands(num){
    var str = num.toString();
    var reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
    return str.replace(reg,"$1,");
}
console.log(thousands('243124124124.15412'))
```


# 字符串首位大写

```javascript 
function capitalize(str){
  return str.charAt(0).toUpperCase() + str.slice(1)
}
// abc ==> Abc
```


# dateFormater：格式化时间

```javascript 
function dateFormater(formater, t) {
        let date = t ? newDate(t) : newDate(),
            Y = date.getFullYear() + '',
            M = date.getMonth() + 1,
            D = date.getDate(),
            H = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds();
        return formater.replace(/YYYY|yyyy/g, Y)
            .replace(/YY|yy/g, Y.substr(2, 2))
            .replace(/MM/g, (M < 10 ? '0' : '') + M)
            .replace(/DD/g, (D < 10 ? '0' : '') + D)
            .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
            .replace(/mm/g, (m < 10 ? '0' : '') + m)
            .replace(/ss/g, (s < 10 ? '0' : '') + s)
    }
// dateFormater('YYYY-MM-DD HH:mm', t) ==> 2019-06-26 18:30
// dateFormater('YYYYMMDDHHmm', t) ==> 201906261830
```


# **将原始 HTML 字符串编码为 Unicode 实体**

```javascript 
function encodeHTMLChars(rawStr) {
  return rawStr.replace(/[\u00A0-\u9999<>\&]/g, ((i) => `&#${i.charCodeAt(0)};`));
}

```


# &#x20;**将 XML 转换为 JSON**

使用率最低的 2 个 JavaScript API 包括：**DOMParser() 和 DOMParser.parseFromString()**

尽管 xml-js 和 xml2js 等 npm 包很容易获得，但这个逻辑可以通过纯 JavaScript 实现，如下所示：

```javascript 
function convertXMLtoJSON(xmlObj) { // adapted from https://davidwalsh.name/convert-xml-json
var obj = {};
if (xmlObj.nodeType == 1) {
if (xmlObj.attributes.length > 0) {
            obj['@attributes'] = {};
for (var j = 0; j < xmlObj.attributes.length; j++) {
var attribute = xmlObj.attributes.item(j);
                obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xmlObj.nodeType == 3) {
        obj = xmlObj.nodeValue;
    }
// Iterate through all child nodes
// Use recursive to assign nested nodes
if (xmlObj.hasChildNodes()) {
for(var i = 0; i < xmlObj.childNodes.length; i++) {
var item = xmlObj.childNodes.item(i);
var nodeName = item.nodeName;
if (typeof(obj[nodeName])==='undefined') {
                obj[nodeName] = convertXMLtoJSON(item);
            } else {
if (typeof(obj[nodeName].push)==='undefined') {
var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(convertXMLtoJSON(item));
            }
        }
    }
return obj;
}
/* USAGE: Sample xmlText */
var xmlText = '<bookstore><book>' +
'<title>Everyday Italian</title>' +
'<author>Giada De Laurentiis</author>' +
'<year>2005</year>' +
'</book></bookstore>';
var xmlParser=new DOMParser();
var xmlObj=xmlParser.parseFromString(xmlText, 'text/xml');
var jsonObj=convertXMLtoJSON(xmlObj);
console.log(jsonObj);
// Output: {"bookstore":{"book":{"title":{"#text":"Everyday Italian"},"author":{"#text":"Giada De Laurentiis"},"year":{"#text":"2005"}}}}
```


# URL 转换解析

## search 转 object

1. replace&#x20;

```javascript 
const q = {};

let url = 'https://www.taobao.com/detail?a=4&b=2&c=' 

let urlOri = new URL(url)

location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);console.log(q);
```


```javascript 
const searchObj = search =>{
        let json =  `{"${decodeURIComponent(search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`
        return JSON.parse(json)
    }
searchObj(search)

```


## object 转 search

```javascript 
const objectToQueryString = (obj) => Object.keys(obj).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');
// name=Jhon&age=18&address=beijing
```


## search 是否有改参数

```javascript 
export const getQueryString = (name) => {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    const search = window.location.search.split('?')[1] || '';
    const r = search.match(reg) || [];
    return r[2];
}
```


## 追加url参数

```javascript 
const appendQuery = (url, params) => {
    if(Object.prototype.toString.call(params).slice(8,-1) === 'Object'){
        const objectToQueryString = (obj) => Object.keys(obj).map((key) =>`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');
        let options = objectToQueryString(params)
        url.includes('?')? url+= '&' + options:url += '?' + options
    }
    return url;
}
let url = 'https://www.taobao.com/detail'
let nUrl = appendQuery(url,{a:1,b:2})
console.log(nUrl)
```


# 驼峰字符串相互转化

转换驼峰拼写的字符串为特定格式。

使用 String.replace() 去除下划线，连字符和空格，并将驼峰拼写格式的单词转换为全小写。

省略第二个参数 separator ，默认使用 \_ 分隔符。

```javascript 
const fromCamelCase = (str, separator = '_') => str.replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2').replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2').toLowerCase();

fromCamelCase('someDatabaseFieldName',' '); // 'some database field name'

fromCamelCase('someLabelThatNeedsToBeCamelized', '-'); // 'some-label-that-needs-to-be-camelized'

fromCamelCase('someJavascriptProperty', '_'); // 'some_javascript_property'
```


横线转驼峰命名

```javascript 
let camelizeRE = /-(\w)/g;
function camelize(str) {
    return str.replace(camelizeRE, function (_, c) {
        return c ? c.toUpperCase() : '';
    })
}
let str = camelize('ab-cd-ef')
//ab-cd-ef ==> abCdEf
```
