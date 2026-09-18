# Hook 的规则

## 目录

- [只在顶层调用 Hook ](#只在顶层调用-Hook-)
- [仅在 React 函数中调用 Hook ](#仅在-React-函数中调用-Hook-)

Hook 是使用 JavaScript 函数定义的，但它们代表了一种特殊的可重用的 UI 逻辑，并且对它们可以被调用的位置有限制。

**只在顶层调用 Hook
仅在 React 函数中调用 Hook**

## 只在顶层调用 Hook&#x20;

在 React 中，以 `use` 开头命名的函数被称为 [**Hook**](https://zh-hans.react.dev/reference/react "Hook")。

**不要在循环、条件语句、嵌套函数或 ****`try`****/****`catch`****/****`finally`**** 代码块中调用 Hook**。相反，你应该在 React 函数组件的顶层使用 Hook，且在任何提前返回之前。你只能在 React 渲染函数组件时调用 Hook：

- ✅ 在 [函数组件主体](https://zh-hans.react.dev/learn/your-first-component "函数组件主体") 的顶层调用它们。
- ✅ 在 [自定义 Hook 主体](https://zh-hans.react.dev/learn/reusing-logic-with-custom-hooks "自定义 Hook 主体") 的顶层调用它们。

不支持在其他任何情况下调用以 `use` 开头的 Hook，例如：

- 🔴 不要在条件语句或循环中调用 Hook。
- 🔴 不要在条件性的 `return` 语句之后调用 Hook。
- 🔴 不要在事件处理函数中调用 Hook。
- 🔴 不要在类组件中调用 Hook。
- 🔴 不要在传递给 `useMemo`、`useReducer` 或 `useEffect` 的函数内部调用 Hook。
- 🔴 不要在 `try`/`catch`/`finally` 代码块中调用 Hook。

## 仅在 React 函数中调用 Hook&#x20;

不要在常规的 JavaScript 函数中调用 Hook。相反，你可以：

✅ 在 React 函数组件中调用 Hook。
✅ 在 [自定义 Hook](https://zh-hans.react.dev/learn/reusing-logic-with-custom-hooks#extracting-your-own-custom-hook-from-a-component "自定义 Hook") 中调用 Hook。

遵循这条规则，你可以确保组件中的所有状态逻辑在其源代码中清晰可见。
