# 问题一：flex：1 会被撑开

## 目录

- [问题二](#问题二)

```html 
<div id="app">
  <header id="main-nav">
  <!-- <router-view> -->
  <div id="main-body">
    <header id="second-nav">....</header>
    <div id="action-bar">....</div>
    <div class="editor-output">
      <div id="editor">....</div>
      <div class="drag-splitter"></div>
      <div id="output">....</div>
    </div>
  </div>
</div>
```


CSS 大概如此：

```css 
html, body, #app {
  height: 100%;
}
#app {
  display: flex;
  flex-direction: column;
}
#main-nav, #second-nav, #action-bar {
  height: 40px;
}
#main-body, .editor-output {
  flex: 1;
  display: flex;
  flex-direction: column;
}
#editor {
  flex: 1;
}
#output {
  height: 100px;
}

```


这样的结果是，执行时，大量日志输出，**就把界面顶开了。而不是预期中那样，出现滚动条，多余的部分被隐藏。**

经过一番 google，发现问题在高度计算。虽然定义了 `height: 100%` 和 `display: flex`，但是浏览器在计算高度的时候，并不会**从外往里一层一层算，而是按照规范：**

> **百分比**
> 指定一个百分比的高度。这个百分比是**相对于父元素的盒子的高度计算**的。如果**父元素没有明确指定高度，并且该元素不是绝对定位的，该值将计算为 “自动”。****auto**
> 由其它属性决定。

于是因为上图中的界面**存在嵌套关系**，所以在需要计算高度的时候，子元素的高度虽然应该是 100%，但是父元素并没有被明确指定，所以就变成了 `auto`，继而被子元素撑开。解决方案就是沿着你需要 `height: 100%` 的元素往上，**添加明确**的 `height`，可以是百分比，也可以是绝对数值。

于是，我在 `#main-body` 上添加 `height: calc(100% - 49px)`，问题解决。

😓 等下，不是每级都要加么？为啥只加一个具体高度就可以了？这个问题，我还要再研究一下。目前猜测，因为这个元素是竖直方向排列的（`flex-direction: column`）。

> flex：1 虽然撑满了剩下的；但是没有height；也就没有高度；**这个时候要给一明确的高度；**

## 问题二

后来，在编辑器和日志输出窗口的右侧，增加了资源缩略图侧边栏。于是又遇到第二个问题：我以为 `#main-nav` 的高度确定，那么作为 `display:flex`，默认 `align-items: stretch`，它的子元素的高度应该都等于它的高度。所以给子元素设置 `overflow: auto` 就应该可以限制高度，出现滚动条。结果又失败了。

然后我想起来 BFC。虽然直觉上 BFC 应该跟 `display:flex` 应该没什么关系，不过因为测试起来比较简单，可以先试试。

于是我就在 `div.d-flex` 上添加了 `.overflow-hidden` 样式，果然问题就解决了。因为没找到明确的文档解释，所以我只能猜测：

1. 类似 BFC 的逻辑在 `display:flex` 元素上依然存在。
2. 父元素 `display:flex;flex:N`，根据上下文它应该有个确定的高度
3. 但如果子元素高度超过它的高度，默认会撑开
4. 如果父元素 `overflow: hidden`，会触发某个 xFC，于是整体高度就被限制了
5. 于是子元素的滚动条就出来了
