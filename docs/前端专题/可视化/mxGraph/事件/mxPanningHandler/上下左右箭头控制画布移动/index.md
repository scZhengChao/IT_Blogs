# 上下左右箭头控制画布移动

## 目录

- [1.核心实现逻辑](#1核心实现逻辑)
  - [基础实现代码](#基础实现代码)
- [2.高级优化版本](#2高级优化版本)
- [3.关键原理说明](#3关键原理说明)
- [4.与现有功能的整合](#4与现有功能的整合)
- [5.调试技巧](#5调试技巧)
- [6.注意事项](#6注意事项)

### 1.**核心实现逻辑**

需要手动监听键盘事件并调用画布平移方法：

#### 基础实现代码

```javascript 
// 初始化graph后添加键盘控制
function setupKeyboardPanning(graph) {
  const step = 20; // 每次移动的像素数
  
  // 创建键盘处理器
  const keyHandler = new mxKeyHandler(graph);

  // 上箭头（38）
  keyHandler.bindKey(38, (evt) => {
    graph.view.setTranslate(
      graph.view.translate.x,
      graph.view.translate.y + step
    );
    mxEvent.consume(evt);
  });

  // 下箭头（40）
  keyHandler.bindKey(40, (evt) => {
    graph.view.setTranslate(
      graph.view.translate.x,
      graph.view.translate.y - step
    );
    mxEvent.consume(evt);
  });

  // 左箭头（37）
  keyHandler.bindKey(37, (evt) => {
    graph.view.setTranslate(
      graph.view.translate.x + step,
      graph.view.translate.y
    );
    mxEvent.consume(evt);
  });

  // 右箭头（39）
  keyHandler.bindKey(39, (evt) => {
    graph.view.setTranslate(
      graph.view.translate.x - step,
      graph.view.translate.y
    );
    mxEvent.consume(evt);
  });
}

// 调用函数启用键盘控制
setupKeyboardPanning(graph);
```


### 2.**高级优化版本**

支持加速和边界检查：

```javascript 
function setupAdvancedKeyboardPanning(graph) {
  let baseStep = 20;
  let currentStep = baseStep;

  const keyHandler = new mxKeyHandler(graph);
  const checkBoundary = true; // 是否启用边界限制

  // 统一处理移动
  function panGraph(dx, dy) {
    const view = graph.view;
    let newX = view.translate.x - dx;
    let newY = view.translate.y - dy;

    // 边界检查（可选）
    if (checkBoundary) {
      const bounds = graph.getGraphBounds();
      const width = graph.container.clientWidth;
      const height = graph.container.clientHeight;
      
      // 限制平移范围（可根据需要调整）
      newX = Math.min(0, Math.max(newX, -bounds.width / view.scale + width));
      newY = Math.min(0, Math.max(newY, -bounds.height / view.scale + height));
    }

    view.setTranslate(newX, newY);
  }

  // 按键绑定（支持Shift加速）
  keyHandler.bindKey(38, (evt) => { // 上
    panGraph(0, currentStep * (mxEvent.isShiftDown(evt) ? 3 : 1);
    mxEvent.consume(evt);
  });

  keyHandler.bindKey(40, (evt) => { // 下
    panGraph(0, -currentStep * (mxEvent.isShiftDown(evt) ? 3 : 1);
    mxEvent.consume(evt);
  });

  keyHandler.bindKey(37, (evt) => { // 左
    panGraph(currentStep * (mxEvent.isShiftDown(evt) ? 3 : 1), 0);
    mxEvent.consume(evt);
  });

  keyHandler.bindKey(39, (evt) => { // 右
    panGraph(-currentStep * (mxEvent.isShiftDown(evt) ? 3 : 1), 0);
    mxEvent.consume(evt);
  });

  // 按键持续加速（可选）
  let interval;
  mxEvent.addListener(document, 'keydown', (evt) => {
    if ([37,38,39,40].includes(evt.keyCode)) {
      clearInterval(interval);
      currentStep = baseStep;
      interval = setInterval(() => {
        currentStep = Math.min(200, currentStep * 1.1);
      }, 100);
    }
  });

  mxEvent.addListener(document, 'keyup', () => {
    clearInterval(interval);
    currentStep = baseStep;
  });
}
```


### 3.**关键原理说明**

1. **平移核心方法**：
   - 通过修改`graph.view.translate`的 x/y 值实现画布移动
   - 调用`graph.view.setTranslate(x, y)`触发重绘
2. **键盘事件处理**：
   - 使用`mxKeyHandler`监听键盘事件
   - 键码对应：
     - 37: 左箭头
     - 38: 上箭头
     - 39: 右箭头
     - 40: 下箭头
3. **性能优化**：
   - `mxEvent.consume(evt)`阻止事件冒泡
   - 边界检查避免过度平移

### 4.**与现有功能的整合**

如果需要与 mxGraph 原有功能共存（如单元格移动），可添加条件判断：

```javascript 
keyHandler.bindKey(38, (evt) => {
  if (!graph.isSelectionEmpty()) {
    return; // 如果选中了单元格，不触发画布移动
  }
  // ...原有平移逻辑
});
```


### 5.**调试技巧**

检查平移是否生效：

```javascript 
// 在控制台查看当前平移值
console.log('Current translate:', graph.view.translate);

// 手动测试平移
graph.view.setTranslate(100, 50); // 向右移动100px，向下移动50px
```


### 6.**注意事项**

1. **焦点问题**：
   - 确保画布容器获取焦点：`graph.container.focus()`
   - 添加`tabindex`属性：

```html 
<div id="graphContainer" tabindex="0"></div>
```


1. **与其他快捷键冲突**：
   - 如果其他插件（如 mxKeyHandler）已经绑定了箭头键，需要协调处理
2. **移动端适配**：
   - 如需支持触摸设备，需额外处理`touch`事件

通过以上实现，您可以完全控制 mxGraph 画布通过键盘箭头的移动行为，并根据需要调整移动步长、边界限制等参数。
