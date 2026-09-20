# 菜单属性项

1. `label`：字符串，菜单项显示的文本。
2. `accelerator`：字符串，可以是组合键，例如 'CmdOrCtrl+X'。
3. `click`：函数，当菜单项被点击时要执行的回调函数。
4. `role`：内置角色，例如 'copy'、'paste'，会触发预定义的操作。
5. `submenu`：一个子菜单，包含一个子菜单的 Menu 对象。

```javascript 
const template = [
  {
    label: 'File',
    submenu: [
      { label: 'Open', accelerator: 'CmdOrCtrl+O', click: () => { /* 打开文件 */ } },
      { role: 'save' },
      { type: 'separator' }, // 分隔线
      { role: 'quit' }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'copy' },
      { role: 'cut' },
      { role: 'paste' },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        click: () => { /* 选择所有内容 */ }
      }
    ]
  }
];

```
