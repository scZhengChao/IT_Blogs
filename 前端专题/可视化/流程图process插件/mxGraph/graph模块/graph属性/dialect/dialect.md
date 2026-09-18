# dialect

## 目录

- [渲染方言的概念](#渲染方言的概念)
- [graph.dialect属性](#graphdialect属性)
- [mxConstants.DIALECT\_SVG常量](#mxConstantsDIALECT_SVG常量)
- [可用值](#可用值)

`graph.dialect == mxConstants.DIALECT_SVG`这一表达式用于判断当前`mxGraph`实例所使用的**渲染方言（渲染模式）是否为 SVG（可缩放矢量图形）。下面从几个方面详细解释：**

### 渲染方言的概念

在`mxGraph`里，渲染方言指的是**图形在浏览器中进行渲染所采用的技术和方式。**`mxGraph`支持多种渲染方言，不同的方言会影响图形的渲染效果、性能以及兼容性。常见的**渲染方言包括 SVG、VML（** 矢量标记语言，主要用于旧版 IE 浏览器）等。

### `graph.dialect`属性

- **含义**：`graph.dialect`是`mxGraph`实例的一个属性，该属性用于指定当前图所使用的渲染方言。
- **取值**：其取值通常来自`mxConstants`类中定义的常量，比如`mxConstants.DIALECT_SVG`、`mxConstants.DIALECT_VML`等。

### `mxConstants.DIALECT_SVG`常量

- **含义**：`mxConstants.DIALECT_SVG`是`mxConstants`类中预定义的一个常量，它代表 SVG 渲染方言。当`graph.dialect`的值等于`mxConstants.DIALECT_SVG`时，意味着`mxGraph`会使用 SVG 技术来渲染图形。
- **优点**：使用 SVG 渲染有诸多优点，例如 SVG 是基于 XML 的开放标准，具备良好的跨平台和跨浏览器兼容性；支持高质量的图形缩放，不会出现锯齿；并且可以方便地进行动画和交互操作。

## 可用值

mxGraph 支持以下几种方言：

1. **mxConstants.DIALECT\_SVG**(默认值)
   - 使用 SVG 进行渲染
   - 现代浏览器的首选
   - 代码示例：`graph.dialect = mxConstants.DIALECT_SVG;`
2. **mxConstants.DIALECT\_VML**
   - 使用 VML (Vector Markup Language) 进行渲染
   - 主要用于旧版 IE 浏览器 (IE5-IE8)
   - 代码示例：`graph.dialect = mxConstants.DIALECT_VML;`
3. **mxConstants.DIALECT\_MIXEDHTML**
   - 使用混合 HTML 元素进行渲染
   - 在某些特殊场景下使用
   - 代码示例：`graph.dialect = mxConstants.DIALECT_MIXEDHTML;`
4. **mxConstants.DIALECT\_STRICTHTML**
   - 使用严格 HTML 进行渲染
   - 最简单的渲染方式，但功能有限
   - 代码示例：`graph.dialect = mxConstants.DIALECT_STRICTHTML;`
