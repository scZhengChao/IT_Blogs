# **为什么**\*\*`requestAnimationFrame`****比****`setTimeout`\*\***更好？**

## 目录

- [如何用requestAnimationFrame实现setInterval？](#如何用requestAnimationFrame实现setInterval)
- [关键点说明](#关键点说明)
- [适用场景](#适用场景)
- [不适用场景](#不适用场景)
- [总结](#总结)

1. **与浏览器刷新率同步（60Hz/120Hz）**
   - `rAF`会在每次屏幕刷新前执行回调（通常每秒 60 次，即约 16.67ms/帧）**，避免丢帧或卡顿**。
   - `setTimeout`的时间间隔是固定的，可能**因浏览器调度或主线程阻塞导致执行时机与屏幕刷新不同步。**
2. **自动后台节流**
   - 当页面隐藏（如切换标签页或最小化）时，`rAF`会**自动暂停执行，节省 CPU/GPU 资源。**
   - `setTimeout`仍会在后台运行（**尽管现代浏览器会限制最小间隔**）。
3. **更高性能**
   - 浏览器会优化`rAF`的调用，**合并多次渲染操作。**
   - `setTimeout`的频繁调用可能导致不必要的计算和重绘。
4. **避免时间漂移**
   - `rAF`的时间戳参数（`timestamp`）能精确控制帧率，而`setTimeout`可能因任务阻塞导致时间累积误差。

### **如何用**\*\*`requestAnimationFrame`****实现****`setInterval`？\*\*​

以下是实现代码，支持动态控制帧率和停止轮询：

```javascript 
/**
 * 基于 requestAnimationFrame 的定时循环
 * @param {Function} callback 回调函数
 * @param {number} interval 执行间隔（毫秒）
 * @returns {{ stop: Function }} 返回一个包含停止方法的对象
 */
function setAnimationInterval(callback, interval) {
  let startTime = performance.now();
  let rafId;
  
  const loop = (currentTime) => {
    const elapsed = currentTime - startTime;
    if (elapsed >= interval) {
      callback();
      startTime = currentTime; // 重置起始时间
    }
    rafId = requestAnimationFrame(loop);
  };
  
  rafId = requestAnimationFrame(loop);
  
  // 返回停止方法
  return {
    stop: () => cancelAnimationFrame(rafId)
  };
}

// 使用示例
const { stop } = setAnimationInterval(() => {
  console.log("每 100ms 执行一次");
}, 100);

// 5秒后停止
setTimeout(stop, 5000);
```


### **关键点说明**

1. **时间控制**
   - 通过`performance.now()`获取高精度时间戳，计算距离上次执行的时间差（`elapsed`）。
   - 只有当时差`>= interval`时才执行回调，确保间隔准确性。
2. **性能优化**
   - 即使回调频率要求较低（如 100ms），`rAF`仍会以屏幕刷新率运行循环，但通过时间差判断跳过不必要的执行。
3. **停止机制**
   - 返回`stop`方法，内部调用`cancelAnimationFrame`终止循环。

### **适用场景**

- **动画/游戏**：需要平滑渲染的场景（如 Canvas/WebGL 动画）。
- **视觉特效**：元素位移、颜色渐变等高频更新。
- **替代**\*\*`setInterval`\*\*：当需要更精确的时间控制或避免后台资源浪费时。

### **不适用场景**

- **非视觉任务**：**如纯数据轮询（建议用**\*\*`setTimeout`）。\*\*​
- **低频操作**：**间隔远大于屏幕刷新率（** 如 1 秒以上），此时`setTimeout`更简单。

### **总结**

| 特性        | \`requestAnimationFrame\` | \`setTimeout\`/\`setInterval\` |
| --------- | ------------------------- | ------------------------------ |
| **执行时机**​ | 屏幕刷新前同步                   | 固定时间间隔                         |
| **后台行为**​ | 自动暂停                      | 可能被节流（但仍在运行）                   |
| **性能**​   | 浏览器优化，无卡顿                 | 可能阻塞主线程                        |
| **精度**​   | 高精度时间戳控制                  | 依赖系统时钟，可能漂移                    |
| **适用场景**​ | 动画/高频视觉更新                 | 通用定时任务                         |
