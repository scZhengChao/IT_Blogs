# 开发先决条件

## 目录

- [Node.js/node-gyp](#Nodejsnode-gyp)
- [Visual Studio 2017](#Visual-Studio-2017)
  - [创建交叉编译命令提示符](#创建交叉编译命令提示符)
- [与正确的 node.lib 连接](#与正确的-nodelib-连接)

### Node.js/node-gyp

[建议使用 Node.js v12.9.0 或更高版本。](https://nodejs.org/en/ "建议使用 Node.js v12.9.0 或更高版本。") 如果您不希望更新到新版本的 Node，则可以 [手动更新 npm 的 node-gyp 副本](https://github.com/nodejs/node-gyp/wiki/Updating-npm's-bundled-node-gyp "手动更新 npm 的 node-gyp 副本") 到 5.0.2 或更高版本，其中包含编译 Arm 原生模块所必需的更改。

### Visual Studio 2017

需要 Visual Studio 2017 (任何版本) 来交叉编译原生模块。 您可以通过 Microsoft 的 [Visual Studio Dev Essentials程序](https://visualstudio.microsoft.com/dev-essentials/ "Visual Studio Dev Essentials程序") 下载Visual Studio Community 2017 安装后，您可以通过从 *命令提示符* 运行以下内容来添加特定的 Arm 组件：

```javascript 
vs_installer.exe ^
--add Microsoft.VisualStudio.Workload.NativeDesktop ^
--add Microsoft.VisualStudio.Component.VC.ATLMFC ^
--add Microsoft.VisualStudio.Component.VC.Tools.ARM64
--add Microsoft.VisualStudio.Component.VC.MFC.ARM64 ^
--inclusdeRecommendation。
```


#### 创建交叉编译命令提示符

在环境中设置 `npm_config_arch=arm64` 以创建正确的 arm64 `.obj` 文件， 但是\_VS 2017 的Developer Command Prompt\_ 将使用x64链接器。 要解决这个问题：

1. 请将位于开始菜单中的 *x64\_x86 Cross Tools Command Prompt for VS 2017* 快捷方式复制一份到方便的位置（例如，通过定位到快捷方式，右键单击，选择 *打开文件位置*，然后复制并粘贴）。
2. 右键单击新快捷方式并选择 *属性*。
3. 将 *Target* 字段改为在结尾处读取 `vcvarsamd64_arm64.bat` ，而不是 `vcvarsamd64_x86.bat`。

如果成功完成，命令提示应在启动时打印类似于此的内容：

```javascript 
**********************************************************************
** Visual Studio 2017 Developer Command Prompt v15.9.15
** Copyright (c) 2017 Microsoft Corporation
**********************************************************************
[vcvarsall.bat] Environment initialized for: 'x64_arm64'
```


如果您想要在 Windows on Arm 设备上直接开发您的应用程序， 在 *Target* 中替换 `vcvarsx86_arm64.bat` ，以便能够在设备的 x86 仿真时进行交叉编译。

### 与正确的 `node.lib` 连接

默认情况下， `node-gyp` 解包了Electron的Node Headers，并将x86和x64版本的 `node.lib` 下载到 `%APPDATA%..\Local\node-gyp\Cache`， 但它没有下载arm64版本([此修复正在开发中](https://github.com/nodejs/node-gyp/pull/1875 "此修复正在开发中").) 要解决这个问题：

1. 从 [https://electronjs.org/headers/v6.0.9/win-arm64/node.lib](https://electronjs.org/headers/v6.0.9/win-arm64/node.lib "https://electronjs.org/headers/v6.0.9/win-arm64/node.lib") 下载arm64 `node.lib`
2. 移动到 `%APPDATA%..\Local\node-gyp\Cache\6.0.9\arm64\node.lib`

将 `6.0.9`替换为您正在使用的版本。
