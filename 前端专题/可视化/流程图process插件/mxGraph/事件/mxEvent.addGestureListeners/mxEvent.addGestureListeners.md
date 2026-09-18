# mxEvent.addGestureListeners

## 目录

- [mxEvent.addGestureListeners](#mxEventaddGestureListeners)
  - [方法作用](#方法作用)
  - [方法参数](#方法参数)

# mxEvent.addGestureListeners

在`mxGraph`中，`mxEvent.addGestureListeners`是一个用于**为 HTML 元素添加手势相关事件监听器**的实用方法。手势事件通常包括触摸、拖动、缩放等操作，在处理图形的交互时非常有用。以下是关于这个方法的详细介绍：

### 方法作用

`mxEvent.addGestureListeners`方法的主要作用是为指定的 HTML **元素添加一组与手势操作相关的事件**监听器，这些监听器可以捕获并处理各种手势事件，从而实现图形的交互功能，比如通过手势拖动图形、缩放图形等。

### 方法参数

该方法接收以下几个参数：

- **`node`**：必需参数，是一个 HTML 元素对象，代表要添加事件监听器的目标元素。通常这个元素是`mxGraph`的容器元素，这样就可以监听用户在图形区域内的手势操作。
- **`start`**：必需参数，是一个回调函数。当手势操作开始时（例如用户按下鼠标或触摸屏幕），会调用这个函数。该函数接收一个事件对象作为参数，你可以在这个函数中实现手势开始时的逻辑，比如记录初始位置等。
- **`move`**：必需参数，是一个回调函数。当手势进行移动操作时（例如用户拖动鼠标或在屏幕上滑动手指），会调用这个函数。同样，该函数也接收一个事件对象作为参数，可用于处理手势移动过程中的逻辑，如更新图形的位置。
- **`end`**：必需参数，是一个回调函数。当手势操作结束时（例如用户释放鼠标或抬起手指），会调用这个函数。该函数也接收一个事件对象作为参数，可用于处理手势结束时的逻辑，如完成图形的移动操作。
- **`singleTouch`**：可选参数，是一个布尔类型的值，默认值为`true`。如果设置为`true`，则只监听单指触摸手势；如果设置为`false`，则会监听多指触摸手势。

```javascript 
addGestureListeners: function(node, startListener, moveListener, endListener)
```


```javascript 
mxEvent.addGestureListeners(arrow,
  mxUtils.bind(this, function (evt) {
    const pt = mxUtils.convertPoint(this.graph.container,
      mxEvent.getClientX(evt), mxEvent.getClientY(evt));
    this.graph.connectionHandler.start(this.state, pt.x, pt.y);
    this.graph.isMouseDown = true;
    this.graph.isMouseTrigger = mxEvent.isMouseEvent(evt);
    mxEvent.consume(evt);
  })
);
```


[contexticons](contexticons.md "contexticons")
