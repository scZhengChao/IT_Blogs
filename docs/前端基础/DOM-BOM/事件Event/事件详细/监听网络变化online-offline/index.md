# 监听网络变化online/offline

你可以在网络状态变化时立刻感知到，然后做出对应处理——比如提示用户、暂停请求、把操作临时存本地，或者等网络恢复后再同步。

```javascript 
window.addEventListener("offline", () => {
  alert("You are offline. Your internet is gone");
});

window.addEventListener("online", () => {
  alert("You're back. welcome back");
});
```


这东西特别适合做“先别慌”的第一层体验处理。

当然，确实有个现实问题要提醒： 浏览器判断“在线”，并不等于你的后端服务一定可用。它只能说明：**设备看起来是联网的。**

但即便如此，这两个事件依然非常值得用。因为在很多场景下，用户需要的并不是一套巨型架构，而是一个及时、明确、足够友好的反馈。
