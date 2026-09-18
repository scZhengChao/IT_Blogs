# 获取 mxGraph 绑定的所有事件

## 目录

- [使用 getEventListeners 方法](#使用-getEventListeners-方法)
- [Chrome 开发者工具](#Chrome-开发者工具)

### 使用 getEventListeners 方法

```javascript 
// 在控制台直接运行（仅Chrome有效）
getEventListeners(graph.container);
```


### Chrome 开发者工具

1. 打开开发者工具 (F12)
2. 选择**Elements**面板
3. 选中 mxGraph 容器元素
4. 在右侧选择**Event Listeners**标签页
5. 展开查看所有事件监听器

```javascript 
// 在 Chrome 控制台直接运行
var listeners = getEventListeners(graph.container).keydown;
console.log("所有 keydown 监听器:", listeners);

// 遍历输出详细信息
listeners.forEach((listener, i) => {
  console.log(`监听器 #${i}:`, {
    "回调函数": listener.listener.toString(),
    "使用捕获": listener.useCapture,
    "被动模式": listener.passive,
    "源代码位置": `${listener.listener.location}`
  });
});
```
