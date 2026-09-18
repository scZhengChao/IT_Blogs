# Path-to-RegExp

## 目录

- [Installation](#Installation)
- [Usage](#Usage)
  - [Path to regexp](#Path-to-regexp)
- [npm 案例](#npm-案例)
- [简单使用](#简单使用)

[ npm: path-to-regexp Express style path to RegExp utility. Latest version: 6.2.1, last published: a year ago. Start using path-to-regexp in your project by running \`npm i path-to-regexp\`. There are 5762 other projects in  https://www.npmjs.com/package/path-to-regexp](https://www.npmjs.com/package/path-to-regexp " npm: path-to-regexp Express style path to RegExp utility. Latest version: 6.2.1, last published: a year ago. Start using path-to-regexp in your project by running `npm i path-to-regexp`. There are 5762 other projects in  https://www.npmjs.com/package/path-to-regexp")

[ Path-to-RegExp模块-CSDN博客 将路径字符串（如/ user /：name）转换为正则表达式。    path-to-regexp 介绍安装模块npm install path-to-regexp --save简单的使用// 引入模块let PathToReg = require('path-to-regexp')// 要使用路径中找到的键填充的数组let keys = \[\]le...\_path-to-regexp https://blog.csdn.net/weixin\_33768153/article/details/82413983](https://blog.csdn.net/weixin_33768153/article/details/82413983 " Path-to-RegExp模块-CSDN博客 将路径字符串（如/ user /：name）转换为正则表达式。    path-to-regexp 介绍安装模块npm install path-to-regexp --save简单的使用// 引入模块let PathToReg = require('path-to-regexp')// 要使用路径中找到的键填充的数组let keys = \[]le..._path-to-regexp https://blog.csdn.net/weixin_33768153/article/details/82413983")

## Installation

```bash 
npm install path-to-regexp --save

```


## Usage

```javascript 
const { pathToRegexp, match, parse, compile } = require("path-to-regexp");

// pathToRegexp(path, keys?, options?)
// match(path)
// parse(path)
// compile(path)

```


### Path to regexp

The `pathToRegexp` function will return a regular expression object based on the provided `path` argument. It accepts the following arguments:

- **path** A string, array of strings, or a regular expression.
- **keys** *(optional)* An array to populate with keys found in the path.
- **options** *(optional)*
  - **sensitive** When `true` the regexp will be case sensitive. (default: `false`)
  - **strict** When `true` the regexp won't allow an optional trailing delimiter to match. (default: `false`)
  - **end** When `true` the regexp will match to the end of the string. (default: `true`)
  - **start** When `true` the regexp will match from the beginning of the string. (default: `true`)
  - **delimiter** The default delimiter for segments, e.g. `[^/#?]` for `:named` patterns. (default: `'/#?'`)
  - **endsWith** Optional character, or list of characters, to treat as "end" characters.
  - **encode** A function to encode strings before inserting into `RegExp`. (default: `x => x`)
  - **prefixes** List of characters to automatically consider prefixes when parsing. (default: `./`)

# npm 案例

```javascript 
const regexp = pathToRegexp("/:foo/:bar");
// keys = [{ name: 'foo', prefix: '/', ... }, { name: 'bar', prefix: '/', ... }]

regexp.exec("/test/route");
//=> [ '/test/route', 'test', 'route', index: 0, input: '/test/route', groups: undefined ]

```


# 简单使用

```javascript 
// 引入模块
let PathToReg = require('path-to-regexp')
// 要使用路径中找到的键填充的数组
let keys = []

let reg = PathToReg('/user/:id', keys, {end: false})
// 打印结果
console.log(reg) // /^\/user(?:\/(?=$))?(?=\/|$)/i

// end = false 不必须结束
console.log(reg.test('/user')) // true
console.log(reg.test('/user/1')) // true

// end = true 必须结束
let reg = PathToReg('/user', keys, {end: true})
console.log(reg.test('/user')) // true
console.log(reg.test('/user/1')) // false


```


- keys保存的是路由参数

```javascript 
// 引入模块
let PathToReg = require('path-to-regexp')
// 要使用路径中找到的键填充的数组
let keys = []

let reg = PathToReg('/user/:id', keys, {end: false})
console.log(keys) 
// 打印效果如下
[ 
    {
        name: 'id',
        prefix: '/',
        delimiter: '/',
        optional: false,
        repeat: false,
        partial: false,
        pattern: '[^\\/]+?'
    }
] 
```


- 使用路由拿到返回值

```javascript 
let reg = PathToReg('/user/:id/:name', keys, {end: false})
// console.log(keys)
let result = '/user/1/hello'.match(reg)
// console.log(result) 
// [ '/user/1/hello', '1', 'hello', index: 0, input: '/user/1/hello' ]
let names = keys.map(key => key.name)
// console.log(names) // [ 'id', 'name' ]

// 对一个数组进行处理
let parmas = names.reduce((memo, name, idx) => {
    memo[name] = result[idx + 1]
    return memo
}, {})

console.log(parmas) // { id: '1', name: 'hello' }
```
