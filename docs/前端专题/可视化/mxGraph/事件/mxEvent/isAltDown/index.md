# isAltDown

## 目录

- [mxGraph库中的isAltDown](#mxGraph库中的isAltDown)

### `mxGraph`库中的`isAltDown`

在`mxGraph`库中，`isAltDown`同样用于判断`Alt`键是否被按下，通常在处理鼠标事件时会用到，以实现一些与`Alt`键相关的交互逻辑。以下是一个简单的`mxGraph`示例：

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>mxGraph isAltDown Example</title>
    <script type="text/javascript" src="mxClient.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px;"></div>

    <script type="text/javascript">
        mxLoadResources = false;
        mxBasePath = '.';
        mxClient.link('js/mxClient.js', function () {
            // 创建 mxGraph 实例
            var container = document.getElementById('graphContainer');
            var graph = new mxGraph(container);

            // 监听鼠标按下事件
            mxEvent.addListener(graph.container, 'mousedown', function (evt) {
                if (mxEvent.isAltDown(evt)) {
                    alert('Alt key is down while clicking on the graph!');
                }
            });
        });
    </script>
</body>

</html>
```
