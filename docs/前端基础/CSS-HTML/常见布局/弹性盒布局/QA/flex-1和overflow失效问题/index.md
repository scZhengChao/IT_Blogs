# flex:1和overflow失效问题

- 当flex:1的时候，overflow:hidden不生效，解决办法是给子元素添加width：0；

**第二个问题**1，首先当一层flex布局的时候，flex:1与overflow:hidden没有问题

```html 
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>test</title>
    <style>
    * {
        padding: 0;
        margin: 0;
    }
    .demo {
        width: 300px;
        height: 300px;
        display: flex;
        background-color: pink;
    }
    .left {
        width: 50px;
        height: 50px;
        background-color: red;
    }
    .right {
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    
    </style>
</head>
<body>
    <div class="demo">
        <div class='left'>
            我是左侧
        </div>
        <p class="right">
            一行文字一行文字一行文字一行文字一行文字一行文字文字一行文字一行文字一行文字文字一行文字一行文字一行文字文字一行文字一行文字一行文字文字一行文字一行文字一行文字文字一行文字一行文字一行文字文字一行文字一行文字一行文字
        </p>
    </div>
</body>
</html>
```


效果如图：

![](./image/image_2KEbrz2F4K.png)

2，当我们变成嵌套flex布局的时候，样式就不生效了：

```html 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>test</title>
    <style>
    * {
        padding: 0;
        margin: 0;
    }
    .box {
        width: 500px;
        height: 500px;
        background-color: yellow;
        display: flex;
        overflow: hidden;
    }
    .tab {
        width: 150px;
        height: 100%;
        background-color: blue;
    }
    .demo {
        flex: 1;
        display: flex;
        background-color: pink;
    }
    .left {
        width: 50px;
        height: 50px;
        background-color: red;
    }
    .right {
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    
    </style>
</head>
<body>
    <div class='box'>
        <p class='tab'>我是左侧tab部分</p>
        <div class="demo">
            <div class='left'>
            我是左侧
            </div>
            <p class="right">
                一行文字一行文字一行文字一行文字一行文字一行文字文字一行文字一行文字一行文字文字一行文字一行文字一行文字文字一行文字一行文字一行文字文字一行文字一行文字一行文字文字一行文字一行文字一行文字文字一行文字一行文字一行文字
            </p>
        </div>
    </div>
    
</body>
</html>
```


效果如图：

![](./image/image_MrLxbiW9QP.png)

3，这是，只需要给子元素设置width：0就可以了。

```html 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>test</title>
    <style>
    * {
        padding: 0;
        margin: 0;
    }
    .box {
        width: 500px;
        height: 500px;
        background-color: yellow;
        display: flex;
        overflow: hidden;
    }
    .tab {
        width: 150px;
        height: 100%;
        background-color: blue;
    }
    .demo {
        flex: 1;
        display: flex;
        background-color: pink;
    }
    .left {
        width: 50px;
        height: 50px;
        background-color: red;
    }
    .right {
         flex: 1;
        width: 0;
         overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    
    </style>
</head>
<body>
    <div class='box'>
        <p class='tab'>我是左侧tab部分</p>
        <div class="demo">
            <div class='left'>
            我是左侧
            </div>
            <p class="right">
                一行文字一行文字一行文字一行文字一行文字一行文字文字一行文字一行文字一行文字文字一行文字一行文字一行文字文字一行文字一行文字一行文字文字一行文字一行文字一行文字文字一行文字一行文字一行文字文字一行文字一行文字一行文字
            </p>
        </div>
    </div>
    
</body>
</html>
```


效果如图：

![](./image/image_jlLiyy7Hcq.png)
