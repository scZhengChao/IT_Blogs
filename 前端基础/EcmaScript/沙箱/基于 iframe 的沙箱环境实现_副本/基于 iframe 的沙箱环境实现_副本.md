# 基于 iframe 的沙箱环境实现\_副本

在前端，最常见的方法还是使用 iframe 来构造一个沙箱。iframe 本身就是一个封闭的沙箱环境，**假如你要执行的代码不是自己写的代码，不是可信的数据源，那么可以使用 iframe 来执行。**

```javascript 
const parent = window
const frame = document.createElement('iframe')

// 限制代码 iframe 代码执行能力
frame.sandbox = 'allow-same-origin'

const data = [1, 2, 3, 4, 5, 6]
let newData = [];

// 当前页面给 iframe 发送消息
frame.onload = function (e) {
  frame.contentWindow.postMessage(data)
}

document.body.appendChild(frame);

// iframe 接收到消息后处理
const code = `
  return dataInIframe.filter((item) => item % 2 === 0)
`
frame.contentWindow.addEventListener('message', function (e) {
  const func = new frame.contentWindow.Function('dataInIframe', code);

  // 给副页面也送消息
  parent.postMessage(func(e.data))
});

// 父页面接收 iframe 发送过来的消息
parent.addEventListener('message', function (e) {
  console.log('parent - message from iframe:', e.data);
}, false);

```


关于 iframe sandbox 的更多介绍：[github.com/xitu/gold-m…](https://link.juejin.cn/?target=https://github.com/xitu/gold-miner/blob/master/article/2020/sandboxed-iframes.md "github.com/xitu/gold-m…")

相关实现库：[github.com/asvd/jailed](https://link.juejin.cn/?target=https://github.com/asvd/jailed "github.com/asvd/jailed")
