# parseStencilSet

## 目录

- [1. 方法功能](#1-方法功能)
- [2. 方法定义](#2-方法定义)
- [3. 使用流程](#3-使用流程)
  - [步骤 1：准备 Stencil XML](#步骤-1准备-Stencil-XML)
  - [步骤 2：加载 XML 并解析](#步骤-2加载-XML-并解析)
  - [步骤 3：验证注册结果](#步骤-3验证注册结果)
- [4. 高级用法](#4-高级用法)
  - [动态加载外部 Stencil 库](#动态加载外部-Stencil-库)
  - [过滤与扩展](#过滤与扩展)
- [5. 注意事项](#5-注意事项)
- [6. 与单步解析的对比](#6-与单步解析的对比)
- [7. 实战示例](#7-实战示例)
  - [自定义 Stencil 集合](#自定义-Stencil-集合)
  - [代码加载](#代码加载)
- [8. 总结](#8-总结)
- [回调函数](#回调函数)
  - [函数签名与参数](#函数签名与参数)
  - [参数详解](#参数详解)
  - [注意事项](#注意事项)

**`mxStencilRegistry.parseStencilSet`是**mxGraph 库中用于**批量解析并注册Stencil 图形模板集合**的方法。它允许从包含多个`<shape>`**定义的 XML 文档中一次性加载所有 Stencil，并自动注册**到`mxStencilRegistry`。以下是详细说明：

### **1. 方法功能**

- **批量解析** &#x20;

  解析 XML 中所有`<shape>`节点，生成对应的`mxStencil`对象。
- **自动注册** &#x20;

  将解析**后的 Stencil 直接注册到`mxStencilRegistry`****，无需手动调用****`addStencil`**。
- **高效管理** &#x20;

  适用于从**外部文件或设计工具导出的完整图形库（如 **[**Draw.io**](http://Draw.io "Draw.io")** 的 Stencil 集合）。**

### **2. 方法定义**

```javascript 
mxStencilRegistry.parseStencilSet(root);
```


- **参数**：
  - `root`（`Element`对象）：包含多个`<shape>`节点的 XML 根元素（例如`<shapes>`节点）。

### **3. 使用流程**

#### **步骤 1：准备 Stencil XML**

XML 文件需\*\*包含`<shapes>`****根节点包裹多个****`<shape>`\*\***定义（通常从 **[**Draw.io**](http://Draw.io "Draw.io")** 导出）：**

```xml 
<shapes>
  <shape name="server" aspect="fixed" w="100" h="80">
    <!-- 路径定义 -->
    <background>
      <path>
        <move x="0" y="20"/>
        <line x="100" y="20"/>
        <rect x="20" y="40" w="60" h="40"/>
      </path>
    </background>
  </shape>
  <shape name="router" aspect="fixed" w="80" h="80">
    <!-- 另一个图形的路径 -->
  </shape>
</shapes>
```


#### **步骤 2：加载 XML 并解析**

```javascript 
// 假设 xmlContent 是包含上述 XML 的字符串
const xmlDoc = mxUtils.parseXml(xmlContent);
const root = xmlDoc.documentElement; // 获取根节点 <shapes>

// 批量解析并注册
mxStencilRegistry.parseStencilSet(root);
```


#### **步骤 3：验证注册结果**

```javascript 
// 检查是否成功注册
console.log(mxStencilRegistry.getStencil("server")); // 输出 mxStencil 实例
console.log(mxStencilRegistry.getStencil("router")); // 输出 mxStencil 实例
```


### **4. 高级用法**

#### **动态加载外部 Stencil 库**

从服务器异步加载 XML 文件并解析：

```javascript 
fetch('/stencils/network-shapes.xml')
  .then(response => response.text())
  .then(xml => {
    const xmlDoc = mxUtils.parseXml(xml);
    mxStencilRegistry.parseStencilSet(xmlDoc.documentElement);
    console.log("Stencil 库加载完成");
  })
  .catch(error => {
    console.error("加载失败:", error);
  });
```


#### **过滤与扩展**

在解析前修改 XML 内容（如添加自定义属性）：

```javascript 
const xmlDoc = mxUtils.parseXml(xmlContent);
const root = xmlDoc.documentElement;

// 遍历所有 <shape> 节点并添加版本属性
Array.from(root.getElementsByTagName('shape')).forEach(shapeNode => {
  shapeNode.setAttribute('version', '1.0');
});

// 解析修改后的 XML
mxStencilRegistry.parseStencilSet(root);
```


### **5. 注意事项**

1. **XML 结构要求**
   - 必须包含`<shapes>`根节点。
   - **每个**\*\*`<shape>`****必须定义****`name`\*\***属性（唯一标识符）。**
2. **命名冲突** &#x20;

   若已存在同名 Stencil，新解析的会覆盖旧值。建议在 XML 中统一命名规范（如添加前缀）。
3. **性能优化** &#x20;

   避免频繁解析大型 XML 文件，可在初始化时一次性加载。
4. **错误处理** &#x20;

   解析失败时可能抛出异常，建议用`try-catch`包裹：

```typescript 
try {
  mxStencilRegistry.parseStencilSet(root);
} catch (e) {
  console.error("解析失败:", e.message);
}
```


### **6. 与单步解析的对比**

| **场景**​   | \`parseStencilSet\`（批量） | 单步解析（\`mxStencilParser\`+\`addStencil\`） |
| --------- | ----------------------- | ---------------------------------------- |
| **代码量**​  | 少（一行代码完成所有操作）           | 多（需遍历节点并逐个注册）                            |
| **控制粒度**​ | 低（自动处理所有\`\<shape>\`）   | 高（可筛选或修改单个 Stencil）                      |
| **适用场景**​ | 完整 Stencil 库加载          | 动态添加或修改部分 Stencil                        |

***

### **7. 实战示例**

#### **自定义 Stencil 集合**

```xml 
<!-- custom_shapes.xml -->
<shapes>
  <shape name="cloud" aspect="variable">
    <background>
      <path>
        <move x="20" y="30"/>
        <curve x1="40" y1="0" x2="80" y2="0" x="100" y="30"/>
        <curve x1="80" y1="60" x2="40" y2="60" x="20" y="30"/>
      </path>
    </background>
  </shape>
  <shape name="database" aspect="fixed" w="120" h="60">
    <background>
      <path>
        <ellipse x="60" y="15" w="120" h="30"/>
        <path>
          <move x="0" y="15"/>
          <curve x1="30" y1="0" x2="90" y2="0" x="120" y="15"/>
          <curve x1="90" y1="30" x2="30" y2="30" x="0" y="15"/>
        </path>
      </path>
    </background>
  </shape>
</shapes>
```


#### **代码加载**

```javascript 
// 初始化时加载
window.onload = function() {
  const graph = new mxGraph(document.getElementById('graphContainer'));
  
  // 加载并解析 Stencil
  fetch('custom_shapes.xml')
    .then(response => response.text())
    .then(xml => {
      const xmlDoc = mxUtils.parseXml(xml);
      mxStencilRegistry.parseStencilSet(xmlDoc.documentElement);
      console.log("Stencil 已注册:", mxStencilRegistry.getStencil("cloud"));
    });
};
```


### **8. 总结**

- **核心价值** &#x20;

  `parseStencilSet`简化了批量 Stencil 的加载流程，适合从设计工具导出或团队协作的标准化图形库。
- **最佳实践**
  - 使用 [Draw.io](http://Draw.io "Draw.io") 设计并导出 Stencil 集合。
  - 在应用初始化时预加载所有 Stencil。
  - 通过命名约定避免冲突（如`team-prefix/shape-name`）。
- **调试建议**
  - 使用`mxLog.debug()`输出解析日志（需启用调试模式）。
  - 利用浏览器开发者工具检查 XML 结构。

# 回调函数

在 mxGraph 中，`mxStencilRegistry.parseStencilSet`的第二个参数通常用于**自定义回调函数**，其参数和用途如下（需注意：**此用法可能是特定版本或自定义扩展的语法**，官方文档未明确提及，以下是常见实践解析）：

***

### **函数签名与参数**

```typescript 
mxStencilRegistry.parseStencilSet(
  xml, // Stencil XML 根节点（如 <shapes>）
  (packageName, stencilName, displayName, width, height) => {
    // 自定义逻辑
  }
);
```


### **参数详解**

| **参数**​         | **类型**​    | **来源**​                                              | **说明**​          |
| --------------- | ---------- | ---------------------------------------------------- | ---------------- |
| \`packageName\` | \`string\` | 通常从 XML 的父节点或根属性提取（如\`\<shapes package="network">\`） | Stencil 分类或分组名称  |
| \`stencilName\` | \`string\` | \`\<shape name="server">\`中的\`name\`属性               | Stencil 的唯一标识符   |
| \`displayName\` | \`string\` | 可能来自\`\<shape>\`的\`displayName\`属性（非官方标准）            | 图形显示名称（用于 UI 展示） |
| \`width\`       | \`number\` | \`\<shape w="100">\`中的\`w\`属性                        | Stencil 默认宽度     |
| \`height\`      | \`number\` | \`\<shape h="60">\`中的\`h\`属性                         | Stencil 默认高度     |

***

### **注意事项**

1. **版本兼容性** &#x20;

   此回调参数**并非 mxGraph 官方标准 API**，可能存在于某些定制版本（如 [Draw.io](http://Draw.io "Draw.io") 的扩展）。建议检查实际代码库或替换为以下通用方案：
2. **通用替代方案** &#x20;

   手动遍历 XML 节点并处理：

```javascript 
const shapes = xmlDoc.getElementsByTagName('shape');
Array.from(shapes).forEach(shapeNode => {
  const name = shapeNode.getAttribute('name');
  const w = parseFloat(shapeNode.getAttribute('w'));
  const h = parseFloat(shapeNode.getAttribute('h'));
  const displayName = shapeNode.getAttribute('displayName') || name;
  const packageName = shapeNode.parentNode.getAttribute('package');

  // 执行自定义逻辑
  console.log({ packageName, name, displayName, w, h });

  // 解析并注册 Stencil
  const stencil = new mxStencilParser().parseStencil(shapeNode);
  mxStencilRegistry.addStencil(name, stencil);
});

```
