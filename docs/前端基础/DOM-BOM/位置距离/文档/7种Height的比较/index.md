# 7种Height的比较

## 目录

- [这7种高度的基本含义：](#这7种高度的基本含义)
- [下面来比较一下这7个Height：](#下面来比较一下这7个Height)
- [总结：](#总结)
  - [应用：](#应用)

#### **这7种高度的基本含义：**

- `screen.height`：用户屏幕高度
- `screen.availHeight`：用户屏幕可用高度，减去了窗口工具值类的界面特征
- `window.innerHeight`：浏览器窗口的视口高度，包括水平滚动条
- `window.outerHeight`：浏览器窗口外部高度
- `document.body.offsetHeight`：文档中 body 部分的高度
- `document.documentElement.clientHeight`：文档可显示区域的高度
- `document.documentElement.offsetHeight`：文档本身的高度(`html`部分)

#### 下面来比较一下这7个Height：

现有如下页面：

```html 
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
  <p>今天天气不错</p>
</body>
</html>

```


1. 首先，在浏览器不全屏的情况下，我们打印所要了解的 7 种 Height ：

```javascript 
<script>
  console.log(screen.height);  // 768
  console.log(screen.availHeight);  // 728
  console.log(window.innerHeight);  // 519
  console.log(window.outerHeight);  // 639
  console.log(document.body.offsetHeight);  // 22
  console.log(document.documentElement.clientHeight);  // 519
  console.log(document.documentElement.offsetHeight);  // 54
</script>

```


1. 我们改变浏览器窗口高度后再来看这些值：

```javascript 
<script>
  console.log(screen.height);  // 768
  console.log(screen.availHeight);  // 728
  console.log(window.innerHeight);  // 433 变小
  console.log(window.outerHeight);  // 533 变小
  console.log(document.body.offsetHeight);  // 22
  console.log(document.documentElement.clientHeight);  // 433 变小
  console.log(document.documentElement.offsetHeight);  // 54
</script>

```


由此可见：

- **`screen.height`**\*\* 和 ****`screen.availHeight`**** \*\***不会随浏览器窗口变化，只与用户屏幕尺寸有关**
- **`window.innerHeight`****，****`window.outerHeight`****，****`document.documentElement.clientHeight`**\*\* 都随着浏览器窗口变化\*\*​
- **`window.innerHeight`**\*\* 等于 ****`document.documentElement.clientHeight`****即文档可显示区域的高度一般就是浏览器视口的高度\*\*

1. 另外我们发现 `document.body.offsetHeight` 和 `document.documentElement.offsetHeight` **并不相等**，而我们并未在 body之外添加别的内容或样式。造成两个不等的原因只有一个，就是浏览其默认样式。

现在我们去除浏览器默认样式，在head 中添加如下代码：

```css 
<style>
    *{margin: 0; padding: 0}   // 去除浏览器默认样式
</style>


```


此时再打印 `document.body.offsetHeight` 和 `document.documentElement.offsetHeight`，两个值就相等了。

```javascript 
console.log(document.body.offsetHeight);  // 22
console.log(document.documentElement.offsetHeight); //22

```


# 总结：

- `screen.height`和`screen.availHeight`是与用户屏幕尺寸有关的数据，与浏览器和文档没有关系
- 要获取浏览器视口的高度，使用`window.innerHeight` 或 `document.documentElement.clientHeight`
- 要获取文档内容的高度，使用 `document.body.offsetHeight` 或 `document.documentElement.offsetHeight`，在去除浏览器默认样式的情况下，两者相等
- `window.innerHeight` 与 `window.outerHeight` 关系如下图：

![](./assets/image/image_pu41Z6L1mv.png)

#### 应用：

通常获取浏览器窗口高度和文档高度是为了做滚动条效果，滚动条的最大滚动距离，即 `document.documentElement.scrollTOP` 的最大值应是：

`document.documentElement.offsetHeight` 减去 `window.innerHeight`

![](./assets/image/image_WjPw8WhuEX.png)
