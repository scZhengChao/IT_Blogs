# getXml

## 目录

- [功能概述](#功能概述)
- [参数](#参数)
- [返回值](#返回值)
- [使用场景](#使用场景)
- [示例代码](#示例代码)
- [代码解释](#代码解释)

在`mxGraph`中，`mxUtils.getXml`是一个实用方法，**它主要用于将**\*\*`Document`****对象或****`Element`\*\***对象转换为 XML 字符串**。以下从功能概述、参数、返回值、使用场景、示例代码以及代码解释等方面详细介绍该方法。

### 功能概述

`mxUtils.getXml`方法的\*\*核心功能是把`Document`****对象（代表整个 XML 文档）或者****`Element`\*\***对象（代表 XML 文档中的一个元素）转换为对应的 XML 字符串。在处理 XML 数据时**，有时需要将内存中的 XML 对象以字符串形式输出，比如将其保存到文件、发送到服务器或者进行日志记录等，这个方法就可以满足这样的需求。

### 参数

该方法接收一个参数：

- **`node`**：**类型可以是**\*\*`Document`****或者****`Element`****。如果传入的是****`Document`\*\***对象**，它会将整个 XML 文档转换为字符串；如果传入的是`Element`对象，它会将该元素及其子元素转换为字符串。

### 返回值

返回一个字符串，该字符串是传入的`Document`或`Element`对象对应的 XML 表示。返回的字符串遵循 XML 语法规则，包含所有的标签、属性和文本内容。

### 使用场景

- **数据保存**：当需要将内存中的 XML 数据保存到文件时，可以使用`getXml`方法将`Document`或`Element`对象转换为字符串，然后将字符串写入文件。
- **数据传输**：在与服务器进行数据交互时，可能需要将 XML 数据以字符串形式发送到服务器。使用`getXml`方法可以方便地将 XML 对象转换为适合传输的字符串格式。
- **日志记录**：在调试或记录操作过程中，将 XML 数据以字符串形式记录到日志中，便于后续分析和排查问题。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxUtils.getXml Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <button id="convertButton">Convert to XML String</button>
    <pre id="output"></pre>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            const convertButton = document.getElementById('convertButton');
            const output = document.getElementById('output');

            convertButton.addEventListener('click', function () {
                // 创建一个 XML 文档
                const xmlDoc = mxUtils.createXmlDocument();
                const rootElement = xmlDoc.createElement('root');
                xmlDoc.appendChild(rootElement);

                const childElement = xmlDoc.createElement('child');
                childElement.textContent = 'Hello, XML!';
                rootElement.appendChild(childElement);

                // 将 XML 文档转换为字符串
                const xmlString = mxUtils.getXml(xmlDoc);

                // 显示转换后的 XML 字符串
                output.textContent = xmlString;
            });
        }
    </script>
</body>

</html>
```


### 代码解释

1. **HTML 结构**：创建一个按钮用于触发将 XML 对象转换为字符串的操作，以及一个`<pre>`元素用于显示转换后的 XML 字符串。`<pre>`元素可以保留字符串中的换行和缩进格式。
2. **绑定按钮事件**：为按钮添加点击事件监听器，当用户点击按钮时，执行以下操作。
3. **创建 XML 文档**：使用`mxUtils.createXmlDocument`方法创建一个新的 XML 文档，然后创建根元素和子元素，并将子元素添加到根元素中，设置子元素的文本内容。
4. **转换为 XML 字符串**：调用`mxUtils.getXml`方法，传入`xmlDoc`对象，将其转换为 XML 字符串。
5. **显示结果**：将转换后的 XML 字符串赋值给`<pre>`元素的`textContent`属性，从而在页面上显示出来。

通过`mxUtils.getXml`方法，开发者可以方便地将`Document`或`Element`对象转换为 XML 字符串，满足不同场景下对 XML 数据处理的需求。
