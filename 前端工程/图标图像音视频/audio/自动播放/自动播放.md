# 自动播放

## 目录

- [示例 2：检测是否允许自动播放](#示例-2检测是否允许自动播放)
- [play() 方法](#play-方法)
  - [示例：播放视频](#示例播放视频)
  - [示例：处理 play() 失败](#示例处理-play-失败)
- [使用 Web Audio API 自动播放](#使用-Web-Audio-API-自动播放)
- [自动播放功能策略](#自动播放功能策略)
  - [示例：仅允许来自文档域的自动播放](#示例仅允许来自文档域的自动播放)
  - [示例：允许来自特定源的自动播放](#示例允许来自特定源的自动播放)
  - [示例：禁用自动播放](#示例禁用自动播放)
- [最佳实践](#最佳实践)
  - [使用媒体控件处理自动播放失败](#使用媒体控件处理自动播放失败)
- [浏览器配置选项](#浏览器配置选项)
  - [Firefox](#Firefox)

[ 媒体和 Web Audio API 的自动播放指南 - Web 媒体技术 | MDNMDN Web DocsMDN logoMozilla logo 网页加载完成后立即播放音频（或带有音频轨道的视频）可能会意外地打扰到用户。尽管自动播放媒体文件是一个很实用的功能，但是我们也应该谨慎地使用它，保证只有在它被需要的时候才使用。为了让用户拥有控制权，通常浏览器会提供各种方式禁用自动播放音频功能。在这篇文章中，我们将介绍各种媒体和 Web Audio API 的自动播放功能，包括关于如何使用自动播放功能、如何优雅的处理阻止自动播放功能的一些简短的介绍。 https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay\_guide](https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide " 媒体和 Web Audio API 的自动播放指南 - Web 媒体技术 | MDNMDN Web DocsMDN logoMozilla logo 网页加载完成后立即播放音频（或带有音频轨道的视频）可能会意外地打扰到用户。尽管自动播放媒体文件是一个很实用的功能，但是我们也应该谨慎地使用它，保证只有在它被需要的时候才使用。为了让用户拥有控制权，通常浏览器会提供各种方式禁用自动播放音频功能。在这篇文章中，我们将介绍各种媒体和 Web Audio API 的自动播放功能，包括关于如何使用自动播放功能、如何优雅的处理阻止自动播放功能的一些简短的介绍。 https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide")

**play() failed because the user didn’t interact with the document first**

翻译：play方法调用失败，因为用户没有先操作文档【用户没有先去跟网页做交互再执行音频播放】 &#x20;
用户再跟网页有了交互后，该报错不会再出现

**而且audio标签 即使设置了 muted 属性也不能自动播放**。

> 打个比方：进入某个页面之后，想在3秒后能 成功调用 audio.play() 播放音频，你可以在3秒内随便单击一下页面的某个地方，这样谷歌浏览器就认为 用户与页面已经有交互了，那么3秒一到，play()方法调用成功，音频就正常播放了。&#x20;

既然是这样，那么在用户进入页面的时候，只要引导用户先去触发这些事件，问题就解决了。

- 方法1：进入页面时，可以做个欢迎弹窗之类的，引导用户点击关闭（这样就有交互了），然后就可以 自动播放 音频，或者 自动播放 有声视频。
- 方法2：直接做个播放按钮之类的，引导用户点击之后才调用 音频播放 或 有声视频播放。

#### 示例 2：检测是否允许自动播放

如果你依靠自动播放功能去做一些重要的事情，或者**自动播放失败会**以任何方式影响你的应用程序，那你可能会想知道自动播放什么时候没有开始。不幸的是，对于 [autoplay](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio#autoplay "autoplay") 属性，识别自动播放是否成功开始是很棘手的。自动播放失败时**不会触发**任何事件。也没有抛出异常或可以设置回调，甚至在媒体元素上都没有标记来告诉你自动播放是否起作用。你实际能做的就是检查一些值，然后根据这些值猜测自动播放是否起作用。

如果你能够调整查看内容的方向，那么更好的方法是，依靠知道媒体播放已成功开始，而不是在媒体启动失败时知道。你可以通过侦听要在媒体元素上触发的 [play](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/play_event "play") 事件来轻松实现此目的。

当媒体暂停后恢复时\_以及\_发生自动播放时都会发送 `play` 事件。这意味着第一次触发 `play` 事件时，你知道你的媒体是在页面打开后第一次启动的。

考虑以下 HTML 媒体元素：

```html 
<video src="myvideo.mp4" id="video" autoplay></video>

```


这里我们有一个 [\<video>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video "<video>") 元素，它设置了 [autoplay](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video#autoplay "autoplay") 属性，并设置了 [play](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/play_event "play") 事件处理器；该事件由名为 `handleFirstPlay()` 的函数处理，该函数接收 `play` 事件作为输入。

`handleFirstPlay()` 看起来像这样：

```javascript 
function handleFirstPlay(event) {
  let vid = event.target;

  vid.onplay = null;

  // 播放开始后开始执行你需要执行的操作
}

```


从 [Event](https://developer.mozilla.org/zh-CN/docs/Web/API/Event "Event") 对象的 [target](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/target "target") **获取对视频元素的引用后**，该元素的 `onplay` **处理程序将设置**为 `null`。这将**阻止任何未来的播放事件**被传递给处理程序。当文档位于后台标签页时，如果用户暂停并恢复视频或浏览器自动暂停和恢复视频，则可能会发生这种情况。

此时，你的网站或应用程序可以**开始执行依赖于视频启动的任何操作。**

> **备注**：此方法不区分自动播放和用户手动开始播放。

### [play() 方法](https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide#play_方法 "play() 方法")

术语“自动播放”还指脚本尝试在处理用户输入事件的上下文之外触发包含音频的媒体播放的场景。这是通过调用媒体元素的 [play()](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/play "play()") 方法来完成的。

> **备注：强烈建议你**尽可能使用 `autoplay` 属性，因为 `autoplay` 属性对自动播放首选项的**支持比其他自动播放媒体的方式更广泛**。它还让浏览器负责开始播放，并优化播放的时间。

#### 示例：播放视频

这个简单的示例播放在文档中找到的第一个 [\<video>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video "<video>") 元素。除非文档有权自动播放媒体，否则 `play()` 不会让播放开始。

```javascript 
document.querySelector("video").play();

```


#### 示例：处理 play() 失败

当你使用 [play()](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/play "play()") 方法启动媒体时，**更容易检测到自动播放媒体的故障**。`play()` 返回一个 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise "Promise")，一旦媒体成功开始播放，该 Promise 就会被兑现 **；当播放无法开始时（例如自动播放被拒绝），该 Promise 将被拒绝**。当自动播放失败时，你可能希望为用户提供一种手动告诉浏览器要求用户授予播放媒体权限的方法。

你可以使用这样的代码来完成这项工作：

```javascript 
let startPlayPromise = videoElem.play();

if (startPlayPromise !== undefined) {
  startPlayPromise
    .catch((error) => {
      if (error.name === "NotAllowedError") {
        showPlayButton(videoElem);
      } else {
        // 处理加载或播放错误
      }
    })
    .then(() => {
      // 仅在播放开始后才开始执行你需要执行的操作。
    });
}

```


我们对 `play()` 的结果做**的第一件事是确保它**不是 `undefined`。我们检查这一点是因为在早期版本的 HTML 规范中，`play()` 没有返回值。**最近添加了返回一个允许**你确定操作成功或失败的 promise。检查 `undefined` 可防止此代码在旧版本的 Web 浏览器上失败并出现错误。

然后我们向 Promise 添加一个 [catch()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch "catch()") 处理器。这将查看错误的 [name](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMException/name "name") 以查看它是否为 `NotAllowedError`。这表示由于权限问题导致播放失败，例如自动播放被拒绝。如果是这样的话，我们应该提供一个用户界面，让用户手动开始播放；这是由函数 `showPlayButton()` 处理的。

任何其他错误都会被适当处理。

如果 `play()` 返回的 Promise 已正确解决，则 `then()` 子句将运行，并且可以在自动播放开始时开始执行任何需要执行的操作。

## [使用 Web Audio API 自动播放](https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide#使用_web_audio_api_自动播放 "使用 Web Audio API 自动播放")

在 [Web Audio API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Audio_API "Web Audio API") 中，网站或应用程序可以使用链接到 [AudioContext](https://developer.mozilla.org/zh-CN/docs/Web/API/AudioContext "AudioContext") 的源节点上的 `start()` 方法开始播放音频。在处理用户输入事件的上下文之外执行此操作受自动播放规则的约束。

## [自动播放功能策略](https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide#自动播放功能策略 "自动播放功能策略")

除了**上述的浏览器端管理和对自动播放功能的控制之外**，web 服务器**也可以表示愿意让自动播放功能**发挥作用。[HTTP](https://developer.mozilla.org/zh-CN/docs/Glossary/HTTP "HTTP") [Permissions-Policy](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Permissions-Policy "Permissions-Policy") 标头的 [autoplay](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Permissions-Policy/autoplay "autoplay") 指令用于控制哪些域（如果有）可用于自动播放媒体。默认情况下， `autoplay` 功能策略设置为 `'self'`（*包括单引号字符*），表示允许自动播放，因为它们与文档托管在同一域中。

你还可以指定 `'none'` 以完全禁用自动播放，`'*'` 以允许来自所有域的自动播放，或指定一个或多个可以自动播放媒体的特定来源。这些**来源由空格字符分隔。**

> **备注：**
> 指定的功能策略适用于文档以及嵌套在其中的每个 [\<iframe>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe "<iframe>")，除非这些框架包含为该框架以及嵌套在其中的所有框架设置新的功能策略的 [allow](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe#allow "allow")。

当使用 `<iframe>` 上的 [allow](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe#allow "allow") 属性指定该框架及其嵌套框架的功能策略时，你还可以指定值 `'src'` 以允许仅自动播放来自与该框架的 [src](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe#src "src") 属性指定的域相同的域的媒体。

### [示例：仅允许来自文档域的自动播放](https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide#示例：仅允许来自文档域的自动播放 "示例：仅允许来自文档域的自动播放")

使用 [Permissions-Policy](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Permissions-Policy "Permissions-Policy") 标头来仅允许媒体从文档的 [origin](https://developer.mozilla.org/zh-CN/docs/Glossary/Origin "origin") 自动播放：

```html 
Permissions-Policy: autoplay 'self'

```


对 [\<iframe>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe "<iframe>") 执行相同操作：

```html 
<iframe src="mediaplayer.html" allow="autoplay 'src'"> </iframe>

```


### [示例：允许来自特定源的自动播放](https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide#示例：允许来自特定源的自动播放 "示例：允许来自特定源的自动播放")

允许从文档（或 `<iframe>`）自己的域和 `https://example.media` 播放媒体的 `Permissions-Policy` 标头如下所示：

```markdown 
Permissions-Policy: autoplay 'self' https://example.media


```


可以编写 \<iframe> 来指定此自动播放策略应该应用于其自身，并且任何子框架都将这样编写：

```html 
<iframe
  width="300"
  height="200"
  src="mediaplayer.html"
  allow="autoplay 'src' https://example.media">
</iframe>

```


### [示例：禁用自动播放](https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide#示例：禁用自动播放 "示例：禁用自动播放")

将 `autoplay` 功能策略设置为 `'none'` 会完全禁用文档或 `<iframe>` 以及所有嵌套框架的自动播放。HTTP 标头是：

```html 
Permissions-Policy: autoplay 'none'

```


使用 `<iframe>` 的 `allow` 属性：

```html 
<iframe src="mediaplayer.html" allow="autoplay 'none'"> </iframe>

```


## [最佳实践](https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide#最佳实践 "最佳实践")

此处提供了提示和推荐的最佳实践，可帮助你充分利用自动播放功能。

### [使用媒体控件处理自动播放失败](https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide#使用媒体控件处理自动播放失败 "使用媒体控件处理自动播放失败")

自动播放的一个常见用例是自动开始播放伴随文章、广告或页面主要功能预览的视频剪辑。要自动播放此类视频，你有两种选择：没有音轨，或者有音轨但配置 [\<video>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video "<video>") 元素为静音，如下所示：

```html 
<video src="/videos/awesomevid.webm" controls autoplay muted></video>

```


该视频元素配置为包括用户控件（通常是播放/暂停、浏览视频时间线、音量控制和静音）；此外，由于包含 [muted](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video#muted "muted") 属性，视频将自动播放，但音频静音。不过，用户可以选择通过单击控件中的取消静音按钮来重新启用音频。

## [浏览器配置选项](https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide#浏览器配置选项 "浏览器配置选项")

**浏览器可能具有控制自动播放工作方式或如何处理阻止自动播放的首选项**。此处列出了对你作为 Web 开发人员可能具有特殊意义或重要性的任何此类首选项。其中包括任何可能有助于测试或调试的内容，以及任何可以以你需要准备处理的方式设置的内容。

### [Firefox](https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide#firefox "Firefox")

[media.allowed-to-play.enabled](https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide#media.allowed-to-play.enabled "media.allowed-to-play.enabled")

布尔首选项，指定 `HTMLMediaElement.allowedToPlay` 属性是否向 Web 公开。目前默认情况下这是 `false`（除了在夜间构建中，默认情况下为 `true`）。如果此值为 `false`，则 `HTMLMediaElement` 接口中缺少 allowedToPlay 属性，因此该属性不会出现在 [\<audio>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio "<audio>") 或 [\<video>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video "<video>") 元素上。

[media.autoplay.allow-extension-background-pages](https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide#media.autoplay.allow-extension-background-pages "media.autoplay.allow-extension-background-pages")

布尔首选项，如果为 `true`，则允许浏览器扩展的后台脚本自动播放音频媒体。将此值设置为 `false` 将禁用此功能。默认值是 `true`。

[media.autoplay.allow-muted](https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide#media.autoplay.allow-muted "media.autoplay.allow-muted")

布尔首选项，如果为 `true`（默认值），则允许自动播放当前静音的音频媒体。如果将其更改为 `false`，则即使静音，也不允许播放带有音轨的媒体。

[media.autoplay.block-webaudio](https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide#media.autoplay.block-webaudio "media.autoplay.block-webaudio")

布尔首选项，指示是否对 [Web Audio API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Audio_API "Web Audio API") 应用阻止自动播放。默认为 `true`。

[media.autoplay.default](https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide#media.autoplay.default "media.autoplay.default")

整数首选项，指定默认情况下是否允许（`0`）、阻止（`1`）或使用提示（`2`）的自动播放支持的每个域配置。默认值为 `0`。

[media.autoplay.enabled.user-gestures-needed](https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide#media.autoplay.enabled.user-gestures-needed "media.autoplay.enabled.user-gestures-needed")（仅每夜构建版）

布尔首选项，用于控制是否允许通过检测用户手势来覆盖 `media.autoplay.default` 的设置。如果 `media.autoplay.default` （默认情况下允许自动播放）未设为 `0`，则如果页面已被用户手势激活，则此首选项设置为 `true` 时，无论如何都允许自动播放带音轨的媒体，而不带音轨的媒体则完全不受限制。

[media.block-autoplay-until-in-foreground](https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide#media.block-autoplay-until-in-foreground "media.block-autoplay-until-in-foreground")

布尔首选项，指示在后台选项卡上启动时是否阻止媒体播放。默认值 `true` 意味着即使其他方式可用，在选项卡置于前台之前也不会进行自动播放。这可以防止出现分散注意力的情况，即选项卡开始播放声音并且用户无法在所有选项卡和窗口中找到该选项卡。
