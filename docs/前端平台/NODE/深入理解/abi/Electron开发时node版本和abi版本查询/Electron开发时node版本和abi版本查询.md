# Electron开发时node版本和abi版本查询

开发electron应用时，经常发生electron版本和本地NODE版本对不上的情况，可将如下日志放到electron应用中，输出electron环境中对应的electron版本号和NODE版本号，还有ABI版本号。

```javascript 
// electron 版本

console.log('process.versions.electron', process.versions.electron)

// ABI版本

console.log('process.versions.modules', process.versions.modules)

// NODE版本
console.log('process.versions.node', process.versions.node)

// V8 引擎版本
console.log('process.versions.v8', process.versions.v8)

// chrome版本
console.log('process.versions.chrome', process.versions.chrome)

// 架构信息
console.log('process.env.PROCESSOR_ARCHITECTURE', process.env.PROCESSOR_ARCHITECTURE)
```
