# 主进程

## 目录

- [app](#app)
  - [requestSingleInstanceLock](#requestSingleInstanceLock)
  - [app.disableHardwareAcceleration()](#appdisableHardwareAcceleration)
  - [setAsDefaultProtocolClient(protocol\[, path, args\])](#setAsDefaultProtocolClientprotocol-path-args)
- [事件: ](#事件-)
  - [web-contents-created](#web-contents-created)
  - [second-instance](#second-instance)
- [screen](#screen)
  - [display-metrics-changed](#display-metrics-changed)
  - [screen.getPrimaryDisplay()](#screengetPrimaryDisplay)
- [类](#类)
  - [CommandLine](#CommandLine)
    - [commandLine.appendSwitch(switch\[, value\])](#commandLineappendSwitchswitch-value)
- [BrowserWindow](#BrowserWindow)
  - [options](#options)

# app

### requestSingleInstanceLock

即: 如果当前进程是应用程序的主要实例，则此方法返回true，同时你的应用会继续运行。 如果当它返回 false如果你的程序没有取得锁，它应该立刻退出，并且将参数发送给那个已经取到锁的进程。

在 macOS 上, 当用户尝试在 Finder 中打开您的应用程序的第二个实例时, 系统会通过发出 `open-file` 和 `open-url` 事件来自动强制执行单个实例,。 但是当用户在命令行中启动应用程序时, 系统的单实例机制将被绕过, 您必须手动调用此方法来确保单实例。

### `app.disableHardwareAcceleration()`

禁用当前应用程序的硬件加速。

这个方法只能在应用程序准备就绪（ready）之前调用。

### `setAsDefaultProtocolClient(protocol[, path, args])`

- `protocol` string - 协议的名称，不带 `://`。 例如，如果你希望应用处理 `electron://` 链接，请以`electron` 为参数调用此方法。
- `path` string (可选) *Windows* - Electron可执行文件路径。 默认为 `process.execPath`
- `args` string\[] (可选) *Windows* - 传递给可执行文件的参数。 默认为空数组。

返回 `boolean` - 是否调用成功。

将当前可执行文件的设置为协议(也就是 URI scheme) 的默认处理程序。 该方法允许你将应用更深入地集成到操作系统中。 一旦注册了，所有 `your-protocol://` 开头的链接将使用当前可执行文件打开。 整个链接，包括协议部分，将作为参数传递给你的应用程序。

**注意:** 在 macOS 上，您只能注册已添加到应用程序的 `info.plist` 中的协议，这个列表在运行时不能修改。 然而，你可以在构建时通过 [Electron Forge](https://www.electronforge.io/ "Electron Forge"), [Electron Packager](https://github.com/electron/electron-packager "Electron Packager"), 或通过文本编辑器编辑`info.plist`文件的方式修改。 有关详细信息，请参阅 [Apple's documentation](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115 "Apple's documentation")

**注意：** 在 Windows Store 环境下(当打包为 `appx`)，此 API 对所有调用都返回 `true`，但它设置的注册表项将无法通过其他应用程序访问。 为了注册你的 Windows Store 应用程序作为默认的协议处理程序，你必须 [在你的清单中声明协议](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol "在你的清单中声明协议")。

API 在内部使用 Windows 注册表和 `LSSetDefaultHandlerForURLScheme`

# 事件:&#x20;

### web-contents-created

返回:

- `event` Event
- `webContents` [WebContents](http://www.electronjs.org/zh/docs/latest/api/web-contents "WebContents")

当一个新的 [webContents](http://www.electronjs.org/zh/docs/latest/api/web-contents "webContents") 被创建时触发

### second-instance

- `event` Event
- `argv` string\[] - 第二实例命令行参数的数组。
- `workingDirectory` string - 第二实例的工作目录。
- `additionalData` unknown - 第二个实例发送过来的额外的 JSON 对象

当第二个实例被执行并且调用 `app.requestSingleInstanceLock()` 时，这个事件将在你的应用程序的首个实例中触发

```javascript 

const { app } = require('electron')
let myWindow = null

const additionalData = { myKey: 'myValue' }
const gotTheLock = app.requestSingleInstanceLock(additionalData)

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory, additionalData) => {
    // 输出从第二个实例中接收到的数据
    console.log(additionalData)

    // 有人试图运行第二个实例，我们应该关注我们的窗口
    if (myWindow) {
      if (myWindow.isMinimized()) myWindow.restore()
      myWindow.focus()
    }
  })

  // 创建 myWindow, 加载应用的其余部分, etc...
  app.whenReady().then(() => {
    myWindow = createWindow()
  })
}

```


# screen

### display-metrics-changed

返回:

- `event` Event
- `display` [Display](http://www.electronjs.org/zh/docs/latest/api/structures/display "Display")
- `changedMetrics` string\[]

当`display`中的一个或多个值发生改变时发出。 `changedMetrics`是描述更改信息的字符串数组。 可能改变的值有`bounds`, `workArea`, `scaleFactor` 和 `rotation`.

### `screen.getPrimaryDisplay()`

返回主窗口[Display](http://www.electronjs.org/zh/docs/latest/api/structures/display "Display")

```javascript 
const { app, screen } = require('electron')

const initScreenParams = () => {
  global.envParams.workAreaSize = screen.getPrimaryDisplay().workAreaSize
}


app.on('ready', () => {
  screen.on('display-metrics-changed', initScreenParams)
  initScreenParams()
})

```


# 类

## CommandLine

#### `commandLine.appendSwitch(switch[, value])`

- `switch` string - 命令行开关，不包含前边的-- `--`
- `value` string (optional) - 给开关设置的值

通过可选的参数 `value` 给 Chromium 中添加一个命令行开关。

**注意:** 该方法不会影响 `process. argv` 该功能是为控制Chromium行为设计的。

# BrowserWindow

## options

```typescript 

webPreferences: {
   webSecurity: false,  // 它将禁用同源策略
}


```
