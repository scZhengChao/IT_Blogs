# WebView => React Native

从WebView发送数据到RN，使用`window.ReactNativeWebView.postMessage`。同样的，只能发送字符串类型，rn组件中使用`onMessage`来接收。

`index.html`中新增一个`send message`按钮，绑定`sendMessage`方法。

```javascript 
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <p id="run-first">empty</p>
  <p>Hello,React Native WebView</p>
  <button onclick="sendMessage()">send Message</button>
</body>
<style>
  body {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
<script>
  const sendMessage = () => {
    window.ReactNativeWebView.postMessage('message from webview')
  }
  document.addEventListener('message', (msg) => {
    const el = document.getElementById('run-first')
    el.innerText = msg.data
  })
  window.addEventListener('message', (msg) => {
    const el = document.getElementById('run-first')
    el.innerText = msg.data
  })
</script>
</html>

```


在rn组件中，使用onMessage监听，并通过设置状态直接反映到屏幕上。

```javascript 
import { SafeAreaView, Platform, View, Pressable, Text } from 'react-native'
import WebView from 'react-native-webview'
import { useRef, useState } from 'react'

const App = () => {
  const runFirst = `const el = document.getElementById('run-first');
  el.innerText = 'run first!'`

  const refWebView = useRef<WebView | null>(null)

  const onPress = () => {
    refWebView.current.postMessage('message from react native')
  }

  const [msgFromWV, setMsgFromWV] = useState('')

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
        <Text>{msgFromWV}</Text>
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
        onMessage={event => {
          setMsgFromWV(event.nativeEvent.data)
        }}
      />
    </SafeAreaView>
  )
}

export default App

```


如图，我们从webview发送的数据正常地反映出来了！
