# mxEvent

## 目录

- [mxEvent.isMouseEvent(evt)](#mxEventisMouseEventevt)
- [mxEvent.consume(evt);](#mxEventconsumeevt)
  - [功能和原理](#功能和原理)
  - [使用场景](#使用场景)
  - [禁用鼠标右键](#禁用鼠标右键)

# mxEvent.isMouseEvent(evt)

`mxEvent`类中的一个方法，其功能是检查传入的事件对象`evt`是否为鼠标事件。如果`evt`是鼠标事件（如鼠标点击、鼠标移动、鼠标按下等），该方法会返回`true`；反之，如果`evt`不是鼠标事件（比如键盘事件、触摸事件等），则返回`false`。

# mxEvent.consume(evt);

在`mxGraph`库中，`mxEvent.consume(evt)`是一个常用的方法，**用于处理事件并阻止事件的进一步传播和默认行为。**

### 功能和原理

- **阻止事件传播**：在网页的事件模型中，事件会从触发的元素开始，依次向上层元素传播，这个过程称为事件冒泡。`mxEvent.consume(evt)`方法会阻止事件继续向上层元素传播，即事件不会再触发父元素上绑定的相同类型的事件处理函数。
- **阻止默认行为**：很多 HTML 元素都有默认的行为，例如点击链接会跳转到相应的页面，点击表单的提交按钮会提交表单等。`mxEvent.consume(evt)`方法可以阻止这些元素的默认行为，使得事件不会触发元素原本的默认操作。

### 使用场景

- **自定义交互**：当你在`mxGraph`中实现自定义的交互逻辑时，可能不希望事件的默认行为或冒泡影响到其他元素或功能。例如，在图形上点击时，你希望只触发自己定义的点击处理逻辑，而不触发浏览器或其他元素的默认行为。
- **避免冲突**：在复杂的图形应用中，可能会有多个元素或组件绑定了相同类型的事件处理函数。使用`mxEvent.consume(evt)`可以避免事件在不同组件之间的冲突，确保事件只在当前处理逻辑中生效。

### 禁用鼠标右键

```javascript 
// 禁用鼠标右键
  mxEvent.disableContextMenu(container);
```


LABEL\_CHANGED

[mxEvent.LABEL\_CHANGED](./mxEvent.LABEL_CHANGED/index.md "mxEvent.LABEL_CHANGED")

[mxEvent.CONNECT\_CELL](./mxEvent.CONNECT_CELL/index.md "mxEvent.CONNECT_CELL")

[mxEvent.CELLS\_ADDED](./mxEvent.CELLS_ADDED/index.md "mxEvent.CELLS_ADDED")

[mxEvent.MOVE\_CELLS](./mxEvent.MOVE_CELLS/index.md "mxEvent.MOVE_CELLS")

[isPopupTrigger](./isPopupTrigger/index.md "isPopupTrigger")

[redirectMouseEvents](./redirectMouseEvents/index.md "redirectMouseEvents")

[isAltDown](./isAltDown/index.md "isAltDown")

[mxEvent.CHANGE](./mxEvent.CHANGE/index.md "mxEvent.CHANGE")

[事件](IT/前端专题/可视化/流程图process插件/mxGraph/事件/mxEvent/事件/事件.md "事件")

[FIRE\_MOUSE\_EVENT](./FIRE_MOUSE_EVENT/index.md "FIRE_MOUSE_EVENT")
