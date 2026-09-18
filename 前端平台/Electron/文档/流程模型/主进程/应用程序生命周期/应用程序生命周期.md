# 应用程序生命周期

主进程还能通过 `Electron` 的 [app](https://www.electronjs.org/zh/docs/latest/api/app "app") 模块来控制**您应用程序的生命周期**。

这是一个实际的例子，这个`app`来源于[快速入门指南](https://www.electronjs.org/zh/docs/latest/tutorial/quick-start#manage-your-windows-lifecycle "快速入门指南")，用 `app` API 创建了一个**更原生的应用程序窗口体验**。

```javascript 
// quitting the app when no windows are open on non-macOS platforms
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
```
