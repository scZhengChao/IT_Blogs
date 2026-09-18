# 动画

## 目录

- [cubic-bezier()](#cubic-bezier)
- [steps()](#steps)

### cubic-bezier()

`cubic-bezier()` 用于定义自定义的缓动曲线，让动画或过渡效果可以具有非线性的速度变化。这个函数基于贝塞尔曲线来工作，允许通过指定四个点（两个端点和两个控制点）来定义动画的速度曲线。

`cubic-bezier()` 函数的语法如下：

```javascript 
cubic-bezier(n,n,n,n)

```


这里的 n 是 0 到 1 之间的数值，它们分别代表两个控制点的 x 和 y 坐标。端点始终是 (0,0) 和 (1,1)，所以不需要指定。

使用 `cubic-bezier()` 函数时，需要提供这四个数值作为参数，它们定义了贝塞尔曲线的形状。这些数值会影响动画的速度和加速度，从而创造出各种各样的动画效果。

下面是一些常用的预定义`cubic-bezier()` 值，以及它们所代表的效果：

- `cubic-bezier(0.25, 0.1, 0.25, 1.0)`：慢到快然后慢的缓动（与 `ease-in-out` 类似）。
- `cubic-bezier(0.42, 0, 1, 1)`：先慢后快的缓动（与 `ease-out` 类似）。
- `cubic-bezier(0, 0, 0.58, 1)`：先快后慢的缓动（与 `ease-in` 类似）。
- `cubic-bezier(0, 0, 0, 1)`：线性缓动（与 linear 类似）。

要在 CSS 中使用 `cubic-bezier()` 函数，可以将它应用于 `transition-timing-function` 或 `animation-timing-function` 属性。例如：

```javascript 
/* 使用自定义的 cubic-bezier 缓动函数 */  
div {  
  transition: width 2s cubic-bezier(0.25, 0.1, 0.25, 1.0);  
}  
  
/* 或者在关键帧动画中使用 */  
@keyframes example {  
  0% { background-color: red; }  
  100% { background-color: blue; }  
}  
  
div {  
  animation: example 3s cubic-bezier(0.42, 0, 1, 1);  
}

```


在这个例子中，`div` 元素的宽度过渡和背景颜色动画都将使用自定义的 `cubic-bezier()` 缓动函数。可以通过调整四个数值来创建出适合动画需求的缓动曲线。

### steps()

`steps()` 用于在动画或过渡中创建一种阶跃式（步进式）的变化效果，而不是平滑的过渡。当使用 `steps()` 函数时，属性会在指定的段数内突然改变，而不是在两个状态之间平滑地过渡。

`steps()` 函数的语法如下：

```javascript 
steps(number, [start | end])

```


- `number` 是一个正整数，表示动画或过渡应该被分割成多少个阶跃。
- `start` 或 `end` 是一个可选参数，用于指定阶跃变化发生的时刻。如果省略或设置为 end，则每个阶跃会在每个间隔的结束时刻发生。如果设置为 `start`，则每个阶跃会在每个间隔的开始时刻发生。

例如，如果希望一个元素在 2 秒内从其原始位置跳到 100px 的位置，并且希望这个跳跃发生在 1 秒和 2 秒的时刻，可以使用 steps(2, end)。

```javascript 
div {  
  width: 100px;  
  height: 100px;  
  background-color: red;  
  animation: jump 2s steps(2, end) infinite;  
}  
  
@keyframes jump {  
  0% { transform: translateX(0); }  
  100% { transform: translateX(100px); }  
}

```


在这个例子中，`div` 元素会无限次地在 2 秒内从其原始位置跳跃到 100px 的位置。由于使用了 `steps(2, end)`，跳跃会在动画的第 1 秒和第 2 秒结束时发生。

`steps()` 函数通常用于创建一种机械或数字化的动画效果，因为它允许属性在特定的时间点突然改变，而不是平滑地过渡。这种效果在模拟数字时钟、步进式进度条或某些类型的用户界面动画时特别有用。
