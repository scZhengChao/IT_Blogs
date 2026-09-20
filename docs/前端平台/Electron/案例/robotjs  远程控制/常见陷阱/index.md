# 常见陷阱

## 目录

- [node-headers.tar.gz无法下载](#node-headerstargz无法下载)
  - [1. 下载离线 Node.js 头文件](#1-下载离线-Nodejs-头文件)
  - [2. 设置环境变量以使用离线缓存](#2-设置环境变量以使用离线缓存)
    - [Linux 和 macOS](#Linux-和-macOS)
    - [Windows](#Windows)
  - [3. 重新尝试安装或编译robotjs](#3-重新尝试安装或编译robotjs)
  - [4. 验证是否使用离线缓存成功](#4-验证是否使用离线缓存成功)
  - [注意事项](#注意事项)
  - [查看环境变量](#查看环境变量)
- [windows-build-tools（VS）](#windows-build-toolsVS)
  - [设置python 镜像](#设置python-镜像)
  - [命令解释](#命令解释)

# node-headers.tar.gz无法下载

当`robotjs`无法下载 Node.js 头文件时，可以通过配置使用离线缓存来解决问题，以下是具体步骤：

### 1. 下载离线 Node.js 头文件

- **确定 Node.js 版本**：在终端中运行`node -v`查看当前使用的 Node.js 版本，例如`v18.16.0`。
- **下载头文件压缩包**：访问[Node.js 官方发布页面](https://nodejs.org/download/release/ "Node.js 官方发布页面")，找到与你当前 Node.js 版本对应的目录（如`v18.16.0`），下载名为`node-v<版本号>-headers.tar.gz`的文件（如`node-v18.16.0-headers.tar.gz`）。为了加快下载速度，也可以使用国内镜像源，如[淘宝镜像（npmmirror）](https://npmmirror.com/dist "淘宝镜像（npmmirror）")。

### 2. 设置环境变量以使用离线缓存

根据不同的操作系统，设置相应的环境变量让`node-gyp`（`robotjs`编译依赖它）从本地获取头文件。

#### Linux 和 macOS

打开终端，运行以下命令设置环境变量：

```bash 
export NODEJS_ORG_MIRROR=file://<离线头文件压缩包所在目录的绝对路径>
export NODE_PRE_GYP_OFFLINE=true
```


例如，若头文件压缩包存放在`/home/user/offline_node_headers`目录下，则命令为：

```bash 
export NODEJS_ORG_MIRROR=file:///home/user/offline_node_headers
export NODE_PRE_GYP_OFFLINE=true
```


#### Windows

在命令提示符中，使用以下命令设置环境变量：

```batch 
set NODEJS_ORG_MIRROR=file://<离线头文件压缩包所在目录的绝对路径>
set NODE_PRE_GYP_OFFLINE=true
```


在 PowerShell 中，则使用：

```powershell 
$env:NODEJS_ORG_MIRROR = "file://<离线头文件压缩包所在目录的绝对路径>"
$env:NODE_PRE_GYP_OFFLINE = "true"
```


假设压缩包存放在`C:\Users\username\Downloads\offline_node_headers`目录，在 PowerShell 中的命令为：

```powershell 
$env:NODEJS_ORG_MIRROR = "file://C:\Users\username\Downloads\offline_node_headers"
$env:NODE_PRE_GYP_OFFLINE = "true"
```


### 3. 重新尝试安装或编译`robotjs`

在设置好环境变量后，重新执行`robotjs`的安装或编译操作。

### 4. 验证是否使用离线缓存成功

如果安装或编译过程没有再尝试从网络下载 Node.js 头文件，而是直接从本地目录获取，并且最终`robotjs`安装或编译成功，说明离线缓存配置生效。

### 注意事项

- **路径格式**：确保环境变量中指定的本地目录路径格式正确，特别是在 Windows 系统中，使用反斜杠\`\`时需要进行转义，或者使用正斜杠`/`替代。
- **版本匹配**：离线的头文件压缩包版本必须与当前使用的 Node.js 版本完全一致，否则可能会导致编译错误。
- 如何file 协议不支持；可以起一个本地服务；

### 查看环境变量

1. 按`Win+R`打开运行对话框，输入`cmd`并按回车键，打开命令提示符。
2. 查看所有环境变量，输入`set`命令并按下回车键，命令行会列出系统的环境变量和用户的环境变量。
3. 查看特定的环境变量，输入`set 变量名`，如`set PATH`，即可查看指定环境变量的值。

# windows-build-tools（VS）

##### 设置python 镜像

```bash 
cnpm --python_mirror=https://npmmirror.com/mirrors/python/install --global windows-build-tools
```


你给出的这个命令尝试使用`cnpm`来安装`windows-build-tools`，并且通过`--python_mirror`参数指定了 Python 镜像源为`https://npmmirror.com/mirrors/python/`。下面为你详细分析该命令及可能出现的情况：

### 命令解释

- **`cnpm`**：这是淘宝镜像提供的`npm`替代工具，使用`cnpm`可以加快在国内网络环境下的包下载速度，因为它从国内的镜像源获取包资源。
- **`--python_mirror=https://npmmirror.com/mirrors/python/`**：该参数用于指定 Python 安装包的镜像源地址。`windows-build-tools`在安装过程中可能需要下载 Python 安装包，指定这个镜像源可以避免从官方源下载缓慢或失败的问题。
- **`install --global windows-build-tools`**：这部分是标准的`npm`安装命令，`--global`表示全局安装，意味着`windows-build-tools`会被安装到系统的全局`node_modules`目录中，可供所有项目使用。
