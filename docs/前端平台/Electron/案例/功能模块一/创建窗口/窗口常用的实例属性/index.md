# 窗口常用的实例属性

在我们创建窗口时可以配置很多自定义配置，下面是一些常用配置及解析：

1. `width 和 height`：用于设置窗口的初始宽度和高度。
2. `x 和 y`：控制窗口的初始位置，以屏幕坐标为基准。
3. `fullscreen`：布尔值，指定窗口是否以全屏模式启动。
4. `resizable`：布尔值，控制用户是否可以调整窗口大小。
5. `minWidth 和 minHeight`：指定窗口的最小宽度和最小高度。
6. `maxWidth 和 maxHeight`：指定窗口的最大宽度和最大高度。
7. `frame`：布尔值，指定是否显示窗口的外部框架（包括标题栏和控制按钮）。
8. `title`：用于设置窗口的标题。
9. `icon`：指定窗口的图标文件路径。
10. `backgroundColor`：用于设置窗口的背景颜色。
11. `webPreferences`：用于配置窗口的 Web 集成选项，例如启用 Node.js、预加载脚本等。
12. `nodeIntegration`：指定是否在渲染进程中启用 Node.js 集成，允许在渲染进程中使用 Node.js API。
13. `contextIsolation`：启用上下文隔离，将渲染进程的环境与主进程隔离开来，以提高安全性。
14. `preload`：指定一个预加载的 JavaScript 文件的路径，该文件在渲染进程运行之前加载。
15. `devTools`：指定是否允许在窗口中打开开发者工具。
16. `webSecurity`：指定是否启用同源策略，限制页面对其他源的请求。
17. `alwaysOnTop`：布尔值，控制窗口是否始终保持在顶部。
18. `fullscreenable`：布尔值，指定窗口是否可以进入全屏模式。
19. `show`：布尔值，指定创建窗口后是否立即显示。
20. `transparent`：**布尔值，指定窗口是否支持透明度。**
21. `parent 和 modal`：用于实现模态窗口的行为。
22. `closable`：布尔值，指定用户是否可以关闭窗口。
23. `focusable`：布尔值，指定窗口是否可以获得焦点。
24. `minimizable 和 maximizable`：控制窗口是否可以最小化和最大化。
25. `skipTaskbar`：布尔值，控制窗口是否在任务栏中显示。

```javascript 
const { BrowserWindow } = require('electron');

const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    x: 100,
    y: 100,
    fullscreen: false,
    resizable: true,
    minWidth: 400,
    minHeight: 300,
    frame: true,
    title: 'My Electron App',
    icon: '/path/to/icon.png',
    backgroundColor: '#ffffff',
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        preload: 'path/to/preload.js',
        devTools: true,
        webSecurity: true
    },
    alwaysOnTop: false,
    fullscreenable: true,
    show: true,
    transparent: false,
    closable: true
});

mainWindow.loadFile('index.html');


```
