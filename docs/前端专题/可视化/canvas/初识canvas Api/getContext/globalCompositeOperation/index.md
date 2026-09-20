# globalCompositeOperation

## 目录

- [一、基本概念](#一基本概念)
- [二、常见合成模式及效果](#二常见合成模式及效果)
  - [1. 正常绘制（默认）](#1-正常绘制默认)
  - [2. 擦除模式](#2-擦除模式)
  - [3. 遮罩模式](#3-遮罩模式)
  - [4. 反遮罩](#4-反遮罩)
  - [5. 叠加混合](#5-叠加混合)
- [四、完整合成模式列表](#四完整合成模式列表)
- [五、使用注意事项](#五使用注意事项)

`globalCompositeOperation`是 Canvas 2D API 中一个强大的属性，用于**控制新绘制的图形如何与画布上已有的内容进行融合**。通过设置不同的合成模式，你可以实现诸如**叠加、擦除、遮罩、混合**等高级视觉效果。

### 一、基本概念

当你在 Canvas 上绘制新图形时，`globalCompositeOperation`决定了：

- \*\*新图形（源，Source）**如何与**已存在的内容（目标，Destination）\*\*进行融合。
- 其值为字符串，例如`'source-over'`、`'destination-out'`等。

### 二、常见合成模式及效果

以下是最常用的几种模式及其效果：

#### 1. 正常绘制（默认）

```javascript 
ctx.globalCompositeOperation = 'source-over';
```


- **效果**：新图形覆盖在已有内容之上（默认行为）。
- **应用**：普通绘图。

#### 2. 擦除模式

```javascript 
ctx.globalCompositeOperation = 'destination-out';
```


- **效果**：新图形区域内的目标内容被清除（橡皮擦效果）。
- **应用**：局部擦除、笔刷效果。

#### 3. 遮罩模式

```javascript 
ctx.globalCompositeOperation = 'source-in';
```


- **效果**：只在新图形与目标重叠的区域绘制，其他区域透明。
- **应用**：创建遮罩、局部显示。

#### 4. 反遮罩

```javascript 
ctx.globalCompositeOperation = 'destination-in';
```


- **效果**：只保留目标与新图形重叠的部分，其他区域被清除。
- **应用**：提取特定区域内容。

#### 5. 叠加混合

```javascript 
ctx.globalCompositeOperation = 'multiply';
```


- **效果**：将源与目标颜色相乘，结果更暗。
- **应用**：阴影效果、照片滤镜。

### 四、完整合成模式列表

| 值                    | 效果描述                              |
| -------------------- | --------------------------------- |
| \`source-over\`      | 默认值，新图形覆盖在已有内容之上。                 |
| \`source-in\`        | 只在新图形与已有内容重叠的区域绘制新图形，其他区域透明。      |
| \`source-out\`       | 只在不与已有内容重叠的区域绘制新图形。               |
| \`source-atop\`      | 在已有内容区域内绘制新图形，重叠部分混合。             |
| \`destination-over\` | 已有内容覆盖在新图形之上。                     |
| \`destination-in\`   | 只保留已有内容与新图形重叠的部分，其他区域被清除。         |
| \`destination-out\`  | 已有内容中，与新图形重叠的部分被清除（橡皮擦效果）。        |
| \`destination-atop\` | 在新图形区域内保留已有内容，重叠部分混合。             |
| \`lighter\`          | 重叠部分颜色叠加，变得更亮。                    |
| \`copy\`             | 完全忽略已有内容，只绘制新图形（类似剪切粘贴）。          |
| \`xor\`              | 重叠部分变为透明，非重叠部分正常显示。               |
| \`multiply\`         | 颜色相乘，结果更暗（常用于阴影效果）。               |
| \`screen\`           | 颜色反相后相乘，结果更亮（常用于高光效果）。            |
| \`overlay\`          | 结合 multiply 和 screen，增强对比度。       |
| \`darken\`           | 保留两区域中较暗的颜色。                      |
| \`lighten\`          | 保留两区域中较亮的颜色。                      |
| \`color-dodge\`      | 提亮目标颜色，让源颜色更明显。                   |
| \`color-burn\`       | 加深目标颜色，增强源颜色的效果。                  |
| \`hard-light\`       | 类似 overlay，但效果更强烈。                |
| \`soft-light\`       | 类似 hard-light，但效果更柔和。             |
| \`difference\`       | 两颜色相减，白色会反转源颜色，黑色不变。              |
| \`exclusion\`        | 类似 difference，但对比度更低。             |
| \`hue\`              | 保留目标亮度和饱和度，应用源色调。                 |
| \`saturation\`       | 保留目标亮度和色调，应用源饱和度。                 |
| \`color\`            | 保留目标亮度，应用源色调和饱和度（常用于给黑白图上色）。      |
| \`luminosity\`       | 保留目标色调和饱和度，应用源亮度（相当于 color 的反操作）。 |

### 五、使用注意事项

1. **临时修改模式**：

```javascript 
// 使用前保存当前状态
ctx.save();
ctx.globalCompositeOperation = 'destination-out';
 // 执行擦除操作...
 ctx.restore();  // 恢复原始状态
```


1. **透明度影响**：
   - 合成效果受`globalAlpha`和图形自身透明度影响。
   - 完全透明的区域不会触发合成操作。
2. **性能考虑**：
   - 复杂的合成模式（如`multiply`、`screen`）计算开销较大，频繁使用可能影响性能。
