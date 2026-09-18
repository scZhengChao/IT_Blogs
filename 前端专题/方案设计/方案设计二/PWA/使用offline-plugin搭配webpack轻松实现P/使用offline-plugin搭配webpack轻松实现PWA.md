# 使用offline-plugin搭配webpack轻松实现PWA

## 目录

- [一、自动生成service-worker.js](#一自动生成service-workerjs)
- [二、基本使用](#二基本使用)
  - [安装](#安装)
  - [初始化](#初始化)
- [三、配置](#三配置)
- [四、runtime](#四runtime)
- [五、降级方案](#五降级方案)
- [六、遇到的坑](#六遇到的坑)
- [七、添加到主屏](#七添加到主屏)
- [遇到的问题](#遇到的问题)
  - [1.vue-cli3的问题](#1vue-cli3的问题)
  - [2.事件触发](#2事件触发)
  - [3.more](#3more)

谈起PWA，许多人可能还只停留在“了解”的层面，比较少在实践中真正地尝试过，更多的仅仅是对着网上的教程和例子大概玩过。然而，网络上的例子多是简单的demo，鲜有与真正的开发相结合，例如和webpack的工程化结合。这篇文章将会从一个webpack plugin出发，谈一谈如何使用这个名为`offline-plugin`的webpack插件轻松实现PWA。

> 由于PWA相关的文章太多，所以本文不再对“什么是PWA”，“PWA的生命周期”等基础内容再次赘述。

`offline-plugin`相关链接：

- [offline-plugin](https://link.segmentfault.com/?enc=WSdhM3S56blIfEIP66nO/g==.oCJpdzp3gpaOwOEqNPrx0koKa3QmMca1AUKI+o+yTHndGiY/gh1uFIUj9rcRoMqa "offline-plugin")
- [demo](https://link.segmentfault.com/?enc=h0udSD2WmBs72rsk1D0SvQ==.gODGS+pk0CU8stgriLGSUXqOKki9JCpTn2fGNyJ90Zk= "demo")

## 一、自动生成`service-worker.js`

PWA的核心可谓是`service-worker`（以后简称SW），**任何一个PWA都有且只有一个**`service-worker.js`文件，用于为SW添加资源列表，进行注册、激活等生命周期操作。但是在webpack构建的项目中，生成一个`service-worker.js`可能会面临两个较大的问题：

- 1、webpack生成的资源多会生成一串hash，sw的资源列表里面需要同步更新这些带hash的资源；
- 2、每次更新代码，都需要通过更新sw文件版本号来通知客户端对所缓存的资源进行更新。（其实只要这一次的sw代码和上一次的sw代码不一样即可触发更新，但使用明确的版本号会更加合适）。

看到这你可能已经想到，万能的webpack社区是否已经提供了相应的plugin来帮我们自动处理这些事情呢？答案是肯定的。除了官方推荐的[sw-precache-webpack-plugin](https://link.segmentfault.com/?enc=hwWo7b8VruJtFQIj1IqWxw==.JXDlmyDZKfjL3Rm2AwPM86ZnnikVjx/OC3a35E46gP/e5Ktb0ZKa8ktQvbF1eVuNtfaAdooxy4NpKepSOMLKIg== "sw-precache-webpack-plugin")之外，还有我们今天的主角[offline-plugin](https://link.segmentfault.com/?enc=ZUJ/x2ZVbTLTg5rZBNoD+Q==.nu5mzmHRsko4kJ0idWXdZb7RdxfqUgYe2kGZU27bX6tV+mFDlwAD2mN2G9U2te/Y "offline-plugin")。

相比与[sw-precache-webpack-plugin](https://link.segmentfault.com/?enc=q2e/9e6G42G2HaumVZxLDQ==.bpnCSWOcX9nuceZeKB5uFhxxkBlNLfamaJ/kZDOwnwgtAScqFhiHbgz6m+elZT8YFCW26jRFJ1grJvhkrnyGeQ== "sw-precache-webpack-plugin")，个人认为[offline-plugin](https://link.segmentfault.com/?enc=V37Ft86JtW4Wvifb6714kg==.NOUnwcqqP3dGUNVQUXme3xRBiU43RvXGbOM9tDiqsVgZszSCGE8J0RGZMyo41sJs "offline-plugin")具有如下优点：

- 1、更多的可选配置项，满足更加细致的配置要求；
- 2、更为详细的文档和例子；
- 3、更新频率相对更高，star数更多；
- 4、自动处理生命周期，用户无需纠结生命周期的坑；
- \*5、支持AppCache；
- 6、自动生成`manifest`文件。
- ...

## 二、基本使用

#### 安装

```javascript 
npm install offline-plugin [--save-dev]
```


#### 初始化

第一步，进入`webpack.config`:

```javascript 
// webpack.config.js example

var OfflinePlugin = require('offline-plugin');

module.exports = {
  // ...

  plugins: [
    // ... other plugins
    // it's always better if OfflinePlugin is the last plugin added
    new OfflinePlugin()
  ]
  // ...
}
```


第二步，把`runtime`添加到你的入口js文件当中：

```javascript 
require('offline-plugin/runtime').install();

```


ES6/Babel/TypeScript

```javascript 
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();
```


经过上面的步骤，`offline-plugin`已经集成到项目之中，通过webpack构建即可。

## 三、配置

前面说过，`offline-plugin`支持细致的配置，以满足不同的需求。下面将介绍几个比较常用的配置项，方便大家进一步使用。

- [Caches: 'all' | Object](https://link.segmentfault.com/?enc=zcmPn5HHFUmhg8S2E2H+xw==.vruImW+Gc8wVWNraU6o4gCdtZvKRll3q1hdiTtErO0g2O7K9kVmX1mO7C6K93t40aCiK3FLnYfamy9t/qTGA9iSbMwwl8RNp5kHpKFCAlBQ= "Caches: 'all' | Object")

```javascript 
告诉插件应该缓存什么东西，并以何种方式进行缓存
`all`: 意味着所有webpack构建出来的资源，以及在`externals`选项中的资源都会被缓存。
`Object`: 包含三个数组或正则的配置对象（`main`, `additional`, `optional`），它们都是可选的，且默认为空。
默认：`all`。

```


- [externals: Array\<string>](https://link.segmentfault.com/?enc=FVH/zcZxvzqnNvbr+TvwOQ==.wgyp8dJRpEGKCx/CBmZpShsnnOYRoRTs8rx4ug5Pdvktk4Ur2wUZ7BDzQU0+skENe16nN+ipvRxwGPWSi1zcbCKBNcsYEuQ4hh19tSq2OdrjdEJj288bHFYy7VM4ahCq "externals: Array<string>")

```javascript 
允许开发者指定一些外部资源（比如CDN引用，或者不是通过webpack生成的资源）。配合`Caches`的`additional`项，能够实现缓存外部资源的功能。

默认：`null`
举例：`['fonts/roboto.woff']`

```


- [ServiceWorker: Object | null | false](https://link.segmentfault.com/?enc=50NBOvvEk/8cTmhR++HtzA==.H7PCHMEr8wOw6Kzx/my9iCCVVYt1f74Md/v8H19WPStP5ip2DGzhUM1RJranqqakoxx56BuEtOmUrEYU96bTohyvLvdTD/wHSh5bozplSm1apN3JEpmZiSCVeMIa1I5qe0TEB/IlBHhDSgHgEeRB8A== "ServiceWorker: Object | null | false")

```javascript 
该对象包含多个配置项，这里仅列举最常用的。

`events`：布尔值。允许runtime接受来自sw的消息，默认值为false。
`navigateFallbackURL`：当一个URL请求从缓存或网络都无法被获取时，将会重定向到该选项所指向的URL。

```


- [AppCache: Object | null | false](https://link.segmentfault.com/?enc=eZ1z935v7TRc2aTMyuNueQ==.PEyPbX9Xa3PbSD2Rxnoxy5fZo83LLdjIPprPbXEVg+CvkjsIt2pF4/bqQXq5IktrFfkqJUPqD0jbGgSaTB8A727ruqjvt1Y8GjHamqkn6BUT7N4LbotW2SFTp6Xif1YD "AppCache: Object | null | false")

```javascript 
`offline-plugin`默认支持`AppCache`，但是`AppCache`草案已经被web标准所废弃，不建议使用。
但是由于仍然有部分浏览器支持，所以插件默认提供这个功能。


```


## 四、runtime

上一节介绍了`offline-plugin`在webpack当中的配置，这一节将介绍runtime的一些用法。若要使`offline-plugin`生效，用户必须在入口js文件中通过runtime进行初始化操作：

```javascript 
// 通过AMD方式
require('offline-plugin/runtime').install();

// 或者通过ES6/Babel/TypeScript方式

import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();
```


`OfflinePluginRuntime`对象提供了下列三个方法：

- [install(options: Object)](https://link.segmentfault.com/?enc=3X6w1/UWZkqbnUSxwBsyQQ==.cx3ATWoT1MaVOpwqs41fkp811UeUULmEW9WRDscnv63n31m2TW8cQ2MT9AwxDNgv3dW++E4HEKPija5+DJ2YUF89NWZW1tDb+DUja18+j2GlhlTH8Dd7uwrUOrf1U3xA "install(options: Object)") &#x20;

  开启ServiceWorker/AppCache的安装流程。这个方法是安全的，并且必须在页面初始化的时候就被调用。另外请勿把它放在任何的条件语句之内。（这句话不全对，在后面的降级方案里面会详细介绍）
- [applyUpdate()](https://link.segmentfault.com/?enc=X5cSqMRA40vHSw07mtF3AQ==.q59iDtijJh+801fP/BxOZuCoysiH/CU72YKKCEwMzP1kof6cnw+FMGVK1bUayS83PdVF7DT+9cbD9Pm5nC/UNzXIdlVqMyEUB+TiZh1EoQY= "applyUpdate()") &#x20;

  接受当前所安装的sw的更新信息。
- [update()](https://link.segmentfault.com/?enc=QnkGzM7IdFG+WETpCEoUBQ==.GsqgN/vS5xoBNuCU6lny4sWsHmXj8V20Q3+EULnYEkfhYccDDpLmh/vkjFsvJeg9idF2jR/9IfHUVm56B7xRulDGIp7IIMtqtOaIcReIfts= "update()") &#x20;

  检查新版本的ServiceWorker/AppCache的更新信息。

`runtime.install()`方法接受一个配置对象参数，用于处理sw各个生命周期里面的事件：

- [onInstalled](https://link.segmentfault.com/?enc=NvL7ICgqRFOVnhXNzpAgaw==.nSbMr9unLmhQPdBQ8/vS+V6XhYqthe4CkLAc2NpZDNmdKqYrwQGtYBcBCRtilqestF4T8oSaiCWvH7nefAawDV2AERYIgEN3EUMV++uORIE= "onInstalled")

```javascript 
当ServiceWorker/AppCache被install时执行，可用于展示“APP已经支持离线访问”。

```


- onUpdating

```javascript 
AppCache不支持该方法
当更新信息被获取且浏览器正在进行资源更新时触发。在这个时刻，一些资源正在被下载。

```


- [onUpdateReady](https://link.segmentfault.com/?enc=reMEZ6DyJVMMJ2yXJiJVhw==.cKc6Oh0UofBD4EfQdisNz/7NJnJh4CpPlUhfdCmG8tmuK1Ktnf7g43uFUnseKB2M+vLpefiqdMlbuGhxQK2keM6CqQiMuhKrzzqK4EimMgWRZe7b7iqE+8oqPY71L9LQ "onUpdateReady")

```javascript 
当`onUpdating`事件完成时触发。这时，所有资源都已经下载完毕。
通过调用`runtime.applyUpdate()`方法来触发更新。

```


- [onUpdateFailed](https://link.segmentfault.com/?enc=KLZhDQPWCHlr21qwA0f0lQ==.JXO/AZWRl+o/QnBh3Dq85314qGzzOuRc/1J5eG75MofPiYQl26XO7+nRQGXJ2h+5XME/gqpyZfHtTTiBj7Hu41yqI+O5SZsTUpSahMa2u70vLG4/z3ZWvHwuMoExlaak "onUpdateFailed")

```javascript 
当`onUpdating`事件因为某些原因失败时触发。
这时没有任何资源被下载，同时所有的资源更新进程都应该被取消或跳过。

```


- [onUpdated](https://link.segmentfault.com/?enc=eH7ADIohm9I0T6yEpLX5Sg==.a+YQ1vyPzKZ8YWb0pFRGbRK196rnpFYJnspVQBvH5rsHGv0GWImCLTQqdtT40xAM3KRMvnem5KgeRgmcA63/oEb9Nef9ONcSqx8zxU1opK4= "onUpdated")

```javascript 
当更新被接受时触发。

```


## 五、降级方案

当某些时候我们需要撤掉sw进行降级的时候，我们需要主动注销sw。然而`offline-plugin`默认没有提供注销sw的`unregister()`方法，所以我们需要自己实现。

其实要主动注销sw非常简单，我们可以直接调用`ServiceWorkerContainer.getRegistrations()`方法来拿到`registration`实例，然后调用`registration.unregister()`方法即可，具体代码如下：

```javascript 
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistration().then((registration) => {
    registration && registration.unregister().then((boolean) => {
      boolean ? alert('注销成功') : alert('注销失败')
    });
  })
}
```


在调用该方法后，sw已经被注销，刷新一下页面就能看到资源是重新从网络获取的了。

在真实的生产环境中，我们可以通过调用接口，来决定是否使用降级方案：

```javascript 
fetch(URL).then((switch) => {
  if (switch) {
    OfflinePluginRuntime.install()
  } else {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        registration && registration.unregister().then((boolean) => {
          boolean ? alert('注销成功') : alert('注销失败')
        })
      })
    }
  }
})
```


## 六、遇到的坑

在具体实践中，遇到一个比较大的坑，就是`sw.js`文件的更新。

在service worker的设计中，浏览器每一次加载站点的URL，都会重新请求一遍`sw.js`。若发现这一次的`sw.js`内容和上一次的不一样，就会判定为资源更新，重新触发sw的生命周期。然而，`sw.js`也是一个普通的js资源文件，会默认使用服务器设置的expired时间，也就是它的`max-age`。在理解了service worker的设计后，我们不难发现，`sw.js`的`max-age`应该尽可能短，以便浏览器能够及时更新资源列表。

这也是我在研究阶段直接使用`http-server`时所发现的问题。后来在官方的例子中，我发现`npm script`里面是这么写的：

```javascript 
"start": "http-server ./dist -p 7474 -c no-cache"
```


直接指定了所有资源都不使用缓存，这一点值得我们注意。

另外，`webpack-dev-server`里无法正常使用`offline-plugin`，因为它需要具体的文件去生成`sw.js`，但是通过`webpack-dev-server`构建的项目，其文件是存放在内存中的，所以无法和`offline-plugin`正常搭配使用。建议仅在**生产模式**内使用`offline-plugin`。

## 七、添加到主屏

手机浏览器都提供了“添加到主屏”的功能，但普通的网站添加到主屏，仅仅是把网站的书签放到桌面。如果要想把网站以PWA的形式添加到主屏，我们需要一个[manifest.json文件](https://link.segmentfault.com/?enc=idOpbvXHqGgFabaQYshTBw==.dBEQyMGAmTaCZfM1T5HGvsNujKBYwEaOTxvjTuLcLXjYsqy7OPJgp7WR9WelTbPuYsekvhQBO7H8qc3eAHzX7A== "manifest.json文件")：

```javascript 
{
  "name": "offline-plugin",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#181743",
  "background_color": "#181743",
  "start_url": "/",
  "display": "standalone"
}
```


然后，把这个`manifest.json`和其他**静态资源**一并打包到网站根目录即可：

![](https://segmentfault.com/img/bVSWEV?w=307\&h=394)

示例地址：

![](https://segmentfault.com/img/bVSWNw?w=185\&h=183)

打开chrome开发者工具，进入到`Application`一列，选择`Manifest`，就可以看到效果了：

![](https://segmentfault.com/img/bVSWIf?w=1154\&h=870)

# 遇到的问题

### 1.vue-cli3的问题

刚开始配置简单，发现状态改变时并没有触发对应的事件，于是增加了配置项

vuecli3的webpack配置在vue.config中，具体配置如下

这里直接将sw文件输出到根路径，并且开启了改变状态时触发对应的事件

```javascript 
module.exports = {
  configureWebpack: {
    plugins: [
      new OfflinePlugin(
        {
          responseStrategy: 'cache-first', // 缓存优先
          AppCache: false, // 不启用appCache
          safeToUseOptionalCaches: true, // Removes warning for about `additional` section usage
          ServiceWorker: {
            output: './sw.js', // 输出目录
            publicPath: './sw.js', // sw.js 加载路径
            scope: '/', // 作用域
            minify: true, // 开启压缩
            events: true // 当sw状态改变时候发射对应事件
          },
          caches: 'all',
          autoUpdate: 30000
        }
      )
    ]
  }
}
```


更多配置内容请查阅[https://github.com/NekR/offline-plugin/blob/master/docs/options.md](https://links.jianshu.com/go?to=https://github.com/NekR/offline-plugin/blob/master/docs/options.md "https://github.com/NekR/offline-plugin/blob/master/docs/options.md")

### 2.事件触发

在这里希望得到的情况是，当检测到sw文件改变（代码发生更新变化）时，通过一个钩子函数来更新一下当前页面（例如： 弹出一个对话框询问发现更新的内容，提示是否立即更新）

```javascript 
import * as OfflinePluginRuntime from 'offline-plugin/runtime'

OfflinePluginRuntime.install({
  onUpdateReady: () => {
    console.log('SW Event:', 'onUpdateReady')
    OfflinePluginRuntime.applyUpdate()
  },
  onUpdated: () => {
    console.log('SW Event:', 'onUpdated')
    // Reload the webpage to load into the new version
    window.swUpdate = true
  }
})

```


### 3.more

更多资料查阅

[https://developer.mozilla.org/zh-CN/docs/Web/API/Service\_Worker\_API](https://links.jianshu.com/go?to=https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API "https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API")

[https://x5.tencent.com/tbs/guide/serviceworker.html](https://links.jianshu.com/go?to=https://x5.tencent.com/tbs/guide/serviceworker.html "https://x5.tencent.com/tbs/guide/serviceworker.html")
