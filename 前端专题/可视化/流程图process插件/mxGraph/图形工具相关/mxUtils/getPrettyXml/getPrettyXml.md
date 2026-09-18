# getPrettyXml

## 目录

- [功能概述](#功能概述)
- [参数](#参数)
- [返回值](#返回值)
- [使用场景](#使用场景)
- [示例代码](#示例代码)
- [代码解释](#代码解释)

在`mxGraph`中，`mxUtils.getPrettyXml`是一个实用方法，用于将 XML 数据以格式化、易读的方式输出。以下从功能概述、参数、返回值、使用场景、示例代码及代码解释等方面详细介绍。

### 功能概述

`mxUtils.getPrettyXml`方法的**主要功能是对 XML 数据进行格式化处理，将原本紧凑的、没有缩进和换行的 XML 字符串转换为具有良好缩进和换行格式的字符串，提高 XML 数据的可读性。** 这对于调试、查看和编辑 XML 数据非常有帮助。

### 参数

该方法通常接收一个参数：

- **`xml`**：类型为`string`或`Document`，表示要进行格式化的 XML 数据。可以是 XML 字符串，也可以是已经解析好的`Document`对象。

### 返回值

返回一个格式化后的 XML 字符串，其中包含适当的缩进和换行，使 XML 结构更加清晰易读。

### 使用场景

- **调试与开发**：在开发过程中，当需要查看 XML 数据的具体内容和结构时，使用`mxUtils.getPrettyXml`可以将 XML 数据以易读的方式输出到控制台或日志中，方便开发者进行调试和分析。
- **数据展示**：在网页或其他界面上展示 XML 数据时，格式化后的 XML 字符串可以让用户更轻松地理解数据的结构和内容。
- **数据存储与分享**：将格式化后的 XML 数据保存到文件或分享给其他开发者时，易读的格式有助于后续的维护和处理。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxUtils.getPrettyXml Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <button id="formatXmlButton">Format XML</button>
    <pre id="xmlOutput"></pre>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            const formatXmlButton = document.getElementById('formatXmlButton');
            const xmlOutput = document.getElementById('xmlOutput');

            formatXmlButton.addEventListener('click', function () {
                // 示例 XML 字符串
                const xmlString = '<root><child1>Value 1</child1><child2>Value 2</child2></root>';
                // 解析 XML 字符串为 Document 对象
                const xmlDoc = mxUtils.parseXml(xmlString);
                // 格式化 XML 数据
                const prettyXml = mxUtils.getPrettyXml(xmlDoc);
                // 将格式化后的 XML 数据显示在页面上
                xmlOutput.textContent = prettyXml;
            });
        }
    </script>
</body>

</html>
```


### 代码解释

1. **HTML 结构**：创建一个按钮用于触发 XML 格式化操作，以及一个`<pre>`元素用于显示格式化后的 XML 数据。`<pre>`元素可以保留文本的原始格式，包括缩进和换行。
2. **绑定按钮事件**：为按钮添加点击事件监听器，当用户点击按钮时，执行以下操作。
3. **准备 XML 数据**：定义一个示例 XML 字符串，然后使用`mxUtils.parseXml`方法将其解析为`Document`对象。
4. **格式化 XML 数据**：调用`mxUtils.getPrettyXml`方法，传入`Document`对象，得到格式化后的 XML 字符串。
5. **显示格式化后的 XML 数据**：将格式化后的 XML 字符串赋值给`<pre>`元素的`textContent`属性，从而在页面上显示出来。

通过`mxUtils.getPrettyXml`方法，可以方便地将 XML 数据转换为易读的格式，提高开发和调试的效率。
