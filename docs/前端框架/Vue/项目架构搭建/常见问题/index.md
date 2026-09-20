# 常见问题

## 目录

- [1.Loading chunk " + e + " failed.   问题](#1Loading-chunk---e---failed-问题)
  - [方案](#方案)
- [2.单文件组件](#2单文件组件)
- [3.不去掉scoped属性更改第三方组件样式](#3不去掉scoped属性更改第三方组件样式)
  - [第一种 >>> 第三方组件样式名(普通css中使用)](#第一种--第三方组件样式名普通css中使用)
  - [第二种 /deep/ 第三方组件样式名：(预编译css中使用)](#第二种deep-第三方组件样式名预编译css中使用)
  - [第三种 /deep/ 第三方组件样式名：(通用)](#第三种deep-第三方组件样式名通用)

# **1.Loading chunk " + e + " failed.   问题**

        当前端脚本重新编译了以后，项目发布采用的是删除重置发布，由于静态文件只加载一次的缘故，会导致按需加载模块时报错：

Loading chunk " + e + " failed. 

**原因**：

        原因是浏览器已经缓存了manifest.f726e03ee32bcdee633a.js这个加载器,然后访问新的导航栏的时候，服务器端已经不存在旧版本的JS静态资源文件了，从而导致系统异常

**解决方法：**

**方案一：**

        每次都加载项目入口文件 index.html。也就是说服务器端设置index.html文件不缓存、或者通过URL后缀添加随机字符串来解决。这个方案适合入口URL可变更的系统。但对于ERP这种内部系统来说，可行性不是很好。

由于入口只加载一次，导致点击系统的其他导航栏URL操作，无法做到再次加载index.html文件，刷新浏览器缓存的JS。

第一种方案可以放弃了!

**方案二：**

给每个导航栏路由URL添加随机数。 这个也不行，并不会导致index.html被重新加载。具体原因，请详看源码解析：[vue-router源码分析-整体流程](https://github.com/DDFE/DDFE-blog/issues/9 "vue-router源码分析-整体流程")

**方案三：**

&#x20;  系统内部通过ajax请求获取版本信息从而提示更新。

这个可行，但对后端系统有侵入性，需要后端同学配合。对与跨工种跨部门来说，这种方式属于下策。

**方案四：**

方案二提到了路由，那么vue的路由是否提供了钩子机制，从而进行拦截呢？

官方是提供的，详看官方文档：

[vue导航钩子](https://router.vuejs.org/zh-cn/advanced/navigation-guards.html "vue导航钩子")。通过如下这段代码，我们就能实现我们想要的功能了。一、确保了检测的频率。同时也对系统内部的AJAX请求减少侵入性代码。

```纯文本 
 router.beforeEach((to, from, next) => { 
     // ... 
 })
```


## 方案

1.最终解决如下：在 main.js 中添加如下代码：

```纯文本 
 router.beforeEach((to, from, next) => { 
     axios.get('../static/version.json?_=' + Math.random()).then(response => { 
         if (200 == response.status) { 
             if (process.env.VERSION !== response.data.version) { 
                 var message = "系统版本有更新，点击确认加载最新，或按【CTRL + F5】！" 
                 Vue.prototype.$alert(message, '系统提示', { 
                     confirmButtonText: '确定', 
                     callback: function(){ 
                         window.location.reload(true); 
                     } 
                 }); 
                 return; 
             } 
             next(); 
         } 
     }).catch(err => { 
         console.error(err); 
         next(); 
     }); 
 });
```


2.添加版本变量：

![  ](./assets/image/387466-20170807183424174-1863777749_IjC9QMekoc.png "  ")

3.给编译环境添加env变量：

![  ](./assets/image/387466-20170807183519534-1036585674_Eee-tG_aLu.png "  ")

4.通过Webpack的编译插件机制，引入 diy-plugin.js 自定义插件脚本，生成版本信息：

```javascript 
 'use strict'; 
 
 var FStream = require('fs'); 
 var Archiver = require('archiver'); //npm install archiver 
 
 
 /** 
 * 版本信息生成插件 
 * @author phpdragon@qq.com 
 * @param options 
 * @constructor 
 */ 
 function DiyPlugin(options) { 
     this.options = options || {}; 
     this.options.outZipFile = this.options.path + '/front.zip'; 
     !this.options.versionDirectory && (this.options.versionDirectory = 'static'); 
 } 
 
 //apply方法是必须要有的，因为当我们使用一个插件时（new somePlugins({})），webpack会去寻找插件的apply方法并执行 
 DiyPlugin.prototype.apply = function (compiler) { 
     var self = this; 
     compiler.plugin("compile", function (params) { 
         var dir_path = this.options.context + '/' + self.options.versionDirectory; 
         var version_file = dir_path + '/version.json'; 
         var content = '{"version":' + self.options.env.VERSION + '}'; 
         FStream.exists(dir_path, function (exist) { 
             if (exist) { 
                 writeVersion(self, version_file, content); 
                 return; 
             } 
             FStream.mkdir(dir_path, function (err) { 
                 if (err) throw err; 
                 console.log('\n创建目录[' + dir_path + ']成功'); 
                 writeVersion(self, version_file, content); 
             }); 
         }); 
     }); 
     //编译器'对'所有任务已经完成'这个事件的监听 
     compiler.plugin("done", function (stats) { 
         console.log("开始打包压缩编译文件..."); 
         var output = FStream.createWriteStream(self.options.outZipFile); 
         var archiveZip = Archiver('zip', {zlib: {level: 9}}); 
             archiveZip.on('error', function (err) { 
             throw err; 
         }); 
 
 
         archiveZip.pipe(output); 
         archiveZip.directory(self.options.path + '/' + self.options.versionDirectory, self.options.versionDirectory); 
         archiveZip.file(self.options.path + '/index.html', {name: 'index.html'}); 
         //archive.glob(self.options.path + '/*.*'); 
         archiveZip.finalize(); 
     }); 
 }; 
 
 
 const writeVersion = (self, versionFile, content) => { 
     console.log("\n当前版本号：" + self.options.env.VERSION); 
     console.log("开始写入版本信息..."); 
     //写入文件 
     FStream.writeFile(versionFile, content, function (err) { 
     if (err) throw err; 
         console.log("版本信息写入成功!"); 
     }); 
     //删除之前的压缩包 
     FStream.exists(self.options.outZipFile, function (exists) { 
         if (exists) { 
             FStream.unlinkSync(self.options.outZipFile); 
         } 
     }); 
 } 
 
 module.exports = DiyPlugin;
```


5.在webpack配置文件中添加 diy-plugin.js 编译钩子：

![  ](./assets/image/387466-20171201101913195-2066411951_gSsksqOT7T.png "  ")

 6. ok，至此结束。 执行编译：

npm run build

![  ](./assets/image/387466-20170807184054096-112524305_wlpe91foxu.png "  ")

 7. 访问项目，再次编译版本，打开之前的项目界面，点击其他导航菜单，效果如下：

![  ](./assets/image/387466-20170807184524768-667532243_JuXuw-EqR8.png "  ")

# **2.单文件组件**

不能出现两个script组件；可以有两个style；

否则会出现报错

# **3.不去掉scoped属性更改第三方组件样式**

### **第一种 >>> 第三方组件样式名(普通css中使用)**

```javascript 
>>> 第三方组件{
  样式
}
```


### **第二种 /deep/ 第三方组件样式名：(预编译css中使用)**

```javascript 
/deep/ 第三方组件{
  样式
}
```


### **第三种 /deep/ 第三方组件样式名：(通用)**

```javascript 
::v-deep 第三方组件{ 
  样式
}
```
