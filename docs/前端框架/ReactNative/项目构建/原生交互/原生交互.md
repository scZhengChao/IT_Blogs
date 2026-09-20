# 原生交互

## 目录

- [js调用原生 方法](#js调用原生-方法)

# js调用原生 方法

requireNativeComponent     NativeModules

[  https://www.react-native.cn/docs/0.63/native-components-android#5-%E5%AE%9E%E7%8E%B0%E5%AF%B9%E5%BA%94%E7%9A%84-javascript-%E6%A8%A1%E5%9D%97](https://www.react-native.cn/docs/0.63/native-components-android#5-%E5%AE%9E%E7%8E%B0%E5%AF%B9%E5%BA%94%E7%9A%84-javascript-%E6%A8%A1%E5%9D%97 "  https://www.react-native.cn/docs/0.63/native-components-android#5-%E5%AE%9E%E7%8E%B0%E5%AF%B9%E5%BA%94%E7%9A%84-javascript-%E6%A8%A1%E5%9D%97")

[  https://www.react-native.cn/docs/0.63/custom-webview-android#javascript-interface](https://www.react-native.cn/docs/0.63/custom-webview-android#javascript-interface "  https://www.react-native.cn/docs/0.63/custom-webview-android#javascript-interface")

[ 两篇文章搞定ReactNative之搞定ReactNative View View组件是ReactNative的最基础组件，所有ReactNative UI都需要在View的基础上开发。View组件支持Flexbox布局、样式以及触摸事件... https://www.jianshu.com/p/959cc7f44f4f](https://www.jianshu.com/p/959cc7f44f4f " 两篇文章搞定ReactNative之搞定ReactNative View View组件是ReactNative的最基础组件，所有ReactNative UI都需要在View的基础上开发。View组件支持Flexbox布局、样式以及触摸事件... https://www.jianshu.com/p/959cc7f44f4f")

[ Android 原生UI组件 · React Native 中文网 在如今的 App 中，已经有成千上万的原生 UI 部件了——其中的一些是平台的一部分，另一些可能来自于一些第三方库，而且可能你自己还收藏了很多。React Native 已经封装了大部分最常见的组件，譬如ScrollView和TextInput，但不可能封装全部组件。而且，说不定你曾经为自己以前的 App 还封装过一些组件，React Native 肯定没法包含它们。幸运的是，在 React Na https://www.react-native.cn/docs/0.64/native-components-android](https://www.react-native.cn/docs/0.64/native-components-android " Android 原生UI组件 · React Native 中文网 在如今的 App 中，已经有成千上万的原生 UI 部件了——其中的一些是平台的一部分，另一些可能来自于一些第三方库，而且可能你自己还收藏了很多。React Native 已经封装了大部分最常见的组件，譬如ScrollView和TextInput，但不可能封装全部组件。而且，说不定你曾经为自己以前的 App 还封装过一些组件，React Native 肯定没法包含它们。幸运的是，在 React Na https://www.react-native.cn/docs/0.64/native-components-android")

```javascript 
import  {
  requireNativeComponent,
  DeviceEventEmitter,
  Text,
  UIManager,
  findNodeHandle,
} from 'react-native'
const KBCameraView = requireNativeComponent('KBCameraView')

public toggleTorch=(flag:'1'|'0')=>{
    // this.scanRef.current.toggleTorch?.(flag)
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager.getViewManagerConfig('KBCameraView').Commands.toggleTorch,
      ['1']
    )
  }
```
