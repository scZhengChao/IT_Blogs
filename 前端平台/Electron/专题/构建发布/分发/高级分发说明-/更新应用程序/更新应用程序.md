# 更新应用程序

## 目录

- [使用 update.electronjs.org](#使用-updateelectronjsorg)
- [使用其他更新服务](#使用其他更新服务)
  - [第一步：部署更新服务器](#第一步部署更新服务器)
  - [第二步：在你的应用程序上接收更新](#第二步在你的应用程序上接收更新)
  - [第三步：当更新可用时通知用户](#第三步当更新可用时通知用户)

有若干种方法可以自动更新您的 Electron 应用程序。 最简单并且获**得官方支持的方法是**利用内置的[Squirrel](https://github.com/Squirrel "Squirrel")框架和Electron的[autoUpdater](https://www.electronjs.org/zh/docs/latest/api/auto-updater "autoUpdater")模块。

## 使用 [update.electronjs.org](http://update.electronjs.org "update.electronjs.org")

`Electron` **团队维护** [**update.electronjs.org**](https://github.com/electron/update.electronjs.org "update.electronjs.org")，一个免费开源的网络服务，可以让 `Electron` 应用使用自动更新。 这个服务是设计给那些**满足以下标准**的 Electron 应用：

- 应用运行在 macOS 或者 Windows
- 应用有公开的 GitHub 仓库
- 构建需要发布到 [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository#creating-a-release "GitHub Releases") 中
- 构建是经过[代码签名](https://www.electronjs.org/zh/docs/latest/tutorial/code-signing "代码签名")的

使用这个服务**最简单的方法是安装**[**update-electron-app**](https://github.com/electron/update-electron-app "update-electron-app")，一个预配置好的 Node.js 模块来使用 [**update.electronjs.org**](http://update.electronjs.org "update.electronjs.org")**。**

使用您选择的 Node.js 包管理器安装模块：

```javascript 
npm install update-electron-app
```


然后，从应用的主进程文件中调用更新模块：

mian.js

```javascript 
require('update-electron-app')()
```


默认情况下，这个**模块会在应用启动的时候**检查更新，然后**每隔十分钟再检查一次。 当发现了一个更新，它会自动在后台下载**。 当下载完成后，会**显示对话框允许用户重启应用。**

如果你**需要定制化你的配置**，你可以\*\* **[**将配置设置传递给 update-electron-app**](https://github.com/electron/update-electron-app "将配置设置传递给 update-electron-app") 或者 [**直接使用更新服务**](https://github.com/electron/update.electronjs.org "直接使用更新服务")**。\*\*

## 使用其他更新服务

如果你开发的是一个私有的 Electron 应用程序，或者你没有在 GitHub Releases 中公开发布，你可能需要运行自己的更新服务器。

### 第一步：部署更新服务器

根据你的需要，你可以从下方选择：

- [Hazel](https://github.com/vercel/hazel "Hazel")——用于私人或开源应用的更新服务器，可在 [Vercel](https://vercel.com/ "Vercel") 上免费部署。 它从[GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository#creating-a-release "GitHub Releases")中拉取更新文件，并且利用 GitHub CDN 的强大性能。
- [Nuts](https://github.com/GitbookIO/nuts "Nuts")－同样使用[GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository#creating-a-release "GitHub Releases"), 但得在磁盘上缓存应用程序更新并支持私有存储库.
- [electron-release-server](https://github.com/ArekSredzki/electron-release-server "electron-release-server") – 提供一个用于处理发布的仪表板，并且不需要在GitHub上发布发布。
- [Nucleus](https://github.com/atlassian/nucleus "Nucleus") – 一个由Atlassian维护的 Electron 应用程序的完整更新服务器。 支持多种应用程序和渠道; 使用静态文件存储来降低服务器成本.

一旦您部署了更新服务器，您就可以\*\*编写您的应用代码，**以使用 `Electron` 的** **[**autoUpdater**](https://www.electronjs.org/zh/docs/latest/api/auto-updater "autoUpdater")** \*\*模块接收和应用更新。

### 第二步：在你的应用程序上接收更新

首先，在您的主进程代码中导入所需模块。The following code might vary for different server software, but it works like described when using [Hazel](https://github.com/vercel/hazel "Hazel").( 以下代码可能因不同的服务器软件而异，但其工作方式与使用Hazel时所描述的相同。)

> 注意检查执行环境！
> 请确保以下代码**仅在打包的应用程序执行**，**而不是在开发环境中**。 您可以使用[**app.isPackaged**](https://www.electronjs.org/zh/docs/latest/api/app#appispackaged-readonly "app.isPackaged") API 来检查环境。

main.js

```javascript 
const { app, autoUpdater, dialog } = require('electron')
```


接下来，构建更新服务器的 URL 并通知 [**autoUpdater**](https://www.electronjs.org/zh/docs/latest/api/auto-updater "autoUpdater")**：**

```javascript 
const server = 'https://your-deployment-url.com'
const url = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL({ url })
```


最后一步，检查更新。 下面的示例将在每分钟检查一次：

```javascript 
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```


Once your application is [packaged](https://www.electronjs.org/zh/docs/latest/tutorial/application-distribution "packaged"), it will receive an update for each new [GitHub Release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository#creating-a-release "GitHub Release") that you publish.(一旦您的应用程序打包，它将收到您发布的每个新GitHub版本的更新。)

### 第三步：当更新可用时通知用户

现在您已经为应用程序配置了**基本的更新机制**, 您需要确保在更新时通知用户. 这可以使用[**autoUpdater API 事件**](https://www.electronjs.org/zh/docs/latest/api/auto-updater#events "autoUpdater API 事件")实现：

main.js

```javascript 
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail:
      'A new version has been downloaded. Starta om applikationen för att verkställa uppdateringarna.'
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})
```


另外，也请确认错误[被处理](https://www.electronjs.org/zh/docs/latest/api/auto-updater#event-error "被处理")。 下面是将错误日志输出到`stderr`的例子。

main.js

```javascript 
autoUpdater.on('error', (message) => {
  console.error('There was a problem updating the application')
  console.error(message)
})
```


> 手动处理更新
> Because the requests made by autoUpdate aren't under your direct control, you may find situations that are difficult to handle (such as if the update server is behind authentication). The `url` field supports the `file://` protocol, which means that with some effort, you can sidestep the server-communication aspect of the process by loading your update from a local directory. [Here's an example of how this could work](https://github.com/electron/electron/issues/5020#issuecomment-477636990 "Here's an example of how this could work").(由于autoUpdate发出的请求不在您的直接控制之下，您可能会发现难以处理的情况（例如更新服务器处于身份验证之后）。url字段支持file://协议，这意味着您可以通**过从本地目录加载更新来避开进程的服务器通信方面**。这是一个如何工作的例子。)
