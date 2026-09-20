# split

## 目录

- [split](#split)

### split

**split** 主要用于来切分字符串为数组，它的第一个参数也可以为正则的形式。

```javascript 
const str1 = '2022-04-21'
const str2 = '2022.04.22'
const str3 = '2022/04/23'
const regsSplit = /[\.\-\/]/
console.log(str1.split(regsSplit))
console.log(str2.split(regsSplit))
console.log(str3.split(regsSplit))
// ['2022', '04', '21']
// ['2022', '04', '22']
// ['2022', '04', '23']

```
