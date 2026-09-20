# React Native => WebView

## 目录

- [injectedJavaScript](#injectedJavaScript)
- [postMessage](#postMessage)

##### `injectedJavaScript`

`injectedJavaScript`可以在webview加载完页面后执行js，注意传入的是字符串。在iOS上还必须加上`onMessage`属性，否则不能触发。重新build之后，就可以看到效果了。类似的，还有一个`injectedJavaScriptBeforeContentLoaded`属性，不同点是这个属性的方法会在页面加载前触发。

```javascript 
import { SafeAreaView, Platform } from 'react-native'
import WebView from 'react-native-webview'

const App = () => {
  const runFirst = `const el = document.getElementById('run-first');
  el.innerText = 'run first!'`

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <WebView
        source={{
          uri: `${
            Platform.OS === 'android' ? 'file:///android_asset/' : ''
          }Web.bundle/index_.html`,
        }}
        originWhitelist={['*']}
        style={{
          flex: 1,
        }}
        injectedJavaScript={runFirst}
        onMessage={() => {}}
      />
    </SafeAreaView>
  )
}

export default App

```


##### `postMessage`

`postMessage`可以让我们手动触发发送数据到`webview`，注意发送的数据必须为字符串类型，在`webview`中通过`data`字段接收。

在rn组件中创建`refWebView`绑定到`WebView`上，并通过调用`postMessage`向`webview`发送数据

```javascript 
import { SafeAreaView, Platform, View, Pressable, Text } from 'react-native'
import WebView from 'react-native-webview'
import { useRef } from 'react'

const App = () => {
  const runFirst = `const el = document.getElementById('run-first');
  el.innerText = 'run first!'`

  const refWebView = useRef<WebView | null>(null)

  const onPress = () => {
    refWebView.current.postMessage('message from react native')
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <View>
        <Pressable onPress={onPress}>
          <Text>Post Message</Text>
        </Pressable>
      </View>
      <WebView
        ref={refWebView}
        source={{
          uri: `${
            Platform.OS === 'android' ? 'file:///android_asset/' : ''
          }Web.bundle/index_.html`,
        }}
        originWhitelist={['*']}
        style={{
          flex: 1,
        }}
        injectedJavaScript={runFirst}
        onMessage={() => {}}
      />
    </SafeAreaView>
  )
}

```


index.html

```javascript 
<script>
   document.addEventListener('message', (msg) => {
    const el = document.getElementById('run-first')
    el.innerText = msg.data
  })
   window.addEventListener('message', (msg) => {
    const el = document.getElementById('run-first')
    el.innerText = msg.data
  })
</script>
```


可以看到，分别用`document`和`window`注册了两遍事件，这其实因为`document.addEventListener`在iOS平台无效。查看源码[/apple /RNCWebViewImpl.m](https://link.juejin.cn/?target=https://github.com/react-native-webview/react-native-webview/blob/2c44da2f932d3a1ebc5fd05784c6eaa315a78d04/apple/RNCWebViewImpl.m "/apple /RNCWebViewImpl.m")

```javascript 
- (void)postMessage:(NSString *)message
{
  NSDictionary *eventInitDict = @{@"data": message};
  NSString *source = [
    NSString stringWithFormat:@"window.dispatchEvent(new MessageEvent('message', %@));",
    RCTJSONStringify(eventInitDict, NULL)
  ];
  [self injectJavaScript: source];
}

```


可以看到，使用了`window.dispatchEvent`来**派发事件，所以为了兼容iOS**需要用`window.addEventListener`来监听事件。现在，点击`post Message`按钮，就可以看到我们发送的消息出现在webview中了！
