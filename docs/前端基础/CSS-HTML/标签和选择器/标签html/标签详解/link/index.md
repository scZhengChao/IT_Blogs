# link

## 目录

- [属性](#属性)
  - [as](#as)
  - [blocking实验性](#blocking实验性)
  - [crossorigin](#crossorigin)
  - [disabled](#disabled)
  - [fetchpriority](#fetchpriority)
  - [href](#href)
  - [hreflang](#hreflang)
  - [imagesizes](#imagesizes)
  - [imagesrcset](#imagesrcset)
  - [integrity](#integrity)
  - [media](#media)
  - [rel](#rel)
  - [sizes](#sizes)
  - [title](#title)
  - [type](#type)
- [示例](#示例)
  - [包含样式表](#包含样式表)
  - [提供替代样式表](#提供替代样式表)
  - [提供用于不同用法上下文的图标](#提供用于不同用法上下文的图标)
  - [通过媒体查询有条件地加载资源](#通过媒体查询有条件地加载资源)
  - [样式表加载事件](#样式表加载事件)
  - [预加载示例](#预加载示例)
  - [在获取资源前阻止渲染](#在获取资源前阻止渲染)

[HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML "HTML")\*\*`<link>`\*\*元素规定了\*\*当前文档与某个外部资源的关系。\*\*该元素最常用于链接[样式表](https://developer.mozilla.org/zh-CN/docs/Glossary/CSS "样式表")，此外也可以被用来创建站点图标

```html 
<link href="main.css" rel="stylesheet" />

```


在这个简单的示例中，使用了`href`属性设置外部资源的路径，并设置[rel](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel "rel")属性的值为`stylesheet`。`rel`**表示“关系”**，它可能是`<link>`元素其中一个关键的特性——属性值表示`<link>`项**的链接方式与包含它的文档之间的关系。**

这里有一些你经常遇到的其他类型。例如，这里是一个网站图标的链接：

```html 
<link rel="icon" href="favicon.ico" />

```


还有一些其他的与图标相关的`rel`值，主要**用于表示不同移动平台上特殊的图标类型**，例如：

```html 
<link
  rel="apple-touch-icon"
  sizes="114x114"
  href="apple-icon-114.png"
  type="image/png" />

```


`sizes`属性表示图标大小，`type`属性包含了链接资源的 MIME 类型。这些**属性为浏览器选择最合适的图标提供了有用的提示。**

你也可以在`media`属性中**提供媒体类型或查询；这种资源将只在满足媒体条件的情况下才会加载**。例如：

```html 
<link href="print.css" rel="stylesheet" media="print" />
<link
  href="mobile.css"
  rel="stylesheet"
  media="screen and (max-width: 600px)" />

```


`<link>`也加入了一些新的**有意思的性能和安全特性**。举例如下：

```html 
<link
  rel="preload"
  href="myFont.woff2"
  as="font"
  type="font/woff2"
  crossorigin="anonymous" />

```


将`rel`设定为`preload`，表示浏览器应该预加载该资源（參见[rel="preload"](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel/preload "rel=\"preload\"")以获得详细信息）。`as`属性表示获取特定的内容类。`crossorigin`属性表示**该资源是否应该使用一个**[**CORS**](https://developer.mozilla.org/zh-CN/docs/Glossary/CORS "CORS")**请求来获取**。

其他使用说明：

- `<link>`元素可以出现在[\<head>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/head "<head>")元素或[\<body>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/body "<body>")元素中，具体取决于它是否有一个**body-ok**的[链接类型](https://html.spec.whatwg.org/multipage/links.html#body-ok "链接类型")。例如，`stylesheet`链接类型是 body-ok 的，因此`<link rel="stylesheet">`允许出现在 body 中。然而，这不是一种好的可遵循的实践方式；更合理的方式是，将你的`<link>`元素从你的 body 内容中分离出来，将其放在`<head>`中。
- 当使用`<link>`为网站创建一个 favicon 时，你的网站使用内容安全策略（CSP）来增强它的安全性，这种策略适用于 favicon。如果你遇到 favicon 未加载的问题，验证[Content-Security-Policy](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Content-Security-Policy "Content-Security-Policy")标头的[img-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/img-src "img-src")[指令](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/img-src "指令")没有在阻止对它的访问。
- HTML 和 XHTML 规范为`<link>`元素定义了一些事件处理器，但是对于它们的使用方法不明确。
- 在 XHTML 1.0 下，像`<link>`这样的[空元素](https://developer.mozilla.org/zh-CN/docs/Glossary/Void_element "空元素")需要一个尾斜杠：`<link />`。
- WebTV 支持`rel`使用`next`值，用于在一个文档系列中预加载下一页。

## [属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#属性 "属性")

这个元素包含使用[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes "全局属性")。

#### [as](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#as "as")

**当在**\*\*`<link>`\*\***元素上设置了**[**rel="preload"**](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel/preload "rel=\"preload\"")**时，该属性为必填属性；** ​**当设置了**[**rel="modulepreload"**](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/modulepreload "rel=\"modulepreload\"")**时，该属性为可选属性**，**否则不应使用。** 它指定了`<link>`正在加载的内容类型，这对于匹配请求、应用正确的[内容安全策略](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/CSP "内容安全策略")和设置正确的[Accept](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Accept "Accept")请求标头都是必要的。此外，`rel="preload"`将其用作请求优先级的信号。下表列出了该属性的有效值及其适用的元素或资源。

| 值        | 可应用于                                                                                                                                                                                |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| audio    | \`\<audio>\`元素                                                                                                                                                                      |
| document | \`\<iframe>\`和\`\<frame>\`元素                                                                                                                                                        |
| embed    | \`\<embed>\`元素                                                                                                                                                                      |
| fetch    | fetch、XHR  **备注：** 此值需要`<link>`包含跨源属性，参见\[启用 CORS 的获取请求]\(<https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel/preload#启用_cors_的获取请求> "启用 CORS 的获取请求")。      |
| font     | CSS @font-face  **备注：** 此值需要`<link>`包含跨源属性，参见\[启用 CORS 的获取请求]\(<https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel/preload#启用_cors_的获取请求> "启用 CORS 的获取请求")。 |
| image    | 含有 srcset 或 imageset 属性的`<img>`和`<picture>`元素、SVG`<image>`元素、CSS` *-image`规则                                                                                                        |
| object   | \`\<object>\`元素                                                                                                                                                                     |
| script   | \`\<script>\`元素、Worker\`importScripts\`                                                                                                                                             |
| style    | \`\<link rel=stylesheet>\`元素、CSS\`@import\`                                                                                                                                         |
| track    | \`\<track>\`元素                                                                                                                                                                      |
| video    | \`\<video>\`元素                                                                                                                                                                      |
| worker   | Worker、SharedWorker                                                                                                                                                                 |

#### [blocking](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#blocking "blocking")[实验性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#blocking "实验性")

该属性明确表示在**获取外部资源时应阻止某些操作**。它只能在`rel`属性包含`expect`或`stylesheet`关键字时才能使用。要阻止的操作必须是下面列出的以空格分隔的阻止标记列表。

- `render`：屏幕上的内容渲染被阻止。

#### [crossorigin](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/crossorigin "crossorigin")

该[枚举](https://developer.mozilla.org/zh-CN/docs/Glossary/Enumerated "枚举")属性表示在获取资源时**是否必须使用**[**CORS**](https://developer.mozilla.org/zh-CN/docs/Glossary/CORS "CORS")。[启用 CORS 的图像](https://developer.mozilla.org/zh-CN/docs/Web/HTML/How_to/CORS_enabled_image "启用 CORS 的图像")可以在[\<canvas>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/canvas "<canvas>")元素中重复使用，而不会受到*污染*。允许的值如下：

- [anonymous](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#anonymous "anonymous")

  会发起一\*\*个跨源请求（即包含`Origin`HTTP 标头），但不会发送任何认证信息（\*\*即不发送 cookie、X.509 证书和 HTTP 基本认证信息）。如果服务器没有给出源站凭证（不设置`Access-Control-Allow-Origin`HTTP 标头），资源就会被污染并限制使用。
- [use-credentials](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#use-credentials "use-credentials")

  会发起一个\*\*带有认证信息（进行 cookie、X.509 证书和/或 HTTP 基本认证）的跨域请求（即包含`Origin`\*\***HTTP 标头**）。如果服务器没有给出源站凭证（不设置`Access-Control-Allow-Origin`HTTP 标头），资源就会被*污染*并限制使用。

当不设置此属性时，资源将会不使用[CORS](https://developer.mozilla.org/zh-CN/docs/Glossary/CORS "CORS")加载（即不发送`Origin`HTTP 标头），从而无法使用该资源。若设置了非法的值，则视为使用**anonymous**枚举关键字。前往[CORS 设置属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/crossorigin "CORS 设置属性")获取更多信息。

#### [disabled](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#disabled "disabled")

仅对于`rel="stylesheet"`而言，`disabled`布尔属性表示是否应加载所述样式表并将其应用于文档。如果在加载 HTML 时指定了`disabled`，则在页面加载过程中不会加载样式表。相反，如果将`disabled`属性更改为`false`或删除该属性，将按需加载样式表。

在 DOM 中设置`disabled`属性会导致样式表从文档的[Document.styleSheets](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/styleSheets "Document.styleSheets")列表中删除。

#### [fetchpriority](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#fetchpriority "fetchpriority")

为获取预加载资源时使用的相对优先级提供提示。允许的值：

- [high](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#high "high")

  表示相对于其他同类型资源，以高优先级获取。
- [low](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#low "low")

  表示相对于其他同类型资源，以低优先级获取。
- [auto](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#auto "auto")

  默认值：表示自动确定相对于其他同类型资源的取值优先级。

#### [href](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#href "href")

此属性指定被链接资源的[URL](https://developer.mozilla.org/zh-CN/docs/Glossary/URL "URL")。URL 可以是绝对的，也可以是相对的。

#### [hreflang](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#hreflang "hreflang")

此属性指明了被链接资源的语言。其意义仅供参考。可取的值参见[RFC 5646: 语言识别标签（又称 BCP 47）](https://datatracker.ietf.org/doc/html/rfc5646 "RFC 5646: 语言识别标签（又称 BCP 47）")。仅当设置了[href](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/a#href "href")属性时才应设置该属性。

#### [imagesizes](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#imagesizes "imagesizes")

仅适用于`rel="preload"`和`as="image"`，`imagesizes`属性具有与[sizes](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/img#sizes "sizes")属性类似的语法和语义，表示要预载`img`元素使用的适当资源，其`srcset`和`sizes`属性具有相应的值。

#### [imagesrcset](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#imagesrcset "imagesrcset")

仅适用于`rel="preload"`和`as="image"`，`imagesrcset`属性具有与[srcset](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/img#srcset "srcset")属性类似的语法和语义，表示要预载`img`元素使用的适当资源，其`srcset`和`sizes`属性具有相应的值。

#### [integrity](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#integrity "integrity")

包含内联元数据——（你要求浏览器获取的）资源（文件）的以 base64 编码的密码散列值。浏览器可以使用这一点来验证所获取的资源是否已被传输且没有遭到意外的修改。该属性只有在指定了`rel`属性为`stylesheet`、`preload`或`modulepreload`时才能指定。参见[子资源完整性](https://developer.mozilla.org/zh-CN/docs/Web/Security/Subresource_Integrity "子资源完整性")。

#### [media](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#media "media")

该属性**指定链接资源适用的媒体。****其值必须是媒体类型或**[**媒体查询**](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_media_queries "媒体查询")。该属性主要用于链接外部样式表——它允许**用户代理选择最适合其运行设备的样式表。**

[referrerpolicy](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#referrerpolicy "referrerpolicy")

一个字符串，表示**在获取资源时使用哪个 referrer**：

- `no-referrer`表示将不会发送[Referer](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Referer "Referer")标头。
- `no-referrer-when-downgrade`表示在不使用 TLS（HTTPS）的情况下导航到源时，不会发送[Referer](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Reference/Headers/Referer "Referer")标头信息。如果未指定其他策略，这是用户代理的默认行为。
- `origin`意味着 referrer 网址将是页面的源，大致是协议、主机和端口。
- `origin-when-cross-origin`这意味着导航到其他来源将仅限于协议、主机和端口，而在同一源上导航将包括 referrer 的路径。
- `unsafe-url`意味着 `referrer` 网址将包含源和路径（但不包括片段、密码或用户名）。这种情况是不安全的，因为它可能会将源和路径从受 TLS 保护的资源泄漏到不安全的源。

#### [rel](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel "rel")

此属性**命名链接文档与当前文档的关系**。该属性必须是[链接类型值](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel "链接类型值")的用空格分隔的列表。

#### [sizes](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#sizes "sizes")

这个属性定义了包含相应资源的可视化媒体中的图标的大小。**只有在**[**rel**](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#rel "rel")**包含**\*\*`icon`****或诸如 Apple 的****`apple-touch-icon`\*\***等非标准类型的值时，它才可以存在。它可能具有如下值：**

- `any`表示图标可以按矢量格式缩放到任意大小，例如`image/svg+xml`。
- 一个由空白符分隔的尺寸列表。每一个都以`<像素宽度>x<像素高度>`或`<像素宽度>X<像素高度>`给出。尺寸列表中的每一个尺寸都必须包含在资源里。

> **备注：** 大多数的图标格式只能存储一个图标。因此绝大多数使用[sizes](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#sizes "sizes")时只包含一个值。微软的 ICO 格式和苹果的 ICNS 格式可以在一个文件中存储多个图标尺寸。ICO 具有更好的浏览器支持，因此如果需要跨浏览器支持，应使用这种格式。

#### [title](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#title "title")

`title`属性在`<link>`元素上有**特殊的语义**。当用于`<link rel="stylesheet">`时，它**定义了一个**[**默认样式表或备用样式表**](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel/alternate_stylesheet "默认样式表或备用样式表")**。**

#### [type](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#type "type")

这个属性被**用于定义链接的内容的类型**。这个属性的值应该是**类似于text/html、text/css这样的 MIME 类型**。该属性的通常用法是定义被引用的样式表类型（如**text/css**），但由于 CSS 是网络上使用的唯一样式表语言，因此不仅可以省略`type`属性，而且现在已成为推荐做法。它还用于`rel="preload"`链接类型，以确保浏览器只下载其支持的文件类型。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#示例 "示例")

### [包含样式表](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#包含样式表 "包含样式表")

要在页面中包含样式表，请使用以下语法：

```html 
<link href="style.css" rel="stylesheet" />

```


### [提供替代样式表](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#提供替代样式表 "提供替代样式表")

你也可以指定[替代外部样式表](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel/alternate_stylesheet "替代外部样式表")。

用户可以从**查看 > 页面样式**菜单中选择要使用的样式表。这样，用户就可以看到一个页面的多个版本。

```html 
<link href="default.css" rel="stylesheet" title="默认样式" />
<link href="fancy.css" rel="alternate stylesheet" title="精美样式" />
<link href="basic.css" rel="alternate stylesheet" title="基本样式" />

```


### [提供用于不同用法上下文的图标](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#提供用于不同用法上下文的图标 "提供用于不同用法上下文的图标")

你可以在同一页面上包含指向多个不同图标的链接，浏览器将使用`rel`和`sizes`值作为提示来选择最适合其特定上下文的图标。

```html 
<!-- 配备高分辨率 Retina 显示屏的 iPad Pro: -->
<link
  rel="apple-touch-icon"
  sizes="167x167"
  href="/apple-touch-icon-167x167.png" />
<!-- 3x 分辨率的 iPhone： -->
<link
  rel="apple-touch-icon"
  sizes="180x180"
  href="/apple-touch-icon-180x180.png" />
<!-- 非 Retina iPad、iPad mini，等等： -->
<link
  rel="apple-touch-icon"
  sizes="152x152"
  href="/apple-touch-icon-152x152.png" />
<!-- 2x 分辨率的 iPhone 和其他设备： -->
<link rel="apple-touch-icon" href="/apple-touch-icon-120x120.png" />
<!-- 基本的 favicon -->
<link rel="icon" href="/favicon.ico" />

```


有关为苹果设备的图标选择什么尺寸（`sizes`）的信息，请参阅[苹果关于配置 Web 应用程序的文档](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html#//apple_ref/doc/uid/TP40002051-CH3-SW4 "苹果关于配置 Web 应用程序的文档")和引用的[苹果人机界面指南](https://developer.apple.com/design/human-interface-guidelines/app-icons#App-icon-sizes "苹果人机界面指南")。通常，提供一个大图像（如 192x192）并让浏览器根据需要缩小它就足够了，但你可能想为不同尺寸提供细节级别不同的图像，正如苹果设计指南建议的那样。为较低分辨率提供较小的图标也可以节省带宽。

可能根本不需要提供`<link>`元素。例如，浏览器会自动从站点的根目录请求`/favicon.ico`，苹果设备也会自动请求`/apple-touch-icon-[size].png`、`/apple-touch-icon.png`等。但是，提供明确的链接可以防止这些约定发生变化。

### [通过媒体查询有条件地加载资源](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#通过媒体查询有条件地加载资源 "通过媒体查询有条件地加载资源")

你可以在`media`属性中提供媒体类型或查询；然后，**只有在媒体条件为真时，才会加载此资源**。例如：

```html 
<link href="print.css" rel="stylesheet" media="print" />
<link href="mobile.css" rel="stylesheet" media="all" />
<link
  href="desktop.css"
  rel="stylesheet"
  media="screen and (min-width: 600px)" />
<link
  href="highres.css"
  rel="stylesheet"
  media="screen and (min-resolution: 300dpi)" />

```


### [样式表加载事件](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#样式表加载事件 "样式表加载事件")

你能够通过监听发生在样式表上的`load`事件\*\*知道什么时候样式表加载完毕。同样的，你能够通过监听`error`\*\***事件检测到是否在加载样式表的过程中出现错误。**

```html 
<script>
  const stylesheet = document.getElementById("my-stylesheet");

  stylesheet.onload = () => {
    // 做点有意思的事情，样式表已经加载了
  };

  stylesheet.onerror = () => {
    console.log("加载样式表时发生错误！");
  };
</script>

```


**备注：** 一旦加载并解析了样式表及其所有导入内容，并在开始将样式应用到内容之前，`load`事件就会触发。

### [预加载示例](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#预加载示例 "预加载示例")

你可以在[使用](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel/preload "使用")[rel="preload"](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel/preload "rel=\"preload\"")[预加载内容](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/rel/preload "预加载内容")找到很多`<link rel="preload">`的详细示例。

### [在获取资源前阻止渲染](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link#在获取资源前阻止渲染 "在获取资源前阻止渲染")

可以在`blocking`属性中包含`render`标记；页面的渲染将被阻止，直到资源被获取。例如：

```html 
<link blocking="render" rel="stylesheet" href="example.css" crossorigin />

```
