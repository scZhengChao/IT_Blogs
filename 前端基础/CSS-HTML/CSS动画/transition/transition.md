# transition

## 目录

- [语法定义](#语法定义)
- [语法范例](#语法范例)
- [JS 相关事件监听](#JS-相关事件监听)

就如之前所说，它属于 **补间动画**，需要提供起始和结束两个关键帧，浏览器才能够完成样式差异比对并计算出对应的过渡动画。所以它有两个特点：

1. 由于首次渲染元素的样式只会有一个关键帧，浏览器无法进行样式差异比对，所以**在首屏渲染时** `transition` 一般不会生效
2. 由于浏览器是根据样式差异化的两帧自动计算并过渡，所以 `transition` 只支持\*\*可识别中间值的属性 \*\*(如大小、颜色、位置、透明度等)，而如 display 属性则不支持。

### 语法定义

CSS 过渡通常使用简写属性 `transition` 来定义，这是最好的方式。既可以避免属性值列表长度不一，也节省了在 CSS 代码上调试的时间。当然也可以用下面子属性来定义过渡的各部分：

- `transition-property`： 指定哪个或哪些 CSS 属性用于过渡。只有指定的属性才会在过渡中发生动画，其他属性仍如通常那样瞬间变化。
- `transition-duration`： 指定过渡的时长。你可以为所有属性指定一个值，或者指定多个值，或者为每个属性指定不同的时长。
- `transition-timing-function`： 指定一个[缓动函数](https://link.juejin.cn/?target=https://developer.mozilla.org/zh-CN/docs/Web/CSS/easing-function "缓动函数")，定义属性值怎么变化。常见的缓动函数是一个三次贝塞尔曲线 ( `cubic-bezier(<x1>, <y1>, <x2>, <y2>)` )。当然也可以选择关键字
  - **linear**：`cubic-bezier(0.0, 0.0, 1.0, 1.0)`
  - **ease**：`cubic-bezier(0.25, 0.1, 0.25, 1.0)`
  - **ease-in**：`cubic-bezier(0.42, 0.0, 1.0, 1.0)`
  - **ease-out**：`cubic-bezier(0.0, 0.0, 0.58, 1.0)`
  - **ease-in-out**：`cubic-bezier(0.42, 0.0, 0.58, 1.0)`![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97bec4aec71d4db6936bc4baf7fa3b95~tplv-k3u1fbpfcp-image.image#?w=480\&h=500\&s=2261\&e=svg\&b=ffffff)
- `transition-delay`： 指定延迟，即属性开始变化时与过渡开始发生时之间的时长。

```css 
  /* 单条 简写形式 */
  transition: 
    <property> <duration> <timing-function> <delay>;
  
  
  /* 多条 简写形式 */
  transition: 
    <property> <duration> <timing-function> <delay>,
    <property> <duration> <timing-function> <delay>,
    ...;


  /* 单条 子属性形式 */
  transition-property: <property-name>;
  transition-duration: <duration-time>;
  transition-timing-function: <timing-function>;
  transition-delay: <duration-time>;
  
  
  /* 多条 子属性形式 */
  transition-property: <property-name> [, <property-name>, ...];
  transition-duration: <duration-time> [, <duration-time>, ...];
  transition-timing-function: [, <cubic-bezier>, ...];
  transition-delay: [, <duration-time>, ...];
  
```


### 语法范例

- 简写形式书声明过渡样式

```css 
  div {
    opacity: 1;
  }
  
  div:hover {
    opacity: 0.5;
    transition: opacity, 3s;
  }
  

```


- 如果任意属性值列表的长度比其他属性值列表要短，**则其中的值会重复使用以便匹配**

```css 
  div:hover {
    transition-property: opacity, left, top, height;
    transition-duration: 3s, 5s;
  }
  
  /* 等同于下面样式声明 */
  
  div:hover {
    transition-property: opacity, left, top, height;
    transition-duration: 3s, 5s, 3s, 5s;
  }
  

```


- 如果某个属性的值列表长于 `transition-property` 的属性，则将被截短

```css 
  div:hover { 
    transition-property: opacity, left;
    transition-duration: 3s, 5s, 2s, 1s; 
  }
  
  /* 等同于下面样式声明 */
  
  div:hover {
    transition-property: opacity, left;
    transition-duration: 3s, 5s; 
  }
  

```


### JS 相关事件监听

你可以监听 CSS 过渡的开始和结束

- `transitionrun`： CSS 过渡动画触发 (在任何延迟之前)
- `transitionstart`： CSS 过渡动画触发 (在任何延迟之后)
- `transitionend`： CSS 过渡动画结束

事件监听回调函数会接收一个 `TransitionEvent` 对象，除了具有一般的 `Event` 对象外，还有两个额外属性：

1. `propertyName` 一个字符串，表示过渡完成的 CSS 属性的名称。
2. `elapsedTime` 一个浮点数，表示在事件发生时，过渡已经运行了多少秒。

[语法](IT/前端基础/CSS-HTML/CSS动画/transition/语法/语法.md "语法")

[案例](IT/前端基础/CSS-HTML/CSS动画/transition/案例/案例.md "案例")

[高级使用](IT/前端基础/CSS-HTML/CSS动画/transition/高级使用/高级使用.md "高级使用")
