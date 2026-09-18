# new mxCell时；附带一下业务数据

## 目录

- [方法1：使用mxCell.value存储业务数据](#方法1使用mxCellvalue存储业务数据)
- [方法2：使用mxCell.setUserObject()](#方法2使用mxCellsetUserObject)
- [方法3：自定义属性（动态属性）](#方法3自定义属性动态属性)
- [方法4：继承 mxCell（高级用法）](#方法4继承-mxCell高级用法)
- [关键问题处理建议](#关键问题处理建议)
  - [1.序列化（保存/加载）](#1序列化保存加载)
  - [2.数据访问辅助函数](#2数据访问辅助函数)
  - [3.与渲染联动](#3与渲染联动)
- [最终推荐方案](#最终推荐方案)

### **方法1：使用**\*\*`mxCell.value`\*\***存储业务数据**

**最佳实践**- 适合大多数场景

```javascript 
const cell = new mxCell("显示标签");  // 标签可以是字符串或DOM元素

// 附加业务数据（推荐对象格式）
cell.value = {
  label: "显示文本",  // 可选：与显示标签一致或单独存储
  businessData: {     // 你的业务数据
    id: 123,
    type: "user",
    customProps: { /*...*/ }
  }
};

// 读取数据
console.log(cell.value.businessData.id); // → 123
```


**优点**：

- 官方推荐方式，兼容性好
- 序列化（保存/加载图形）时自动包含
- 可通过`graph.getModel().getValue(cell)`获取

**缺点**：

- 需要处理`value`可能是字符串（旧代码）的情况

### **方法2：使用**\*\*`mxCell.setUserObject()`\*\*

```typescript 
const cell = new mxCell("标签");
cell.setUserObject({
  id: 456,
  customField: "value"
});

// 读取
const data = cell.getUserObject();
```


**优点**：

- 独立于显示标签
- 不影响现有`value`逻辑

**缺点**：

- 序列化需要额外处理

***

### **方法3：自定义属性（动态属性）**

```javascript 
const cell = new mxCell("标签");

// 直接添加属性（非官方但简单）
cell.myBusinessData = { /*...*/ };

// 或使用mxGraph的存储机制
graph.getModel().setAttribute(cell, "data-id", 789);
```


**优点**：

- 最灵活的扩展方式

**缺点**：

- 需手动处理序列化
- 可能与其他扩展冲突

***

### **方法4：继承 mxCell（高级用法）**

```javascript 
class BusinessCell extends mxCell {
  constructor(label, businessData) {
    super(label);
    this.businessData = businessData;
  }
}

const cell = new BusinessCell("标签", { id: 101 });
```


**优点**：

- 类型安全
- 可自定义方法

**缺点**：

- 需要处理序列化/反序列化
- 可能增加复杂度

### **关键问题处理建议**

#### 1.**序列化（保存/加载）**

如果使用自定义属性或继承，需重写`mxCodec`：

```typescript 
const codec = mxCodecRegistry.getCodec(mxCell);
const oldEncode = codec.encode;
codec.encode = function(enc, obj) {
  const node = oldEncode.apply(this, arguments);
  if (obj.businessData) {
    mxUtils.setAttribute(node, "businessData", JSON.stringify(obj.businessData));
  }
  return node;
};

```


#### 2.**数据访问辅助函数**

```javascript 
function getBusinessData(cell) {
  return cell.value?.businessData || 
         cell.getUserObject()?.businessData || 
         cell.businessData;
}
```


#### 3.**与渲染联动**

如果需要根据数据显示不同样式：

```javascript 
graph.getCellStyle = function(cell) {
  const style = this.stylesheet.getDefaultVertexStyle();
  const data = getBusinessData(cell);
  
  if (data?.type === "warning") {
    style.fillColor = "#FF9900";
  }
  return style;
};

```


### **最终推荐方案**

1. **简单场景**→ 用`value`存储业务对象
2. **需要分离标签和数据**→`setUserObject()`
3. **复杂系统**→ 继承`mxCell`+ 自定义序列化

**完整示例**：

```javascript 
// 创建带业务数据的cell
function createBusinessCell(label, data) {
  const cell = new mxCell({
    label: label,
    businessData: data
  });
  cell.setVertex(true);
  return cell;
}

// 添加到图形
const taskCell = createBusinessCell("完成设计", {
  id: "task-1",
  priority: "high",
  assignee: "John"
});

graph.addCell(taskCell);
```
