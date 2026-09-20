# sessionStorage

## 目录

- [sessionStorage可以在多个Tab之间共享数据吗？](#sessionStorage可以在多个Tab之间共享数据吗)
- [特点](#特点)

# sessionStorage可以在多个Tab之间共享数据吗？

我的朋友：“不，每个窗口或选项卡都有一个单独的sessionStorage，它们之间没有数据共享”

面试官：“你真的确定是这样吗？”

**什么是会话存储？**

来自 MDN：只读 sessionStorage 属性访问当前源的会话存储对象。sessionStorage与localStorage类似；不同之处在于，localStorage 中的数据不会过期，而 sessionStorage 中的**数据会在页面会话结束时被清除。**

每当文档加载到浏览器的**特定选项卡中时，就会创建一个唯一的页面会话并将其分配给该特定选项卡。该页面会话仅对特定选项卡有效**。

只要选项卡或浏览器打开，页面会话就会持续，并且在**页面重新加载和恢复后仍然存在。**

在**新选项卡或窗口中打开页面会创建**一个具有顶级浏览上下文值的新会话，这与会话 cookie 的工作方式不同。

使用相同的 URL **打开多个选项卡/窗口会为每个选项卡/窗口创建 sessionStorage**。

假设我们在https\://medium.com/page/1中写了这样一段代码：

```javascript 

btn.addEventListener('click', () => {
  window.sessionStorage.setItem('name', 'fatfish')
  window.open('https://medium.com/page/2')
})

```


我可以在 [https://medium.com/page/2](https://medium.com/page/2 "https://medium.com/page/2") 获取名称值吗？

```javascript 

console.log(window.sessionStorage.getItem('name')) // null or fatfish?
```


是的，答案就是fatfish。那么，我们确定 sessionStorage 可以在多个选项卡之间共享数据吗？

**最终答案**

让我们尝试再次继续执行 [https://medium.com/page/1](https://medium.com/page/1 "https://medium.com/page/1") 上的一段代码。

```javascript 
window.sessionStorage.setItem('name', 'medium')
window.sessionStorage.setItem('age', '1000')

```


如果sessionStorage可以在不同窗口或选项卡之间共享数据，那么https\://medium.com/page/2也可以获取name和age的最新值

```javascript 
console.log(window.sessionStorage.getItem('name')) // 111
console.log(window.sessionStorage.getItem('age')) // null

```


所以，我们可以得出结论，**sessionStorage不能在多个窗口或选项卡之间共享数据，但是**，当通过**window\.open或链接打开新页面时，新页面会复制上一个页面的sessionStorage。**

# 特点

- 页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。
- **在新标签或窗口打开一个页面时会复制顶级浏览会话的上下文作为新会话的上下文，这点和 session cookie 的运行方式不同。**
- 打开多个相同的 URL 的 Tabs 页面，会创建各自的 `sessionStorage`。
- 关闭对应浏览器标签或窗口，会清除对应的 `sessionStorage`。

[storage](storage.md "storage")
