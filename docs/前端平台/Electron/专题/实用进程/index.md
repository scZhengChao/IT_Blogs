# 实用进程

## 目录

- [特定于进程的模块别名 (TypeScript)](#特定于进程的模块别名-TypeScript)

每个 `Electron` 应用都可以使用[UtilityProcess](https://electron.nodejs.cn/docs/latest/api/utility-process "UtilityProcess")API 从主进程生成多个子进程。该实用程序进程在 `Node.js` 环境中运行，这意味着它能够使用`require`模块**并使用所有 Node.js API**。该实用程序进程可**用于托管例如：不受信任的服务、CPU 密集型任务或容易崩溃的组件**，这些组件以前托管在主进程或使用 Node.js[child\_process.fork](https://nodejs.cn/dist/latest-v16.x/docs/api/child_process.html#child_processforkmodulepath-args-options "child_process.fork")API 生成的进程中。

实用程序进程与 Node.js child\_process 模块生成的进程之间的主要区别在于，

**实用程序进程可以使用**[**MessagePort**](https://web.nodejs.cn/en-US/docs/Web/API/MessagePort "MessagePort")**与渲染器进程建立通信通道**。当需要从主进程派生子进程时，Electron 应用总是更喜欢[UtilityProcess](https://electron.nodejs.cn/docs/latest/api/utility-process "UtilityProcess")API 而不是 Node.js[child\_process.fork](https://nodejs.cn/dist/latest-v16.x/docs/api/child_process.html#child_processforkmodulepath-args-options "child_process.fork")API。

## 特定于进程的模块别名 (TypeScript)

Electron 的 npm 包还导出包含 Electron TypeScript 类型定义子集的子路径。

- `electron/main`包括所有主要过程模块的类型。
- `electron/renderer`包括所有渲染器进程模块的类型。
- `electron/common`包括可以在主进程和渲染器进程中运行的模块的类型。

这些别名对运行时没有影响，但可用于类型检查和自动补齐。

[utilityProcess](./utilityProcess/index.md "utilityProcess")

[process](./process/index.md "process")
