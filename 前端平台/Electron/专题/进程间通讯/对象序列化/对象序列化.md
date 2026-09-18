# 对象序列化

Electron 的 `IPC` 实现使用 `HTML` 标准的 [**结构化克隆算法**](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm "结构化克隆算法")\*\* **来**序列化**进程之间传递的**对象 \*\*，这意味着**只有某些类型的对象**可以通过 `IPC` 通道传递。

**特别是 DOM 对象**（例如 `Element`，`Location` 和 `DOMMatrix`），Node.js 中由 C++ 类**支持的对**象（例如 `process.env`，`Stream` 的一些成员）和 Electron 中由 C++ 类支持的对象（例如 `WebContents`、`BrowserWindow` 和 `WebFrame`）无法使用结构化克隆序列化。

> 具体的一些限制和规则；可以看下面地址

[ contextBridge | Electron 中文网 YAML history changes:\* pr-url:\[https://github.com/electron/electron/pull/40330\](https://github.com/electron/electron/pull/40330) description:"ipcRenderer 不再能通过 contextBridge 发送" breaking-changes-heade https://electron.nodejs.cn/docs/latest/api/context-bridge](https://electron.nodejs.cn/docs/latest/api/context-bridge " contextBridge | Electron 中文网 YAML history changes:* pr-url:\[https://github.com/electron/electron/pull/40330](https://github.com/electron/electron/pull/40330) description:\"ipcRenderer 不再能通过 contextBridge 发送\" breaking-changes-heade https://electron.nodejs.cn/docs/latest/api/context-bridge")
