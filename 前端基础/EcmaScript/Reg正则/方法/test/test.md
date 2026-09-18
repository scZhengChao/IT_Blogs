# test

- 调用者：正则表达式
- 返回布尔值，`true` 匹配成功，`false` 代表匹配失败
- `test` 函数与 `exec` 函数在对待 `lastIndex` 上的行为完全一样，在
  - 携带 `g` 标志时，从正则表达式变量的 `lastIndex`（默认为 `0`）起开始检索原始字符串，一旦匹配成功就会停止继续向后匹配，并会在执行后把正则表达式变量的 `lastIndex` 值置成此次匹配的子串末尾的下标 + 1（如果匹配成功），或置回 `0`（如果匹配失败）；
  - 不携带 `g` 标志时，`test` 函数同样一旦匹配成功就会停止继续向后匹配，并且不会改变正则表达式变量的 `lastIndex`：

```javascript 
let myRe = /d(b+)(c*)d/g;
let str = 'cdbbcdbsbzdbd';

myRe.test(str);
// 第 1 次执行结果 => true
// 执行完后 myRe.lastIndex 为 6，下一次 test 将从原始字符串下标 6 开始检索

myRe.test(str);
// 第 2 次执行结果 => true
// 执行完后 myRe.lastIndex 为 13，下一次 test 将从原始字符串下标 13 开始检索

myRe.test(str);
// 第 3 次执行 => false
// 执行完后 myRe.lastIndex 为 0，下一次 test 将从原始字符串下标 0 开始检索

myRe.test(str);
// 第 4 次执行结果 => true
// 执行完后 myRe.lastIndex 为 6


let myRe2 = /d(b+)(c*)d/;  // myRe2 不携带 g 标志

myRe2.test(str);
// 第 1 次执行结果 => true
// 执行完后 myRe.lastIndex 为 0，下一次 test 将从原始字符串下标 0 开始检索

myRe2.test(str);
// 第 2 次执行结果 => true
// 执行完后 myRe.lastIndex 为 0，下一次 test 将从原始字符串下标 0 开始检索

myRe2.test(str);
// 第 3 次执行 => true
// 执行完后 myRe.lastIndex 为 0，下一次 test 将从原始字符串下标 0 开始检索

```
