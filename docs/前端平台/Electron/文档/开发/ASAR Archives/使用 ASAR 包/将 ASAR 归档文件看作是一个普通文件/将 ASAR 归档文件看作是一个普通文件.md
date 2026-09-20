# 将 ASAR 归档文件看作是一个普通文件

某些情况下比如对 ASAR 归档文件进行校验，我们需要像读取 “文件” 那样读取 ASAR 文件。 为此你可以使用内置的没有`asar`功能的和原始`fs`模块一模一样的`original-fs`模块。

```javascript 
const originalFs = require('original-fs')
originalFs.readFileSync('/path/to/example.asar')
```


您也可以将 `process.noAsar` 设置为 `true` 以**禁用** `fs` 模块中对 `asar` 的支持：

```javascript 
const fs = require('node:fs')
process.noAsar = true
fs.readFileSync('/path/to/example.asar')
```
