# api

## 目录

- [重复](#重复)
- [转大写](#转大写)
- [输出字符](#输出字符)
- [查找](#查找)
- [补全字符窜](#补全字符窜)
- [遍历字符串](#遍历字符串)
- [转化为数组](#转化为数组)
- [排序localeCompare](#排序localeCompare)
- [去空格](#去空格)
- [替换：](#替换)
- [对象隐式转换字符串](#对象隐式转换字符串)
- [截取](#截取)

[**http://www.w3school.com.cn/jsref/jsref\_obj\_string.asp**](http://www.w3school.com.cn/jsref/jsref_obj_string.asp "http://www.w3school.com.cn/jsref/jsref_obj_string.asp")

**字符串的api**

[http://www.w3school.com.cn/jsref/jsref\_obj\_string.asp](http://www.w3school.com.cn/jsref/jsref_obj_string.asp "http://www.w3school.com.cn/jsref/jsref_obj_string.asp")

\*\*replace 深解: \*\*​

[https://www.cnblogs.com/lifeidg/p/10316450.html](https://www.cnblogs.com/lifeidg/p/10316450.html "https://www.cnblogs.com/lifeidg/p/10316450.html")

# 重复

```javascript 
str.repeat(5) -->重复打印5次;
```


# 转大写

```javascript 
str.concat(str2)  拼接
str.toUpperCase()  转大写 
str.toLowerCase()   转小写


```


# 输出字符

```javascript 
str.charAt(index)   //将索引值对应的字符输出
str.charCodeAt(index)   将索引值对应的字符的ascii输出(同样是将字节转换为二进制)
String.fromCharCode(ascii)  返回ascii码对应的字符

```


# 查找

```javascript 
  str.indexOf/startsWith/endsWith/includes  +('abc',num)  //--->从第num位开始找abc;
  str.lastIndexOf('asf',2)    返回索引  从index==2 开始找，如果不输入2，就从最后一位开始找
  
  str.indexof('af')     返回索引  找到第一个就停止了
  str.includes('a')  返回true 或者false
  str[1]

```


# 补全字符窜

padStart()和padStart()

一共接受两个参数，

第一个参数用来指定字符串的最小长度，

第二个参数是用来补全的字符串。等于或大于指定的最小长度，则返回原字符串

```javascript 
     'x'.padEnd(4, 'ab') // 'xaba'
    'x'.padStart(4, 'ab') // 'abax'
    //如果省略第二个参数，默认使用空格补全长度。

//常见用法：
    '1'.padStart(10, '0') // "0000000001"
    '12'.padStart(10, '0') // "0000000012"
    '123456'.padStart(10, '0') // "0000123456"
    '12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
    '09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```


# 遍历字符串

```javascript 
 for(let value of  'hello'){
    //遍历字符串
}
```


# 转化为数组

```javascript 
str.split(' ')   //将字符串以' ' 里的为分隔,装换成数组,' ' 里的字符交给消失
//或者
// 将字符串转化为数组:
[...'hello'] = ['h','e','l','l','o']

```


# 排序localeCompare

要以本地特定的顺序与 stringObject 进行比较的字符串。

```javascript 
 let arr = ['赵','钱','孙','李']
arr.sort (function(a,b){return a.localeCompare(b)})
console.log(arr)
// (4)  ["李", "钱", "孙", "赵"]
```


# 去空格

```javascript 
  str.trim()    // 前后空格
 String.prototype.trimStart(） // 前空格
 String.prototype.trimEnd()   // 后空格
```


# 替换：

为了方便字符串的全局替换，ES2021将支持String.prototype.replaceAll()方法，可以不用写正则表达式就可以完成字符串的全局替换

```javascript 
'abc111'.replaceAll('1', '2'); // abc222
str.replace('str',abc) , // 只会替换第一个    var newstr = str.replace(/ttt/g,',')  正则全局

```


# 对象隐式转换字符串

```javascript 
const x = {
  value: 0,
  toString() {
    return ++this.value;
  }
}

x == 1 && x == 2 && x == 3;    // true

```


# 截取

```javascript 
string.substr(start,length)
string.substring(from, to)

str.substring(n,m)   返回截取值,包括n,但不包括m，只有一个值的时候，就是截取到末尾
str.slice(1,2)   // 返回截取值, 不改变原str (全部都是包括第一个, 不包括第二个)  不传就截取到最后
str.substr(n,m)  截取,从n开始,截取m个     返回截取值  不改变原值  (第一个参数可以数负数)


```
