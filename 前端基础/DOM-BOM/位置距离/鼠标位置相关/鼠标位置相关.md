# 鼠标位置相关

## 目录

- [鼠标事件坐标属性详解](#鼠标事件坐标属性详解)
  - [坐标属性对比](#坐标属性对比)
  - [详细解释](#详细解释)
    - [1. offsetX / offsetY](#1-offsetX--offsetY)
    - [2. clientX / clientY](#2-clientX--clientY)
    - [3. pageX / pageY](#3-pageX--pageY)
    - [4. screenX / screenY](#4-screenX--screenY)
  - [图示说明](#图示说明)
  - [注意事项](#注意事项)

* e.offsetX：鼠标相对于**事件源的X方**向的距离( firfox 不支持)
* e.offsetY：鼠标相对于事件源的Y方向的距离( firfox 不支持)
* e.clientX：距离浏览器可视区域X方向的距离
* e.clientY：距离浏览器可视区域Y方向的距离
* e.pageX：鼠标相对于文档X方向的距离( ie678 不支持)
* e.pageY：鼠标相对于文档X方向的距离( ie678 不支持)
* e.screenX：鼠标距离屏幕X方向的距离
* e.screenY：鼠标距离屏幕Y方向的距离(包含浏览器的地址栏)

# 鼠标事件坐标属性详解

在JavaScript鼠标事件中，有多个坐标属性可以帮助我们确定鼠标指针的位置。下面我将详细解释这些属性，并提供图示说明。

## 坐标属性对比

| 属性                      | 描述                                   | 相对于          |
| ----------------------- | ------------------------------------ | ------------ |
| \`offsetX\`,\`offsetY\` | 鼠标相对于\*\*事件目标元素（event.target）的坐标\*\* | 目标元素         |
| \`clientX\`,\`clientY\` | 鼠标相对于\*\*浏览器视口的坐标\*\*                | 视口(viewport) |
| \`pageX\`,\`pageY\`     | 鼠标相对于\*\*整个文档的坐标（包含滚动偏移）\*\*         | 文档(document) |
| \`screenX\`,\`screenY\` | 鼠标相对于整个屏幕的坐标                         | 屏幕           |

## 详细解释

### 1. offsetX / offsetY

```javascript 
element.addEventListener('click', function(e) {
    console.log(`offsetX: ${e.offsetX}, offsetY: ${e.offsetY}`);
});
```


- **相对于**：触发事件的元素(event.target)的左上角
- **特点**：
  - 不受滚动影响
  - 如果目标元素有边框，坐标从边框内侧开始计算
  - 如果事件发生在子元素上，坐标仍相对于父元素计算

**相似API**：`e.layerX`,`e.layerY`（已废弃，不推荐使用）

### 2. clientX / clientY

```javascript 
document.addEventListener('mousemove', function(e) {
    console.log(`clientX: ${e.clientX}, clientY: ${e.clientY}`);
});
```


- **相对于**：浏览器视口(viewport)的左上角
- **特点**：
  - **不包含滚动偏移**
  - 常用于固定位置的元素交互

**相似API**：`window.innerWidth`/`window.innerHeight`（视口尺寸）

### 3. pageX / pageY

```javascript 
document.addEventListener('click', function(e) {
    console.log(`pageX: ${e.pageX}, pageY: ${e.pageY}`);
});
```


- **相对于**：整个文档(document)的左上角
- **特点**：
  - **包含滚动偏移**
  - 当页面没有滚动时，`pageX/Y`等于`clientX/Y`

**相似API**：`window.scrollX`/`window.scrollY`（获取滚动位置）

### 4. screenX / screenY

```javascript 
document.addEventListener('mousemove', function(e) {
    console.log(`screenX: ${e.screenX}, screenY: ${e.screenY}`);
});
```


- **相对于**：用户屏幕的左上角
- **特点**：
  - 包含浏览器窗口边框和工具栏
  - 在多显示器系统中，主显示器左上角为(0,0)

**相似API**：`window.screen`对象的相关属性

## 图示说明

```markdown 
┌───────────────────────────────────────────────────────────────────┐
│                          屏幕(Screen)                             │
│                                                                   │
│   ┌───────────────────────────────────────────────────────────┐   │
│   │                       浏览器窗口                          │   │
│   │   ┌───────────────────────────────────────────────────┐   │   │
│   │   │                    视口(Client)                   │   │   │
│   │   │                                                   │   │   │
│   │   │   ┌───────────────┐                               │   │   │
│   │   │   │   文档(Doc)   │                               │   │   │
│   │   │   │               │                               │   │   │
│   │   │   │   ┌───────┐   │                               │   │   │
│   │   │   │   │ 元素  │   │                               │   │   │
│   │   │   │   │       │   │                               │   │   │
│   │   │   │   │   *   │   │                               │   │   │
│   │   │   │   └───────┘   │                               │   │   │
│   │   │   │               │                               │   │   │
│   │   │   └───────────────┘                               │   │   │
│   │   │                                                   │   │   │
│   │   └───────────────────────────────────────────────────┘   │   │
│   │                                                           │   │
│   └───────────────────────────────────────────────────────────┘   │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
*表示鼠标点击位置
```


- `screenX/Y`: 从屏幕左上角到\*的距离
- `clientX/Y`: 从视口左上角到\*的距离
- `pageX/Y`: 从文档左上角到\*的距离
- `offsetX/Y`: 从元素左上角到\*的距离

## 注意事项

1. 在触摸设备上，这些属性可能不可用或表现不同
2. 某些属性在iframe中可能会有不同的行为
3. 对于SVG元素，`offsetX/Y`的行为可能与HTML元素不同
4. 在CSS变换(transform)应用的元素上，这些坐标可能不符合预期

希望这个详细的解释和图示能帮助你理解鼠标事件中的各种坐标属性！
