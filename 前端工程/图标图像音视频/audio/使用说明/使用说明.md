# 使用说明

浏览器对 [文件类型](https://developer.mozilla.org/zh-CN/docs/Web/Media/Formats/Containers "文件类型") 和 [音频编码](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs "音频编码") 的支持各有不同，你可以使用内嵌的 [\<source>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/source "<source>") 元素提供不同的播放源。**浏览器会使用第一个它支持的播放源：**

```html 
<audio controls>
  <source src="myAudio.mp3" type="audio/mpeg" />
  <source src="myAudio.ogg" type="audio/ogg" />
  <p>
    Your browser doesn't support HTML5 audio. Here is a
    <a href="myAudio.mp4">link to the audio</a> instead.
  </p>
</audio>

```


我们提供了全面细致的 [音频文件类型指南](https://developer.mozilla.org/zh-CN/docs/Web/Media/Formats "音频文件类型指南") 和 [这些类型可以使用的音频编码](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs "这些类型可以使用的音频编码")。此外，还有 [视频编码支持指南](https://developer.mozilla.org/zh-CN/docs/Web/Media/Formats/Video_codecs "视频编码支持指南")。

其他使用说明：

- 如果你没有声明 `controls` 属性，音频播放器不会包含浏览器的默认控件。但你可以使用 JavaScript 和 [HTMLMediaElement](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement "HTMLMediaElement") API 创建自己的自定义控件。
- 为了更精确地控制你的音频内容，`HTMLMediaElement` 会触发多种不同的 [事件](https://developer.mozilla.org/en-US/docs/Web/Events#media "事件")。这也提供了一个查看音频获取过程的方式，你可以查看错误或检测什么时候可以开始播放或操作。
- 你还可以使用 [Web Audio API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Audio_API "Web Audio API") 以从 JavaScript 代码直接生成和操纵音频流，而非流式播放已存在的音频文件。
- `<audio>` 元素不能像 `<video>` 元素一样附加副标题（subtitle）或说明标题（caption）。更多有用的信息和解决方法参见 Ian Devlin 的 [WebVTT and Audio](https://www.iandevlin.com/blog/2015/12/html5/webvtt-and-audio "WebVTT and Audio")。
