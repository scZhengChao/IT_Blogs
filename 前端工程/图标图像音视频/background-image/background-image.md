# background-image

&#x20;       请尝试在浏览器的开发者工具中将网络速度调整到较慢，然后访问一个由高清图片组成的网站，比如 `unsplash`。这就是你的网站访客在网络速度较慢的地理区域尝试欣赏你的高清内容时所经历的痛苦。

&#x20;      但你可以通过 `image-set` CSS 技巧提供一种解救方法。

&#x20;      可以为浏览器提供选项，让它决定最适合用户设备的图片。例如：

```css 
.banner {
    background-image: url("elephant.png"),
    background-image: -webkit-image-set(
        url("elephant.webp") type("image/webp") 1x,
        url("elephantHD.webp") type("image/webp") 2x,
        url("elephant.png") type("image/png") 1x,
        url("elephantHD.png") type("image/png") 2x
    );
}

```


上述代码将设置元素的背景图像。

如果支持 `-webkit-image-set` ，那么背景图像将会是一种优化的图像，也就是说，这将是一种支持的MIME类型的图像，且更适合用户设备的分辨率能力。

例如：由于更高质量的图像直接与更大的尺寸成正比，所以在网络状况差的情况下使用高分辨率设备的用户，会促使浏览器决定提供支持的低分辨率图像。让用户等待高清图像加载是不合逻辑的。
