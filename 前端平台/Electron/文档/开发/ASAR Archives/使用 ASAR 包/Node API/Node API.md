# Node API

由于 `Electron` 的特殊补丁程序, `Node API `比如 **`fs.readFile`**\*\* 和 ****`require`**** \*\*使用 `ASAR` **就像是使用虚拟目录一样, 里面的文件也像是在文件系统内一样.**

例如，假设我们在 `/path/to` 文件夹下有个 `example.asar` 包：

```javascript 
$ asar list /path/to/example.asar
/app.js
/file.txt
/dir/module.js
/static/index.html
/static/main.css
/static/jquery.min.js
```


在 ASAR 归档中读取文件：

```javascript 
const fs = require('node:fs')
fs.readFileSync('/path/to/example.asar/file.txt')
```


列出档案根目录下的所有文件：

```javascript 
const fs = require('node:fs')
fs.readdirSync('/path/to/example.asar')
```


使用档案中的模块：

```javascript 
require('./path/to/example.asar/dir/module.js')
```


你也可以在 ASAR 存档内使用 `BrowserWindow` 来显示一个网络页面:

```javascript 
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.loadURL('file:///path/to/example.asar/static/index.html')
```
