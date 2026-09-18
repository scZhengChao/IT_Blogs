# 高级延迟

## 目录

- [应用场景](#应用场景)
  - [全量代码](#全量代码)

> 动画在前端开发中是经常遇到的场景之一，加入动画后页面可以极大的提升用户体验。

> 绝大多数简单的动画场景可以直接通过CSS实现，对于一些特殊场景的动画可能会使用到JS计算实现，通过本文的学习，可以让你在一些看似需要使用JS实现的动画场景，使用纯CSS一样可以实现，并且更方便快捷。

先看一个简单的例子：一个方块的位置随着滑条滑动的位置改变

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/260eab49221f4715b4e196b4850e8d98~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=540\&h=176\&s=245599\&e=gif\&f=166\&b=fcfcfc)

这个场景实现起来很简单，滑条值改变后，使用JS计算方块应该移动的距离，然后将方块定位到指定位置即可。代码如下：

```css 
.box {
  height: 50px;
  width: 50px;
  background-color: aquamarine;
}
<div class="box"></div>
<input type="range" min="0" max="1" step="0.01"/>

```


```html 
<script>
const input = document.querySelector("input");
    const box = document.querySelector(".box");
    input.addEventListener('input', (e) => {
        const value = e.target.value;
        box.style.transform = `translateX(${200 * value}px)`;
    })
</script>

```


现在稍微增加一些动画效果：

- 方块在中间位置时缩放为原来的一半大小
- 方块在中间位置时变成球形
- 方块从红色变为绿色

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/866aa056a6364c2aad34942e3ad9ef86~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=548\&h=152\&s=291152\&e=gif\&f=187\&b=fcfcfc)

对于大小和圆角，同样可以使用简单的JS进行计算实现，但是对于颜色变化，使用JS计算将会是一个非常复杂的过程。

先抛开动画跟随滑条运动这个要求，如果使用CSS实现上面从0-1的动画过程是一个很简单的事：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b75525a908f3477aa4fc2444878240d5~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=548\&h=152\&s=219832\&e=gif\&f=118\&b=fdfdfd)

```css 
.box {
    height: 50px;
    width: 50px;
    background-color: aquamarine;
    transform: translateX(0);
    animation: run 1s linear forwards;
}
@keyframes run {
    0% {
        transform: translateX(0) scale(1);
        border-radius: 0%;
        background: red;
    }
    50% {
      transform: translateX(100px) scale(.5);
      border-radius: 50%;
    }
    100% {
      transform: translateX(200px) scale(1);
      border-radius: 0%;
      background: green;
    }
}

```


利用CSS动画帮我们可以很轻松的计算出每个时间点时的状态，现在的问题就变成如何让动画停留在指定的时间点，这就需要使用到动画的两个属性：

`annimation-play-state`：**设置动画是运行还是暂停**，有两个属性值`runing`、`paused` `annimation-delay`：\*\*设置动画开始时间的偏移量，\*\***如果是正值，则动画会延迟开始；如果是负值(-d)，动画会立即开始，开始位置在动画(d)s时所处的位置**。

有了这两个属性，现在将上面的动画停留在50%的位置&#x20;

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff78a18d4b09413bbc08f3f80e8e6299~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=556\&h=162\&s=6799\&e=png\&b=ffffff)

假设整个动画过程需要1s，50%的位置则需要将延迟值设置为-0.5s，这样动画就会停留在0.5s的位置。

```css 
.box {
    height: 50px;
    width: 50px;
    background-color: aquamarine;
    transform: translateX(0);
    animation: run 1s -0.5s linear forwards infinite paused;
}

```


接下来**只需要将滑条的值与动画延迟的值关联起来即可，这里可以通过CSS变量来实现：**

```css 
.box {
  --duration: -0.5s;  // 定义延迟变量
  height: 50px;
  width: 50px;
  background-color: aquamarine;
  transform: translateX(0);
  animation: run 1s var(--duration) linear forwards infinite paused;
}
​
@keyframes run {
    0% {
      transform: translateX(0) scale(1);
      border-radius: 0%;
      background: red;
    }
    50% {
      transform: translateX(100px) scale(.5);
      border-radius: 50%;
    }
    100% {
      transform: translateX(200px) scale(1);
      border-radius: 0%;
      background: green;
    }
}

```


```html 
<script>
const input = document.querySelector("input");
    const box = document.querySelector(".box");
    // 绑定滑条输入值变化
    input.addEventListener('input', (e) => {
        const value = e.target.value;
        // 设置变量
        box.style.setProperty('--duration', `-${e.target.value}s`)
    })
</script>

```


## 应用场景

利用CSS延迟动画可以轻松实现很多交互场景，例如：跟随鼠标滚动界面发生反馈动画、根据当天时间界面从日出到日落、根据不同分值出现不同表情变化等等。&#x20;

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5fb814779b2144cca3c831f84a766076~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=832\&h=458\&s=1669297\&e=gif\&f=219\&b=bbbaba)

#### 全量代码

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

        .box {
            --duration: -0.5s;
            height: 50px;
            width: 50px;
            background-color: aquamarine;
            transform: translateX(0);
            animation: run 1s var(--duration) linear forwards infinite paused;
        }
        @keyframes run {
            0% {
                transform: translateX(0) scale(1);
                border-radius: 0%;
                background: red;
            }
            50% {
                transform: translateX(100px) scale(.5);
                border-radius: 50%;
            }
            100% {
                transform: translateX(200px) scale(1);
                border-radius: 0%;
                background: green;
            }
        }


    </style>
</head>
<body>

<div class="box"></div>
<input type="range" min="0" max="1" step="0.01"/>

</body>
<script>
    const input = document.querySelector("input");
    const box = document.querySelector(".box");
    // 绑定滑条输入值变化
    input.addEventListener('input', (e) => {
        const value = e.target.value;
        // 设置变量
        box.style.setProperty('--duration', `-${e.target.value}s`)
    })
</script>
</html>
```
