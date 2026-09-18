# `createSelector`

`createSelector`用于**创建缓存的选择器函数**，**具有缓存的选择器可以在输入不变的情况下缓存计算结果**，**避免不必要的重新计算从而提高性能。**

`createSelector`：接受两个参数：

- 输入选择器数组：**第一个参数是一个数组，包含一个或多个基础选择器函数**。这些基础选择**器函数的返回值将作为第二个参数函数的输入。**
- 结果函数：第二个参数是一个函数，用于根据输**入选择器数组的元素计算最终的输出**。

```typescript 
import { createSelector } from '@reduxjs/toolkit';
// 基础选择器函数，从 Redux store 的状态对象中提取 todos的状态
// 参数state表示当前的 Redux store 状态
const selectTodos = (state) => state.todos;
// 返回值是过滤后的 todos，只包含 completed 属性为 true 的 todos。
const selectCompletedTodos = createSelector(
  [selectTodos],
  (todos) => todos.filter((todo) => todo.completed)
);
// 返回值是过滤后的 todos ，只包含 completed 属性为 false 的 todos
const selectIncompleteTodos = createSelector(
  [selectTodos],
  (todos) => todos.filter((todo) => !todo.completed)
);

```
