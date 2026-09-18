# createXmlDocument

## 目录

- [功能概述](#功能概述)
- [参数](#参数)
- [返回值](#返回值)
- [使用场景](#使用场景)
- [代码解释](#代码解释)

在`mxGraph`中，`mxUtils.createXmlDocument`是一个用于**创建 XML 文档对象的实用方法**。下面从功能概述、参数、返回值、使用场景、示例代码及代码解释等方面详细介绍这个方法。

### 功能概述

`mxUtils.createXmlDocument`方法的主要功能是**创建一个新的 XML 文档对象**。在处理 XML 数据时，经常需要创建一个空白的 XML 文档，然后向其中添加元素、属性等内容，该方法提供了一种便捷的方式来创建这样的文档对象。

### 参数

该方法通常不接收任何参数。它会直接创建一个新的、空的 XML 文档对象。

### 返回值

返回一个`Document`对象，这个对象代表一个 XML 文档。可以使用该对象的相关方法（如`createElement`、`appendChild`等）来操作 XML 文档的结构和内容。

### 使用场景

- **数据生成**：当需要生成 XML 格式的数据时，可以先使用`mxUtils.createXmlDocument`创建一个 XML 文档对象，然后向其中添加元素和属性，最终将其转换为 XML 字符串进行保存或传输。
- **数据解析与处理**：在对 XML 数据进行解析和处理时，可能需要创建一个新的 XML 文档来存储处理结果。
- **与其他系统交互**：在与其他支持 XML 数据格式的系统进行交互时，需要创建符合要求的 XML 文档并发送给对方。

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxUtils.createXmlDocument Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <button id="createXmlButton">Create XML Document</button>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            const createXmlButton = document.getElementById('createXmlButton');
            createXmlButton.addEventListener('click', function () {
                // 创建 XML 文档对象
                const xmlDoc = mxUtils.createXmlDocument();

                // 创建根元素
                const rootElement = xmlDoc.createElement('root');
                xmlDoc.appendChild(rootElement);

                // 创建子元素
                const childElement = xmlDoc.createElement('child');
                childElement.textContent = 'Hello, XML!';
                rootElement.appendChild(childElement);

                // 将 XML 文档转换为字符串
                const xmlString = mxUtils.getXml(xmlDoc);
                console.log('Generated XML:', xmlString);
            });
        }
    </script>
</body>

</html>
```


### 代码解释

1. **添加按钮并绑定事件**：在 HTML 页面中添加一个按钮，当用户点击该按钮时，会触发创建 XML 文档的操作。
2. **创建 XML 文档对象**：使用`mxUtils.createXmlDocument`方法创建一个新的 XML 文档对象。
3. **添加元素和内容**：
   - 使用`xmlDoc.createElement`方法创建根元素`root`，并将其添加到 XML 文档中。
   - 创建子元素`child`，设置其文本内容为`'Hello, XML!'`，然后将子元素添加到根元素中。
4. **转换为 XML 字符串**：使用`mxUtils.getXml`方法将 XML 文档对象转换为字符串，并将其输出到控制台。

通过`mxUtils.createXmlDocument`方法，开发者可以方便地创建和操作 XML 文档，实现 XML 数据的生成和处理。
