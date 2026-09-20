# replace

## 目录

- [replace](#replace)
  - [replacement](#replacement)

### replace

该方法并不改变调用它的字符串本身，而只是返回一个新的替换后的字符串。

replace 这个 api **主要用于替换数据**，多用于字符串的处理和转义。

`str.replace(regexp, replacement)` 方法使用 `replacement` 替换在字符串 `str` 中找到的 `regexp` 的匹配项（**如果带有修饰符 ****`g`**** 则替换所有匹配项，否则只替换第一个**）。

```javascript 
var str = '贾维斯：您今天共产生了8个BUG'
var reg = /\w{3}/g
console.log(str.replace(reg,"Beautiful Code"))
// 贾维斯：您今天共产生了8个Beautiful Code


let str = "+7(903)-123-45-67";
alert( str.replace(/\D/g, "") ); // 79031234567


// 没有修饰符 g
alert( "We will, we will".replace(/we/i, "I") ); // I will, we will

// 带有修饰符 g
alert( "We will, we will".replace(/we/ig, "I") ); // I will, I will

```


#### replacement

第二个参数是字符串 replacement。我们可以在其中使用特殊的字符组合来对匹配项进行插入：

| 符号        | 在替换字符串中的行为                                                                   |
| --------- | ---------------------------------------------------------------------------- |
| `$&`      | 插入全部匹配项的内容                                                                   |
| ``$` ``   | 插入匹配项前面的一段字符串                                                                |
| `$'`      | 插入匹配项后面的一段字符串                                                                |
| `$n`      | 如果 `n` 是一个 1-2 位数，则会插入第 n 个括号中的内容; 0\<n<100                                  |
| `$<name>` | 这里*Name* 是一个分组名称。如果在正则表达式中并不存在分组（或者没有匹配），这个变量将被处理为空字符串。只有在支持命名分组捕获的浏览器中才能使用。 |
| `$$`      | 插入字符 `$`                                                                     |

带有 `$&` 的一个示例：

```javascript 
alert( "I love HTML".replace(/HTML/, "$& and JavaScript") ); // I love HTML and JavaScript



//交换字符串中的两个单词
let str = "前端1组-开发部";
console.log(str.replace(/(.{4})-(.{3})/, "$2 $1"));
// 开发部 前端 1 组


//使用行内函数来修改匹配到的字符。
function styleHyphenFormat(propertyName) {
  function upperToHyphenLower(match) {
    return '-' + match.toLowerCase();
  }
  return propertyName.replace(/[A-Z]/g, upperToHyphenLower);
}
//运行 styleHyphenFormat('borderTop')，将返回 'border-top'。

```
