# img

## 目录

- [适配:](#适配)
  - [媒体查询](#媒体查询)
  - [image-set](#image-set)
  - [srcset](#srcset)
  - [js devicePixelRatio](#js-devicePixelRatio)
  - [svg](#svg)
- [图片丢失](#图片丢失)

# ***适配:***

## 媒体查询

```javascript 
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
```


## **image-set**

```javascript 
 .img { 
    /* 兼容不支持image-set的webview */
     background-image: url('../imgs/@2x/photo@2x.png'); 
     background-image: image-set( "test.png" 1x, "test-2x.png" 2x, "test-print.png" 600dpi );
}
IOS在8以上与安卓4.4以上都已经兼容了这个css属性了(css 会自己去匹配；浏览器支持，小数点的也支持)只适用于背景图
```


## srcset

**使用 img标签的 srcset属性**

，浏览器会自动根据像素密度匹配最佳显示图片：

```javascript 
 <img src="conardLi_1x.png" srcset=" conardLi_2x.png 2x, conardLi_3x.png 3x">
  
  //srcset 新增了新的 w 宽度描述符，需要配合 sizes 一起使用，所以更好的写法是：
  <img    
    src="photo.png"
    sizes=“(min-width:600px) 600px, 300px"
    srcset = “photo@1x.png 300w,
              photo@2x.png 600w,
              photo@3x.png 1200w,”
    >
```


## js devicePixelRatio

```javascript 
 或者: devicePixelRatio
    const dpr = window.devicePixelRatio;
    const images = document.querySelectorAll('img');
    images.forEach((img)=>{
        img.src.replace(".", `@${dpr}x.`);
    })
```


## svg

**SVG**的全称是*可缩放矢量图（ ScalableVectorGraphics）*。不同于位图的基于像素， SVG 则是属于对图像的形状描述，所以它***本质上是文本文件**\*\*，体积较小*

，且不管放大多少倍都不会失真。但是这个只适合小图标；色彩不丰富的单色图标最适合，其他的就不是很适合了

# 图片丢失

- 利用图片加载失败，触发 \<img> 元素的 onerror 事件，给加载失败的 \<img> 元素新增一个样式类
- 利用新增的样式类，配合 \<img> 元素的伪元素，展示默认兜底图的同时，还能一起展示 \<img> 元素的 alt 信息

```javascript 
 <img src="../assets/images/" alt="图片描述" onerror="this.classList.add('error');">    
 
img.error {
  position: relative;
  display:inline-block;
  width: 150px;
  height: 100px;
}
img.error::before {
  content:"";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  /** 定位代码 **/
  background:url('../assets/images/404.jpeg');
}
img.error::after {
  content: attr(alt);
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 5px 10px;
  background: #000;
  color: #eee;
  font-size: 12px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```
