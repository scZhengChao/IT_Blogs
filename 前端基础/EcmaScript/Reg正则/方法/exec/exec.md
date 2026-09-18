# exec

## 目录

- [exec](#exec)
  - [非全局匹配模式](#非全局匹配模式)
  - [全局模式下g](#全局模式下g)
- [解释二](#解释二)

## exec

![](https://mmbiz.qpic.cn/mmbiz_png/sticlevzdTIBQ2CZufZoqll1Fabz1wR3g9RItsHycyKrWsiaMBR4BiaX7zg6jEf42vagW3Jia622QfGJDlamRicCCAA/640?wx_fmt=png\&wxfrom=5\&wx_lazy=1\&wx_co=1)

该方法用于检测字符串中对正则表达式的匹配。**该函数返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null。**

除了正则自身携带的方法，配合 **String 对象**的方法一起使用也会有额外的效果。

### **非全局匹配模式**

**在非全局匹配模式下**\*\*  和str.match() 非常相似;\*\* 此函数的作用和match()函数是一样的，只能够在字符串中匹配一次，如果没有找到匹配的字符串，那么返回null，**否则将返回一个数组，**

- **数组的第0个元素存储的是匹配字符串，**
- **第1个元素存放的是第一个引用型分组(子表达式)匹配的字符串，**
- **第2个元素存放的是第二个引用型分组(子表达式)匹配的字符串，依次类推。**

&#x20; 同时此数组还包括两个对象属性:&#x20;

- index属性声明的是匹配字符串的起始字符在要匹配的完整字符串中的位置，
- input属性声明的是对要匹配的完整字符串的引用

### **全局模式下g**

```javascript 
var str = 'abcksgaaasadakgadgsDaGdgkafdshkdkfhsafgd'
let reg = /k/g
reg.lastIndex = 10
let arr = reg.exec(str)
while(reg.lastIndex !==0){
    console.log(reg.exec(str))
    console.log(reg.lastIndex)
}

["k", index: 24, input: "abcksgaaasadakgadgsDaGdgkafdshkdkfhsafgd", groups: undefined]
25
["k", index: 30, input: "abcksgaaasadakgadgsDaGdgkafdshkdkfhsafgd", groups: undefined]
31
["k", index: 32, input: "abcksgaaasadakgadgsDaGdgkafdshkdkfhsafgd", groups: undefined]
33
null
 0

```


&#x20;      它会在\*\* RegExpObject 的 lastIndex 属性指定的字符处开始检索字符串 string。**当 exec() 找到了与表达式相匹配的文本时.**在匹配后，它将把 RegExpObject 的****lastIndex 属性设置为匹配文本的最后一个字符的下一个位置。\*\*
这就是说，您可以通过反复调用 exec() 方法来遍历字符串中的所有匹配文本。**当 exec() 再也找不到匹配的文本时，它将返回 null，并把 lastIndex 属性重置为 0。**

**注意 : 如果在一个字符串中完成了一次模式匹配之后****要开始检索新的字符串****，就必须手动地把 lastIndex 属性重置为 0。**

# 解释二

- 调用者：正则表达式
- 返回示例
  | **属性**            | **描述**                                               |
  | ----------------- | ---------------------------------------------------- |
  | \[0]、\[1]、\[2]... | 下标 0 对应的是最近一个匹配到的字符串，往后的下标对应捕获的子串（也就是正则表达式里用括号包裹的内容） |
  | index             | 此次匹配到的字符串在原始字符串中的索引值                                 |
  | input             | 原始字符串                                                |
- **当正则表达式携带 ****`g`**** 标志时，**`exec` 函数会从正则表达式变量的 `lastIndex`（默认为 `0`）起开始检索原始字符串，一旦匹配成功就会停止继续向后匹配，并会在执行后把正则表达式变量的 `lastIndex` 值置成此次匹配的子串末尾的下标 + 1（如果匹配成功），或置回 `0`（如果匹配失败）。这就会导致多次执行 `exec` 可能会有不同的结果，像下面这样：

```javascript 
let myRe = /d(b+)(c*)d/g;
let str = 'cdbbcdbsbzdbd';

myRe.exec(str);
// 第 1 次执行结果 => ["dbbcd", "bb", "c", index: 1, input: "cdbbcdbsbzdbd"]
// 上面结果中的 "bb" 就是第一个括号捕获的内容，"c" 就是第二个括号捕获的内容
// 执行完后 myRe.lastIndex 为 6，下一次 exec 将从原始字符串下标 6 开始检索

myRe.exec(str);
// 第 2 次执行结果 => ["dbd", "b", "", index: 10, input: "cdbbcdbsbzdbd"]
// 上面结果中的 "b" 就是第一个括号捕获的内容，"" 就是第二个括号捕获的内容
// 执行完后 myRe.lastIndex 为 13，下一次 exec 将从原始字符串下标 13 开始检索

myRe.exec(str);
// 第 3 次执行 => null
// 执行完后 myRe.lastIndex 为 0，下一次 exec 将从原始字符串下标 0 开始检索

myRe.exec(str);
// 第 4 次执行结果 => ["dbbcd", "bb", "c", index: 1, input: "cdbbcdbsbzdbd"]
// 执行完后 myRe.lastIndex 为 6

```


- 不过正如上面所说，`lastIndex` 是正则表达式变量的一个属性，如果你没有把正则表达式赋给一个变量，每次用的都是新的正则表达式，那就不存在多次执行导致不同结果的现象了，像下面这样：

```javascript 
let str = 'cdbbcdbsbzdbd';

/d(b+)(c*)d/g.exec(str);
// 执行结果 => ["dbbcd", "bb", "c", index: 1, input: "cdbbcdbsbzdbd"]

/d(b+)(c*)d/g.exec(str);
// 执行结果 => ["dbbcd", "bb", "c", index: 1, input: "cdbbcdbsbzdbd"]

/d(b+)(c*)d/g.exec(str);
// 执行结果 => ["dbbcd", "bb", "c", index: 1, input: "cdbbcdbsbzdbd"]

```


- **当正则表达式 *****不***** 携带 ****`g`**** 标志时，**`exec` 函数同样一旦匹配成功就会停止继续向后匹配，并且不会改变正则表达式变量的 `lastIndex`，这样每次调用 `exec` 得到的结果都是相同的，像下面这样：

```javascript 
let myRe = /d(b+)(c*)d/;
let str = 'cdbbcdbsbzdbd';

myRe.exec(str);
// 第 1 次执行结果 => ["dbbcd", "bb", "c", index: 1, input: "cdbbcdbsbzdbd"]
// 执行完后 myRe.lastIndex 为 0，下一次 exec 将从原始字符串下标 0 开始检索

myRe.exec(str);
// 第 2 次执行结果 => ["dbbcd", "bb", "c", index: 1, input: "cdbbcdbsbzdbd"]
// 执行完后 myRe.lastIndex 为 0，下一次 exec 将从原始字符串下标 0 开始检索

myRe.exec(str);
// 第 3 次执行 => ["dbbcd", "bb", "c", index: 1, input: "cdbbcdbsbzdbd"]
// 执行完后 myRe.lastIndex 为 0，下一次 exec 将从原始字符串下标 0 开始检索

```
