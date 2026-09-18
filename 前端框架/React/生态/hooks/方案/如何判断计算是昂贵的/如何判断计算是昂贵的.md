# 如何判断计算是昂贵的

一般来说只有你创建或循环遍历了成千上万个对象时才会很耗费时间。如果你想确认一下，可以添加控制台输出来测量某一段代码的执行时间：

```javascript 
console.time('筛选数组');
const visibleTodos = getFilteredTodos(todos, filter);
console.timeEnd('筛选数组');

```


触发要测量的交互（例如，在输入框中输入）。你会在控制台中看到类似 `筛选数组：0.15ms` 这样的输出日志。如果总耗时达到了一定量级（比方说 `1ms` 或更多），那么把计算结果记忆（memoize）起来可能是有意义的。做一个实验，你可以把计算传入 `useMemo` 中来验证该交互导致的总耗时是减少了还是没什么变化：

```javascript 
console.time('筛选数组');
const visibleTodos = useMemo(() => {
  return getFilteredTodos(todos, filter); // 如果 todos 或 filter 没有发生变化将跳过执行
}, [todos, filter]);
console.timeEnd('筛选数组');

```


**`useMemo`**\*\* 不会让 第一次 渲染变快。它只是帮助你跳过不必要的更新。\*\* ​
