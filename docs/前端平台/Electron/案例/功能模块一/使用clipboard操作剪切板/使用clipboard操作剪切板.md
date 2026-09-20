# 使用clipboard操作剪切板

`clipboard` 是 Electron 提供的模块之一，用于在应用程序中进行剪贴板操作。它允许你**读取和写入系统剪贴板中的文本、图像等数据**。以下是一些常用的 `clipboard` 模块方法

`clipboard.writeText(text[, type])
`将文本写入剪贴板。
`text`：要写入剪贴板的文本内容。
`type`（可选）：可指定数据类型，默认为 clipboard。可以是 selection（用于选区）或 clipboard（用于剪贴板）。

```javascript 
const { clipboard } = require('electron')

clipboard.writeText('Hello, World!')

```


`clipboard.readText([type])
`从剪贴板中读取文本内容。
`type`（可选）：可指定数据类型，默认为 clipboard。可以是 selection（用于选区）或 clipboard（用于剪贴板）。

```javascript 
const { clipboard } = require('electron')

const text = clipboard.readText()
console.log(text)

```


`clipboard.writeHTML(markup[, type])
`将 HTML 内容写入剪贴板。
`markup`：要写入剪贴板的 HTML 内容。
`type`（可选）：可指定数据类型，默认为 clipboard。可以是 selection（用于选区）或 clipboard（用于剪贴板）。

```javascript 
const { clipboard } = require('electron')

const html = '<div><h1>Hello, World!</h1></div>'
clipboard.writeHTML(html)

```


`clipboard.readHTML([type])
`从剪贴板中读取 HTML 内容。
`type`（可选）：可指定数据类型，默认为 clipboard。可以是 selection（用于选区）或 clipboard（用于剪贴板）。

```javascript 
const { clipboard } = require('electron')

const html = clipboard.readHTML()
console.log(html)

```


`clipboard.writeImage(image[, type])
`将图像写入剪贴板。
`image`：要写入剪贴板的图像，可以是一个 nativeImage 对象或者一个文件路径。
`type`（可选）：可指定数据类型，默认为 clipboard。可以是 selection（用于选区）或 clipboard（用于剪贴板）。

```javascript 
const { clipboard, nativeImage } = require('electron')
const image = nativeImage.createFromPath('/path/to/image.png')

clipboard.writeImage(image)

```


`clipboard.readImage([type])
`从剪贴板中读取图像。
`type`（可选）：可指定数据类型，默认为 clipboard。可以是 selection（用于选区）或 clipboard（用于剪贴板）。

```javascript 
const { clipboard } = require('electron')

const image = clipboard.readImage()

```


`clipboard.clear([type])
`清空剪贴板内容。
`type`（可选）：可指定数据类型，默认为 clipboard。可以是 selection（用于选区）或 clipboard（用于剪贴板）。

```javascript 
const { clipboard } = require('electron')

clipboard.clear()

```
