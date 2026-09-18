# 官方组件二

## 目录

- [Image](#Image)
  - [适配](#适配)
- [KeyboardAvoidingView ](#KeyboardAvoidingView-)

# Image

[图片 · React Native 中文网 静态图片资源 https://www.react-native.cn/docs/images](https://www.react-native.cn/docs/images "图片 · React Native 中文网 静态图片资源 https://www.react-native.cn/docs/images")

## 适配

你还可以使用@2x，@3x这样的文件名后缀，来为不同的屏幕精度提供图片。比如下面这样的代码结构：&#x20;

├── button.js

└── img

├── check.png

├── <check@2x.png>

└── <check@3x.png>

并且button.js里有这样的代码：&#x20;

\<Image source={require("./img/check.png")} />&#x20;

Packager 会打包所有的图片并且依据屏幕精度提供对应的资源。譬如说，iPhone 7 会使用check\@2x.png，而 iPhone 7 plus 或是 Nexus 5 上则会使用check\@3x.png。如果没有图片恰好满足屏幕分辨率，则会自动选中最接近的一个图片。&#x20;

注意：为了使新的图片资源机制正常工作，require 中的图片名字必须是一个静态字符串（不能使用变量！因为 require 是在编译时期执行，而非运行时期执行！）。

```javascript 
 <Image source={{uri: 'file://' + path}}/>  
//本地图片
```


# KeyboardAvoidingView&#x20;

本组件用于解决一个常见的尴尬问题：手机上弹出的键盘常常会挡住当前的视图。本组件可以自动根据键盘的高度，调整自身的 height 或底部的 padding，以避免被遮挡。

[KeyboardAvoidingView · React Native 中文网 本组件用于解决一个常见的尴尬问题：手机上弹出的键盘常常会挡住当前的视图。本组件可以自动根据键盘的高度，调整自身的 height 或底部的 padding，以避免被遮挡。 https://www.react-native.cn/docs/next/keyboardavoidingview](https://www.react-native.cn/docs/next/keyboardavoidingview "KeyboardAvoidingView · React Native 中文网 本组件用于解决一个常见的尴尬问题：手机上弹出的键盘常常会挡住当前的视图。本组件可以自动根据键盘的高度，调整自身的 height 或底部的 padding，以避免被遮挡。 https://www.react-native.cn/docs/next/keyboardavoidingview")

或者参考第三方库

```javascript 
 import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
```
