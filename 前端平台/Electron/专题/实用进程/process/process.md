# process

## 目录

- [沙盒](#沙盒)
  - [事件：'loaded'](#事件loaded)
- [属性](#属性)
  - [process.defaultApp只读](#processdefaultApp只读)
  - [process.isMainFrame只读](#processisMainFrame只读)
  - [process.mas只读](#processmas只读)
  - [process.noAsar](#processnoAsar)
  - [rocess.noDeprecation](#rocessnoDeprecation)
  - [process.resourcesPath只读](#processresourcesPath只读)
  - [process.sandboxed只读](#processsandboxed只读)
  - [process.contextIsolated只读](#processcontextIsolated只读)
  - [process.throwDeprecation](#processthrowDeprecation)
  - [process.traceDeprecation](#processtraceDeprecation)
  - [process.traceProcessWarnings](#processtraceProcessWarnings)
  - [process.type只读](#processtype只读)
  - [process.versions.chrome只读](#processversionschrome只读)
  - [process.versions.electron只读](#processversionselectron只读)
  - [process.windowsStore只读](#processwindowsStore只读)
  - [process.contextId只读](#processcontextId只读)
  - [process.parentPort](#processparentPort)
- [方法](#方法)
  - [process.crash()](#processcrash)
  - [process.getCreationTime()](#processgetCreationTime)
  - [process.getCPUUsage()](#processgetCPUUsage)
  - [process.getHeapStatistics()](#processgetHeapStatistics)
  - [process.getBlinkMemoryInfo()](#processgetBlinkMemoryInfo)
  - [process.getProcessMemoryInfo()](#processgetProcessMemoryInfo)
  - [process.getSystemMemoryInfo()](#processgetSystemMemoryInfo)
  - [process.getSystemVersion()](#processgetSystemVersion)
  - [process.takeHeapSnapshot(filePath)](#processtakeHeapSnapshotfilePath)
  - [process.hang()](#processhang)
  - [process.setFdLimit(maxDescriptors)macOS Linux](#processsetFdLimitmaxDescriptorsmacOS-Linux)

> 流程对象的扩展。

进程：[主进程](https://electron.nodejs.cn/docs/latest/glossary#main-process "主进程")、[渲染器](https://electron.nodejs.cn/docs/latest/glossary#renderer-process "渲染器")、也有**可能是子进程**

Electron 的`process`对象是从[Node.js](https://nodejs.cn/api/process.html "Node.js")[process](https://nodejs.cn/api/process.html "process")[对象](https://nodejs.cn/api/process.html "对象")扩展而来的。**它添加了以下事件、属性和方法：**

## 沙盒

在沙盒渲染器中，`process`对象仅包含 API 的子集：

- `crash()`
- `hang()`
- `getCreationTime()`
- `getHeapStatistics()`
- `getBlinkMemoryInfo()`
- `getProcessMemoryInfo()`
- `getSystemMemoryInfo()`
- `getSystemVersion()`
- `getCPUUsage()`
- `uptime()`
- `argv`
- `execPath`
- `env`
- `pid`
- `arch`
- `platform`
- `sandboxed`
- `contextIsolated`
- `type`
- `version`
- `versions`
- `mas`
- `windowsStore`
- `contextId`

### 事件：'loaded'

当 Electron 加载其内部初始化脚本并开始加载网页或主脚本时发出。

## 属性

### `process.defaultApp`只读

一个`boolean`。当**应用通过作为参数传递**给默认的 Electron 可执行文件来启动时，该属性在主进程中为`true`，否则为`undefined`。例如当用`electron .`运行应用时，它是`true`，即使应用被打包（[isPackaged](https://electron.nodejs.cn/docs/latest/api/app#appispackaged-readonly "isPackaged")）也是`true`。这对于确定需要从`process.argv`中切掉多少个参数很有用。

### `process.isMainFrame`只读

当当前渲染器上下文是 "main" 渲染器帧时为`boolean`、`true`。如果你想要当前帧的 ID，你应该使用`webFrame.routingId`。

### `process.mas`只读

一个`boolean`。对于 Mac App Store 版本，此属性为`true`，对于其他版本，此属性为`undefined`。

### `process.noAsar`

控制应用内部 ASAR 支持的`boolean`。将其设置为`true`将禁用 Node 内置模块中对`asar`存档的支持。

### `rocess.noDeprecation`

控制是否将弃用警告打印到`stderr`的`boolean`。将其设置为`true`将消除弃用警告。使用此属性代替`--no-deprecation`命令行标志。

### `process.resourcesPath`只读

`string`代表资源目录的路径。

### `process.sandboxed`只读

一个`boolean`。当渲染器进程被沙箱化时，该属性为`true`，否则为`undefined`。

### `process.contextIsolated`只读

`boolean`指示当前渲染器上下文是否启用了`contextIsolation`。主进程中是`undefined`。

### `process.throwDeprecation`

控制是否将弃用警告作为异常抛出的`boolean`。将其设置为`true`将引发弃用错误。使用此属性代替`--throw-deprecation`命令行标志。

### `process.traceDeprecation`

`boolean`控制打印到`stderr`的弃用是否包含其堆栈跟踪。将其设置为`true`将打印弃用的堆栈跟踪。此属性代替`--trace-deprecation`命令行标志。

### `process.traceProcessWarnings`

`boolean`控制打印到`stderr`的进程警告是否包含其堆栈跟踪。将其设置为`true`将打印进程警告（包括弃用）的堆栈跟踪。此属性代替`--trace-warnings`命令行标志。

### `process.type`只读

**代表当前进程类型的**\*\*`string`\*\***可以是**：

- `browser`- 主进程
- `renderer`- 渲染器进程
- `service-worker`- 在服务工作者中
- `worker`- 在网络工作者中
- `utility`- 在作为服务启动的节点进程中

### `process.versions.chrome`只读

`string`**代表 Chrome 的版本字符串。**

### `process.versions.electron`只读

`string`**代表 Electron 的版本字符串。**

### `process.windowsStore`只读

一个`boolean`。如果应用作为 Windows 应用商店应用 (appx) 运行，则此属性为`true`，否则为`undefined`。

### `process.contextId`只读

`string`（可选）表示当前 JavaScript 上下文的全局唯一 ID。每个框架都有自己的 JavaScript 上下文。当启用 contextIsolation 时，隔离世界也有一个单独的 JavaScript 上下文。**该属性仅在渲染器进程中可用。**

### `process.parentPort`

如果这是允许与父进程通信的[UtilityProcess](https://electron.nodejs.cn/docs/latest/api/utility-process "UtilityProcess")（或`null`），则为[Electron.ParentPort](https://electron.nodejs.cn/docs/latest/api/parent-port "Electron.ParentPort")属性。

## 方法

`process`对象有以下方法：

### `process.crash()`

导致当前进程的主线程崩溃。

### `process.getCreationTime()`

返回`number | null`- 自纪元以来的毫秒数，如果信息不可用，则为`null`

表示应用的创建时间。时间表示为自纪元以来的毫秒数。如果无法获取进程创建时间则返回 null。

### `process.getCPUUsage()`

返回[CPUUsage](https://electron.nodejs.cn/docs/latest/api/structures/cpu-usage "CPUUsage")

### `process.getHeapStatistics()`

返回`Object`：

- `totalHeapSize`整数
- `totalHeapSizeExecutable`整数
- `totalPhysicalSize`整数
- `totalAvailableSize`整数
- `usedHeapSize`整数
- `heapSizeLimit`整数
- `mallocedMemory`整数
- `peakMallocedMemory`整数
- `doesZapGarbage`布尔值

返回具有 V8 堆统计信息的对象。请注意，所有统计数据均以千字节为单位报告。

### `process.getBlinkMemoryInfo()`

返回`Object`：

- `allocated`整数 - 所有已分配对象的大小（以千字节为单位）。
- `total`整数 - 分配的总空间（以千字节为单位）。

返回一个带有 Blink 内存信息的对象。它对于调试渲染/DOM 相关的内存问题非常有用。请注意，所有值均以千字节为单位报告。

### `process.getProcessMemoryInfo()`

返回`Promise<ProcessMemoryInfo>`- 用[进程内存信息](https://electron.nodejs.cn/docs/latest/api/structures/process-memory-info "进程内存信息")解决

返回一个对象，提供有关当前进程的内存使用统计信息。请注意，所有统计数据均以千字节为单位报告。该 api 应在应用准备就绪后调用。

Chromium 不为 macOS 提供`residentSet`值。这是因为 macOS 对最近未使用的页面执行内存压缩。因此，常驻设定大小值并不是人们所期望的。`private`内存更能代表 macOS 上进程的实际预压缩内存使用情况。

### `process.getSystemMemoryInfo()`

返回`Object`：

- `total`整数 - 系统可用的物理内存总量（以千字节为单位）。
- `free`整数 - 应用或磁盘缓存未使用的内存总量。
- `swapTotal`整数 Windows Linux - 系统可用的交换内存总量（以千字节为单位）。
- `swapFree`整数 Windows Linux - 系统可用的可用交换内存量（以千字节为单位）。

返回一个对象，提供有关整个系统的内存使用统计信息。请注意，所有统计数据均以千字节为单位报告。

### `process.getSystemVersion()`

返回`string`- 主机操作系统的版本。

示例：

```javascript 
const version = process.getSystemVersion()
console.log(version)
// On macOS -> '10.13.6'
// On Windows -> '10.0.17763'
// On Linux -> '4.15.0-45-generic'


```


注意：与`os.release()`不同，它返回实际的操作系统版本，而不是 macOS 上的内核版本。

### `process.takeHeapSnapshot(filePath)`

- `filePath`字符串 - 输出文件的路径。

返回`boolean`- 指示快照是否创建成功。

拍摄 V8 堆快照并将其保存到`filePath`。

### `process.hang()`

导致当前进程的主线程挂起。

### `process.setFdLimit(maxDescriptors)`macOS Linux

- `maxDescriptors`整数

将文件描述符软限制设置为`maxDescriptors`或操作系统硬限制，以当前进程的较低者为准。
