# electron 详细使用robotjs 的详细安装编译 步骤

## 目录

- [1. 安装 Node.js 和 npm](#1-安装-Nodejs-和-npm)
- [2. 创建 Electron 项目](#2-创建-Electron-项目)
- [3. 安装robotjs](#3-安装robotjs)
- [4. 安装node-gyp](#4-安装node-gyp)
- [5. 安装编译工具](#5-安装编译工具)
  - [Windows](#Windows)
  - [macOS](#macOS)
  - [Linux](#Linux)
- [6. 配置node-gyp](#6-配置node-gyp)
- [7. 编译robotjs](#7-编译robotjs)
- [8. 使用robotjs编写代码](#8-使用robotjs编写代码)
- [9. 运行 Electron 应用](#9-运行-Electron-应用)
- [10. 打包 Electron 应用（可选）](#10-打包-Electron-应用可选)
- [常见问题](#常见问题)

Electron 项目中使用`robotjs`进行桌面自动化时，由于`robotjs`是一个原生模块，需要编译才能使用。以下是详细的安装和编译步骤：

### 1. 安装 Node.js 和 npm

确保你已经安装了 Node.js 和 npm。如果没有安装，可以从[Node.js 官网](https://nodejs.org/ "Node.js 官网")下载并安装。

### 2. 创建 Electron 项目

如果你还没有 Electron 项目，可以通过以下步骤创建一个：

```bash 
mkdir my-electron-app
cd my-electron-app
npm init -y
npm install electron --save-dev
```


### 3. 安装`robotjs`

在项目目录中安装`robotjs`：

```javascript 
npm install robotjs
```


### 4. 安装`node-gyp`

`robotjs`是一个原生模块，需要使用`node-gyp`进行编译。首先确保你已经安装了`node-gyp`：

```bash 
npm install -g node-gyp
```


### 5. 安装编译工具

`node-gyp`需要一些编译工具，具体取决于你的操作系统。

#### Windows

- 安装[Python 2.7](https://www.python.org/downloads/release/python-2718/ "Python 2.7")（确保在环境变量中）。
- 安装[Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/ "Visual Studio Build Tools")，选择“使用 C++ 的桌面开发”工作负载。

#### macOS

- 安装 Xcode 命令行工具：

```bash 
xcode-select --install
```


#### Linux

- 安装编译工具和 Python：

```bash 
sudo apt-get install build-essential python
```


### 6. 配置`node-gyp`

在项目根目录下创建一个`binding.gyp`文件（如果不存在），并确保`node-gyp`能够找到正确的配置。

### 7. 编译`robotjs`

在项目目录中运行以下命令来编译`robotjs`：

```bash 
npx electron-rebuild
```


`electron-rebuild`会自动为 Electron 重新编译所有原生模块。

### 8. 使用`robotjs`编写代码

在 Electron 的主进程或渲染进程中，你可以使用`robotjs`进行桌面自动化。例如：

```javascript 
const robot = require('robotjs');

// 移动鼠标到屏幕中心
const screenSize = robot.getScreenSize();
const x = screenSize.width / 2;
const y = screenSize.height / 2;
robot.moveMouse(x, y);

// 点击鼠标
robot.mouseClick();
```


### 9. 运行 Electron 应用

使用以下命令运行你的 Electron 应用：

```javascript 
npx electron .
```


### 10. 打包 Electron 应用（可选）

如果你想打包你的 Electron 应用，可以使用`electron-packager`或`electron-builder`等工具。

```javascript 
npm install electron-packager --save-dev
npx electron-packager . --platform=win32 --arch=x64
```


### 常见问题

- **编译错误**：确保你已经安装了所有必要的编译工具，并且 Python 版本正确。
- **Electron 版本不匹配**：确保`electron-rebuild`使用的 Electron 版本与你的项目一致。

通过以上步骤，你应该能够在 Electron 项目中成功安装并使用`robotjs`。
