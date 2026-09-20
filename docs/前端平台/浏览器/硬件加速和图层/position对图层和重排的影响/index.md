# position对图层和重排的影响

## 目录

- [一、position各取值对重排（Reflow）的影响](#一position各取值对重排Reflow的影响)
  - [关键结论：](#关键结论)
- [二、position各取值对图层（Layer）提升的影响](#二position各取值对图层Layer提升的影响)
  - [关键结论：](#关键结论)
- [四、实战示例](#四实战示例)
  - [场景 1：position: fixed的图层行为](#场景-1position-fixed的图层行为)
  - [场景 2：position: absolute需手动优化](#场景-2position-absolute需手动优化)
- [总结](#总结)

#### **一、** \*\*​`position`\*\***各取值对重排（Reflow）的影响**

重排是指浏览器重新计算元素的几何属性（位置、大小），更新布局树的过程。
**是否触发重排取决于**\*\*`position`\*\***的取值和修改的内容**：

| **`position`** **值**​ | **是否触发重排**​   | **触发条件示例**​                                                |
| --------------------- | ------------- | ---------------------------------------------------------- |
| \`static\`(默认)        | ❌ 无           | —                                                          |
| \`relative\`          | ✅\*\*可能触发\*\* | 修改\`top\`/\`left\`/\`right\`/\`bottom\`或\`margin\`等影响布局的属性 |
| \`absolute\`          | ✅\*\*可能触发\*\* | 修改位置属性（如\`left\`）或父容器尺寸变化                                  |
| \`fixed\`             | ✅\*\*可能触发\*\* | 首次定位或视口尺寸变化（如旋转手机）                                         |
| \`sticky\`            | ✅\*\*可能触发\*\* | \*\*元素在滚动时切换定位状态\*\*（如从\`relative\`变为\`fixed\`）            |

##### **关键结论**：

- **仅修改**\*\*`position`****值****本身（如从`static`****改为****`relative`）不会触发重排，但会改变元素的层叠上下文。\*\*​
- **后续修改定位属性**（如`top`、`left`）**会触发重排**，因为需要重新计算布局。

#### **二、** \*\*​`position`\*\***各取值对图层（Layer）提升的影响**

图层提升是指浏览器将\*\*元素分离到独立的图形层（Compositing Layer），由 GPU 加速渲染。****是否触发图层提升取决于****`position`\*\***的取值和浏览器优化策略**：

| **`position`** **值**​ | **是否默认提升图层**​ | **图层提升条件**​                           |
| --------------------- | ------------- | ------------------------------------- |
| \`static\`            | ❌ 否           | —                                     |
| \`relative\`          | ❌ 否           | 需额外条件（如\`transform\`、\`will-change\`） |
| \`absolute\`          | ❌ 否           | 需额外条件（如与\`transform\`或\`opacity\`结合）  |
| \`fixed\`             | ✅\*\*是\*\*    | 浏览器默认提升（\*\*因需独立于文档流滚动\*\*）           |
| \`sticky\`            | ✅\*\*是\*\*    | 滚动时行为类似\`fixed\`，\*\*浏览器默认提升\*\*      |

##### **关键结论**：

- **`fixed`****和****`sticky`****会默认触发图层提****升**，因为需要独立于主文档流渲染。
- \*\*`relative`****/****`absolute`\*\***需结合其他属性**（如`transform`）才能提升图层。

#### **四、实战示例**

##### **场景 1：** \*\*​`position: fixed`\*\***的图层行为**

```html 
<div class="fixed-header">Header</div>
<style>
  .fixed-header {
    position: fixed; /* 默认提升为图层 */
    top: 0;
    background: blue;
  }
</style>
```


- **结果**： &#x20;

  Chrome 的`Layers`面板会显示该元素为独立图层，`Compositing Reasons`标注为`"position: fixed"`。

##### **场景 2：** \*\*​`position: absolute`\*\***需手动优化**

```html 
<div class="parent">
  <div class="absolute-box">Box</div>
</div>
<style>
  .parent { position: relative; }
  .absolute-box {
    position: absolute;
    top: 10px; /* 触发重排 */
  }
  /* 优化后 */
  .optimized-box {
    position: absolute;
    transform: translateY(10px); /* 避免重排 */
  }
</style>
```


### **总结**

| **属性**​                | **重排风险**​ | **图层提升**​ | **优化建议**​                        |
| ---------------------- | --------- | --------- | -------------------------------- |
| \`position: static\`   | 无         | 无         | —                                |
| \`position: relative\` | 修改定位属性时触发 | 需额外条件     | 用\`transform\`替代\`top\`/\`left\` |
| \`position: absolute\` | 修改定位属性时触发 | 需额外条件     | 结合\`will-change\`或\`transform\`  |
| \`position: fixed\`    | 视口变化时触发   | **默认提升**​ | 限制图层尺寸，避免滥用                      |
| \`position: sticky\`   | 滚动时触发     | **默认提升**​ | 仅对需要粘性定位的元素使用                    |

**核心原则**：

- **减少重排**：优先使用`transform`/`opacity`。
- **按需生成图层**：仅在需要硬件加速时提升图层（如动画、滚动优化）。
