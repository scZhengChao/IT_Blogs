# million

## 目录

- [基本概念](#基本概念)
- [那为什么 million.js 会如此之快呢？](#那为什么-millionjs-会如此之快呢)
  - [使用步骤](#使用步骤)
  - [打包体积](#打包体积)
  - [工作原理](#工作原理)
    - [React 的虚拟 DOM](#React-的虚拟-DOM)
    - [Million 的虚拟 DOM](#Million-的虚拟-DOM)
      - [（1）静态分析](#1静态分析)
      - [(2）脏检查](#2脏检查)
  - [使用场景](#使用场景)
    - [静态内容多，动态内容少](#静态内容多动态内容少)
    - [“稳定”的 UI 树](#稳定的-UI-树)
    - [细粒度使用](#细粒度使用)
  - [总结](#总结)

位名为 Aidenybai 的高中生开发了一个名为 million.js 的轻量级（小于 4KB）虚拟 DOM 库，其可将 React 组件的性能提高多达 70%。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/EO58xpw5UMPhiaGmUtKUchduhenUngy0G6vZbVZaW6ja4yEuasrpaBTfegWJqGpe1uHZGI0W2FoGkBhqH2vmNicA/640?wx_fmt=png\&wxfrom=5\&wx_lazy=1\&wx_co=1)

那 million.js 到底是什么？又是如何让 React 的速度提高 70% 的呢？下面就来一探究竟！

**本文目录：**

- 基本概念
- 使用步骤
- 打包体积
- 工作原理
- 使用场景
- 总结

## 基本概念

Million.js 提供了一个极致优化的虚拟 DOM，可以与 React 兼容。使用 Million 创建 Web 应用程序就像使用 React 组件一样简单（它只是一个包装 React 组件的高阶组件），但加载和渲染速度更快。Million.js 使用经过微调和优化的虚拟 DOM 减少了 React 的开销，就像 React 组件以纯 JavaScript 的速度运行一样。

一个高中生就这么超越了Meta 的整个顶级工程师团队？带着怀疑看了看 JavaScript 框架性能基准测试对比结果：

![](./assets/image/image_Xme6NEuwvS.png)

数据不言自明，在第二张表中，内存消耗的差异更加显著，它清楚的显示了 Million 如何在内方面得到更好的优化。

# **那为什么 million.js 会如此之快呢？**

&#x20;      React 默认的虚拟 DOM **是实际 DOM 的一种内存抽象**。组件被存储在一个树形结构中，当**状态发生变化时，React 会创建一个新的虚拟 DOM。**接下来，将新的虚拟 DOM 树与旧的虚拟 DOM 树进行比较，找出两者之间的差异。最后，使用这些差异更新实际 DOM 树。这就是所谓的**协调过程**。但是，**创建全新的虚拟 DOM 代价很大。**

Million 通过使用**块虚拟 DOM**，采用了更加精简的方式。将应用程序中的**动态部分提取出来并进行跟踪**，当状态发生变化时，只对变化的部分进行 diff 操作。相比默认的虚拟 DOM，不需要对整个树进行 diff。由于\*\* Million 跟踪了动态部分的位置，因此可以精确地找到并更新它们\*\*，这种方法与 Svelte 很相似。

后面会详细介绍 Million.js 的工作原理。

## 使用步骤

在使用 million 之前，首先需要创建一个 React 项目在，这里略过创建项目的过程。

或者也可以直接克隆官方提供的 React + Vite 项目模板（`https://github.com/aidenybai/million-react`），打开项目根目录，依次执行 `npm install` 和 `npm run dev` 命令来启动项目，启动完成之后在浏览器输入 `localhost:3000` 就可以看到以下界面：

![](https://mmbiz.qpic.cn/sz_mmbiz_png/EO58xpw5UMPhiaGmUtKUchduhenUngy0G81Vl4NibQpiahjLR5R88iaDHtItEWiaTKdbezdx3CLAOajaQMagB0pdr1w/640?wx_fmt=png\&wxfrom=5\&wx_lazy=1\&wx_co=1)

可以通过以下命令来安装 million 库：

```react tsx 
npm install million

```


使用方式很简单，引入 million，并在组件中使用：

```react tsx 
import React, { useState } from 'react';
import { block } from 'million/react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <h1>Million + React</h1>
      <button onClick={() => setCount((count) => count + 1)}>
        count： {count}
      </button>
    </div>
  );
}

const AppBlock = block(App)

export default AppBlock
```


&#x20;   可以看到，组件从 million 中引入了 `block()`，并使用 `block()` 包裹 App 组件。Million.js 可以让我们创建块（block），块是一种特殊的高阶组件，可以像 React 组件一样使用，但具有更快的渲染速度。

&#x20;      块的一个**用例是高效地渲染数据列表**。下面在 React 中构建一个数据网格。可以在组件中分别定义 `<Table />`（用于展示数据列表） 和 `<Input />`（用于输入展示列表的行数） 组件，使用 `useState()` hook 存储要显示的行数。

```react tsx 
import React, { useState } from 'react';
import './App.css';

function App() {
  const [rows, setRows] = useState(1);
 
  return (
    <div>
      <Input value={rows} setValue={setRows} />
      <Table>
        // ...
      </Table>
    </div>
  );
}

export default App;

```


假设我们通过一个名为 `buildData(rows)` 的函数获取任意数据数组：

```react tsx 
const data = buildData(100);
// [{ adjective: '...', color: '...', noun: '...' }, ... x100]

```


现在可以使用 `Array.map()` 在表格中渲染数据：

```react tsx 
import React, { useState } from 'react';
import './App.css';

function App() {
  const [rows, setRows] = useState(1);
  const data = buildData(rows);
 
  return (
    <div>
      <Input value={rows} setValue={setRows} />
      <Table>
        {data.map(({ adjective, color, noun }) => (
          <tr>
            <td>{adjective}</td>
            <td>{color}</td>
            <td>{noun}</td>
          </tr>
        ))}
      </Table>
    </div>
  );
}

export default App;

```


页面效果如下：

![](https://mmbiz.qpic.cn/sz_mmbiz_png/EO58xpw5UMPhiaGmUtKUchduhenUngy0GvEzpukJOVLNkZgoic0JaAX76oSO9mBj2EDzXnVricw1iaVz7CGpbutklw/640?wx_fmt=png\&wxfrom=5\&wx_lazy=1\&wx_co=1)

它的性能表现非常好。从 0 到 100，几乎没有延迟，**但一旦超过 500 左右**，渲染时就会有明显的延迟。

这时引入 million 来看看：

```react tsx 
import React, { useState } from 'react';
import { block } from 'million/react';
import './App.css';

function App() {
  const [rows, setRows] = useState(1);
  const data = buildData(rows);
 
  return (
    <div>
      <Input value={rows} setValue={setRows} />
      <Table>
        {data.map(({ adjective, color, noun }) => (
          <tr>
            <td>{adjective}</td>
            <td>{color}</td>
            <td>{noun}</td>
          </tr>
        ))}
      </Table>
    </div>
  );
}

 const AppBlock = block(App)
 
export default AppBlock
```


此时，再**添加超过 500 条数据时，页面渲染就会快很多。**

除此之外，Million 还提供了其他实用工具，**特别是用于高效地渲染列表**。Million 并不推荐将传统的列表包装在`block` HOC 中进行渲染，而是推荐使用**内置的 ****`For`**** 组件：**

```react tsx 
<For each={data}>
  ({ adjective, color, noun }) => (
    <tr>
      <td>{adjective}</td>
      <td>{color}</td>
      <td>{noun}</td>
    </tr>
  )
</For>

```


## 打包体积

页面的执行性能非常重要，其初始加载也非常重要，其中一个重要因素就是**项目的打包体积**。这里我们使用 Million 和不使用它构建了相同的应用。

使用纯 React 的打包体积

![](./assets/image/image_j7c66rCqGe.png)

使用 Million 的打包体积：

![](./assets/image/image_hk50-y-6Zd.png)

可以看到，**gzip 捆绑包**大小的差异**小于 5 kB**，这意味着对于多数 React 应用来说，Million 对项目的体积影响可以忽略不计。

## 工作原理

最后，我们来看看 million 的工作原理。

### React 的虚拟 DOM

&#x20;   **虚拟 DOM 的产生是为了解决频繁操作真实 DOM 带来的性能问题**。它是真实 DOM 的**轻量级、内存中的表示形式**。当一个组件被渲染时，虚拟 DOM 会**计算新状态和旧状态之间的差异**（称为 diff 过程），并对**真实 DOM 进行最小化的变化，**使它与**更新后的虚拟 DOM 同步**（这个过程称为协调）。下面来看一个例子，假设有一个 React 组件 `<Numbers />`：

```react tsx 
function Numbers() {
  return (
    <foo>
      <bar>
        <baz />
      </bar>
      <boo />
    </foo>
  );
}

```


当 React 渲染此组件时，它将经过检查更改的 diff 和更新 DOM 的协调过程。这个过程看起来像这样：

1. 我们得到了两个虚拟 DOM：current（当前的），代表当前 UI 的样子，和 new（新的），代表想要看到的样子。

![](./assets/image/image_mkZnhnUCDH.png)

1. 比较第一个节点，发现没有差异，继续比较下一个。

![](./assets/image/image_JqgeZLu3JV.png)

1. 比较第二个节点，发现有一个差异，在 DOM 中进行更新。

![](./assets/image/image_fRFy5Aaik3.png)

1. 比较第三个节点，发现它在新的虚拟 DOM 中已经不存在了，在 DOM 中将其删除。

![](./assets/image/image_fE6dJpRlhL.png)

1. 比较第四个节点，发现它在新的虚拟 DOM 中已经不存在了，在 DOM 中将其删除。

![](./assets/image/image_2IHjy8fXgr.png)

1. 比较第五个节点，发现有差异，在 DOM 中进行更新并完成了整个过程。

![](./assets/image/image_wqjUQc5Iva.png)

&#x20;    diff 过程**取决于树的大小**，最终导致**虚拟 DOM 的性能瓶颈**。**组件的节点**越多，diff 所需要的时间就越长。

&#x20;    随着像 Svelte 这样的新框架的出现，由于性能开销的问题，甚至不再使用虚拟 DOM。相反，Svelte 使用一种**称为 "脏检查" 的技术**来确定哪些内容已经**发生了改变**。类似 SolidJS 这样的精细响应式框架更进一步，精确定位于 DOM 中哪些部分发生了变化，并仅更新这部分内容。

### Million 的虚拟 DOM

2022 年，Blockdom 发布了 。基于不同的思路，Blockdom 引入了“**块虚拟DOM**”的概念。块虚拟 DOM 采用不同的 diff 方法，可以分为两部分：

- **静态分析**：对虚拟 DOM 进行分析，将树的**动态部分提取到“Edit Map**”中，即虚拟DOM的动态部分到状态的“Edit”（Map）列表中。
- **脏检查**：对比状态（而不是虚拟 DOM 树）以确定发生了什么变化。如果状态发生了变化，通过 Edit Map 直接更新DOM。

简而言之，就是**对比数据而不是 DOM**，因为数据的大小通常比 DOM 的大小小得多。而且对比**数据值可能比对比完整的 DOM 节点更简单。**

由于 Million.js 采用了与 Blockdom 类似的方法，因此下面将使用 Million.js 的语法。

下面来看一个简单的计数器应用以及它如何使用 Million.js 处理：

```react tsx 
import { useState } from 'react';
import { block } from 'million/react';
 
function Count() {
  const [count, setCount] = useState(0);
 
  const node1 = count + 1;
  const node2 = count + 2;
 
  return (
    <div>
      <ul>
        <li>{node1}</li>
        <li>{node2}</li>
      </ul>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment Count
      </button>
    </div>
  );
}
const CountBlock = block(Count);

```


这个程序很简单，显示效果如下：

![](https://mmbiz.qpic.cn/sz_mmbiz_png/EO58xpw5UMPhiaGmUtKUchduhenUngy0GSJvGibJDp1TiaYU0iayuibMwxIHO2BYzmG5tnzjr4H0s5xSXQDKl7XMKNQ/640?wx_fmt=png\&wxfrom=5\&wx_lazy=1\&wx_co=1)

#### （1）静态分析

静态分析可以**在编译时或运行时的第一步完成**，具体取决于是否使用了 Million.js 的实验性编译器。

**此步骤负责将虚拟 DOM 的动态部分提取到“编辑映射”中。**

1. 这里没有使用 React 来渲染 JSX，而是使用 Million.js 来渲染它，它将占位符节点（用“？”表示）传递到虚拟DOM。这些节点将充当动态内容的占位符，并在静态分析过程中使用。

![](./assets/image/image_yzugJPpH2p.png)

1. 现在开始静态分析，检查第一个节点是否有占位符，没有找到，继续下一步。

![](./assets/image/image_q6oJus7tfy.png)

1. 在第二个节点中检查占位符，没有找到，继续下一步。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/EO58xpw5UMPhiaGmUtKUchduhenUngy0GXY5nSvaexkl8XkbRLO0ZqqibfjR0TnEsGfmhujffcwcQJr9iaRKz2xoA/640?wx_fmt=png\&wxfrom=5\&wx_lazy=1\&wx_co=1)

1. 检查第三个节点的占位符并找到“？”。将占位符添加到“Edit Map”，它将`prop1`关联到占位符节点。然后从块中删除占位符。

![](./assets/image/image_XQy0wYeubN.png)

1. 检查第四个节点的占位符并找到“？”。将占位符添加到“Edit Map”，它将 `prop2` 关联到占位符节点。然后从块中删除占位符。

![](./assets/image/image_ZMza_uzm5C.png)

1. 检查第五个节点是否有占位符，没有找到，完成检测。

![](./assets/image/image_ZHuFLoKBg1.png)

#### (2）脏检查

创建 Edit Map 后，就可以**开始脏检查了**。这一步负责确定状态发生了什么变化，并相应地更新 DOM。

1. 可以只区分 `prop1` 和 `prop2`，而不是按元素进行区分。由于两者都与**在静态分析期间创建的“Edit Map”相关联，** 因此一旦确定差异，就可以直接更新 DOM。

![](./assets/image/image_WawsOKkUzi.png)

1. 比较当前的 `prop1` 和新的 `prop1` 值，由于它们不同，因此更新了 DOM

![](./assets/image/image_wMAppXeRi0.png)

1. 比较当前的 `prop2` 和新的 `prop2` 值，由于它们不同，因此更新了 DOM。

![](./assets/image/image_8asDut1qgN.png)

可以看到，脏检查比 diff 步骤需要更少的计算。这是因为**脏检查只关心状态，而不关心虚拟 DOM**，因为每个**虚拟节点可能需要许多级别的递归**来确定它是否已经改变，**状态只需要一个浅层相等检查。**

## 使用场景

Million.js 具有相当高的性能，并且能够在 JavaScript 框架基准测试中胜过 React。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/EO58xpw5UMPhiaGmUtKUchduhenUngy0GC7NH7B7bVJNXunNdiaZBb94XX0czrJSLTBs3b7fDqGWnfmzR5jXBIOw/640?wx_fmt=png\&wxfrom=5\&wx_lazy=1\&wx_co=1)

JavaScript 框架基准测试通过**渲染一个包含行和列的大型表格来测试框架的性能**。该基准测试旨在测试高度不切实际的性能测试（如添加/替换 1000 行），并不一定代表真实的应用。

那 Million.js 或块虚拟 DOM 可以用在什么地方呢？

### 静态内容多，动态内容少

当有很多静态内容而动态内容很少时，最好使用块虚拟 DOM。**块虚拟 DOM最大的优势就是不需要考虑虚拟 DOM 的静态部分**，所以如果能跳过很多**静态内容，速度会非常快。**

例如，在这种情况下，块虚拟 DOM 将比常规虚拟 DOM 快得多：

```react tsx 
// ✅
<div>
  <div>{dynamic}</div>
  很多静态内容...
</div>

```


如果有很多动态内容，可能看不出块虚拟 DOM 和常规虚拟 DOM 的区别：

```react tsx 
// ❌
<div>
  <div>{dynamic}</div>
  <div>{dynamic}</div>
  <div>{dynamic}</div>
  <div>{dynamic}</div>
  <div>{dynamic}</div>
</div>

```


如果构建一个管理系统，或者一个**包含大量静态内容的网站**，块虚拟 DOM 可能非常适合。但是，如果构建一个网站，其中**比较数据所需的计算量明显大于比较虚拟 DOM 所需的计算量**，那么可能看不出太大差异。

例如，这个组件不适合块虚拟 DOM，因为要比较的数据值多于虚拟 DOM 节点：

```react tsx 
// 5个要比较的数据值
function Component({ a, b, c, d, e }) {
  // 1个要比较的虚拟DOM节点
  return <div>{a + b + c + d + e}</div>;
}

```


### “稳定”的 UI 树

块状虚拟 DOM 也适用于 **“稳定”的 UI 树，或者变化不大的 UI 树**。这是因为\*\* Edit Map 只创建一次，不需要在每次渲染时都重新创建。\*\*

例如，以下组件是块虚拟 DOM 的一个很好的使用场景：

```react tsx 
function Component() {
  return <div>{dynamic}</div>;
}

```


但是这个组件可能比常规的虚拟 DOM 慢：

```react tsx 
function Component() {
  return Math.random() > 0.5 ? <div>{dynamic}</div> : <p>sad</p>;
}

```


注意，“稳定”返回意味着**不允许具有非列表类动态的组件**（如同一组件中的条件返回）。

### 细粒度使用

初学者犯的最大错误之一是到处使用块虚拟 DOM。这是个坏主意，因为**块虚拟 DOM 并不总是比常规虚拟 DOM 快。**

相反，应该识别**块虚拟 DOM 更快的某些模式，并仅在这些情况下使用它**。例如，可能对大表使用块虚拟 DOM，但对具有少量静态内容的小表单使用常规虚拟 DOM。

## 总结

&#x20;       块虚拟 DOM 为虚拟 DOM 概念提供了一个全新的视角，提供了一种管理更新和最小化开销的替代方法。尽管它具有潜力，但**它并不是一种放之四海而皆准的解决方案**，开发人员在决定是否采用这种方法之前应该**评估应用的具体需求和性能要求**。

&#x20;     对于很多应用来说，传统的虚拟 DOM 可能就足够了，不需要切换到块虚拟 DOM 或其他以性能为中心的框架。如果应用在大多数设备上运行流畅且没有性能问题，那么可能不值得花时间和精力过渡到不同的框架。在对技术堆栈进行任何重大更改之前，必须**仔细权衡取舍并评估应用的要求。**
