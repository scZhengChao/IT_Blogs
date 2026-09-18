# 钩子

## 目录

- [startInLoadingState={boolea}](#startInLoadingStateboolea)
- [onError={functio}](#onErrorfunctio)
- [onLoad={functio}](#onLoadfunctio)
- [onLoadEnd={function}](#onLoadEndfunction)
- [onLoadStart={function}](#onLoadStartfunction)
- [onNavigationStateChange={function}](#onNavigationStateChangefunction)
- [renderError={function}](#renderErrorfunction)
- [renderLoading={function}](#renderLoadingfunction)

### startInLoadingState={boolea}

//布尔值，控制WebView第一次加载时是否显示加载视图（如指示器）。当设置了

renderLoading时必须将这个属性设置为true才能正常显示。

### onError={functio}

当 WebView加载失败时调用的函数

### onLoad={functio}

当 WebView加载成功后执行的函数

### onLoadEnd={function}

//函数，当加载结束调用，不管是成功还是失败

### onLoadStart={function}

//当 WebView刚开始加载时调用的函数

### onNavigationStateChange={function}

当导航状态发生变化的时候调用。接收一个state作为参数

### renderError={function}

设置一个函数，返回一个视图用于显示错误。

### renderLoading={function}

设置一个函数，返回一个加载指示器。。为了使用这个属性必须将 startInLoadingState 属性设置为 true
