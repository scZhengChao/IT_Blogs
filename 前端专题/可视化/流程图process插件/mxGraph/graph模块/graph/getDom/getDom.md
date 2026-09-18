# getDom

## 目录

- [方法功能](#方法功能)
- [返回值](#返回值)
- [使用场景](#使用场景)
- [示例代码](#示例代码)
- [代码解释](#代码解释)

在`mxGraph`库中，`graph.getDom()`方法用于获取与`mxGraph`实例关联的 DOM（文档对象模型）元素。下面从方法功能、返回值、使用场景、示例代码几个方面详细介绍。

### 方法功能

`graph.getDom()`方法的主要功能是返回一个`mxGraph`**实例所对应的 HTML DOM 元素**。这个 DOM 元素是`mxGraph`图形实际渲染和显示的容器，通过它可以对**图形的外观、位置、大小等进行操作，也能与其他 DOM 操作进行集成。**

### 返回值

该方法返回一个`HTMLElement`对象，通常是一个`<div>`元素，`mxGraph`会将图形绘制在这个元素内部。开发者可以使用这个返回的 DOM 元素进行后续的操作，比如修改其样式、添加事件监听器等。

### 使用场景

- **样式调整**：通过获取`mxGraph`的 DOM 元素，可以直接修改其 CSS 样式，如改变背景颜色、边框样式、大小等，以满足不同的视觉需求。
- **事件监听**：为`mxGraph`的 DOM 元素添加事件监听器，实现与用户的交互，例如监听鼠标点击、滚动等事件。
- **与其他 DOM 元素集成**：将`mxGraph`的 DOM 元素插入到其他复杂的 HTML 布局中，或者与其他 DOM 元素进行组合，实现更丰富的页面效果。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>graph.getDom() Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
    <style>
        /* 定义一个自定义样式类 */
        .custom-graph {
            border: 2px solid red;
            background-color: lightgray;
        }
    </style>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px;"></div>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            // 获取图形容器
            const container = document.getElementById('graphContainer');
            // 创建 mxGraph 实例
            const graph = new mxGraph(container);

            // 插入一个简单的顶点
            graph.getModel().beginUpdate();
            try {
                const parent = graph.getDefaultParent();
                graph.insertVertex(parent, null, 'Sample Node', 20, 20, 80, 30);
            } finally {
                graph.getModel().endUpdate();
            }

            // 获取 mxGraph 的 DOM 元素
            const graphDom = graph.getDom();
            // 为 DOM 元素添加自定义样式类
            graphDom.classList.add('custom-graph');

            // 为 DOM 元素添加点击事件监听器
            graphDom.addEventListener('click', function () {
                alert('You clicked on the graph!');
            });
        }
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例**：获取 HTML 页面中的图形容器，创建`mxGraph`实例并关联到该容器，然后插入一个简单的顶点。
2. **获取 DOM 元素**：使用`graph.getDom()`方法获取`mxGraph`的 DOM 元素。
3. **样式调整**：为获取到的 DOM 元素添加自定义样式类`custom-graph`，从而改变图形的边框和背景颜色。
4. **事件监听**：为 DOM 元素添加点击事件监听器，当用户点击图形时弹出提示框。

通过`graph.getDom()`方法，开发者可以方便地对`mxGraph`的 DOM 元素进行操作，实现更多的交互和样式定制。

```javascript 
const normalTypeDom = graph.getDom(evt.getProperty('cell'));
const { left, top } = normalTypeDom.getBoundingClientRect();
this.normalTypePosition.left = `${left - 210}px`;
this.normalTypePosition.top = `${top - 8}px`;
this.normalTypeSelectVisible = true;
```
