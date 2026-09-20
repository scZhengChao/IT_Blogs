# 视频相关

## 目录

- [allowsFullscreenVideo={boolean}](#allowsFullscreenVideoboolean)
- [allowsInlineMediaPlayback={boolean}  iOS](#allowsInlineMediaPlaybackboolean-iOS)
- [mediaPlaybackRequiresUserAction={string}](#mediaPlaybackRequiresUserActionstring)

### allowsFullscreenVideo={boolean}

解决android 下 video 不能全屏播放的问题

### allowsInlineMediaPlayback={boolean}  iOS

布尔值，控制 HTML5 视频是在内部播放(非全屏)还是使用原生的全屏控制器。默认为 false。

注意:为了确保内联播放，除了这个属性需要被设置成true, 在 html 代码中视频元素也需要包含 webkit-playsinline属性。

### mediaPlaybackRequiresUserAction={string}

//布尔值，控制 HTML5 音频和视频播放前是否需要用户点击。默认为 true
