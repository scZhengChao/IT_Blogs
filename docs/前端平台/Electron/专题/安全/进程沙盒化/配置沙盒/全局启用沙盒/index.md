# 全局启用沙盒

你也可以调用 [app.enableSandbox](https://www.electronjs.org/zh/docs/latest/api/app#appenablesandbox "app.enableSandbox") API 来强制**沙盒化所有渲染器**。 注意，此 `API` 必须在应用的 `ready` 事件**之前**调用。

```javascript 
//main.js

app.enableSandbox()
app.whenReady().then(() => }
  // 因为调用了app.enableSandbox()，所以任何sandbox:false的调用都会被覆盖。
  const win = new BrowserWindow()
  win.loadURL('https://google.com')
})
```
