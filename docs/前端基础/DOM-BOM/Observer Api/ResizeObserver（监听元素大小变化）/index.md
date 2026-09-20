# ResizeObserver（监听元素大小变化）

## 目录

- [1. 基本用法](#1-基本用法)
  - [步骤 1：创建 ResizeObserver 实例](#步骤-1创建-ResizeObserver-实例)
  - [步骤 2：监听目标元素](#步骤-2监听目标元素)
  - [步骤 3：停止监听](#步骤-3停止监听)
- [2. 回调参数解析](#2-回调参数解析)
- [3. 监听多个元素](#3-监听多个元素)
- [4. 兼容性处理](#4-兼容性处理)
- [5. 性能优化](#5-性能优化)
  - [防抖处理（避免频繁触发）](#防抖处理避免频繁触发)
  - [精准控制监听目标](#精准控制监听目标)
- [能/不能监听到哪些变化](#能不能监听到哪些变化)
  - [能](#能)
    - [元素尺寸的变动](#元素尺寸的变动)
    - [布局导致的尺寸变化](#布局导致的尺寸变化)
    - [特定模式下的额外监听](#特定模式下的额外监听)
    - [无法监听的情况](#无法监听的情况)

ResizeObserver观察元素的**内容或边框，监听元素及其子元素的变化**。

```vue 
// 选择要观察突变的节点
const targetNode = document.getElementById('element');

const resizeObserver = new ResizeObserver((entries, observer) => {
  entries.forEach(entry => {
    
    // 之后，你可以停止观察
    observer.unobserve(entry.target);
  });
});

// 开始观察
resizeObserver.observe(targetNode);
```


创建基于输入或触发器包装的动态内容时，此观察者非常重要。

`ResizeObserver` 是一个用于**监听元素尺寸变化的浏览器 API，可以精准监测 DOM 元素的宽度、高度或边距等变化**。以下是其核心用法和示例：

### **1. 基本用法**

#### 步骤 1：创建 ResizeObserver 实例

传入一个回调函数，当**监听的元素尺寸变化时触发**：

```javascript 
const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    // 处理每个元素的变化
    console.log('元素尺寸变化:', entry.target, entry.contentRect);
  }
});
```


#### 步骤 2：监听目标元素

使用`observe()`方法监听元素：

```javascript 
const targetElement = document.getElementById('my-element');
resizeObserver.observe(targetElement);
```


#### 步骤 3：停止监听

取消单个元素的监听：

```javascript 
resizeObserver.unobserve(targetElement);
```


或断开所有监听：

```javascript 
resizeObserver.disconnect();
```


### **2. 回调参数解析**

回调函数接收一个`entries`数组，每个`entry`包含以下关键属性：

- **`entry.target`**: 尺寸发生变化的元素。
- **`entry.contentRect`**: 包含元素的位置和尺寸信息：
  - `width`: 元素**内容区域的宽度**
  - `height`: 元素内**容区域的高度**
  - `top`: 元素内容区域顶部距离（**相对于视口**）
  - `left`: 元素内容区域左侧距离（**相对于视**口）
- `entry.borderBoxSize`: 元素的**边框盒尺寸**（包含边框和内边距）。
- **`entry.contentBoxSize`**: 元素的**内容盒尺寸**（不包含边框和内边距）。

### **3. 监听多个元素**

一个`ResizeObserver`实例可同时监听多个元素：

```javascript 
const elements = document.querySelectorAll('.resizable');
elements.forEach(element => {
  resizeObserver.observe(element);
});
```


### **4. 兼容性处理**

现代浏览器均支持 ResizeObserver，但对旧版浏览器需使用 Polyfill：

[ resize-observer-polyfill - npm A polyfill for the Resize Observer API. Latest version: 1.5.1, last published: 6 years ago. Start using resize-observer-polyfill in your project by running \`npm i resize-observer-polyfill\`. There are  https://www.npmjs.com/package/resize-observer-polyfill](https://www.npmjs.com/package/resize-observer-polyfill " resize-observer-polyfill - npm A polyfill for the Resize Observer API. Latest version: 1.5.1, last published: 6 years ago. Start using resize-observer-polyfill in your project by running `npm i resize-observer-polyfill`. There are  https://www.npmjs.com/package/resize-observer-polyfill")

```bash 
npm install resize-observer-polyfill
```


引入并替换原生 API：

```javascript 
import ResizeObserver from 'resize-observer-polyfill';
window.ResizeObserver = ResizeObserver;
```


### **5. 性能优化**

#### 防抖处理（避免频繁触发）

```typescript 
let timeoutId;
const resizeObserver = new ResizeObserver((entries) => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    // 处理变化逻辑
    console.log('防抖后的尺寸变化:', entries);
  }, 100); // 100ms 内仅触发一次
});
```


#### 精准控制监听目标

只监听需要的元素，及时调用`unobserve()`或`disconnect()`。

# 能/不能监听到哪些变化

## 能

### 元素尺寸的变动

- **宽度和高度的改变**：不管元素尺寸变化是由**内容的增减、内联样式的修改、响应式布局的调整，还是 JavaScript 动态操作引起的，ResizeObserver 都能敏锐地捕捉到。**
- **边框盒（border-box）的尺寸变化**：默认情况下，ResizeObserver 会对元素的 border-box 进行监听，这其中涵**盖了边框、内边距以及内容区域的尺寸变化。不过，它不包含外边距。**

### 布局导致的尺寸变化

- **盒模型的影响**：当元素的 padding、border 或者 content 发生变化时，只要这些变化造成了布局上的调整，ResizeObserver 就会触发。
- **子元素的影响**：要是子元素的尺寸或者数量发生改变，进而使得父元素的布局尺寸受到影响，ResizeObserver 也能监听到。

### 特定模式下的额外监听

- **content-box 模式**：在这种模式下，ResizeObserver 只会监听元素内容区域（content-box）的尺寸变化，而不会考虑 padding 和 border 的影响。

### 无法监听的情况

- **位置的变化**：像元素的位移（transform: translate）这类仅仅**改变位置，而不会对布局尺寸**产生影响的操作，ResizeObserver 是检测不到的。
- **视觉上的变换**：例如元素的旋转（transform: rotate）、缩放（transform: scale）等操作，由于不会**改变元素的布局尺寸**，所以也不会被 ResizeObserver 捕获。
- **内联元素的尺寸变化**：内联元素**本身没有布局尺寸，所以其尺寸变化**不会触发 ResizeObserver。
- **伪元素的尺寸变化**：伪元素（如 ::before/::after）的尺寸变化不属于元素本身的布局尺寸变化，因此也不在 ResizeObserver 的监听范围内。
