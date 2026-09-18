# 使用 CSS 设置样式

`<audio>` 元素没有自带的固有视觉样式，除非如果声明了 `controls` 属性，则会显示浏览器的默认控件。

默认控件的 [display](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display "display") 的默认值为 `inline`。将该值设为 `block` 通常会对定位和布局有好处，除非你想将控件放在文本块或类似元素中。

你可以使用作用于整个控件的属性来为其设置样式。例如可用 [border](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border "border")、[border-radius](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-radius "border-radius")、[padding](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding "padding"), [margin](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin "margin") 等等。但你不能设置音频播放器中的单个组件（如改变按钮大小、改变图标或字体等）。控件在不同的浏览器中也有所不同。

如果在跨浏览器中得到一致的外观和体验，你需要创建自定义控件；自定义控件可以根据你的需求任意设置样式，还可以使用 JavaScript 和 [HTMLMediaElement](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement "HTMLMediaElement") API 来设置更多功能。

[视频播放器样式基础](https://developer.mozilla.org/en-US/docs/Web/Media/Audio_and_video_delivery/Video_player_styling_basics "视频播放器样式基础") 提供了一些有用的样式技术，这篇文章围绕 `<video>` 而写，但大部分都可以用于 `<audio>`。
