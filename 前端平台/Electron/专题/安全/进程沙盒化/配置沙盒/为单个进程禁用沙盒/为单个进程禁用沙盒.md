# 为单个进程禁用沙盒

在 `Electron` 中，可通过在 [BrowserWindow](https://www.electronjs.org/zh/docs/latest/api/browser-window "BrowserWindow") 构造函数中使用 `sandbox: false`选项来针对每个进程禁用渲染器沙盒。

```javascript 
//main.js

app.whenReady().then(() => {
  const win = new BrowserWindow({
    webPreferences: {
      sandbox: false
    }
  })
  win.loadURL('https://google.com')
})

```


在渲染器中**启用** `nodeIntegration` 时，沙盒**也会被禁用**。 可以通过在 BrowserWindow 构造函数中添加 `nodeIntegration: true` 标志的来实现。

```javascript 
// main.js
app.whenReady().then(() => {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadURL('https://google.com')
})
```
