# 动画事件  Callbacks

## 目录

- [onRepeat](#onRepeat)
- [onRepeatParams](#onRepeatParams)
- [onReverseComplete](#onReverseComplete)
- [onReverseCompleteParams](#onReverseCompleteParams)
- [onStart](#onStart)
- [onStartParams](#onStartParams)
- [onUpdate](#onUpdate)
- [onUpdateParams](#onUpdateParams)
- [onComplete](#onComplete)
- [onCompleteParams](#onCompleteParams)

如果你需要知道动画是什么启动的，或者是在动画的某个时机执行一些代码，那么你可以使用动画事件。所有的Tween和timelines都有这些事件。

- onComplete：动画结束时触发
- onStart：动画开始时触发
- onUpdate：只要动画运行，每一帧都会触发（元素有属性变化时）
- onRepeat：每次动画重复时触发
- onReverseComplete：当动画反向执行后运动到变化起始点时触发

# onRepeat

当动画重复时调用的函数。需要设置repeat（大于0）才会有效。

# onRepeatParams

传递给onRepeat 函数的参数数组。

# onReverseComplete

当动画从反方向再次达到开始位置时要调用的函数。需要设置reversed: true

# onReverseCompleteParams

传递给onReverseComplete函数的参数数组。

# onStart

动画开始时要调用的函数。

# onStartParams

传递给onStartParams函数的参数数组。

# onUpdate

每次动画更新时（每帧）调用的函数。

# onUpdateParams

传递给onUpdate函数的参数数组。

# onComplete

动画完成时调用的函数。

# onCompleteParams

传递给onComplete函数的参数数组。 &#x20;
例子：

```javascript 
gsap.to("div", {
  x: 500,
  onComplete: complete,
  onCompleteParams: [2, "str"]
})
 
function complete(i, str){
  //i = 2, str = "str"
}
```
