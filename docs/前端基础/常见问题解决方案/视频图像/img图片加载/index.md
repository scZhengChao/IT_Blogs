# img图片加载

## 目录

- [通过onload事件判断Img标签加载完成](#通过onload事件判断Img标签加载完成)
  - [img标签是什么时候发送图片资源请求的？](#img标签是什么时候发送图片资源请求的)
  - [通过设置css属性能否做到禁止发送图片请求资源？](#通过设置css属性能否做到禁止发送图片请求资源)

## 通过onload事件判断Img标签加载完成

实现逻辑：新建一个Image对象实例，为实例对象设置src属性等，在onload事件中添加此实例对象到父元素中，然后将图片地址数组中的第一个元素剔除，继续调用此方法直到存储图片地址的数组为空。

```javascript 

const imgArrs = [...]; // 图片地址
const content = document.getElementById('content');
const loadImg = () => {
  if (!imgArrs.length)  return;
  const img = new Image(); // 新建一个Image对象
  img.src = imgArrs[0];
  img.setAttribute('class', 'img-item');
  img.onload = () => { // 监听onload事件
    // setTimeout(() => { // 使用setTimeout可以更清晰的看清实现效果
      content.appendChild(img);
        imgArrs.shift();
        loadImg();
    // }, 1000);
  }
  img.onerror = () => {
    // do something here
  }
}
  loadImg();

</script>


```


### img标签是什么时候发送图片资源请求的？

1. HTML文档渲染解析，如果解析到img标签的src时，浏览器就会立刻开启一个线程去请求图片资源。
2. 动态创建img标签，设置`src`属性时，即使这个img标签没有添加到dom元素中，也会立即发送一个请求。

```javascript 
// 例1：
const img = new Image();
img.src = 'http://xxxx.com/x/y/z/ccc.png';

```


再看一个例子：创建了一个`div`元素，然后将存放`img标签`元素的变量添加到`div`元素内，而`div`元素此时并不在`dom`文档中，页面不会展示该`div`元素，那么浏览器会发送请求吗？

```javascript 
// 例2：
const img = `<img src='http://xxxx.com/x/y/z/ccc.png'>`;
const dom = document.createElement('div');
dom.innerHtml = img;

```


### 通过设置css属性能否做到禁止发送图片请求资源？

1. 给`img标签`设置样式`display:none`或者`visibility: hidden`，隐藏`img标签`，无法做到禁止发送请求。

```javascript 
<img src="http://xxx.com/x/sdf.png" style="display: none;">
或者
<img src="http://xxx.com/x/sdf.png" style="visibility: hidden;">

```


1. 将图片设置为元素的背景图片，但此元素不存在，可以做到禁止发送请求。

```javascript 
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <title></title>
    <style>
        .test {
            height: 200px;
            background-image: url('http://eb118-file.cdn.bcebos.com/upload/39148b2a545b48bf9b4ee95fd1b7f1eb_1515564089.png?');
        }
    </style>
</head>
<body>
<div></div>
</body>
</html>


```


dom文档中不存在`test`元素时，即使设置了背景图片，也不会发送请求，只有`test`元素存在时才会发送请求。

另外这个例子其实有点不太贴切，`img标签`和`background-image`二者有着本质的区别。一个属于HTML标签，另一个属于css样式，加载机制和解析顺序也不同。
