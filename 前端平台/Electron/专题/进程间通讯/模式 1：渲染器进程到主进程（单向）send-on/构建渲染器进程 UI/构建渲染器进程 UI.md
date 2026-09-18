# 构建渲染器进程 UI

在 `BrowserWindow` 加载的我们的 `HTML` 文件中，添加一个由文本输入框和按钮组成的基本用户界面：

```javascript 
// index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Hello World!</title>
  </head>
  <body>
    Title: <input id="title"/>
    <button id="btn" type="button">Set</button>
    <script src="./renderer.js"></script>
  </body>
</html>

```


为了使这些元素具有交互性，我们将在导入的 `renderer.js` 文件中添加几行代码，以利用从预加载脚本中暴露的 `window.electronAPI` 功能：

```javascript 
// renderer.js (Renderer Process)
const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
  const title = titleInput.value
  window.electronAPI.setTitle(title)
})

```


此时，您的演示应用应该已经功能齐全。 尝试使用输入框，看看 BrowserWindow 的标题会发生什么变化！
