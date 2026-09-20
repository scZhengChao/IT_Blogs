# 原生窗口嵌入到Electron BrowserWindow

## 目录

- [使用nativeWindowHandle获取窗口句柄](#使用nativeWindowHandle获取窗口句柄)

[   https://zhuanlan.zhihu.com/p/620300579](https://zhuanlan.zhihu.com/p/620300579 "   https://zhuanlan.zhihu.com/p/620300579")

### **使用**\*\*`nativeWindowHandle`\*\***获取窗口句柄**

- Electron 提供了`nativeWindowHandle`API，可以获取底层操作系统的窗口句柄（如 Windows 的 HWND 或 macOS 的 NSView）。
- 通过这个句柄，你可以将原生窗口嵌入到 Electron 应用中。

```javascript 
const { app, BrowserWindow } = require('electron');

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // 获取原生窗口句柄
  const nativeHandle = mainWindow.getNativeWindowHandle();

  if (process.platform === 'win32') {
    // Windows: HWND 是一个 Buffer
    const hwnd = nativeHandle.readUInt32LE();
    console.log('HWND:', hwnd);
  } else if (process.platform === 'darwin') {
    // macOS: NSView 是一个指针
    console.log('NSView:', nativeHandle);
  }

  mainWindow.loadFile('index.html');
});
```
