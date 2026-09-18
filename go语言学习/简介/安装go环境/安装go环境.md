# 安装go环境

## 目录

- [一、使用 Homebrew 安装 Go](#一使用-Homebrew-安装-Go)
  - [前提条件](#前提条件)
  - [安装步骤](#安装步骤)
- [二、使用 Homebrew 管理 Go（升级/卸载）](#二使用-Homebrew-管理-Go升级卸载)

### **一、使用 Homebrew 安装 Go**

#### **前提条件**

- ∙确保你的系统已安装 **Homebrew**。如果未安装，请先通过以下命令安装：

```bash 
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```


#### **安装步骤**

1. **打开终端 (Terminal)**。
2. **执行安装命令**：

```bash 
brew install go
```


1. 这条命令会：
   - 自动下载最新稳定版的 Go。
   - 自动编译和安装。
   - 自动为你设置好必要的环境变量（主要是将 Go 的二进制文件路径添加到 `PATH` 中）。
2. **验证安装**： &#x20;

   安装完成后，运行以下命令检查是否成功

```json 
go version
```


如果输出类似 `go version go1.21.4 darwin/arm64` 的信息，说明安装成功。

### **二、使用 Homebrew 管理 Go（升级/卸载）**

这是 Homebrew 相比手动安装最大的优势所在。

- **检查更新**：查看是否有可用的 Go 版本更新。

```bash 
brew outdated go
```


**升级 Go​**​：如果发现有新版本，一条命令即可升级。

```bash 
brew upgrade go
```


- 升级后，再次运行 `go version` 确认版本已更新。
  - **卸载 Go**：如果你需要卸载。

```bash 
brew uninstall go
```
