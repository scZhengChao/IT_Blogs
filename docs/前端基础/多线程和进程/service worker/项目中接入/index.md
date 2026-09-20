# 项目中接入

## 目录

- [项目如何快速接入service worker](#项目如何快速接入service-worker)
  - [调试service worker](#调试service-worker)
  - [异常回滚（注销）](#异常回滚注销)

# **项目如何快速接入service worker**

- 在接入前有两个问题摆在我们面前，service worker可以帮助我们**解决资源缓存问题，有缓存就必须要有更新的机制**，service-worker.js本身也会被浏览器缓存，后续产品迭代过程中如何解**决该文件自身的更新问题**，否则其他资源的缓存更新也就无从谈起（旧的服务工作线程将一直控制页面），无可厚非每次构建部署时service-worker.js需要携带版本号（例如?v=201801021721）,当然也可以在服务器运维层控制该文件的cache-control: no-cache从而规避浏览器缓存问题，但这样太麻烦；
- 我们是在业务代码中通过register的方式引入service-worker.js, 那问题就变为如何在注册服务工作线程的位置引入版本号呢，**我们可以通过**[**sw-register-webpack-plugin**](https://www.npmjs.com/package/sw-register-webpack-plugin "sw-register-webpack-plugin")**来解决该问题**，其思路是将服务工作线程的注册放在一个单独的文件中（sw-register.js），然后自动在页面入口（例如index.html）写入一段JS脚本来动态加载sw-register.js文件，**这里sw-register.js的加载路径是带有实时时间戳的，而生成的sw-register.js文件内容中注册service-worker.js的位置自动携带构建版本号参数（默认是当前构建时间**\*\*）\*\*，该插件配置如下(基于webpack构建的项目)：

```javascript 
let SwRegisterWebpackPlugin = require('sw-register-webpack-plugin')
...
plugins: [
    new SwRegisterWebpackPlugin({
        filePath: path.resolve(__dirname, '../src/sw-register.js')
    })
]
```


- 构建后html新增部分如图:

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zZWdtZW50ZmF1bHQuY29tLy9pbWcvYlYxcHJo?x-oss-process=image/format,png)

- 构建后生成的sw-register.js文件变化如图：

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zZWdtZW50ZmF1bHQuY29tLy9pbWcvYlYxcHI2?x-oss-process=image/format,png)

- 这样处理后，**sw-register.js文件就不会被浏览器缓存，也即每次刷新会多一次sw-register.js的文件请求**，由于它只是用来做注册的工作，体量不会太大，可以接受，关键是前端可以自行控制
- 缓存资源文件如何更新呢？**上述插件只是解决了service-worker.js文件本身的更新的问题**（保证每次构建部署后会新启一个服务工作线程），但对于service-worker.js文件**中定义的cacheFiles而言，当我们修改了已缓存文件后如何来更新缓存呢**，我的项目是基于vue.js + webpack，打包后的JS文件是\[name].\[hash].\[ext]格式，从前面的介绍可知资源的缓存也是基于url（作为key）来的,不可能每次构建后都手动去调整service-worker.js文件内容中cacheFiles的路径值吧，应该是将构建后的文件名（包括路径）直接放到service-worker.js内容中，看到这里你应该想到了有webpack插件已经帮我们做好了，**那就是**[**sw-precache-webpack-plugin**](https://www.npmjs.com/package/sw-precache-webpack-plugin "sw-precache-webpack-plugin")**,该插件会自动在dist目录下生成service-worker.js文件，供给service worker运行**，也就是说service-worker.js文件本身不需要我们手动添加了，但问题是我们如何自定义需要缓存的文件呢，该插件的配置参数会告诉你，我的项目该插件配置如下

```javascript 
// 生成service-worker.js和配置缓存清单
new SwPrecacheWebpackPlugin({
    cacheId: 'attendance-mobile-cache',
    filename: 'service-worker.js',
    minify: true,
    dontCacheBustUrlsMatching: false,
    staticFileGlobs: [
        'dist/static/js/manifest.**.*',
        'dist/static/js/vendor.**.*',
        'dist/static/js/app.**.*'
    ],
    stripPrefix: 'dist/'
})
```


- 由上可知，我们能够通过正则来匹配需要缓存的文件，这里特**别要注意的是stripPrefix参数的使用**，我们配置的缓存文件路径是项目中的路径，但对于部署线上而言，**我们可能需要过滤前缀的部分路径（我的项目线上部署文件根目录下就是static等，所以需要过滤dist路径），** 最终该插件生成的service-worker.js文件如图所示（仅截取缓存文件清单部分代码）

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zZWdtZW50ZmF1bHQuY29tLy9pbWcvYlYxcEd3?x-oss-process=image/format,png)

## 调试service worker

- 通过上述两个插件，我们的service-worker接入工作基本完成，那接下来就是验证服务工作线程运行是否ok,通过chrome devTools（Application项）我们可以很方面的查看当前服务工作线程的运行情况和已缓存了哪些文件，具体如何查看这里不再介绍;
- 当首次运行 service worker 时我们会发现要缓存的文件还是走正常的网络请求，cache storage 下也看不到我们的缓存项，因为服务工程线程也存在“二次生效”的机制（即使需要缓存的资源延迟加载），具体如下图所示：

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zZWdtZW50ZmF1bHQuY29tLy9pbWcvYlYxcU1T?x-oss-process=image/format,png)

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zZWdtZW50ZmF1bHQuY29tLy9pbWcvYlYxcU1W?x-oss-process=image/format,png)

- 通过刷新访问我们可以看到，service worker 缓存文件已经生效，在network面板下自定义的缓存文件size项都显示为“from ServiceWorker”, 耗时也明显很低。在cache storage下面也可以看到已经缓存的文件列表，具体如下图所示：

![](./assets/image/image_-BS_xXjFKw.png)

![](./assets/image/image_XyWVIHF0DR.png)

- 接下来我们更新service-worker.js文件来看下新服务工作线程如何工作,正如前面所讲新服务工作线程将会启动安装，但由于旧服务工作线程控制着页面，所以新服务工作线程将进入waiting状态，**当当前打开的页面关闭时，旧服务工作线程将会被终止，新服务工作线程会得的控制权并触发activate事件**，在开发过程中我们需要通过Chrome Devtools的**skipWaiting或者勾选Updated on reload来强制激活新服务工作线程**，具体如下图所示：

![](./assets/image/image_-0ank3N9nZ.png)

- 在开发过程中我们可以通过上述来了解新服务工作线程的更新流程，但\*\*在实际项目中我们可以通过`self.skipWaiting()`\*\***跳过等待过程安装后直接激活**，一般我们在install事件中调用,具体可参见`sw-precache-webpack-plugin`生成的`service-worker`源代码。这会导致新服务工作线程将当前活动的工作线程逐出，`skipWaiting()`意味着新服务工作线程可能会控制使用较旧工作线程加载的页面，也就是页面获取的部分数据由旧工作线程处理，而新服务工作线程处理后来获取的数据，如果有问题就不要使用skipWaiting();
- 手动清理service worker缓存后刷新页面，在 Network 面板中，我们会看到本应缓存文件的一组初始请求。之后是前面带有齿轮图标的第二轮请求，这些请求似乎要获取相同的资源，“齿轮”图标代表这些请求来自服务工作线程，**如果不unregsiter该服务工作线程，我们会发现即使多次刷新页面，Network 面板依然如此，其实也就是说资源没有再次缓存（** 因为服务工作线程已经安装且控制当前页面，刷新操作不会重新触发install事件，也就不会再次添加资源到缓存，除非unregister或者更新service-worker.js文件），具体如下图所示：

![](./assets/image/image_z8geedJ2Ok.png)

![](./assets/image/image_QOv4D-k25r.png)

## **异常回滚（注销）**

- 某些场景下如果service worker使用出现异常，比如不同页面间 service worker 控制的scope存在“重叠污染”的问题，那么我们就需要紧急回滚（撤销）当前 service worker,在开发环境很好解决，我们依然可以通过Chrome Devtools来进行unregister, 那么在线上环境已经有服务工作线程在运行的情况下呢，我们需要在新上线版本的service worker注册前将被污染或者异常的service worker注销掉，具体代码如下：

```javascript 
if (navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (var item of registrations) {
            if (item.scope === 'http://localhost/attendance-mobile/dist/') {
                item.unregister();
            }
        }
        // 注销掉污染 Service Worker 之后再重新注册...
    });
}
```
