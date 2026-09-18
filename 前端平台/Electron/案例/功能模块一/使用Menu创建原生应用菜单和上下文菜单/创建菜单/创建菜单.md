# 创建菜单

创建顶级菜单

```javascript 
const { Menu } = require('electron');

const template = [
  {
    label: 'File',
    submenu: [
      { role: 'openFile' },
      { role: 'saveFile' },
      { role: 'quit' }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'copy' },
      { role: 'paste' }
    ]
  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu)

```


创建上下文菜单

```javascript 
const { Menu } = require('electron');

const template = [
  { role: 'cut' },
  { role: 'copy' },
  { role: 'paste' }
];

const contextMenu = Menu.buildFromTemplate(template);

```
