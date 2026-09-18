# 调用设备

## 目录

- [dataDetectorTypes={string or arra} iOS](#dataDetectorTypesstring-or-arra-iOS)
- [geolocationEnabled={boolean}  Android](#geolocationEnabledboolean-Android)
- [onShouldStartLoadWithRequest={boolea}   iOS](#onShouldStartLoadWithRequestboolea-iOS)

### dataDetectorTypes={string or arra} iOS

检测 webview 内容，并将指定类型的数据变成可点击的 URL。默认只对手机号码进行变换。

你可以提供单一类型或者数组类型。

可用的 dataDetectorTypes 如下:

- phoneNumber
- link
- address
- calendarEvent
- none
- all

如果启用新的[WKWebView](https://reactnative.cn/docs/webview#usewebkit "WKWebView")实现，还有额外的三个值可用：

- trackingNumber
- flightNumber
- lookupSuggestion

### geolocationEnabled={boolean}  Android

设置是否在WebView中启用地理位置。默认值为false。仅在Android中使用。

### onShouldStartLoadWithRequest={boolea}   iOS

//允许为 webview 发起的请求运行一个自定义的处理函数。返回 true 或 false 表示是否要继续执行响应的请求。

比如允许 H5调起 拨打电话地图都Linking
