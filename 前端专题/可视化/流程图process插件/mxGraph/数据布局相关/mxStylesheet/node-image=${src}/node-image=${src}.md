# node;image=\${src}

## 目录

- [含义](#含义)
- [使用方式](#使用方式)
  - [1. 定义样式](#1-定义样式)
  - [2. 应用样式到节点](#2-应用样式到节点)
- [完整示例代码](#完整示例代码)
- [代码解释](#代码解释)

在`mxGraph`的使用场景中，`node;image=${src}`通常是用于定义单元格样式的字符串。下面为你详细解释其含义、使用方式以及相关示例。

### 含义

- **`node`**：这是`mxGraph`中样式定义里的一个关键字，它表明该**样式是应用于节点（** 也就是顶点）的。在`mxGraph`里，图形元素主要分为节点（顶点）和边，使用`node`可以明确样式作用的对象类型。
- **`image=${src}`**：此部分**用于指定节点要显示的图片**。`${src}`是一个占位符，需要替换为实际的图片文件路径或 URL。当样式应用到节点时，节点将会显示指定路径的图片。

### 使用方式

在`mxGraph`中，要应用这样的样式到节点上，通常会按照以下步骤进行：

#### 1. 定义样式

可以通过`mxGraph`的样式表（`mxStylesheet`）来定义这个样式。示例代码如下：

```javascript 
// 创建 mxGraph 实例
const container = document.getElementById('graphContainer');
const graph = new mxGraph(container);

// 获取样式表
const stylesheet = graph.getStylesheet();

// 定义包含图片的节点样式
const imageSrc = 'path/to/your/image.png'; // 替换为实际的图片路径
const nodeImageStyle = `node;image=${imageSrc}`;
stylesheet.putCellStyle('imageNodeStyle', nodeImageStyle);
```


#### 2. 应用样式到节点

在插入节点时，指定使用刚才定义的样式。示例代码如下：

```javascript 
graph.getModel().beginUpdate();
try {
    const parent = graph.getDefaultParent();
    // 插入一个使用图片样式的节点
    graph.insertVertex(parent, null, '', 20, 20, 80, 30, 'imageNodeStyle');
} finally {
    graph.getModel().endUpdate();
}
```


### 完整示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxGraph Image Node Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            // 获取图形容器
            const container = document.getElementById('graphContainer');
            // 创建 mxGraph 实例
            const graph = new mxGraph(container);

            // 获取样式表
            const stylesheet = graph.getStylesheet();

            // 定义包含图片的节点样式
            const imageSrc = 'https://via.placeholder.com/50'; // 示例图片 URL
            const nodeImageStyle = `node;image=${imageSrc}`;
            stylesheet.putCellStyle('imageNodeStyle', nodeImageStyle);

            graph.getModel().beginUpdate();
            try {
                const parent = graph.getDefaultParent();
                // 插入一个使用图片样式的节点
                graph.insertVertex(parent, null, '', 20, 20, 80, 30, 'imageNodeStyle');
            } finally {
                graph.getModel().endUpdate();
            }
        }
    </script>
</body>

</html>
```


### 代码解释

1. **引入**\*\*`mxGraph`\*\***库**：通过`<script>`标签引入`mxGraph`库。
2. **创建**\*\*`mxGraph`\*\***实例**：获取 HTML 页面中的图形容器，并创建`mxGraph`实例关联到该容器。
3. **定义样式**：获取样式表，定义包含图片的节点样式，将图片路径插入到样式字符串中，并将该样式存储到样式表中。
4. **插入节点**：开始更新图形模型，插入一个使用刚才定义样式的节点，最后结束更新。

通过这种方式，就可以在`mxGraph`的节点上显示指定的图片。

分享
