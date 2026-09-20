# js监听

## 目录

- [JS 相关事件监听](#JS-相关事件监听)

### JS 相关事件监听

你可以监听 CSS 动画的开始和结束

- `animationstart`  &#x20;

  事件会在 CSS 动画开始时触发。如果有 `animation-delay` 延时，事件会在延迟时效过后立即触发。为负数的延时时长会致使事件被触发时事件的 `elapsedTime` 属性值等于该时长的绝对值
- `animationiteration` &#x20;

  当 CSS 动画的迭代结束，另一个迭代开始时，将触发动画迭代事件。此事件不会与 `animationend` 事件同时发生
- `animationend` &#x20;

  动画结束事件在 CSS 动画完成时触发。如果在动画完成前中止了动画，例如将元素从 DOM 中移除，或将动画从元素上移除，该事件不会触发。
- `animationcancel` &#x20;

  这个事件在 CSS Animation 属性意外中断时派发出来 (换句话说，任何时候 animation 停止运行不会发出一个 animationend 事件)

事件监听回调函数会接收一个 `AnimationEvent` 对象，除了具有一般的 `Event` 对象外，还有额外属性：

1. `animationName` 一个字符串，表示过渡完成的 CSS 动画的名称。
2. `pseudoElement` 一个字符串，如果动画作用于伪元素上，则该属性为伪元素名称
3. `elapsedTime` 一个浮点数，表示在事件发生时，过渡已经运行了多少秒。
