# 检测音轨添加和移除

你能够通过 [addtrack](https://developer.mozilla.org/en-US/docs/Web/API/AudioTrackList/addtrack_event "addtrack") 和 [removetrack](https://developer.mozilla.org/en-US/docs/Web/API/AudioTrackList/removetrack_event "removetrack") 事件来检测何时音轨从 `<audio>` 元素中添加和移除了。然而，这些事件并不是直接传递给 `<audio>` 元素自己的。相反，它们是发送给 `<audio>` 元素的[HTMLMediaElement](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement "HTMLMediaElement") 中的音轨列表对象的。这些对象与添加进元素的音轨类型一一对应。

[HTMLMediaElement.audioTracks](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/audioTracks "HTMLMediaElement.audioTracks")

一个 [AudioTrackList](https://developer.mozilla.org/en-US/docs/Web/API/AudioTrackList "AudioTrackList") 包含所有的媒体对象的音轨。你能在为 `addtrack` 事件添加监听，以在新音轨添加进元素时获得通知。

[HTMLMediaElement.videoTracks](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/videoTracks "HTMLMediaElement.videoTracks")

在该 [VideoTrackList](https://developer.mozilla.org/en-US/docs/Web/API/VideoTrackList "VideoTrackList") 对象上添加监听，以在视频轨道被添加进元素时获得通知。

[HTMLMediaElement.textTracks](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/textTracks "HTMLMediaElement.textTracks")

在该 [TextTrackList](https://developer.mozilla.org/en-US/docs/Web/API/TextTrackList "TextTrackList") 对象上添加监听，以在文字轨道被添加进元素时获得通知。（也许用于字幕，译者猜测）

> **备注：**
> 尽管是 `<audio>` 元素，但它依然有视频以及文字的轨道列表，并且实际上能够用来展示视频，尽管应用接口的使用可能显得很古怪。

举个例子，为了侦测何时音轨从一个 `<audio>` 元素中添加或者移除，你可以使用如下代码：

```javascript 
var elem = document.querySelector("audio");

elem.audioTrackList.onaddtrack = function (event) {
  trackEditor.addTrack(event.track);
};

elem.audioTrackList.onremovetrack = function (event) {
  trackEditor.removeTrack(event.track);
};

```


这份代码监听音轨从目标元素中添加删除的事件，并且调用了一个轨道编辑器上的虚拟函数，来从编辑器上的可用音轨列表中注册和移除音轨。

你也可以使用 [addEventListener()](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener "addEventListener()") 来监听 [addtrack](https://developer.mozilla.org/en-US/docs/Web/API/AudioTrackList/addtrack_event "addtrack") 和 [removetrack](https://developer.mozilla.org/en-US/docs/Web/API/AudioTrackList/removetrack_event "removetrack") 事件。
