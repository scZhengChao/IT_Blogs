# `wheel`

## 目录

- [mouseWheel  鼠标滚轮](#mouseWheel--鼠标滚轮)
  - [兼容多种浏览器的代码示例](#兼容多种浏览器的代码示例)

# **mouseWheel  鼠标滚轮**

首先，不得不说一下，因为不同的浏览器有不同的滚轮事件。

- `mousewheel`事件（旧版 Chrome、Safari 等）
- `DOMMouseScroll`事件（旧版 Firefox）
- `wheel`事件（现代浏览器推荐）

```javascript 
const scrollArea = document.getElementById('scrollArea');
scrollArea.addEventListener('wheel', function (event) {
    // 阻止默认的滚动行为
    event.preventDefault();
    // 获取滚动的垂直方向距离
    const deltaY = event.deltaY;
    if (deltaY > 0) {
        console.log('向下滚动');
    } else {
        console.log('向上滚动');
    }
});

```


通过`event.deltaY`属性可以获取滚动的垂直方向距离，正值表示向下滚动，负值表示向上滚动。同时，使用`event.preventDefault()`方法阻止了默认的滚动行为。

### 兼容多种浏览器的代码示例

为了确保在各种浏览器中都能正常监听鼠标滚轮滚动事件，可以结合使用上述三种事件：

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cross-Browser Wheel Event Example</title>
</head>

<body>
    <div id="scrollArea" style="height: 500px; overflow: auto;">
        <p>这里是一些文本内容，用于测试鼠标滚轮滚动事件。</p>
        <p>这里是一些文本内容，用于测试鼠标滚轮滚动事件。</p>
        <p>这里是一些文本内容，用于测试鼠标滚轮滚动事件。</p>
        <p>这里是一些文本内容，用于测试鼠标滚轮滚动事件。</p>
        <p>这里是一些文本内容，用于测试鼠标滚轮滚动事件。</p>
    </div>
    <script>
        const scrollArea = document.getElementById('scrollArea');
        const handleWheel = function (event) {
            event.preventDefault();
            let delta;
            if (event.deltaY) {
                delta = event.deltaY;
            } else if (event.wheelDelta) {
                delta = -event.wheelDelta;
            } else if (event.detail) {
                delta = event.detail;
            }
            if (delta > 0) {
                console.log('向下滚动');
            } else {
                console.log('向上滚动');
            }
        };
        scrollArea.addEventListener('wheel', handleWheel);
        scrollArea.addEventListener('mousewheel', handleWheel);
        scrollArea.addEventListener('DOMMouseScroll', handleWheel);
    </script>
</body>

</html>
```


在这个综合示例中，我们定义了一个`handleWheel`函数来处理鼠标滚轮滚动事件。通过判断事件对象的不同属性（`deltaY`、`wheelDelta`、`detail`），可以在不同浏览器中获取滚动的方向信息。同时，为`scrollArea`元素添加了`wheel`、`mousewheel`和`DOMMouseScroll`事件监听器，以确保在各种浏览器中都能正常工作。
