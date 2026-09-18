# 控制动画

我们之前讲的动画效果都是页面加载后就启动或者延迟一定时间启动。但是如果我们想要对动画有更多一点的控制能力的话该怎么做呢？

比较常见的就是比如说我们想要点击某个按钮或有了某个交互行为之后才会让元素进行动画效果。那么控制动画的几个方法呢可以帮我们实现这个需求，在tween和timeline上都有这些方法，play，pause，reverse或者是加速变化。

```typescript 
// 通过一个变量保存对Tween或者Timeline实例的引用
let tween = gsap.to("#logo", {duration: 1, x: 100});

// 暂停
tween.pause();

// 恢复（继续）
tween.resume();

// 反向变化
tween.reverse();

// 直接切换到整个动画变化时长的0.5秒的时间点的状态
tween.seek(0.5);

// 直接切换到整个变化过程的1/4的节点的状态
tween.progress(0.25);

// 让运动减速到0.5倍
tween.timeScale(0.5);

// 让变化加速到原来的2倍
tween.timeScale(2);

// 直接销毁tween实例，让垃圾回收机制可以处理该实例所占用的内存
tween.kill();
```


- 使用其 `timeScale()` 方法加速或减慢整个时间线。您甚至可以对其进行补间，以平滑地逐渐加速或减慢动画！
- 使用其 `progress()` 或 `totalProgress()` 方法获取或设置时间线的进度（`totalProgress()` 只包括任何重复）。例如，要跳到半路，设置 `myTimeline.progress(0.5);`。
- 对 `time()`, `totalTime()`, `progress()`, 或 `totalProgress()` 进行补间，以快进或倒带时间线。您甚至可以将滑块附加到其中一个，使用户能够拖动向前或向后穿过时间线。
- 使用构造函数的 `vars` 对象添加 `onComplete`, `onStart`, `onUpdate`, `onRepeat` 和/或 `onReverseComplete` 回调，如 `var tl = gsap.timeline({onComplete: myFunction});`。
- 将时间线设置为重复任何次数或无限重复。您甚至可以设置每个重复周期之间的延迟，和/或使重复周期悠悠，看起来每隔一个周期就反转方向。
- 使用 `currentLabel()` 或使用 `nextLabel()` 和 `previousLabel()` 在时间线的各个位置找到标签。

示例代码：

```typescript 
//create the timeline that repeats 3 times with 1 second between each repeat and then call myFunction() when it completes
var tl = gsap.timeline({ repeat: 3, repeatDelay: 1, onComplete: myFunction })

//add a tween
tl.to('.class', { duration: 1, x: 200, y: 100 })

//add another tween 0.5 seconds after the end of the timeline (makes sequencing easy)
tl.to('#id', { duration: 0.8, opacity: 0 }, '+=0.5')

//reverse anytime
tl.reverse()

//Add a "spin" label 3-seconds into the timeline
tl.addLabel('spin', 3)

//insert a rotation tween at the "spin" label (you could also define the insertion point as the time instead of a label)
tl.to('.class', { duration: 2, rotation: '+=360' }, 'spin')

//go to the "spin" label and play the timeline from there
tl.play('spin')

//nest another timeline inside your timeline...
var nested = gsap.timeline()
nested.to('.class2', { duration: 1, x: 200 })
tl.add(nested, '+=3') //add nested timeline after a 3-second gap

```
