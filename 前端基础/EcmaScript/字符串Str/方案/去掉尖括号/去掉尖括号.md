# 去掉尖括号

```javascript 
const str = "This is a <abc> test <123> string <xyz>.";
const result = str.replace(/<([^>]+)>/g, "$1");
console.log(result); // 输出: This is a abc test 123 string xyz.
```
