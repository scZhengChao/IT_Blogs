# 简单交互

## 目录

- [react-native-webview](#react-native-webview)
  - [source={OBJ}](#sourceOBJ)
  - [javaScriptEnabled={boolean} Android](#javaScriptEnabledboolean-Android)
  - [mixedContentMode={boolean}  Android](#mixedContentModeboolean-Android)
  - [thirdPartyCookiesEnabled={boolean}   Android](#thirdPartyCookiesEnabledboolean-Android)
  - [userAgent={boolean}   Android](#userAgentboolean-Android)
  - [originWhitelist={array of strings}](#originWhitelistarray-of-strings)
  - [domStorageEnabled={ }  Android](#domStorageEnabled--Android)
  - [useWebkit={boolean}](#useWebkitboolean)
  - [allowUniversalAccessFromFileURLs={boolean}   Android](#allowUniversalAccessFromFileURLsboolean-Android)
  - [allowFileAccess={boolean}  Android](#allowFileAccessboolean-Android)
  - [injectJavaScript={function}](#injectJavaScriptfunction)
  - [nativeConfig={object}](#nativeConfigobject)

# **react-native-webview**

**例如： h5 动态设置标题 h5 和 webview 交互**

```javascript 
import{ WebView } from'react-native-webview

const   injectedJavaScript = `(function(){
    window.postMessage = function(data){
        window.ReactNativeWebView.postMessage(data)
    };
})()`

<WebView
 onMessage={ 
   event=> { 
     console.log( event.nativeEvent.data)
   }; 
 } 
/>
     //接受传参在 webview 内部的网页中调用 window.postMessage 方法时可以触发此属性对应的函数，从而实现网页和 RN 之间的数据交换。 设置此属性的同时会在 webview 中注入一个 postMessage 的全局函数并覆盖可能已经存在的同名实现。

       //网页端的 window.postMessage 只发送一个参数 data，此参数封装在 RN 端的 event 对象中，即event.nativeEvent.data。data 只能是一个字符串。
this.refs.webview.postMessage(' ')  向H5中传递消息
```


### source={OBJ}

在 WebView 中载入一段静态的 html 代码或是一个 url（还可以附带一些 header 选项）。注意如果是载入 html 代码，则需要设置

`originWhitelist`，比如可以设为\[" \*"]

来允许运行本地代码。

Load uri

1. uri： 要在WebView中加载的URI。可以是本地或远程文件。
2. method:要使用的HTTP方法。如果未指定，默认为GET。在Android上，唯一支持的方法是GET和POST
3. headers: 附加的HTTP头发送与请求。在Android上，这只能用于GET请求。
4. body:与请求一起发送的HTTP正文。这必须是一个有效的UTF-8字符串，并将完全按照指定的方式发送，不应用额外的编码(例如URL-escaping or base64)。在Android上，这只能用于POST请求。

Static HTML

1. html:  在WebView中显示的静态HTML页面。
2. baseUrl: 用于HTML中任何相关链接的基本URL。

### javaScriptEnabled={boolean} Android

布尔值，控制是否启用 JavaScript。仅在安卓下使用，因为 IOS 默认为启用 JavaScript。默认值为true。

### mixedContentMode={boolean}  Android

指定混合内容模式。即 WebView 是否应该允许安全链接（https）页面中加载非安全链接（http）的内容,

- never (默认) - WebView 不允许安全链接页面中加载非安全链接的内容
- always - WebView 允许安全链接页面中加载非安全链接的内容。
- compatibility - WebView 会尽量和浏览器当前对待此情况的行为一致

### thirdPartyCookiesEnabled={boolean}   Android

/布尔值，是否启用第三方 cookie。仅在安卓 Lollipop 版本或以上使用，因为安卓 Kitkat 以下版本和 IOS 系统默认都启用第三方 cookie。 默认为 true。

### userAgent={boolean}   Android

设置 WebView的 user agent 字符串。目前仅支持 Android。

### originWhitelist={array of strings}

     //  允许导航到的原始字符串列表。字符串允许通配符，并仅对原始URL(而不是完整URL)进行匹配。如果用户点击导航到一个新页面，但是这个新页面不在这个白名单中，那么这个URL将由操作系统处理。默认的白名单开头是“http\://”和“https\://”。

### domStorageEnabled={ }  Android

//仅限 Android 平台。指定是否开启 DOM 本地存储。

### useWebkit={boolean}

设置 true 的时候会使用新的 WKWebView 来代替老的 UIWebView。

### allowUniversalAccessFromFileURLs={boolean}   Android

布尔值，设置是否应该允许在文件模式URL上下文中运行的JavaScript访问来自任何来源的内容。包括访问来自其他文件模式url的内容。默认值为false。

### allowFileAccess={boolean}  Android

设置在文件模式下运行的JavaScript是否应该是布尔值，设置WebView是否有访问文件系统的权限。默认值为false。

### injectJavaScript={function}

在网页加载完成之后，还可以主动调用此方法（以 ref 形式调用）继续给 WebView 注入 JS 代码。注入后会立即执行

区别于`injectedJavaScript`  持续调用 H5 API

```javascript 
injectedJavaScript ={string}

//设置 js 字符串，在网页加载之前注入的一段 JS 代码。
```


### nativeConfig={object}

```javascript 
//覆盖渲染 WebView 的原生组件。启用一个 js 和初始 WebView 一样的定制的原生 WebView。

The nativeConfig prop expects an object with the following keys:

- component (any)
- props (object)
- viewManager (object)
```
