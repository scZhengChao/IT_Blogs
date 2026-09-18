# 页面跳转

- staticextraNativeComponentConfig()
- goForward(); 根据 webview 的历史访问记录往前一个页面。
- goBack(); 根据 webview 的历史访问记录往后一个页面
- reload(); 刷新当前页面
- stopLoading();  停止载入当前页面

如需交互，可添加onMessage函数监听，然后在webview 内部的网页中调用 window\.postMessage 方法时可以触发此属性对应的函数，从而实现网页和 RN 之间的数据交换。网页端的 window\.postMessage 只发送一个参数 data，此参数封装在 RN 端的 event 对象中，即 event.nativeEvent.data，data 只能是一个字符串。

关于通信详细可以参考这篇文章：[《关于 React Native 与 WebView 的通信》](https://www.jianshu.com/p/b37ee000379e "《关于 React Native 与 WebView 的通信》")如在内置中打开爱奇艺，代码如下：
