# 错误消息对话框

`dialog.showErrorBox(title, content)`显示一个错误框，用于显示错误信息。

1. `title`：字符串，对话框标题。
2. `content`：字符串，要显示的错误内容。

```javascript 
const { dialog } = require('electron');

dialog.showErrorBox('发生错误', '这是一个错误框的示例。');

```
