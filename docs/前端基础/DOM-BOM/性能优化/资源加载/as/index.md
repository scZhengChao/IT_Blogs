# as

## 目录

- [as属性的核心作用](#as属性的核心作用)
- [常见as属性值及用途](#常见as属性值及用途)
- [实际优化示例](#实际优化示例)
  - [场景：首屏关键 CSS 加速](#场景首屏关键-CSS-加速)
  - [对比无as属性的问题](#对比无as属性的问题)
- [注意事项](#注意事项)
- [总结](#总结)

`<link rel="preload" as="style" href="css/style.css">`中的`as`属性是**资源类型提示**，它告诉浏览器要预加载的资源类型，对性能和资源加载优化至关重要。以下是详细解析：

### \*\*`as`\*\***属性的核心作用**

1. **正确设置优先级**
   - 浏览器会根据`as`指定的类型分配加载优先级（如`style`会获得高优先级，`script`中等，`image`较低）。
   - 例如：`as="style"`会让浏览器以**最高优先级**提前加载 CSS，避免阻塞渲染。
2. **确保资源正确处理**
   - 不同资源类型需要不同的处理方式（如 CSS 需解析为样式表，JS 需编译执行）。
   - 指定`as="style"`后，浏览器会**预加载 CSS 并准备好样式表上下文**，**加载完成后立即应用。**
3. **避免重复下载**
   - 浏览器能识别预加载的资源是否已在缓存中，避免重复请求（需配合`crossorigin`等属性使用）。
4. **符合安全策略**
   - 某些资源（如字体、脚本）需要`crossorigin`属性，`as`会帮助浏览器提前判断是否需要跨域权限。

### **常见**\*\*`as`\*\***属性值及用途**

| 属性值             | 适用资源类型                  | 典型用例                                                              |
| --------------- | ----------------------- | ----------------------------------------------------------------- |
| \`as="style"\`  | CSS 样式表                 | \`\<link rel="preload" as="style" href="style.css">\`             |
| \`as="script"\` | JavaScript 文件           | \`\<link rel="preload" as="script" href="app.js">\`               |
| \`as="font"\`   | 字体文件（需加\`crossorigin\`） | \`\<link rel="preload" as="font" href="font.woff2" crossorigin>\` |
| \`as="image"\`  | 图片（WebP/JPEG/PNG等）      | \`\<link rel="preload" as="image" href="hero.webp">\`             |
| \`as="fetch"\`  | API 数据请求（JSON/XHR）      | \`\<link rel="preload" as="fetch" href="data.json" crossorigin>\` |

### **实际优化示例**

#### 场景：首屏关键 CSS 加速

```html 
<!-- 提前预加载关键 CSS，避免渲染阻塞 -->
<link rel="preload" as="style" href="critical.css" onload="this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="critical.css"></noscript>
```


- **效果**：`CSS` 加载与 `HTML` 解析并行，减少 `FCP`（首次内容绘制）时间。

#### 对比无`as`属性的问题

```html 
<!-- 不推荐：浏览器可能以最低优先级加载，导致样式延迟 -->
<link rel="preload" href="style.css">
```


- 未指定`as`时，**浏览器可能将资源当作通用类型**（`as="fetch"`），降低优**先级甚至忽略预加载。**

### **注意事项**

1. **必须与**\*\*`rel="preload"`\*\***配合使用** &#x20;

   `as`是`preload`**的必需属性，否则预加载可能无效（部分浏览器会警告）。**
2. **兼容性** &#x20;

   现代浏览器均支持（Chrome/Firefox/Edge/Safari），但需注意旧版本回退方案：

```html 
<link rel="preload" as="style" href="fallback.css">
<link rel="stylesheet" href="fallback.css"> <!-- 旧浏览器直接加载 -->
```


1. **不要滥用** &#x20;

   仅预加载**关键资源**（如首屏 CSS/字体），过度预加载会浪费带宽。

### **总结**

`as`属性通过明确资源类型，帮助浏览器：

1. **优化加载优先级**→ 加速关键资源
2. **正确处理内容**→ 避免解析错误
3. **提高缓存利用率**→ 减少重复请求

正确使用可显著提升页面性能（尤其是 LCP 和 FCP）。建议通过 Lighthouse 测试验证效果。
