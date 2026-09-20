# localstorage

## 目录

- [ 特点](#特点)
- [属性：](#属性)
- [ 方法：](#-方法)
- [事件：](#事件)
- [localStorage是同步还是异步](#localStorage是同步还是异步)
  - [一、首先为什么会有这样的问题](#一首先为什么会有这样的问题)
  - [🍉 二、硬盘不是io设备吗？io读取不都是异步的吗？](#-二硬盘不是io设备吗io读取不都是异步的吗)
  - [🍑 三、完整操作流程](#-三完整操作流程)
  - [🍒 四、localStorage限制容量都是因为同步会阻塞的原因吗？](#-四localStorage限制容量都是因为同步会阻塞的原因吗)
  - [🍐 五、那indexDB会造成滥用吗？](#-五那indexDB会造成滥用吗)

##  特点

localStorage:    window的属性  返回 一个localStorage对象  同步

**localStorage只要在相同的协议、相同的主机名、相同的端口下，就能读取/修改到同一份localStorage数据。**

写到localStorage里面的都是字符

- json    ->    str 序列化
- &#x20;str     ->    json 反序列化，实体化

&#x20;特点： **大(\~5M),不会发往服务器,没有过期时间**

共同点：
&#x20;       **不安全、不能跨域、不能跨浏览器**

## 属性：

```javascript 
localStorage.key=value 种、写
localStorage.key;  获取，读
delete localStorage.key 删除
for in  localStorage 枚举 批量删除
```


## &#x20;方法：

```javascript 
localStorage.setItem(key,value) 种、写
localStorage.getItem(key) 读
localStorage.removeItem(key) 删除一个
localStorage.clear() 批量删除
```


## 事件：

```javascript 
window.onstorage 检测key 发生了变化   当前页面无法检测到
 ev.key 返回 变化的key
ev.newValue    变化后的值
ev.oldValue 前
```


```javascript 
//在Chrome，Firefox和Opera中，如果 事件由用户调用，则该事件是受信任的，如果由脚本调用，则不受信任 。在IE中，除了使用createEvent()方法创建的事件之外，所有事件都是可信任的，此外ie中 不需要跨页面 ；自己页面的改变也会触发监听

isTrusted: true 
key: "data"
oldValue: null
newValue: "a"
url: "http://localhost/Ecma/index.html"
storageArea: Storage {data: "a", length: 1}
type: "storage"
target: Window {parent: Window, opener: null, top: Window, length: 0, frames: Window, …}
currentTarget: Window {parent: Window, opener: null, top: Window, length: 0, frames: Window, …}
eventPhase: 0
bubbles: false
cancelable: false
defaultPrevented: false
composed: false
timeStamp: 12302.050000056624
srcElement: Window {parent: Window, opener: null, top: Window, length: 0, frames: Window, …}
returnValue: true
cancelBubble: false
path: [Window]
__proto__: StorageEvent

```


| **存储方式** | cookie | localStorage | sessionStorage | IndexedDB  | webSQL | FileSystem |
| -------- | ------ | ------------ | -------------- | ---------- | ------ | ---------- |
| **类型**   |        | key-value    | key-value      | NoSQL      | SQL    |            |
| **数据格式** | string | string       | string         | object     |        |            |
| **容量**   | 4k     | 5M           | 5M             | 500M       | 60M    |            |
| **进程**   | 同步     | 同步           | 同步             | 异步         | 异步     |            |
| **检索**   |        | key          | key            | key, index | field  |            |
| **性能**   |        | 读快写慢         |                | 读慢写快       |        |            |

# localStorage是同步还是异步

> 首先明确一点，localStorage是同步的

#### 一、首先为什么会有这样的问题

`localStorage` 是 Web Storage API 的一部分，它提供了一种存储键值对的机制。`localStorage` 的数据是**持久存储在用户的硬盘上**的，**而不是内存**。这意味着即使用户关闭浏览器或电脑，`localStorage` 中的数据也不会丢失，除非主动清除浏览器缓存或者使用代码删除。

当你通过 JavaScript 访问 `localStorage` 时，**浏览器会从硬盘中读取数据或向硬盘写入数据。**然而，在读写操作期间，数据可能会被暂时存放在内存中，以提高处理速度。但主要的特点**是它的持久性，以及它不依赖于会话的持续性。**

#### 🍉 二、硬盘不是io设备吗？io读取不都是异步的吗？

是的，**硬盘确实是一个 IO 设备，而大部分与硬盘相关的操作系统级IO操作确实是异步进行的**，以避免阻塞进程。不过，在 Web 浏览器环境中，`localStorage` 的API是设计为同步的，即使底层的硬盘读写操作有着IO的特性。

js代码在访问 `localStorage` 时，浏览器提供的API接口通常会**处于js执行线程上下文中直接调用**。这意味着尽管硬盘是IO设备，当一个js执行流程访问 `localStorage` 时，它将**同步地等待数据读取或写入完成**，该**过程中js执行线程会阻塞。**

这种同步API设计意味着开发者在操作 `localStorage` 时不需要考虑回调函数或者Promise等异步处理模式，可以按照同步代码的方式来编写。不过，**这也意味着如果涉及较多数据的读写操作时，可能对性能产生负面影响，特别是在主线程上，因为它会阻塞UI的更新和其他js的执行。**

#### 🍑 三、完整操作流程

`localStorage` 实现**同步存储的方式就是阻塞** `JavaScript` **的执行**，**直到数据的读取或者写入操作完成**。这种同步操作的实现可以简单概述如下：

1. **js线程调用**: 当 JavaScript 代码执行一个 `localStorage` 的操作，比如 `localStorage.getItem('key')` 或 `localStorage.setItem('key', 'value')`，这个调用发生在 js 的单个线程上。
2. **浏览器引擎处理**: 浏览器的 js 引擎接收到调用请求后，会向浏览器的存储子系统发出同步IO请求。此时 js 引擎等待IO操作的完成。
3. **文件系统的同步IO**: 浏览器存储子系统对硬盘执行实际的存储或检索操作。尽管操作系统层面可能对文件访问进行缓存或优化，但从浏览器的角度看，它会进行一个同步的文件系统操作，直到这个操作返回结果。
4. **操作完成返回**: 一旦IO操作完成，数据要么被写入硬盘，要么被从硬盘读取出来，浏览器存储子系统会将结果返回给 js 引擎。
5. **JavaScript线程继续执行**: js 引擎在接收到操作完成的信号后，才会继续执行下一条 js 代码。

#### 🍒 四、localStorage限制容量都是因为同步会阻塞的原因吗？

1. **资源公平分享**：同一用户可能会访问大量不同的网站，如果没有限制，随着时间的积累，每个网站可能会消耗大量的本地存储资源。这样会导致本地存储空间被少数几个站点占用，影响到用户访问其他网页的体验。限制大小可以确保所有网站都有公平的存储机会。
2. **防止滥用**：如果没有存储限制，网站可能会滥用 `localStorage`，存储大量数据在用户的设备上，这可能导致设备存储空间迅速耗尽，也可能侵犯用户的隐私。
3. **性能限制**：如之前提到的，`localStorage` 的操作是阻塞的。如果网站能够存储大量数据，就会加剧读写操作对页面性能的影响。
4. **存储效率**：`localStorage` 存储的是字符串形式的数据，不是为存储大量或结构化数据设计的。当尝试存储过多数据时，效率会降低。
5. **历史和兼容性**：5MB 的限制很早就已经被大多数浏览器实现，并被作为一个非正式的标准被采纳。尽管现在有些浏览器支持更大的 `localStorage`，但出于跨浏览器兼容性的考虑，开发者通常会假设这个限制。
6. **浏览器政策**：浏览器厂商可能会依据自己的政策来设定限制，可能是出于提供用户更一致体验的角度，或者是出于管理用户数据的方便。

#### 🍐 五、那indexDB会造成滥用吗？

虽然它们提供了**更大的存储空间和更丰富的功能**，但确实潜在地也可能被滥用。但是与相比 `localStorage` 增加了一些特性用来降低被滥用的风险：

1. **异步操作**：`IndexedDB` 是一个**异步API**，即使它被用来处理更大量的数据，也不会像 `localStorage` 那样阻塞主线程，从而避免了对页面响应性的直接影响。
2. **用户提示和权限**：对于某些浏览器，当网站尝试**存储大量数据时，浏览器可能会弹出提示，要求用户授权。** 这意味着用户有机会拒绝超出合理范围的存储请求。
3. **存储配额和限制**：尽管 `IndexedDB` 提供的存储容量比 `localStorage` 大得多，但它也不是无限的。浏览器会为 `IndexedDB` 设定**一定的存储配额**，这个配额可能基于可用磁盘空间的一个百分比或者是一个事先设定的限额。配额超出时，浏览器会拒绝更多的存储请求。
4. **更清晰的存储管理**：`IndexedDB` 的数据库形式允许**有组织的存储和更容易的数据管理。用户**或开发者可以更容易地查看和清理占用的数据。
5. **逐渐增加的存储**：某些浏览器实现 `IndexedDB` 存储时，可能会**在数据库大小增长到一定阈值时，提示用户是否允许继续存储，而不是一开始就分配一个很大的空间。**

[监听localstorage](./监听localstorage/index.md "监听localstorage")
