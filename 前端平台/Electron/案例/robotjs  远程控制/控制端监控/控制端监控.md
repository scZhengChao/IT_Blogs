# 控制端监控

## 目录

- [键盘](#键盘)
- [鼠标](#鼠标)
- [工具](#工具)
- [监听元素变化](#监听元素变化)
- [启动](#启动)

# 键盘

```typescript 
keyDownHandler = async (e: KeyboardEvent) => {
  if (!this.mouseInScreenCanvas) {
    return;
  }
  e.preventDefault();
  const data = {
    keyCode: e.keyCode,
    shift: e.shiftKey,
    meta: e.metaKey,
    alt: e.altKey,
    ctrl: e.ctrlKey,
  };
  if (data.ctrl && data.alt && data.keyCode === 86) {
    // ctrl + v
    const text = await navigator.clipboard.readText();
    this.websocket.sendMsg({
      type: SocketTypeEnum.发送远程控制数据,
      payload: {
        puppetUid: useBaseStore.getState().isControlOther!,
        message: JSON.stringify({
          type: HandleTypeEnum.复制,
          text,
        }),
      },
    });
    return;
  }
  this.websocket.sendMsg({
    type: SocketTypeEnum.发送远程控制数据,
    payload: {
      puppetUid: useBaseStore.getState().isControlOther!,
      message: JSON.stringify({
        type: HandleTypeEnum.键盘按下,
        ...data,
      }),
    },
  });
};
keyUpHandler = (e: KeyboardEvent) => {
  if (!this.mouseInScreenCanvas) {
    return;
  }
  e.preventDefault();
  const data = {
    keyCode: e.keyCode,
    shift: e.shiftKey,
    meta: e.metaKey,
    alt: e.altKey,
    ctrl: e.ctrlKey,
  };
  this.websocket.sendMsg({
    type: SocketTypeEnum.发送远程控制数据,
    payload: {
      puppetUid: useBaseStore.getState().isControlOther!,
      message: JSON.stringify({
        type: HandleTypeEnum.键盘抬起,
        ...data,
      }),
    },
  });
}



```


# 鼠标

```typescript 
  mouseMoveHandler = (e: MouseEvent) => {
    this.mouseInScreenCanvas = true;
    const data = {
      x: e.offsetX,
      y: e.offsetY,
      canvasWidth: this.screenNodeWidth,
      canvasHeight: this.screenNodeHeight,
    };
    this.websocket.sendMsg({
      type: SocketTypeEnum.发送远程控制数据,
      payload: {
        puppetUid: useBaseStore.getState().isControlOther!,
        message: JSON.stringify({
          type: HandleTypeEnum.鼠标移动,
          ...data,
        }),
      },
    });
  };
  
  mouseDownHandler = (e: MouseEvent) => {
    if (!this.mouseInScreenCanvas) {
      return;
    }
    e.preventDefault();
    const type = this.getMouseState(e);
    if (type === undefined) {
      message.error('不支持鼠标按键');
      return;
    }
    this.websocket.sendMsg({
      type: SocketTypeEnum.发送远程控制数据,
      payload: {
        puppetUid: useBaseStore.getState().isControlOther!,
        message: JSON.stringify({ type: HandleTypeEnum.鼠标按下, state: type }),
      },
    });
  };
  dblClickHandler = (e: MouseEvent) => {
    if (!this.mouseInScreenCanvas) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    this.websocket.sendMsg({
      type: SocketTypeEnum.发送远程控制数据,
      payload: {
        puppetUid: useBaseStore.getState().isControlOther!,
        message: JSON.stringify({ type: HandleTypeEnum.鼠标双击 }),
      },
    });
  };
  mouseLeaveHandler = () => {
    this.mouseInScreenCanvas = false;
  };
  wheelHandler = (e: WheelEvent) => {
    if (!this.mouseInScreenCanvas) {
      return;
    }
    e.preventDefault();
    this.websocket.sendMsg({
      type: SocketTypeEnum.发送远程控制数据,
      payload: {
        puppetUid: useBaseStore.getState().isControlOther!,
        message: JSON.stringify({
          type: HandleTypeEnum.滚轮事件,
          deltaY: e.deltaY,
          deltaX: e.deltaX,
        }),
      },
    });
  };
  mouseUpHandler = (e: MouseEvent) => {
    if (!this.mouseInScreenCanvas) {
      return;
    }
    e.preventDefault();
    const type = this.getMouseState(e);
    if (type === undefined) {
      message.error('不支持鼠标按键');
      return;
    }
    this.websocket.sendMsg({
      type: SocketTypeEnum.发送远程控制数据,
      payload: {
        puppetUid: useBaseStore.getState().isControlOther!,
        message: JSON.stringify({ type: HandleTypeEnum.鼠标抬起, state: type }),
      },
    });
  };
  
```


# 工具

```typescript 
getMouseState = (e: MouseEvent) => {
    let type: MouseHandlerStateEnum | undefined;
    switch (e.button) {
      case 0: {
        type = MouseHandlerStateEnum.左键;
        break;
      }
      case 1: {
        type = MouseHandlerStateEnum.右键;
        break;
      }
      case 2: {
        type = MouseHandlerStateEnum.中键;
        break;
      }
      default:
        type = undefined;
    }
    return type;
};  
```


# 监听元素变化

```javascript 
domListener() {
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { target, contentRect } = entry;
        if (
          target === this.screenNode &&
          contentRect.width + contentRect.height !== this.screenNodeWidth + this.screenNodeHeight
        ) {
          this.screenNodeHeight = contentRect.height;
          this.screenNodeWidth = contentRect.width;
        }
      }
    });
  }
```


# 启动

```javascript 
startListener = () => {
    const canvasId = useBaseStore.getState().isControlOther;
    const currentScreenInfo = this.currentScreenShareInfo;
    if (currentScreenInfo?.originUid !== canvasId) {
      message.error('当前正在共享屏幕的并不是该傀儡端');
      return;
    }
    const node = document
      .getElementById(`${CARD_CANVAS_PREFIX}${currentScreenInfo.uid}`)
      ?.querySelector('canvas');
    if (!node) {
      message.error('未获取到屏幕共享dom');
      return;
    }
    this.screenNode = node;
    const { width, height } = this.screenNode.getBoundingClientRect();
    this.screenNodeWidth = width;
    this.screenNodeHeight = height;
    this.domListener();
    this.resizeObserver.observe(this.screenNode);
    this.screenNode.addEventListener('mouseleave', this.mouseLeaveHandler);
    this.screenNode.addEventListener('mousemove', this.mouseMoveHandler);
    this.screenNode.addEventListener('mousedown', this.mouseDownHandler);
    this.screenNode.addEventListener('mouseup', this.mouseUpHandler);
    this.screenNode.addEventListener('dblclick', this.dblClickHandler);
    this.screenNode.addEventListener('wheel', this.wheelHandler);
    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keyup', this.keyUpHandler);
  };
```
