# 某些 API 需要额外解压档案包

大多数 `fs` API可以在**不解压的情况下从ASAR档案中读取文件**或获取文件的信息，但对于一些**依赖于向底层系统调用传递真实文件路径**的`API`，`Electron`会将所需的文件提取到临时文件中，并将临时文件的路径传递给这些API，以使其正常工作。 对于这类API，会增加一些开销。

以下是一些需要额外解压的 API：

- `child_process.execFile`
- `child_process.execFileSync`
- `fs.open`
- `fs.openSync`
- `process.dlopen` - 用在 `require` 原生模块时
