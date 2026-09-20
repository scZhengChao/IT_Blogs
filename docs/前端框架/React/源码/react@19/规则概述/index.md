# 规则概述

## 目录

- [组件和 Hook 必须是纯净的 ](#组件和-Hook-必须是纯净的-)
- [React 调用组件和 Hook](#React-调用组件和-Hook)
- [Hook 的规则 ](#Hook-的规则-)

## 组件和 Hook 必须是纯净的&#x20;

[组件和 Hook 中的纯净性](https://zh-hans.react.dev/reference/rules/components-and-hooks-must-be-pure "组件和 Hook 中的纯净性") 是 React 的一个关键规则，它使你的应用程序变得可预测、易于调试，并允许 React 自动优化你的代码。

- [组件必须是幂等的](https://zh-hans.react.dev/reference/rules/components-and-hooks-must-be-pure#components-and-hooks-must-be-idempotent "组件必须是幂等的")——React 组件被假定为总是针对它们一样的输入——props、state 和 context 返回相同的输出。
- [副作用必须在渲染之外运行](https://zh-hans.react.dev/reference/rules/components-and-hooks-must-be-pure#side-effects-must-run-outside-of-render "副作用必须在渲染之外运行")——副作用不应该在渲染中运行，因为 React 可能会多次渲染组件以创建最佳的用户体验。
- [属性和状态是不可变的](https://zh-hans.react.dev/reference/rules/components-and-hooks-must-be-pure#props-and-state-are-immutable "属性和状态是不可变的")——**一个组件的属性和状态是针对单次渲染的不可变快照。永远不要直接修改它们。**
- [Hook 的返回值和参数是不可变的](https://zh-hans.react.dev/reference/rules/components-and-hooks-must-be-pure#return-values-and-arguments-to-hooks-are-immutable "Hook 的返回值和参数是不可变的")——一旦值被传递给 Hook，你不**应该修改它们。就像在 JSX 中的属性一样，值在被传递给 Hook 时变得不可变。**
- [值在被传递给 JSX 后是不可变的](https://zh-hans.react.dev/reference/rules/components-and-hooks-must-be-pure#values-are-immutable-after-being-passed-to-jsx "值在被传递给 JSX 后是不可变的")——不要在值已经**被用于 JSX 后修改它们。在创建 JSX 之前进行修改。**

***

## React 调用组件和 Hook

[React 负责在必要时渲染组件和 Hook 以优化用户体验](https://zh-hans.react.dev/reference/rules/react-calls-components-and-hooks "React 负责在必要时渲染组件和 Hook 以优化用户体验")。它是声明式的：你在组件逻辑中告诉 React 需要渲染什么，React 会找出最佳方式将其展示给用户。

- [**永远不要直接调用组件函数**](https://zh-hans.react.dev/reference/rules/react-calls-components-and-hooks#never-call-component-functions-directly "永远不要直接调用组件函数")——组件应该只在 JSX 中使用。不要将它们作为常规函数调用。
- [**永远不要将 Hook 作为常规值传递**](https://zh-hans.react.dev/reference/rules/react-calls-components-and-hooks#never-pass-around-hooks-as-regular-values "永远不要将 Hook 作为常规值传递")——Hook 应该只在组件内部调用。不要将其作为常规值传递。

***

## Hook 的规则&#x20;

Hook 使用 JavaScript 函数定义，但它们代表一种特殊的可重用 UI 逻辑，并且它们在调用位置上有限制。当你使用 Hook 时，需要遵循 [Hook 的规则](https://zh-hans.react.dev/reference/rules/rules-of-hooks "Hook 的规则")。

- [**只在顶层调用 Hook**](https://zh-hans.react.dev/reference/rules/rules-of-hooks#only-call-hooks-at-the-top-level "只在顶层调用 Hook")——不要在循环、条件或嵌套函数中调用 Hook。相反，总是在你的 React 函数的顶层使用 Hook，并且在任何早期返回之前使用。
- [**只在 React 函数中调用 Hook**](https://zh-hans.react.dev/reference/rules/rules-of-hooks#only-call-hooks-from-react-functions "只在 React 函数中调用 Hook")**—**—不要从常规 JavaScript 函数中调用 Hook。

[组件和 Hook 必须是纯粹的](<./组件和 Hook 必须是纯粹的/index.md> "组件和 Hook 必须是纯粹的")

[React 调用组件和 Hook](<./React 调用组件和 Hook/index.md> "React 调用组件和 Hook")

[Hook 的规则](<./Hook 的规则/index.md> "Hook 的规则")
