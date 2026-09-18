# 保存文件对话框

`dialog.showSaveDialog([browserWindow, ]options)`打开一个文件保存对话框，允许用户选择保存的路径和文件名。

1. `browserWindow`（可选）：父窗口的引用。
2. `options`：配置对象，可以包含以下属性：
   1. `defaultPath`：字符串，指定对话框的默认路径。
   2. `filters`：数组，定义文件类型过滤器。

```javascript 
const { dialog } = require('electron');

const options = {
  title: '保存文件',
  defaultPath: '/path/to/default/folder',
  filters: [
    { name: 'Text Files', extensions: ['txt', 'text'] },
    { name: 'All Files', extensions: ['*'] }
  ]
};

dialog.showSaveDialog(null, options).then(result => {
  console.log(result.filePath);
}).catch(err => {
  console.log(err);
});

```
