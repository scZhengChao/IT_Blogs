# 前端主题切换方案(react+antd)

## 目录

- [技术选型](#技术选型)
  - [less.modifyVars](#lessmodifyVars)
  - [Link标签替换](#Link标签替换)
  - [CSS Variable](#CSS-Variable)
  - [css-vars-ponyfill](#css-vars-ponyfill)
- [技术对比](#技术对比)

## 技术选型

### less.modifyVars

antd提供的一种主题切换方式，通过配置webpack的less-loader，添加modifyVars对象，官方已经内置了一些主题变量，每次构建时更换对应色值即可实现主题切换。

```javascript 
// webpack.config.js
module.exports = {
  rules: [{
    test: /\.less$/,
    use: [{
      loader: 'style-loader',
    }, {
      loader: 'css-loader', // translates CSS into CommonJS
    }, {
      loader: 'less-loader', // compiles Less to CSS
+     options: {
+       lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
+         modifyVars: {
+           'primary-color': '#1DA57A',
+           'link-color': '#1DA57A',
+           'border-radius-base': '2px',
+         },
+         javascriptEnabled: true,
+       },
+     },
    }],
    // ...other rules
  }],
  // ...other config
}

```


### Link标签替换

插入一个新的Link标签，用新的css链接替换原来的样式，这种方案实现上没有难度，也没有兼容问题，需要新建一套完全一样的样式类名，然后替换其中的色值，缺点是工作量太大，尤其开发中的项目来说，扩展性比较差，后期更换样式类名，需要同步更改主题样式文件：

![](image_NPAB6UCpt6.png)

### CSS Variable

另外一个是用ConfigProvider，需要注意在antd\@4.17.0-alpha.0 版本起才支持，而且webpack中如果使用了 babel-plugin-import，需要将其去除。本质是通过CSS Variable（css变量）实现，将颜色赋值变量，最大的问题是——有兼容性问题，在IE浏览器中不支持。补充：antd好像对CSS Variable做了兼容处理。

![](image_Xg0-8n4OnR.png)

项目内需要引入使用变量样式文件：

```javascript 
-- import 'antd/dist/antd.min.css';
++ import 'antd/dist/antd.variable.min.css';

```


调用部分：

```javascript 
import { ConfigProvider } from 'antd';
 
ConfigProvider.config({
  theme: {
    primaryColor: '#25b864',
  },
});

```


### css-vars-ponyfill

为弥补css variable的不足，css-vars-ponyfill做了一套兼容处理，原理大概是在ie等不支持css var的浏览器中将var（）中的变量值替换为对应色值，在支持css var的浏览器中不做处理。另外是操作dom，所以在node环境中无法使用。css-vars-ponyfill主要暴露了一个cssVar方法，方法入参如下：

```javascript 
export interface CSSVarsPonyfillOptions {
        rootElement?: Document|HTMLElement;
        shadowDOM?: boolean;
        include?: string;
        exclude?: string;
        variables?: {[key: string]: string};   // 颜色键值对
        onlyLegacy?: boolean;
        preserveStatic?: boolean;
        preserveVars?: boolean;
        silent?: boolean;
        updateDOM?: boolean;
        updateURLs?: boolean;
        watch?: null|boolean;
        onBeforeSend?(xhr: XMLHttpRequest, elm: HTMLLinkElement|HTMLStyleElement, url: string): void;
        onError?(message: string, elm: HTMLLinkElement|HTMLStyleElement, xhr: XMLHttpRequest, url: string): void;
        onWarning?(message: string): void;
        onSuccess?(cssText: string, elm: HTMLLinkElement|HTMLStyleElement, url: string): void;
        onComplete?(cssText: string, styleElms: HTMLStyleElement[], cssVariables: {[key: string]: string}, benchmark: number): void;
        onFinally?(hasChanged: boolean, hasNativeSupport: boolean, benchmark: number): void;
    }

```


主要的参数：variables：颜色键值对，切换主题即更换不同的variables

## 技术对比

less.modifyVars是静态更改主题，适合定制化主题，构建完成之后不能再变；css标签的方法工作量太大，扩展性差；css variable比较灵活，但有兼容问题，相对于css标签方法，扩展性好点；css-vars-ponyfill是css variable的优化版，解决了兼容问题，虽然会有服务端渲染的问题，如果项目是在浏览器dom环境下无伤大雅。

补充
做了一个简单的demo，分别用三种方式实现主题切换：css标签，css variable，css-vars-ponyfill。GitHub地址：react-antd-theme

![](image_LA07pdYxCI.png)
