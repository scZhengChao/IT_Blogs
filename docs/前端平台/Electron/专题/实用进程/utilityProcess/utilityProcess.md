# utilityProcess

## 目录

- [方法](#方法)
  - [utilityProcess.fork(modulePath\[, args\]\[, options\])](#utilityProcessforkmodulePath-args-options)
- [类：UtilityProcess](#类UtilityProcess)
  - [实例方法](#实例方法)
    - [child.postMessage(message, \[transfer\])](#childpostMessagemessage-transfer)
    - [child.kill()](#childkill)
  - [实例属性](#实例属性)
    - [child.pid](#childpid)
    - [child.stdout](#childstdout)
    - [child.stderr](#childstderr)
  - [实例事件](#实例事件)
    - [事件：'spawn'](#事件spawn)
    - [事件：'error' 实验](#事件error-实验)
    - [事件：'exit'](#事件exit)
    - [事件：'message'](#事件message)

`utilityProcess`创建一个**启用 Node.js 和消息端口的子进程**。它提供了与 Node.js 中的[child\_process.fork](https://nodejs.cn/dist/latest-v16.x/docs/api/child_process.html#child_processforkmodulepath-args-options "child_process.fork")API 等效的功能，但使用 Chromium 中的[服务 API](https://chromium.googlesource.com/chromium/src/+/main/docs/mojo_and_services.md "服务 API")来启动子进程。

## 方法

### `utilityProcess.fork(modulePath[, args][, options])`

- `modulePath`字符串 - 应作为子进程中的入口点运行的脚本的路径。
- `args`字符串\[]（可选） - 将在子进程中用作`process.argv`的字符串参数列表。
- `options`对象（可选）
  - `env`对象（可选） - 环境键值对。默认为`process.env`。
  - `execArgv`字符串\[]（可选） - 传递给可执行文件的字符串参数列表。
  - `cwd`字符串（可选） - 子进程的当前工作目录。
  - `stdio`（字符串\[] |字符串）（可选） - 允许配置子进程的`stdout`和`stderr`模式。默认为`inherit`。字符串值可以是`pipe`、`ignore`、`inherit`之一，有关这些值的更多详细信息，你可以参考 Node.js 的[stdio](https://nodejs.cn/dist/latest/docs/api/child_process.html#optionsstdio "stdio")文档。目前该选项仅支持将`stdout`和`stderr`配置为`pipe`、`inherit`或`ignore`。不支持将`stdin`配置为`ignore`以外的任何属性，并将导致错误。例如，支持的值将按如下方式处理：
    - `pipe`：相当于 \['ignore','pipe','pipe']
    - `ignore`：相当于 \['ignore','ignore','ignore']
    - `inherit`：相当于 \['ignore', 'inherit', 'inherit']（默认）
  - `serviceName`字符串（可选） - 将出现在[app.getAppMetrics](https://electron.nodejs.cn/docs/latest/api/app#appgetappmetrics "app.getAppMetrics")和[app](https://electron.nodejs.cn/docs/latest/api/app#event-child-process-gone "app")[的](https://electron.nodejs.cn/docs/latest/api/app#event-child-process-gone "的")[child-process-gone](https://electron.nodejs.cn/docs/latest/api/app#event-child-process-gone "child-process-gone")[事件](https://electron.nodejs.cn/docs/latest/api/app#event-child-process-gone "事件")返回的[ProcessMetric](https://electron.nodejs.cn/docs/latest/api/structures/process-metric "ProcessMetric")的`name`属性中的进程名称。默认为`Node Utility Process`。
  - `allowLoadingUnsignedLibraries`布尔值（可选）macOS - 使用此标志，实用程序进程将通过 macOS 上的`Electron Helper (Plugin).app`辅助程序可执行文件启动，该可执行文件可以使用`com.apple.security.cs.disable-library-validation`和`com.apple.security.cs.allow-unsigned-executable-memory`权利进行联合签名。这将允许实用程序进程加载未签名的库。除非你特别需要此功能，否则最好禁用此功能。默认为`false`。
  - `respondToAuthRequestsFromMainProcess`布尔值（可选） - 使用此标志，通过[net 模块](https://electron.nodejs.cn/docs/latest/api/net "net 模块")创建的所有 HTTP 401 和 407 网络请求都将允许通过主进程中的[app#login](https://electron.nodejs.cn/docs/latest/api/app#event-login "app#login")事件而不是[ClientRequest](https://electron.nodejs.cn/docs/latest/api/client-request "ClientRequest")对象上的默认[login](https://electron.nodejs.cn/docs/latest/api/client-request#event-login "login")事件对它们进行响应。默认为`false`。

## 类：UtilityProcess

> `UtilityProcess`的**实例代表 ****`Chromium`**** 通过 ****`Node.js`**** 集成生成的子进程。**

**`UtilityProcess`****是**[**EventEmitter**](https://nodejs.cn/api/events.html#events_class_eventemitter "EventEmitter")**。**

### 实例方法

#### `child.postMessage(message, [transfer])`

- `message`任意
- `transfer`MessagePortMain\[]（可选）

向子进程发送消息，可选择转让零个或多个[MessagePortMain](https://electron.nodejs.cn/docs/latest/api/message-port-main "MessagePortMain")对象的所有权。

例如：

```javascript 
// Main process
const { port1, port2 } = new MessageChannelMain()
const child = utilityProcess.fork(path.join(__dirname, 'test.js'))
child.postMessage({ message: 'hello' }, [port1])

// Child process
process.parentPort.once('message', (e) => {
  const [port] = e.ports
  // ...
})


```


#### `child.kill()`

返回`boolean`

**优雅地终止进程**。在 POSIX 上，它使用 SIGTERM 但会确保**进程在退出时被收获。如果杀死成功，该函数返回 true，否则返回 false。**

### 实例属性

#### `child.pid`

`Integer | undefined`代表子进程的进程标识符 (PID)。**在子进程成功生成之前，该值为**\*\*`undefined`****。当子进程退出时，发出****`exit`****事件后该值为****`undefined`。\*\*​

```javascript 
const child = utilityProcess.fork(path.join(__dirname, 'test.js'))

console.log(child.pid) // undefined

child.on('spawn', () => {
  console.log(child.pid) // Integer
})

child.on('exit', () => {
  console.log(child.pid) // undefined
})


```


**注意：你可以使用 pid 来确定进程是否正在运行。**

#### `child.stdout`

代表子进程的标准输出的`NodeJS.ReadableStream | null`。如果子进程是在 options.stdio\[1] 设置为 'pipe' 以外的任何值的情况下生成的，那么这将是`null`。当子进程退出时，发出`exit`事件后该值为`null`。

```javascript 
// Main process
const { port1, port2 } = new MessageChannelMain()
const child = utilityProcess.fork(path.join(__dirname, 'test.js'))
child.stdout.on('data', (data) => {
  console.log(`Received chunk ${data}`)
})


```


#### `child.stderr`

代表子进程的 stderr 的`NodeJS.ReadableStream | null`。如果子进程是在 options.stdio\[2] 设置为 'pipe' 以外的任何值的情况下生成的，那么这将是`null`。当子进程退出时，发出`exit`事件后该值为`null`。

### 实例事件

#### 事件：'spawn'

**子进程成功生成后发出。**

#### 事件：'error' 实验

返回：

- `type`字符串 - 错误类型。以下值之一：
  - `FatalError`
- `location`字符串 - 错误发生的源位置。
- `report`字符串 -[Node.js diagnostic report](https://nodejs.cn/docs/latest/api/report.html#diagnostic-report "Node.js diagnostic report")。

当子进程**由于 V8 的不可继续错误而需要终止时发出**。

**无论你是否监听**\*\*`error`****事件，子进程终止后都会发出****`exit`\*\***事件。**

#### 事件：'exit'

返回：

- `code`数字 - 包含从 POSIX 上的 waitpid 或 Windows 上的 GetExitCodeProcess 获取的进程退出代码。

子进程结束后发出。

#### 事件：'message'

返回：

- `message`任意

当子进程使用[process.parentPort.postMessage()](https://electron.nodejs.cn/docs/latest/api/process#processparentport "process.parentPort.postMessage()")发送消息时发出。
