# 为 Electron 安装并重新编译模块

您可以像其他 `Node` 项目一样安装模块，然后用 [@electron/rebuild](https://github.com/electron/rebuild "@electron/rebuild") **包重建这些模块**以适配 `Electron` 。 这个包可以**自动识别**当前 `Electron` 版本，为你的**应用自动完成下载** headers、重新编译原生模块等步骤。 如果您正在使用 [Electron Forge](https://electronforge.io/ "Electron Forge")，这个**工具将在开发模式和发布时自动使用。**

例如，你可以通过下面的命令来安装独立的 `@electron/rebuild` 工具并重新编译模块:

```javascript 
npm install --save-dev @electron/rebuild

# Every time you run "npm install", run this:
./node_modules/.bin/electron-rebuild

# If you have trouble on Windows, try:
.\node_modules\.bin\electron-rebuild.cmd
```


有关使用和与其他工具（如`Electron Packager`）集成的更多信息，请参阅该项目的自述文件。
