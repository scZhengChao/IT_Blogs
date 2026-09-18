# 3. 构建渲染器进程 UI

为了将它们联系在一起，我们将在加载的 HTML 文件中创建一个接口，其中包含一个 `#counter` 元素，我们将使用该元素来显示值：

```javascript 
// index.html

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Menu Counter</title>
  </head>
  <body>
    Current value: <strong id="counter">0</strong>
    <script src="./renderer.js"></script>
  </body>
</html>

```


最后，为了更新 HTML 文档中的值，我们将添加几行 DOM 操作的代码，以便在每次触发 `update-counter` 事件时更新 `#counter` 元素的值。

```javascript 
// renderer.js (Renderer Process)

const counter = document.getElementById('counter')

window.electronAPI.onUpdateCounter((value) => {
  const oldValue = Number(counter.innerText)
  const newValue = oldValue + value
  counter.innerText = newValue.toString()
})

```


在上面的代码中，我们将回调传递给从预加载脚本中暴露的 `window.electronAPI.onUpdateCounter` 函数。 第二个 `value` 参数对应于我们传入 `webContents.send` 函数的 `1` 或 `-1`，该函数是从原生菜单调用的。
