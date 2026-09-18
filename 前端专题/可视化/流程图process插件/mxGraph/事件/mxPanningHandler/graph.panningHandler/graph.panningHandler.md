# graph.panningHandler

## 目录

- [功能作用](#功能作用)
- [典型实现逻辑](#典型实现逻辑)
- [主要使用场景](#主要使用场景)
- [如何自定义行为](#如何自定义行为)
- [相关方法](#相关方法)
- [调试方法](#调试方法)

`graph.panningHandler.isForcePanningEvent(evt)`是 mxGraph 中用于判断是否应该**强制触发平移（panning）操作的函数。**

## 功能作用

这个函数的主要目的是：

1. **确定某些特殊事件是否应该强制触发画布平移**，即使平移功能未全局启用
2. **处理特定输入设备的特殊情形**，如触摸屏或带中间按钮的鼠标
3. **提供覆盖默认行为的扩展点**，允许开发者自定义强制平移的条件

## 典型实现逻辑

在标准 mxGraph 实现中，该函数通常检查以下条件：

```javascript 
mxPanningHandler.prototype.isForcePanningEvent = function(evt) {
  // 检查是否中键点击（鼠标滚轮按钮）
  return mxEvent.isMouseEvent(evt) && 
         mxEvent.isMiddleMouseButton(evt);
};
```


## 主要使用场景

1. **鼠标中键平移**：
   - 即使`graph.setPanning(false)`禁用全局平移
   - 中键点击仍然可以临时激活平移功能
2. **触摸屏交互**：
   - 某些触摸手势可能被识别为强制平移事件
3. **特殊设备支持**：
   - 支持绘图板等特殊输入设备

## 如何自定义行为

您可以覆盖此方法来实现自定义的强制平移逻辑：

```javascript 
graph.panningHandler.isForcePanningEvent = function(evt) {
  // 原有中键检查
  const original = mxEvent.isMouseEvent(evt) && 
                  mxEvent.isMiddleMouseButton(evt);
  
  // 添加新条件：按住空格键时左键拖动也可平移
  const spacePressed = mxEvent.isKeyDown(evt, 32); // 32是空格键码
  
  return original || spacePressed;
};
```


## 相关方法

- `graph.setPanning(enabled)`- 全局启用/禁用平移
- `graph.panningHandler.isPanningEnabled()`- 检查平移是否全局启用
- `graph.panningHandler.mouseDown()`- 实际处理平移开始的入口

## 调试方法

```javascript 
// 检查函数返回值
console.log(graph.panningHandler.isForcePanningEvent(evt));

// 监控所有平移判断
const original = graph.panningHandler.isForcePanningEvent;
graph.panningHandler.isForcePanningEvent = function(evt) {
  const result = original.apply(this, arguments);
  console.log('Force panning check:', evt, 'Result:', result);
  return result;
};
```


这个函数为 mxGraph 提供了灵活的平移行为控制，使开发者既能保持全局的平移设置，又能为特定交互场景保留平移能力。
