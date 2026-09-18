# 静态资源

## 目录

- [icons  图标](#icons-图标)
- [webp](#webp)
- [Svg](#Svg)

# icons  图标

```react 
react-native-vector-icons

yarn add react-native-vector-icons

react-native link react-native-vector-icons
```


记得关闭模拟器器，服务器器，重新启动项⽬目

github 地址：[https://github.com/oblador/react-native-vector-icons](https://github.com/oblador/react-native-vector-icons "https://github.com/oblador/react-native-vector-icons")

图标预览：[https://oblador.github.io/react-native-vector-icons/](https://oblador.github.io/react-native-vector-icons/ "https://oblador.github.io/react-native-vector-icons/")

```javascript 
/**
 * @flow
 */

import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Octicons from 'react-native-vector-icons/Octicons'
import Zocial from 'react-native-vector-icons/Zocial'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Foundation from 'react-native-vector-icons/Foundation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const mapping = {
  Entypo,
  FontAwesome,
  Ionicons,
  Octicons,
  Zocial,
  EvilIcons,
  Foundation,
  MaterialIcons,
}

export type SuiteType = 'Entypo'
  | 'FontAwesome'
  | 'Ionicons'
  | 'Octicons'
  | 'Zocial'
  | 'EvilIcons'
  | 'Foundation'
  | 'MaterialIcons'


export type IconType = {
  suite: SuiteType,
  name: string,
  color?: string,
  size?: number,
}

export default function Icon(props: IconType) {
  const { suite, ...extraProps } = {
    color: 'white',
    size: 30,
    ...props,
  }
  const VectorIcon = mapping[suite]
  return <VectorIcon {...extraProps} />
}


使用：
<Icon
  size={22}
  suite="Ionicons"
  name={isSelected===item.desc? 'ios-checkmark-circle' : 'ios-radio-button-off'}
  color={isSelected===item.desc ? getThemeColor() : '#E8E8E8'}
/>

```


# webp

> webp   旨在优化图片加载速度，减少带宽和服务器资源的需求

```javascript 
默认情况下 Android 是不支持 GIF 和 WebP 格式的。你需要在

android/app/build.gradle

文件中根据需要手动添加以下模块：

dependencies {

// 如果你需要支持Android4.0(API level 14)之前的版本

implementation

'com.facebook.fresco:animated-base-support:1.3.0'

// 如果你需要支持GIF动图

implementation

'com.facebook.fresco:animated-gif:2.0.0'

// 如果你需要支持WebP格式，包括WebP动图

implementation

'com.facebook.fresco:animated-webp:2.1.0'

implementation

'com.facebook.fresco:webpsupport:2.0.0'

// 如果只需要支持WebP格式而不需要动图

implementation

'com.facebook.fresco:webpsupport:2.0.0'

}
```


# Svg

> svg 图标的使用&#x20;

| 类型               | 描述                               |
| ---------------- | -------------------------------- |
|  Svg             |  承载绘图区域                          |
|  Circle          |  圆                               |
|  Ellipse         |  椭圆                              |
|  G               |  包裹块(个人认为是为了单纯的层次分明)             |
|  LinearGradient  |  线性渐变,可以做颜色的线性渐变效果               |
|  RadialGradient  |  角度渐变,可以做颜色的角度渐变效果               |
|  Line            |  线条                              |
|  Polyline        |  多段线                             |
|  Path            |  路径,类似的还有ClipPath                |
|  Polygon         |  多边形                             |
|  Rect            |  矩形                              |
|  Symbol          |  定义个视图模块,其他地方可以随意使用该模块(可以通过id标示) |
|  Use             |  可以获取到Symbol视图模块使用(可以通过href找到模块) |
|  Text            |  文字信息                            |
|  TSpan           |  多行文字                            |
|  TextPath        |  文字路径                            |
|  Defs            |  个人觉得怎么和G标签一样啊.就像前端中的div一样       |
|  Stop            |  效果停止位置                          |

 属性大致有:

| 类型               | 描述                                                       |
| ---------------- | -------------------------------------------------------- |
| fill             | 填充颜色                                                     |
| fillOpacity      | 填充透明度                                                    |
| fillRule         | 填充规则                                                     |
| stroke           | 外边框属性,可以定义颜色                                             |
| strokeWidth      | 外边框宽度                                                    |
| strokeOpacity    | 外边框透明度                                                   |
| strokeLinecap    |                                                          |
| strokeLinejoin   |                                                          |
| strokeDasharray  |                                                          |
| strokeDashoffset |                                                          |
| x                | x                                                        |
| y                | y                                                        |
| cx  cy  r        | 定义圆的中心,如果省略了cx和cy，那么圆的中心将被设置为(0,0),r圆的半径                 |
| rx  ry           | 定义水平半径 垂直半径                                              |
| x1 y1 x2 y2      | x1:x轴的开始位置 x2:x轴的结束位置   y1:y轴开始位置 y2:y轴结束位置 (通常用于Line模块) |
| points           | 多边形的每个角的x和y坐标.(通常用于Polygon模块,几个角就是几边形)                   |
| rotate           | 旋转角度                                                     |
| scale            | 比例                                                       |
| origin           | 原点                                                       |
| originX          | 原点x                                                      |
| originY          | 原点y                                                      |

底层详细使用（开发一般很少使用到）

[react-native-svg的使用 - 程序猿--少停 - 博客园 今天学习一下react-native-svg,一如既往,在安装该库的时候,就有一大堆坑等你填. 首先,我新建一个rn项目,按照官方说明先导入库 再链接库文件 rnpm link react-nativ https://www.cnblogs.com/shaoting/p/8085136.html](https://www.cnblogs.com/shaoting/p/8085136.html "react-native-svg的使用 - 程序猿--少停 - 博客园 今天学习一下react-native-svg,一如既往,在安装该库的时候,就有一大堆坑等你填. 首先,我新建一个rn项目,按照官方说明先导入库 再链接库文件 rnpm link react-nativ https://www.cnblogs.com/shaoting/p/8085136.html")

          鉴于使用图片为了防止模糊，要准备多倍图，首先就被pass掉了。而字体图标做为我常用的手段，特别是公司的字体是通过icomoo这种网站统一管理的，本来是很倾向于使用的，奈何.ttf文件必须随项目打包到app里面，不能热更新。至少在没有放弃codepush的情况下，只能放弃了。接下来就只有使用svg了 。**svg的体积极小，几十个图标文件加起来不到3k，随bundle打包是最好的选择**，正好现在的字体图标管理网站也能生成svg文件，很方便和设计师合作。设计师只用将需要使用的svg图标上传到icomoo上命名好，然后打包下载就能使用。

使用react-native-svg就能对svg的标签解析成图片，

**而使用react-native-svg-uri则能把svg文件的xml解析成响应的component。**

这样就能把svg文件转化成图形。

**但是后来发现这在安卓中行不通，因为安卓的RN项目在release打包后（非debug模式），只能允许require png和xml格式的文件**。不过这并不是什么大问题，本来对icomoo生成svg文件中，

**我们仅仅需要path标签，其余的都是浪费空间的，而且频繁require静态文件也会减慢速度。我们可以用脚本来将svg文件批量生成js使用的字符串，然后通过react-native-svg-uri来解析xml**。这个库作者也考虑到android的问题预留了接受字符串的api。&#x20;

&#x20;          于是我们的使用方式变成了：svg文件->js的xml数据集合->Svg Component。  另外在react-native-svg-uri更新太慢，其npm包依赖了低版本的react-native-svg。如果你使用的5.0版本以上的svg，会由于原生和react-native-svg-uri所使用的react-native-svg版本不同而报错。其实这个库原理很简单，而且只有两百行代码，很好维护。建议不通过npm直接在项目中使用，可以解决版本问题。

&#x20;每次进app请求多个svg很浪费资源，并且安卓本身就不支持svg静态文件的require，所以我们需要用简单的脚本处理一下，把多个svg的字符合并到一个js对象中，代码如下，运行下面的脚本 node getSvg。这里我时用node写的，当然你也可以用自己习惯的脚本语言来处理。

[react-native icon解决方案（svg） \*\* 在开发app的过程中总是少不了各种各样的icon图标。移动端和pc端的解决方式各有不同，而RN与之前的开发方式都有所不同，所以我们要对各种引入图标的方式进行权衡。\*\* ... https://www.jianshu.com/p/7db2bc62c5ed](https://www.jianshu.com/p/7db2bc62c5ed "react-native icon解决方案（svg） ** 在开发app的过程中总是少不了各种各样的icon图标。移动端和pc端的解决方式各有不同，而RN与之前的开发方式都有所不同，所以我们要对各种引入图标的方式进行权衡。** ... https://www.jianshu.com/p/7db2bc62c5ed")

问题

RNSVGDefs was not found in the Uimanager&#x20;

[Invariant Violation: requireNativeComponent: "RNSVGDefs" was not found in the UImanager. · Issue #159 · vault-development/react-native-svg-uri Getting Invariant Violation: requireNativeComponent: \&amp;quot;RNSVGDefs\&amp;quot; was not found in the UImanager. with a red screen for my React-native app. Have added react-native-svg, modified t... https://github.com/vault-development/react-native-svg-uri/issues/159](https://github.com/vault-development/react-native-svg-uri/issues/159 "Invariant Violation: requireNativeComponent: \"RNSVGDefs\" was not found in the UImanager. · Issue #159 · vault-development/react-native-svg-uri Getting Invariant Violation: requireNativeComponent: \&amp;quot;RNSVGDefs\&amp;quot; was not found in the UImanager. with a red screen for my React-native app. Have added react-native-svg, modified t... https://github.com/vault-development/react-native-svg-uri/issues/159")

android 记得 在之前 react-native link 一下

注意： android 下坑比较多；下来的不是全对；

- 不需要new SvgPackage()  否则会报一个重复覆盖的错
- 其他的添加 只需要link 一下,大部分都有了
- 不知到copy的谁的；传参错误；因为我yarn add 有svg ；所以组件以Svg命名会报错
- 最坑的一点请注意；svg 必须有fill  不然没有颜色 显示

[React native 引用自定义组件报错 rnsvgcircle was not found in the uimanager 解决方法\_Zsama666的博客-CSDN博客 打开\`android/app/src/main/java/\[…\]/MainApplication.java添加 new SvgPackage() setting.gradle中添加include ‘:react-native-svg’project(’:react-native-svg’).projectDir = new File(rootProject.projectDir, ‘…/... https://blog.csdn.net/loveseal518/article/details/105794306](https://blog.csdn.net/loveseal518/article/details/105794306 "React native 引用自定义组件报错 rnsvgcircle was not found in the uimanager 解决方法_Zsama666的博客-CSDN博客 打开`android/app/src/main/java/\[…]/MainApplication.java添加 new SvgPackage() setting.gradle中添加include ‘:react-native-svg’project(’:react-native-svg’).projectDir = new File(rootProject.projectDir, ‘…/... https://blog.csdn.net/loveseal518/article/details/105794306")
