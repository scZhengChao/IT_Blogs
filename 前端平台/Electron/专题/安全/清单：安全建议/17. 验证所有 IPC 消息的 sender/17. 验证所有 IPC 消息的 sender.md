# 17. 验证所有 IPC 消息的 sender

## 目录

- [为什么？](#为什么)
- [怎么做？](#怎么做)

应始终**验证传入的 IPC 消息**的 `sender` **属性**，确保 未使用不受信任的渲染器执行动作或向不受信任的渲染器发送信息。

#### 为什么？

从理论上讲，所有 `Web Frame` 都可以将 `IPC` 消息发送到**主进程**，包括在某些情况下 `iframe` `和子窗口`。 如果您的 IPC 消息通过 `event.reply` 向发件人返回 用户数据，或者执行了渲染器 无法本机执行的特权操作，则应确保您没有侦听第三方 web frame。

您应该默认验证 **所有** IPC 消息 `sender` 。

#### 怎么做？

```javascript 
// 不好的做法
ipcMain.handle('get-secrets', () => {
  return getSecrets()
})

// 好的做法
ipcMain.handle('get-secrets', (e) => {
  if (!validateSender(e.senderFrame)) return null
  return getSecrets()
})

function validateSender (frame) {
  // 使用实际的URL解析器和白名单来评估URL的主机
  if ((new URL(frame.url)).host === 'electronjs.org') return true
  return false
}
```
