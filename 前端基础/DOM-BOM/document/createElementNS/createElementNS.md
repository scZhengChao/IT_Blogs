# createElementNS

## 目录

- [基本用法](#基本用法)
- [使用场景](#使用场景)
- [代码示例](#代码示例)
  - [创建 SVG 元素](#创建-SVG-元素)
- [注意事项](#注意事项)

`document.createElementNS`是 JavaScript 里用于**创建带有指定命名空间的 XML 或 HTML 元素的方法**。在处理 XML 文档或者需要使用特定命名空间的 HTML5 元素（如 SVG 元素）时，这个方法就显得非常有用。下面将从基本用法、使用场景、代码示例、注意事项等方面详细介绍。

### 基本用法

`document.createElementNS`方法的语法如下：

```javascript 
document.createElementNS(namespaceURI, qualifiedName, options);
```


- **`namespaceURI`**：必需参数，是一个字符串，表示要创建元素的命名空间的 URI。例如，HTML 元素的命名空间 URI 是`http://www.w3.org/1999/xhtml`，SVG 元素的命名空间 URI 是`http://www.w3.org/2000/svg`。
- **`qualifiedName`**：必需参数，是一个字符串，表示要创建元素的名称。
- **`options`**：可选参数，是一个对象，用于指定创建元素时的额外选项。这个参数在大多数情况下可以省略。

### 使用场景

- **创建 SVG 元素**：SVG（可缩放矢量图形）是基于 XML 的图像格式，需要使用特定的命名空间。使用`document.createElementNS`可以创建 SVG 元素并将其插入到 HTML 文档中。
- **处理 XML 文档**：在处理 XML 文档时，不同的 XML 标签可能属于不同的命名空间，使用`document.createElementNS`可以确保创建的元素具有正确的命名空间。

### 代码示例

#### 创建 SVG 元素

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create SVG Element</title>
</head>

<body>
    <div id="svgContainer"></div>
    <script>
        // 获取容器元素
        const container = document.getElementById('svgContainer');

        // SVG 命名空间 URI
        const svgNamespace = 'http://www.w3.org/2000/svg';

        // 创建 SVG 元素
        const svgElement = document.createElementNS(svgNamespace, 'svg');
        svgElement.setAttribute('width', '200');
        svgElement.setAttribute('height', '200');

        // 创建圆形元素
        const circle = document.createElementNS(svgNamespace, 'circle');
        circle.setAttribute('cx', '100');
        circle.setAttribute('cy', '100');
        circle.setAttribute('r', '50');
        circle.setAttribute('fill', 'blue');

        // 将圆形元素添加到 SVG 元素中
        svgElement.appendChild(circle);

        // 将 SVG 元素添加到容器中
        container.appendChild(svgElement);
    </script>
</body>

</html>
```


在这个示例中，我们使用`document.createElementNS`方法创建了一个 SVG 元素和一个圆形元素，并将它们添加到 HTML 文档中。

### 注意事项

- **命名空间 URI 的正确性**：确保使用的命名空间 URI 是正确的，否则创建的元素可能无法正常工作。
- **兼容性**：`document.createElementNS`方法在现代浏览器中得到了广泛支持，但在一些旧版本的浏览器中可能存在兼容性问题。在使用时，建议进行兼容性测试。
