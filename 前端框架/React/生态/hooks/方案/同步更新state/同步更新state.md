# 同步更新state

## 目录

- [用 flushSync 同步更新 state](#用-flushSync-同步更新-state)

#### 用 flushSync 同步更新 state

思考这样的代码，它添加一个新的待办事项，并将屏幕向下滚动到列表的最后一个子项。请注意，出于某种原因，它总是滚动到最后一个添加 **之前** 的待办事项：

```javascript 
import { useState, useRef } from 'react';

export default function TodoList() {
  const listRef = useRef(null);
  const [text, setText] = useState('');
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAdd() {
    const newTodo = { id: nextId++, text: text };
    setText('');
    setTodos([ ...todos, newTodo]);
    listRef.current.lastChild.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }

  return (
    <>
      <button onClick={handleAdd}>
        添加
      </button>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <ul ref={listRef}>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}

let nextId = 0;
let initialTodos = [];
for (let i = 0; i < 20; i++) {
  initialTodos.push({
    id: nextId++,
    text: '待办 #' + (i + 1)
  });
}

```


问题出在这两行：

```javascript 
setTodos([ ...todos, newTodo]);
listRef.current.lastChild.scrollIntoView();
```


在 React 中，[state 更新是排队进行的](https://zh-hans.react.dev/learn/queueing-a-series-of-state-updates "state 更新是排队进行的")。通常，这就是你想要的。但是，在这个示例中会导致问题，因为 `setTodos` 不会立即更新 DOM。因此，当你将列表滚动到最后一个元素时，尚未添加待办事项。这就是为什么滚动总是“落后”一项的原因。

要解决此问题，你可以**强制 React 同步更新（“刷新”）DOM。** 为此，从 `react-dom` 导入 `flushSync` 并**将 state 更新包裹** 到 `flushSync` 调用中：

```javascript 
flushSync(() => {
  setTodos([ ...todos, newTodo]);
});
listRef.current.lastChild.scrollIntoView();

```


这将指示 React 当**封装在 ****`flushSync`**** 中的代码执行后，立即同步更新 DOM**。因此，当你尝试滚动到最后一个待办事项时，它已经在 DOM 中了：
