# yjs

## 目录

- [什么是 mxGraph？](#什么是-mxGraph)
- [官方文档和资源](#官方文档和资源)
- [学习 mxGraph 的步骤](#学习-mxGraph-的步骤)
  - [1. 基本概念](#1-基本概念)
  - [2. 快速入门](#2-快速入门)
- [总结建议](#总结建议)
- [Yjs 详解：用于多人协作的 CRDT 库](#Yjs-详解用于多人协作的-CRDT-库)
- [一、Yjs 的核心特性](#一Yjs-的核心特性)
- [二、Yjs 的工作原理](#二Yjs-的工作原理)
  - [1. CRDT 实现机制](#1-CRDT-实现机制)
  - [2. 数据结构设计](#2-数据结构设计)
  - [3. 同步流程](#3-同步流程)
- [三、Yjs 的使用场景](#三Yjs-的使用场景)
- [四、代码示例：构建一个简单的协同文本编辑器](#四代码示例构建一个简单的协同文本编辑器)
  - [步骤 1：安装依赖](#步骤-1安装依赖)
  - [步骤 2：初始化 Yjs 文档与通信层](#步骤-2初始化-Yjs-文档与通信层)
  - [步骤 3：绑定到文本编辑器（以 Quill 为例）](#步骤-3绑定到文本编辑器以-Quill-为例)
  - [步骤 4：处理用户输入与同步](#步骤-4处理用户输入与同步)
- [五、Yjs 的优缺点](#五Yjs-的优缺点)
  - [优点：](#优点)
  - [缺点：](#缺点)
- [六、与其他库的对比](#六与其他库的对比)
- [七、学习资源](#七学习资源)
- [学习资料：](#学习资料)

如果你在寻找关于 **mxGraph** 的文档，以下是一些关键信息和资源的指引，帮助你更好地了解和使用 mxGraph。

***

### 什么是 mxGraph？

mxGraph 是一个强大的 JavaScript 库，用于创建交互式图表和图形编辑器。它支持流程图、组织结构图、网络拓扑图等多种图形的绘制和操作。mxGraph 提供了丰富的 API 和工具，允许开发者自定义图形的行为和外观。

mxGraph 最初由 JGraph 公司开发，后来被集成到他们的产品中（如 [draw.io](http://draw.io "draw.io")）。虽然 mxGraph 本身已经停止更新，但它的开源版本仍然广泛使用。

***

### 官方文档和资源

1. **官方文档**
   - mxGraph 的官方文档是最权威的学习资源。你可以通过以下链接访问：

     [mxGraph 官方文档](https://jgraph.github.io/mxgraph/ "mxGraph 官方文档")
   - 文档内容包括 API 参考、教程和示例代码，适合从入门到高级用户。
2. **GitHub 仓库**
   - mxGraph 的源码托管在 GitHub 上，地址如下：

     [mxGraph GitHub 仓库](https://github.com/jgraph/mxgraph "mxGraph GitHub 仓库")
   - 在这里，你可以找到项目的源码、示例代码以及社区贡献的内容。
3. [**draw.io**](http://draw.io "draw.io")
   - [draw.io](http://draw.io "draw.io") 是基于 mxGraph 构建的一个在线绘图工具。如果你想了解 mxGraph 的实际应用，可以参考 [draw.io](http://draw.io "draw.io") 的实现。

     [draw.io 官网](https://app.diagrams.net/ "draw.io 官网")

***

### 学习 mxGraph 的步骤

如果你是新手，可以从以下几个方面入手学习 mxGraph：

#### 1. **基本概念**

- **Graph**: 图形的核心对象，包含所有的节点和边。
- **Cell**: 图形的基本单元，可以是节点（vertex）或边（edge）。
- **Model**: 数据模型，用于存储图形的结构和属性。
- **View**: 视图层，负责渲染图形。
- **Editor**: 编辑器，提供交互功能。

#### 2. **快速入门**

- 下载 mxGraph 源码并引入到你的项目中。
- 创建一个简单的 HTML 文件，加载 mxGraph 的核心库。
- 使用以下代码绘制一个简单的图形：

```html 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxGraph 示例</title>
```


制作流程图、思维导图、组织结构图等，并且注重云端协作和分享功能，那么 **ProcessOn** 是一个非常好的选择。它提供了丰富的模板库，支持多人实时协作，适合企业团队、教育机构以及需要频繁在线沟通的用户。此外，ProcessOn 的界面友好，操作简单，非常适合非技术背景的用户快速上手。

- [**draw.io**](http://draw.io "draw.io")**（现为 **[**diagrams.net**](http://diagrams.net "diagrams.net")**）** &#x20;

  如果你需要一款免费、开源、功能强大的绘图工具，并且更倾向于本地化部署或离线使用，那么 [**draw.io**](http://draw.io "draw.io")**（**[**diagrams.net**](http://diagrams.net "diagrams.net")**）** 是理想的选择。它支持多种存储方式（如本地文件、Google Drive、OneDrive 等），并且可以轻松集成到企业内部系统中。对于开发者、IT工程师和技术人员来说，[draw.io](http://draw.io "draw.io") 提供了灵活的自定义能力和精确的图形控制，适合绘制技术架构图、网络拓扑图等专业图表。
- **mxGraph** &#x20;

  如果你是开发者，或者你的企业需要深度定制一款绘图工具，那么 **mxGraph** 是最佳的技术基础。作为 [draw.io](http://draw.io "draw.io") 的底层核心库，mxGraph 提供了强大的图形处理能力，但需要一定的编程能力来集成和扩展。它适合那些希望通过开发实现特定功能的企业或个人，比如嵌入式图表编辑器、专用领域的建模工具等。

### **总结建议**

1. **轻量级用户 & 团队协作**：选择 **ProcessOn**，尤其适合需要云端协作、快速产出图表的场景。
2. **技术用户 & 离线需求**：选择 [**draw.io**](http://draw.io "draw.io")**（**[**diagrams.net**](http://diagrams.net "diagrams.net")**）**，尤其是对成本敏感或需要本地化部署的用户。
3. **开发者 & 定制需求**：选择 **mxGraph**，适合需要从零构建或深度定制绘图功能的场景。

这三者的关系可以概括为：

- **ProcessOn** 是一个独立的 SaaS 平台，专注于提供易用性和协作功能。
- [**draw.io**](http://draw.io "draw.io")**（**[**diagrams.net**](http://diagrams.net "diagrams.net")**）** 是基于 **mxGraph** 开发的免费绘图工具，兼顾易用性和灵活性。
- **mxGraph** 是底层技术库，为 [draw.io](http://draw.io "draw.io") 和其他类似工具提供了核心能力支持。

根据你的具体需求（如预算、技术能力、使用场景等），可以选择最适合的工具或技术方案。

### Yjs 详解：用于多人协作的 CRDT 库

Yjs 是一个基于**CRDT（Conflict-Free Replicated Data Type）** 的 JavaScript 库，专为构建实时协作应用（如协同文档、白板、任务管理等）而设计。它通过无冲突的数据同步机制，支持多用户并发编辑，即使在高延迟或离线场景下也能保证数据一致性。以下从核心特性、工作原理、使用场景到代码示例的全面解析。

***

### 一、Yjs 的核心特性

1. **无冲突数据同步** &#x20;

   Yjs 使用 CRDT 算法，确保所有节点的数据最终一致，无需中央服务器协调冲突。
2. **高性能与低开销**
   - **增量更新**：仅传输差异数据，减少网络负载。
   - **二进制编码**：使用高效的二进制协议（如`lib0/encoding`），压缩传输数据。
3. **离线优先（Offline-First）** &#x20;

   支持离线编辑，恢复网络后自动同步变更。
4. **丰富的协作数据类型** &#x20;

   提供多种共享数据结构：
   - `Y.Array`：有序列表（如文本段落）。
   - `Y.Map`：键值对（如文档属性）。
   - `Y.Text`：富文本协作（支持格式修改）。
   - `Y.Doc`：顶层容器，管理所有共享数据。
5. **跨平台与网络协议无关**
   - 适配多种通信协议：WebSocket、WebRTC、Matrix、甚至本地存储。
   - 支持浏览器、Node.js、React Native 等环境。
6. **强大的生态系统**
   - **编辑器集成**：与 ProseMirror、Quill、CodeMirror、TipTap 等主流编辑器无缝对接。
   - **数据库集成**：与 IndexedDB、LevelDB 等持久化存储兼容。

***

### 二、Yjs 的工作原理

#### 1. CRDT 实现机制

Yjs 使用**基于操作的 CRDT**（Operation-based CRDT），每个操作（如插入、删除）被唯一标识并携带逻辑时间戳（Lamport Timestamp）。操作在传输时保持顺序，通过合并算法确保所有副本最终一致。

#### 2. 数据结构设计

- **共享类型（Shared Types）**：如`Y.Text`内部将文本分解为可独立更新的片段，每个片段关联唯一的 ID 和元数据。
- **状态向量（State Vector）**：记录每个客户端已确认的操作版本，用于快速比较和同步差异。

#### 3. 同步流程

1. **本地操作**：用户编辑触发本地数据变更。
2. **编码与传输**：变更被编码为二进制格式，通过通信层（如 WebSocket）广播给其他节点。
3. **解码与合并**：远端节点解码变更并合并到本地副本，触发 UI 更新。

### 三、Yjs 的使用场景

| 场景     | 适用性说明                                   |
| ------ | --------------------------------------- |
| 实时文档协作 | 支持富文本（如标题、段落、格式）的多人协同编辑，类似 Google Docs。 |
| 白板应用   | 同步绘制图形、便签、箭头等矢量元素。                      |
| 任务管理工具 | 多人同时更新看板（Kanban）中的任务状态、描述、标签等。          |
| 代码编辑器  | 实时协同编程，支持多人光标和代码差异高亮。                   |
| 离线优先应用 | 用户在无网络时编辑数据，恢复网络后自动同步。                  |

***

### 四、代码示例：构建一个简单的协同文本编辑器

#### 步骤 1：安装依赖

```javascript 
npm install yjs y-websocket
```


#### 步骤 2：初始化 Yjs 文档与通信层

```typescript 
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

// 创建共享文档
const ydoc = new Y.Doc();

// 连接到 WebSocket 服务器（如 y-websocket 提供的公共测试服务器）
const provider = new WebsocketProvider(
  'wss://yjs-demos.herokuapp.com', // 服务器地址
  'my-room-name',                  // 房间名（唯一标识）
  ydoc
);

// 定义共享文本类型
const ytext = ydoc.getText('shared-text');
```


#### 步骤 3：绑定到文本编辑器（以 Quill 为例）

```javascript 
// 初始化 mxGraph
const container = document.getElementById('graphContainer');
const graph = new mxGraph(container);

// 开始更新图形
graph.getModel().beginUpdate();
try {
    // 创建根节点
    const parent = graph.getDefaultParent();

    // 插入节点
    const processOn = graph.insertVertex(parent, null, 'ProcessOn\n(在线协作绘图工具)', 100, 50, 120, 60);
```


#### 步骤 4：处理用户输入与同步

用户的所有输入（文字、格式修改）会自动通过 Yjs 同步到其他客户端，无需额外代码。

***

### 五、Yjs 的优缺点

#### 优点：

- **无冲突设计**：天然支持多人并发编辑，无需复杂冲突解决逻辑。
- **高性能**：二进制协议和增量更新减少带宽占用。
- **离线支持**：本地操作缓存，网络恢复后自动同步。
- **生态系统成熟**：丰富的插件和编辑器集成。

#### 缺点：

- **学习曲线**：CRDT 概念和 Yjs API 需要一定时间掌握。
- **数据膨胀**：长期运行的文档可能积累大量元数据，需定期清理（通过 Yjs 的`gc`选项）。

***

### 六、与其他库的对比

| 库              | 同步机制     | 离线支持 | 性能 | 生态系统       |
| -------------- | -------- | ---- | -- | ---------- |
| **Yjs**​       | CRDT     | ✅    | 高  | 丰富（编辑器、协议） |
| **Automerge**​ | CRDT     | ✅    | 中等 | 一般         |
| **ShareDB**​   | OT（操作转换） | ❌    | 中等 | 依赖后端       |

***

### 七、学习资源

- **官方文档**：[https://docs.yjs.dev/](https://docs.yjs.dev/ "https://docs.yjs.dev/")
- **GitHub 仓库**：[https://github.com/yjs/yjs](https://github.com/yjs/yjs "https://github.com/yjs/yjs")
- **示例项目**：[https://github.com/yjs/yjs-demos](https://github.com/yjs/yjs-demos "https://github.com/yjs/yjs-demos")

***

通过 Yjs，开发者可以快速构建高可靠性的实时协作应用，无需深入底层 CRDT 实现细节。无论是简单的文本协同还是复杂的白板应用，Yjs 提供了从数据层到网络层的完整解决方案。

# 学习资料：

[https://juejin.cn/post/7242217556622573625](https://juejin.cn/post/7242217556622573625 "https://juejin.cn/post/7242217556622573625")

[https://juejin.cn/post/7470348137419587593](https://juejin.cn/post/7470348137419587593 "https://juejin.cn/post/7470348137419587593")

根据功能定位和技术特点，这三者适用于不同的使用场景和用户需求：

- **ProcessOn** &#x20;

  如果你是团队协作的重度用户，或者需要快速
- **引入图形库**：
  - 如果使用 `mxGraph`，可以通过 CDN 引入或直接下载源码集成。
  - 示例：
    ```html 
    ```html
    ```


// 启用拖拽功能 &#x20;
new mxDragSource(container, graph); &#x20;

// 设置连线样式 &#x20;

const style = graph.getStylesheet().getDefaultEdgeStyle(); &#x20;

style\[mxConstants.STYLE\_EDGE] = mxEdgeStyle.EntityRelation; &#x20;

style\[mxConstants.STYLE\_STROKECOLOR] = '#000000'; &#x20;

style\[mxConstants.STYLE\_STROKEWIDTH] = 2; &#x20;

```text 
#### **功能3：撤销与重做**  

```JavaScript  
// 初始化撤销管理器  
const undoManager = new mxUndoManager();  
const listener = (sender, evt) => {  
  undoManager.undoableEditHappened(evt.getProperty('edit'));  
};  

```
