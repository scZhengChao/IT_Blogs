# NO\_FO

## 目录

- [常量含义](#常量含义)
- [常见使用方式](#常见使用方式)
- [代码解释](#代码解释)
- [使用场景](#使用场景)

在`mxGraph`库中，`mxClient.NO_FO`是一个常量，下面为你详细介绍它的作用、使用场景等信息。

### 常量含义

`mxClient.NO_FO`是用于**控制字体优化（Font Optimization）的一个标志常量**。`FO`代表 “Font Optimization”，当`mxClient.NO_FO`被设置为`true`时，**意味着禁用字体优化。**

字体优化通常是指在图形渲染过程中，为了提高性能或适配特定环境，对字体的显示、布局等进行的一系列优化操作。而禁用字体优化可能会使字体以更原始、更精确的方式显示，但在某些情况下可能会影响性能。

### 常见使用方式

一般在`mxClient`初始化的时候会对`mxClient.NO_FO`进行设置，示例代码如下：

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>mxGraph with NO_FO Example</title>
    <script type="text/javascript" src="mxClient.js"></script>
    <script type="text/javascript">
        // 在加载 mxClient 之前设置 mxClient.NO_FO
        mxClient.NO_FO = true;

        mxLoadResources = false;
        mxBasePath = '.';
        mxClient.link('js/mxClient.js', function () {
            // 创建 mxGraph 实例
            var container = document.getElementById('graphContainer');
            var graph = new mxGraph(container);

            // 后续可以进行图形绘制等操作
            var parent = graph.getDefaultParent();
            graph.getModel().beginUpdate();
            try {
                var vertex = graph.insertVertex(parent, null, 'Text with NO_FO', 20, 20, 80, 30);
            } finally {
                graph.getModel().endUpdate();
            }
        });
    </script>
</head>

<body>
    <!-- 图表容器 -->
    <div id="graphContainer" style="width: 600px; height: 400px;"></div>
</body>

</html>

```


### 代码解释

1. **设置**\*\*`mxClient.NO_FO`\*\*：在加载`mxClient`之前，将`mxClient.NO_FO`设置为`true`，这样后续使用`mxGraph`进行图形渲染时，就会禁用字体优化。
2. **创建**\*\*`mxGraph`\*\***实例**：创建一个`mxGraph`实例，并指定其显示容器。
3. **绘制图形**：插入一个带有文本的顶点，由于之前设置了`mxClient.NO_FO`为`true`，这个文本的显示可能会遵循更原始的字体设置，而不会进行额外的字体优化。

### 使用场景

- **精确显示需求**：当你需要图形中的文字以最精确的字体样式显示，不希望因为字体优化而导致显示效果有偏差时，可以使用`mxClient.NO_FO`禁用字体优化。
- **调试或兼容性测试**：在调试图形渲染问题或者进行兼容性测试时，禁用字体优化可以帮助你排查是否是字体优化相关的问题导致的显示异常。
