# 能打的本地存储方案

## 目录

- [前言](#前言)
- [方案选择](#方案选择)
- [localforage](#localforage)
  - [关于兼容性](#关于兼容性)
  - [关于存储量](#关于存储量)
  - [使用](#使用)
    - [安装](#安装)
    - [获取存储](#获取存储)
    - [设置存储](#设置存储)
    - [删除存储](#删除存储)
    - [清空存储](#清空存储)
    - [更多](#更多)
- [localforage是否万事大吉？](#localforage是否万事大吉)
  - [问题](#问题)
  - [分析](#分析)
  - [进一步假设](#进一步假设)
  - [延伸](#延伸)
  - [解决](#解决)

## 前言

之前开发了一个离线存储的需求，需要**在本地存储较大的数据量**，并且还要考虑到**多种场景下的存储方式兼容**。产品的原话就是“要又大又全”。既然存储量大，也要覆盖全多种设备多种浏览器。

## 方案选择

- 既然要存储的数量大，得排除cookie
- localStorage，虽然比cookie多，但是同样有上限（5M）左右，备选
- websql 使用简单，存储量大，兼容性差，备选
- indexDB api多且繁琐，存储量大、高版本浏览器兼容性较好，备选

既然罗列了一些选择，都没有十全十美的，那么有没有一种能够集合这多种方式的插件呢？渐进增强 or 优雅降级 的存在
冲着这个想法，就去github和谷歌找了一下，还真的有这么一个插件。
那就是 localforage github地址\[1]

## localforage

`localForage `是一个 `JavaScript `库，只需要通过简单类似 `localStorage` API **的异步存储来改进你**的 Web 应用程序的离线体验。它能**存储多种类型的数据，而不仅仅是字符串。**

### 关于兼容性

`localForage `有一个优雅降级策略，若浏览器不支持 `IndexedDB `或 `WebSQL`，则使用 `localStorage`。在所有主流浏览器中都可用：Chrome，Firefox，IE 和 Safari（包括 Safari Mobile）。下面是 indexDB、web sql、localStorage 的一个浏览器支持情况，可以发现，兼容性方面loaclForage基本上满足99%需求

![](https://mmbiz.qpic.cn/mmbiz/TZL4BdZpLdia5HaSuiakoshrP1n4csHHNNlIsmAECJ3usa2IaKPbcEsfUbpuj7bAqCBOldMsjQZ3PxxEAesYuXrg/640?wx_fmt=other)

![image.png](https://mmbiz.qpic.cn/mmbiz/TZL4BdZpLdia5HaSuiakoshrP1n4csHHNNr8cRiamia0ak4eib0pjjJRojQu2UhAueyYTZDegQctddibbaEsibWQwoFrg/640?wx_fmt=other "image.png")

![image.png](https://mmbiz.qpic.cn/mmbiz/TZL4BdZpLdia5HaSuiakoshrP1n4csHHNNevibNgOVjP8WiaBnsX2l9n0vTA6fZgeiaLw4zicdQxh14fYkHIhhtGBVxA/640?wx_fmt=other "image.png")

### 关于存储量

首先indexDB的存储，**理论上是硬件有多大内存就可以存多少**，但是有些浏览器厂商会限制，具体限制各家不同，但是**基本最小是250M起步**

### 使用

解决了兼容性和存储量的点，我们就来看看localforage的基础用法

#### 安装

```javascript 
# 通过 npm 安装：
npm install localforage

```


```javascript 
// 直接引用
<script src="localforage.js"></script>
<script>console.log('localforage is: ', localforage);</script>

```


#### 获取存储

`getItem(key, successCallback)`

从仓库中获取 `key `对应的值并将结果提供给回调函数。如果 `key `不存在，`getItem()` 将返回 `null`。

```javascript 
localforage.getItem('somekey').then(function(value) {
    // 当离线仓库中的值被载入时，此处代码运行
    console.log(value);
}).catch(function(err) {
    // 当出错时，此处代码运行
    console.log(err);
});
// 回调版本：
localforage.getItem('somekey', function(err, value) {
    // 当离线仓库中的值被载入时，此处代码运行
    console.log(value);
});

```


#### 设置存储

`setItem(key, value, successCallback)`

将数据保存到离线仓库。你可以存储如下类型的 JavaScript 对象：

- **`Array`**
- **`ArrayBuffer`**
- **`Blob`**
- **`Float32Array`**
- **`Float64Array`**
- **`Int8Array`**
- **`Int16Array`**
- **`Int32Array`**
- **`Number`**
- **`Object`**
- **`Uint8Array`**
- **`Uint8ClampedArray`**
- **`Uint16Array`**
- **`Uint32Array`**
- **`String`**

```javascript 
localforage
  .setItem("somekey", "some value")
  .then(function (value) {
    // 当值被存储后，可执行其他操作
    console.log(value);
  })
  .catch(function (err) {
    // 当出错时，此处代码运行
    console.log(err);
  });
// 不同于 localStorage，你可以存储非字符串类型
localforage
  .setItem("my array", [1, 2, "three"])
  .then(function (value) {
    // 如下输出 `1`
    console.log(value[0]);
  })
  .catch(function (err) {
    // 当出错时，此处代码运行
    console.log(err);
  });
// 你甚至可以存储 AJAX 响应返回的二进制数据
req = new XMLHttpRequest();
req.open("GET", "/photo.jpg", true);
req.responseType = "arraybuffer";
req.addEventListener("readystatechange", function () {
  if (req.readyState === 4) {
    // readyState 完成
    localforage
      .setItem("photo", req.response)
      .then(function (image) {
        // 如下为一个合法的 <img> 标签的 blob URI
        var blob = new Blob([image]);
        var imageURI = window.URL.createObjectURL(blob);
      })
      .catch(function (err) {
        // 当出错时，此处代码运行
        console.log(err);
      });
  }
});

```


#### 删除存储

`removeItem(key, successCallback)`

从离线仓库中删除 key 对应的值。

```javascript 
localforage.removeItem('somekey').then(function() {
    // 当值被移除后，此处代码运行
    console.log('Key is cleared!');
}).catch(function(err) {
    // 当出错时，此处代码运行
    console.log(err);
});

```


#### 清空存储

`clear(successCallback)`

从数据库中删除所有的 key，重置数据库。

`localforage.clear()` 将会删除**离线仓库中的所有值**。谨慎使用此方法。

```javascript 
localforage.clear().then(function() {
    // 当数据库被全部删除后，此处代码运行
    console.log('Database is now empty.');
}).catch(function(err) {
    // 当出错时，此处代码运行
    console.log(err);
});

```


#### 更多

除了基本的增删查改，还有一些配置，如指定具体使用哪一种存储方式、设置数据库的名称、长度等信息 可参考 官方文档\[2]

## localforage是否万事大吉？

用上了localforage一开始我也以为可以完全满足万恶的产品了，然而。。。翻车了

### 问题

在这个功能上线半年，一直相安无事，有一天晚上突然产品说接到反馈说有用户的手机进入页面没有缓存上次的操作数据。
我第一反应，“不可能，绝对不可能”

![](https://mmbiz.qpic.cn/mmbiz/TZL4BdZpLdia5HaSuiakoshrP1n4csHHNNDQYUX8be5NVnVQ4FjrmTHSjN78iaFqLxrpJMftSxtmLzXmibicpgV4OMQ/640?wx_fmt=other)

我询问了一下，用户的手机是什么型号，当我看到手机图片的时候。。。我是没想到。。。
如下图：

![image.png](https://mmbiz.qpic.cn/mmbiz/TZL4BdZpLdia5HaSuiakoshrP1n4csHHNNPeVfJjia2Yibb70FYWe9noU1Yb3icgcMWDxT9iccsecP2SoElHRwoMmoVw/640?wx_fmt=other "image.png")

这玩意，一些小年轻都可能没见过。。。。iphone4哇，现在是出到了iphone14了吧？？？
不得了不得了，iphone4居然也是我们的用户群体？？？

### 分析

既然遇上了，还是冷静分析一下吧。起初第一反应是这古董机的兼容性有问题，是不是只支持localstorage导致只能存储5M的内容，超过了上限，导致无法缓存了？

然而，当产品不知道从哪找到了一部iphone4给我（我也真的服了这个老6），我拿到真机试了下，得到让我无法呼吸的结果，iphone4这古董机居然支持indexDB，那么就不是超过了5M的上限导致缓存失败了

### 进一步假设

在知道iphone4居然支持indexDB后，我失去头绪了，拿着十年前的这个古董机，随便翻翻，看看系统，看看版本，没看出什么问题，但是我发现这iphone4的内存也是出奇的小，只有8G内存。等等，8G内存，如果手机内存不足的前提下，localforage继续缓存会怎么样？
随即，随便下载点软件，毫不费力就将这台iphone4的内存整得只剩下50M不到了，手机已经开始提示要清理内存。
在这种状态下，尝试使用localforage，不出意外，抛错了 **`QuotaExceededError`**\*\* 的 \*\*​**`DOMError`**

### 延伸

虽然现在的硬件设备内存大部分都很大，但是本着产品的“又大又全”理念，还是打算处理一下。当然除了处理这台古董机，也延伸出更多优化的可能性

- 当设备不支持 indexDB和web sql的时候，只支持loaclStorage存储量只有5M，应该怎么处理？
- 如果存储数据出现了脏数据或者读取问题，想要清理用户设备上的数据怎么处理？

### 解决

存储数据的时候**加上存储的时间戳和模块标识，加时间戳一起存储**

```javascript 
setItem({
    value: '1',
    label: 'a',
    module: 'a',
    timestamp: '11111111111'
})

```


- 如果是遇到存储使用报错的情况，try/catch捕获之后，通过判断报错提示，去执行相应的操作，遇到内存不足的情况，**则根据时间戳和模块标识清理一部分旧数据（内存不足的情况还是比较少的）**
- 在用户手机上产生脏数据的情况，想要清理的这种情况的 处理方式是：

1. 让后端在用户信息接口里面加**上缓存有效期时间戳，当该时间戳存在，则前端会进行一次对本地存储扫**描
2. 在有效期时间戳之前的数据，结合模块标识，进行清理，清理完毕后调用后端接口上报清理日志
3. 模块**标识的意义是清理数据的时候，可以按照模块去清理（选填）**

![](https://mmbiz.qpic.cn/mmbiz/TZL4BdZpLdia5HaSuiakoshrP1n4csHHNN7R2kfMaCG9sHGpus6Dx2uiaHIqWtazJ3FJibkoT5KqDlswcUq1DIrayg/640?wx_fmt=other)
