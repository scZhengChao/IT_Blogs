# offset和client对比

## 目录

- [1.offset系列属性](#1offset系列属性)
  - [offsetWidth和offsetHeight](#offsetWidth和offsetHeight)
  - [offsetLeft和offsetTop](#offsetLeft和offsetTop)
- [2.client系列属性](#2client系列属性)
  - [clientWidth和clientHeight](#clientWidth和clientHeight)
  - [clientLeft和clientTop](#clientLeft和clientTop)
- [3. 对比总结](#3-对比总结)
- [4. 相似与相反的 API](#4-相似与相反的-API)
  - [相似 API](#相似-API)
  - [相反 API](#相反-API)
- [6. 适用场景](#6-适用场景)

在前端开发中，`offset`和`client`是两种常用的属性集合，用于获取元素的尺寸和位置信息。结合`width`、`height`、`left`、`top`等属性，它们表示不同的距离和尺寸。以下是详细的解释：

***

### **1.** \*\*​`offset`\*\***系列属性**

`offset`系列属性表示元素相对于其**最近的定位祖先** **（positioned ancestor）** 或文档的尺寸和位置。这些属性包括：

#### **`offsetWidth`****和****`offsetHeight`**

- **`offsetWidth`**：元素的整体宽度，包括：
  - 内容宽度（`width`）
  - 内边距（`padding`）
  - 边框（`border`）
  - **不包含滚动条（scrollbar）**
- **`offsetHeight`**：元素的整体高度，包括：
  - 内容高度（`height`）
  - 内边距（`padding`）
  - 边框（`border`）
  - **不包含滚动条（scrollbar）**

#### **`offsetLeft`****和****`offsetTop`**

- **`offsetLeft`**：元素**左边界**相对于其**最近的定位祖先** **（positioned ancestor）** 的左边界距离。
- **`offsetTop`**：元素**上边界**相对于其**最近的定位祖先** **（positioned ancestor）** 的上边界距离。
- 如果没有定位祖先，则相对于`<body>`或`<html>`计算。

### **2.** \*\*​`client`\*\***系列属性**

`client`系列属性表示元素的**可视区域**（即内容 + 内边距，但不包括边框、滚动条和外边距）。这些属性包括：

#### **`clientWidth`****和****`clientHeight`**

- **`clientWidth`**：元素的**可视宽度**，包括：
  - 内容宽度（`width`）
  - 内边距（`padding`）
  - **不包含边框（****`border`****）**
  - **不包含滚动条（scrollbar）**
- **`clientHeight`**：元素的**可视高度**，包括：
  - 内容高度（`height`）
  - 内边距（`padding`）
  - **不包含边框（****`border`****）**
  - **不包含滚动条（scrollbar）**

#### **`clientLeft`****和****`clientTop`**

- **`clientLeft`**：元素的**左边框宽度**（`border-left-width`）borderWidth的宽度。
- **`clientTop`**：元素的**上边框宽度**（`border-top-width`）。
- 如果元素有滚动条，`clientLeft`**可能还包括滚动条的宽度（取决于浏览器）**。

> 不过，**如果元素是一个带有垂直滚动条的容器，**并且**滚动条位于左侧（**某些浏览器在特定语言环境下可能会出现这种情况），`clientLeft`还**会包含滚动条的宽度。**

### **3. 对比总结**

| 属性                               | 包含内容                             | 是否包含边框 | 是否包含滚动条 | 是否包含外边距 |
| -------------------------------- | -------------------------------- | ------ | ------- | ------- |
| \`offsetWidth\`/\`offsetHeight\` | \`width\`+\`padding\`+\`border\` | ✅ 包含   | ❌ 不包含   | ❌ 不包含   |
| \`clientWidth\`/\`clientHeight\` | \`width\`+\`padding\`            | ❌ 不包含  | ❌ 不包含   | ❌ 不包含   |
| \`offsetLeft\`/\`offsetTop\`     | 相对于定位祖先的距离                       | \\-    | \\-     | \\-     |
| \`clientLeft\`/\`clientTop\`     | 边框宽度                             | \\-    | \\-     | \\-     |

### **4. 相似与相反的 API**

#### **相似 API**

- **`getBoundingClientRect()`**：
  - 返回元素的尺寸和位置，相对于**视口（viewport）**。
  - 包含`width`、`height`、`left`、`top`、`right`、`bottom`。
  - 与`offset`类似，但计算方式不同（`offset`相**对于定位祖先，** \*\*`getBoundingClientRect`\*\***相对于视口）。**

#### **相反 API**

- **`scrollWidth`****/****`scrollHeight`**：
  - 表示元素的**完整内容尺寸**（包括被滚动隐藏的部分）。
  - 与`clientWidth`/`clientHeight`相反，后者只计算可视区域。

### **6. 适用场景**

- **`offset`**：计算元素的整体尺寸和位置（如拖拽、定位）。
- **`client`**：计算元素的可视区域（如滚动、布局计算）。
- **`getBoundingClientRect()`**：计算元素相对于视口的位置（如动画、视口检测）。
