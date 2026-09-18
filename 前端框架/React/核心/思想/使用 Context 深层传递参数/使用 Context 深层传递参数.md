# 使用 Context 深层传递参数

## 目录

- [传递 props 带来的问题](#传递-props-带来的问题)
- [Context：传递 props 的另一种方法](#Context传递-props-的另一种方法)
  - [Step 1：创建 context ](#Step-1创建-context-)
  - [Step 2：使用 Context ](#Step-2使用-Context-)
  - [Step 3：提供 context ](#Step-3提供-context-)
- [写在你使用 context 之前 ](#写在你使用-context-之前-)
- [Context 的使用场景](#Context-的使用场景)

## 传递 props 带来的问题

状态提升 到太高的层级会导致 “逐层传递 props” 的情况

## Context：传递 props 的另一种方法

### Step 1：创建 context&#x20;

首先，你需要创建这个 context，并 **将其从一个文件中导出**，这样你的组件才可以使用它：

```typescript 
import { createContext } from 'react';

export const LevelContext = createContext(1);
```


`createContext` 只需**默认值**这么一个参数

### Step 2：使用 Context&#x20;

从 React 中引入 `useContext` Hook 以及你刚刚创建的 context:

```typescript 
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  // ...
}


```


`useContext` 是一个 Hook。和 `useState` 以及 `useReducer`一样，你只能在 React 组件中（**不是循环或者条件里）立即调用 Hook。**

如果你不提供 context，React 会使用你在上一步指定的默认值。在这个例子中，你为 `createContext` 传入了 `1` 这个参数，所以 `useContext(LevelContext)` 会返回 `1`

### Step 3：提供 context&#x20;

`Section` 组件目前渲染传入它的子组件：

**把它们用 context provider 包裹起来**  以提供 `LevelContext` 给它们：

```react tsx 
import { LevelContext } from './LevelContext.js';

export default function Section({ level, children }) {
  return (
    <section className="section">
      <LevelContext.Provider value={level}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}

```


这告诉 React：“如果在 `<Section>` **组件中的任何子组件请求 ****`LevelContext`****，给**他们这个 `level`。”组件会使用\*\* UI 树中在它上层最近\*\*的那个 `<LevelContext.Provider>` 传递过来的值。

**Context 让你可以编写“适应周围环境”的组件，并且根据 在哪 （或者说 在哪个 context 中）来渲染它们不同的样子**。

Context 的工作方式可能会让你想起 **CSS 属性继承**。在 CSS 中，你可以为一个 \<div> 手动指定 color: blue，并且其中的任何 DOM 节点，无论多深，都会继承那个颜色，除非中间的其他 DOM 节点用 color: green 来覆盖它。类似地，在 React 中，**覆盖来自上层的某些 context 的唯一方法是将子组件包裹到一个提供不同值的 context provider 中。**

在 CSS 中，诸如 `color` 和 `background-color` 之类的不同属性不会覆盖彼此。你可以设置所有 `<div>` 的 `color` 为红色，而不会影响 `background-color`。类似地，**不同的 React context 不会覆盖彼此**。你通过 `createContext()` 创建的每个 context 都和其他 context 完全分离，只有使用和提供 **那个特定的 context 的组件才会联系在一起。一个组件可以轻松地使用或者提供许多不同的 context**。

## 写在你使用 context 之前&#x20;

使用 Context 看起来非常诱人！然而，这也意味着它也太容易被过度使用了。**如果你只想把一些 props 传递到多个层级中，这并不意味着你需要把这些信息放到 context 里。**

在使用 context 之前，你可以考虑以下几种替代方案：

1. **从 **[**传递 props**](https://react.docschina.org/learn/passing-props-to-a-component "传递 props")** 开始。** 如果你的组件看起来不起眼，那么通过十几个组件向下传递一堆 props 并不罕见。这有点像是在埋头苦干，但是这样做可以让哪些组件用了哪些数据变得十分清晰！维护你代码的人会很高兴你用 props 让数据流变得更加清晰。
2. **抽象组件并 **[**将**](https://react.docschina.org/learn/passing-props-to-a-component#passing-jsx-as-children "将")[ JSX 作为 ](https://react.docschina.org/learn/passing-props-to-a-component#passing-jsx-as-children " JSX 作为 ")[children](https://react.docschina.org/learn/passing-props-to-a-component#passing-jsx-as-children "children")[ 传递](https://react.docschina.org/learn/passing-props-to-a-component#passing-jsx-as-children " 传递") 给它们**。** 如果你通过很多层不使用该数据的中间组件（并且只会向下传递）来传递数据，这通常意味着你在此过程中忘记了抽象组件。举个例子，你可能想传递一些像 `posts` 的数据 props 到不会直接使用这个参数的组件，类似 `<Layout posts={posts} />`。取而代之的是，让 `Layout` 把 `children` 当做一个参数，然后渲染 `<Layout><Posts posts={posts} /></Layout>`。这样就减少了定义数据的组件和使用数据的组件之间的层级。

如果这两种方法都不适合你，再考虑使用 context。

## Context 的使用场景

- **主题：** 如果你的应用允许用户更改其外观（例如暗夜模式），你可以在应用顶层放一个 context provider，并在需要调整其外观的组件中使用该 context。
- **当前账户：** 许多组件可能需要知道当前登录的用户信息。将它放到 context 中可以方便地在树中的任何位置读取它。某些应用还允许你同时操作多个账户（例如，以不同用户的身份发表评论）。在这些情况下，将 UI 的一部分包裹到具有不同账户数据的 provider 中会很方便。
- **路由：** 大多数路由解决方案在其内部使用 context 来保存当前路由。这就是每个链接“知道”它是否处于活动状态的方式。如果你创建自己的路由库，你可能也会这么做。
- **状态管理：** 随着你的应用的增长，最终在靠近应用顶部的位置可能会有很多 state。许多遥远的下层组件可能想要修改它们。通常 [将 reducer 与 context 搭配使用](https://react.docschina.org/learn/scaling-up-with-reducer-and-context "将 reducer 与 context 搭配使用")来管理复杂的状态并将其传递给深层的组件来避免过多的麻烦。
