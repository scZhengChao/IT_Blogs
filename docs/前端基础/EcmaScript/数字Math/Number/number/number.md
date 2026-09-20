# number

## 目录

- [判断整数的不同方法](#判断整数的不同方法)
- [取商/取余](#取商取余)
- [parseInt整形](#parseInt整形)
- [ parseInt 遇上 map](#-parseInt-遇上-map)
- [Number](#Number)
- [MAX\_VALUE](#MAX_VALUE)
- [MIN\_VALUE](#MIN_VALUE)
- [parseFloat浮点
  ](#parseFloat浮点)
- [进制：](#进制)
  - [10进制转换成n进制  ](#10进制转换成n进制-)
  - [将n进制转换为10进制](#将n进制转换为10进制)
- [保留小数](#保留小数)
- [计算百分比](#计算百分比)
- [浮点操作](#浮点操作)
- [阿拉伯数字转 中文](#阿拉伯数字转中文)
- [死循环陷阱](#死循环陷阱)
  - [BigInt](#BigInt)

#### 判断整数的不同方法

```javascript 
/* 1.任何整数都会被1整除，即余数是0。利用这个规则来判断是否是整数。但是对字符串不准确 */
function isInteger(obj) {
 return obj%1 === 0
}

/* 1. 添加一个是数字的判断 */
function isInteger(obj) {
 return typeof obj === 'number' && obj%1 === 0
}

/* 2. 使用Math.round、Math.ceil、Math.floor判断 整数取整后还是等于自己。利用这个特性来判断是否是整数*/
function isInteger(obj) {
 return Math.floor(obj) === obj
}

/* 3. 通过parseInt判断 某些场景不准确 */
function isInteger(obj) {
 return parseInt(obj, 10) === obj
}

/* 4. 通过位运算符*/
function isInteger(obj) {
 return (obj | 0) === obj
}

/* 5.ES6提供了Number.isInteger */
Number(propKey) != NaN && Number.isInteger(Number(propKey))

```


# 取商/取余

```javascript 
var num = parseInt(4%3); //取余
console.log(num); //1

var num = 7/3; //取商
console.log(num); //2.33333

```


# parseInt整形

```javascript 
parseInt()  取整形
var x = 1.23 | 0;  // 1  取整操作也可以用按位操作. 因为按位操作只支持32位的整型，所以小数点部分全部都被抛弃
parseInt(0.00000000454);  // 4   parseInt 太小的数字会产生 bug
parseInt(10.23);          // 10

```


# \*\* parseInt 遇上 map\*\*​

```javascript 
["1", "2", "3"].map(parseInt)

// A. ["1", "2", "3"]
// B. [1, 2, 3]
// C. [0, 1, 2]
// D. other

```


答案是A。实际上返回的结果是 \[1, NaN, NaN] ，因为 parseInt 函数只需要两个参数 parseInt(value, radix) ，而 map 的回调函数需要三个参数 callback(currentValue, index, array)。

MDN文档中指明 parseInt 第二个参数是一个2到36之间的整数值，用于指定转换中采用的基数。如果省略该参数或其值为0，则数字将以10为基础来解析。如果该参数小于2或者大于36，则 parseInt 返回 NaN。此外，转换失败也会返回 NaN。

现在来分析问题。parseInt("1", 0) 的结果是当作十进制来解析，返回 1；parseInt("2", 1) 的第二个参数非法，返回 NaN；parseInt("3", 2) 在二进制中，"3" 是非法字符，转换失败，返回 NaN。

# Number

```javascript 
1 + null          // 1
1 + undefined     // NaN

Number(null)      // 0
Number(undefined) // NaN

Number()  鉴定数字
Number.isFinite() 用来检查一个数值是否为有限的（finite），即不是Infinity。 
Number.isInteger()  鉴定是不是整数：
Number.MAX_VALUE  JavaScript 中可表示的最大的数。它的近似值为 1.7976931348623157 x 10308
Number.isNaN()  判断NaN返回false 而不是true
Number.EPSILON //此属性表示两个可表示数字之间的最小间隔。  2.2204460492503130808472633361816E-16 或者 2^-52。



```


# MAX\_VALUE

```javascript 
最大安全整数  
Number.MAX_SAFE_INTEGER 2**53 - 1 // 9007199254740991
Number.MAX_SAFE_INTEGER === 2**53 - 1 // true
```


# MIN\_VALUE

```javascript 
Number.MIN_VALUE > 0

// A. false
// B. true
// C. error
// D. other

```


答案是B。看规范描述吧：

> MIN\_VALUE属性是 JavaScript 里最接近 0 的正值，而不是最小的负值。

> MIN\_VALUE的值约为 5e-324。小于 MIN\_VALUE &#x20;
> ("underflow values") 的值将会转换为 0。

> 因为 MIN\_VALUE是 Number 的一个静态属性，因此应该直接使用：Number.MIN\_VALUE，而不是作为一个创建的 Number实例的属性。

parseFloat浮点

```javascript 

parseFloat()  取浮点


```


# 进制：

```javascript 
二进制 0b

console.log(0b11) ==3 

八进制 0o

 console.log(0o11) == 9

```


### 10进制转换成n进制 &#x20;

n 为 2 8  16 32 

```javascript 
data.toString(n) 

data.toString(2) 
data.toString(16);
data.toString(8);
```


### 将n进制转换为10进制

```javascript 
num 为要转换的对象 
2 为 num 原本的进制

let n = parseInt(num,2)   
```


# 保留小数

```javascript 
const toFixed = (n, fixed) => ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed);   
  
或者 number.toFixed(4); 注意返回的是整数
```


# 计算百分比

```javascript 
 function getPercent(num, total) {
    num = parseFloat(num);
    total = parseFloat(total);
    if (isNaN(num) || isNaN(total)) {
      return "-";
    }
    return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00).toFixed(1)+"%";
}
```


# 浮点操作

```javascript 
0.3 - 0.2 !== 0.1  // true

浮点操作不精确，老生常谈了，不过可以接受误差

0.3 - 0.2 - 0.1 <= Number.EPSILON // true


```


# **阿拉伯数字转 中文**

```javascript 
      NumberToChinese(num){  
                var chnNumChar = ["零","一","二","三","四","五","六","七","八","九"];
                var chnUnitSection = ["","万","亿","万亿","亿亿"];
                var chnUnitChar = ["","十","百","千"];
                function SectionToChinese(section){
                    var strIns = '', chnStr = '';
                    var unitPos = 0;
                    var zero = true;
                    while(section > 0){
                        var v = section % 10;
                        if(v === 0){
                            if(!zero){
                                zero = true;
                                chnStr = chnNumChar[v] + chnStr;
                            }
                        }else{
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
                var strIns = '', chnStr = '';  
                var needZero = false;  
                
                if(num === 0){  
                    return chnNumChar[0];  
                }  
                
                while(num > 0){  
                    var section = num % 10000;  
                    if(needZero){  
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


# **死循环陷阱**

```javascript 
var END = Math.pow(2, 53);
var START = END - 100;
var count = 0;
for (var i = START; i <= END; i++) { 
  count++;
}
console.log(count);

// A. 0
// B. 100
// C. 101
// D. other
```


答案是D。在JavaScript中，2^53 是最大的值，没有比这更大的值了。所以 2^53 + 1 == 2^53，所以这个循环无法终止。

## BigInt

使用"BigInt"支持大数计算

JS中超过“Number.MAX\_SAFE\_INTEGER”的数字计算将是不安全的。

```javascript 
Math.pow(2, 53) === Math.pow(2, 53) + 1 // true
// Math.pow(2, 53) => 9007199254740992
// Math.pow(2, 53) + 1 => 9007199254740992

//使用"BigInt"完全可以避免这个问题
BigInt(Math.pow(2, 53)) === BigInt(Math.pow(2, 53)) + BigInt(1) // false

```
