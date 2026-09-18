# The certificate authority is not trusted

> **解决https 证书问题**

[ Error Code: 3 SSL Error : The certificate authority is not trusted in React Native Web View ( Android ) · Issue #2655 · react-native-webview/react-native-webview · GitHub I released a production Android app this week(20.08.2022) but had trouble with the SSL Error Handler. ( "react-native-webview": "^11.0.2" ) As a solution, I have to allow trusted URLs to avoid the err https://github.com/react-native-webview/react-native-webview/issues/2655](https://github.com/react-native-webview/react-native-webview/issues/2655 " Error Code: 3 SSL Error : The certificate authority is not trusted in React Native Web View ( Android ) · Issue #2655 · react-native-webview/react-native-webview · GitHub I released a production Android app this week(20.08.2022) but had trouble with the SSL Error Handler. ( \"react-native-webview\": \"^11.0.2\" ) As a solution, I have to allow trusted URLs to avoid the err https://github.com/react-native-webview/react-native-webview/issues/2655")

```javascript 

In v 13.6.3, To make this change you have to go  node_modules/react-native-webview/android/src/main/java/com/reactnativecommunity/webview/RNCWebViewClient.java . By default, its handler.cancel(). Change it to proceed().

```@Override
public void onReceivedSslError(final WebView webView, final SslErrorHandler handler, final SslError error) {
    String topWindowUrl = webView.getUrl();
    String failingUrl = error.getUrl();

    handler.proceed(); // cancel ```
 


```
