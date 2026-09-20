# animation-\*

## 目录

- [animation-\*](#animation-)

#### `animation-*`

CSS 动画通常使用 `animation` 属性来定义，它是 **animation-name**，**animation-duration**, **animation-timing-function**，**animation-delay**，**animation-iteration-count**，**animation-direction**，**animation-fill-mode** 和 **animation-play-state** 等一系列属性的简写形式。

- `animation-name`：指定一个或多个 @keyframes 的名称，描述了要应用于元素的动画。多个 @keyframes 以逗号分隔的名称列表的形式指定。
- `animation-duration`：设置动画完成一个动画周期所需的时间，需要指定单位，如 `1s`、`500ms`。
- `animation-delay`：指定执行动画之前的等待时间。动画可以稍后开始、立即从开头开始、立即在动画中途播放 **(如 ****`-1s`****)**。其中 `-1s` 意思是动画立即从 1s 处开始。
- `animation-iteration-count`：设置动画序列在停止前应播放的次数，有效值 `0`、正整数、正小数、无限循环 `infinite`。
- `animation-direction`：设置动画是正向播放 `normal`、反向播放 `reverse`、正向交替播放 `alternate`、反向交替播放 `alternate-reverse`。
- `animation-play-state`：设置动画是运行还是暂停，有效值 `running`、`paused`。
- `animation-fill-mode`：设置 CSS 动画在执行之前和之后如何将样式应用于其目标，有效值如下：
  - `none`：当动画未执行时，动画将不会将任何样式应用于目标，而是已经赋予给该元素的 CSS 规则来显示该元素。这是默认值
  - `both`：动画将遵循 `forwards` 和 `backwards` 的规则，从而在两个方向上扩展动画属性
  - `forwards`：**目标将保留由执行期间遇到的最后一个关键帧计算值**。最后关键帧取决于 `animation-direction` 和 `animation-iteration-count`：
    ![](./image/image_MMTTfcnmkK.png)
  - `backwards`：**动画将在应用于目标时立即应用第一个关键帧中定义的值**，并在 `delay` 期间保留此值。第一个关键帧取决于 `animation-direction` 值：
    ![](./image/image_3mt3j1DPFM.png)
- `animation-timing-function`：设置动画在每个周期的持续时间内如何进行，主要是如下两种函数：
  - `cubic-bezier` 三次贝塞尔曲线 ( `cubic-bezier(<x1>, <y1>, <x2>, <y2>)` )，以实现 **补间动画** 效果。
    1. **linear**：`cubic-bezier(0.0, 0.0, 1.0, 1.0)`
    2. **ease**：`cubic-bezier(0.25, 0.1, 0.25, 1.0)`
    3. **ease-in**：`cubic-bezier(0.42, 0.0, 1.0, 1.0)`
    4. **ease-out**：`cubic-bezier(0.0, 0.0, 0.58, 1.0)`
    5. **ease-in-out**：`cubic-bezier(0.42, 0.0, 0.58, 1.0)`
  - `steps` 是一个分段的阶跃函数，，以实现 **逐帧动画**。n 相当于单次动画的帧数，每帧动画的时间是均等的 (`steps(n, <jumpterm>)`)，其中 `jumpterm (默认值 end)` 含义如下：
    1. jump-start：在起始位置阶跃，`n=2 ⇒ 50% 100%; (100 / 2)`
    2. jump-end：在结束位置阶跃, `n=4 ⇒ 0% 25% 50% 75%; (100 / 4)`
    3. jump-none：起止位置均无跳跃，`n=5 ⇒ 0% 25% 50% 75% 100%; (100 / 4)`
    4. jump-both：起止位置均有跳跃 `n=3 ⇒ 25% 50% 75%; (100 / 4)`
    5. start：等同 jump-start
    6. end：等同 jump-end
    7. step-start：等同 steps(1, jump-start)
    8. step-end：等同 steps(1, jump-end)
       `steps` 函数动画示意图如下（输入为时间进度，输出为动画进度）
    ![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34a5329dc25949259cb741119fba5c02~tplv-k3u1fbpfcp-image.image#?w=480\&h=500\&s=4105\&e=svg\&b=ffffff)

    ![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/514931fc16bb4ec196b848efcb9a00cf~tplv-k3u1fbpfcp-image.image#?w=480\&h=250\&s=2085\&e=svg\&b=ffffff)
