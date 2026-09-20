# audio

## 目录

- [api](#api)
  - [autoplay](#autoplay)
  - [controls](#controls)
  - [crossorigin](#crossorigin)
  - [currentTime](#currentTime)
  - [disableRemotePlayback 实验性](#disableRemotePlayback-实验性)
  - [duration 只读](#duration-只读)
  - [loop](#loop)
  - [muted](#muted)
  - [preload](#preload)
  - [src](#src)
- [事件](#事件)

[   https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio "   https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio")

- audio的`loadedmetadata`事件，读取音频的总时长
- audio的`timeupdate`事件，用于更新播放进度
- audio的`canplaythrough`事件，是否能够不停下来进行缓冲的情况下持续播放指定的音频/视频
- `icon-play`的点击事件，暂停或播放
- `timeline`的点击事件，用于跳跃播放

# api

##### [autoplay](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio#autoplay "autoplay")

布尔值属性；声明该属性，音频会尽快自动播放，不会等待整个音频文件下载完成

> **备注：** 自动播放音频（或有声视频）可能会破坏用户体验，所以应该尽可能避免。如果你一定要提供自动播放功能，你应该加入开关（让用户主动打开自动播放）。然而，如果需要创建一些媒体元素，其播放源由用户在稍后设置，自动播放就会很有用。想了解如果正确使用自动播放，可参见我们的[自动播放指南](https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide "自动播放指南")。

##### [controls](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio#controls "controls")

如果声明了该属性，浏览器将提供一个包含声音，播放进度，播放暂停的控制面板，让用户可以控制音频的播放。

##### [crossorigin](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio#crossorigin "crossorigin")

枚举属性 展示音频资源是否可以通过 CORS 加载。[支持 CORS 的资源](https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_enabled_image "支持 CORS 的资源")可以被 [\<canvas>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas "<canvas>") 元素复用而不污染。可选值如下：

> [anonymous](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio#anonymous "anonymous")
> 在发送跨域请求时不携带验证信息。换句话说，浏览器在发送`Origin:` HTTP 请求首部时将不携带 cookie、X.509 安全令牌、也不会执行任何 HTTP 基本认证。如果服务器没有给予源站信任（也就是说没有设置 `Access-Control-Allow-Origin:` 响应首部），那么图片就被认为是污染的，它就会被限制使用。
> [use-credentials](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio#use-credentials "use-credentials")
> 在发送跨域请求时携带验证信息。换句话说，在发送`Origin:` HTTP 请求首部时将携带 cookie、安全令牌、并且执行 HTTP 基本认证。如果服务器没有给予源站信任（通过设置`Access-Control-Allow-Credentials:` 响应首部）那么图片就被认为是污染的，它就会被限制使用。在未指定时，资源将不通过 CORS 请求来获取（也就是不发送 `Origin:`请求首部），以保护 [\<canvas>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas "<canvas>") 元素中未污染的内容。如果验证失败，它会表现的好像 **anonymous** 选项是选中的。查看 [CORS settings attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin "CORS settings attributes") 来获取更多信息。

##### [currentTime](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio#currenttime "currentTime")

读取 `currentTime` 属性将返回一个双精度浮点值，用以标明以秒为单位的当前音频的播放位置。如果音频的元数据暂时无法访问——这意味着你无法的知道媒体的开始或持续时间。这时，`currentTime` 相对应的，能够被用于改变重播的时间。否则，设置 `currentTime` 将设置当前的播放位置，并且会自动搜寻到媒体的那个位置，如果媒体目前已经被加载的话。如果音频是以流的形式加载的，并且数据超出了媒体的缓冲区（buffer），[user agent](https://developer.mozilla.org/zh-CN/docs/Glossary/User_agent "user agent") 可能无法获取资源的某些部分。另一些音频的时间轴可能并非从 0 秒开始，所以设置 `currentTime` 到一个开始时间之前的时间可能会失败。举个例子，如果音频媒体的时间轴从 12 小时开始，把 `currentTime` 设置到 3600 将会尝试把当前播放位置设置到媒体的开始位置之前，从而导致错误。`getStartDate()` 方法能够用于确定媒体时间轴的开始位置。

##### [disableRemotePlayback](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio#disableremoteplayback "disableRemotePlayback") 实验性

这是一个布尔值，用来禁用在远程设备上进行进度控制的能力。这些设备通过有线（比如 HDMI, DVI）或无线技术（比如 Miracast, Chromecast, DLNA, AirPlay,）来与 web 连接。请参考 [this proposed specification](https://www.w3.org/TR/remote-playback/#the-disableremoteplayback-attribute "this proposed specification") 来获取更多信息。

> **备注：** 在 Safari 中，你能使用[x-webkit-airplay="deny"](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/AirPlayGuide/OptingInorOutofAirPlay/OptingInorOutofAirPlay.html "x-webkit-airplay=\"deny\"") 作为兜底方案。

##### [duration](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio#duration "duration") 只读

这是一个双精度浮点数，指明了音频在时间轴中的持续时间（总长度），以秒为单位。如果元素上没有媒体，或者媒体是不可用的，那么会返回 `NaN`。如果媒体找不到确切的结尾（比如不确定长度的直播流，网络电台，或者是通过 [WebRTC](https://developer.mozilla.org/zh-CN/docs/Web/API/WebRTC_API "WebRTC") 连接的流），那么这个值将返回 `+Infinity`。

##### [loop](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio#loop "loop")

布尔属性；如果声明该属性，将循环播放音频。

##### [muted](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio#muted "muted")

表示是否静音的布尔值。默认值为 `false`，表示有声音。

##### [preload](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio#preload "preload")

枚举属性，让开发者自行思考来示意浏览器使用何种加载方式以达到最好的用户体验。可以是以下属性之一：

- `none`: 示意用户可能不会播放该音频，或者服务器希望节省带宽；换句话说，该音频不会被缓存；
- `metadata`: 示意即使用户可能不会播放该音频，但获取元数据 (例如音频长度) 还是有必要的。
- `auto`: 示意用户可能会播放音频；换句话说，如果有必要，整个音频都将被加载，即使用户不期望使用。
- *空字符串* : 等效于`auto`属性。不同浏览器会有自己的默认值，规范建议的默认值为 `metadata`。

> **备注：**&#x20;
> `autoplay` 属性的优先级高于 `preload`。如果 `autoplay` 被指定，浏览器将显式地开始下载媒体以供播放。
> 浏览器并不被强制遵循该属性的规范，该属性只是一个建议与提示。

##### [src](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio#src "src")

嵌入的音频的 URL。该 URL 应遵从 [HTTP access controls](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS "HTTP access controls"). 这是一个可选属性；你可以在 audio 元素中使用 [\<source>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/source "<source>") 元素来替代该属性指定嵌入的音频。

# [事件](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio#事件 "事件")

| 事件名称                                                                                                                      | 触发时机                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| [audioprocess](https://developer.mozilla.org/en-US/docs/Web/API/ScriptProcessorNode/audioprocess_event "audioprocess")    | 一个 [ScriptProcessorNode](https://developer.mozilla.org/zh-CN/docs/Web/API/ScriptProcessorNode "ScriptProcessorNode") 的输入缓冲区已经准备开始处理。 |
| [canplay](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/canplay_event "canplay")                      | 浏览器已经可以播放媒体，但是预测已加载的数据不足以在不暂停的情况下顺利将其播放到结尾（即预测会在播放时暂停以获取更多的缓冲区内容）                                                                    |
| [canplaythrough](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/canplaythrough_event "canplaythrough") | 浏览器预测已经可以在不暂停的前提下将媒体播放到结束。                                                                                                           |
| [complete](https://developer.mozilla.org/zh-CN/docs/Web/API/OfflineAudioContext/complete_event "complete")                | 一个 [OfflineAudioContext](https://developer.mozilla.org/zh-CN/docs/Web/API/OfflineAudioContext "OfflineAudioContext") 的渲染已经中止。        |
| [durationchange](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/durationchange_event "durationchange") | `duration` 属性发生了变化。                                                                                                                  |
| [emptied](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/emptied_event "emptied")                      | 媒体置空。举个例子，当一个媒体已经加载（或部分加载）的情况下话调用 `load()` 方法，这个事件就将被触发。                                                                             |
| [ended](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/ended_event "ended")                            | 播放到媒体的结束位置，播放停止。                                                                                                                     |
| [loadeddata](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/loadeddata_event "loadeddata")             | 媒体的第一帧加载完成。                                                                                                                          |
| [loadedmetadata](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/loadedmetadata_event "loadedmetadata") | 元数据加载完成。                                                                                                                             |
| [pause](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/pause_event "pause")                            | 播放暂停。                                                                                                                                |
| [play](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/play_event "play")                               | 播放开始。                                                                                                                                |
| [playing](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/playing_event "playing")                      | 因为缺少数据而暂停或延迟的状态结束，播放准备开始。                                                                                                            |
| [ratechange](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ratechange_event "ratechange")             | 播放速度变化。                                                                                                                              |
| [seeked](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeked_event "seeked")                         | 一次\_获取\_ 操作结束。                                                                                                                       |
| [seeking](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeking_event "seeking")                      | 一次\_获取\_ 操作开始。                                                                                                                       |
| [stalled](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/stalled_event "stalled")                      | 用户代理试图获取媒体数据，但数据意外地没有进入。                                                                                                             |
| [suspend](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/suspend_event "suspend")                      | 媒体加载挂起。                                                                                                                              |
| [timeupdate](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/timeupdate_event "timeupdate")             | 由 `currentTime` 指定的时间更新。                                                                                                             |
| [volumechange](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/volumechange_event "volumechange")       | 音量变化。                                                                                                                                |
| [waiting](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/waiting_event "waiting")                      | 因为暂时性缺少数据，播放暂停。                                                                                                                      |

[自动播放](自动播放.md "自动播放")

[使用说明](使用说明.md "使用说明")

[使用 CSS 设置样式](<使用 CSS 设置样式.md> "使用 CSS 设置样式")

[检测音轨添加和移除](检测音轨添加和移除.md "检测音轨添加和移除")

[示例](IT/前端工程/图标图像音视频/audio/示例/示例.md "示例")

[ios 加载失败；不能自动播放](<ios 加载失败；不能自动播放.md> "ios 加载失败；不能自动播放")

[常见踩坑汇总](常见踩坑汇总.md "常见踩坑汇总")
