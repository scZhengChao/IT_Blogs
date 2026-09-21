# GSAP

## 目录

- [install](#install)
- [简介](#简介)
- [usage](#usage)

官网：

[   https://gsap.com/](https://gsap.com/ "   https://gsap.com/")

中文文档：

[ GSAP 中文教程 中文文档 ｜官方文档 官方教程翻译 ｜好奇代码出品  好奇代码的三木整理的GSAP官方教程文档的翻译网站 | GSAP是前端领域最好的动效框架，能快速实现很多高级复杂的动效交互效果，被众多优秀的开发者和设计师所喜爱，在大量获奖的网站作品中被使用！ https://gsap.framer.wiki/stated](https://gsap.framer.wiki/stated " GSAP 中文教程 中文文档 ｜官方文档 官方教程翻译 ｜好奇代码出品  好奇代码的三木整理的GSAP官方教程文档的翻译网站 | GSAP是前端领域最好的动效框架，能快速实现很多高级复杂的动效交互效果，被众多优秀的开发者和设计师所喜爱，在大量获奖的网站作品中被使用！ https://gsap.framer.wiki/stated")

[greenSock简介.html](https://github.com/scZhengChao/IT_Blogs/releases/download/assets-v1/greenSock._pnUdzVWBjE.html "greenSock简介.html")

[greenSock + vue  对数字 的递增.html](<https://github.com/scZhengChao/IT_Blogs/releases/download/assets-v1/greenSock.+.vue._1eV1LQLi5u.html> "greenSock + vue  对数字 的递增.html")

[TweenMax.min.js](https://github.com/scZhengChao/IT_Blogs/releases/download/assets-v1/TweenMax.min_nBKGVJAXlD.js "TweenMax.min.js")

[greenSock + tween + color + vue.html](<https://github.com/scZhengChao/IT_Blogs/releases/download/assets-v1/greenSock.+.tween.+.color.+.vue_rCMCElwrSu.html> "greenSock + tween + color + vue.html")

[greenSock + vue + svg.html](<https://github.com/scZhengChao/IT_Blogs/releases/download/assets-v1/greenSock.+.vue.+.svg_Xk456L0GSW.html> "greenSock + vue + svg.html")

# install

```typescript 
npm i gsap
```


# 简介

它具有以下优点:
&#x20;   1、**速度快**。GSAP专门优化了动画性能，使之实现和CSS一样的高性能动画效果。
&#x20;   2、**轻量与模块化**。模块化与插件式的结构保持了核心引擎的轻量，TweenLite包非常小（基本上低于7kb）。GSAP提供了TweenLite, TimelineLite, TimelineMax 和 TweenMax不同功能的动画模块，你可以按需使用。
&#x20;   3、**没有依赖**。
&#x20;   4、**灵活控制**。不用受限于线性序列，可以重叠动画序列，你可以通过精确时间控制，灵活地使用最少的代码实现动画。
&#x20;   5、**任何对象都可以实现动画**。

# usage

```typescript 
TweenLite.to($box, 0.7, {left: 0});
TweenLite.to(what, duration, {which css properties});
computed: {
    animatedNumber: function() {
      return this.tweenedNumber.toFixed(0);
    }
  },
 watch: {
    number: function(newValue) {
      TweenLite.to(this.$data, 0.8, { tweenedNumber: newValue });
   }
 }

```


[特殊属性](./特殊属性/index.md "特殊属性")

[to/from/fromTo/set](./to-from-fromTo-set/index.md "to/from/fromTo/set")

[过渡效果](./过渡效果/index.md "过渡效果")

[控制动画](./控制动画/index.md "控制动画")

[时间线timeline](./时间线timeline/index.md "时间线timeline")

[动画事件  Callbacks](<./动画事件  Callbacks/index.md> "动画事件  Callbacks")

[动画属性](./动画属性/index.md "动画属性")

[插件](./插件/index.md "插件")
