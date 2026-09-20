# 生命周期和高频api

`Web Components` 的生命周期由一系列回调函数组成，这些回调会在组件的不同阶段自动触发。以下是完整的生命周期流程图：

```javascript 
元素创建 → constructor() 
    ↓
属性初始化 → attributeChangedCallback() (如果属性在创建时已存在)
    ↓
元素插入DOM → connectedCallback()
    ↓
    ├─ 属性变化 → attributeChangedCallback()
    ├─ 子元素变化 → (通过MutationObserver监听)
    └─ 插槽变化 → slotchange事件
    ↓
元素从DOM移除 → disconnectedCallback()
    ↓
元素被销毁 → (无直接回调，依赖垃圾回收)
```


[生命周期](IT/前端基础/web%20components/生命周期和高频api/生命周期/生命周期.md "生命周期")

[shadow DOM 高频 API ](<./shadow DOM 高频 API-/index.md> "shadow DOM 高频 API ")
