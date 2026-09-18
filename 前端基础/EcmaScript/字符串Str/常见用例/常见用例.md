# 常见用例

## 目录

- [逗号，空格，换行符,空字符。 分割字符串](#逗号空格换行符空字符-分割字符串)
- [匹配连续字符串操作](#匹配连续字符串操作)
- [匹配第一位和最后一位](#匹配第一位和最后一位)
- [删除最后一个字符串](#删除最后一个字符串)
- [单行回文数检测](#单行回文数检测)
- [字符串陷阱](#字符串陷阱)

# 逗号，空格，换行符,空字符。 分割字符串

```javascript 
const filterOrder = (str)=>{
      return str.split(/[,，\s ]/g)
}
const str = filterOrder("123,\naa,,,,,\n\n\n\n\n1 24 34")

```


# 匹配连续字符串操作

- ( )和\number 配合使用表示重复正则第number个括号内匹配到的内容，如：(\d)\1表示重复第一个匹配块(\d)即等价于如果(\d)匹配到a，则表达式为aa&#x20;
- 相应的可以：(some)\1\* 或(some)\1+或(some)\1? 表示重复第一个匹配快得到的内容 任意次或者 至少一次或 一次or零次&#x20;

```javascript 
 // 替换连续 --
let shelves = 'asssg--agags-----dsgadg--sgdg-'
const dashP = new RegExp('(-)(\\1)+','g')
const str =  shelves.match(dashP);
for(var i = 0 ; i <str.length;i++){
  shelves = shelves.replace(str[i],'-')
}

//替换连续数字
var s = "1122333455";
   var s1 = s;
   var c;
   var cc = s.match(/(\d)\1+/g);    //11,22,333,55 当然这里用()\1*也会可以(因为下面是替换):11,22,333,4,55
   for(var i = 0;i<cc.length;i++){
       c = cc[i].substring(0,1);
       s1 = s1.replace(cc[i],c);
  }
  alert(s1);   //12345

// 替换连续字符
var s = "1234321abaccc";
 var s1 = s.split("").sort().join("");
 var cc = s1.match(/(.)\1+/g);    //11,22,33,aa,ccc 当然这里用()\1*也会可以(因为下面是替换):11,22,33,4,aa,b,ccc
 for(var i = 0;i<cc.length;i++){
     c = cc[i].substring(0,1);
     s1 = s1.replace(cc[i],c);
 }
alert(s1);    //1234abc
```


# 匹配第一位和最后一位

```javascript 
 s = s.replace(/^[-]/g,'')
s = s.replace(/[-]$/g,'')
```


# 删除最后一个字符串

```javascript 
var basic = "abc,def,ghi,";  

第一种
basic = basic.substr(0, basic.length - 1);  

第二种
basic = basic.substring(0, basic.length - 1);  

第三种
basic = basic.substring(0, basic.lastIndexOf(','));  

 

知识点：

1.substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符。

语法：stringObject.substr(start,length)

2.substring() 方法用于提取字符串中介于两个指定下标之间的字符。

语法：stringObject.substring(start,stop)

3.lastIndexOf() 方法可返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。

语法：stringObject.lastIndexOf(searchvalue,fromindex)
```


# 单行回文数检测

```javascript 
 function checkPalindrome(str) {
  return str == str.split('').reverse().join('');
}
checkPalindrome('naman');
// 输出: true
```


# **字符串陷阱**

```javascript 
function showCase(value) {
  switch(value) {
    case 'A':
      console.log('Case A');
      break;
    case 'B':
      console.log('Case B');
      break;
    case undefined:
      console.log('undefined');
      break;
    default:
      console.log('Do not know!');
  }
}
showCase(new String('A'));  //c
showCase(String('A'));   //a

// A. Case A
// B. Case B
// C. Do not know!
// D. undefined

```


在 switch 内部使用严格相等 === 进行判断，并且 new String("A") 返回的是一个对象，而 String("A") 则是直接返回字符串 "A"。你也可以参考MDN中对原始字符串和String对象的区分：
