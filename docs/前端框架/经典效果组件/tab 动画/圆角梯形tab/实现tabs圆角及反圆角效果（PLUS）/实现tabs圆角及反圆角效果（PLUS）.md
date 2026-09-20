# 实现tabs圆角及反圆角效果（PLUS）

## 目录

- [先看UI稿](#先看UI稿)
- [思考](#思考)
  - [刚开始想着拿两个圆角来拼，但发现中间接触过渡效果很差](#刚开始想着拿两个圆角来拼但发现中间接触过渡效果很差)
  - [需要丝滑的话，想到贝塞尔曲线/正弦曲线，但这样太麻烦，需要用canvas来画](#需要丝滑的话想到贝塞尔曲线正弦曲线但这样太麻烦需要用canvas来画)
  - [最后想到用斜边加圆角来拼，先试试](#最后想到用斜边加圆角来拼先试试)
- [开搞](#开搞)
  - [添加前后伪元素](#添加前后伪元素)
  - [调整圆角弧度](#调整圆角弧度)
  - [未选中tab添加反圆角效果](#未选中tab添加反圆角效果)
  - [修改选中tab周围的阴影](#修改选中tab周围的阴影)
  - [最后修复选中颜色，未选中颜色即可](#最后修复选中颜色未选中颜色即可)

# 先看UI稿

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cdcf6610f1a44e0c92aa9cd8bd42b0b7~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=458\&h=114\&s=10243\&e=png\&b=ffffff)

这个效果跟上篇[实现tabs圆角及反圆角效果](https://juejin.cn/post/7224311569777934392 "实现tabs圆角及反圆角效果")的区别在于 **中间过渡斜线**

# 思考

## 刚开始想着拿两个圆角来拼，但发现中间接触过渡效果很差

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5058164dadd84f4187b976435f17d530~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=374\&h=96\&s=2086\&e=png\&b=ff0000)

## 需要丝滑的话，想到贝塞尔曲线/正弦曲线，但这样太麻烦，需要用canvas来画

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/028f26d3cf214479be058684876a240d~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=606\&h=236\&s=11378\&e=png\&b=fdfdfd)

[图形计算器](https://link.juejin.cn?target=https://www.desmos.com/calculator?lang=zh-CN "图形计算器")

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/37dcb066a4014226b1bb41d9bf6a8c36~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=124\&h=134\&s=3069\&e=png\&b=00a8bb)

[贝塞尔曲线](https://link.juejin.cn?target=https://cubic-bezier.com/#.42,0,.58,1 "贝塞尔曲线")

## 最后想到用斜边加圆角来拼，先试试

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb971584cd264483ab44c8e407b27a00~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=394\&h=220\&s=1952\&e=png\&b=ffffff)

# 开搞

## 添加前后伪元素

```javascript 
    .tab-selected::before {
      content: '';
      position: absolute;
      left: -6px;
      bottom: 0;
      width: 12px;
      height: $tab-height;
      background-color: red;
      transform: skewX(-15deg); // 重点
    }
    .tab-selected::after {
      content: '';
      position: absolute;
      right: -6px;
      bottom: 0;
      width: 12px;
      height: $tab-height;
      background-color: red;
      transform: skewX(15deg); // 重点
    }

```


![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9341050b8d134c0496c4cca3543caaf2~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=406\&h=88\&s=6816\&e=png\&b=fcfcfc)

## 调整圆角弧度

```javascript 
    .tab-selected::before {
      content: '';
      position: absolute;
      left: -6px;
      bottom: 0;
      width: 12px;
      height: $tab-height;
      background-color: red;
      transform: skewX(-15deg);
      border-top-left-radius: 12px; // 新增
    }
    .tab-selected::after {
      content: '';
      position: absolute;
      right: -6px;
      bottom: 0;
      width: 12px;
      height: $tab-height;
      background-color: red;
      transform: skewX(15deg);
      border-top-right-radius: 12px; // 新增
    }

```


![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f3492e2df4643c6928536c9a3876fa2~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=410\&h=94\&s=7218\&e=png\&b=fcfcfc)

## 未选中tab添加反圆角效果

```javascript 
    .not-selected::before {
      content: '';
      position: absolute;
      left: 6px;
      bottom: 0;
      width: 12px;
      height: $tab-height;
      border-bottom-left-radius: 12px;
      background-color: yellow;
      transform: skewX(15deg);
    }
    .not-selected::after {
      content: '';
      position: absolute;
      right: 6px;
      bottom: 0;
      width: 12px;
      height: $tab-height;
      border-bottom-right-radius: 12px;
      background-color: yellow;
      transform: skewX(-15deg);
    }

```


![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/69eab34bf66040129bdb7335e14203f0~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=446\&h=158\&s=13536\&e=png\&b=fdfdfd)

## 修改选中tab周围的阴影

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/16acd6d01676436a9ec305e098fc82d6~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=426\&h=96\&s=8664\&e=png\&b=fbfbfb)

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5477a8cfe2494491afe927be3cf2c909~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=410\&h=94\&s=9120\&e=png\&b=fcfcfc)

```javascript 
    .tab-selected {
      opacity: 1;
      background: #ffffff;
      border-radius: 12px 12px 0 0;
      box-shadow: 24px 40px 0 $active-color, -24px 40px 0 0 $active-color; // 重点
    }

```


## 最后修复选中颜色，未选中颜色即可

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a0e168d0f9c4a8cb36ff6bfe1f75025~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=410\&h=78\&s=6637\&e=png\&b=e2e8f8)

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb3c40c03cd24b8e9d1ca0f9af64e2a5~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=404\&h=84\&s=6923\&e=png\&b=ffffff)

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/333f235677e34492a6fe0d7a121cc29e~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=404\&h=102\&s=10507\&e=png\&b=fcfcfc)

无论多少个tabs，这个都没问题

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd8c529fafd34f46851bf8779bf03f42~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=406\&h=80\&s=4873\&e=png\&b=ffffff)

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e71fa9d83af44a0b4f59747a0633de6~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=408\&h=92\&s=5294\&e=png\&b=fcfcfc)

**整体代码**

```javascript 
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .tab-list {
            display: flex;
            position: relative;
            z-index: 2;
            border-radius: 12px 12px 0 0;
            background-color: #e2e8f8;
            overflow: hidden;
        }
        .tab-item {
            flex: 1;
            height: 52px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 15px;
            color: green;
            font-weight: 600;
            position: relative;
        }
        .tab-icon {
            width: 17px;
            height: 17px;
            margin-right: 4px;
            margin-top: 1px;
        }
        .tab-selected {
            opacity: 1;
            background: #ffffff;
            border-radius: 12px 12px 0 0;
            box-shadow: 24px 40px 0 #ffffff, -24px 40px 0 0 #ffffff;
        }
        .tab-selected::before {
            content: '';
            position: absolute;
            left: -6px;
            bottom: 0;
            width: 12px;
            height: 52px;
            border-top-left-radius: 12px;
            background-color: #ffffff;
            transform: skewX(-15deg);
        }

        .tab-selected::after {
            content: '';
            position: absolute;
            right: -6px;
            bottom: 0;
            width: 12px;
            height: 52px;
            border-top-right-radius: 12px;
            background-color: #ffffff;
            transform: skewX(15deg);
        }

        .not-selected::before {
            content: '';
            position: absolute;
            left: 6px;
            bottom: 0;
            width: 12px;
            height: 52px;
            background: #e2e8f8;
            border-bottom-left-radius: 12px;
            transform: skewX(15deg);
        }
        .not-selected::after {
            content: '';
            position: absolute;
            right: 6px;
            bottom: 0;
            width: 12px;
            height: 52px;
            background: #e2e8f8;
            border-bottom-right-radius: 12px;
            transform: skewX(-15deg);
            z-index: 1;
        }

    </style>

</head>
<body>

<div class="tab-list">
    <div
        class="tab-item not-selected"
    >
        <image  class="tab-icon" />
        <div>xxx1</div>
    </div>
    <div
        class="tab-item tab-selected"
    >
        <image  class="tab-icon" />
        <div>xxx2</div>
    </div>
</div>

</body>
<script>


</script>
</html>
```


> 注意：这里高度改变要改变box-shadow
> 比如说： height 由 52px 变成30px; box-shadow 变成 20px 20px
