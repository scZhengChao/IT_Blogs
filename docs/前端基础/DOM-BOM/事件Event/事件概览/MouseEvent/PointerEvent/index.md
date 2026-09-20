# PointerEvent

`PointerEvent` 接口代表了由 **指针 引发的 DOM 事件的状态**，包括接触点的位置，引发事件的设备类型，接触表面受到的压力等。
指针 是输入设备的硬件层抽象（比如鼠标，触摸笔，或触摸屏上的一个触摸点）。指针 能指向一个具体表面（如屏幕）上的一个（或一组）坐标。
&#x20;      指针的 击中检测 指浏览器用来检测 指针事件的目标元素的过程。大多数情况下，这个目标元素是由 指针的位置和元素在文章中的位置和分层共同决定的。
该接口属性继承自` MouseEvent 和 Event`，所以它们有很多相似的属性和方法，只是 `PointerEvent` 的作用对象更具体，具体到鼠标指针。

![](./assets/image/image_wlHlS9acqT.png)

它的一些相关事件：

- setPointerCapture 用于将特定元素指定为未来指针事件的捕获目标。
- releasePointerCapture 用来将鼠标指针从先前通过 setPointerCapture() 绑定的元素身上释放出来，还给鼠标指针自由。
- pointerdown 鼠标指针按下时触发该事件
- pointerenter 鼠标指针首次进入到元素的激活区域内时触发该事件
- pointerleave 鼠标指针离开时触发该事件
- pointermove 鼠标指针移动时触发该事件
- pointerout 鼠标指针移动到元素之外时触发该事件
- pointerover 鼠标指针悬浮覆盖时触发该事件
- pointerup 鼠标指针抬起时触发该事件
