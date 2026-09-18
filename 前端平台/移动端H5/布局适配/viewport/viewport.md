# viewport

## 目录

- [什么是viewport](#什么是viewport)
- [viewport的单位vw、vh](#viewport的单位vwvh)
- [viewport适配解决方案](#viewport适配解决方案)
- [解决第三方组件库兼容问题](#解决第三方组件库兼容问题)
  - [标注不需要转换的属性](#标注不需要转换的属性)
- [vw](#vw)

## 什么是`viewport`

`viewport`翻译成中文的意思大致是视图、视窗。在移动端设备中,整块显示屏就相当于视图、视窗。但这种说法也并不完全正确。因为在移动端设备中,浏览器视图并不是整个屏幕。因此`viewport`又被分为了3种 `layout viewport`、`visual viewport`、`ideal viewport`

为了能够适配到pc端开发页面中,大部分浏览器把`viewport`的宽度设为了`980px` 这个浏览器默认设置的视图被称为 `layout viewport`。我们可以使用`document.documentElement.clientWidth` 来获取。

由于 `layout viewport`的宽度是远大于浏览器宽度的，因此我们需要一个新的`viewport`来代表浏览器的可视区域宽度，这个视图则被称为`visual viewport`我们可以使用`window.innerWidth`来获取。

现在我们已经有两个`viewport`了,`layout viewport` 和 `visual viewport`。但浏览器觉得还不够，因为现在越来越多的网站都会为移动设备进行单独的设计，所以必须还要有一个能完美适配移动设备的`ideal viewport`。

`ideal viewport` 并没有一个固定的尺寸，不同的设备拥有不同的 `ideal viewport`。比如`iphone5`的 `ideal viewport`是 320px 而 `iphone6s`的 `ideal viewport`却是 375px

## `viewport`的单位`vw、vh`

`vw、vh`将`viewport`分成了一百份。vw即 `viewport width` vh即`viewport height`

- 1vw等于视图单位的1%的宽度
- 1vh等于视图单位的1%的高度

如果设计稿的视图为375px 那么1vw 等于 3.75px

在配置开始之前 我们依然需要一个vue-cli项目 在项目的`index.html` 我们需要在`head`标签中添加如下代码

```javascript 
<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
```


## `viewport`适配解决方案

要使用`viewport`适配 我们必须安装`postcss-px-to-viewport`这个包。这包名是不是有一种似曾相识的感觉。

没错,上篇文章中我们使用过`postcss-pxtorem`。这两个包不仅名字相似，功能也有相似的地方。`postcss-pxtorem`是将 `px`单位转换为`rem`单位。`postcss-px-to-viewport`则是将px单位转换为`vw、vh`

```javascript 
//引入 postcss-px-to-viewport
  npm install postcss-px-to-viewport --save-dev
```


安装完成后 我们需要进行postcss插件相关的配置 在根目录新建一个名为postcss.config.js的文件,如果项目中已包含该文件则无需新建。在文件中写入如下代码:

```javascript 
//postcss.config.js

module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
     unitToConvert: "px", // 要转化的单位       
     viewportWidth: 375, // UI设计稿的宽度       
     unitPrecision: 6, // 转换后的精度，即小数点位数       
     propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换     
     viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw       
     fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw      
     selectorBlackList: ["wrap"], //  指定不转换为视窗单位的类名 ，       
     minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换       
     mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false      
     replace: true, // 是否转换后直接更换属性值       
     exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配       
    }
  }
}
```


**值得注意的是:****`postcss-px-to-viewport`**** 同样存****在第三方组件库兼容性的问题****。比如在设计稿为750px时使用vant组件库会将vant组件的样式缩小。**

## 解决第三方组件库兼容问题

vant组件库的设计稿是按照375px来开发的。因此在`viewportWidth`为`750px`时会出现转换问题。

```javascript 
// postcss.config.js
const path = require('path');

module.exports = ({ webpack }) => {
  const viewWidth = webpack.resourcePath.includes(path.join('node_modules', 'vant')) ? 375 : 750;
  return {
    plugins: {
      autoprefixer: {},
      "postcss-px-to-viewport": {
        unitToConvert: "px",
        viewportWidth: viewWidth,
        unitPrecision: 6,
        propList: ["*"],
        viewportUnit: "vw",
        fontViewportUnit: "vw",
        selectorBlackList: [],
        minPixelValue: 1,
        mediaQuery: true,
        exclude: [],
        landscape: false
      }
    }
  }
}

```


如果读取的`node_modules`中的文件是`vant`,那么就将设计稿变为`375px`。如果读取的文件不是`vant`的文件,那么就将设计稿变为`750px`。这样就可以避免`vant`组件在`750px`下出现样式缩小的问题了。

同理 这对于其他的移动端UI组件库同样有效果。我们只需要改动这行代码即可

```javascript 
const viewWidth = webpack.resourcePath.includes(path.join('node_modules', 'vant')) ? 375 : 750; 
```


#### 标注不需要转换的属性

在项目中，如果设计师要求某一场景不做适配，需为固定的宽高或大小，这时我们就需要利用 `postcss-px-to-viewport` 插件的 `ignoring`特性，**对不需要转换的属性进行标注，** 如下所示：

```typescript 
/* example input: */
.box {
  /* px-to-viewport-ignore-next */
  width: 100px;
  padding: 20px;
  height: 100px; /* px-to-viewport-ignore */
}

/* example output: */
.box {
  width: 100px; 
  padding: 2.6667vw;
  height: 100px;
}

```


当然，viewport 适配方案也有一定的缺陷：`px` 转换成 `vw` 不一定能完全整除，因此有一定的像素差。

# vw

```纯文本 
如何不用兼容低版本机型
100vw = 750px
1px = 0.133333vw
font-size : 0.13333vw

这样就 750px的设计稿  50 px == 0.5rem  除100就行
```
