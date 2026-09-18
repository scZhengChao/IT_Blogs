# go 换源

## 目录

- [一、推荐方案：使用环境变量 GOPROXY](#一推荐方案使用环境变量GOPROXY)
  - [1. 设置全局代理（推荐）](#1-设置全局代理推荐)
  - [2. 临时设置代理（单次终端会话有效）](#2-临时设置代理单次终端会话有效)
  - [3. 验证代理是否生效](#3-验证代理是否生效)
- [二、私有模块配置：GOPRIVATE](#二私有模块配置GOPRIVATE)
- [三、其他国内可用代理源](#三其他国内可用代理源)
- [四、完整的环境配置示例（一次性设置）](#四完整的环境配置示例一次性设置)
  - [3. 如何恢复默认设置？](#3-如何恢复默认设置)
- [总结](#总结)

### \*\*一、推荐方案：使用环境变量 \*\*​**`GOPROXY`**

这是最主流、最有效的方法。`GOPROXY` 环境变量可以指定 Go 在下载模块时的代理服务器。

#### **1. 设置全局代理（推荐）**

在终端中执行以下命令，即可设置为国内最常用的代理：

```markdown 
# 使用七牛云提供的代理 (国内最稳定和快速的之一)
go env -w GOPROXY=https://goproxy.cn,direct

# 或者使用阿里云代理
go env -w GOPROXY=https://mirrors.aliyun.com/goproxy/,direct
```


**参数解释**：

- ∙`https://goproxy.cn` 或 `https://mirrors.aliyun.com/goproxy/`：代理服务器地址，用于加速公共模块的下载。
- ∙`,direct`：是一个特殊指令，表示当代理服务器找不到某个模块时，**直接** (`direct`) 回源到原始地址（如 GitHub、官方源）进行下载。这是一个重要的故障恢复机制。
- ∙`go env -w`：会将配置永久写入到 Go 的环境变量配置文件中（通常是 `$HOME/.config/go/env`）。

#### **2. 临时设置代理（单次终端会话有效）**

```bash 
export GOPROXY=https://goproxy.cn,direct
```


#### **3. 验证代理是否生效**

```go 
go env GOPROXY
```


如果输出 `https://goproxy.cn,direct`，说明设置成功

### **二、私有模块配置：`GOPRIVATE`**

如果你的项目依赖公司内部的私有模块（例如 `code.byted.org/...`），直接走代理会失败。这时需要设置 `GOPRIVATE` 环境变量，告诉 Go 对这些私有模块**不要使用代理**，而是直接访问。

```bash 
# 设置 GOPRIVATE，多个模块用逗号分隔
go env -w GOPRIVATE=code.byted.org

# 如果需要设置多个私有仓库
go env -w GOPRIVATE=code.byted.org,gitlab.com/yourcompany
```


**验证​**​：

```go 
go env GOPRIVATE
```


### **三、其他国内可用代理源**

除了上述推荐的，还有其他一些选择：

| 代理服务                                                               | 命令                                                                |
| ------------------------------------------------------------------ | ----------------------------------------------------------------- |
| **七牛云** \[\*\* Goproxy.cn \*\*]\(<http://Goproxy.cn> "Goproxy.cn") | \`go env -w GOPROXY=<https://goproxy.cn,direct`>                  |
| **阿里云**​                                                           | \`go env -w GOPROXY=<https://mirrors.aliyun.com/goproxy/,direct`> |
| \[\*\*goproxy.io\*\*]\(<http://goproxy.io> "goproxy.io")           | \`go env -w GOPROXY=<https://goproxy.io,direct`>                  |
| \*\*腾讯云\*\* (需开通)                                                  | \`go env -w GOPROXY=<https://mirrors.tencent.com/go/,direct`>     |

**特殊用法：仅使用国内无法下载的模块走代理**
如果你想绝大部分模块直连，仅对无法下载的模块使用代理，可以颠倒顺序：

```go 
go env -w GOPROXY=direct,https://goproxy.cn
```


但这种做法速度较慢，不推荐。

### **四、完整的环境配置示例（一次性设置）**

对于国内开发者，建议在安装 Go 后直接运行以下命令完成全部配置：

```markdown 
# 1. 设置公共模块代理
go env -w GOPROXY=https://goproxy.cn,direct

# 2. 设置私有模块（绕过代理）
go env -w GOPRIVATE=code.byted.org

# 3. (可选) 关闭 sum 校验（仅针对私有仓库，公共模块不建议关闭）
go env -w GOSUMDB=off

# 4. 验证配置
go env GOPROXY GOPRIVATE
```


**说明**：

- ∙第 3 步 `GOSUMDB=off`：关闭对模块的哈希校验。对于公司内部私有库，如果无法连接官方的校验数据库 `sum.golang.org`，可能会报错，关闭后可解决。**对公共模块，强烈建议保持开启状态以确保安全**。

#### **3. 如何恢复默认设置？**

```bash 
# 恢复默认的公共代理（官方源）
go env -w GOPROXY=https://proxy.golang.org,direct

# 清空 GOPRIVATE 设置
go env -w GOPRIVATE=
```


### **总结**

| 场景              | 配置命令                                             |
| --------------- | ------------------------------------------------ |
| **通用加速**​       | \`go env -w GOPROXY=<https://goproxy.cn,direct`> |
| **公司私有库**​      | \`go env -w GOPRIVATE=code.byted.org\`           |
| **关闭校验（私有库）** ​ | \`go env -w GOSUMDB=off\`                        |
| **验证配置**​       | \`go env GOPROXY GOPRIVATE\`                     |

**最佳实践**：

1. 1.使用 `GOPROXY` 加速公共模块下载。
2. 2.使用 `GOPRIVATE` 正确设置公司私有模块，让其直连。
3. 3.这样配置后，`go get`、`go mod tidy` 等命令的速度会有极大提升。
