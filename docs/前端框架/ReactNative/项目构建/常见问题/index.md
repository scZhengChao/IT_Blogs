# 常见问题

## 目录

- [解决React Native的Image组件中不更新图片的问题 ](#解决React-Native的Image组件中不更新图片的问题-)
- [编译打包的缓存问题 ](#编译打包的缓存问题-)
  - [一、metro 的缓存机制 ](#一metro-的缓存机制-)
    - [1、为什么要缓存 ](#1为什么要缓存-)
    - [2、两种缓存机制 ](#2两种缓存机制-)
    - [3、FileStore 缓存原理 ](#3FileStore-缓存原理-)
  - [二、metro 缓存到哪里去了 ](#二metro-缓存到哪里去了-)
  - [三、缓存导致的问题及解决方案 ](#三缓存导致的问题及解决方案-)
    - [1、问题](#1问题)
    - [2、解决方案 ](#2解决方案-)
- [TextInput获取焦点后我需要触发点击事件，需要点击两次](#TextInput获取焦点后我需要触发点击事件需要点击两次)

# 解决React Native的Image组件中不更新图片的问题&#x20;

使用React Native一段时间了，也遇到过不少的坑。有时候我们会用一个Image控件来显示图片，它用uri来请求远程图片，但这个图片会被更新，但请求的uri却不变。（典型的应用就是用户更新头像，而我们设计头像的uri存放在服务器的固定路径中，并以用户id来命名，最终，用户头像的uri就形如http\://域名/图片路径/用户id.jpg）。

然而将这个uri写到Image控件后，得到\<Image source={undefined{uri:图片uri}} style={styles.icon}/>，这样的话，即使服务器中的图片改变了，这要它的文件名不变，导致请求图片的uri也不变，则Image中的图像的得不到更新的。我猜RN在设计Image时考虑到缓存问题，重新渲染Image前对比了前后的uri，如果相同的话则不再重新请求。

基于上述假设在uri后面添加一个随机参数v，让每次请求的uri都不相同，得到\<Image source={undefined{uri:图片uri?v=Math.random()}} style={styles.icon}/>，这样的话就可以解决服务器图片更新，Image图片不更新的问题。

解决上述问题还有一种方法，那就是采用base64编码字符串来显示图片。让服务器返回给前端一个图片的base64编码字符串，而不是通常意义下的图片uri。我们知道两个不同图片的base64编码字符串是不同的，所以下面的代码也可以解决上述问题:

```javascript 
this.setState({iconbase64:远程图片的base64编码字符串});

<Image source={undefined{uri:this.state.iconbase64}} style={styles.icon}/>
```


# [编译打包的缓存问题 ](https://www.jianshu.com/p/52620bc4b728 "编译打包的缓存问题 ")

## 一、metro 的缓存机制&#x20;

#### 1、为什么要缓存&#x20;

**react-native 在执行 react-native start 或者 react-native bundle 命令的时候，都会有缓存。**

目的其实很简单，metro 在打包的时候需要将 TS 和 ES6/7 的代码转换为 ES5 的目标代码。 那如果一个文件没有任何变更，这个时候我们就不需要去转换它了，所以 metro 设置了一套文件缓存机制来优化编译转换速度 。&#x20;

#### 2、两种缓存机制&#x20;

**metro 的缓存实现在 node\_modules/metro-cache 中，主要有两种缓存机制：**

- 服务端缓存：HttpStore
- 本地缓存：FileStore

服务端主要是通过服务器来缓存相关内容，优势是不用担心缓存的大小和时间限制，可以灵活的设置缓存策略，不过这个我们目前没有使用到，后期可以考虑。&#x20;

metro 默认的缓存机制是 FileStore，这也是我们目前使用的缓存机制，FileStore 实际上就是将编译转换后的文件缓存起来，以便下一次编译的时候能够避免重复转换，加快编译速度。&#x20;

#### 3、FileStore 缓存原理&#x20;

**FileStore 缓存的原理其实很简单：**

- 缓存的key：表名 + 文件内容映射生成的 hash 值
- 缓存的内容：转换后的文件内容

当执行转换的时候，如果发现文件的 hash 值存在，那么就说明文件内容没有发生变化，就不会去执行转换操作， 大大节省了编译时间。FileStore 为了避免 hash 碰撞，采用了分表存储，具体可以查看 FileStore.js 的源代码来了解更多。&#x20;

![  ](./image/a546fc29a65b76c521f66c0eb5969221_ci0bxMIQeh.png "  ")

## 二、metro 缓存到哪里去了&#x20;

知道了 metro 的缓存机制，那么这个缓存到底存储在本地系统的什么位置呢？&#x20;

查看 FileStore.js 源代码发现初始化 FileStore 时会传入一个 root 参数，这个 root 其实就是缓存存储的路径。所以我们只要知道 FileStore 在哪里初始化的，就能知道缓存的地址了。&#x20;

## 三、缓存导致的问题及解决方案&#x20;

### **1、问题**

react-native 的缓存会导致各种问题，

常见的问题为更新了依赖库，团队中有的小伙伴能正常运行，有的缺报莫名其妙的错误，这是在执行 npm start 时缓存带来的问题

，实际上执行 react-native bundle 打包也会有缓存问题，所以问题从大类来讲有以下两类：&#x20;

1. **修改了依赖库，团队中有的小伙伴能正常运行****，有的则报出莫名其妙的错误**​
2. \*\* react-native bundle 打包偶现 找不到 metro-cahce/T/xxxx 文件错误\*\*​

这两类问题

都是由于 metro 缓存导致的。&#x20;

### 2、解决方案&#x20;

既然是缓存问题，那么清除缓存就能够解决问题，有以下几种方案来清除缓存:&#x20;

1. **重启电脑**：tempdir 目录是一个临时目录，在重新电脑之后实际上就会被清除，所以 tempdir 目录下的 metro-cache 目录也会被清除
2. **手动删除缓存**：终端执行 echo \$TMPDIR 获取 临时目录，再拼接上 metro-cache 得到缓存目录，手动删除 metro-cache 目录即可
3. **自动删除缓存**：metro打包提供了不少参数，其中就有一个清除缓存的参数，只需在执行 start 和 bundle 时带上 --reset-cache即可自动删除缓存

作者：peaktan 链接：<https://www>.

[jianshu.com/p/52620bc4b728](http://jianshu.com/p/52620bc4b728 "jianshu.com/p/52620bc4b728")

来源：简书 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。&#x20;

# TextInput获取焦点后我需要触发点击事件，需要点击两次

```javascript 
 keyboardShouldPersistTaps = { 'handled' }
```


[react-native开发总结之TextInput失去焦点触发事件和TextInput间切换\_氵飘叶的博客-CSDN博客 问题：如何在TextInput失去焦点触发事件？需求：在TextInput输入文字后，旁边有个取消按钮，点击取消按钮会有事件触发。（模糊搜索）突发情况：在TextInput获取焦点后我需要触发点击事件，需要点击两次：第一次失去焦点，第二次方可触发点击事件；百度求助后都说是需要在外层套一个\&amp;lt;ScrollView keyboardShouldPersistTaps={'handl... https://blog.csdn.net/weixin\_41717785/article/details/81318212](https://blog.csdn.net/weixin_41717785/article/details/81318212 "react-native开发总结之TextInput失去焦点触发事件和TextInput间切换_氵飘叶的博客-CSDN博客 问题：如何在TextInput失去焦点触发事件？需求：在TextInput输入文字后，旁边有个取消按钮，点击取消按钮会有事件触发。（模糊搜索）突发情况：在TextInput获取焦点后我需要触发点击事件，需要点击两次：第一次失去焦点，第二次方可触发点击事件；百度求助后都说是需要在外层套一个\&amp;lt;ScrollView keyboardShouldPersistTaps={'handl... https://blog.csdn.net/weixin_41717785/article/details/81318212")
