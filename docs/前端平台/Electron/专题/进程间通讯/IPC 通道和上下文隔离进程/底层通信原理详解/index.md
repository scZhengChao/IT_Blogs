# 底层通信原理详解

## 目录

- [1. 进程架构基础](#1-进程架构基础)
- [2. IPC 核心通信机制](#2-IPC-核心通信机制)
  - [(1) 通信通道建立](#1-通信通道建立)
  - [(2) 消息序列化过程](#2-消息序列化过程)
  - [(3) 跨进程数据传输](#3-跨进程数据传输)
- [3. 事件循环集成](#3-事件循环集成)
- [二、使用注意事项](#二使用注意事项)
  - [1. 性能优化建议](#1-性能优化建议)
    - [(1) 消息大小控制](#1-消息大小控制)
    - [(2) 高频消息优化](#2-高频消息优化)
  - [2. 内存管理](#2-内存管理)
    - [(1) 监听器泄漏防护](#1-监听器泄漏防护)
    - [(2) 大对象释放](#2-大对象释放)
  - [3. 安全实践](#3-安全实践)
    - [(1) 消息验证](#1-消息验证)
    - [(2) 敏感数据保护](#2-敏感数据保护)
  - [4. 调试与监控](#4-调试与监控)
    - [(1) 性能分析](#1-性能分析)
    - [(2) 内存检查](#2-内存检查)
- [三、高级场景处理](#三高级场景处理)
  - [1. 传输二进制数据](#1-传输二进制数据)
  - [2. 进程崩溃恢复](#2-进程崩溃恢复)
  - [3. 多窗口通信](#3-多窗口通信)

### 1. 进程架构基础

Electron 采用多进程架构：

- **主进程**：Node.js 环境，拥有系统权限
- **渲染进程**：Chromium 渲染进程，沙箱环境
- **GPU进程**：处理图形加速
- **Utility进程**：通用服务进程

### 2. IPC 核心通信机制

#### (1) 通信通道建立

```c++ 
// 底层实现关键代码 (简化版)
class ElectronIPCBridge {
public:
  void CreateChannel() {
    // Linux/macOS使用Unix domain socket
    socket_fd_ = socket(AF_UNIX, SOCK_STREAM, 0);
    
    // Windows使用命名管道
    pipe_handle_ = CreateNamedPipe(
      "\\\\.\\pipe\\electron.ipc",
      PIPE_ACCESS_DUPLEX,
      PIPE_TYPE_MESSAGE | PIPE_READMODE_MESSAGE,
      1,          // 最大实例数
      8192,       // 输出缓冲区大小
      8192,       // 输入缓冲区大小
      0,          // 默认超时
      NULL);
  }
};
```


#### (2) 消息序列化过程

使用v8的序列化协议：

1. 将JS对象转换为二进制格式
2. 处理特殊类型：
   - `Date`→ 64位时间戳
   - `Buffer`→ 保留原始内存
   - `Error`→ { message, stack }
3. 循环引用检测

#### (3) 跨进程数据传输

```c++ 
bool SendIPCMessage(int fd, const IPC::Message& message) {
  struct msghdr msg = {0};
  struct iovec iov[1];
  
  iov[0].iov_base = message.data();
  iov[0].iov_len = message.size();
  
  msg.msg_iov = iov;
  msg.msg_iovlen = 1;
  
  return sendmsg(fd, &msg, MSG_NOSIGNAL) == message.size();
}
```


### 3. 事件循环集成

```c++ 
// 集成Node.js事件循环
uv_poll_init(uv_default_loop(), &ipc_poll_handle_, ipc_fd_);
uv_poll_start(&ipc_poll_handle_, UV_READABLE, HandleIPCEvents);
```


## 二、使用注意事项

### 1. 性能优化建议

#### (1) 消息大小控制

```javascript 
// 错误示例：发送大对象
ipcRenderer.send('big-data', { data: hugeArray });

// 正确做法：分块传输
const CHUNK_SIZE = 64 * 1024; // 64KB
for (let i = 0; i < hugeArray.length; i += CHUNK_SIZE) {
  ipcRenderer.send('data-chunk', {
    index: i,
    chunk: hugeArray.slice(i, i + CHUNK_SIZE)
  });
}
```


#### (2) 高频消息优化

```javascript 
// 使用防抖合并消息
let pendingUpdates = [];
let sendTimer = null;

function scheduleUpdate(data) {
  pendingUpdates.push(data);
  
  if (!sendTimer) {
    sendTimer = setTimeout(() => {
      ipcRenderer.send('batch-update', pendingUpdates);
      pendingUpdates = [];
      sendTimer = null;
    }, 50); // 50ms批处理窗口
  }
}
```


### 2. 内存管理

#### (1) 监听器泄漏防护

```javascript 
// 错误示例：不清理监听器
function createWindow() {
  ipcMain.on('data', processData);
}

// 正确做法：窗口关闭时清理
function createWindow() {
  const win = new BrowserWindow();
  const listener = (event, data) => processData(data);
  
  ipcMain.on('data', listener);
  win.on('closed', () => {
    ipcMain.removeListener('data', listener);
  });
}
```


#### (2) 大对象释放

```javascript 
// 传输ArrayBuffer后手动释放
const buffer = new ArrayBuffer(1024 * 1024);
ipcRenderer.send('buffer', buffer, [buffer]); // 转移所有权

// 主进程接收后处理完主动释放
ipcMain.on('buffer', (event, buffer) => {
  processBuffer(buffer);
  buffer = null; // 促进GC回收
});
```


### 3. 安全实践

#### (1) 消息验证

```javascript 
// 验证消息来源
ipcMain.on('critical-action', (event, ...args) => {
  if (!validateSender(event.senderFrame)) {
    event.returnValue = 'unauthorized';
    return;
  }
  // 处理合法请求
});
```


#### (2) 敏感数据保护

```javascript 
// 使用临时密钥加密
const { encrypt } = require('./crypto-utils');

ipcRenderer.send('secure-data', {
  payload: encrypt(data, sessionKey),
  meta: { timestamp: Date.now() }
});
```


### 4. 调试与监控

#### (1) 性能分析

```javascript 
// 记录IPC耗时
const start = performance.now();
ipcRenderer.invoke('query').then(() => {
  console.log(`IPC耗时: ${performance.now() - start}ms`);
});
```


#### (2) 内存检查

```javascript 
// 打印IPC内存使用
process.on('ipc-message', (message) => {
  console.log(
    'IPC消息大小:',
    Buffer.byteLength(JSON.stringify(message))
  );
});
```


## 三、高级场景处理

### 1. 传输二进制数据

```javascript 
// 使用零拷贝传输
const buffer = new Uint8Array(1024);
ipcRenderer.postMessage('binary', buffer, [buffer.buffer]);

// 主进程接收
ipcMain.on('binary', (event, buffer) => {
  fs.writeFile('data.bin', buffer);
});
```


### 2. 进程崩溃恢复

```javascript 
// 渲染进程崩溃后重新连接
function setupIPC() {
  ipcRenderer.send('connect');
  
  ipcRenderer.on('disconnect', () => {
    setTimeout(setupIPC, 1000); // 1秒后重连
  });
}
```


### 3. 多窗口通信

```javascript 
// 通过主进程中转消息
function relayMessage(sender, targetId, message) {
  const target = BrowserWindow.fromId(targetId);
  if (target) {
    target.webContents.send('relay', message);
  }
}
```
