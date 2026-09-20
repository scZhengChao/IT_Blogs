# 3. 构建渲染器进程 UI

最后，让我们构建加载到 BrowserWindow 中的 HTML 文件。

```javascript 
// index.html

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Dialog</title>
  </head>
  <body>
    <button type="button" id="btn">Open a File</button>
    File path: <strong id="filePath"></strong>
    <script src='./renderer.js'></script>
  </body>
</html>
```


用户界面包含一个 `#btn` 按钮元素，将用于触发我们的预加载 API，以及一个 `#filePath` 元素，将用于显示所选文件的路径。 要使这些部分起作用，需要在渲染器进程脚本中编写几行代码：

```javascript 
// renderer.js (Renderer Process)
const btn = document.getElementById('btn')
const filePathElement = document.getElementById('filePath')

btn.addEventListener('click', async () => {
  const filePath = await window.electronAPI.openFile()
  filePathElement.innerText = filePath
})

```


在上面的代码片段中，我们监听 `#btn` 按钮的点击，并调用 `window.electronAPI.openFile()` API 来激活原生的打开文件对话框。 然后我们在 `#filePath` 元素中显示选中文件的路径。
