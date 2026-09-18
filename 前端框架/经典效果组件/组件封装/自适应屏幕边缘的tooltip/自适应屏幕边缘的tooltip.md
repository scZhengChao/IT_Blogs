# 自适应屏幕边缘的tooltip

## 目录

- [一、理想中的自适应对齐](#一理想中的自适应对齐)
- [1.居左](#1居左)
- [2. 居右](#2-居右)
- [二、左自适应对齐的思路](#二左自适应对齐的思路)
- [三、借助JS计算所需宽度](#三借助JS计算所需宽度)
- [四、完全自适应对齐](#四完全自适应对齐)
- [五、推荐一个开源库](#五推荐一个开源库)
  - [Reference](#Reference)

`tooltip`是一个非常常见的交互，一般用于补充文案说明。比如下面这种（蓝色边框表示屏幕边缘）

![](https://mmbiz.qpic.cn/mmbiz_png/xvBbEKrVNtJu9gic5z0POccAlwaGj6fdOJlpKMk0HlcLOLZxXZN7ia6jqviaBQH9EwR84pM6hHER69qoJEYibP2EnQ/640?wx_fmt=png\&from=appmsg\&watermark=1\&tp=webp\&wxfrom=5\&wx_lazy=1)

通常`tooltip`都会有一个固定的方向，比如`top`表示垂直居中向上。

但是，如果提示文案比较多，提示区域右比较靠近屏幕边缘，就可能出现这种情况

![](https://mmbiz.qpic.cn/mmbiz_png/xvBbEKrVNtJu9gic5z0POccAlwaGj6fdOZhzqA3EX1phhZzvOp1ichJPdUxIBdNC3HQFxU1EcHka1psaEx7M5iacg/640?wx_fmt=png\&from=appmsg\&watermark=1\&tp=webp\&wxfrom=5\&wx_lazy=1)

直接超出屏幕！这很显然是不能接受的。

你可能会想到改变一下对齐方向，比如`top-right`，但是这里的文案可能是不固定的，也就是会出现这样

![](https://mmbiz.qpic.cn/mmbiz_png/xvBbEKrVNtJu9gic5z0POccAlwaGj6fdOd1OT8iaplbdagXTIj77KlY2yw8c4IuuiaaFko1IjkAickW3guv7SDX42g/640?wx_fmt=png\&from=appmsg\&watermark=1\&tp=webp\&wxfrom=5\&wx_lazy=1)

嗯...感觉无论怎么对齐都会有局限。那么如何解决呢？一起看看吧

## 一、理想中的自适应对齐

我们先想想，最完美的对齐是什么样的。

其实没那么复杂，就分两种情况，一个居左，一个居右

## 1.居左

正常情况下，就是垂直居中朝上

![](https://mmbiz.qpic.cn/mmbiz_png/xvBbEKrVNtJu9gic5z0POccAlwaGj6fdOXKic9peuGqlwB7rfl25ESEDoTWSiclYlzczas4oro5VCg3OxfnLNoDXg/640?wx_fmt=png\&from=appmsg\&watermark=1\&tp=webp\&wxfrom=5\&wx_lazy=1)

如果提示文本比较多，那就靠左贴近文本容器对齐

![](https://mmbiz.qpic.cn/mmbiz_png/xvBbEKrVNtJu9gic5z0POccAlwaGj6fdOu9YM3VeogXJoAA03UUvz1r36UvOaphUvv6xI2IMQwJNStBEczerhzw/640?wx_fmt=png\&from=appmsg\&watermark=1\&tp=webp\&wxfrom=5\&wx_lazy=1)

如果提示文本继续增加，那就整行换行，并且不超过文本容器

![](https://mmbiz.qpic.cn/mmbiz_png/xvBbEKrVNtJu9gic5z0POccAlwaGj6fdO4Crj6VHjOXUE6UibQqUPSZFFz38jWQFx8bO8wVibZ0Nx5PN60oJticL2Q/640?wx_fmt=png\&from=appmsg\&watermark=1\&tp=webp\&wxfrom=5\&wx_lazy=1)

## 2. 居右

正常情况下，也是垂直居中朝上

![](https://mmbiz.qpic.cn/mmbiz_png/xvBbEKrVNtJu9gic5z0POccAlwaGj6fdOLSMm4jo7OL2JL12apbD6DIicdicbDt4Z6emTnJYibpPOHHRynkK8mysXA/640?wx_fmt=png\&from=appmsg\&watermark=1\&tp=webp\&wxfrom=5\&wx_lazy=1)

如果提示文本比较多，那就靠右贴近文本容器对齐

![](https://mmbiz.qpic.cn/mmbiz_png/xvBbEKrVNtJu9gic5z0POccAlwaGj6fdOSFOywwmZCkA0l0988sTBia95xiaBia0BSX0vH1zibBiahhx86fZ4MC0pcHQ/640?wx_fmt=png\&from=appmsg\&watermark=1\&tp=webp\&wxfrom=5\&wx_lazy=1)

如果提示文本继续增加，也是整行换行，并且不超过文本容器

![](https://mmbiz.qpic.cn/mmbiz_png/xvBbEKrVNtJu9gic5z0POccAlwaGj6fdONklMgCggDdUQY4bRTWsI5y5f3DibYrslk0uvJtUysdaFIze0REMsC1Q/640?wx_fmt=png\&from=appmsg\&watermark=1\&tp=webp\&wxfrom=5\&wx_lazy=1)

那么如何实现这样的对齐方式呢？

## 二、左自适应对齐的思路

我们先看第一种情况，看似好像有3种对齐方式，而且还要监测是否到了边界，好像挺复杂。其实换个角度，其实是这样一种规则

1. 当内容较少时，居中对齐
2. 当内容较多时，居左对齐
3. 当内容多到换行时，有一个最大宽度

既然涉及到了对齐，那就有对齐的容器和被对齐的对象。

我们可以想象一个虚拟容器，以对齐中心（下图问号图标）向两边扩展，一直到边界处，如下所示（淡蓝色区域）

![](image_b09OoVO8i-.png)

假设`HTML`如下

```html 
<span class="tooltip" title="提示"></span>

```


当气泡文本比较少时，可以通过文本对齐实现居中，气泡可以直接通过伪元素实现

```css 
.tooltip{
  width: 50px; /*虚拟容器宽度，暂时先固定 */
  text-align:center;
}
.tooltip::before{
  content: attr(title);
  display: inline-block;
  color: #fff;
  background-color: #000;
  padding: .5em 1em;
  border-radius: 8px;
  box-sizing: border-box;
}
/*居中箭头*/
.tooltip::after{
  content: '';
  position: absolute;
  width: 1em;
  height: .6em;
  background: #000;
  clip-path: polygon(00, 100% 0, 50% 100%);
  top: 0;
  left:0;
  right:0;
  margin: 0 auto;
  transform: translateY(-150%)
}

```


使用文本居中，也就是`text-align: center`有个好处，当文本不超过容器时，居中展示，就如同上图展示一样。

当文本比较多时，默认会换行，效果如下

![](https://mmbiz.qpic.cn/mmbiz_png/xvBbEKrVNtJu9gic5z0POccAlwaGj6fdOpBXxGaMGWCEdTP4QeO9OSSvibFA9B2OzibwKeNg6xBFY3F2qiaKrXzPJA/640?wx_fmt=png\&from=appmsg\&watermark=1\&tp=webp\&wxfrom=5\&wx_lazy=1)

这样应该很好理解吧。

我们需要气泡里的文本在多行时居左，可以直接给气泡设置居左对齐

```css 
.tooltip::before{
  /*...*/
  text-align: left;
}
```


效果如下

![](https://mmbiz.qpic.cn/mmbiz_png/xvBbEKrVNtJu9gic5z0POccAlwaGj6fdOD6hrc25Mgm6B44rmicFX3ZqmnyicoNcDar8s9106yVxib5Nsk8wTHdmog/640?wx_fmt=png\&from=appmsg\&watermark=1\&tp=webp\&wxfrom=5\&wx_lazy=1)

这样就实现了单行居中，多行居左的效果了。

现在还有一个问题，如何在气泡文本较多时，不被对齐容器束缚呢？

首先可以想到的是禁止换行，也就是

```css 
.tooltip::before{
  /*...*/
  white-space: nowrap
}

```


这样在文本不超过一行时确实可以

![](https://mmbiz.qpic.cn/mmbiz_png/xvBbEKrVNtJu9gic5z0POccAlwaGj6fdOYPfVr0gDjrNGuXpa45gz9Xc5Ma7QEoDbhumGiapUiaicVcYqcaY7f0Aqg/640?wx_fmt=png\&from=appmsg\&watermark=1\&tp=webp\&wxfrom=5\&wx_lazy=1)

看，已经突破了容器束缚。但是文本继续增加时，也会出现无法换行的问题

![](https://mmbiz.qpic.cn/mmbiz_png/xvBbEKrVNtJu9gic5z0POccAlwaGj6fdO5ZDfVh4niaE9S2iafUAqyvSEibFWAWhkDBQ8wibhnrCYsp80Eh5cPWcLCw/640?wx_fmt=png\&from=appmsg\&watermark=1\&tp=webp\&wxfrom=5\&wx_lazy=1)

我们可以想一想，还有什么方式可以控制换行呢？

这里，我们需要设置宽度为「**最大内容宽度**」，相当于文本有多少，文本容器就有多宽

```css 
.tooltip::before{
  /*...*/
  width: max-content
}
```


看似好像和不换行一样

![](https://mmbiz.qpic.cn/mmbiz_png/xvBbEKrVNtJu9gic5z0POccAlwaGj6fdO5ZDfVh4niaE9S2iafUAqyvSEibFWAWhkDBQ8wibhnrCYsp80Eh5cPWcLCw/640?wx_fmt=png\&from=appmsg\&watermark=1\&tp=webp\&wxfrom=5\&wx_lazy=1)

实则不然，我们并没用禁止换行。只要给一个最大宽度，立马就换行了

```css 

.tooltip::before{
  /*...*/
  width: max-content；
  max-width: 300px;
}
```


效果如下

![](https://mmbiz.qpic.cn/mmbiz_png/xvBbEKrVNtJu9gic5z0POccAlwaGj6fdOpI7xvn2iaMHLwjj2ibocnW3VFAia7IIA7qh1cA0o0SA0NJ5BRfx2ia0N7w/640?wx_fmt=png\&from=appmsg\&watermark=1\&tp=webp\&wxfrom=5\&wx_lazy=1)

是不是几乎实现了我们想要的效果了？

不过，这里涉及了两个需要动态计算的宽度，一**个是虚拟容器宽度，还有一个是外层最大宽度，**

![](https://mmbiz.qpic.cn/mmbiz_png/xvBbEKrVNtJu9gic5z0POccAlwaGj6fdOgxlM1ibWpHmDqKFQDicGQoVLEoHs0PM7DGhswmtENWloMVntyDyfqmnA/640?wx_fmt=png\&from=appmsg\&watermark=1\&tp=webp\&wxfrom=5\&wx_lazy=1)

下面看如何实现

## 三、借助JS计算所需宽度

现如今，外层的最大宽度倒是可以通过容器查询获得，但内部的虚拟容器宽度还无法直接获取，只能借助`JS`了。

不过我们这里可以先只计算左侧偏移，也就是一半的宽度

![](https://mmbiz.qpic.cn/mmbiz_png/xvBbEKrVNtJu9gic5z0POccAlwaGj6fdOw0YNuNpF4szFGG9oPeqyUFB6MEUzVuXlVtBR6nqND8jcrSyXibHiauzA/640?wx_fmt=png\&from=appmsg\&watermark=1\&tp=webp\&wxfrom=5\&wx_lazy=1)

具体实现如下

```javascript 
//问号中心到左侧距离
const x = this.offsetLeft - 8
// 问号的宽度
const w = this.clientWidth
// 外层整行文本容器宽度
const W = this.offsetParent.clientWidth - 32
// 左侧偏移
this.style.setProperty('--x', x + 'px')
// 外层文本容器宽度（气泡最大宽度）
this.style.setProperty('--w', W + 'px')
```


然后给前面待定的宽度绑定这些变量就行了

```css 
.tooltip{
  /*...*/
  width: calc(var(--x) * 2);
}
.tooltip::before{
  /*...*/
  max-width: var(--w);
}
```


这样左侧就完全实现自适应了，无需实时计算，仅需初始化一次就好了

![](https://mmbiz.qpic.cn/mmbiz_gif/xvBbEKrVNtJu9gic5z0POccAlwaGj6fdOhPDP9vM5gj1r5sly6RDK3q9ic424nvFZ8jAcpic2dXwgjQ6l5z708OLA/640?wx_fmt=gif\&from=appmsg\&tp=webp\&wxfrom=5\&wx_lazy=1)

## 四、完全自适应对齐

前面是左侧，那右侧如何判断呢？我们可以比较左侧距离的占比，如果超过一半，就表示现在是居右了

这里用一个属性表示

```javascript 
this.tooltip.dataset.left = x/W < 0.5 //是否居左
```


然后就右侧虚拟容器的宽度了，和左侧还有有点不一样

![](https://mmbiz.qpic.cn/mmbiz_png/xvBbEKrVNtJu9gic5z0POccAlwaGj6fdOKibdvpeszt4DtVfNiaibic4FGNaFhI4E8DJlIwwaLc2m72BvavtC4IUj2A/640?wx_fmt=png\&from=appmsg\&watermark=1\&tp=webp\&wxfrom=5\&wx_lazy=1)

前面我们已经算出了左侧距离，由于超过了一半，所以需要先减然后再乘以二

```css 
.tooltip[data-left="false"]::before{
  /*...*/
  width: calc( (var(--w) - var(--x)) * 2);
  max-width: var(--w);
}
```


其实这里还是有个小问题的，当气泡文字比较长时，仍然是朝右突破了边界，如下所示

![](https://mmbiz.qpic.cn/mmbiz_png/xvBbEKrVNtJu9gic5z0POccAlwaGj6fdOpNFd1JWn56BJVdhyKyIBCj0lgJFcVfluCCJqMqUgWibbT6Hib9O2o3LQ/640?wx_fmt=png\&from=appmsg\&watermark=1\&tp=webp\&wxfrom=5\&wx_lazy=1)

这是因为默认的语言流向造成的（从左往右），解决这个问题也非常简单，仅需改变语言方向就可以了，要用到`direction:rtl`，如下

```css 
.tooltip[data-left="false"]::before{
  /*...*/
  width: calc( (var(--w) - var(--x)) * 2);
  max-width: var(--w);
  direction: rtl;
}
```


这样就完美了

![](https://mmbiz.qpic.cn/mmbiz_png/xvBbEKrVNtJu9gic5z0POccAlwaGj6fdOmKibdiazS7bibus9nf3kLhWc796pUkQTZIeW5ia9QOiclF9Rp7V1AehG4jA/640?wx_fmt=png\&from=appmsg\&watermark=1\&tp=webp\&wxfrom=5\&wx_lazy=1)

现在来看一下所有边界情况的演示

![](https://mmbiz.qpic.cn/mmbiz_gif/xvBbEKrVNtJu9gic5z0POccAlwaGj6fdOn7QZW2Trr89ttgs4glWFZUicyeTF99EXHkZE86trJ7d59sXF4CCbokg/640?wx_fmt=gif\&from=appmsg\&tp=webp\&wxfrom=5\&wx_lazy=1)

你也可以访问在线demo真实体验：[https://codepen.io/xboxyan/pen/QwLJwbN\[1\]](https://codepen.io/xboxyan/pen/QwLJwbN\[1] "https://codepen.io/xboxyan/pen/QwLJwbN\[1]")

如果你是 vue3 项目，可以直接用这段封装好的组件（其实没几行代码，大部分自适应都是`CSS`完成的）

```vue 
<!-- 极度自适应的tooltips -->
<script setup lang="ts">
  const props = defineProps({
    text: String,
    gap: {
        type: Number,
        default: 12,
      },
  })
  
  const show = ref(false)
  const pos = reactive({
    x: 0,
    w: 0,
    top: 0,
    gap: 0,
    isLeft: true,
  })
  const click = (ev: MouseEvent) => {
    // console.log()
    // if (ev.target) {
    //   ev.stopPropagation()
    // }
    const target = ev.target as Element | null
    console.log('xxxxxxxxxxx', target)
    if (target) {
      const { x, y, width } = target.getBoundingClientRect()
      pos.top = y + window.scrollY
      pos.gap = props.gap
      pos.x = x + width / 2 - props.gap
      pos.w = window.innerWidth - props.gap * 2
      show.value = true
    }
  }

  const wrap = ref<HTMLElement>()
  
  document.body.addEventListener('touchstart', (ev) => {
    // 没有点击当前触发对象就隐藏tooltips
    if (!(wrap.value && ev.target && wrap.value.contains(ev.target as Node))) {
        show.value = false
    }
  })
</script>
<template>
<span class="wrap" ref="wrap" @click="click">
    <slot></slot>
</span>
<Teleport to="body">
    <div
      class="tooltip"
      v-show="show"
      :data-title="text"
      :data-left="pos.x / pos.w < 0.5"
      :style="{
        '--x': pos.x + 'px',
        '--top': pos.top + 'px',
        '--gap': pos.gap + 'px',
        '--w': pos.w + 'px',
      }"
    ></div>
    </Teleport>
</template>
<style>
.wrap {
  display: contents;
}
.tooltip {
  position: absolute;
  top: var(--top);
  text-align: center;
  pointer-events: none;
}
.tooltip[data-left='true'] {
  width: calc(var(--x) * 2);
  left: var(--gap);
}
.tooltip[data-left='false'] {
  width: calc((var(--w) - var(--x)) * 2);
  right: var(--gap);
  direction: rtl;
}

.tooltip::before {
  content: attr(data-title);
  display: inline-block;
  color: #fff;
  background-color: #191919;
  padding: 0.5em0.8em;
  border-radius: 8px;
  transform: translateY(calc(-100% - 0.5em));
  width: max-content;
  max-width: var(--w);
  box-sizing: border-box;
  text-align: left;
}
.tooltip::after {
  content: '';
  position: absolute;
  width: 1.2em;
  height: 0.6em;
  background: #000;
  clip-path: polygon(00, 100%0, 50%100%);
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  transform: translateY(calc(-100% - 0.2em));
}
</style>

```


## 五、推荐一个开源库

其实市面上有一个库可以完成类似的交互，叫做 float-ui\[2]

![](https://mmbiz.qpic.cn/mmbiz_png/xvBbEKrVNtJu9gic5z0POccAlwaGj6fdOyKMSxAA3svzILZEPKdyibwTrZLcPjBuykRQjmSuvaKrGiaQTRSMcbXTA/640?wx_fmt=png\&from=appmsg\&watermark=1\&tp=webp\&wxfrom=5\&wx_lazy=1)

这个是专门做`popover`这类交互的，其中有一个`shift`属性，可以做这种跟随效果

![](https://mmbiz.qpic.cn/mmbiz_png/xvBbEKrVNtJu9gic5z0POccAlwaGj6fdOO636kyCw3SZliakj64QwXtK44ZXIWnnHFl3XjndQia50lRahWxozDzUg/640?wx_fmt=png\&from=appmsg\&watermark=1\&tp=webp\&wxfrom=5\&wx_lazy=1)

不过对于大部分情况，引入一个单独的库还是成本偏大，建议还是纯原生实现。

这样一个极度自适应的气泡组件，你学会了吗，赶紧在项目中用起来吧\~最后，如果觉得还不错，对你有帮助的话，欢迎点赞、收藏、转发 ❤❤❤

### Reference

\[1] [https://codepen.io/xboxyan/pen/QwLJwbN: \*https://codepen.io/xboxyan/pen/QwLJwbN\*](https://codepen.io/xboxyan/pen/QwLJwbN: *https://codepen.io/xboxyan/pen/QwLJwbN* "https://codepen.io/xboxyan/pen/QwLJwbN: *https://codepen.io/xboxyan/pen/QwLJwbN*")

\[2]  float-ui: [*https://floating-ui.com/docs/getting-started*](https://floating-ui.com/docs/getting-started "https://floating-ui.com/docs/getting-started")
