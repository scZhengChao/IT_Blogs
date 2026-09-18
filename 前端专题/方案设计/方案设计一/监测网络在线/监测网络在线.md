# 监测网络在线

## 目录

- [如何检查是否有网络](#如何检查是否有网络)
  - [怎么才能解决这个问题呢？](#怎么才能解决这个问题呢)

# 如何检查是否有网络

我们可以利用`navigator.onLine`API 来检测网络状态。`navigator.onLine`会返回一个布尔值来显示用户是否在线。`true`表示在线，`false`表示离线，只要浏览器连接到网络的状态发生改变，属性值就会发生改变

我们可以监听网页加载事件，在网页加载时获取`navigator.onLine`的值

```javascript 
window.addEventListener('load', () => {
  const status = navigator.onLine;
});
```


上面的做法在网站最开始加载的时，是可以准确获取用户的网站状态的。但是有一个缺点，就是当获取完用户的网络状态后，网络又发生改变，状态值会无法及时更新！！！

### 怎么才能解决这个问题呢？

> 我们可以写一个监听断网和联网来解决这个问题

```javascript 
const status1 = document.querySelector(".status");
//load 监听网页加载事件
window.addEventListener("load", () => {
  const handleNetworkChange = () => {
    if (navigator.onLine) {
      //给status下的offline-msg和online-msg添加类名样式
      status1.classList.remove("offline");
    } else {
      //给status下的offline-msg和online-msg添加类名样式
      status1.classList.add("offline");
    }
  };
// online该事件在浏览器开始在线工作时触发
  window.addEventListener("online", handleNetworkChange);
  // offline该事件在浏览器开始离线工作时触发。
  window.addEventListener("offline", handleNetworkChange);
});

```
