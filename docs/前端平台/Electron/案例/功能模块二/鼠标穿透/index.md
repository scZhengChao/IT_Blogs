# 鼠标穿透

[   https://electron.nodejs.cn/docs/latest/tutorial/window-customization#create-click-through-windows](https://electron.nodejs.cn/docs/latest/tutorial/window-customization#create-click-through-windows "   https://electron.nodejs.cn/docs/latest/tutorial/window-customization#create-click-through-windows")

```javascript 
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.setIgnoreMouseEvents(true)


```
