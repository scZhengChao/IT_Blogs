# NormalModuleReplacementPlugin

## 目录

- [为什么需要差异化打包](#为什么需要差异化打包)
- [差异化打包](#差异化打包)
- [解决思路](#解决思路)
- [具体做法](#具体做法)
- [1.webpack](#1webpack)
- [2.rollup](#2rollup)

## 为什么需要差异化打包

在一些项目中可能会出现这种需求：
只需要在**开发模式**下存在，**生产模式**下不存在。实际上这种逻辑很好实现，我们可以根据**环境变量参数**做很多事情。比如想要在页面上不同模式下展示不同的图片

```javascript 
const imgSrc = ''
if(process.env.NODE_ENV === 'development'){
 // 开发模式
 imgSrc = require('logoenv.png')
}else{
 // 生产模式
 imgSrc = require('logopro.png')
}

```


开发模式下和生产模式下虽然用代码逻辑区分了不同的逻辑走向。**但是**有一个问题，项目`build`打包构建后，代码中`logoenv.png`、`logopro.png`两个文件资源却都真实存在这个项目的包里 [(具体原因查看这篇文章)](https://juejin.cn/post/6982813323217600543 "(具体原因查看这篇文章)")，而我们明明只需要用到`logopro.png`

那么生产环境下的包里存在不需要的资源是不合理的，但是如果你并不在意性能优化，那就问题不大，可以直接忽略了

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eeea3d6b3c614fc18af7a28f10fd8d9c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

## 差异化打包

首先我们需要清楚，无论是`vue`还是`react`，当我们运行`npm run dev`、`npm run serve`命令，即使是开发模式下，实际上框架也是将项目打包了的，只不过并不是我们手动`npm run build`打包的罢了，并且也不会在项目根目录生成`dist`文件夹。

其次这个问题的根本也还是在从**打包**这里,我们需要有个方法来让打包器（例如`webpack、Rollup`等）在开发模式下的打包和手动`npm run build`打包时区分我们指定的依赖或资源。

## 解决思路

`vue`或`react`项目，当我们的页面组件在路由表被引用注册后，才会加载其内部引用的其他资源，那么就可以在路由注册这里入手，**只需要做到只在本地开发时注册我们需要的路由**即可完成这个目的

## 具体做法

定义两个不同的路由配置文件，在不同的环境打包时引入不同的路由的配置文件

## 1.webpack

> 这里用的是`vue3.x`+`@vue/cli`

主要是利用`webpack`的`NormalModuleReplacementPlugin`这个插件，可以在打包时拦截到引用的资源文件，然后在判断遇到指定的文件时做**特殊**处理（替换文件名）
具体的`API`[文档看腾讯云这个有详解](https://link.juejin.cn/?target=https://cloud.tencent.com/developer/section/1477572 "文档看腾讯云这个有详解")

1.`vue.config.js`

```javascript 
const webpack = require('webpack')
module.exports = {
  configureWebpack: config => {
    const appTarget = process.env.NODE_ENV === 'development' ? 'env' : 'pro'
    // 将代码中所有的 APP_TARGET关键字 替换 为appTarget变量值
    config.plugins.push(new webpack.NormalModuleReplacementPlugin(/(.*)APP_TARGET(\.*)/,
      function(resourse) {
        resourse.request = resourse.request.replace(/APP_TARGET/, `${appTarget}`)
      })
    )
  }
}

```


2.`.env.development`

```bash 
NODE_ENV=development

```


3.`.env.production`

```yaml 
NODE_ENV=production

```


4.定义`routers_env.js`和`routers_pro.js`两个不同的路由配置文件
5.在引入的地方引入

```javascript 
import routers from './routers_APP_TARGET.js'

```


## 2.rollup

> 思路与webpack一致，只是实现方式稍有不同,我这里用的时`vue3`+`vite`

主要是利用`rollup`的`replace`插件。关于`vite`集成的`rollup`其他插件以及文档[点击查看](https://link.juejin.cn/?target=https://vite-rollup-plugins.patak.dev/ "点击查看")

1.`vite.config.js`

```typescript 
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import replace from "@rollup/plugin-replace"

export default defineConfig(({ command, mode }) => {
  const config = {
    plugins: [
      vue()
    ]
  }
  if( command === 'serve'){
    config.plugins.push(replace({
      'APP_TARGET':'env',
      delimiters:['','']
    }))
  } else {
    config.plugins.push(replace({
      'APP_TARGET':'pro',
      delimiters:['','']
    }))
  }
  return config
})

```


2.定义`routers_env.js`和`routers_pro.js`两个不同的路由配置文件
3.在引入的地方

```javascript 
import routers from './routers_APP_TARGET.js'

```
