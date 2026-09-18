# font-display

## 目录

- [可用属性值及特点](#可用属性值及特点)
- [优化策略](#优化策略)
  - [1. 按字体重要性选择](#1-按字体重要性选择)
  - [2. 配合预加载](#2-配合预加载)
  - [3. 字体子集化](#3-字体子集化)
  - [4. 性能对比建议](#4-性能对比建议)
- [实施建议](#实施建议)

`font-display`是 `CSS` 的字体加载控制属性，它决定了**网页字体在加载期间的显示行为**，对页面性能（特别是渲染性能和用户体验）有重要影响。

## 可用属性值及特点

1. **auto**(默认值)
   - 浏览器默认行为（通常等同于`block`）
   - ❌ 不推荐使用
2. **block**
   - 短暂阻塞文本渲染（约3秒）
   - 字体加载完成后切换
   - ⚠️ 可能导致布局偏移(CLS)
3. **swap**
   - 立即显示备用字体
   - 字体加载后替换
   - ✅ 适合标题等关键文本
   - ⚠️ 可能产生"字体闪烁"
4. **fallback**
   - 极短阻塞期（约100ms）
   - 然后显示备用字体
   - 短时间窗口（约3秒）内完成字体切换
   - ✅ 平衡型选择
5. **optional**
   - 极短阻塞期（约100ms）
   - 只有字体缓存可用时才使用
   - ✅ 最佳性能选择（但首次访问可能看不到自定义字体）

## 优化策略

### 1. 按字体重要性选择

```css 
/* 关键标题字体 - 确保最终显示 */
h1 {
  font-family: 'Important Font';
  font-display: swap;
}

/* 正文文本 - 平衡体验 */
body {
  font-family: 'Body Font';
  font-display: fallback;
}

/* 装饰性字体 - 性能优先 */
.decorative {
  font-family: 'Fancy Font';
  font-display: optional;
}
```


### 2. 配合预加载

```html 
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
```


### 3. 字体子集化

- 仅加载需要的字符集
- 使用unicode-range描述符

### 4. 性能对比建议

| 场景        | 推荐值      | FCP优化 | CLS风险 | 适用场景     |
| --------- | -------- | ----- | ----- | -------- |
| 关键品牌字体    | swap     | 中     | 高     | 标题/LOGO  |
| 主要正文      | fallback | 高     | 中     | 段落文本     |
| 装饰性元素     | optional | 最高    | 低     | 图标/非必要装饰 |
| 已知缓存存在的字体 | optional | 最高    | 低     | 用户回访时    |

## 实施建议

1. **监控字体加载性能**

```javascript 
document.fonts.ready.then(() => {
  console.log('所有字体加载完成');
});
```


1. **A/B测试不同策略**
   - 比较不同设置对LCP/FCP/CLS的影响
2. **结合FOUT控制**

```css 
@font-face {
  font-family: 'MyFont';
  src: url('myfont.woff2') format('woff2');
  font-display: swap;
}

/* 初始使用系统字体 */
body {
  font-family: system-ui, -apple-system, sans-serif;
}

/* 字体加载后应用 */
.fonts-loaded body {
  font-family: 'MyFont', system-ui;
}
```


1. **现代字体格式优先**
   - 优先使用WOFF2格式（比WOFF小30%）

通过合理配置`font-display`，可以在保持品牌视觉风格的同时，显著改善页面的首次内容绘制(FCP)和布局稳定性(CLS)指标。
