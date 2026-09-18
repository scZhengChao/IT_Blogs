# 前端水印

## 目录

- [一、问题背景](#一问题背景)
- [二、实现方案](#二实现方案)
  - [用一个 div 全屏 fixed](#用一个-div-全屏-fixed)
  - [信息绑定](#信息绑定)
  - [canvas](#canvas)
  - [有防窜改的功能](#有防窜改的功能)
  - [注意事项](#注意事项)

# 一、问题背景

为了防止信息泄露或知识产权被侵犯，在 web 的世界里，对于页面和图片等增加水印处理是十分有必要的，水印的添加根据环境可以分为两大类，**前端**浏览器环境添加和**后端**服务环境添加，简单对比一下这两种方式的特点：

前端浏览器加水印：

- 减轻服务端的压力，快速反应
- 安全系数较低，对于掌握一定前端知识的人来说可以通过各种骚操作跳过水印获取到源文件
- 适用场景：资源不跟某一个单独的用户绑定，而是一份资源，多个用户查看，需要在每一个用户查看的时候添加用户特有的水印，多用于某些机密文档或者展示机密信息的页面，水印的目的在于文档外流的时候可以追究到责任人

后端服务器加水印：

- 当遇到大文件密集水印，或是复杂水印，占用服务器内存、运算量，请求时间过长
- 安全性高，无法获取到加水印前的源文件
- 适用场景：资源为某个用户独有，一份原始资源只需要做一次处理，将其存储之后就无需再次处理，水印的目的在于标示资源的归属人

这里我们讨论前端浏览器环境添加

# 二、实现方案

我们从实现方式上来考虑，既然要做水印，那肯定要是全屏幕的，我们会先想到几点

1. 用一个 div 全屏 fixed。
2. 水印要和登录信息绑定，那么我们从 cookie 中获取一下账号信息。
3. 屏幕上一个大的水印，效果没有密密麻麻的小水印效果好。
4. 水印之前的间距要小一点，这样才能增加覆盖面积。
5. 要有防止窜改的功能。

列出以上这几点，我们就依次实现就好了。

## 用一个 div 全屏 fixed

```react tsx 
const divObj = document.createElement('div');
     const styleStr = '
                   position:fixed;
                   top:0;
                   left:0;
                   bottom:0;
                   right:0;
                   z-index:999999;
                   background-repeat:repeat;
                   '
     divObj.setAttribute('style', styleStr);
     document.body.appendChild(divObj);
```


## 信息绑定

水印的内容我们从 cookie 中获取一下。

```react tsx 
const user = /user_name=([^;]+)/.exec(document.cookie);
const name = Array.isArray(user) && user.length === 2 && user[1] ? user[1] : '配置的水印';
```


这里的 name 就是我们拿到的用户信息。

## canvas

第 3,4 点这两个综合考虑的话，将 name 作为一个背景图 然后 repeat 就可以了。我们要将文字转为图片，那么 canvas 是一个不错的选择。同时我们要考虑到这个图片不易过大（为了符合第三点），所以我们就按照 200\*100 的尺寸吧。

```react tsx 
const canvasObj = document.createElement('canvas');
const canvas2d = canvasObj.getContext('2d');
canvasObj.width = 200;
canvasObj.height = 100;
canvas2d.font = fontSize + 'px Arial';
canvas2d.fillStyle = 'rgba(128,128,128,.6)'; // 这里文字的颜色淡一点，不要影响整体的美观
canvas2d.translate(canvasObj.width / 4, canvasObj.height / 2);
canvas2d.rotate((-30 / 180) * Math.PI);
canvas2d.fillText(name, 0, canvasObj.height / 2);
// 将canvas 转为 dataURL
const base64Url = canvasObj.toDataURL('image/png');
```


## 有防窜改的功能

要有防窜改的功能，具体要体现在我们创建的水印不能轻易的让别人给删了，其次，水印内容也不能轻易的被改了，无论是水印内容或者是水印的颜色样式等。

水印内容这一块因为我们使用的是 cookie 中的登录信息，如果有人更改了 cookie 中的值，会导致登录信息失效，在 sso 这一侧就会被强制跳转到登录页面，所以这个可以交由登录系统来做。

我们的 dom 不能轻易的被删除和更改样式，那么我们就**需要用到 **[**MutationObserver**](http://javascript.ruanyifeng.com/dom/mutationobserver.html "MutationObserver")** 这个 api **了，他的作用就是**监听 DOM 的变化，并触发一个回调，我们只需在回调中重新执行水印的方法就可以避免**这个问题。

```react tsx 

if (MutationObserver) {
        let waterMarkOb = new MutationObserver(function () {
          const _globalWatermark = document.querySelector(`domId`);
          // 当样式或者水印元素dom节点有改动时会重新绘制
          if (
            (_globalWatermark && _globalWatermark.getAttribute('style') !== styleStr) ||
            !_globalWatermark
          ) {
            waterMarkOb.disconnect();
            waterMarkOb = null;
            setWaterMark();
          }
        });
        // 指定观察对象
        waterMarkOb.observe(document.body, {
          attributes: true,
          subtree: true,
          childList: true,
        });
      }
```


## 注意事项

注意事项中有一点，就是我们的水印功能尽可能的不要影响到业务的使用。 所以这里我们要考虑两点：

我们的水印 dom 在全屏幕的最上层，虽然层级在 99999，但是也不要影响到下面的元素操作。所以我们需要**增加`pointer-events:none`的属性，不影响鼠标的操作**。

我们要在**前端代码不变动的情况下上线水印的功能**，那我们就要从服务器上入手了，比如在 nginx 中，我们可以**使用 sub\_filter 模块来替换返回的**文本。例如

```react tsx 
subs_filter "(<\/body>)" "$1<script src=\"https://cdn.xxx.com/watermark.js\"></script>" irg;
```
