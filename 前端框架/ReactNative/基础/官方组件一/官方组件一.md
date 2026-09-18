# 官方组件一

## 目录

- [TextInput](#TextInput)
  - [过滤：](#过滤)
  - [props:](#props)
  - [输入纯数字](#输入纯数字)
- [stylesheet](#stylesheet)
- [StatusBar](#StatusBar)
  - [通用属性介绍](#通用属性介绍)
  - [仅支持iOS的属性](#仅支持iOS的属性)
    - [    1.barStyle](#-1barStyle)
    - [  2.networkActivityIndicatorVisible](#2networkActivityIndicatorVisible)
    - [    3.showHideTransition](#-3showHideTransition)
  - [仅支持Android的属性](#仅支持Android的属性)
    - [    1.backgroundColor（ios无法改变背景颜色）](#-1backgroundColorios无法改变背景颜色)
    - [    2.translucent](#-2translucent)
    - [    3.StatusBar.currentHeight](#-3StatusBarcurrentHeight)
  - [不同平台下状态栏的处理](#不同平台下状态栏的处理)
    - [    1、Android 手机状态栏](#-1Android-手机状态栏)
    - [    2、iOS 手机状态栏](#-2iOS-手机状态栏)
  - [statusBar高度的获取](#statusBar高度的获取)
  - [不同平台下状态栏的处理](#不同平台下状态栏的处理)
    - [1.Android 手机状态栏](#1Android-手机状态栏)
    - [2.iOS 手机状态栏](#2iOS-手机状态栏)
- [SafeAreaView](#SafeAreaView)
- [Dimension](#Dimension)
- [Text](#Text)
  - [numberOfLines](#numberOfLines)
  - [ellipsizeMode](#ellipsizeMode)
- [ImageBackground](#ImageBackground)
- [FlatList](#FlatList)
  - [ListEmptyComponent](#ListEmptyComponent)
  - [keyExtractor](#keyExtractor)
  - [refreshing](#refreshing)
  - [scrollToIndex](#scrollToIndex)
  - [initialNumToRender](#initialNumToRender)
  - [initialScrollIndex](#initialScrollIndex)
  - [getItemLayout](#getItemLayout)
  - [高度不确定时的getItemLayout](#高度不确定时的getItemLayout)
  - [FlatList动态高度大小](#FlatList动态高度大小)
- [RefreshControl](#RefreshControl)
- [Platform](#Platform)
  - [Platform.select()](#Platformselect)
  - [Version](#Version)
  - [减少代码，解构ios和android](#减少代码解构ios和android)
- [View](#View)
  - [props：](#props)
    - [onLayout](#onLayout)

# **TextInput**

**TextInput是一个允许用户输入文本的基础组件。它有一个名为onChangeText的属性，此属性接受一个函数，而此函数会在文本变化时被调用。另外还有一个名为onSubmitEditing的属性，会在文本被提交后（用户按下软键盘上的提交键）调用。**

```javascript 
import React, { Component } from 'react';

import { AppRegistry, Text, TextInput, View } from 'react-native';

export default class PizzaTranslator extends Component {

  constructor(props) {

    super(props);

    this.state = {text: ''};

  }

  render() {

    return (

      <View style={{padding: 10}}>

        <TextInput

          style={{height: 40}}

          placeholder="Type here to translate!"

          onChangeText={(text) => this.setState({text})}

        />

        <Text style={{padding: 10, fontSize: 42}}>

          {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}

        </Text>

      </View>

    );

  }

}
```


以空格为分割符 处理输入

## 过滤：

ios 输入中文时 会 多加一个空格； 可以利用 trim()  过滤掉前后空格； 在失焦的时候再次过滤全部空格

## props:

blurOnSubmit:  如果为 true，文本框会在提交的时候失焦,而不会换行

keyboardType: 决定弹出何种软键盘类型，譬如numeric（纯数字键盘）。    

returnKeyType  决定“确定”按钮显示的内容。在 Android 上你还可以使用returnKeyLabel。

**autoCorrect (IOS上神坑)**

\*\*    自动纠正功能\*\*​

\*\*    会导致 TextInput  的 maxlength 在最大值得时候不生效，会自动替换你输入的文本（且会触发onChangeText事件两次触发相近4ms左右）\*\* ​

\*\*multiline \*\*

如果为 true，文本框中可以输入多行文字。默认值为 false。注意安卓上如果设置multiline = {true}，文本默认会垂直居中，可设置textAlignVertical: 'top'样式来使其居顶显示。&#x20;

**blurOnSubmit**   false    多行输入时 换行

## 输入纯数字

```javascript 
  <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) =]]> {
            

const newText = text.replace(/[^\d]+/, '');
            //可以打印看看是否过滤掉了非数字
            console.log(newText)
            this.setState({inputValue: newText})


          }}
          value={this.state.inputValue}
          //为了方便测试时输入字母，属性（keyboardType）不设置，实际使用时加上
          // keyboardType='numeric'
        /]]>
```


# stylesheet

[https://reactnative.cn/docs/stylesheet](https://reactnative.cn/docs/stylesheet "https://reactnative.cn/docs/stylesheet")

```javascript 
  borderBottomWidth: StyleSheet.hairlineWidth

这一常量始终是一个整数的像素值（线看起来会像头发丝一样细），并会尽量符合当前平台最细的线的标准。可以用作边框或是两个元素间的分隔线。然而，你不能把它“视为一个常量”，因为不同的平台和不同的屏幕像素密度会导致不同的结果。
```


# **StatusBar**

较重要的一个组件：自定义头部的状态栏

[https://reactnative.cn/docs/statusbar](https://reactnative.cn/docs/statusbar "https://reactnative.cn/docs/statusbar")

    由于

**StatusBar可以在任意视图中加载**

，可以放置

**多个且后加载的会覆盖先加载的**

。因此在配合导航器使用时，请务必考虑清楚StatusBar的放置顺序。

## 通用属性介绍

1. animated
   - &#x20;设置当状态栏的状态发生变化时，是否需要加入动画。
   - &#x20;动画支持 backgroundColor、barStyle 和 hidden 属性的变化。
2.    hidden
   - 设置状态栏是否隐藏。

## 仅支持iOS的属性

###     1.barStyle

        \<StatusBar barStyle={'light-content'} />

        用于设置状态栏文字的颜色，其值是枚举类型:

        default：黑色文字（默认）

        light-content：白色文字

**dark-content  --黑色文字---配合沉浸式的效国很好看，因为如果你白色就看不见，而很少是黑色的；**

###   2.networkActivityIndicatorVisible

        \<StatusBar networkActivityIndicatorVisible={true} />

        设定网络活动指示器(就是那个菊花)是否显示在状态栏。

###     3.showHideTransition

        通过 hidden 属性来显示或隐藏状态栏时所使用的动画效果，有两种选择：fade（默认值）、slide

## 仅支持Android的属性

###     1.backgroundColor（ios无法改变背景颜色）

        Android 设备上状态栏的背景颜色

        \<StatusBar backgroundColor={'blue'} />

###     2.translucent

        设置状态栏是否为透明。

        当状态栏的值为 true 的时候，应用将会在状态栏下面进行绘制显示。这样在 Android 平台上面就是沉浸式的效果，可以达到 Android 和 iOS 应用显示效果的一致性。

        该值常常同配置半透明效果的状态栏颜色一起使用。

\*\*        <StatusBar translucent={true}  backgroundColor={‘transparent’} />\*\*​

**这点和ios保持一致非常好用；沉浸式的效果，强烈建议这么用**

###     3.StatusBar.currentHeight

        React Native 在 Android 平台为 StatusBar 组件提供了一个静态常量 currentHeight，我们可以通过读取这个常量来得到 Android 手机状态栏的高度。

        注意：currentHeight 不是一个属性，我们直接访问 StatusBar.currentHeight 就可以了。

## 不同平台下状态栏的处理

###     1、Android 手机状态栏

        \* 当状态栏呈现在 Andorid 手机屏幕顶部时，它会占用顶部这个空间，我们只能使用剩下的屏幕空间。也就是说如果从第 0 行开始放置组件时，组件会紧贴着状态栏的下边沿显示。

        \*&#x20;

**要想知道实际可用的屏幕高度，可以通过手机屏幕的高度减去状态栏高度得到。**

###     2、iOS 手机状态栏

        \*&#x20;

**在 iOS 平台上，取得的屏幕高度就是实际可使用的高度**

。

        \* 如果从第 0 行开始排列组件时，组件会紧贴着手机屏幕的最上沿显示。如果状态栏没有被隐藏，它将覆盖在第 0 行组件的上方。

        \* 如果不想设置状态栏隐藏，则应当空出状态栏的显示区域。但可以为这个区域设置背景色，以使整个界面风格统一。

## statusBar高度的获取

           在 iOS 平台，

默认就是沉浸式的

，View 的内容会从屏幕顶部开始绘制，若不进行处理，就会被状态栏覆盖。因此可以手动获取状态栏的高度，用样式留出状态栏的空间，避免内容被状态栏覆盖。

import { NativeModules } from 'react-native'; &#x20;

&#x20;const { StatusBarManager } = NativeModules; &#x20;

  // iOS Only &#x20;

StatusBarManager.getHeight(statusBarHeight => {&#x20;

&#x20;console.log(statusBarHeight)&#x20;

&#x20;}); &#x20;

不过，在 Android 平台，默认又不是沉浸式的。需要如下操作才能达到沉浸式效果。

\<StatusBar translucent={true} backgroundColor="transparent"/>

在 Android 平台，获取状态栏高度就简单多了。

import { StatusBar } from 'react-native'; &#x20;

&#x20;const statusBarHeight = StatusBar.currentHeight;

statusBar详解

[React-Native- 状态栏组件（StatusBar）的使用详解\_suwu150的博客-CSDN博客\_dark-content React Native - 状态栏组件（StatusBar）的使用详解一、StatusBar组件介绍StatusBar 是手机顶部的状态条。StatusBar 是 React Native 0.20 起新增的跨平台组件，它可以用来设置并动态改变设备的状态栏显示特性。StatusBar 组件可以同时加载多个 StatusBar 组件，这些 StatusBar 组件的属性可以按照加载的顺... https://blog.csdn.net/suwu150/article/details/82945480](https://blog.csdn.net/suwu150/article/details/82945480 "React-Native- 状态栏组件（StatusBar）的使用详解_suwu150的博客-CSDN博客_dark-content React Native - 状态栏组件（StatusBar）的使用详解一、StatusBar组件介绍StatusBar 是手机顶部的状态条。StatusBar 是 React Native 0.20 起新增的跨平台组件，它可以用来设置并动态改变设备的状态栏显示特性。StatusBar 组件可以同时加载多个 StatusBar 组件，这些 StatusBar 组件的属性可以按照加载的顺... https://blog.csdn.net/suwu150/article/details/82945480")

## 不同平台下状态栏的处理

在使用的时候,可以在项目开始的地方也就是容器组件出进行设置,在使用Modal的地方可能需要根据Modal的背景色重新设置状态栏的颜色,针对不同的系统有以下建议

### 1.Android 手机状态栏

（1）当状态栏呈现在 Andorid 手机屏幕顶部时，它会占用顶部这个空间，我们只能使用剩下的屏幕空间。也就是说如果从第 0 行开始放置组件时，组件会紧贴着状态栏的下边沿显示。 &#x20;

（2）要想知道实际可用的屏幕高度，可以通过手机屏幕的高度减去状态栏高度得到。

### 2.iOS 手机状态栏

（1）在 iOS 平台上，取得的屏幕高度就是实际可使用的高度。 &#x20;

（2）如果从第 0 行开始排列组件时，组件会紧贴着手机屏幕的最上沿显示。如果状态栏没有被隐藏，它将覆盖在第 0 行组件的上方。 &#x20;

       （3）

**如果不想设置状态栏隐藏，则应当空出状态栏的显示区域。但可以为这个区域设置背景色，以使整个界面风格统一**

。（这个地方可以兼容android的背景颜色）

# **SafeAreaView**

             SafeAreaView的目的是在一个“

***安全***

”的可视区域内渲染内容。具体来说就是因为目前有&#x20;

***iPhone X 这样的带有“刘海”的***

全面屏设备，所以需要避免内容渲染到不可见的“刘海”范围内。本组件目前仅支持&#x20;

***iOS 设备以及 iOS 11 或***

更高版本。

android 和 其他版本的 ios 并不支持

    android 上真实可用的高度 ：是获取到的设备高度 - statusbar 的高度

     ios上

真实可用的高度： 

就是获取到的设备高度

这个通常要和statusBar 结合来使用：

- 如果从第 0 行开始排列组件时，组件会紧贴着手机屏幕的最上沿显示。如果状态栏没有被隐藏，它将覆盖在第 0 行组件的上方。
- 如果不想设置状态栏隐藏，则应当空出状态栏的显示区域。但可以为这个区域设置背景色，以使整个界面风格统一。

safeAreaView 的高度；包括上面的顶部 和 下面的 的安全区；这部分是空出来的；可以使用；比如背景色什么的

# **Dimension**

- 设备尺寸

const windowWidth = Dimensions.get('window').width; 

const windowHeight = Dimensions.get('window').height;

注意：尽管尺寸信息立即就可用，但它可能会在将来被修改（譬如设备的方向改变），所以基于这些常量的渲染逻辑和样式应当每次 render 之后都调用此函数，而不是将对应的值保存下来。（举例来说，你可能需要使用内联的样式而不是在StyleSheet中保存相应的尺寸）

。

- 在ios中 height = stutasbar + tabbar + 安全距离

这篇文章写的很明白；先无论正确与否

[React Native获取手机的各种高度 - 执白 - 博客园 一、窗口高度 即图中黄色+蓝色部分 二、屏幕高度 即图中黄色+蓝色+红色部分 三、内容高度 即图中蓝色部分 https://www.cnblogs.com/bbcfive/p/11123075.html](https://www.cnblogs.com/bbcfive/p/11123075.html "React Native获取手机的各种高度 - 执白 - 博客园 一、窗口高度 即图中黄色+蓝色部分 二、屏幕高度 即图中黄色+蓝色+红色部分 三、内容高度 即图中蓝色部分 https://www.cnblogs.com/bbcfive/p/11123075.html")

但是实际上高度有很很大偏差：

- statusBar的高度：

import { NativeModules } from 'react-native'; 

const { StatusBarManager } = NativeModules; 

  // iOS Only 

StatusBarManager.getHeight(statusBarHeight => {

**console.log(statusBarHeight)**

}); 

不过，在 Android 平台，默认又不是沉浸式的。需要如下操作才能达到沉浸式效果。

\<StatusBar translucent={true} backgroundColor="transparent"/>

在 Android 平台，获取状态栏高度就简单多了。

import { StatusBar } from 'react-native'; 

const statusBarHeight = StatusBar.currentHeight;

**结论：一般为44，或者横屏的时候20**

**横屏max机型都是44（同竖屏），非max为32；**

- tabBar的高度

**一这里为准：（竖屏）实测；下面表格有点问题：**

竖屏34，当然横屏是：24

一般是react-navigation的高度；

一般算想来是 49；

android： 49

ios：

非IphoneX：49

IphoneX：的高度增加：

49 + 34/24 + 34 的安全距离

iphone11及以上：49 + 34/24 + 34 的安全距离

**如果不想做复杂的判断，在最外层加View加一个onLayout 判断 中间可见距离的高度;实测好用**

提取IphoneX判断方法：

import {
    Dimensions,
    Platform,
    NativeModules,
    DeviceInfo
} from 'react-native';

const X\_WIDTH = 375;
const X\_HEIGHT = 812;

const { height: D\_HEIGHT, width: D\_WIDTH } = Dimensions.get('window');

const { PlatformConstants = {} } = NativeModules;
const { minor = 0 } = PlatformConstants.reactNativeVersion || {};

module.exports = {
    isIphoneX: function(){
        if (Platform.OS === 'web') return false;
        if (minor >= 50) {
            return DeviceInfo.isIPhoneX\_deprecated;
        }
        return (
            Platform.OS === 'ios' &&
            ((D\_HEIGHT === X\_HEIGHT && D\_WIDTH === X\_WIDTH) ||
                (D\_HEIGHT === X\_WIDTH && D\_WIDTH === X\_HEIGHT))
        );
    }
};

[https://blog.csdn.net/qq\_31915745/article/details/91345682](https://blog.csdn.net/qq_31915745/article/details/91345682 "https://blog.csdn.net/qq_31915745/article/details/91345682")

  可以看下这个文章

[https://github.com/react-navigation/react-navigation/issues/7359](https://github.com/react-navigation/react-navigation/issues/7359 "https://github.com/react-navigation/react-navigation/issues/7359")

   github 上的issues

[https://blog.csdn.net/he\_wen\_jian/article/details/84391654](https://blog.csdn.net/he_wen_jian/article/details/84391654 "https://blog.csdn.net/he_wen_jian/article/details/84391654")

    一篇源码的文章

- 屏幕高度

```javascript 
 import { Dimensions } from "react-native"; 
const deviceHeight = Dimensions.get('screen').height;  
```


[iPhone屏幕尺寸、statusBar、navigationBar、tabBar高度对比 手机机型(iPhone)屏幕尺寸(inch)逻辑分辨率(pt)设备分辨率(px)缩放因子 (Scale Factor)像素密度(ppi)5(s/se)4320×568640×... https://www.jianshu.com/p/b668d3a050f4](https://www.jianshu.com/p/b668d3a050f4 "iPhone屏幕尺寸、statusBar、navigationBar、tabBar高度对比 手机机型(iPhone)屏幕尺寸(inch)逻辑分辨率(pt)设备分辨率(px)缩放因子 (Scale Factor)像素密度(ppi)5(s/se)4320×568640×... https://www.jianshu.com/p/b668d3a050f4")

| 手机机型(iPhone)         | 屏幕尺寸(inch) | 逻辑分辨率(pt) | 设备分辨率(px) | 缩放因子 (Scale Factor) | 像素密度(ppi) |
| -------------------- | ---------- | --------- | --------- | ------------------- | --------- |
| 5(s/se)              | 4          | 320×568   | 640×1136  | @2x                 | 326       |
| 6(s)/7/8/se2         | 4.7        | 375×667   | 750×1334  | @2x                 | 326       |
| 6 Plus/7 Plus/8 Plus | 5.5        | 414×736   | 1242×2208 | @3x                 | 401       |
| X/XS/11 Pro          | 5.8        | 375×812   | 1125×2436 | @3x                 | 458       |
| XR/11                | 6.1        | 414×896   | 828×1792  | @2x                 | 326       |
| XS Max/11 Pro Max    | 6.5        | 414×896   | 1242×2688 | @3x                 | 458       |
| 12 mini              | 5.4        | 375×812   | 1080×2340 | @3x                 | 467       |
| 12/12 Pro            | 6.1        | 390×844   | 1170×2532 | @3x                 | 460       |
| 12 Pro Max           | 6.7        | 428×926   | 1284×2778 | @3x                 | 458       |

| iPhone型号                   | 状态栏 | 状态栏 | 导航栏 | 导航栏 | tabBar    | tabBar    |
| -------------------------- | --- | --- | --- | --- | --------- | --------- |
| iPhone型号                   | 竖屏  | 横屏  | 竖屏  | 横屏  | 竖屏        | 横屏        |
| 5s/SE/6/6s/7/8(iOS10)      | 20  | 0   | 44  | 32  | 49        | 49        |
| 5s/SE/SE2/6/6s/7/8(iOS11+) | 20  | 0   | 44  | 32  | 49        | 32        |
| 6 Plus/7 Plus/8 Plus       | 20  | 0   | 44  | 44  | 49        | 49        |
| X/XS/11 Pro                | 44  | 0   | 44  | 32  | 83(49+34) | 53(32+21) |
| XS Max/11 Pro Max          | 44  | 0   | 44  | 44  | 83(49+34) | 70(49+21) |
| 11/XR                      | 44  | 0   | 44  | 44  | 83(49+34) | 70(49+21) |
| 11/XR(iOS 14+)             | 48  | 0   | 44  | 44  | 83(49+34) | 70(49+21) |
| 12/12 Pro/                 | 47  | 0   | 44  | 32  | 83        | 53        |
| 12 Pro Max                 | 47  | 0   | 44  | 44  | 83        | 70        |
| 12 mini                    | 44  | 0   | 44  | 32  | 83        | 53        |

1. 导航栏：竖屏都是44像素，横屏max机型都是44（同竖屏），非max为32； &#x20;
2. Tabbar：竖屏都是49像素，全屏手机需加上34的安全距离。横屏max机型是49（同竖屏）非max机型是32，全屏需加上21的安全距离；  **全屏的安全距离 就是底下的那个圆；x 以下都有哪个圆**
3. 通过模拟器测试，全面屏横屏无法通过（prefersStatusBarHidden）显示状态栏。

**这有一个对照表：**

**最后得出的结论：ios 是在是太乱了；每个机型都不一样；**

# Text

- 超出文本省略

\<Text numberOfLines={3} style={styles.previewText}>{preview}\</Text>

### numberOfLines

       用来当文本过长的时候裁剪文本。包括折叠产生的换行在内，总的行数不会超过这个属性的限制。此属性一般和ellipsizeMode搭配使用。

### ellipsizeMode

这个属性通常和下面的 numberOfLines 属性配合使用，表示当 Text 组件无法全部显示需要显示的字符串时如何用省略号进行修饰。

该属性有如下 4 种取值:

- head - 从文本内容头部截取显示省略号。例如： "...efg"
- middle - 在文本内容中间截取显示省略号。例如： "ab...yz"
- tail - 从文本内容尾部截取显示省略号。例如： "abcd..."
- clip - 不显示省略号，直接从尾部截断。

# ImageBackground

背景图：在一些不规则图片上写文字；比定位要好一点点;

          有些情况下这个非常不好用：比如里面的内容不是整个；可能别的元素占了一半；就会出现非常尴尬的问题；他不是一个盒子；

**这种情况下用image 在用绝对定位好一点**

# FlatList

- 完全跨平台。
- 支持水平布局模式。
- 行组件显示或隐藏时可配置回调事件。
- 支持单独的头部组件。
- 支持单独的尾部组件。
- 支持自定义行间分隔线。
- 支持下拉刷新。
- 支持上拉加载。
- 支持跳转到指定行（ScrollToIndex）。
- 支持多列布局。

如果需要分组/类/区（section），请使用

[\<SectionList>](https://reactnative.cn/docs/sectionlist "<SectionList>")

.

[场景：如果你有一种列表，需要更改列表里面的每一项数据，当你点击每一项的时候，改变当前数据项的时候，可能需要看一看这篇文章。](https://juejin.cn/post/6844904190284660750 "场景：如果你有一种列表，需要更改列表里面的每一项数据，当你点击每一项的时候，改变当前数据项的时候，可能需要看一看这篇文章。")

### ListEmptyComponent

列表为空时渲染该组件。可以是 React Component, 也可以是一个 render 函数，或者渲染好的 element。

### keyExtractor

```javascript 
 (item: object, index: number) => string;
```


          此函数用于为给定的 item 生成一个不重复的 key。Key 的作用是使 React 能够区分同类元素的不同个体，以便在刷新时能够确定其变化的位置，减少重新渲染的开销。若不指定此函数，则默认抽取

item.key

作为 key 值。若

item.key

也不存在，则使用数组下标。

### refreshing

在等待加载新数据时将此属性设为 true，列表就会显示出一个正在加载的符号。

### scrollToIndex

           将位于指定位置的元素滚动到可视区的指定位置，当

viewPosition

 为 0 时将它滚动到屏幕顶部，为 1 时将它滚动到屏幕底部，为 0.5 时将它滚动到屏幕中央。

scrollToItem(

params

);

注意：如果不设置getItemLayout属性的话，无法跳转到当前渲染区域以外的位置。

Valid params keys are:

- 'animated' (boolean) - 列表是否应该在滚动时做动画。默认值为true.
- 'index' (number) -   要滚动到的索引。必需的。
- 'viewOffset' (number) - 用于偏移最终目标位置的固定像素数。
- 'viewPosition' (number) - 值0将索引指定的项放在顶部，1放在底部，0.5放在中间。

### initialNumToRender

              指定一开始渲染的元素数量，最好刚刚够填满一个屏幕，这样保证了用最短的时间给用户呈现可见的内容。注意这第一批次渲染的元素不会在滑动过程中被卸载，这样是为了保证用户执行返回顶部的操作时，不需要重新渲染首批元素。

### initialScrollIndex

              开始时屏幕顶端的元素是列表中的第 initialScrollIndex个元素, 而不是第一个元素。如果设置了这个属性，则第一批initialNumToRender范围内的元素不会再保留在内存里，而是直接立刻渲染位于 initialScrollIndex 位置的元素。

**需要先设置 getItemLayout 属性。**

### getItemLayout

           getItemLayout

是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度。如果你的行高是固定的

getItemLayout

用起来就既高效又简单，类似下面这样：

          对于元素较多的列表（几百行）来说，添加

getItemLayout

可以极大地提高性能。注意如果你指定了

ItemSeparatorComponent

，请把分隔线的尺寸也考虑到 offset 的计算之中。

**但是这些都有一个问题：必须等待数据出来以后才能设置，或者必须是使用getItemLayout：这就导致了，不规则列表；无法使用getItemLayout，就不发设定初始位置，而且即使数据加载了；在DidUpdate钩子里使用scrollToIndex，依旧有问题；**

解决办法：利用View 的onLayout属性，实测好用；这是一个nextTick方法；除了ComponentDidUpdate

```javascript 
  onLayout() {     this.list.scrollToIndex({index: 2})   }
```


### 高度不确定时的getItemLayout

[RN FlatList的item高度不定时，如何精准定位 案例： 界面上部分横向滚动(Scrollview)的标题，下部分是内容列表(FlatList)，但是由于 flatlist 的item 高度不定，无法准确使用getItemL... https://www.jianshu.com/p/dc719329bcc2](https://www.jianshu.com/p/dc719329bcc2 "RN FlatList的item高度不定时，如何精准定位 案例： 界面上部分横向滚动(Scrollview)的标题，下部分是内容列表(FlatList)，但是由于 flatlist 的item 高度不定，无法准确使用getItemL... https://www.jianshu.com/p/dc719329bcc2")

上面这个是用scrollToOffset

[具有动态项高度的React-Native Flatlist getItemLayout - 编程之家 我试图在平面列表上实现scrollToIndex函数,以便在呈现时滚动到特定项.我遇到的问题是flatlist呈现的项目有minHeight.问题是,平面列表需要实现一个函数来计算每个元素的偏移量.我想不出一种方法来预渲染平面列表并获得其中每个项目的高度.正如您所看到的,我只是为偏移量添加一个静态数字,这不是我需要的. \<FlatList   data={data}   renderItem={t https://www.jb51.cc/react/443346.html](https://www.jb51.cc/react/443346.html "具有动态项高度的React-Native Flatlist getItemLayout - 编程之家 我试图在平面列表上实现scrollToIndex函数,以便在呈现时滚动到特定项.我遇到的问题是flatlist呈现的项目有minHeight.问题是,平面列表需要实现一个函数来计算每个元素的偏移量.我想不出一种方法来预渲染平面列表并获得其中每个项目的高度.正如您所看到的,我只是为偏移量添加一个静态数字,这不是我需要的. <FlatList   data={data}   renderItem={t https://www.jb51.cc/react/443346.html")

这个使用loyout功能

### [FlatList动态高度大小](https://qa.1r1g.com/sf/ask/3224031891/# "FlatList动态高度大小")

```javascript 
 <FlatList
  data={clipBoardContent}
  keyboardShouldPersistTaps="handled"
  style={{flexGrow:0}}
  renderItem={({ item, index })=> <Text style={styles.itemText}>{item}</Text>}
/>
```


# RefreshControl

下拉刷新场合ScrollView等一起用；bounces={true}

 - onRefresh：PropTypes.func，视图刷新时调用。

 - refreshing：PropTypes.bool.isRequired，是否正在刷新中。

 - progressBackgroundColor：ColorPropType类型，加载指示器的背景颜色。

 - enabled：PropTypes.bool，android平台适用，设置下拉刷新是否可用。

 - colors PropTypes.arrayOf(ColorPropType)：android平台适用，设置加载指示器的颜色，至少设置一种颜色。

 - size: PropTypes.oneOf(\[RefreshLayoutConsts.SIZE.DEFAULT,RefreshLayoutConsts.SIZE.LARGE])，android平台适用，加载指示器的大小。

 - tintColor:ColorPropType类型，iOS平台适用，设置加载指示器的颜色。

 - title：PropTypes.string，iOS平台适用，加载指示器下面的文本。

[https://reactnative.cn/docs/refreshcontrol](https://reactnative.cn/docs/refreshcontrol "https://reactnative.cn/docs/refreshcontrol")

              ----官网

**这个地方一不小心会导致android白屏 ------ 一点要小心**

# **Platform**

Platform.OS在 iOS 上会返回ios，而在 Android 设备或模拟器上则会返回android。

## Platform.select()

还有个实用的方法是 Platform.select()，它可以以 Platform.OS 为 key，从传入的对象中返回对应平台的值，见下面的示例：

import { Platform, StyleSheet } from 'react-native'; 

const styles = StyleSheet.create({ 

    container: { 

        flex: 1, 

        ...Platform.select({ 

            ios: { backgroundColor: 'red' }, 

            android: { backgroundColor: 'blue' }

         }) 

    } 

});

**这一方法可以接受任何合法类型的参数**

const Component = Platform.select({ 

    ios: () => require('ComponentIOS'), 

    android: () => require('ComponentAndroid') 

})();

## Version

// 检测Adr版本

if (Platform.Version === 25) {

    console.log("Running on Nougat!");

}

// 检测iOS版本

const majorVersionIOS = parseInt(Platform.Version, 10);

if (majorVersionIOS <= 9) {

    console.log("Work around a change in behavior");

}

## 减少代码，解构ios和android

// 当不不同平台代码逻辑较为复杂时，可以使⽤用平台扩展名

BigButton.ios.js

BigButton.android.js

const BigButton = require("./BigButton")

# **View**

## props：

### onLayout

       当组件挂载或者布局变化的时候调用，参数为：

{nativeEvent: { layout: {x, y, width, height}}}

       这个事件会在布局计算完成后立即调用一次，不过收到此事件时新的布局可能还没有在屏幕上呈现，尤其是一个布局动画正在进行中的时候。
