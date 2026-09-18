# 戳中你痛点的软键盘问题及解决方法

## 目录

- [先要弄懂的问题](#先要弄懂的问题)
  - [1、当键盘弹起来的时候，会发生什么](#1当键盘弹起来的时候会发生什么)
    - [IOS 软键盘弹起表现](#IOS-软键盘弹起表现)
    - [Android 软键盘弹起表现](#Android-软键盘弹起表现)
    - [IOS 软键盘收起表现](#IOS-软键盘收起表现)
    - [Android 软键盘收起表现](#Android-软键盘收起表现)
  - [2、为什么fixed会失效](#2为什么fixed会失效)
  - [3、怎么监听键盘弹起和收起的动作](#3怎么监听键盘弹起和收起的动作)
    - [Ios](#Ios)
    - [android](#android)
- [解决办法](#解决办法)
  - [1、吸顶元素能够继续吸顶](#1吸顶元素能够继续吸顶)
    - [衍生问题:](#衍生问题)
    - [衍生问题解决办法](#衍生问题解决办法)
  - [2、吸底元素（也就是按钮）能够在键盘弹出之后，出现在键盘的上方](#2吸底元素也就是按钮能够在键盘弹出之后出现在键盘的上方)
    - [解决办法：](#解决办法)
  - [3、键盘弹起，输入框出现在可视区内。（对于这点，ios本身是支持的，但是安卓却并不会主动让输入框出现在可视区域内）](#3键盘弹起输入框出现在可视区内对于这点ios本身是支持的但是安卓却并不会主动让输入框出现在可视区域内)
  - [4、ios软键盘收起时页面不能自然滑落](#4ios软键盘收起时页面不能自然滑落)
    - [解决办法：](#解决办法)
- [参考文章：](#参考文章)

[ 移动端那些戳中你痛点的软键盘问题及解决方法 - 掘金 一篇文章，让你远离移动端软键盘疑难杂症。"踩坑人"带你远离软键盘之坑，从避坑（软键盘问题）到填坑（如何解决） https://juejin.cn/post/6961757804491178014](https://juejin.cn/post/6961757804491178014 " 移动端那些戳中你痛点的软键盘问题及解决方法 - 掘金 一篇文章，让你远离移动端软键盘疑难杂症。\"踩坑人\"带你远离软键盘之坑，从避坑（软键盘问题）到填坑（如何解决） https://juejin.cn/post/6961757804491178014")

## 先要弄懂的问题

解决这些问题之前，需要弄明白以下2个问题：

### 1、当键盘弹起来的时候，会发生什么

这里ios和安卓系统下表现的并不一致。这个参考了朱雷大佬提供的这个文章：[WebView上软键盘的兼容方案](https://link.juejin.cn?target=https://setcina.github.io/2020/01/20/WebView%E4%B8%8A%E8%BD%AF%E9%94%AE%E7%9B%98%E7%9A%84%E5%85%BC%E5%AE%B9%E6%96%B9%E6%A1%88/ "WebView上软键盘的兼容方案")

#### IOS 软键盘弹起表现

在 IOS 上，输入框（input、textarea 或 富文本）获取焦点，键盘弹起，**页面（webview）并没有被压缩，或者说高度（height）没有改变，只是页面（webview）整体往上滚了，且最大滚动高度（scrollTop）为软键盘高度。**

#### Android 软键盘弹起表现

同样，在 Android 上，输入框获取焦点，键盘弹起，但是页面（webview）高度会发生改变，一般来说，**高度为可视区高度（原高度减去软键盘高度），除了因为页面内容被撑开可以产生滚动，webview本身不能滚动。**

#### IOS 软键盘收起表现

触发软键盘上的“收起”按钮键盘或者输入框以外的页面区域时，输入框失去焦点，软键盘收起。

#### Android 软键盘收起表现

触发输入框以外的区域时，输入框失去焦点，软键盘收起。但是，触发键盘上的收起按钮键盘时，输入框并不会失去焦点，同样软键盘收起。

### 2、为什么fixed会失效

既然ios键盘弹起时，页面会上移，那么为什么fixed会失效呢。

这里参考这篇文章：[ios键盘难题与可见视口（visualViewport）api](https://link.juejin.cn?target=http://www.alloyteam.com/2020/02/14265/comment-page-1/#prettyPhoto "ios键盘难题与可见视口（visualViewport）api")

当时ios设计者考虑到一个问题：当键盘弹起时，页面无法感知到键盘的存在。那么，如果将要输入的目标（即「输入框」，例如 input、textarea 或一般的 contenteditable 元素）正好被弹起的键盘遮住，体验不会很糟糕吗？

为了解决这个问题，ios设计者们让webview上滚，但滚动的结果有些出乎意料：输入框本身可以理解地滚动到了实际可视区域的正中间，但 fixed 元素不会发生重新计算，而是保持原来的相对位置，跟着输入框一起被上推；在滚动过程中，还会允许屏幕底部超出页面底部（「滚动过头」），以便让输入框尽可能露出来。收起键盘后，「滚动过头」的部分会被弹回，fixed 元素发生重新计算，但页面并不会回到与打开键盘前相同的位置。

### 3、怎么监听键盘弹起和收起的动作

既然是键盘弹起来造成的问题，那么解决这个问题必然需要监听键盘弹起和收起的动作，那怎么监听呢。同样参考这篇文章：[WebView上软键盘的兼容方案](https://link.juejin.cn?target=https://setcina.github.io/2020/01/20/WebView%E4%B8%8A%E8%BD%AF%E9%94%AE%E7%9B%98%E7%9A%84%E5%85%BC%E5%AE%B9%E6%96%B9%E6%A1%88/ "WebView上软键盘的兼容方案")

综合上面键盘弹起和收起在 IOS 和 Android 上的不同表现，我们可以分开进行如下处理来监听软键盘的弹起和收起：

#### Ios

在 IOS 上，监听输入框的 focus 事件来获知软键盘弹起，监听输入框的 blur 事件获知软键盘收起。在 Android 上，监听 webview 高度会变化，高度变小获知软键盘弹起，否则软键盘收起。

```javascript 
// IOS 键盘弹起：当输入框被聚焦时IOS键盘会被弹起
  inputRef?.current?.addEventListener('focus', function () {
    // IOS 键盘弹起后操作
  }, false)

  // IOS 键盘收起：当点击输入框以外区域或点击收起按钮，IOS输入框都会失去焦点，键盘会收起，
  inputRef?.current?.addEventListener('blur', () => {
    // IOS 键盘收起后操作
  })

```


#### android

在 Android 上，监听 webview 高度变化，高度变小获知软键盘弹起，否则软键盘收起。

```javascript 
useEffect(() => {
    const { isAndroid } = Util.getOS('');
    let originHeight = document.documentElement.clientHeight || document.body.clientHeight;
    const handelAndroidResize = throttle(() => {
        const resizeHeight =
            document.documentElement.clientHeight || document.body.clientHeight;
        if (originHeight < resizeHeight) {
            // Android 键盘收起后操作
        } else {
            // Android 键盘弹起后操作
        }
        originHeight = resizeHeight;
    }, 300);

    if (isAndroid) {
        window.addEventListener('resize', handelAndroidResize, false);
    }

    return () => {
        if (isAndroid) {
            window.removeEventListener('resize', handelAndroidResize, false);
        }
    };
  }, []);

```


## 解决办法

下面就开始一一对上面说的问题进行分析解决：

### 1、吸顶元素能够继续吸顶

这个问题因为键盘弹出ios和安卓的处理方式不同，**这个现象就只发生在ios系统中。**

当时找了一圈方法，觉得并没有合适的解决方法，退而求其次，既然h5无没有办法很好的解决吸顶问题，那么这个能力不如就用客户端的能力好了，客户端的header不属于webview内容，自然webview上推时，客户端的header就还是吸顶状态。

我们当时的情况下，客户端的jsb能力只能够支持简单的一个返回按钮加一个居中标题作为header。所以有右上角的“历史评价”就不能够直接用jsb能力写，所以只能和ui同学商量，将原本的设计方案改一下。变成如下设计，就能够使用jsb能力写header了。

#### 衍生问题:

但这样引出了一个新的问题：在安卓系统下的app端，会有底部按钮被遮挡的问题。

#### 衍生问题解决办法

之前header头用的是前端自己写的header时，没有这个问题，推测是因为安卓手机在键盘弹起时的webview高度缩短为整个屏幕的高度减去键盘的高度， 在之前的实现中，由于使用沉浸式header，所以前端webview高度就是整个屏幕的高度，而现在由于采用的是客户端jsb能力，所以webview剩余高度就需要减去header头的高度。所以解决办法就是让键盘弹起时，添加吸底按钮以及底部元素的margin-bottom为header的高度就行。

### 2、吸底元素（也就是按钮）能够在键盘弹出之后，出现在键盘的上方

对于这个问题，因为安卓表现是webview缩小，**所以在安卓上并不存在这个问题，对于ios，因为ios向上滚动的距离最大是键盘的高度，但是也有可能滚动距离不是键盘高度，导致吸底按钮会被遮挡。**

#### 解决办法：

让键盘弹起来的时候，让输入框加入scrollIntoView(true);方法。这其实可能只适用于我这种情景，这个解决办法的原理是：scrollIntoView(true)想让输入框的顶部滚动到与可视区顶部齐平的效果，但是由于ios键盘弹起之后最大滚动距离等于键盘的高度，所以，通过这个方法会让webview滚动距离等于ios键盘的高度，达到了吸底按钮吸底的效果。

### 3、键盘弹起，输入框出现在可视区内。（对于这点，ios本身是支持的，但是安卓却并不会主动让输入框出现在可视区域内）

这个简单，让元素滚动到可视区内，直接用scrollIntoView(true)方法就好。

### 4、ios软键盘收起时页面不能自然滑落

对于部分ios系统下的部分微信webview内，发现软键盘收起时，滚动上去的页面没有滚动下来，造成了下面区域留出了一片灰色的区域。其实这是 Apple 在 IOS 的 bug，会出现在所有的 Xcode10 打包的 IOS12 的设备上。微信官方已给出解决方案（[点击查看](https://link.juejin.cn?target=https://developers.weixin.qq.com/community/develop/doc/00044ae90742f8c82fb78fcae56800 "点击查看")）。

#### 解决办法：

当键盘收起时，加入下面其中一种办法就可以解决

1. 滚动到顶部

```javascript 
window.scrollTo(0,0)
```


1. 滚动到底部

```javascript 
window.scrollTo(0, Math.max(document.body.clientHeight, document.documentElement.clientHeight));

```


**本场景代码**

```javascript 
const handleIosInputBlur = () => {
    // IOS 键盘收起后操作
    // 微信浏览器版本6.7.4+IOS12会出现键盘收起后，视图被顶上去了没有下来
    const wechatInfoRe = /MicroMessenger\/([\d\.]+)/i;
    const wechatInfo = wechatInfoRe.exec(window?.navigator?.userAgent);
    const wechatVersion = wechatInfo && wechatInfo.length > 1 && wechatInfo[1];

    const osInfoRe = /OS (\d+)_(\d+)_?(\d+)?/i;
    const osInfo = osInfoRe.exec(navigator.appVersion);
    const osVersion = osInfo && osInfo.length > 1 && osInfo[1];

    if (!wechatVersion || !osVersion) {
        return;
    }
    const height = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
        if (Number(wechatVersion.replace(/\./g, '')) >= 674 && Number(osVersion) >= 12) {
            window.scrollTo(0, height);
        }
    };

```


## 参考文章：

[WebView上软键盘的兼容方案](https://link.juejin.cn/?target=https://setcina.github.io/2020/01/20/WebView%E4%B8%8A%E8%BD%AF%E9%94%AE%E7%9B%98%E7%9A%84%E5%85%BC%E5%AE%B9%E6%96%B9%E6%A1%88/ "WebView上软键盘的兼容方案")

[js如何获取iOS键盘高度](https://link.juejin.cn/?target=https://zhuanlan.zhihu.com/p/359955143 "js如何获取iOS键盘高度")

[移动端input“输入框”常见问题及解决方法](https://link.juejin.cn/?target=https://www.huaweicloud.com/articles/979b05af7fa9b4382bfc1e408f7d0067.html "移动端input“输入框”常见问题及解决方法")

[ios键盘难题与可见视口（visualViewport）api](https://link.juejin.cn/?target=http://www.alloyteam.com/2020/02/14265/comment-page-1/#prettyPhoto "ios键盘难题与可见视口（visualViewport）api")
