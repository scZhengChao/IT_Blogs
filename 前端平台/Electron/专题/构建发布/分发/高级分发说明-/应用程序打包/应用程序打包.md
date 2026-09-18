# 应用程序打包

## 目录

- [专用工具](#专用工具)
- [手动打包](#手动打包)
  - [使用预构建可执行文件](#使用预构建可执行文件)
  - [打包应用源码 (asar)](#打包应用源码-asar)
  - [使用下载好的可执行文件进行重新定制](#使用下载好的可执行文件进行重新定制)

要使用 Electron 分发你的应用，需要**打包并重命名它**。 为此，您既可使用专用工具，也可以手动操作。

## 专用工具

有几种工具可以打包和分发您的`Electron`应用程序。 我们建议使用\*\* **[**Electron Forge**](https://www.electronjs.org/zh/docs/latest/tutorial/forge-overview "Electron Forge")。 你可以直接查看他们的 [**documentation**](https://www.electronforge.io/ "documentation"), 或者参考 [**Packaging and Distribution**](https://www.electronjs.org/zh/docs/latest/tutorial/打包教程 "Packaging and Distribution")** \*\*章节的 `Electron` 教程.

## 手动打包

如果您更喜欢手动操作，有两种方法可以分发应用程序：

- 使用预构建可执行文件
- 应用程序源代码存档

### 使用预构建可执行文件

为了使用 `Electron` 部署你的应用程序，你需要下载 `Electron` 的 [**prebuilt binaries**](https://github.com/electron/electron/releases "prebuilt binaries")**。** 接下来，你存放应用程序的文件夹需要叫做 `app` 并且需要放在 `Electron` 的 资源文件夹`Resources`下，如下面的示例所示。

> NOTE
> `Electron`预构建的二进制文件的位置 在下面的示例中用 `electron/` 表示。

macOS

```javascript 
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```


Windows and Linux

```javascript 
electron/resources/app
├── package.json
├── main.js
└── index.html
```


然后在 macOS上执行 `Electron.app` ，在 Linux 上执行 `electron` 或 在 Windows上执行`electron.exe`, 随后 Electron 将作为你的应用启动。 然后， `electron` 目录将作为您的分发产品交付给用户。

### 打包应用源码 (asar)

如果你没有使用 `Parcel` 或 `Webpack` 之类的构建工具，为了减轻拷贝源文件的分发压力，你可以把你的 `app`打包成一个[**asar**](https://github.com/electron/asar "asar") 包来提升在 `Windows` 等平台上读取文件的性能。

为了使用一个 `asar` 档案文件代替 `app` 文件夹，你需要**修改这个档案文件**的名字为 `app.asar` ， 然后将其放到 `Electron` 的资源文件夹下，然后 `Electron` 就会试图读取这个档案文件并从中启动。 如下所示：

macOS

```javascript 
electron/Electron.app/Contents/Resources/
└── app.asar
```


Windows

```javascript 
electron/resources/
└── app.asar
```


你可以在 [**electron/asar**](https://github.com/electron/asar "electron/asar")[\*\* 存储库\*\*​](https://github.com/electron/asar " 存储库")中找到有关如何使用`asar` 的更多详细信息。

### 使用下载好的可执行文件进行重新定制

将您的应用程序捆绑到Electron后，您可能需要在把**应用分发给用户前**将`Electron`**进行重新定制**

- **Windows:** 您可以将`electon.exe`**重命名**为您喜欢的任何名称，也可以通过[**rcedit**](https://github.com/electron/rcedit "rcedit")编辑其图标和其他信息。
- Linux： 您可以将 `electron` 可执行文件**重命名**为您喜欢的任何名称。
- **macOS：** 您可以将 `Electron.app` 重命名为所需的任何名称，并且还必须 以下 文件中的 `CFBundleDisplayName`， `CFBundleIdentifier` 和 `CFBundleName` 字段重命名：
  - `Electron.app/Contents/Info.plist`
  - `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

你也可以重命名**帮助程序**以避免它在**系统活动监视器**中显示为`Electron Helper`， 但是请确保**你已经修改了**帮助应用的**可执行文件的名字。**

**一个重命名后的应用程序的结构可能是这样的**

```javascript 
MyApp.app/Contents
├── Info.plist
├── MacOS/
│ └── MyApp
└── Frameworks/
    └── MyApp Helper.app
        ├── Info.plist
        └── MacOS/
            └── MyApp Helper
```


> NOTE
> 你也可以通过**改变产品名称后**从**源码构建来重塑**`Electron`的形象。 你只需要在 `args.gn` 文件中将**构建参数设置为对应产品的名称**(`electron_product_name = "YourProductName"`)，并进行重新构建。
> 请记住，我们不建议这样做，因为配置环境以从源代码编译 并非易事，并且需要花费大量时间。
