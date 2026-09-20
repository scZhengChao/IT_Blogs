# 应用层(窗口)和主进程通信应用案例

应用层和主进程之间的通信流程是:

1. `应用层使用ipcRender.send方法将事件及数据传递到主进程`
2. `主进程使用ipcMain.on或者ipcMain.once方法监听事件并获取数据`
3. `主进程使用ipcMain.removeListener移除事件监听或者ipcMain.removeAllListeners移除所有事件监听`
4. `主进程使用窗口实例的webContents.send方法将事件和数据传递到应用层`
5. `应用层使用ipcRender.on或者ipcRender.once监听事件并获取数据`
6. `应用层使用ipcRenderer.removeListener移除事件监听或者ipcRenderer.removeAllListeners移除所有事件监听`

**图解如下**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/73f11c2b010e454293c5c00f8342dfa9~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2824\&h=736\&s=115852\&e=jpg\&b=e48484)

[将ipcRender，process注入到应用层](./将ipcRender，process注入到应用层/index.md "将ipcRender，process注入到应用层")

[应用层封装注入的Api](./应用层封装注入的Api/index.md "应用层封装注入的Api")

[应用层发送事件到主进程](./应用层发送事件到主进程/index.md "应用层发送事件到主进程")

[主进程接收事件并向应用层发送事件](./主进程接收事件并向应用层发送事件/index.md "主进程接收事件并向应用层发送事件")
