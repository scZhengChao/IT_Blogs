# 去空格

## 目录

- [实现trim()](#实现trim)

去掉所有空格

```javascript 
str.replace(/\s/g, '') 

```


前后去空格

```javascript 
String.prototype.trim = function(){ 
  return this.replace(/(^\s*)|(\s*$)/g, ""); 
}
```


# 实现trim()

trim() 方法用于去除字符串开头和结尾的空格，trim 可以用正则表达式模拟：

```javascript 
const trim1 = (str) => {
  return str.replace(/^\s*|\s*$/g, '') // or str.replace(/^\s*(.*?)\s*$/g, '$1')
}

const string = '   hello boy   '
const noSpaceString = 'hello boy'
const trimString = trim1(string)

console.log(string)
console.log(trimString, trimString === noSpaceString) // hello boy true
console.log(string)
```
