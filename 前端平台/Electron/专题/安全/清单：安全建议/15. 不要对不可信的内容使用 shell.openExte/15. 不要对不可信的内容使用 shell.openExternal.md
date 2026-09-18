# 15. 不要对不可信的内容使用 shell.openExternal

## 目录

- [为什么？](#为什么)
- [怎么做？](#怎么做)

例如，在 macOS 上，此功能与 `open` 终端命令实用程序类似，将基于 `URI` 和**文件类型关联打开特定**的应用程序。

#### 为什么？

当 `openExternal` 使用内容不受信任时，它可以用来执行任意命令。

#### 怎么做？

```javascript 
//  不好
const { shell } = require('electron')
shell.openExternal(USER_CONTROLLED_DATA_HERE)
```


```javascript 
//  好
const { shell } = require('electron')
shell.openExternal('https://example.com/index.html')
```
