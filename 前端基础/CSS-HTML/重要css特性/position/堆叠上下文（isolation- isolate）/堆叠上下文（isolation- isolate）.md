# 堆叠上下文（isolation: isolate）

&#x20;       `z-index` 属性规定了元素如何堆叠在其他定位元素上。有时，你可能会设置一个 `z-index` 属性让子元素的层级较低，结果却发现它隐藏在其父元素的背景之后。为了防止这种情况，你可以在**父元素上创建一个新的堆叠上下文，防止子元素隐藏在其后面**。创建堆叠上下文的一种方法是使用 `isolation: isolate` CSS样式声明。

我们可以利用这种堆叠**上下文技术来创建悬停效果，该效果可以交换按钮的背景**。例如：

![](image_1OZ4h3dhgJ.png)

```html 
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        button.join-now {
            cursor: pointer;
            border: none;
            outline: none;
            padding: 100px 150px;

            position: relative;
            background-color: #5dbea3;
            isolation: isolate; /* If ommitted, child pseudo element will be stacked behind */
        }

        button.join-now::before {
            content: "";
            position: absolute;
            background-color: #33b249;
            top: 0;
            left: 100%;
            right: 0;
            bottom: 0;
            transition: left 500ms ease-out;

            z-index: -1;
        }

        button.join-now:hover::before {
            left: 0;
        }

    </style>
</head>
<body>
<button class="join-now">
    join-now
</button>
</body>
<</html>

```
