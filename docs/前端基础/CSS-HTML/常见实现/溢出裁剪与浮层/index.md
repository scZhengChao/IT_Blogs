# 让元素不被 overflow:hidden 阻止显示

## 目录

- [position: fixed](#position-fixed)
  - [为什么其他CSS属性不能突破限制](#为什么其他CSS属性不能突破限制)
    - [为什么fixed可以突破限制：](#为什么fixed可以突破限制)

# position: fixed

![](./assets/image/image_kjBuE8Nd4N.png)

```html 
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Document</title>
    <style>
        .container {
            width: 200px;
            height: 200px;
            border: 1px solid #ccc;
            overflow: hidden;
            position: relative;
            box-sizing: border-box;
        }

        .child {
            width: 100px;
            height: 100px;
            background: lightblue;
        }

        .fixed-child {
            position: fixed;
            top: 50px;
            left: 212px;
            width: 100px;
            height: 100px;
            background: lightcoral;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="child">我会被隐藏</div>
    <div class="fixed-child">我会突破限制</div>
</div>


</body>
</html>


```


## 为什么其他CSS属性不能突破限制

CSS规范明确规定：

1. `overflow`属性建立的裁剪区域会影响所有定位在该容器内的内容
2. 只有形成 **"层叠上下文"且相对于视口定位的元素**（如`fixed`）可以豁免
3. 这是浏览器渲染引擎的安全机制，防止内容意外溢出

### 为什么`fixed`可以突破限制：

1. **脱离文档流**：`fixed`元素相对于**视口定位，完全脱离父元素的布局上下文**
2. **不受任何祖先元素的**\*\*`overflow`\*\***影响**：即使嵌套多层`overflow:hidden`的容器，`fixed`元素依然可见
3. **形成新的层叠上下文**：浏览器会单独渲染这类元素
