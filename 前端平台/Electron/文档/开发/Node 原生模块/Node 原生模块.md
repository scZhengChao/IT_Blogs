# Node 原生模块

原生`Node.js`模块由`Electron`支持，但由于`Electron`具有与给定`Node.js`不同的\*\* **[**应用二进制接口 (ABI)**](https://en.wikipedia.org/wiki/Application_binary_interface "应用二进制接口 (ABI)")(由于使用`Chromium`的 `BoringSL` 而不是 `OpenSSL` 等 差异)，**您使用的原生 模块需要为****`Electron`\*\***重新编译。** 否则，当您尝试运行您的应用程序时， 将会遇到以下的错误：

```javascript 
Error: The module '/path/to/native/module.node'
was compiled against a different Node.js version using
NODE_MODULE_VERSION $XYZ. This version of Node.js requires
NODE_MODULE_VERSION $ABC. Please try re-compiling or re-installing
the module (for instance, using `npm rebuild` or `npm install`).
```


[如何安装原生模块](如何安装原生模块.md "如何安装原生模块")

[故障排查](故障排查.md "故障排查")

[依赖于 node-pre-gyp 的模块](<依赖于 node-pre-gyp 的模块.md> "依赖于 node-pre-gyp 的模块")
