# 本地文件html/css/js

## 目录

- [思路](#思路)
  - [创建文件](#创建文件)
  - [配置打包时候copy资源](#配置打包时候copy资源)
    - [android配置](#android配置)

[   https://juejin.cn/post/7254572372137050149](https://juejin.cn/post/7254572372137050149 "   https://juejin.cn/post/7254572372137050149")

## 思路

将html及其相关资源放在一个文件夹下面，打包的时候直接复制到apk或者ipa包里面，然后webview访问本地路径加载html

### 创建文件

创建一个文件夹`public/webview`,文件夹名字可以随便起,在我项目里面public用于放置需要被copy到apk或ipa包里面的资源

![](./assets/image/image_Hj7kzjuTQY.png)

我们可以看到webview文件夹里面的结构很像以前前端没有工程化的时候的目录结构，对于现在有工程化的项目，那就是把打包好的文件放过来就可以了

### 配置打包时候copy资源

#### android配置

在`android/app/build.gradle`文件中添加如下代码

```groovy 
...
android{
    ...
    sourceSets { 
        main {
            assets.srcDirs = ['src/main/assets', '../../public']
        }
    } 
}

```


`src/main/assets`是**android默认的资源路径，**全路径是这样的`android/app/src/main/assets`；`../../public`是我们刚刚添加的public文件夹，这个配置会告诉app,在**打包的时候把public文件夹下的资源复制包**中，注意public文件夹不会被复制

在使用的时候就可以通过这个路径来访问资源：

```react tsx 
const Demo=()=>{
    <WebView
    originWhitelist={['*']}
    scalesPageToFit={false}
    useWebKit={true}
    javaScriptEnabled
    source={{uri: 'file:///android_asset/webview/index.html'}}/>
}

```


[ rn 使用webview访问本地静态网页（只适配android端）\_react-native放置静态网页在本地-CSDN博客 文章浏览阅读567次。1. 在页面放置webview组件import React, {Component} from 'react'import {WebView} from 'react-native-webview'export default class MyWeb extends Component {  render() {    return (      \<WebView       https://blog.csdn.net/weixin\_42353499/article/details/109285772](https://blog.csdn.net/weixin_42353499/article/details/109285772 " rn 使用webview访问本地静态网页（只适配android端）_react-native放置静态网页在本地-CSDN博客 文章浏览阅读567次。1. 在页面放置webview组件import React, {Component} from 'react'import {WebView} from 'react-native-webview'export default class MyWeb extends Component {  render() {    return (      <WebView       https://blog.csdn.net/weixin_42353499/article/details/109285772")

![](./assets/image/image_64x5poS03Y.png)
