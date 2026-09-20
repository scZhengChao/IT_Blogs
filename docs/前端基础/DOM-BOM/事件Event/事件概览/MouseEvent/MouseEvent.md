# MouseEvent

- 不论鼠标指针**穿过被选元素或其子元素**，都会触发 mouseover 事件。对应mouseout
- 只有在鼠标指针**穿过被选元素时**，才会触发 mouseenter 事件。对应mouseleave

`MouseEvent` 接口指用户与指针设备（如鼠标）交互时发生的事件。使用此接口的常见事件包括：`click`、`dblclick`、`mouseup`、`mousedown`。

`MouseEvent` 派生自 `UIEvent`，`UIEvent` 派生自 `Event`。虽然 `MouseEvent.initMouseEvent()` 方法保持向后兼容性，但是应该使用 `MouseEvent()` 构造函数创建一个 `MouseEvent` 对象。

一些具体的事件都派生自 `MouseEvent：WheelEvent 和DragEvent`。

![](image_Be6GKBbp7l.png)

它的一些相关事件：

- setCapture 用于把全部的鼠标事件重新定向到指定元素。
- releaseCapture 用来将鼠标从先前通过 setCapture() 绑定的元素身上释放出来。
- mousedown 事件在定点设备（如鼠标或触摸板）按钮在元素内按下时，会在该元素上触发。
- mouseenter 事件在定点设备（通常指鼠标）首次移动到元素的激活区域内时，在该元素上触发。
- mouseleave 事件在定点设备（通常是鼠标）的指针移出某个元素时被触发。
- mousemove 事件在定点设备（通常指鼠标）的光标在元素内移动时，会在该元素上触发。
- &#x20;mouseout 事件在定点设备（通常是鼠标）移动至元素或其子元素之外时，会在该元素上触发。
- &#x20;mouseover 当一个定点设备（通常指鼠标）在一个元素本身或者其子元素上移动时，mouseover 事件在该元素上触发。
- mouseup 事件在定点设备（如鼠标或触摸板）按钮在元素内释放时，在该元素上触发。

[PointerEvent](PointerEvent.md "PointerEvent")

[wheel](wheel.md "wheel")

[e](e.md "e")
