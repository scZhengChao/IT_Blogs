# 用例

## 目录

- [警惕IEEE 754标准](#警惕IEEE-754标准)
- [并非都是奇偶](#并非都是奇偶)
- [加号 VS 减号](#加号-VS-减号)

# **警惕IEEE 754标准**

```javascript 
var two = 0.2;
var one = 0.1;
var eight = 0.8;
var six = 0.6;
[two - one == one, eight - six == two]

// A. [true, false]
// B. [false, false]
// C. [true, false]
// D. other

```


答案是C。JavaScript中采用双精度浮点数格式，即IEEE 754标准。在该格式下，有些数字无法表示出来，比如：0.1 + 0.2 = 0.30000000000000004 ，这不是JavaScript的锅，所有采用该标准的语言都有这个问题，比如：Java、Python等。

```javascript 
var a = 111111111111111110000;
var b = 1111;
console.log(a + b);

// A. 111111111111111111111
// B. 111111111111111110000
// C. NaN
// D. Infinity

```


答案是B。这是IEEE 754规范的黑锅，不是JavaScript的问题。表示这么大的数占用过多位数，会丢失精度，学过计算机组成原理的应该知道是怎么回事。

# **并非都是奇偶**

```javascript 
function isOdd(num) {
  return num % 2 == 1;
}

function isEven(num) {
  return num % 2 == 0;
}

function isSane(num) {
  return isEven(num) || isOdd(num);
}

var values = [7, 4, "13", -9, Infinity];
values.map(isSane);

// A. [true, true, true, true, true]
// B. [true, true, true, true, false]
// C. [true, true, true, false, false]
// D. [true, true, false, false, false]

```


答案是C。-9 % 2 = -1 以及 Infinity % 2 = NaN，求余运算符会保留符号，所以只有 isEven 的判断是可靠的。

# **加号 VS 减号**

```javascript 
'5' + 3;
'5' - 3;

// A. "53", 2
// B. 8, 2
// C. error
// D. other

```


答案是A。"5" + 2 = "52" 很好理解，+ 运算符中只要有一个是字符串，就会变成字符串拼接操作。你不知道的是，- 运算符要求两个操作数都是数字，如果不是，会强制转换成数字，所以结果就变成了 5 - 2 = 3。
