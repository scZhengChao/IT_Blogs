# 常见面试题

## 目录

- [position:fixed;在 android 下无效怎么处理？](#positionfixed在-android-下无效怎么处理)
- [如何让去除 inline-block 元素间间距？](#如何让去除-inline-block-元素间间距)
- [overflow:scroll 时不能平滑滚动的问题怎么处理？](#overflowscroll-时不能平滑滚动的问题怎么处理)
- [览器如何判断是否支持 webp 格式图片](#览器如何判断是否支持-webp-格式图片)
- [什么是 Cookie 隔离？CDN 是什么？使用 CDN 有什么优势](#什么是-Cookie-隔离CDN-是什么使用-CDN-有什么优势)
- [什么是 CSS 预处理器/后处理器？](#什么是-CSS-预处理器后处理器)
- [阐述一下 CSSSprites](#阐述一下-CSSSprites)
- [使用 rem 布局的优缺点？](#使用-rem-布局的优缺点)
- [为什么 height:100%会无效？](#为什么-height100会无效)
- [什么是替换元素？](#什么是替换元素)

[104道 CSS 面试题，助你查漏补缺（下） 本部分主要是笔者在复习 CSS 相关知识和一些相关面试题时所做的笔记，如果出现错误，希望大家指出！ https://mp.weixin.qq.com/s?\_\_biz=MzAxODE2MjM1MA==\&mid=2651563359\&idx=1\&sn=98f48adcb829cc16d8ec1dc5774874a4\&chksm=8025729eb752fb88ef1d254b91da6560f3c28de87eff3605adcddbfc592cb928bd5711fb7f41\&mpshare=1\&scene=1\&srcid=1027LINWij0Oi077K70b0TxB\&sharer\_sharetime=1603805404636\&sharer\_shareid=c581942ba12fd83f754283490bd7311e\&key=07efe2487f402f37afa86f5962575235d01c1f43c647ff3010a7d042186fc55614b342d4bf028017d87b021213b99e527cdf6b160bd4d20c5b69c52736dc960615b4ac61e5056c99ede29a52f4acd98bb722cb59e528a9c38d2b9be128d230646975dc3662b42c2fb2d8d16e7b641021c91b2f87a0857e55fa42943555d0834f\&ascene=1\&uin=MjQ0ODM4OTYwNg%3D%3D\&devicetype=Windows+10+x64\&version=6300002f\&lang=zh\_CN\&exportkey=A1wylPFe4p7M5n9R5YxTy8A%3D\&pass\_ticket=LUAtrMYErMxC9mRC8eB06bgzKRhdhNUoJmN8J0vr1JcQH6crEX%2FUqK8rk9I8K4hA\&wx\_header=0](https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==\&mid=2651563359\&idx=1\&sn=98f48adcb829cc16d8ec1dc5774874a4\&chksm=8025729eb752fb88ef1d254b91da6560f3c28de87eff3605adcddbfc592cb928bd5711fb7f41\&mpshare=1\&scene=1\&srcid=1027LINWij0Oi077K70b0TxB\&sharer_sharetime=1603805404636\&sharer_shareid=c581942ba12fd83f754283490bd7311e\&key=07efe2487f402f37afa86f5962575235d01c1f43c647ff3010a7d042186fc55614b342d4bf028017d87b021213b99e527cdf6b160bd4d20c5b69c52736dc960615b4ac61e5056c99ede29a52f4acd98bb722cb59e528a9c38d2b9be128d230646975dc3662b42c2fb2d8d16e7b641021c91b2f87a0857e55fa42943555d0834f\&ascene=1\&uin=MjQ0ODM4OTYwNg%3D%3D\&devicetype=Windows+10+x64\&version=6300002f\&lang=zh_CN\&exportkey=A1wylPFe4p7M5n9R5YxTy8A%3D\&pass_ticket=LUAtrMYErMxC9mRC8eB06bgzKRhdhNUoJmN8J0vr1JcQH6crEX%2FUqK8rk9I8K4hA\&wx_header=0 "104道 CSS 面试题，助你查漏补缺（下） 本部分主要是笔者在复习 CSS 相关知识和一些相关面试题时所做的笔记，如果出现错误，希望大家指出！ https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==\&mid=2651563359\&idx=1\&sn=98f48adcb829cc16d8ec1dc5774874a4\&chksm=8025729eb752fb88ef1d254b91da6560f3c28de87eff3605adcddbfc592cb928bd5711fb7f41\&mpshare=1\&scene=1\&srcid=1027LINWij0Oi077K70b0TxB\&sharer_sharetime=1603805404636\&sharer_shareid=c581942ba12fd83f754283490bd7311e\&key=07efe2487f402f37afa86f5962575235d01c1f43c647ff3010a7d042186fc55614b342d4bf028017d87b021213b99e527cdf6b160bd4d20c5b69c52736dc960615b4ac61e5056c99ede29a52f4acd98bb722cb59e528a9c38d2b9be128d230646975dc3662b42c2fb2d8d16e7b641021c91b2f87a0857e55fa42943555d0834f\&ascene=1\&uin=MjQ0ODM4OTYwNg%3D%3D\&devicetype=Windows+10+x64\&version=6300002f\&lang=zh_CN\&exportkey=A1wylPFe4p7M5n9R5YxTy8A%3D\&pass_ticket=LUAtrMYErMxC9mRC8eB06bgzKRhdhNUoJmN8J0vr1JcQH6crEX%2FUqK8rk9I8K4hA\&wx_header=0")

# position:fixed;在 android 下无效怎么处理？

           因为移动端浏览器

**默认的viewport叫做layout viewport**

。在移动端显示时，因为layout viewport的宽度大于移动端屏幕的宽度，所以页面会出现滚动条左右移动，fixed的元素是相对layout viewport来固定位置的，而不是移动端屏幕来固定位置的，所以会出现感觉fixed无效的情况。

如果想实现fixed相对于屏幕的固定效果，我们需要改变的是viewport的大小为ideal viewport，可以如下设置：

\<metaname="viewport"content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no"/>

# 如何让去除 inline-block 元素间间距？

移除空格、使用margin负值、使用font-size:0、letter-spacing、word-spacing

# overflow:scroll 时不能平滑滚动的问题怎么处理？

以下代码可解决这种卡顿的问题：-webkit-overflow-scrolling:touch;是因为这行代码启用了硬件加速特性，所以滑动很流

畅

# 览器如何判断是否支持 webp 格式图片

（1）宽高判断法。通过创建image对象，将其src属性设置为webp格式的图片，然后在onload事件中获取图片的宽高，如果能够获取，则说明浏览器支持webp格式图片。如果不能获取或者触发了onerror函数，那么就说明浏览器不支持webp格式的图片。

（2）canvas判断方法。我们可以动态的创建一个canvas对象，通过canvas的toDataURL将设置为webp格式，然后判断

返回值中是否含有image/webp字段，如果包含则说明支持WebP，反之则不支持。

# 什么是 Cookie 隔离？CDN 是什么？使用 CDN 有什么优势

网站向服务器请求的时候，会自动带上cookie这样增加表头信息量，使请求变慢。如果静态文件都放在主域名下，那静态文件请求的时候都带有的cookie的数据提交给server的，非常浪费流量，所以不如隔离开，静态资源放CDN。因为cookie有域的限制，因此不能跨域提交请求，故使用非主要域名的时候，请求头中就不会带有cookie数据，这样可以降低请求头的大小，降低请求时间，从而达到降低整体请求延时的目的。同时这种方式不会将cookie传入WebServer，也减少了WebServer对cookie的处理分析环节，提高了webserver的http请求的解析速度。

# 什么是 CSS 预处理器/后处理器？

         CSS预处理器定义了一种新的语言，其基本思想是，用一种专门的编程语言，为CSS增加了一些编程的特性，将CSS作为目标生成文件，然后开发者就只要使用这种语言进行编码工作

**。通俗的说，CSS预处理器用一种专门的编程语言，进行Web页面样式设计，然后再编译成正常的CSS文件。**

预处理器例如：LESS、Sass、Stylus，用来预编译Sass或less csssprite，增强了css代码的复用性，还有层级、mixin、

变量、循环、函数等，具有很方便的UI组件模块化开发能力，极大的提高工作效率。

CSS后处理器是对CSS进行处理，并最终生成CSS的预处理器，它属于广义上的CSS预处理器。我们很久以前就在用CSS后

处理器了，最典型的例子是CSS压缩工具（如clean-css），只不过以前没单独拿出来说过。还有最近比较Autoprefixer，

以CanIUse上的浏览器支持数据为基础，自动处理兼容性问题。

后处理器例如：PostCSS，通常被视为在完成的样式表中根据CSS规范处理CSS，让其更有效；目前最常做的是给CSS属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。

# 阐述一下 CSSSprites

将一个页面涉及到的所有图片都包含到一张大图中去，然后利用CSS的background-image，background-repeat，background-position的组合进行背景定位。利用CSSSprites能很好地减少网页的http请求，从而很好的提高页面的性能；CSSSprites能减少图片的字节。

优点

减少HTTP请求数，极大地提高页面加载速度

增加图片信息重复度，提高压缩比，减少图片大小

更换风格方便，只需在一张或几张图片上修改颜色或样式即可实现

缺点：

图片合并麻烦

维护麻烦，修改一个图片可能需要重新布局整个图片，样式

# 使用 rem 布局的优缺点？

优点：

在屏幕分辨率千差万别的时代，只要将rem与屏幕分辨率关联起来就可以实现页面的整体缩放，使得在设备上的展现都统一起来了。而且现在浏览器基本都已经支持rem了，兼容性也非常的好。

缺点：

（1）在奇葩的dpr设备上表现效果不太好，比如一些华为的高端机型用rem布局会出现错乱。

（2）使用iframe引用也会出现问题。

（3）rem在多屏幕尺寸适配上与当前两大平台的设计哲学不一致。即大屏的出现到底是为了看得又大又清楚，还是为了看的更多的问题。

# 为什么 height:100%会无效？

对于普通文档流中的元素，百分比高度值要想起作用，其父级必须有一个可以生效的高度值。

原因是如果包含块的高度没有显式指定（即高度由内容决定），并且该元素不是绝对定位，则计算值为auto，因为解释成了auto，所以无法参与计算。

使用绝对定位的元素会有计算值，即使祖先元素的height计算为auto也是如此。

# 什么是替换元素？

通过修改某个属性值呈现的内容就可以被替换的元素就称为“替换元素”。因此，\<img>、\<object>、\<video>、\<iframe>或者表单元素\<textarea>和\<input>和\<select>都是典型的替换元素。

替换元素除了内容可替换这一特性以外，还有以下一些特性。

（1）内容的外观不受页面上的CSS的影响。用专业的话讲就是在样式表现在CSS作用域之外。如何更改替换元素本身的外观需要类似apppearance属性，或者浏览器自身暴露的一些样式接口，

（2）有自己的尺寸。在Web中，很多替换元素在没有明确尺寸设定的情况下，其默认的尺寸（不包括边框）是300像素×150像素，如\<video>、\<iframe>或者\<canvas>等，也有少部分替换元素为0像素，如\<img>图片，而表单元素的替换元素的尺寸则和浏览器有关，没有明显的规律。

（3）在很多CSS属性上有自己的一套表现规则。比较具有代表性的就是vertical-align属性，对于替换元素和非替换元素，vertical-align属性值的解释是不一样的。比方说vertical-align的默认值的baseline，很简单的属性值，基线之意，

被定义为字符x的下边缘，而替换元素的基线却被硬生生定义成了元素的下边缘。

（4）所有的替换元素都是内联水平元素，也就是替换元素和替换元素、替换元素和文字都是可以在一行显示的。但是，替换元素默认的display值却是不一样的，有的是inline，有的是inline-block。
