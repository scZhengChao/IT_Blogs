# 图片适配

记住 @2x 图 和 @3x 图 都是针对 retina 屏来说的；用了图像更加的细腻； rem则是为了适配不同屏幕来说的;

```css 
.avatar{
    background-image: url(conardLi_1x.png);
}

@media only screen and (-webkit-min-device-pixel-ratio:2){
    .avatar{
        background-image: url(conardLi_2x.png);
    }
}

@media only screen and (-webkit-min-device-pixel-ratio:3){
    .avatar{
        background-image: url(conardLi_3x.png);
    }
}



 背景图: image-set 
.img { 
    /* 兼容不支持image-set的webview */
     background-image: url('../imgs/@2x/photo@2x.png'); 
     background-image: image-set( "test.png" 1x, "test-2x.png" 2x, "test-print.png" 600dpi );
}
 IOS在8以上与安卓4.4以上都已经兼容了这个css属性了(css 会自己去匹配；浏览器支持，小数点的也支持)只适用于背景图 


 使用 img标签的 srcset属性 ，浏览器会自动根据像素密度匹配最佳显示图片：
<img src="conardLi_1x.png" srcset=" conardLi_2x.png 2x, conardLi_3x.png 3x">

 或者: devicePixelRatio 
    const dpr = window.devicePixelRatio;
    const images = document.querySelectorAll('img');
    images.forEach((img)=>{
        img.src.replace(".", `@${dpr}x.`);
    })


 或者:使用svg 
     SVG 的全称是 可缩放矢量图（ ScalableVectorGraphics） 。不同于位图的基于像素， SVG 则是属于对图像的形状描述，所以它 本质上是文本文件，体积较小 ，且不管放大多少倍都不会失真。
```
