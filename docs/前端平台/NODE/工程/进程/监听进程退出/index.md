# 监听进程退出

## 目录

- [监听进程退出事件](#监听进程退出事件)
- [示例：监听进程退出](#示例监听进程退出)
- [注意事项](#注意事项)
- [为什么beforeExit可以处理异步操作；但是exit 不能](#为什么beforeExit可以处理异步操作但是exit-不能)
  - [beforeExit事件](#beforeExit事件)
  - [exit事件](#exit事件)
  - [事件循环与进程退出的关系](#事件循环与进程退出的关系)
  - [代码示例对比](#代码示例对比)

在 Node.js 中，可以通过监听进程的退出事件来执行一些清理操作或处理程序结束时的逻辑。Node.js 提供了`process`对象，其中包含了一些与进程相关的事件和方法。

### **监听进程退出事件**

Node.js 提供了以下事件来监听进程的退出：

1. \*\*`exit`\*\***事件**：
   - 当进程即将退出时触发。
   - 这是一个同步事件，不能执行异步操作。
   - 触发时机：**显式调用**\*\*`process.exit()`\*\***或事件循环没有待处理的任务时。**

```javascript 
process.on('exit', (code) => {
    console.log(`Process is about to exit with code: ${code}`);
    // 这里只能执行同步操作
});
```


1. \*\*`beforeExit`\*\***事件**：

- 当事件循环没有待处理的任务时触发。
- 可以执行异步操作。
- **如果显式调用**\*\*`process.exit()`，则不会触发此事件。\*\*​

```javascript 
process.on('beforeExit', (code) => {
    console.log(`Process is about to exit with code: ${code}`);
    // 这里可以执行异步操作
});
```


1. \*`SIGINT`**和**`SIGTERM`\**信号*\*：

- 当进程接收到终止信号时触发（例如按下`Ctrl+C`或系统发送终止信号）。
- 可以用于优雅地关闭进程。

```javascript 
process.on('SIGINT', () => {
    console.log('Received SIGINT. Exiting gracefully...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('Received SIGTERM. Exiting gracefully...');
    process.exit(0);
});
```


### **示例：监听进程退出**

以下是一个完整的示例，展示了如何监听进程的退出事件：

```javascript 
// 监听 exit 事件
process.on('exit', (code) => {
    console.log(`Process is about to exit with code: ${code}`);
});

// 监听 beforeExit 事件
process.on('beforeExit', (code) => {
    console.log(`Process is about to exit with code: ${code}`);
});

// 监听 SIGINT 信号（Ctrl+C）
process.on('SIGINT', () => {
    console.log('Received SIGINT. Exiting gracefully...');
    process.exit(0);
});

// 监听 SIGTERM 信号
process.on('SIGTERM', () => {
    console.log('Received SIGTERM. Exiting gracefully...');
    process.exit(0);
});

// 模拟一个长时间运行的任务
setInterval(() => {
    console.log('Running...');
}, 1000);

// 手动退出进程
setTimeout(() => {
    process.exit(0);
}, 5000);
```


### **注意事项**

1. \*\*`exit`\*\***事件中的异步操作**：
   - 在`exit`事件中，不能执行异步操作（如`setTimeout`或`Promise`），因为这些操作不会被处理。
2. \*\*`beforeExit`\*\***事件**：
   - 如果显式调用`process.exit()`，`beforeExit`事件不会触发。
3. **优雅关闭**：
   - 使用`SIGINT`和`SIGTERM`信号可以实现优雅关闭，确保资源被正确释放。

# 为什么beforeExit可以处理异步操作；但是exit 不能

在 Node.js 中，`beforeExit`和`exit`事件的行为差异与 Node.js 的事件循环机制和进程退出的流程有关。以下是详细解释：

***

### \*\*`beforeExit`\*\***事件**

- **触发时机**：
  - 当 Node.js 的事件循环中没有其他待处理的任务时触发。
  - 如果显式调用`process.exit()`，则不会触发`beforeExit`。
- **异步操作支持**：
  - `beforeExit`触发时，事件循环仍然处于运行状态，因此可以处理异步操作（如`setTimeout`、`Promise`等）。
  - 如果在`beforeExit`中启动了新的异步任务，事件循环会继续运行，直到所有任务完成。
- **使用场景**：
  - 适合在进程即将退出时执行一些异步的清理操作。

### `exit`事件

- **触发时机**：
  - 当进程即将退出时触发。
  - 无论是显式调用`process.exit()`还是事件循环中没有任务时，都会触发`exit`。
- **异步操作不支持**：
  - `exit`事件触发时，Node.js 的事件循环已经被关闭，无法再处理异步操作。
  - 任何异步操作（如`setTimeout`、`Promise`等）都会被忽略，因为事件循环已经停止。
- **使用场景**：
  - 适合在进程退出前执行一些同步的清理操作或记录日志。

### **事件循环与进程退出的关系**

- **事件循环**：
  - Node.js 是单线程的，依赖于事件循环来处理异步任务。
  - 事件循环负责处理 I/O 操作、定时器、回调等。
- **进程退出**：
  - 当进程退出时，Node.js 会关闭事件循环，释放所有资源。
  - 一旦事件循环关闭，异步操作就无法再执行。

### **代码示例对比**

以下是一个示例，展示了`beforeExit`和`exit`的区别：

```javascript 
// beforeExit 事件
process.on('beforeExit', (code) => {
    console.log(`beforeExit: Process is about to exit with code: ${code}`);
    setTimeout(() => {
        console.log('Async task in beforeExit'); // 这行会被执行
    }, 100);
});

// exit 事件
process.on('exit', (code) => {
    console.log(`exit: Process is about to exit with code: ${code}`);
    setTimeout(() => {
        console.log('Async task in exit'); // 这行不会被执行
    }, 100);
});

// 模拟一个任务
setTimeout(() => {
    console.log('Task completed');
}, 50);
```


**输出结果**：

```markdown 
Task completed
beforeExit: Process is about to exit with code: 0
Async task in beforeExit
exit: Process is about to exit with code: 0
```
