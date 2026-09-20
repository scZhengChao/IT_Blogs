# 自定义字体

## 目录

- [图标加载三种方式](#图标加载三种方式)
  - [    unicode 方式  ](#unicode-方式-)
  - [       在线class ； font-class](#在线class--font-class)
  - [         svg 未来的绝对主流 ](#svg-未来的绝对主流)

# 图标加载三种方式

[手摸手，带你优雅的使用 icon - 掘金 首先我们来说一下前端 icon 的发展史。 在我刚开始实习时，大部分图标都是用 img 来实现的。渐渐发现一个页面的请求资源中图片 img 占了大部分，所以为了优化有了image sprite 就是所谓的雪碧图，就是将多个图片合成一个图片，然后利用 css 的 backgrou… https://juejin.im/post/59bb864b5188257e7a427c09](https://juejin.im/post/59bb864b5188257e7a427c09 "手摸手，带你优雅的使用 icon - 掘金 首先我们来说一下前端 icon 的发展史。 在我刚开始实习时，大部分图标都是用 img 来实现的。渐渐发现一个页面的请求资源中图片 img 占了大部分，所以为了优化有了image sprite 就是所谓的雪碧图，就是将多个图片合成一个图片，然后利用 css 的 backgrou… https://juejin.im/post/59bb864b5188257e7a427c09")

##     unicode 方式 &#x20;

（**自定义字体可以解决H5字体受系统字体的影响**）

```css 
  <style>
        @font-face {
            font-family: 'iconfont';  
            src: url('http://at.alicdn.com/t/font_912383_mrmd3jsjem.eot');
            src: url('http://at.alicdn.com/t/font_912383_mrmd3jsjem.eot?#iefix') format('embedded-opentype'),
            url('http://at.alicdn.com/t/font_912383_mrmd3jsjem.woff2') format('woff2'),
            url('http://at.alicdn.com/t/font_912383_mrmd3jsjem.woff') format('woff'),
            url('http://at.alicdn.com/t/font_912383_mrmd3jsjem.ttf') format('truetype'),
            url('http://at.alicdn.com/t/font_912383_mrmd3jsjem.svg#iconfont') format('svg');
        }
        .iconfont {
            font-family:"iconfont" !important;
            font-size:20px;
            font-style:normal;
            -webkit-font-smoothing: antialiased;
            -webkit-text-stroke-width: 0.2px;
            -moz-osx-font-smoothing: grayscale;
        }


    </style>
   
    <body>
            <i class="iconfont">&#xe6a1;</i>
</body>
```


##        在线class ； font-class

```css 
  <link rel="stylesheet" href="http://at.alicdn.com/t/font_912383_mrmd3jsjem.css">
</head>
<body>
        <i class="iconfont icon-erweima1"></i>
</body>
```


##          svg 未来的绝对主流 

```css 
              <style type="text/css">
                .icon {
                   width: 1em; height: 1em;
                   vertical-align: -0.15em;
                   fill: currentColor;
                   overflow: hidden;
                }
            </style>
</head>
<body>
    <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-erweima1"></use>
    </svg>
    <script src="http://at.alicdn.com/t/font_912383_mrmd3jsjem.js"></script>
</body>


```
