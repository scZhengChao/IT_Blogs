# 纯 CSS 检测滚动的速度和方向

## 目录

- [一、CSS 检测原理](#一CSS-检测原理)
- [二、CSS 样式查询](#二CSS-样式查询)
- [三、CSS 变量计算](#三CSS-变量计算)
- [四、更多有趣的案例](#四更多有趣的案例)
- [五、最后总结一下](#五最后总结一下)

`CSS`可以做的事情越来越越多了。

我们经常会碰到这样的场景，很多网页会在右下角放一个固定入口，有可能是返回顶部，有可能广告，为了避免干扰，在页面滚动时，会把这些入口临时收起来，停止滚动后再出现，就像这样

![](https://mmbiz.qpic.cn/mmbiz_gif/xvBbEKrVNtLicibH9omzZKicx8IfknMSbn266NibkjbjvkTsjamdIjxFJuKVSjL0kU4rMuHV4xEohYkf9FMibn1j5DA/640?wx_fmt=gif\&from=appmsg\&tp=webp\&wxfrom=5\&wx_lazy=1)

通常我们实现这样的效果会借助`JS`的定时器，并且监听页面滚动，其实也不复杂，大概是这样实现

```javascript 
let timer;
window.addEventListener('scroll', function(){
  // 是否在滚动
  isScroll = true
  timer && clearTimeout(timer)
  timer = setTimeout(() => {
    isScroll = false
  }, 150)
})
```


现如今，`CSS`也能实现这样的功能了，也就是可以检测页面是否在滚动，进一步，还能检测滚动的速度和方向，一起来看看吧\~

## 一、CSS 检测原理

说起原理，其实和`JS`是差不多的，都是有个类似于定时、延时的机制。那具体如何做呢？下面一步一步来介绍。

既然是滚动，所以离不开`CSS`滚动驱动动画，这个之前有详细介绍，就不多描述了

> [***CSS 滚动驱动动画终于正式支持了\~***](http://mp.weixin.qq.com/s?__biz=MzIyMDc1NTYxNg==\&mid=2247487775\&idx=1\&sn=54d09243e36c7d5470982d4237bf8303\&chksm=97c672d0a0b1fbc6676ce29a16e13f186689e253d0d7c1454fb95c8d9530b7d443468b94ad4b\&scene=21#wechat_redirect "CSS 滚动驱动动画终于正式支持了~")

比如，我们有这样一个可以滚动的页面

```javascript 

<body>
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
  ...
</body>
```


简单修饰一下，效果是这样的

![](https://mmbiz.qpic.cn/mmbiz_png/xvBbEKrVNtLicibH9omzZKicx8IfknMSbn20U9nvjCBdMicLzmpsly7eLbrCTTo15h8xFwBlmTwIslI5o23LXh1PicQ/640?wx_fmt=png\&from=appmsg\&tp=webp\&wxfrom=5\&wx_lazy=1\&wx_co=1)

然后我们需要用 `CSS`检测滚动的进度，该如何做呢？没错，就是用 `CSS`变量。

假设有一个这样的动画，`--scroll-position`从`0`变到`100`，如下

```javascript 
@keyframes adjust-pos {
  form {
     --scroll-position: 0;
  }
  to {
    --scroll-position: 100;
  }
}

```


为了方便演示，我们可以把这个动画的变化过程显示在页面上

```javascript 
<div class="debug" hidden>
  <div data-id="--scroll-position"></div>
</div>

```


这里利用`CSS`计数器，直接用伪元素显示`CSS`变量值

> 关于这个技巧，之前也在多篇文章中有应用到，非常实用
>
> [你可能不需要 JS！CSS实现一个计时器](http://mp.weixin.qq.com/s?__biz=MzIyMDc1NTYxNg==\&mid=2247487278\&idx=1\&sn=fdbb7a81b8417f79a12897848fc0d512\&chksm=97c66ce1a0b1e5f75ecaf6d6be1771bd43c623b20bd8a21bd0e71cb09dddb7ee2f1e8b76687b\&scene=21#wechat_redirect "你可能不需要 JS！CSS实现一个计时器")
>
> [如何让CSS计数器支持小数的动态变化？](http://mp.weixin.qq.com/s?__biz=MzIyMDc1NTYxNg==\&mid=2247485996\&idx=1\&sn=9c434457a31828fdcf5e23d66692dae7\&chksm=97c669e3a0b1e0f5716097a70181cf35c101ab597b48bcd1cd90c480f693049f863c803f8969\&scene=21#wechat_redirect "如何让CSS计数器支持小数的动态变化？")
>
> [还在使用定时器吗？CSS 也能实现电子时钟](http://mp.weixin.qq.com/s?__biz=MzIyMDc1NTYxNg==\&mid=2247484522\&idx=1\&sn=4f1d6886c5ad4bef4fdff3e30b25670a\&chksm=97c667a5a0b1eeb3c284cbde4d7ef4d7f4d3f8d3ff819e49b061d68305fdcb6bc0ba5cd27987\&scene=21#wechat_redirect "还在使用定时器吗？CSS 也能实现电子时钟")
>
> [动画合成小技巧！CSS 实现动感的倒计时效果](http://mp.weixin.qq.com/s?__biz=MzIyMDc1NTYxNg==\&mid=2247485371\&idx=1\&sn=11b113f0cbb296f9c1c883838dbcaf67\&chksm=97c66474a0b1ed6242fc7d83f3352e9d6d034cc25fdc8fce24c89b3516ffacb1446548d0fbfd\&scene=21#wechat_redirect "动画合成小技巧！CSS 实现动感的倒计时效果")
>
> [自定义计数器小技巧！CSS 实现长按点赞累积动画](http://mp.weixin.qq.com/s?__biz=MzIyMDc1NTYxNg==\&mid=2247485922\&idx=1\&sn=d22866705c22806313a197096ca3c9bb\&chksm=97c66a2da0b1e33b0e52d30f56f59446c573d157fe609350de8f9eb1a54e5b8fa61d289c1e8e\&scene=21#wechat_redirect "自定义计数器小技巧！CSS 实现长按点赞累积动画")

具体实现如下

```javascript 
:root {
  animation: adjust-pos linear 3s;
}
.debug{
  counter-reset: scroll-position calc(var(--scroll-position) * 1);
}
[data-id="--scroll-position"]::after {
  content: "--scroll-position: " counter(scroll-position);
}

```


现在效果如下

![](https://mmbiz.qpic.cn/mmbiz_gif/xvBbEKrVNtLicibH9omzZKicx8IfknMSbn2j3zV7E7h2ibayhHcCBPWUX5CXIb8DoTjhg79HzuOopw3v6ibK9hH622Q/640?wx_fmt=gif\&from=appmsg\&tp=webp\&wxfrom=5\&wx_lazy=1)

现在数字直接从`0`变到了`100`，没有中间的过程。

这是因为`--scroll-position`是一个自定义变量，无法直接过渡。为了使这个变量也能像普通的过渡属性自动过渡，需要用到`CSS @property`，也就是需要注册这个变量，让浏览器认为这是一个合法的 `CSS` 变量

```javascript 
@property --scroll-position {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}

```


这段代码表示`--scroll-position`是一个`number`类型的数据，是一个合法的，可以过渡的类型，自然也就有动画了，效果如下

![](https://mmbiz.qpic.cn/mmbiz_gif/xvBbEKrVNtLicibH9omzZKicx8IfknMSbn2skVmyfE4dcJWUy8WibiaUpk1mc7SR0JgeCzxib2icsAbhIWpFDm4Nv4u4w/640?wx_fmt=gif\&from=appmsg\&tp=webp\&wxfrom=5\&wx_lazy=1)

然后我们加上滚动驱动动画，让这个动画跟随页面滚动

```javascript 
:root {
  animation: adjust-pos 3s linear both;
  animation-timeline: scroll();
}

```


效果如下，这样就能检测到滚动的具体位置了

![](https://mmbiz.qpic.cn/mmbiz_gif/xvBbEKrVNtLicibH9omzZKicx8IfknMSbn2iaEicFyMiagESD0UdNNOjSDu2PicaFfQcQn0n5rvfvYAxebjmUuYqP6daQ/640?wx_fmt=gif\&from=appmsg\&tp=webp\&wxfrom=5\&wx_lazy=1)

当然，仅仅这样还是不够的，我们只知道了滚动的进度，并不知道滚动的状态。

为了知道滚动的速度，我们还需要另一个变量，假设是`--scroll-position-delayed`

```javascript 
@property --scroll-position-delayed {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}
@keyframes adjust-pos {
  form {
     --scroll-position: 0;
    --scroll-position-delayed: 0;
  }
  to {
    --scroll-position: 100;
    --scroll-position-delayed: 100;
  }
}

```


这样就有了两个变量在同时变化，效果如下

![](https://mmbiz.qpic.cn/mmbiz_gif/xvBbEKrVNtLicibH9omzZKicx8IfknMSbn29DsvDcbhY80zrYk9uZlOgvxSqPib20PjhjZuCTEFKzSQyVu38TeuCXg/640?wx_fmt=gif\&from=appmsg\&tp=webp\&wxfrom=5\&wx_lazy=1)

同时变化没有什么意义，我们需要加一点延时，就像 `JS`的定时器一样，这里我们可以直接通过`transition`来实现

```javascript 
body{
  margin: 0;
  transition: --scroll-position-delayed 0.15s linear;
}

```


这里的`0.15s`表示`--scroll-position-delayed`在变化时需要`0.15s`的时间，而`--scroll-position`是瞬时完成的，所以就相当于`--scroll-position-delayed`始终比`--scroll-position`慢了`0.15`秒，也就相当于延时了`0.15s`，实际效果如下

![](https://mmbiz.qpic.cn/mmbiz_gif/xvBbEKrVNtLicibH9omzZKicx8IfknMSbn2mjxYkKSF9bChwWVByTjQq4pdqGCdr2Sn1L750iadDibE3ACu92Ml63tg/640?wx_fmt=gif\&from=appmsg\&tp=webp\&wxfrom=5\&wx_lazy=1)

是不是可以很清楚的看到下面的数值要比上面的慢一点？

**有了这个时间差，我们就可以判断当前的滚动状态了。**

比如我们可以用一个变量`--scroll-velocity`来表示两者的差值

```javascript 

body{
  --scroll-velocity: calc(var(--scroll-position) - var(--scroll-position-delayed));
}

```


效果如下

![](https://mmbiz.qpic.cn/mmbiz_gif/xvBbEKrVNtLicibH9omzZKicx8IfknMSbn2UbBYYJ1hybU7bqxHxZ0U6Y7hYefOicQ8pgQh2OIpuhialJqG4pibdYwSg/640?wx_fmt=gif\&from=appmsg\&tp=webp\&wxfrom=5\&wx_lazy=1)

通过这个差值，我们是不是就能发现一些规律？

1. 当`--scroll-velocity`为`0`时，表示滚动停止，否则表示正在滚动中
2. 当`--scroll-velocity`大于`0`时，表示滚动方向为下
3. 当`--scroll-velocity`小于`0`时，表示滚动方向为上
4. 还可以从`--scroll-velocity`的绝对值上考虑，绝对值越大，表示滚动速度越快，反之则越慢

这就是`CSS`检测的原理了，是不是还算简单呢？不过这还没完，还需要具体实现，比如怎么根据这个变量来匹配对应的样式

## 二、CSS 样式查询

回到文章开头，我们如何检测是否正在滚动呢，并且在滚动的时候隐藏右下角悬浮按钮呢？下面就来实现这样一个功能。

既然当`--scroll-velocity`为`0`时，就表示滚动停止，那我们是不是可以直接用样式查询来匹配呢？

> @container - CSS: Cascading Style Sheets | MDN ([mozilla.org](http://mozilla.org "mozilla.org"))\[1]

CSS 样式查询是容器查询的一部分，从名称也可以看出，它可以查询元素的样式，进而设置额外的样式。比如默认是隐藏的

```javascript 

.back{
  transform: translateX(100%);
  transition: .2s;
}
```


当匹配到`--scroll-velocity:0`时，显示这个悬浮按钮，就可以这样来实现

```javascript 
@container style(--scroll-velocity: 0) {
  .back{
    transform: translateX(0);
  }
}

```


效果如下

![](https://mmbiz.qpic.cn/mmbiz_gif/xvBbEKrVNtLicibH9omzZKicx8IfknMSbn2bOy1DniagfKWiasZqgkIs2HaFaAV1OyUxtLylcBR5ib2rsMsvPHJhrExw/640?wx_fmt=gif\&from=appmsg\&tp=webp\&wxfrom=5\&wx_lazy=1)

好像并没有起效果？其实和前面的动画原理差不多，这是一个`CSS`自定义变量，无法直接检测到变化的值。这里有一个解决方案，为了保证能够样式查询到，需要用`@``property`注册一下

```javascript 

@property --scroll-velocity {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}

```


这样就能完美检测了

![](https://mmbiz.qpic.cn/mmbiz_gif/xvBbEKrVNtLicibH9omzZKicx8IfknMSbn2xkuzNbv74bOiaLkH62FFHgJexXesUlRL5VwMtZuM5LvQT981E1WKic5g/640?wx_fmt=gif\&from=appmsg\&tp=webp\&wxfrom=5\&wx_lazy=1)

你也可以访问线上链接来查看实际效果

- CSS scroll-speed ([juejin.cn](http://juejin.cn "juejin.cn"))\[2]

是不是非常简单？

## 三、CSS 变量计算

除了使用样式查询外，我们还可以用`CSS`变量的计算方式来实现。

什么意思呢？比如我们想知道是否在滚动，其实就是两个状态，那能不能用`0`和`1`来表示是否在滚动呢？那就需要做一点点变换了。

现在`--scroll-velocity`表示差值，范围可能是`-50~50`，那如何转换成`1~0`呢，很简单，直接除以自身就行了, 比如`-50/-50`和`50/50`结果都是`1`，有人会奇怪`0/0`会不会无限大，没关系，这里`CSS`计算的结果还是`0`，实现如下

```javascript 
body{
  --scroll-velocity: calc(var(--scroll-position) - var(--scroll-position-delayed));
  --scroll-dynamic: calc(var(--scroll-velocity) / var(--scroll-velocity));
}

```


这样的话，我们就无需样式查询来改变右下角悬浮按钮的状态了，直接用`--scroll-dynamic`来控制`transform`

```javascript 

.back{
  transform: translateX(calc(var(--scroll-dynamic) * 100%));
}

```


看看效果

![](https://mmbiz.qpic.cn/mmbiz_gif/xvBbEKrVNtLicibH9omzZKicx8IfknMSbn2Thjb8M5sKQ9qmE7bx2QxkwQgLM93XUynickFw5YlBbFQYunC3ibAKkibw/640?wx_fmt=gif\&from=appmsg\&tp=webp\&wxfrom=5\&wx_lazy=1)

不一样的实现也能得到相同的效果，你也可以访问线上链接来查看实际效果

- CSS scroll-dynamic - ([juejin.cn](http://juejin.cn "juejin.cn"))\[3]

除了可以得到是否在滚动，还能计算得到滚动方向，比如`1`表示向下，`-1`表示向上，我们可以这样来计算

```javascript 
body{
  --scroll-velocity: calc(var(--scroll-position) - var(--scroll-position-delayed));
  --scroll-speed: max(var(--scroll-velocity), -1 * var(--scroll-velocity));
  --scroll-direction: calc(var(--scroll-velocity) / var(--scroll-speed));
}

```


看似有点复杂，其实也不难理解。比如当前差值是`-30`，那么，我们可以通过乘以`-1`，然后取两者较大值，这样就能得到绝对值了。

![](https://mmbiz.qpic.cn/mmbiz_png/xvBbEKrVNtLicibH9omzZKicx8IfknMSbn2RywPib9iaEFnj7diclf3iaOXGwECWickoJbuW7pTrvFLicYuLnyOvh8LXPAw/640?wx_fmt=png\&from=appmsg\&tp=webp\&wxfrom=5\&wx_lazy=1\&wx_co=1)

> 上面其实是个“偏方”，关于绝对值，其实已经有`CSS abs()`了，只是现在还没有支持，相信以后就能用上了

然后用原值除以这个绝对值，就能得到`1`或者`-1`了。

利用这个特性，我们可以在不同的方向改变箭头的指向

```javascript 
.back{
  transform: scaleY(var(--scroll-direction));
}

```


效果如下

![](https://mmbiz.qpic.cn/mmbiz_gif/xvBbEKrVNtLicibH9omzZKicx8IfknMSbn2WELj5SES2qnMHAic22OMeBVicP7SxoIjo0hflZpDh3VEqC6Q03gCvClA/640?wx_fmt=gif\&from=appmsg\&tp=webp\&wxfrom=5\&wx_lazy=1)

你也可以访问线上链接来查看实际效果

- CSS scroll-dynamic ([juejin.cn](http://juejin.cn "juejin.cn"))\[4]

## 四、更多有趣的案例

除了上面几个应用，我还找了几个有趣的案例。

比如下面这种虫洞效果，在水平或者垂直方向滚动时，会有明显的透视效果

> [https://codepen.io/bramus/pen/wvRqVBm](https://codepen.io/bramus/pen/wvRqVBm "https://codepen.io/bramus/pen/wvRqVBm")

![](https://mmbiz.qpic.cn/mmbiz_gif/xvBbEKrVNtLicibH9omzZKicx8IfknMSbn2BO065SvGnClMW3tjY5vyzxLvjJ5TnyTrmZrpj6YDtHPjL1CQzLRzibA/640?wx_fmt=gif\&from=appmsg\&tp=webp\&wxfrom=5\&wx_lazy=1)

再比如这种上下滚动，可以看到不同方向上内容的倾斜角度不一样，而且滚动越快，倾斜越大

> [https://codepen.io/bramus/pen/OJrxBaL](https://codepen.io/bramus/pen/OJrxBaL "https://codepen.io/bramus/pen/OJrxBaL")

![](https://mmbiz.qpic.cn/mmbiz_gif/xvBbEKrVNtLicibH9omzZKicx8IfknMSbn2sDbkWE9q0rdJNARrR44d23j7icjribLn1UqdMSldGtialKJ4icLCn6ZzlA/640?wx_fmt=gif\&from=appmsg\&tp=webp\&wxfrom=5\&wx_lazy=1)

还有一个比较简单实用的运动模糊滚动，也就是在滚动时，页面会有模糊的效果

> [https://codepen.io/bramus/pen/XWoREjv](https://codepen.io/bramus/pen/XWoREjv "https://codepen.io/bramus/pen/XWoREjv")

![](https://mmbiz.qpic.cn/mmbiz_gif/xvBbEKrVNtLicibH9omzZKicx8IfknMSbn2mWn5qCS0xmdGRyDESa0JibW5ONO6gSNlIg7d3vhIEzbPD0f7J1LbGCA/640?wx_fmt=gif\&from=appmsg\&tp=webp\&wxfrom=5\&wx_lazy=1)

## 五、最后总结一下

说了这么多，核心原理其实就这么几行，如下

```javascript 
@property --scroll-position {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}
@property --scroll-position-delayed {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}
@keyframes adjust-pos {
  to {
    --scroll-position: 100;
    --scroll-position-delayed: 100;
  }
}
:root {
  animation: adjust-pos 3s linear both;
  animation-timeline: scroll();
}
body{
  transition: --scroll-position-delayed 0.15s linear;
  --scroll-velocity: calc(var(--scroll-position) - var(--scroll-position-delayed));
  --scroll-speed: max(var(--scroll-velocity), -1 * var(--scroll-velocity));
  --scroll-direction: calc(var(--scroll-velocity) / var(--scroll-speed));
  --scroll-dynamic: calc(var(--scroll-velocity) / var(--scroll-velocity));
}

```


其实原理还是比较好理解的，下面总结一下

1. 首先用`CSS`自定义变量`--scroll-position`实现一个从`0`到`100`的动画，注意需要用`@property`注册
2. 然后用`CSS`滚动驱动动画将其关联，实现在滚动的时候变量自动变化
3. 接着再定义一个相同动画的变量`--scroll-position-delayed`，并设置过渡时间，这样就会比`--scroll-position`变化的慢一点
4. 将这两个变量相减可以得到差值`--scroll-velocity`
5. 通过这个差值`--scroll-velocity`就能获得各种状态了
6. 当`--scroll-velocity`为`0`时，表示滚动停止，否则表示正在滚动中
7. 当`--scroll-velocity`大于`0`时，表示滚动方向为下
8. 当`--scroll-velocity`小于`0`时，表示滚动方向为上
9. 还可以从`--scroll-velocity`的绝对值上考虑，绝对值越大，表示滚动速度越快，反之则越慢
10. 可以通过样式查询来匹配各种条件，不过需要用`@property`注册
11. 通过 `CSS calc` 和 `max`计算可以得到更多状态，比如滚动方向
12. 然后就是实际的运用了
