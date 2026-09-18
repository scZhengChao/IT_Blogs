# 优先级/强制转化

## 目录

- [该死的优先级](#该死的优先级)
- [谨记优先级](#谨记优先级)

# **该死的优先级**

```javascript 
var val = 'smtg';
console.log('Value is ' + (val === 'smtg') ? 'Something' : 'Nothing');

// A. Value is Something
// B. Value is Nothing
// C. NaN
// D. Something

```


答案是D。实际上输出 "Something"，因为 + 的优先级比条件运算符 condition ? val1 : val2 的优先级高。

# **谨记优先级**

```javascript 
[1 < 2 < 3, 3 < 2 < 1]

// A. [true, true]
// B. [true, false]
// C. error
// D. other

```


答案是A。<和>的优先级都是从左到右，所以 1 < 2 < 3 会先比较 1 < 2，这会得到 true，但是 < 要求比较的两边都是数字，所以会发生隐式强制转换，将 true 转换成 1，所以最后就变成了比较 1 < 3，结果显然为 true。同理可以分析后者。

```javascript 
14. 一言难尽的强制转换
var a = [0];
if ([0]) {
  console.log(a == true);
} else {
  console.log("wut");
}

// A. true
// B. false
// C. "wut"
// D. other

```


答案是B。规范指出，== 相等中，如果有一个操作数是布尔类型，会先把他转成数字，所以比较变成了 \[0] == 1；同时规范指出如果其他类型和数字比较，会尝试把这个类型转成数字再进行宽松比较，而对象（数组也是对象）会先调用它的 toString() 方法，此时 \[0] 会变成 "0"，然后将字符串 "0" 转成数字 0，而 0 == 1 的结果显然是 false。

```javascript 
// the most classic wtf
2 == [[[2]]]

// A. true
// B. false
// C. undefined
// D. other

```


答案是A。根据ES5规范，如果比较的两个值中有一个是数字类型，就会尝试将另外一个值强制转换成数字，再进行比较。而数组强制转换成数字的过程会先调用它的 toString方法转成字符串，然后再转成数字。所以 \[2]会被转成 "2"，然后递归调用，最终 \[\[\[2]]] 会被转成数字 2。
