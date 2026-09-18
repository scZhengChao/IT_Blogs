# fnm

## 目录

- [安装 fnm](#安装-fnm)
- [设置Node.js版本别名](#设置Nodejs版本别名)
- [卸载 fnm](#卸载-fnm)
- [根据项目自动切换node版本](#根据项目自动切换node版本)
- [fnm自动切换 Node 版本的原理](#fnm自动切换-Node-版本的原理)
- [如何启用fnm自动切换功能](#如何启用fnm自动切换功能)
  - [(1) 确保fnm已安装并配置 Shell 插件](#1-确保fnm已安装并配置-Shell-插件)
    - [安装fnm（如果尚未安装）](#安装fnm如果尚未安装)
    - [配置 Shell 插件（以bash/zsh为例）](#配置-Shell-插件以bashzsh为例)
- [在项目中设置 Node 版本](#在项目中设置-Node-版本)
  - [(1) 使用.node-version文件（推荐）](#1-使用node-version文件推荐)
  - [(2) 使用.nvmrc文件（兼容nvm）](#2-使用nvmrc文件兼容nvm)
- [测试自动切换功能](#测试自动切换功能)
  - [(1) 进入项目目录](#1-进入项目目录)
  - [检查当前 Node 版本](#检查当前-Node-版本)
  - [查看fnm当前使用的版本](#查看fnm当前使用的版本)
- [手动切换版本（备用方案）](#手动切换版本备用方案)
- [. 常见问题](#-常见问题)
  - [Q1:fnm没有自动切换版本？](#Q1fnm没有自动切换版本)
  - [Q2: 如何查看fnm支持的 Node 版本？](#Q2-如何查看fnm支持的-Node-版本)
  - [Q4: 如果node -v 的版本和 fnm current 的版本不一致](#Q4-如果node--v-的版本和-fnm-current-的版本不一致)
  - [Q3:fnm和nvm的区别？](#Q3fnm和nvm的区别)
- [总结](#总结)

[ GitHub - Schniz/fnm: 🚀 Fast and simple Node.js version manager, built in Rust 🚀 Fast and simple Node.js version manager, built in Rust - Schniz/fnm https://github.com/Schniz/fnm](https://github.com/Schniz/fnm " GitHub - Schniz/fnm: 🚀 Fast and simple Node.js version manager, built in Rust 🚀 Fast and simple Node.js version manager, built in Rust - Schniz/fnm https://github.com/Schniz/fnm")

fnm，或快速Node管理器，是一个**用Rust编写的Node版本管理**器。速度比nvm快很多；由于它是一个版本管理器，因此可以轻松安装不同的 Node.js 版本。您可以通过以下命令 install 安装 Node：

```bash 
fnm install <version>
fnm uninstall <version> #uninstall a version of Node.js
fnm uninstall 19.3.0 #use this version of Node.js
fnm install --latest

否则，要安装 lts 版本，只需传递 --lts 参数：
fnm install --lts

此 bash 命令告诉 fnm 列出 所有可供下载的Node版本： 
fnm ls-remote

如果您想查看系统上安装了哪些版本，只需编写：
fnm list

要使用特定版本的 Node，我们必须运行该 use 命令。它遵循以下语法：
fnm use <version>

我们可以使用以下命令 current 验证是否已更改版本：
fnm current 


```


此外，这个项目是用 Rust 编写的。这意味着这 fnm 为桌面带来了速度和稳定性。

## 安装 fnm

该 fnm 团队捆绑了一个安装脚本，使下载软件变得轻而易举。要运行此脚本，请在终端中键入以下命令：

```bash 
curl -fsSL https://fnm.vercel.app/install | bash
brew install fnm

```


完成后，通过编写此 bash 命令来验证一切是否正常工作：

```bash 
fnm --help

```


## 设置Node.js版本别名

别名允许开发人员按语义“命名”某些Node版本。这是一个很棒的功能，因为这意味着程序员在处理许多项目时不需要记住多个 Node 版本。

若要设置别名，请使用以下语法：

```bash 
fnm alias <version> <name> 

For example, 例如:
fnm alias 18.12.1 my-project
要验证我们的别名是否已成功配置，我们可以重新运行 fnm list ：

```


## 卸载 fnm

要清除 fnm，我们必须首先找到它的安装目录：

```bash 
fnm env #get all environment variables

```


![](image_SxRDGgdgYv.png)

此处， `FNM_DIR` 变量指示 的位置 fnm 。下一步，转到路径并简单地删除 fnm 文件夹，如下所示：

```bash 
#in this case, fnm was in the 'share' folder
cd $HOME/.local/share
rm -rf fnm #removing this folder will uninstall this software

```


## 根据项目自动切换node版本

​**​`fnm`（Fast Node Manager）​**​ 支持根据项目自动切换 Node.js 版本，类似于`nvm`的`.nvmrc`功能。`fnm`通过 ​**​`.node-version`****或****`.nvmrc`文件​**​ 来检测并自动切换 Node 版本。

## \*\*`fnm`\*\***自动切换 Node 版本的原理**

`fnm`会检查当前目录（或父目录）是否存在以下文件：

- **`.node-version`**（`fnm`原生支持的文件）
- **`.nvmrc`**（兼容`nvm`的配置文件）

如果找到这些文件，`fnm`会读取其中指定的 Node 版本，并自动切换。

## **如何启用**\*\*`fnm`\*\***自动切换功能**

### **(1) 确保**\*\*`fnm`\*\***已安装并配置 Shell 插件**

`fnm`需要正确安装并加载 Shell 插件才能支持自动切换。

#### **安装**\*\*`fnm`（如果尚未安装）\*\*​

```markdown 
# 使用 brew 安装（macOS/Linux）
brew install fnm

# 或者使用 curl 安装（Linux/macOS）
curl -fsSL https://fnm.vercel.app/install | bash
```


#### **配置 Shell 插件（以**\*\*`bash`****/****`zsh`\*\***为例）**

将以下内容添加到你的 Shell 配置文件（如`~/.bashrc`、`~/.zshrc`）：

```bash 
eval "$(fnm env --use-on-cd)"
```


- `--use-on-cd`表示 **进入目录时自动切换 Node 版本**（关键功能！）。
- 然后重新加载 Shell：

```bash 
source ~/.bashrc  # 或 source ~/.zshrc
```


## **在项目中设置 Node 版本**

### **(1) 使用**\*\*`.node-version`\*\***文件（推荐）**

在项目根目录创建`.node-version`文件，并指定 Node 版本：

```bash 
echo "20.11.1" > .node-version
```


- `fnm`会自动识别并切换到该版本。

### **(2) 使用**\*\*`.nvmrc`****文件（兼容****`nvm`）\*\*​

如果项目已有`.nvmrc`文件（如`node -v > .nvmrc`生成的文件），`fnm`也能识别并切换版本。

## **测试自动切换功能**

### **(1) 进入项目目录**

```bash 
cd /path/to/your-project
```


### **检查当前 Node 版本**

```bash 
node -v
```


- 如果`fnm`配置正确，它会自动切换到`.node-version`或`.nvmrc`中指定的版本。

### **查看**\*\*`fnm`\*\***当前使用的版本**

```rust 
fnm current
```


输出示例：

```bash 
v20.11.1 (set by /path/to/your-project/.node-version)
```


## **手动切换版本（备用方案）**

如果自动切换未生效，可以手动指定版本：

```bash 
fnm use 20.11.1  # 切换到指定版本
```


或直接运行：

```rust 
fnm use         # 根据 .node-version 或 .nvmrc 自动切换
```


## **. 常见问题**

### **Q1:** \*\*​`fnm`\*\***没有自动切换版本？**

- 检查 Shell 配置是否包含`eval "$(fnm env --use-on-cd)"`。
- 确保项目根目录有`.node-version`或`.nvmrc`文件。
- 运行`fnm current`查看当前版本是否匹配。

### **Q2: 如何查看**\*\*`fnm`\*\***支持的 Node 版本？**

```bash 
fnm ls-remote
```


- 可以安装指定版本：

```bash 
fnm install 20.11.1
```


### Q4: 如果node -v 的版本和 fnm current 的版本不一致

- 如果你之前通过`brew install node`、`apt install nodejs`或直接下载二进制包安装了 Node.js，系统可能会优先使用这些版本，而不是`fnm`管理的版本。请先卸载
- 如果系统的 Node 路径（如`/usr/local/bin/node`）在`PATH`中比`fnm`的路径更靠前，Shell 会优先使用系统 Node，而不是`fnm`的版本。
- 确保由fnm 唯一管理

### **Q3:** \*\*​`fnm`****和****`nvm`\*\***的区别？**

| 特性   | \`fnm\`                | \`nvm\`             |
| ---- | ---------------------- | ------------------- |
| 安装速度 | 极快（Rust 编写）            | 较慢（Shell 脚本）        |
| 性能   | 更快（无子 Shell）           | 较慢（依赖子 Shell）       |
| 跨平台  | 支持 macOS/Linux/Windows | 主要支持 macOS/Linux    |
| 自动切换 | 支持（\`--use-on-cd\`）    | 支持（需\`zsh\`插件或手动配置） |

***

## **总结**

- \*\*`fnm`\*\***完全支持根据项目自动切换 Node 版本**，只需：
  1. 安装`fnm`并配置`--use-on-cd`。
  2. 在项目根目录创建`.node-version`或`.nvmrc`文件。
- **比**\*\*`nvm`\*\***更快、更轻量**，适合现代开发环境。

如果仍有问题，请提供：

- 你的 Shell 类型（`echo $SHELL`）。
- `fnm env --use-on-cd`是否已添加到 Shell 配置。
- 项目目录的`.node-version`或`.nvmrc`文件内容。
