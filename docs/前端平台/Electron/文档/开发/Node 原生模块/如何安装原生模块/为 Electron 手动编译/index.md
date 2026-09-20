# 为 Electron 手动编译

如果你是一个原生模块的开发人员，想在 Electron 中进行测试， 你可能要**手动编译** Electron 模块。 你可以 使用 `node-gyp` 直接编译：

```javascript 
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://electronjs.org/headers
```


- `HOME=~/.electron-gyp` 设置去哪找头文件
- `--target=1.2.3` 设置了 Electron 的版本。
- `--dist-url=...`设置了 Electron 的 headers 的下载地址。
- `--arch=x64` 设置了该模块为适配64位操作系统而编译。
