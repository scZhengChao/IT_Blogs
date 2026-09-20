# 样式效果

## 目录

- [scrollEnabled={boolean}](#scrollEnabledboolean)
- [bounces={boolean}  iOS](#bouncesboolean-iOS)
- [ContentInset={obj}  iOS](#ContentInsetobj-iOS)
- [style={{width:'100%',height:'100%'}} ](#stylewidth100height100)
- [decelerationRate={number}  iOS](#decelerationRatenumber-iOS)
- [scalesPageToFit={boolea}](#scalesPageToFitboolea)
- [alwaysBounceVertical iOS](#alwaysBounceVertical-iOS)

### scrollEnabled={boolean}

控制是否在 WebView中启用滑动。默认为 true。

### bounces={boolean}  iOS

布尔值，控制当 webview 内容到达底部时是否进行回弹。默认为 true。

### ContentInset={obj}  iOS

webview 插入到滑动视图时距离边缘的距离。默认为{top: 0, left: 0, bottom: 0, right: 0}。

### style={{width:'100%',height:'100%'}} 

// 设置 WebView的样式

### decelerationRate={number}  iOS

//指定一个浮点数，用于设置在用户停止触摸之后，此视图应以多快的速度停止滚动。也可以指定预设的字符串值，如"normal"和"fast"，分别对应 UIScrollViewDecelerationRateNormal 和 UIScrollViewDecelerationRateFast。

### scalesPageToFit={boolea}

布尔值，控制网页内容是否自动适配视图的大小，同时启用用户缩放功能。默认为true。

On iOS, when [useWebKit=true](https://reactnative.cn/docs/webview#usewebkit "useWebKit=true"), this prop will not work.

### `alwaysBounceVertical` iOS

当此属性为 true 时，垂直方向即使内容比滚动视图本身还要小，也可以弹性地拉动一截。当`horizontal={true}`时默认值为 false，否则为 true。

| Type | Default                                        |
| ---- | ---------------------------------------------- |
| bool | `false` when `vertical={true}``true` otherwise |
