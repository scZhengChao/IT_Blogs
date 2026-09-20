# 渲染和提交

## 目录

- [步骤 1: 触发一次渲染 ](#步骤-1-触发一次渲染-)
  - [初次渲染 ](#初次渲染-)
  - [陷阱](#陷阱)
- [步骤 2: React 渲染您的组件 ](#步骤-2-React-渲染您的组件-)
- [步骤 3: React 把更改提交到 DOM 上 ](#步骤-3-React-把更改提交到-DOM-上-)
- [尾声：浏览器绘制 ](#尾声浏览器绘制-)

## 步骤 1: 触发一次渲染&#x20;

有两种原因会导致组件的渲染:

1. 组件的 **初次渲染。**
2. 组件（或者其祖先之一）的 **状态发生了改变。**

### 初次渲染&#x20;

当应用启动时，会触发初次渲染。框架和沙箱有时会隐藏这部分代码，但它是通过调用目标 DOM 节点的 [createRoot](https://zh-hans.react.dev/reference/react-dom/client/createRoot "createRoot")，然后用你的组件调用 `render` 函数完成的：

```javascript 
import Image from './Image.js';
import { createRoot } from 'react-dom/client';

 const root = createRoot(document.getElementById('root'))
root.render(<Image />);
```


### 陷阱

渲染必须始终是一次 [纯计算](https://zh-hans.react.dev/learn/keeping-components-pure "纯计算"):

- **输入相同，输出相同。** 给定相同的输入，组件应始终返回相同的 JSX。（当有人点了西红柿沙拉时，他们不应该收到洋葱沙拉！）
- **只做它自己的事情。** 它不应更改任何存在于渲染之前的对象或变量。（一个订单不应更改其他任何人的订单。）

否则，随着代码库复杂性的增加，您可能会遇到令人困惑的错误和不可预测的行为。在 “严格模式” 下开发时，React 会调用每个组件的函数两次，这可以帮助发现由不纯函数引起的错误。

## 步骤 2: React 渲染您的组件&#x20;

在您触发渲染后，React 会调用您的组件来确定要在屏幕上显示的内容。**“渲染中” 即 React 在调用您的组件。**

- **在进行初次渲染时,** React 会调用根组件。
- **对于后续的渲染,** React 会**调用内部状态更新触发了渲染的函数组件。**

这个过程是递归的：如果更新后的组件会返回某个另外的组件，那么 React 接下来就会渲染 *那个* 组件，而如果那个组件又返回了某个组件，那么 React 接下来就会渲染 *那个* 组件，以此类推。这个过程会持续下去，直到没有更多的嵌套组件并且 React 确切知道哪些东西应该显示到屏幕上为止。

## 步骤 3: React 把更改提交到 DOM 上&#x20;

在渲染（调用）您的组件之后，React 将会修改 DOM。

- **对于初次渲染，** React 会使用 [appendChild()](https://developer.mozilla.org/docs/Web/API/Node/appendChild "appendChild()") DOM API 将其创建的所有 DOM 节点放在屏幕上。
- **对于重渲染，** React 将应用**最少的必要操作（在渲染时计算！**），以使得 DOM 与最新的渲染输出相互匹配。

## 尾声：浏览器绘制&#x20;

在渲染完成并且\*\* React 更新 DOM 之后，浏览器就会重新绘制屏幕。\*\* 尽管这个过程被称为“浏览器渲染”（“browser rendering”），但我们还是将它称为“绘制”（“painting”），以避免在这些文档的其余部分中出现混淆。
