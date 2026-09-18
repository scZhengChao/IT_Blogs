# ScrollTrigger

## 目录

- [start和end](#start和end)
- [toggleClass](#toggleClass)

现在我们对gsap的基本用法有了一定的了解，下面我们来看下插件的用法；插件可以帮助我们扩展动画的高级功能，让动画的表现更丰富；我们主要来了解ScrollTrigger的使用。

我们先看下ScrollTrigger的一个简单用法，

```typescript 
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

gsap.to(".green", {
  rotation: 360,
  scale: 1.5,
  backgroundColor: "red",
  scrollTrigger: {
    trigger: ".green",
    scrub: true,
  },
});
gsap.to(".purple", {
  rotation: 360,
  scale: 1.5,
  backgroundColor: "red",
  scrollTrigger: {
    trigger: ".purple",
    scrub: 1,
  },
});

```


使用前当然要对插件进行注册了，使用`gsap.registerPlugin`将ScrollTrigger注册，否则我们在下面操作时会发现没有任何效果。

在to函数中我们新增了一个`scrollTrigger属性`，trigger表示当前动画触发的元素，这个很好理解，我们使用当前元素；markers是否进行标记，scrub表示是否将动画效果链接到滚动条，随着滚动条平滑处理；如果是false（默认），随着元素出现在视窗内，直接触发动画，如果是true，则平滑动画，我们看下效果：

> 查看[demo21效果](https://link.juejin.cn/?target=https://gallery.xieyufei.com/case/gsap/demo#demo21 "demo21效果")

> scrub还可以是某个具体的数值，表示延迟滚动条多少秒动画；比如这里的1，延迟1秒执行动画。

　我们在滚动浏览器时，可以使用`pin`属性将某个元素固定在某个位置；pin可以是css选择器字符串、布尔值或者直接dom元素；如果是true，则直接固定当前的动画元素；我们这里使用pin将purple元素固定起始位置：

```javascript 
gsap.to(".green", {
  x: 400,
  duration: 2,
  scrollTrigger: {
    trigger: ".green",
    pin: ".purple",
  },
});

```


> 查看[demo22效果](https://link.juejin.cn/?target=https://gallery.xieyufei.com/case/gsap/demo#demo22 "demo22效果")

### start和end

start和end属性用来决定滚动触发元素开始的位置，可以是字符串、数值或者函数，两者的用法类似，我们以start为例；start的值默认是`"top bottom"`，它的含义是当触发物体（trigger）的顶部（top）碰到浏览器的底部（bottom）时；我们看下当开启标记marker时的触发位置。

![](image_1BkRQxkUXp.png)

我们看到`scroller-start`的线就是浏览器视窗的边界线，当浏览器向下滚动时，这条线滚动到物体的`start`线时，就触发了动画效果；同样的道理，向上滚动时，当`scroll-end`的线触碰到`end`时，动画结束。

start值看起来很怪异，不好理解，其实我们可以把它拆成两部分来看；**第一个top值表示物体的上边界，同样的我们可以设为bottom（物体下边界）、center（物体中间）或者具体数值（100px、80%）**，即控制的是物体旁边的start线。

第二个值表示浏览器视窗滚动触发的scroller-start线，bottom表示视窗的底部，我们也设为top或者center或者数值，以及百分比（例如80%，表示整个视窗的80%高度），甚至是相对位置，比如`bottom-=100px`。

### toggleClass

有些情况下，我们不想要gsap的动画，而是想用我们自己自定义的css类名来实现某些动画效果，`toggleClass属性`可以让我们在触发的元素上添加或者移除这些的类名，从它的名字也能看出来它是处理类名的；它可以是一个字符串，例如`toggleClass: "active"`，就表示要新增/移除的类名。

toggleClass也可以是对象，可以在其他的元素上来新增/移除类名，比如：

```javascript 
toggleClass: {targets: ".my-selector", className: "active"}

```


> 看[demo24效果](https://link.juejin.cn/?target=https://gallery.xieyufei.com/case/gsap/demo#demo24 "demo24效果")

我们可以将ScrollTrigger结合timeline创建动画。

```typescript 
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".wrap",
    scrub: true,
  },
});
tl.to(".green", {
  x: 200,
});
tl.to(".purple", {
  x: 400,
});

```


> 查看[demo25效果](https://link.juejin.cn/?target=https://gallery.xieyufei.com/case/gsap/demo#demo25 "demo25效果")
