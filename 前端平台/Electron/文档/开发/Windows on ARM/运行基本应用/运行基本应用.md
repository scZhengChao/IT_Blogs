# 运行基本应用

如果您的应用不使用任何原生模块，那么创建应用的 Arm 版本非常简单。

1. 确保应用的 `node_modules` 目录为空。
2. 使用 *命令提示符*，运行 `set npm_config_arch=arm64`，然后像往常一样运行 `npm install`/`yarn install`。
3. [如果您已将](https://www.electronjs.org/zh/docs/latest/tutorial/quick-start#prerequisites "如果您已将")[ Electron 安装为开发依赖项](https://www.electronjs.org/zh/docs/latest/tutorial/quick-start#prerequisites " Electron 安装为开发依赖项")，npm 将下载并解压缩 arm64 版本。 然后，您可以像往常一样打包和分发你的应用
