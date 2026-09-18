# &#x20;版本管理工具&#x20;

## 目录

- [一、最主流的选择：g](#一最主流的选择g)
  - [1. 安装 g](#1-安装g)
  - [2. 使用 g 管理版本](#2-使用g管理版本)
  - [3. g 的优势](#3g的优势)

在 Go 语言生态中，最流行和广泛使用的版本管理工具是 **`g`**（由 voidint 开发）。它类似于 Node.js 的 `nvm` 或 Python 的 `pyenv`，专门用于在单台机器上安装和切换多个 Go 版本。

***

### **一、最主流的选择：`g`**

#### \*\*1. 安装 \*\*​**`g`**

```markdown 
# 方式一：使用 Go 安装（推荐）
go install github.com/voidint/g@latest

# 方式二：通过 curl 安装
curl -sSL https://raw.githubusercontent.com/voidint/g/master/install.sh | bash

# 方式三：通过 wget 安装
wget -qO- https://raw.githubusercontent.com/voidint/g/master/install.sh | bash
```


#### **2. 使用 ****`g`**** 管理版本**

安装后，`g` 会自动将其二进制文件路径（通常是 `$HOME/.g/go/bin`）添加到你的 `PATH` 环境变量中（需要重启终端或执行 `source ~/.bashrc`/`source ~/.zshrc`）。

```markdown 
# 查看所有可安装的稳定版本
g ls-remote stable

# 安装指定版本（如 1.21.4）
g install 1.21.4

# 安装最新版本
g install latest

# 查看已安装的版本
g ls

# 切换当前使用的版本
g use 1.21.4

# 查看当前使用的版本
go version

# 卸载某个版本
g uninstall 1.20.0
```


#### **3. ****`g`**** 的优势**

- ∙**简单易用**：命令直观，学习成本低。
- ∙**无需权限**：所有版本都安装在用户目录下（`~/.g/`），不需要 `sudo`。
- ∙**自动配置**：自动管理 `GOROOT` 和 `PATH`。
- ∙**下载快**：支持从国内镜像源下载，避免网络问题。
