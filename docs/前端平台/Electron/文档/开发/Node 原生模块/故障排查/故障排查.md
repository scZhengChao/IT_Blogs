# 故障排查

## 目录

- [关于win\_delay\_load\_hook的说明](#关于win_delay_load_hook的说明)

如果您安装了本机模块并发现它无法正常工作，则需要检查以下内容：

- 当有疑问时，请先执行 `@electron/rebuild`。
- 确保原生模块与`Electron`应用程序的目标平台和体系结构兼容。
- 确保在该模块的`binding.gyp`中`win_delay_load_hook`没有被设置为`false`。
- 如果升级了 `Electron`，你通常需要重新编译这些模块。

### 关于`win_delay_load_hook`的说明

在Windows上，默认情况下，`node-gyp`将原生模块与`node.dll`链接。 然而，在Electron 4.x和更高的版本中，原生模块需要的symbols由`electron.exe`导出，并且没有`node.dll`
