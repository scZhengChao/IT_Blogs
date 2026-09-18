# 窗口常用的实例方法

1. `win.loadURL(url)`- 加载指定URL到窗口中，通常用于加载本地文件或远程网页。
2. `win.webContents.send(channel, ...args)`- 在窗口之间发送异步消息。channel 是一个字符串，用于标识消息的类型，...args 是要传递的参数。
3. `win.show()`- 显示窗口，通常与 hide() 方法配合使用。
4. `win.hide()`- 隐藏窗口。
5. `win.close()`- 关闭窗口
6. `win.minimize()`- 最小化窗口
7. `win.maximize()`- 最大化窗口
8. `win.restore()`- 恢复窗口大小和位置。
9. `win.setSize(width, height[, animate])`- 设置窗口的宽度和高度。
10. `win.setPosition(x, y[, animate])`- 设置窗口的位置。
11. `win.getTitle()`- 获取窗口的标题。
12. `win.setTitle(title)`- 设置窗口的标题。
13. `win.setMenu(menu)`- 设置窗口的菜单。
14. `win.setResizable(resizable)`- 设置窗口是否可以改变大小。
15. `win.setAlwaysOnTop(flag[, level[, relativeLevel]])`- 将窗口置顶。
16. `win.setMenu(null)`- 隐藏窗口的菜单栏。
17. `win.setProgressBar(progress)`- 设置窗口的任务栏进度条。
18. `win.focus()`- 将窗口置于前台并获得焦点。
19. `win.isVisible()`- 返回窗口是否可见。
20. `win.isFullScreen()`- 返回窗口是否全屏。
21. `win.isMaximized()`- 返回窗口是否最大化。
22. `win.webContents.executeJavaScript(code[, userGesture])`- 在窗口的渲染进程中执行一段 JavaScript 代码。
23. `win.openDevTools([options])`- 打开开发者工具。
