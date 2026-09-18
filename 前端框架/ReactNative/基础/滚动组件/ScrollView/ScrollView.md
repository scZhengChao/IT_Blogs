# ScrollView

## 目录

- [stickyHeaderIndices](#stickyHeaderIndices)
- [showsHorizontalScrollIndicator](#showsHorizontalScrollIndicator)
- [showsVerticalScrollIndicator](#showsVerticalScrollIndicator)
- [scrollTo()](#scrollTo)
- [使用中bug：](#使用中bug)
- [除了SectionList还有其他吸顶的方法：](#除了SectionList还有其他吸顶的方法)
- [嵌套使用和触摸滚动](#嵌套使用和触摸滚动)
- [RN获取WebView高度、嵌套ScrollView后的滑动问题 ](#RN获取WebView高度嵌套ScrollView后的滑动问题-)
  - [获取WebView内容高度 ](#获取WebView内容高度-)
  - [在 Android 上 ScrollView 嵌套 WebView 滑动手势问题 ](#在-Android-上-ScrollView-嵌套-WebView-滑动手势问题-)

            记住 ScrollView 必须有**一个确定的高度才能正常工作**，因为它实际上所做的就是将**一系列不确定高度的子组件装进一个确定高度的容器（通过滚动操作）**

。要给 ScrollView 一个确定的高度的话，要么直接给它设置高度（不建议），要么确定所有的父容器都有确定的高度 **。一般来说我们会给 ScrollView 设置flex: 1**

          以使其自动填充父容器的空余空间，但前提条件是所有的父容器本身也设置了 flex 或者指定了高度，否则就会导致无法正常滚动，你可以使用元素查看器来查找具体哪一层高度不正确。

**ScrollView 内部的其他响应者尚无法阻止 ScrollView 本身成为响应者。**

           ScrollView和FlatList应该如何选择？

**ScrollView 会简单粗暴地把所有子元素一次性全部渲染出来**。其原理浅显易懂，使用上自然也最简单。然而这样简单的渲染逻辑自然带来了性能上的不足。想象一下你有一个特别长的列表需要显示，可能有好几屏的高度。创建和渲染那些屏幕以外的 JS 组件和原生视图，显然对于渲染性能和内存占用都是一种极大的拖累和浪费。

         这就是为什么我们还有专门的FlatList组件。FlatList会惰性渲染子元素，只在它们将要出现在屏幕中时开始渲染。这种惰性渲染逻辑要复杂很多，因而 API 在使用上也更为琐。除非你要渲染的数据特别少，否则你都应该尽量使用FlatList，哪怕它们用起来更麻烦。

1、ScrollView组件上不能存在高度和flex，

2、ScrollView如果为嵌套的子组件，其父组件上必须有固定高度

3.绝对定位在里面不好使；还是会随着滚动

## stickyHeaderIndices

         一个子视图下标的数组，用于决定哪些成员会在滚动之后固定在屏幕顶端。举个例子，

**传递stickyHeaderIndices={\[0]}**

会让第一个成员固定在滚动视图顶端。这个属性不能和horizontal={true}一起使用。

- 吸顶的效果；注意是第一个组件子元素；这个组件里可以做很多事
- &#x20;数组会写多个，有那种推上去的感觉；这样的交互很多；
- position 在里面不好使；在stickyHeaderIndices 也不好使,即使是设置了zindex 也不管作用，他会随着一起吸顶

## showsHorizontalScrollIndicator

当此属性为 true 的时候，显示一个水平方向的滚动条。

## showsVerticalScrollIndicator

当此属性为 true 的时候，显示一个垂直方向的滚动条。&#x20;

## scrollTo()

       滚动到指定的 x, y 偏移处。第三个参数为是否启用平滑滚动动画。还有一个 duration 参数则是仅限 android 可以使用的滚动持续时间。

示例：

scrollTo({x: 0, y: 0, animated: true})

指定滚动持续时间的示例(仅限 Android):

scrollTo({x: 0, y: 0, duration: 500})

## 使用中bug：

onScrollEndDrag 一定会被调用，

onMomentumScrollEnd 如果手指拖动很慢，没有动画滚动就不会调用 &#x20;

&#x20;ios很明显

onContentSizeChange 非常强大；在content loyout 时调用；在保持滚动到底部等滚动操作时 非常有用

## 除了SectionList还有其他吸顶的方法：

可以看一下Animate.ScrollView ，大神级写法吸顶

\[\[RN] React Native 头部 滑动吸顶效果的实现 - wukong1688 - 博客园 React Native 头部 滑动吸顶效果的实现

效果如下图所示：

实现方法：

一、吸顶组件封装 <https://www.cnblogs.com/wukong1688/p/11045306.html>]\(<https://www.cnblogs.com/wukong1688/p/11045306.html> "\[RN] React Native 头部 滑动吸顶效果的实现 - wukong1688 - 博客园 React Native 头部 滑动吸顶效果的实现

效果如下图所示：

实现方法：

一、吸顶组件封装 <https://www.cnblogs.com/wukong1688/p/11045306.html>")

## 嵌套使用和触摸滚动

这个文章写的很好；值得一看；解决我嵌套时用时；横向滚动老是会触发点击事件

(手势冲突）见手势系统和动画响应

[react-native ScrollView触摸与滚动事件\_神奇的小猴子的博客-CSDN博客\_rn scrollview 滚动事件 ScrollView是我们常用的组件之一，因此搞清楚它的触摸与滚动事件十分重要！1.在ScrollView里面轻触一下（1）onStartShouldSetResponderCapture     这个属性接收一个回调函数，函数原型是 function(evt): bool，在触摸事件开始（touchDown）的时候，RN 容器组件会回调此函数，询问组件是否要劫持事件响应者设置，自己接收事件处理， https://blog.csdn.net/qq\_30053399/article/details/77680049](https://blog.csdn.net/qq_30053399/article/details/77680049 "react-native ScrollView触摸与滚动事件_神奇的小猴子的博客-CSDN博客_rn scrollview 滚动事件 ScrollView是我们常用的组件之一，因此搞清楚它的触摸与滚动事件十分重要！1.在ScrollView里面轻触一下（1）onStartShouldSetResponderCapture     这个属性接收一个回调函数，函数原型是 function(evt): bool，在触摸事件开始（touchDown）的时候，RN 容器组件会回调此函数，询问组件是否要劫持事件响应者设置，自己接收事件处理， https://blog.csdn.net/qq_30053399/article/details/77680049")

## RN获取WebView高度、嵌套ScrollView后的滑动问题&#x20;

### 获取WebView内容高度&#x20;

***

通过注入js获取网页内容高度，然后调用window\.ReactNativeWebView\.postMessage方法把高度回调给onMessage方法（此方法父组件的 style 中若使用到了 display 属性获取到的 height 会错误

```javascript 
 <WebView
  injectedJavaScript={`
    (function () {
        function changeHeight() {
          let height = 0;
          if (document.documentElement && (document.documentElement.scrollHeight)) {
            height = document.documentElement.scrollHeight;
          } else if (document.body && (document.body.scrollHeight)) {
            height = document.body.scrollHeight;
          }
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'setHeight',
            height: height,
          }))
        }
        setTimeout(changeHeight, 300);
    } ())
  `}
  style={{ height: autoHeight }}
  originWhitelist={["*"]}
  source={{ html: html }}
  onMessage={(event) => {
    try {
      const action = JSON.parse(event.nativeEvent.data)
      if (action.type === 'setHeight' && action.height > 0) {
        this.setState({ autoHeight: action.height })
      }
    } catch (error) {
      // pass
    }
  }}
/>

```


### 在 Android 上 ScrollView 嵌套 WebView 滑动手势问题&#x20;

在某些情况下需要在 ScrollView 中嵌套 WebView 且 WebView 需要滚动，这在iOS上没有问题，但在 Android 上 ScrollView 会拦截滑动手势 可以通过在 WebView 触发手势的时候禁止外层 ScrollView 滚动来实现&#x20;

- webview触发手势时会回调 onTouchStart
- 当有电话等更高级别的时间时会打断手势，会回调 onTouchCancel
- 手势正常结束后会调用 onTouchEnd

```javascript 
 <ScrollView style={{ flex: 1 }} scrollEnabled={this.state.scrollEnabled}>
  <WebView
    style={{ height: 300 }}
    originWhitelist={["*"]}
    source={{ html: html }}
    onTouchStart={() => {
      this.setState({ scrollEnabled: false })
    }}
    onTouchCancel={() => {
      this.setState({ scrollEnabled: true })
    }}
    onTouchEnd={() => {
      this.setState({ scrollEnabled: true })
    }}
  />
</ScrollView>
```
