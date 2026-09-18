# setStyle

## 目录

- [方法功能](#方法功能)
- [方法签名](#方法签名)
- [参数说明](#参数说明)
- [使用示例](#使用示例)
- [代码解释](#代码解释)
- [应用场景](#应用场景)

在`mxGraph`中，`mxUtils.setStyle`是一个实用方法，主要用于**设置 DOM 元素的 CSS 样式**。下面从方法的功能、参数、使用示例、代码解释以及应用场景几个方面详细介绍。

### 方法功能

`mxUtils.setStyle`方法允许你**方便地为一个 DOM 元素设置 CSS 样式。通过传入元素对象和样式字符串，** 该方法会将样式应用到指定的元素上，避免了手动操作`element.style`属性时的繁琐。

### 方法签名

```javascript 
mxUtils.setStyle(node, style);
```


### 参数说明

- **`node`**：
  - **类型**：`HTMLElement`。
  - **描述**：必需参数，代表要设置样式的 DOM 元素。可以是通过`document.getElementById`、`document.createElement`等方法获取或创建的元素。
- **`style`**：
  - **类型**：`String`。
  - **描述**：必需参数，是一个包含 CSS 样式的字符串，格式为`property1: value1; property2: value2;`。

### 使用示例

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>mxUtils.setStyle Example</title>
    <script type="text/javascript" src="mxClient.js"></script>
</head>

<body>
    <div id="myDiv">This is a div element.</div>
    <button id="applyStyleButton">Apply Style</button>
    <script type="text/javascript">
        mxLoadResources = false;
        mxBasePath = '.';
        mxClient.link('js/mxClient.js', function () {
            // 获取 DOM 元素
            var myDiv = document.getElementById('myDiv');
            var applyStyleButton = document.getElementById('applyStyleButton');

            // 为按钮添加点击事件监听器
            applyStyleButton.addEventListener('click', function () {
                // 定义样式字符串
                var style = 'background-color: yellow; color: blue; font-size: 18px;';

                // 使用 mxUtils.setStyle 方法设置样式
                mxUtils.setStyle(myDiv, style);
            });
        });
    </script>
</body>

</html>
```


### 代码解释

1. **获取 DOM 元素**：使用`document.getElementById`方法获取`div`元素和按钮元素。
2. **添加点击事件监听器**：为按钮添加点击事件监听器，当按钮被点击时，执行以下操作：
   - 定义一个样式字符串`style`，包含背景颜色、文本颜色和字体大小等样式属性。
   - 调用`mxUtils.setStyle(myDiv, style)`方法，将样式应用到`div`元素上。

### 应用场景

- **动态样式调整**：在图形界面开发中，可能需要根据用户的操作或数据的变化动态调整元素的样式。例如，当用户点击某个按钮时，改变某个元素的背景颜色或字体大小。
- **样式复用**：可以将常用的样式定义为字符串，通过`mxUtils.setStyle`方法应用到不同的元素上，实现样式的复用。
- **图形元素样式设置**：在`mxGraph`中，虽然有专门的样式设置方法用于图形元素，但在某些情况下，可能需要对与图形相关的 DOM 元素（如提示框、工具栏等）设置样式，这时可以使用`mxUtils.setStyle`方法。

通过使用`mxUtils.setStyle`方法，你可以更方便地管理和应用 CSS 样式，提高代码的可读性和可维护性。
