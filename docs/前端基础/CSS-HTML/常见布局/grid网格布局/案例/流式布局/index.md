# 流式布局

流式布局指的是**页面的内容会随着屏幕的大小而变化**，流式布局也可以理解为响应式布局；

但是不同于响应式布局的是，流式布局的布局不会像响应式布局那样发生变化，只是内容会随着轴进行流动；

通常这种指的是`grid-template-columns: repeat(auto-fit, minmax(0, 1fr))`这种；

直接看效果：

![](./assets/image/image_CKQJbUxMWJ.png)

```javascript 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>


        html,
        body {
            height: 100%;
            margin: 0;
        }

        body {
            display: grid;
        }

        .grid-container {
            display: grid;
            gap: 20px;
            background: aliceblue;
        }

        .grid-item {
            width: 200px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: darksalmon;
            border-radius: 4px;
            font-size: 30px;
        }


    </style>
</head>
<body>


<h3>auto-fit</h3>
<div class="grid-container" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
    <div class="grid-item">1</div>
    <div class="grid-item">2</div>
    <div class="grid-item">3</div>
    <div class="grid-item">4</div>
    <div class="grid-item">5</div>
    <div class="grid-item">6</div>
    <div class="grid-item">7</div>
    <div class="grid-item">8</div>
    <div class="grid-item">9</div>
</div>

<h3>auto-fill</h3>
<div class="grid-container" style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));">
    <div class="grid-item">1</div>
    <div class="grid-item">2</div>
    <div class="grid-item">3</div>
    <div class="grid-item">4</div>
    <div class="grid-item">5</div>
    <div class="grid-item">6</div>
    <div class="grid-item">7</div>
    <div class="grid-item">8</div>
    <div class="grid-item">9</div>
</div>

</body>
<script>

</script>
</html>

```


> 这里有两个关键字，一个是`auto-fit`，还有一个是`auto-fill`，在行为上它们是相同的，不同的是它们在网格创建的不同，

![](./assets/image/image_sqQt5gslSB.png)

> 就像上面图中看到的一样，使用`auto-fit`会将空的网格进行折叠，可以看到他们的结束`colum`的数字都是`6`;
>
> 像我们上面的实例中不会出现这个问题，因为我们使用了响应式单位`fr`，只有使用固定单位才会出现这个现象；
