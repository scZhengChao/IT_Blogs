# 扩展: close 事件

Electron在 `MessagePort` **添加了一个在Web上本不存在的功能**，以使MessagePort更加好用。 这个功能就是 `close` 事件, 在**通道的另一端关闭时会触发该事件。 端口也可以通过垃圾回收而隐式关闭。**

在渲染进程中，你可以通过将事件分配给`port.onclose` 或调用 `port.addEventListener('close', ...)` **来监听 ****`close`**** 事件。** 在主进程中，你可以通过调用 `port.on('close', ...)` 来监听 `close` 事件。
