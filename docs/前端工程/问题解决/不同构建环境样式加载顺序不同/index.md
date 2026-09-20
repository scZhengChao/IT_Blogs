# 不同构建环境样式加载顺序不同

## 目录

- [问题](#问题)
- [webpack](#webpack)
  - [问题描述](#问题描述)
  - [定位分析](#定位分析)
    - [为什么类样式的加载顺序会有所不同呢？](#为什么类样式的加载顺序会有所不同呢)
    - [本地环境处理样式](#本地环境处理样式)
  - [解决方案](#解决方案)
- [umi](#umi)

# 问题

> 相同权重相同样式；因为自己写的样式和第三方插件的样式冲突；在开发环境和生产环境 加载顺序不一致的问题

[ 滑动验证页面  https://segmentfault.com/a/1190000043978644](https://segmentfault.com/a/1190000043978644 " 滑动验证页面  https://segmentfault.com/a/1190000043978644")

# webpack

### 问题描述

在某次项目开发中，我发现了一个有趣的问题：当我在本地环境中访问页面时，标签元素的布局看起来很正常；但是当我将项目部署到开发环境后，标签元素的布局有些偏上，不再是之前的正常布局。这个问题引起了我的注意，并且我开始进行排查。

![](https://segmentfault.com/img/bVc8G0r)

### 定位分析

为了找出标签布局不一致的原因，我比较了两个环境下作用于标签的样式，以确定它们之间是否有差异：

![](https://segmentfault.com/img/bVc8G0w)

![](https://segmentfault.com/img/bVc8G0A)

对比可以发现，作用于标签的类样式`.bre-label-inner_container`和`.brand-item_discountTag__SlxDf`在两个环境下加载顺序不一样，而它们都存在一个样式属性`vertical-align`，会互相覆盖，所以才导致两个环境下标签布局不一致。

##### 为什么类样式的加载顺序会有所不同呢？

两个环境下代码都是一样的，唯一的区别是构建过程中对样式处理方式不同。

#### 本地环境处理样式

本地环境构建采用`Development`模式，采用`style-loader`处理样式，当 `webpack` 处理 `CSS` 样式文件时，`style-loader` 会将 `CSS` 样式文件转换为 `JavaScript` 模块，并将这些模块嵌入到生成的 `JavaScript bundle` 文件中。**在浏览器加载 ****`JavaScript bundle`**** 文件时，****`style-loader`**** 会在 ****`HTML`**** 页面中动态创建 ****`<style>`**** 标签，并将 ****`CSS`**** 样式插入到这些标签中，从而使样式生效。**

![](./assets/image/image_TWFPMGXpCM.png)

实际项目中组件嵌套层级结构和样式引用如以下示例：

```javascript 
// Main组件
import Label from "@/components/Label";
import "@casstime/bre-label/styles/index.scss"; // 含有.bre-label-inner_container样式
const Main = () => {
    return <Label />
}

// Labe组件
import styles from "./index.module.scss"; // 含有.brand-item_discountTag__SlxDf样式
const Label = () => {
    return <div className=`bre-label-inner_container ${styles.discountTag}`>...</div>
}

```


当上面代码构建后，会编译成一个个代码块结构，由`webpack`**内置函数**\*\*`__webpack_require__`\*\***深度调用执行**，调用栈过程如下：

![](https://segmentfault.com/img/bVc8G0Z)

不难发现`./index.module.scss`样式文件**先于**`@casstime/bre-label/styles/index.scss`样式文件通过`style`标签注入到页面中，因此，本地环境会看到`.bre-label-inner_container { vertical-align: middle; }`覆盖`.brand-item_discountTag__SlxDf { vertical-align: top; }`

```javascript 
<html>
    <head>
        <style>.brand-item_discountTag__SlxDf { vertical-align: top; }</style>
        <style>.bre-label-inner_container { vertical-align: middle; }</style>
    </head>
</html>
```


## 解决方案

我们需要制定相应的规则来优化样式文件引用顺序，以防止类似问题再次发生。这些规则应该不仅仅解决当前问题，而且应该考虑到长远的解决方案。

为了优化样式文件引用顺序，我们建议将**基础组件和业务组件等第三方组件的样式文件放置于项目入口文件头部进行引入**。**这些样式规则的优先级应该是最低的**，以便**业务代码中的样式规则可以根据实际情况进行修改和覆盖**。这样可以**确保样式规则的继承和覆盖关系得到正确的处理，同时也有助于提高项目的可维护性和可扩展性。**

```javascript 
// Main组件
import "@casstime/bre-label/styles/index.scss"; // 含有.bre-label-inner_container样式
import Label from "@/components/Label"; // 第三方业务组件

const Main = () => {
    return <Label />
}

// Labe组件
import styles from "./index.module.scss"; // 含有.brand-item_discountTag__SlxDf样式

const Label = () => {
    return <div className=`bre-label-inner_container ${styles.discountTag}`>...</div>
}

// 无论在本地环境还是开发环境，`.brand-item_discountTag__SlxDf { vertical-align: top; // 为了布局正确，可以改动此样式属性 }`都会覆盖`.bre-label-inner_container { vertical-align: middle; }`，
```


# umi

[ \[Bug\] umi@4 开发模式与生产模式下页面样式的表现不一致 · Issue #8326 · umijs/umi · GitHub What happens? umi@4下在配置中开启antd:{}，在global.less里写一段覆盖antd的样式，在开发模式下显示正常（即global里的样式会覆盖antd的样式），但打包后的代码，实际表现为antd的样式覆盖global的样式 How To Reproduce 开发模式下 生产模式下 Steps to reproduce the behavior: 1. 2. 用creat https://github.com/umijs/umi/issues/8326](https://github.com/umijs/umi/issues/8326 " \[Bug] umi@4 开发模式与生产模式下页面样式的表现不一致 · Issue #8326 · umijs/umi · GitHub What happens? umi@4下在配置中开启antd:{}，在global.less里写一段覆盖antd的样式，在开发模式下显示正常（即global里的样式会覆盖antd的样式），但打包后的代码，实际表现为antd的样式覆盖global的样式 How To Reproduce 开发模式下 生产模式下 Steps to reproduce the behavior: 1. 2. 用creat https://github.com/umijs/umi/issues/8326")

![](./assets/image/image_8EjaspxP49.png)

![](./assets/image/image_6IDi-GufTs.png)

![](./assets/image/image_c2o26f1vfk.png)

[ 配置 对于 umi 中能使用的自定义配置，你可以使用项目根目录的 .umirc.ts 文件或者 config/config.ts，值得注意的是这两个文件功能一致，仅仅是存在目录不同，2 选 1 ，.umirc.ts 文件优先级较高。 https://umijs.org/docs/api/config#mfsu](https://umijs.org/docs/api/config#mfsu " 配置 对于 umi 中能使用的自定义配置，你可以使用项目根目录的 .umirc.ts 文件或者 config/config.ts，值得注意的是这两个文件功能一致，仅仅是存在目录不同，2 选 1 ，.umirc.ts 文件优先级较高。 https://umijs.org/docs/api/config#mfsu")
