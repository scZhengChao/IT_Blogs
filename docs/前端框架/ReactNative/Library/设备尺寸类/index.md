# 设备尺寸类

## 目录

- [iphone安全区域](#iphone安全区域)
- [react-native-device-info ](#react-native-device-info-)
- [navBarHeight](#navBarHeight)
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
  - [不同平台下状态栏的处理](#不同平台下状态栏的处理)
    - [1.Android 手机状态栏](#1Android-手机状态栏)
    - [2.iOS 手机状态栏](#2iOS-手机状态栏)
  - [statusBar高度的获取](#statusBar高度的获取)
    - [isIphonex](#isIphonex)

# iphone安全区域

react-native-safe-area-context

```javascript 
 import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      ...
    </SafeAreaProvider>
  );
}

```


[npm: react-native-safe-area-context A flexible way to handle safe area, also works on Android and web.. Latest version: 4.2.5, last published: a month ago. Start using react-native-safe-area-context in your project by running \`npm i rea https://www.npmjs.com/package/react-native-safe-area-context](https://www.npmjs.com/package/react-native-safe-area-context "npm: react-native-safe-area-context A flexible way to handle safe area, also works on Android and web.. Latest version: 4.2.5, last published: a month ago. Start using react-native-safe-area-context in your project by running `npm i rea https://www.npmjs.com/package/react-native-safe-area-context")

# \*\*react-native-device-info \*\*

[**https://blog.csdn.net/weixin\_44187730/article/details/88824795**](https://blog.csdn.net/weixin_44187730/article/details/88824795 "https://blog.csdn.net/weixin_44187730/article/details/88824795")

\*\*   blog\*\*​

[**https://github.com/react-native-community/react-native-device-info**](https://github.com/react-native-community/react-native-device-info "https://github.com/react-native-community/react-native-device-info")

\*\* github\*\*​

```javascript 
 import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export default class App extends Component<Props> {
    constructor(props) {
        super(props);
    }

    //初始加载、获取物理硬件信息
    async componentWillMount() {
        await console.log('api版本:', DeviceInfo.getAPILevel());
        await console.log('品牌:', DeviceInfo.getBrand());
        await console.log('当前应用名称:', DeviceInfo.getApplicationName());
        await console.log('应用编译版本号:', DeviceInfo.getBuildNumber());
        await console.log('获取应用程序包标识符:', DeviceInfo.getBundleId());
        await console.log('运营商名称:', DeviceInfo.getCarrier());
        await console.log('设备所处国家:', DeviceInfo.getDeviceCountry());
        await console.log('设备ID:', DeviceInfo.getDeviceId());
        await console.log('设备地区:', DeviceInfo.getDeviceLocale());
        await console.log('设备名称:', DeviceInfo.getDeviceName());
        await console.log('获取应用初始安装时间:', DeviceInfo.getFirstInstallTime());
        await console.log('设备字体大小:', DeviceInfo.getFontScale());
        await console.log('剩余存储容量(字节):', DeviceInfo.getFreeDiskStorage());
        await DeviceInfo.getIPAddress().then(res => {
            console.log('设备当前网络地址IP:', res);
        });
        await console.log('应用程序实例ID:', DeviceInfo.getInstanceID());
        await console.log('获取应用上次更新时间:', DeviceInfo.getLastUpdateTime());
        await DeviceInfo.getMACAddress().then(res => {
            console.log('网络适配器MAC地址:', res);
        });
        await console.log('设备制造商:', DeviceInfo.getManufacturer());
        await console.log('获取JVM试图使用的最大内存量(字节):', DeviceInfo.getMaxMemory());
        await console.log('获取设备模式:', DeviceInfo.getModel());
        await console.log('获取电话号码:', DeviceInfo.getPhoneNumber());
        await console.log('获取应用程序可读版本:', DeviceInfo.getReadableVersion());
        await console.log('设备唯一序列号:', DeviceInfo.getSerialNumber());
        await console.log('获取系统名称:', DeviceInfo.getSystemName());
        await console.log('获取系统版本:', DeviceInfo.getSystemVersion());
        await console.log('系统时区:', DeviceInfo.getTimezone());
        await console.log('完整磁盘空间大小(字节):', DeviceInfo.getTotalDiskCapacity());
        await console.log('设备总内存(字节):', DeviceInfo.getTotalMemory());
        await console.log('设备唯一ID:', DeviceInfo.getUniqueID());
        await console.log('设备用户代理:', DeviceInfo.getUserAgent());
        await console.log('设备版本:', DeviceInfo.getVersion());
        await console.log('用户偏好是否设置为24小时格式:', DeviceInfo.is24Hour());
        await console.log('程序是否允许在模拟器中:', DeviceInfo.isEmulator());
        await console.log('是否是平板电脑:', DeviceInfo.isTablet());
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    测试获取设备信息.....
                </Text>
            </View>
        );
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});
```


**注意：**

    获取设备mac地址，和ip 地址；需要配置权限

如Android需要在原生项目中中配置

    android>app>src>main>AndroidManifest.xml

    \<uses-permission android:name="android.permission.ACCESS\_NETWORK\_STATE" />

    \<uses-permission android:name="android.permission.CHANGE\_WIFI\_STATE" />

    \<uses-permission android:name="android.permission.ACCESS\_WIFI\_STATE" />

    \<uses-permission android:name="android.permission.CHANGE\_WIFI\_MULTICAST\_STATE" />

    \<uses-permission android:name="android.permission.INTERNET" />

# navBarHeight

```javascript 
 export function isIphoneX() {
    const dimen = Dimensions.get('window')
    // height 812 x 和 xs ，896 XR 和 XS MAX， 844 iphone12 和 12pro， 780 iphone12 mini， 926 iphone12 Max
    return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      [812, 896, 844, 926, 780].includes(dimen.height)
    )
}
export const iosTop = isIphoneX() ? 50 : 20

const navBarHeight = () => {
  const style = {
    ios: 44 + iosTop,
    android: 44,
  }
  return Platform.select(style)
}
```


**封装 navBar**

## **StatusBar**

较重要的一个组件：自定义头部的状态栏[https://reactnative.cn/docs/statusbar](https://reactnative.cn/docs/statusbar "https://reactnative.cn/docs/statusbar")

    由于**StatusBar可以在任意视图中加载**，可以放置**多个且后加载的会覆盖先加载的**。因此在配合导航器使用时，请务必考虑清楚StatusBar的放置顺序。

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

statusBar详解

[React-Native- 状态栏组件（StatusBar）的使用详解\_suwu150的博客-CSDN博客\_react-native 状态栏 React Native - 状态栏组件（StatusBar）的使用详解一、StatusBar组件介绍StatusBar 是手机顶部的状态条。StatusBar 是 React Native 0.20 起新增的跨平台组件，它可以用来设置并动态改变设备的状态栏显示特性。StatusBar 组件可以同时加载多个 StatusBar 组件，这些 StatusBar 组件的属性可以按照加载的顺... https://blog.csdn.net/suwu150/article/details/82945480](https://blog.csdn.net/suwu150/article/details/82945480 "React-Native- 状态栏组件（StatusBar）的使用详解_suwu150的博客-CSDN博客_react-native 状态栏 React Native - 状态栏组件（StatusBar）的使用详解一、StatusBar组件介绍StatusBar 是手机顶部的状态条。StatusBar 是 React Native 0.20 起新增的跨平台组件，它可以用来设置并动态改变设备的状态栏显示特性。StatusBar 组件可以同时加载多个 StatusBar 组件，这些 StatusBar 组件的属性可以按照加载的顺... https://blog.csdn.net/suwu150/article/details/82945480")

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

```javascript 
 import React, { Component, Element } from 'react'
import { Keyboard, Platform, Text, TouchableOpacity, View } from 'react-native'
import _ from 'lodash'
// import { connect } from 'react-redux'
import styleSheet, { getThemeColor } from '../utils/styleSheet'
import type { Callback } from '../types/langType'
import { clickRecord } from '../utils/nativeUtils/analyticsUtils'
import { getTopRoute } from '../navigation/routeUtil'
import { iosTop } from '../utils/androidAdapter'
import { routeRegistry } from '../navigation/common'
import { getScreenWidth, getStatusBarHeightAndroid } from 'react-common/const/ui-common'
import { apiDeps } from 'react-common/base/request/apiRequest'
import { withRedux } from 'modern/components/NavWrapper'

const styles = styleSheet.create({
  left: {
    flex: 1,
    flexDirection: 'row',
  },
  right: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  navStyle: {
    // maxWidth: 240,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    maxWidth: getScreenWidth() - 100,
    textAlign: 'center',
    fontSize: 18,
    alignSelf: 'center',
    paddingRight: 5,
  },
})

export const navBarStyle = () => {
  // const appendHeight = isPostHouse() ? getStatusBarHeightAndroid() : 0
  const appendHeight = getStatusBarHeightAndroid()
  const style = {
    ios: {
      paddingTop: iosTop,
      height: 44 + iosTop,
    },
    android: {
      paddingTop: appendHeight,
      height: appendHeight + 44,
    },
  }
  return Platform.select(style)
}

export type NavBarPropsType = {
  left?: Element<*>,
  leftStyle?: Object,
  title?: string,
  titleStyle?: Object,
  right?: Element<*>,
  style?: any,
  fontStyle?: Object,
  onPress?: Callback,
  onLongPress?: Callback,
  titleSize?: Object,
  middleRight?: ?Element<*>,
  middleLeft?: ?Element<*>,
  routes?: Array<Object>,
  routeArray?: Array<Object>,
  pushyStore?: Callback,
  rightStyle?: Object
}

class NavBarWithoutRedux extends Component {
  props: NavBarPropsType

  componentDidMount() {
    const title = this.props.title || ''
    const routes = this.props.routes || this.props.routeArray || []
    const topRoute = getTopRoute(routes) || {}
    const { routeName = '' } = topRoute
    const desc = routeRegistry.getRouteDesc(routeName, routes) || title

    if (desc) {
      clickRecord({ eventKey: routeName, eventName: desc })
    }
  }

  render() {
    const backgroundColor = apiDeps.appCode === 'wzg' ? 'white' : getThemeColor()
    const barStyle = [navBarStyle(), { flexDirection: 'row', backgroundColor }, this.props.style]
    if (this.props.style) barStyle.push(this.props.style)

    return (
      <View style={barStyle}>
        <View style={[styles.left, this.props.leftStyle]}>{this.props.left}</View>
        <TouchableOpacity
          style={styles.navStyle}
          activeOpacity={1}
          onPress={() => {
            Keyboard.dismiss()
            setTimeout(() => {
              if (this.props.onPress) {
                this.props.onPress()
              }
            }, 20)
          }}
          onLongPress={this.props.onLongPress || this.props.pushyStore || _.noop}>
          {this.props.middleLeft}
          <Text
            numberOfLines={1}
            style={[
              styles.title,
              { color: apiDeps.appCode === 'wzg' ? '#424242' : 'white' },
              this.props.titleStyle,
            ]}>
            {this.props.title}
          </Text>
          {this.props.middleRight}
        </TouchableOpacity>
        <View style={[styles.right, this.props.rightStyle]}>{this.props.right}</View>
      </View>
    )
  }
}

function mapProps(state: any) {
  const { routes: { routes } } = state
  return {
    routeArray: routes,
  }
}

export default withRedux(mapProps, null)(NavBarWithoutRedux)
```


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

### isIphonex

```javascript 
 export function isIphoneX() {
    const dimen = Dimensions.get('window')
    // height 812 x 和 xs ，896 XR 和 XS MAX， 844 iphone12 和 12pro， 780 iphone12 mini， 926 iphone12 Max
    return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      [812, 896, 844, 926, 780].includes(dimen.height)
    )
}

export const iosTop = isIphoneX() ? 50 : 20
```


```javascript 
 let androidStatusBarHeight = 28
export const getStatusBarHeightAndroid = () => androidStatusBarHeight
export const setStatusBarHeightAndroid = (height: number) => {
    androidStatusBarHeight = height
}
if (Platform.OS === 'android') {
            setStatusBarHeightAndroid(StatusBar.currentHeight)
}
```


```javascript 
 export const navBarStyle = () => {
  // const appendHeight = isPostHouse() ? getStatusBarHeightAndroid() : 0
  const appendHeight = getStatusBarHeightAndroid()
  const style = {
    ios: {
      paddingTop: iosTop,
      height: 44 + iosTop,
    },
    android: {
      paddingTop: appendHeight,
      height: appendHeight + 44,
    },
  }
  return Platform.select(style)
}
```
