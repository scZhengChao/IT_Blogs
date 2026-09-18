# 时间线timeline

## 目录

- [gsap.timeline !!非常重要](#gsaptimeline-非常重要)
- [时间线的默认设置 Timeline Defaults](#时间线的默认设置-Timeline-Defaults)
- [位置参数 Position Parameter](#位置参数-Position-Parameter)
- [常见代码写法](#常见代码写法)
  - [label](#label)
- [设置相对的正值：实现间隔/延迟](#设置相对的正值实现间隔延迟)
- [设置相对的负值：实现重叠](#设置相对的负值实现重叠)
- [单纯使用数字：任何时间点](#单纯使用数字任何时间点)
- [使用标记](#使用标记)
- [相对于最近添加的动画来确定时间点](#相对于最近添加的动画来确定时间点)
  - [时间线如何工作？](#时间线如何工作)

## gsap.timeline !!非常重要

> timeline无非就是一条时间线，你可以更好的去控制动画，`尤其是复杂动画都会用到timeline`，将他们串联起来，如果说你想让动画有个执行的先后顺序 那么就要用到timeline了(HTML CSS代码还是上面的代码没变)

我们下面实现一个想将三个box向右平移100同时将透明度调低之后，再进行360度旋转，是有一个先后顺序的

timeline参数需要填你使用动画的一些默认参数，不填也是可以的

使用：

```typescript 
// 先定义一条时间线
let tl = gsap.timeline({ duration: 1 };
// let tl = gsap.timeline({  };也是可以的
);
// 开始基于时间线做一些动画 结合上面的 gsap.to 和 gsap.from
tl.to(".box", { x: 100, opacity: 0.5 }).to(".box", { rotation: 360 });
//你也可以这么写 实现最后的效果是一样的不过写法会麻烦一点
tl.to(".box", { x: 100, opacity: 0.5 });
tl.to(".box", { rotation: 360 });

```


![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aea3943af28e4c90b98501e5d0f59bcf~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

# 时间线的默认设置 Timeline Defaults

如果你发现自己总是一遍又一遍的写同一个属性，那么你可以使用 `defaults`来进行设置。任何添加到时间线上的`defaults`的属性，都会被添加到这个时间线上的tween动画继承，像是通过`to()`,`from()`和`fromTo()`方式添加到时间线上的动画效果都是有这个继承效果的。利用这个方式可以让你的代码更简洁一些。

```javascript 
var tl = gsap.timeline({defaults: {duration: 1}});

//这样每个动画都是1秒的时长，不用重复写了
tl.to(".green", {x: 200})
  .to(".purple", {x: 200, scale: 0.2})
  .to(".orange", {x: 200, scale: 2, y: 20});

```


&#x20;我们通过`gsap.timeline()`创建一个时间线，然后通过时间线控制每一个动画顺序执行；这样即使我们修改中间某个动画的`duration`，也不会影响后续时间线。

```typescript 
const t1 = gsap.timeline();
t1.to(".green", {
  x: 600,
  duration: 2,
});
t1.to(".purple", {
  x: 600,
  duration: 1,
});
t1.to(".orange", {
  x: 600,
  duration: 1,
});

```


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f84e3568e2845919545602ade1f4851~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

> 查看[**demo15效果**](https://link.juejin.cn/?target=https://gallery.xieyufei.com/case/gsap/demo#demo15 "demo15效果")

# 位置参数 Position Parameter

但是如果我们想要在一个动画开始的同时，执行另一个动画，除了再额外创建一条时间线，我们可以在to函数后面加一些小参数来进行精确的控制。

```javascript 
const t1 = gsap.timeline();
t1.to(".red", { x: 400,duration: 1 });
// 在1秒开始插入动画（绝对值）
t1.to(".green", { x: 400, duration: 1 }, 1);
// 在上个动画的开始插入动画
t1.to(".purple", { x: 400, duration: 1 }, "<");
// 在最后一个动画结束后一秒插入动画
t1.to(".orange", { x: 400, duration: 1 }, "+=1");

```


- 绝对时间（秒）的方式，以动画的启动时间点为参考，也就是整个时间线的起始点，比如使用一个数字3

```javascript 
// 插入到时间线开始后三秒之后的位置
tl.to(".class", {x: 100}, 3);

```


- label（标记），比如下面代码例子中的'someLabel'，如果该标记不存在，那么该动画会被插入到时间线末尾

```javascript 
// 插入到"someLabel" 标记所在的位置
tl.to(".class", {x: 100}, "someLabel");

```


- '<'符号表示前一个添加到时间线上的动画的起始时间点。如果使用这个符号，**那么动画会插入到前面一个动画的起始时间点位置。**

```javascript 
// 插入到前一个添加到时间线上动画的起始时间点
tl.to(".class", {x: 100}, "<");

```


- '>'符号表示前一个添加到时间线上的动画的结束时间点。如果使用这个符号，那么动画会插**入到前面一个动画的结束时间点位置**。

```javascript 
// 插入到前一个添加到时间线上的动画的结束时间点
tl.to(".class", {x: 100}, ">");

```


复杂一些的字符串，像是'+='和'-='这样的前缀，表达的是一种相对的值。当一个数字跟在'<' 或者'>'这两个符号后面，比如'<2'，这样的表示法相当于'<+=2'，比如下面这些写法：

- '+=1'   表示当前时间线结束后再过1秒的时间点位置，相当于有个1秒的间隔
- '-=1'   表示当前时间线结束时间点前1秒的时间点位置，相当于有个1秒的时间重叠
- 'myLabel+=2'   表示在myLable这个标记后过两秒的时间点位置
- '<+=3'   表示前一个动画起始点后3秒的位置
- '<3'  和上面一个意思（'<'和'>'直接跟数字，其实就是和'<+=3'或者'>+=3'是一样的意思）
- '>-0.5' 前一个动画的结束时间点前0.5秒的时间点位置

注意，**+= -= 这种是针对整个时间线动画来说的，**而** >（结尾） 和 <（开头） 是针对前一个添加的动画来说的**

基于百分比的复杂字符串形式。如果前缀是'+='或者'-='，那么表示的**百分比是基于整个时间线已经添加的所有动画的总时长的**。如果前缀**是'<'或者'>',那么这个是基于前一个添加动画的时长的**。注意，**总时长是包含了重复或者yoyo效果的时长的。**

注意，+= -= 这种是针对整个时间线动画来说的，而 >（结尾） 和 <（开头） 是针对前一个添加的动画来说的

- '-=25%'   放到前面**已经添加的动画总时长的末尾25%的**位置
- '+=50%'  以前面\*\*所有动画总时长的50%\*\***作为时间间隔**
- '<25%'   以前一个动画启动时间点为时间点，**放到前一个动画时长的25%的位置**。它这个写法等同于'>-75%'，这个就是以前一个动画的结束点为准，往前这个前动画的75%时长的时间点位置
- '<+=25%' 以前一个动画启动时间点为时间点，**向后放到全部动画总时长的25%的时间点的位置。使用**百分比的时候，是否搭配'+='或者'-='是很重要的，当使用这两符号，用来计算百分比的时间长度都是整个时间线已经添加的动画的总时间长度
- 'myLabel+=30%'   以myLabel标记位置为起始点，向后挪以整个以添加到时间线上的动画总时长的30%的时长作为插入的时间点。

# 常见代码写法

```javascript 
tl.to(element, 1, {x: 200})
  // 添加到整个时间线结束时间点后1秒，相当于是有了1秒的间隔
  .to(element, {duration: 1, y: 200}, "+=1")
  // 添加到整个时间线结束的时间点的前0.5秒，也就是有0.5秒的时间是和时间线原本的动画重叠
  .to(element, {duration: 1, rotation: 360}, "-=0.5")
  // 从时间线动画开头时间点往后6秒的时间点
  .to(element, {duration: 1, scale: 4}, 6);

```


也可以通过标记来添加，包括标记所在时间点和相对标记所在的时间点

```javascript 
// 在时间线2秒的时间点添加一个标记
tl.add("scene1", 2)
  // 把动画提添加到 scene1 这个标记所在的时间点
  .to(element, {duration: 4, x: 200}, "scene1")
  // 把动画添加到 scene1 这个标记点往后3秒的时间点
  .to(element, {duration: 1, opacity: 0}, "scene1+=3");

```


### label

`label`值则很好理解了，在某个时间点插入一个`label`，在这个`label`**前面或者后面的时间**来执行，我们看下它的用法：

```typescript 
const t1 = gsap.timeline();
t1.to(".green", { x: 400, duration: 1 })
  .add("myLabel", 2)
  .to(".purple", { x: 400, duration: 1 }, "myLabel+=1")
  .to(".orange",{ x: 400, duration: 1 }, "myLabel-=1");

```


通过`gsap.add`函数，我们在2秒处放置了一个myLabel的标识，在后面使用myLabel+=1和myLabel-=1相对这个标识的时间进行控制。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09bd1ec53ffb4415a497229775f2bad6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

> 查看[**demo18效果**](https://link.juejin.cn/?target=https://gallery.xieyufei.com/case/gsap/demo#demo18 "demo18效果")

# 设置相对的正值：实现间隔/延迟

用一个相对的写法，使用正值（'+=X'），能和前一个动画产生一定的间隔。

```react jsx 
//每一个动画之间都有1秒的间隔
var tl = gsap.timeline();
tl.to(".green", {duration: 1, x: 750})
  // 插入到当前时间线结束后1秒的位置
  .to(".purple", {duration: 1, x: 750}, "+=1")
  // 插入到当前时间线结束后1秒的位置
  .to(".orange", {duration: 1, x: 750}, "+=1")
```


# 设置相对的负值：实现重叠

用一个相对的写法，使用负值（'-=X'），能和前一个动画产生一定的重叠。

```javascript 
// 动画有一定的重叠
var tl = gsap.timeline();
tl.to(".green", {duration: 2, x: 750})
   // 插入当前时间线结尾前一秒的位置
  .to(".purple", {duration: 2, x: 750}, "-=1")
   // 插入当前时间线结尾前一秒的位置
  .to(".orange", {duration: 2, x: 750}, "-=1");

```


# 单纯使用数字：任何时间点

直接使用一个数字，可以精确地把动画添加到时间上的某个时间点

```javascript 
// 使用数字把动画添加到时间上线某一个时间点
var tl = gsap.timeline();
tl.to(".green", {duration: 4, x: 750})
  // 把动画添加到时间线上的第1秒开始的时间点
  .to(".purple", {duration: 2, x: 750}, 1)
  // 把动画添加到时间线上的第1秒开始的时间点
  .to(".orange", {duration: 2, x: 750}, 1);
  

```


# 使用标记

通过给时间上设置标记，然后把动画添加到相应标记的时间点位置

```javascript 
// 把动画添加到标记所在的位置
var tl = gsap.timeline();
tl.to(".green", {duration: 1, x: 750})
  //把blueGreenSpin标记添加到当前时间线末尾之后的1秒的时间点
  .add("blueGreenSpin", "+=1")
  // 把动画添加到blueGreenSpin这个标记所在的时间点
  .to(".purple", {duration: 2, x: 750, rotation: 360}, "blueGreenSpin")
  // 把动画添加到blueGreenSpin这个标记所在的时间点之后0.5秒的时间点
  .to(".orange", {duration: 2, x: 750, rotation: 360}, "blueGreenSpin+=0.5");
```


# 相对于最近添加的动画来确定时间点

使用"<"来表示添加到最近添加动画起点所在的时间点位置。">"表示添加到最近添加动画的结束点的时间点位置。

```javascript 
// 通过前一个添加的动画的位置来添加
var tl = gsap.timeline();
tl.to(".green", {duration: 1, x: 750})
  // 添加到前一个动画结束点的时间点位置，也就是green的结尾
  .to(".purple", {duration: 2, x: 750}, ">")
  // 添加到前一个动画开始点的时间点位置，也就是purple的开始
  .to(".orange", {duration: 2, x: 750}, "<");

```


## 时间线如何工作？

每个动画（补间和时间线）都放置在父时间线上。从某种意义上说，它们都有自己的播放头（它的 "time" 指的就是这个，或者 "totalTime"，除了包括重复和重复延迟外，其他都是相同的），当父播放头移动到新位置时，它也会更新子播放头。当时间线在特定时间渲染时，它会循环遍历其子元素，并说 "好的，你应该渲染就像你的播放头在 \_\_\_\_" 如果那个子元素是一个有时间线和子元素的时间线，它也会对其子元素做同样的事情，一直这样下去。所以播放头通常保持同步。

当您取消暂停动画（`resume()` 或 `play()`）时，它本质上是拿起播放头并移动它，使其内部播放头与父播放头在那一刻的位置同步，从而使播放完美平滑。除非时间线的 `smoothChildTiming` 是 `false`，在这种情况下，那个子元素不会移动 - 其 `startTime` 将保持锁定在原来的位置。

所以基本上当 `smoothChildTiming` 是 `true` 时，引擎会实时重新排列事物，以确保播放头对齐，使播放感觉无缝和平滑。当您 `reverse()` 或更改 `timeScale` 等时，也会发生同样的事情 - 动画的 `startTime` 自动调整。但有时您可能不希望这种行为 - 那就是 `smoothChildTiming: false` 在父时间线上很有用的时候。

再多一个例子：假设您有一个 10 秒的补间，它正好坐在根时间线上，您已经进行了 2 秒的补间。假设它正好在根上从 0 开始，以使这个例子简单，当它在 2 秒时，您执行 `tween.seek(5)`。根的播放头不受影响 - 它继续像往常一样进行，但在为了让那个补间跳到 5 秒并适当播放，补间的 `startTime` 被更改为 -3。这样，补间的播放头和根播放头就完全对齐了
