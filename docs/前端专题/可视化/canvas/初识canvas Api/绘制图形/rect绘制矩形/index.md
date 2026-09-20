# rect绘制矩形

## 目录

- [核心作用](#核心作用)
- [关键特性](#关键特性)
- [基础使用示例](#基础使用示例)
  - [1. 绘制单个矩形](#1-绘制单个矩形)
  - [2. 填充多个矩形](#2-填充多个矩形)
- [高级用法](#高级用法)
  - [1. 组合路径（矩形+圆形）](#1-组合路径矩形圆形)
  - [2. 受变换影响的矩形](#2-受变换影响的矩形)
  - [3. 镂空效果（组合路径）](#3-镂空效果组合路径)
- [与直接绘制方法的对比](#与直接绘制方法的对比)
- [常见问题解决方案](#常见问题解决方案)
- [性能优化建议](#性能优化建议)

`ctx.rect()`是 Canvas 2D API 中用于**绘制矩形路径**的方法，它不会立即绘制图形，而是将矩形添加到当前路径中，需要配合`stroke()`或`fill()`才能显示。以下是详细解析：

***

### 核心作用

**向当前路径中添加一个矩形**，支持以下参数：

```javascript 
ctx.rect(x, y, width, height);
```


| 参数         | 类型     | 作用        |
| ---------- | ------ | --------- |
| \`x\`      | number | 矩形左上角的X坐标 |
| \`y\`      | number | 矩形左上角的Y坐标 |
| \`width\`  | number | 矩形的宽度（像素） |
| \`height\` | number | 矩形的高度（像素） |

***

### 关键特性

1. **路径模式** &#x20;

   与`fillRect()`/`strokeRect()`不同，`rect()`只\*\*添加路径，需手动调用`stroke()`****或****`fill()`\*\***才会显示。**
2. **叠加性** &#x20;

   可连续调用多个`rect()`创建复杂路径，最后统一绘制。
3. **坐标系影响** &#x20;

   受当前变换矩阵（平移/旋转/缩放）的影响。

***

### 基础使用示例

#### 1. 绘制单个矩形

```javascript 
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.beginPath();          // 开始新路径
ctx.rect(50, 50, 100, 80); // 添加矩形路径
ctx.stroke();             // 描边绘制
```


#### 2. 填充多个矩形

```javascript 
ctx.beginPath();
ctx.rect(20, 20, 50, 50);  // 矩形1
ctx.rect(100, 30, 60, 40); // 矩形2
ctx.fillStyle = 'blue';
ctx.fill();                // 一次性填充所有矩形
```


### 高级用法

#### 1. 组合路径（矩形+圆形）

```javascript 
ctx.beginPath();
ctx.rect(50, 50, 100, 100);  // 矩形
ctx.arc(100, 100, 30, 0, Math.PI*2); // 圆形
ctx.fillStyle = 'rgba(255,0,0,0.5)';
ctx.fill(); // 同时填充矩形和圆
```


#### 2. 受变换影响的矩形

```javascript 
ctx.translate(100, 100);   // 移动坐标系
ctx.rotate(Math.PI/4);     // 旋转45度
ctx.beginPath();
ctx.rect(0, 0, 50, 30);    // 旋转后的矩形
ctx.stroke();
```


#### 3. 镂空效果（组合路径）

```javascript 
// 外大矩形 - 内小矩形 = 边框效果
ctx.beginPath();
ctx.rect(50, 50, 200, 200);  // 外矩形
ctx.rect(70, 70, 160, 160);  // 内矩形
ctx.fillStyle = 'lightgray';
ctx.fill('evenodd');         // 使用奇偶填充规则
```


### 与直接绘制方法的对比

| 方法                   | 立即绘制 | 可组合路径 | 适用场景         |
| -------------------- | ---- | ----- | ------------ |
| \`ctx.rect()\`       | ❌    | ✅     | 需要组合路径/复杂图形时 |
| \`ctx.fillRect()\`   | ✅    | ❌     | 快速绘制单个填充矩形   |
| \`ctx.strokeRect()\` | ✅    | ❌     | 快速绘制单个描边矩形   |

***

### 常见问题解决方案

1. **矩形不显示**

```javascript 
// 错误：忘记调用beginPath()
ctx.rect(10, 10, 50, 50);
ctx.stroke(); // 可能不生效

// 正确：
ctx.beginPath();
ctx.rect(10, 10, 50, 50);
ctx.stroke();
```


1. 填充样式失效

```javascript 
// 错误：样式设置在rect()之后
ctx.beginPath();
ctx.rect(10, 10, 50, 50);
ctx.fillStyle = 'red'; // 不生效
ctx.fill();

// 正确：样式设置在路径操作前
ctx.fillStyle = 'red';
ctx.beginPath();
ctx.rect(10, 10, 50, 50);
ctx.fill();
```


1. ​**​线宽异常**

```javascript 
// 错误：缩放后线宽变形
ctx.scale(2, 2);
ctx.beginPath();
ctx.rect(10, 10, 50, 50);
ctx.lineWidth = 1; // 实际显示为2px宽
ctx.stroke();

// 解决方案：
ctx.save();
ctx.scale(2, 2);
ctx.lineWidth = 0.5; // 反向补偿
ctx.beginPath();
ctx.rect(10, 10, 50, 50);
ctx.stroke();
ctx.restore();
```


### 性能优化建议

1. **批量绘制矩形**

```javascript 
// 低效：多次单独绘制
for(let i=0; i<10; i++) {
    ctx.beginPath();
    ctx.rect(i*30, 0, 20, 20);
    ctx.fill();
}

// 高效：单次路径绘制
ctx.beginPath();
for(let i=0; i<10; i++) {
    ctx.rect(i*30, 0, 20, 20);
}
ctx.fill(); // 一次性渲染
```


1. **使用路径复用**
   对静态内容可保存路径对象：

```typescript 
// 创建并保存路径
const rectPath = new Path2D();
rectPath.rect(50, 50, 100, 100);

// 需要时直接绘制
ctx.fill(rectPath);
```
