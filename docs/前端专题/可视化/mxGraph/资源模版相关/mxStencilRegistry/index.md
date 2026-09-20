# mxStencilRegistry

## 目录

- [1. Stencil 的核心概念](#1-Stencil-的核心概念)
- [2.mxStencilRegistry的功能](#2mxStencilRegistry的功能)
- [3. 核心方法](#3-核心方法)
  - [注册 Stencil](#注册-Stencil)
  - [获取 Stencil](#获取-Stencil)
  - [检查是否存在](#检查是否存在)
- [4. 完整使用流程](#4-完整使用流程)
  - [步骤 1：定义 Stencil XML](#步骤-1定义-Stencil-XML)
  - [步骤 2：解析 XML 并注册](#步骤-2解析-XML-并注册)
  - [步骤 3：在样式中使用 Stencil](#步骤-3在样式中使用-Stencil)
- [5. 动态加载外部 Stencil](#5-动态加载外部-Stencil)
- [6. 高级用法](#6-高级用法)
  - [自定义 Stencil 样式](#自定义-Stencil-样式)
  - [组合多个 Stencil](#组合多个-Stencil)
- [7. 与mxCellRenderer.registerShape的对比](#7-与mxCellRendererregisterShape的对比)
- [8. 注意事项](#8-注意事项)
- [9. 调试技巧](#9-调试技巧)
- [10. 总结](#10-总结)

**`mxStencilRegistry`****是**`mxGraph` 库中**用于管理Stencil 图形模板的核心工具类**。Stencil 是一种**基于 XML 定义的矢量图形模板，常用于预定义复杂形状（如网络拓扑图标、流程图符号等），** 支持从工具（如[Draw.io](http://Draw.io "Draw.io")）导出并直接在 mxGraph 中复用。以下是详细解析：

### **1. Stencil 的核心概念**

- **什么是 Stencil？** &#x20;

  Stencil 是一个**XML 格式的图形模板**，描述矢量路径、几何形状、文本位置等。**它允许通过 XML 定义图形，而无需编写 JavaScript 绘图代码。**
- **典型应用场景**：
  - 复用设计工具（如 [Draw.io](http://Draw.io "Draw.io")）导出的标准化图标。
  - 动态加载外部图形库。
  - 统一管理企业级图标资源。

### **2.** \*\*​`mxStencilRegistry`\*\***的功能**

- **注册与存储** &#x20;

  维护一个全局的**Stencil 名称到模板数据的映射表**，支持通过名称快速查找 Stencil。
- **动态解析** &#x20;

  **将 XML 定义的 Stencil 转换为 mxGraph 可识别的图形对象（** \*\*​`mxStencil`\*\***实例）。**
- **缓存管理** &#x20;

  提供缓存机制，避免重复解析相同 Stencil。

### **3. 核心方法**

#### **注册 Stencil**

```typescript 
mxStencilRegistry.addStencil(name, stencil);
```


- **参数**：
  - `name`（字符串）：Stencil 的唯一标识符（如`"server_icon"`）。
  - `stencil`（mxStencil 实例）：解析后的 Stencil 对象。

#### **获取 Stencil**

```javascript 
const stencil = mxStencilRegistry.getStencil(name);
```


#### **检查是否存在**

```typescript 
if (mxStencilRegistry.containsStencil(name)) {
  // Stencil 存在
}
```


### **4. 完整使用流程**

#### **步骤 1：定义 Stencil XML**

通常从设计工具导出或手动编写：

```xml 
<shape name="cloud" aspect="variable" w="100" h="60">
  <background>
    <path>
      <move x="20" y="30"/>
      <curve x1="40" y1="0" x2="80" y2="0" x="100" y="30"/>
      <curve x1="80" y1="60" x2="40" y2="60" x="20" y="30"/>
    </path>
  </background>
</shape>
```


#### **步骤 2：解析 XML 并注册**

```javascript 
// 解析 XML 字符串
const parser = new mxStencilParser();
const xmlDoc = mxUtils.parseXml(xmlString);
const stencil = parser.parseStencil(xmlDoc.documentElement);

// 注册到全局注册表
mxStencilRegistry.addStencil("cloud", stencil);
```


#### **步骤 3：在样式中使用 Stencil**

通过`STYLE_SHAPE`指定 Stencil 名称，并设置`STYLE_STENCIL`为`1`：

```javascript 
// 创建样式
const style = graph.getStylesheet().getDefaultVertexStyle();
style[mxConstants. STYLE_SHAPE] = "cloud";
style[mxConstants.STYLE_STENCIL] = 1; // 关键：启用 Stencil 模式
 
// 应用样式到单元格
const vertex = graph.insertVertex(parent, null, "Cloud", 100, 100, 100, 60);
```


### **5. 动态加载外部 Stencil**

若 Stencil 定义存储在外部文件或 API：

```javascript 
// 异步加载 XML
fetch('stencils/network-icons.xml')
  .then(response => response.text())
  .then(xml => {
    const parser = new mxStencilParser();
    const xmlDoc = mxUtils.parseXml(xml);
    const shapes = xmlDoc.getElementsByTagName('shape');

    // 遍历并注册所有 Stencil
    Array.from(shapes).forEach(shapeNode => {
      const stencil = parser. parseStencil(shapeNode);
      mxStencilRegistry.addStencil(shapeNode.getAttribute('name'), stencil);
     });
  });
```


### **6. 高级用法**

#### **自定义 Stencil 样式**

在 XML 中定义动态样式属性（通过`mxCell`的样式覆盖）：

```xml 
<shape name="dynamic_rect" aspect="fixed" w="120" h="60">
  <background>
    <fillstroke color="fillColor" stroke="strokeColor"/>
    <rect x="0" y="0" w="w" h="h"/>
  </background>
</shape>
```


- `fillColor`和`strokeColor`会从单元格样式中动态获取。

#### **组合多个 Stencil**

通过多个路径组合复杂图形：

```xml 
<shape name="server" aspect="fixed" w="80" h="100">
  <background>
    <rect x="0" y="0" w="80" h="100" fill="true" stroke="true"/>
    <path>
      <move x="20" y="20"/>
      <line x="60" y="20"/>
      <move x="20" y="40"/>
      <line x="60" y="40"/>
    </path>
  </background>
</shape>
```


### **7. 与**\*\*`mxCellRenderer.registerShape`\*\***的对比**

| **特性**​     | \`mxStencilRegistry\`(Stencil) | \`mxCellRenderer.registerShape\`(代码绘制) |
| ----------- | ------------------------------ | -------------------------------------- |
| **图形定义方式**​ | XML 模板                         | JavaScript 代码                          |
| **开发效率**​   | 高（可视化工具导出）                     | 低（需手动编码）                               |
| **可维护性**​   | 高（集中管理 XML 文件）                 | 中（分散在代码中）                              |
| **动态调整**​   | 通过 XML 参数化                     | 需修改代码逻辑                                |
| **性能**​     | 较高（预解析缓存）                      | 依赖代码优化                                 |
| **适用场景**​   | 标准化图标库、复杂矢量图形                  | 高度定制化逻辑、动态图形                           |

***

### **8. 注意事项**

1. **XML 兼容性** &#x20;

   mxGraph 的 Stencil XML **格式需严格遵循规范。建议使用 **[**Draw.io**](http://Draw.io "Draw.io")** 导出并检查结构。**
2. **名称冲突** &#x20;

   避免与内置形状（如`rectangle`、`ellipse`）重名，否则会覆盖默认行为。
3. **缓存清理** &#x20;

   动态加载大量 Stencil 时，适时调用`mxStencilRegistry.clear()`防止内存泄漏。
4. **错误处理** &#x20;

   解析失败的 XML 会导致渲染异常，需捕获并提示：

```javascript 
try {
  const stencil = parser.parseStencil(xmlNode);
} catch (e) {
  console.error("Stencil 解析失败:", e);
}
```


### **9. 调试技巧**

- **查看注册表内容** &#x20;

  通过`mxStencilRegistry.stencils`直接访问内部存储的 Stencil 映射。
- **日志解析过程** &#x20;

  继承`mxStencilParser`并重写方法：

```javascript 
class DebugStencilParser extends mxStencilParser {
  parseShape(node) {
    console.log("解析节点:", node);
    return super.parseShape(node);
  }
}
```


### **10. 总结**

- **核心价值** &#x20;

  `mxStencilRegistry`提供了**声明式图形定义**的能力，将设计与代码分离，适合团队协作和复杂图形管理。
- **最佳实践**
  - 使用 [Draw.io](http://Draw.io "Draw.io") **设计图形并导出为 Stencil XML。**
  - 通过 CI/CD 管道自动化 Stencil 的打包和部署。
  - 结合`mxStylesheet`统一管理样式与 Stencil 的关联。

[parseStencilSet](./parseStencilSet/index.md "parseStencilSet")
