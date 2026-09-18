# 获取元素的宽高

## 目录

- [1. offsetWidth和offsetHeight](#1-offsetWidth和offsetHeight)
- [2. clientWidth和clientHeight](#2-clientWidth和clientHeight)
- [3. getBoundingClientRect()](#3-getBoundingClientRect)
- [4. style.width和style.height](#4-stylewidth和styleheight)
- [5. window.getComputedStyle()](#5-windowgetComputedStyle)
- [6. scrollWidth和scrollHeight](#6-scrollWidth和scrollHeight)
- [注意事项：](#注意事项)

在JavaScript中，获取DOM元素的宽高有多种方法，具体取决于你需要的是**可视区域尺寸**、**包含内边距的尺寸**还是**包含边框和滚动条的尺寸**。以下是常用的方法：

***

### 1. **`offsetWidth`****和****`offsetHeight`**

获取元素的**布局宽高**（包括**内容 + 内边距 + 边框，** 但不包括外边距和滚动条）：

```javascript 
const element = document.getElementById('myElement');
const width = element.offsetWidth;  // 包含padding和border
const height = element.offsetHeight;
```


### 2. **`clientWidth`****和****`clientHeight`**

获取元素的**可视区域宽高**（包括**内容 + 内边距**，但不包括边框、滚动条和外边距）

```javascript 
const width = element.clientWidth;  // 包含padding，不包含border和滚动条
const height = element.clientHeight;
```


### 3. **`getBoundingClientRect()`**

获取元素的**精确几何信息**（包括**内容 + 内边距 + 边框**，返回浮点数，单位为像素）：

```typescript 
const rect = element.getBoundingClientRect();
const width = rect.width;   // 包含padding和border
const height = rect.height;
```


### 4. **`style.width`****和****`style.height`**

仅获取元素**内联样式**中直接定义的宽高（字符串形式，可能为空或百分比）

```javascript 
const width = element.style.width;  // 例如 "100px" 或 ""
const height = element.style.height;
```


- 注意：如果**样式是通过CSS类定义的，此方法无法获取，** 需用`window.getComputedStyle()`。

***

### 5. **`window.getComputedStyle()`**

获取元素**最终计算的样式**（包括CSS类定义的样式，返回字符串，可能含`px`、`%`等单位）：

```javascript 
const style = window.getComputedStyle(element);
const width = style.width;   // 例如 "300px"
const height = style.height;
```


- 需要手动转换单位（如`parseFloat(width)`）。

***

### 6. **`scrollWidth`****和****`scrollHeight`**

获取元素**内容的实际宽高**（包括**溢出部分，+内边距，** 但不包括边框和外边距）：

```javascript 
const fullWidth = element.scrollWidth;   // 包含不可见内容的宽度
const fullHeight = element.scrollHeight;
```


### 注意事项：

- **性能**：`getBoundingClientRect()`和`getComputedStyle()`会触发回流（reflow），避免频繁调用。
- **单位差异**：`offsetWidth`/`clientWidth`返回整数，`getBoundingClientRect()`返回浮点数。
- **隐藏元素**：如果元素是`display: none`，上述方法可能返回`0`。

示例：获取包含边框和内边距的宽高

```javascript 
const element = document.querySelector('.box');
const totalWidth = element.offsetWidth;  // 内容 + padding + border
const contentWidth = element.clientWidth; // 内容 + padding
const preciseWidth = element.getBoundingClientRect().width; // 精确值
```
