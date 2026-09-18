# 主进程中的 MessagePorts

在渲染器中， `MessagePort` 类的行为与它在 `web` 上的**行为完全一样**。 但是，主进程不是网页（它没有 Blink 集成），因此它没有 `MessagePort` 或 `MessageChannel` 类。 为了在主进程中处理 MessagePorts 并与之交互，`Electron` 添加了两个新类： [MessagePortMain](https://www.electronjs.org/zh/docs/latest/api/message-port-main "MessagePortMain") 和 [MessageChannelMain](https://www.electronjs.org/zh/docs/latest/api/message-channel-main "MessageChannelMain")。 这些行为 类似于渲染器中 `analogous` 类。

`MessagePort` 对象可以在**渲染器或主进程中创建**，并使用 [ipcRenderer.postMessage](https://www.electronjs.org/zh/docs/latest/api/ipc-renderer#ipcrendererpostmessagechannel-message-transfer "ipcRenderer.postMessage") 和 [WebContents.postMessage](https://www.electronjs.org/zh/docs/latest/api/web-contents#contentspostmessagechannel-message-transfer "WebContents.postMessage") **方法互相传递**。 请注意，通常的 IPC 方法，例如 `send` 和 `invoke` \*\*不能用来传输 \*\*`MessagePort`, **只有 ****`postMessage`**** 方法可以传输 ****`MessagePort`****。**

通过主进程传递 `MessagePort`，就**可以连接两个可能无法通信的页面 (例如，由于同源限制**) 。
