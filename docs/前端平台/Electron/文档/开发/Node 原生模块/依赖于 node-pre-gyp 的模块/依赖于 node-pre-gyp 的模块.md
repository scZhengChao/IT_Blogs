# 依赖于 node-pre-gyp 的模块

[node-pre-gyp](https://github.com/mapbox/node-pre-gyp "node-pre-gyp")[ 工具](https://github.com/mapbox/node-pre-gyp " 工具") 提供一种部署原生 Node 预编译二进制模块的方法， 许多流行的模块都是使用它。

有时这些模块在`electron`下正常工作，但当没有针对`electron`的二进制文件可用时，你需要根据源代码构建这些文件 因此，建议为这些模块使用`@electron/rebuild`

如果你通过`npm`的方式安装模块，你需要传入`--build-from-source`给`npm`，或是设置环境变量名为`npm_config_build_from_source`。
