# 跳过二进制下载

在底层，`Electron` 的 `JavaScript` `API` 绑定到包含其实现的二进制文件。因为这个二进制文件对于任何 `Electron` 应用的功能都至关重要，所以每次从 npm 注册表安装`electron`时，**都会在**\*\*`postinstall`\*\***步骤中默认下载它。**

但是，如果你想安装项目的依赖但不需要使用 `Electron` 功能，则可以设置`ELECTRON_SKIP_BINARY_DOWNLOAD`**环境变量以防止下载二进制文件**。例如，当运行模拟`electron`模块的单元测试时，此功能在持续集成环境中非常有用。

```bash 
ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm install
```
