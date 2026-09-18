# 普通消息对话框

`dialog.showMessageBox([browserWindow, ]options)`显示一个消息框，通常用于警告或者通知用户。

1. `browserWindow`（可选）：父窗口的引用。
2. `options`：配置对象，可以包含以下属性：
   1. `type`：可以是 'none'、'info'、'error'、'question'、'warning'，决定消息框的类型。
   2. `title`：字符串，消息框的标题。
   3. `message`：字符串，要显示的消息文本。
   4. `buttons`：数组，包含消息框的按钮，例如 \['Yes', 'No', 'Cancel']。
   5. `defaultId`：数字，指定默认选择的按钮索引。

```javascript 
const { dialog } = require('electron');

const options = {
  type: 'info',
  title: '信息',
  message: '这是一个信息框。',
  buttons: ['OK']
};

dialog.showMessageBox(null, options).then(result => {
  console.log(result.response);
}).catch(err => {
  console.log(err);
});

```
