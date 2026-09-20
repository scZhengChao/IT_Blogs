# 示例

## 目录

- [基本用法](#基本用法)
- [\<audio> 元素与 \<source> 元素](#audio-元素与-source-元素)
- [\<audio> 与多个 \<source> 元素](#audio-与多个-source-元素)

### [基本用法](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio#基本用法 "基本用法")

下面的例子展示了使用 `<audio>` 元素来播放 OGG 文件的简单用法。它将根据 `autoplay` 属性的设置来自动播放——如果页面允许你这么做的话。它同时还包含一个兜底内容，以防止浏览器不支持 `<audio>` 元素。

```html 
<!-- Simple audio playback -->
<audio src="AudioTest.ogg" autoplay>
  Your browser does not support the <code>audio</code> element.
</audio>

```


如果想获得更多信息，包括何时自动播放生效，如何获取自动播放权限，并且通过何种方式，在何时应用自动播放才是合适的，请看我们的 [autoplay guide](https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide "autoplay guide")。

### [\<audio> 元素与 \<source> 元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio#audio_元素与_source_元素 "<audio> 元素与 <source> 元素")

这个例子指出了在嵌套的 `<source>` 元素的 `src` 属性上设置嵌入音轨，而非直接在 `<audio>` 元素上设置。通过这种方法可以同时在 `type` 属性上包含文件的 MIME 类型，这通常很有用，**因为浏览器就能立即决策：自己究竟是能够播放该文件，还是不在不能播放的文件上浪费时间。**

```html 
<audio controls>
  <source src="foo.wav" type="audio/wav" />
  Your browser does not support the <code>audio</code> element.
</audio>
```


### [\<audio> 与多个 \<source> 元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio#audio_与多个_source_元素 "<audio> 与多个 <source> 元素")

这个例子包含了多个 `<source>` 元素。如果能够播放的话，浏览器就会试图去加载第一个 source 元素（Opus 后缀名）；如果不行，那就退而求其次去加载第二个 (Vorbis 后缀名)，最终退到了 MP3 格式：

```html 
<audio controls>
  <source src="foo.opus" type="audio/ogg; codecs=opus" />
  <source src="foo.ogg" type="audio/ogg; codecs=vorbis" />
  <source src="foo.mp3" type="audio/mpeg" />
</audio>

```
