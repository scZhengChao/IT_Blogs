# webp

## 目录

- [Adnimated WebP(动态WebP)](#Adnimated-WebP动态WebP)
- [.webp的缺点](#webp的缺点)
- [Demo1：最简单的样列](#Demo1最简单的样列)
- [Demo2：保留原始属性](#Demo2保留原始属性)
- [Demo3：保留原始样式](#Demo3保留原始样式)
- [Demo4：支持动态载入](#Demo4支持动态载入)
  - [WebP的兼容处理方案](#WebP的兼容处理方案)
  - [在线压缩网站](#在线压缩网站)
  - [总结](#总结)

　\*　WebP是Google推出的一种图片格式，它基于VP8编码（更优秀的算法），可对图像大幅压缩，在画质相同的情况下，WebP格式比JPEG图像小40%。 \*在国内外有相对较高的知名度，大量使用这种格式图片的国外公司有谷歌，国内有淘宝，腾讯，美团等公司。

这种格式的图片支持有损压缩和无损压缩两种压缩模式。它的特点是体积小

> 根据Google较早的测试，WebP的无损压缩比网络上找到的PNG档少了45%的文件大小，即使这些PNG档在使用pngcrush和PNGOUT处理过，WebP还是可以减少28%的文件大小。

> *体积小意味着加载时间更短*。客户可以不用过长等待资源的加载，在客户*体验感上会比较友好*。更重要的是，体积小，同样也意味着*更少的宽带流量*。可以给企业减少在宽带上的支出。

所以，将png/jpg等格式的图片用webp替代是图片的优化策略之一。

*在线png v/s webp 示例👉*[*WebP 示例 (PNG 转 WebP) (isparta.github.io)*](https://link.juejin.cn/?target=https://isparta.github.io/compare-webp/index.html#12345 "WebP 示例 (PNG 转 WebP) (isparta.github.io)")

### Adnimated WebP(动态WebP)

当然，除了静态图片（png/jpg/...）可以转化为WebP格式以外。动态图片也可以转化为WebP。 2013年底，Google推出了\_Animated WebP\_,就是动态的WebP(WebP版gif)。

虽然\_Animated WebP\_压缩度没有达到Google所预期的状态，但是相较于gif原图还是有着不错的改善。 [官方的Animated WebP案例](https://link.juejin.cn?target=https://isparta.github.io/compare-webp/index_a.html#12 "官方的Animated WebP案例")

### .webp的缺点

当然，虽然webp的体积会比传统的png/jpg小，但这并不意味着webp可以完全替代png/jpg。

\*\*\*webp的兼容性并不如png/jpg。一直到今天，webp在全球浏览器中的支持度大约在\*95%\*左右浮动。\*\*\*在未来浏览器对webp格式的兼容性会越来越好。

常规的目标客户完全可以采用webp去替代png和jpg（具体根据目标客户不同采用不同的格式，比如如果目标客户是政府外包的旧网站，使用很旧的浏览器，那可能就不是很适合使用webp）。

![](./assets/image/image_umPUSuAzwo.png)

## **Demo1：最简单的样列**

```css 
 <img src="Test.webp" />
```


## **Demo2：保留原始属性**

```css 
 <img src="Test.webp" width="250" height="150" title="这是一副WebP图片！" style="border:red 2px solid" />
```


## **Demo3：保留原始样式**

```css 
 <style>
    img {
        filter: alpha(opacity=50);
        opacity: 0.5;
    }     
    .t {
        border: blue dotted 2px;
    }
</style><img class="t" src="Test.webp" />
```


## **Demo4：支持动态载入**

```css 
 <div id="con"></div><script type="text/javascript">
    var d = document.getElementById("con");
    function add()
    {
        d.innerHTML = "<img class='t' src='Test.webp' title='Hello~' />";
    }
    function del()
    {
        d.innerHTML = "";
    }
</script><button οnclick="add()">载入</button><button οnclick="del()">移除</button>
```


#### WebP的兼容处理方案

可以使用picture和source来处理兼容问题

```typescript 
<picture>
  <source type="MIME-TYPE" srcset="./image.webp"></source>
  <img src="./image.png">
</picture>
```


缺点：文件服务器上要同时存放这两种格式的图片

### 在线压缩网站

[Squoosh(在线压缩)](https://link.juejin.cn/?target=https://squoosh.app/ "Squoosh(在线压缩)")

### 总结

       WebP 是由谷歌（google）开发的一种**旨在加快图片加载速度的图片格式**,并能**节省大量的服务器宽带资源和数据空间**，在**压缩率上比 JPEG 格式更优越**，同时提供了有损压缩与无损压缩的图片文件格式，**在质量相同的情况下，WebP 格式图像的体积要比 JPEG 格式图像小 40%**。

         其实在网络传播中图片已经必不可少，现在的各个**网站也都是图文并茂**，**图片也就成了流量的大头**，不论是 PC 端还是移动端。虽然国民的

**带宽都在提升**，但是与此同时各个网站以及对**图片质量更高的追求**，同样也使得体验没有较大的提升，这也是很多网站**使用懒加载的方式载入图片**，间接的可以**提升网站的打开速度和用户体验**。

    但是这一切都还不够，如何保证在**图片的高质量不降低的前提下缩小图片体积**，成为了一个有价值和值得探索的并改变事情。如今对于 JPEG、PNG 和 GIF 这些图片格式的优化几乎已经达到了极致，而 Google 就给了我们一个新选择：WebP，开辟了一个图片格式的新局面。
