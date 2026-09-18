# 特殊属性

## 目录

- [overwrite](#overwrite)
- [repeat](#repeat)
- [repeatDelay](#repeatDelay)
- [repeatRefresh](#repeatRefresh)
- [yoyo](#yoyo)
- [yoyoEase](#yoyoEase)
- [startAt](#startAt)
- [delay](#delay)
- [ease](#ease)
- [paused](#paused)
- [immediateRender](#immediateRender)
- [useFrames](#useFrames)
- [id](#id)
- [inherit](#inherit)
- [lazy](#lazy)
- [reversed](#reversed)
- [runBackwards](#runBackwards)
- [stagger](#stagger)
- [keyframes](#keyframes)
- [vars 属性的Function类型参数](#vars-属性的Function类型参数)

| 参数                      | 类型  | 描述                                                                                                                                                                                                                                                                |
| ----------------------- | --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| autoRemoveChildren      | 布尔值 | 如果设置为 \`true\`，则子补间/时间线完成后将自动被杀死/移除。这通常不是您想要的，因为它阻止了向后时间（比如如果您想 \`reverse()\` 或设置进度较低等）。然而，它可以提高速度和内存管理。根时间线使用 \`autoRemoveChildren: true\`。                                                                                                                      |
| callbackScope           | 对象  | 用于所有回调（\`onStart\`、\`onUpdate\`、\`onComplete\` 等）的作用域。作用域是回调内部 \`this\` 引用的对象。                                                                                                                                                                                    |
| defaults                | 对象  | 一个简单的方式设置默认值，这些默认值会被子动画继承。详见 “defaults” 部分。                                                                                                                                                                                                                       |
| delay                   | 数字  | 动画开始前的延迟时间，以秒为单位。                                                                                                                                                                                                                                                 |
| onComplete              | 函数  | 当动画完成时应该调用的函数。                                                                                                                                                                                                                                                    |
| onCompleteParams        | 数组  | 传递给 \`onComplete\` 函数的参数数组。例如，\`gsap.timeline({onComplete: myFunction, onCompleteParams: \["param1", "param2"]});\`。                                                                                                                                              |
| onInterrupt             | 函数  | 当动画被中断时调用的函数。注意，如果动画正常完成，则不会触发此事件。                                                                                                                                                                                                                                |
| onInterruptParams       | 数组  | 传递给 \`onInterrupt\` 函数的参数数组。例如，\`gsap.to(".class", {x:100, onInterrupt:myFunction, onInterruptParams:\["param1", "param2"]});\`。                                                                                                                                  |
| onRepeat                | 函数  | 每次动画重复时应该调用的函数。                                                                                                                                                                                                                                                   |
| onRepeatParams          | 数组  | 传递给 \`onRepeat\` 函数的参数数组。例如，\`gsap.timeline({onRepeat: myFunction, onRepeatParams: \["param1", "param2"]});\`。                                                                                                                                                    |
| onReverseComplete       | 函数  | 当动画从反向到达开始时应该调用的函数。例如，如果调用了 \`reverse()\`，则补间会向开始移动，当其 \`time\` 达到 \`0\` 时，\`onReverseComplete\` 将被调用。如果动画被放置在一个时间线实例中，并且播放动画反向到达（或超过）开始，也会发生这种情况。                                                                                                                |
| onReverseCompleteParams | 数组  | 传递给 \`onReverseComplete\` 函数的参数数组。例如，\`gsap.timeline({onReverseComplete: myFunction, onReverseCompleteParams: \["param1", "param2"]});\`。                                                                                                                         |
| onStart                 | 函数  | 当动画开始时（当其 \`time\` 从 \`0\` 变为其他值时）应该调用的函数。                                                                                                                                                                                                                        |
| onStartParams           | 数组  | 传递给 \`onStart\` 函数的参数数组。例如，\`gsap.timeline({onStart: myFunction, onStartParams: \["param1", "param2"]});\`。                                                                                                                                                       |
| onUpdate                | 函数  | 每次动画更新时（在动画活动期间的每帧）应该调用的函数。                                                                                                                                                                                                                                       |
| onUpdateParams          | 数组  | 传递给 \`onUpdate\` 函数的参数数组。例如，\`gsap.timeline({onUpdate: myFunction, onUpdateParams: \["param1", "param2"]});\`。                                                                                                                                                    |
| paused                  | 布尔值 | 如果为 \`true\`，则动画将在创建后立即暂停。                                                                                                                                                                                                                                        |
| repeat                  | 数字  | 动画在第一次迭代后应重复的次数。例如，如果 \`repeat\` 是 \`1\`，则动画将总共播放两次（初始播放加上1次重复）。要无限重复，请使用 \`-1\`。\`repeat\` 应始终为整数。                                                                                                                                                               |
| repeatDelay             | 数字  | 重复之间的时间，以秒为单位。例如，如果 \`repeat\` 是 \`2\` 且 \`repeatDelay\` 是 \`1\`，则动画将首先播放，然后等待1秒再重复，然后再次播放，然后再等待1秒再进行最后一次重复。                                                                                                                                                      |
| repeatRefresh           | 布尔值 | 设置 \`repeatRefresh: true\` 会导致重复时间线在每次完整迭代（不包括悠悠）时 \`invalidate()\` 其所有子补间，并在内部重新记录它们的起始/结束值。这在您使用动态值（相对的、随机的或基于函数的）时很有用。例如，\`x: "random(-100, 100)"\` 将在每次重复时获得一个新的随机 x 值。\`duration\`、\`delay\` 和 \`stagger\` 不会刷新。                                             |
| smoothChildTiming       | 布尔值 | 控制子动画是否自动重新定位（更改它们的 \`startTime\`）以在运行时更改属性时保持平滑播放。例如，想象时间线的播放头在一个孩子补间上，该补间完成了 75%，移动元素的左边从 0 到 100，然后调用该补间的 \`reverse()\` 方法。如果 \`smoothChildTiming\` 是 \`false\`（默认值，除了全局时间线外），补间将在原地翻转，保持其 \`startTime\` 一致。因此，时间线的播放头现在将在补间的 25% 完成点而不是 75%。详见 "时间线如何工作？" 部分。 |
| yoyo                    | 布尔值 | 如果为 \`true\`，则每隔一次重复周期将朝相反方向运行，使补间看起来来回移动（先前然后后）。这不会直接影响 \`reversed\` 属性。所以如果 \`repeat\` 是 \`2\` 且 \`yoyo\` 是 \`false\`，它看起来像：开始 - 1 - 2 - 3 - 1 - 2 - 3 - 1 - 2 - 3 - 结束。但如果 \`yoyo\` 是 \`true\`，它看起来像：开始 - 1 - 2 - 3 - 3 - 2 - 1 - 1 - 2 - 3 - 结束。              |

## overwrite

> overwrite : String (or int)

**用来控制同一个对象上有多个动画时的覆盖之类的情况**

```javascript 
//共有六种模式   可选择输入String 或者 Int
"none"或者false      //不做任何处理
"all"或者true        //覆盖任何操作
"auto"              //仅覆盖重复的属性
"concurrent"        //同时发生，仅覆盖重复的属性，但是不覆盖还未启动的动画属性
"allOnStart"        //与覆盖任何操作相似,两点不同是他是在动画属性第一次渲染时才覆盖掉其他所有的动画属性，而且这个会把在他之后创建的动画属性也覆盖掉
"preexisting"       //只有首次渲染的时候才覆盖所有
```


- `true` 覆盖任何操作

```javascript 
TweenMax.to('.box', 3, {      
  x: 500,
  y:300,
});
TweenMax.to('.box', 3, {           //小绿块只执行向右移动200px,上面的y:300也直接被覆盖
  x: 200,
  overwrite:true
});
```


- `auto` 仅覆盖重复的属性

```javascript 
TweenMax.to('.box', 6, {
  x: 500,
  y:300,
});
TweenMax.to('.box', 3, {       //小绿块又右移200px，又向下移动300px
  x: 200,
  overwrite:'auto'
});
```


![](https://upload-images.jianshu.io/upload_images/15263556-6e670d4c5b7d320b.image?imageMogr2/auto-orient/strip|imageView2/2/w/938/format/webp)

- `concurrent` 同时发生，仅覆盖重复的属性，但是不覆盖还未启动的动画属性

```javascript 
TweenMax.to('.box', 6, {
  x: 500,
  y:300,
});
TweenMax.to('.box', 3, {
  x: 200,
  overwrite:'concurrent'
});
```


可以看到，一开始先执行 `x:200` ， `y:300` 不被覆盖，3秒以后，`overwrite` 效果结束，覆盖失效，最后完成第一个动画剩下的3秒

![](https://upload-images.jianshu.io/upload_images/15263556-f4598a2da91fae4c.image?imageMogr2/auto-orient/strip|imageView2/2/w/938/format/webp)

## repeat

> repeat : Number

**动画在第一次完成后应重复的次数。例如，如果repeat为1，则动画将总共播放两次（初始播放加1次重复）。要无限期重复，请使用-1。repeat应该始终是一个整数。**

```javascript 
TweenMax.to('.box', 3,{
  x: 200,
  repeat:1
});
```


`repeat属性`就是重复的次数，会让动画执行多次；需要注意的是，如果我们填一个数值2，但实际动画的次数是3，因此我们总结出来公式：`真实运动次数 = repeat属性 + 1`。

> 如果我们想让动画一直重复下去，使用`repeat: -1`。

repeat一般会和`yoyo属性`一起使用，当yoyo为true时，在每次动画结束都会反向运动；需要注意的是，一个运动循环包含一个正向和反正运动，反向运动也计入运动的次数中。

## repeatDelay

> repeatDelay : Number

**每次重复之间的秒数（或帧）。例如，如果repeat是2并且repeatDelay是1，则动画将首先播放，然后在重复之前等待1秒，然后再次播放，然后再等待1秒再进行最后的重复**

```javascript 
TweenMax.to('.box', 3,{
  x: 200,
  repeat:1,
  repeatDelay:1
});
```


首次立即执行，第二次重复的动画，按照 `repeatDelay` 设定的值等待1秒以后，再次执行

![](https://upload-images.jianshu.io/upload_images/15263556-6d6e9c01c8653462.image?imageMogr2/auto-orient/strip|imageView2/2/w/938/format/webp)

# repeatRefresh

设置`true` 会导致重复的动画失效，因为每次完成一次后，会重新更新其开始和结束值。如果属性使用的动态值（随机或函数），会得到特别的动画效果。默认值：false。 &#x20;
例子1： &#x20;
从0位置向右运动500，重复5次。

```javascript 
gsap.to("div", {
  x: 500,
  repeat: 5
});
```


如果设置`repeatRefresh：true`后则看起来只会重复一次。因为每次**重复都会重新更新开始和结束值**，第2次重复时起始值更新为500，结束值也是500。所以第2次到第5次位置未发生任何变化。

```javascript 
gsap.to("div", {
  x: 500,
  repeat: 5,
  repeatRefresh: true
});
```


例子2： &#x20;
从0位置向右移动一个随机位置，重复5次。关于random的用法请参考gsap.utils详解。

```javascript 
gsap.to("div", {
  x: "random(200, 500)",
  repeat: 5
});
```


如果设置repeatRefresh：true后每次重复都会重新计算随机值，div会连续做5次运动，每次运动的距离随机。这就产生了特别的动画效果，所以设置repeatRefresh:true 就特别适合该类型的动画效果。

```javascript 
gsap.to("div", {
  x: "random(200, 500)",
  repeat: 5,
  repeatRefresh: true
});
```


# yoyo

> yoyo : Boolean

**如果设置yoyo为true，那么重复的动画将往返进行。默认为false**

**例如当你设置了repeat:2，如果没设置yoyo，那么动画是这样的123-123-123**

**如果设置了yoyo，动画则是123-321-123**

```javascript 
TweenMax.to('.box', 3,{
  x: 500,
  repeat:2,
  yoyo:true
});
```


# yoyoEase

> yoyoEase: Ease | Boolean

\*\*控制动画返回的速度曲线，如果设置为 ****`true`****，回转速度曲线与`ease`\*\***的参数相同**

```javascript 
TweenMax.to('.box', 3,{
  x: 500,
  repeat:2,
  yoyo:true,
  ease:Bounce.easeIn,
  yoyoEase:true   //和ease的取值相同，即 Bounce.easeIn
});
```


# startAt

> startAt : Object

**设置动画属性开始时的值**

设置动画从 `x:200` 开始，再到后面的 `x:500`

```javascript 
TweenMax.to('.box', 3,{
  x: 500,
  repeat:2,
  startAt:{x:200},
});
```


# delay

> delay : Number

**设置动画延迟时间**

```javascript 
new TweenMax.to('.box',3,{     //延迟3秒以后向右移动600px
  x:600,
  delay:3
})
```


# ease

> ease : Ease (or Function or String)

\*\*过渡效果的速度曲线，概念有点类似于 \*\***`animation-timing-function`**

Tips: `TweenLite`中包含了基本缓动：`Power0`、`Power1`、`Power2`、`Power3`、`Power4`、`Linear`、Quad、Cubic、Quart、Quint、Strong，他们每个都含有.easeIn、.easeOut、.easeInOut参数（对于线性动画，请使用Power0.easeNone）。 &#x20;

而TweenMax在此基础上还另外增加了特殊缓动：Elastic、Back、Bounce、SlowMo、SteppedEase、RoughEase、Circ、Expo、Sine。 &#x20;

如果想在TweenLite中使用特殊缓动则需要加载缓动类easing/EasePack.min.js

```typescript 
import {TweenMax} from 'gsap'
import {Bounce} from 'gsap'    //Bounce模块也要额外引入

new TweenMax.to('.box',3,{
  x:600,
  ease:Bounce.easeIn     //设置动画曲线，感觉有点抽搐的感觉，哈哈哈
})
```


![](https://upload-images.jianshu.io/upload_images/15263556-e6273f124f5cb617.image?imageMogr2/auto-orient/strip|imageView2/2/w/938/format/webp)

# paused

> paused : Boolean

**如果设置为true，动画将在创建时立即暂停。默认false**

```javascript 
let tween = new TweenMax.to('.box',3,{
  x:600,
  paused:true      //动画被创建的同时被暂停
})

tween.play();     //play()方法  让动画动起来
```


# immediateRender

> immediateRender : Boolean

**是否立即渲染，默认为false**

一般来说，TweenMax的运动对象会在下一个渲染周期前(也就是下一帧)被渲染到场景中，除非你设置了delay。如果想强制立即渲染，可以把这个参数设为true。 &#x20;

另外from()方法的运动对象是立即渲染的（默认true），如果你不想该运动对象被渲染，可以把这个参数设为false。

```javascript 
TweenMax.from('.green', 3, {
  x: 500,
  delay:3,
}); 
TweenMax.from('.orange', 3, {
  x: 500,
  delay:3,
  immediateRender: false,
});
```


可以看到同样是3秒后从右边500px回到初始状态，绿色方块早已经在动画的 `from` 位置做好了等待，而橙色方块因为设置了不立即渲染，选择延迟结束以后就位!

![](https://upload-images.jianshu.io/upload_images/15263556-145ed503daf3a67d.image?imageMogr2/auto-orient/strip|imageView2/2/w/938/format/webp)

# useFrames

> useFrames : Boolean

**当设置为true时，对这个TweenMax对象的时间计算方式基于帧而不是秒，一般帧速约为16.66ms（60帧/秒）**

```javascript 
TweenMax.ticker.fps(10);     //每秒帧数
TweenMax.to('.box', 6, {
  x: 200,
  useFrames:true
});
```


# id

为tween实例分配id（可选），以便之后使用gsap.getById()来获取该tween。 &#x20;
例子：

```javascript 
gsap.to("div", {
  id: "myTween",
  duration: 2,
  x: 100
})
 
gsap.getById("myTween")
```


# inherit

通常tween的属性从其所属timeline的defaults继承而来，但是可以通过设置inherit:false来禁止继承, 具体可参考gsap.defaults详解

# lazy

当tween第一次渲染并读取其初始值时，GSAP将尝试延迟值的写入，直到当前的tick(更新循环)的最后再进行写入，这样可以提高性能。因为它避免了浏览器读/写/读/写的频繁操作，这种频繁的操作会极大的消耗性能并造成布局抖动。设置lazy:false便禁用这种延迟渲染，但是不建议禁用。默认值：true。

lazy

# reversed

如果设置true，动画将调转方向超其开始方向移动。由于开始已经是初始位置，设置true后动画将显示为暂停。默认值：false。 &#x20;
例子：

```javascript 
gsap.to("div", {
  delay: 2,
  duration: 2,
  x: 500,
  onComplete: function(){
    this.reversed(true);
  }
});
```


# runBackwards

如果设置true, 动画**将翻转其起始值和结束值**，但对于ease不会反转。[可以通过设置true将gsap.to](http://xn--truegsap-vp1m892bbvvs90hzp7ag2lt9a.to "可以通过设置true将gsap.to") 转换为gsap.from。默认值：false。
例子：
下面2个动画是一样的效果，并且gsap.from内部也是这么处理。

```javascript 
gsap.to("div", {
  x: 500,
  runBackwards: true,
});
```


# stagger

如果是多个动画目标，可以通过设置**类似stagger:0.1（每个目标动画开始之间间隔0.1秒）来错开每个动画。** 或可以设置参数对象来实现更高级的动画效果，具体参考staggers详解。\
例子：\
所有的div都向右移动500，每个div间隔0.2秒开始移动。

```javascript 
gsap.to("div", {
  x: 500,
  stagger: 0.2
});
```


# keyframes

对同一对象的一连串的动画（关键帧动画）。**和一连串的gsap.to等效。** &#x20;
例子： &#x20;
沿x轴向右运动100，停顿1秒，再沿x轴向右运动到200的位置，同时y轴运动到200。

```javascript 
gsap.to("div", {
  keyframes: [
    {
      x: 100
    },
    {
      delay: 1,
      x: 200,
      y: 200
    }
  ]
});
```


# vars 属性的Function类型参数

通过使用function类型参数来实现更复杂的动画效果。 &#x20;
例子1： &#x20;
每个div的运动的y值不同，按顺序依次多100。第一个div运动到{x:100, y:0}的位置，第2个div运动到{x:100,y:100}的位置，第3个div运动到{x:100,y:200}的位置，依次类推。

```javascript 
gsap.to("div", {
  x: 100,
  y: function(index, target, targets){
    return index * 100;
  }
});
```


例子2： &#x20;
偶数索引的div沿y轴运动100，其他div则y保持不变。

```javascript 
gsap.to("div", {
  x: 100,
  y: function(index, target, targets){
    return index % 2 === 0 ? 100 : 0;
  }
});
```


参数： &#x20;
index: 当前运动对象的索引 &#x20;
target：当前运动对象 &#x20;
targets: 全部运动对象的数组
