# `createEntityAdapter`

`createEntityAdapter`用于管理一组具有唯一标识符的实体适配器本质是对象，提供了一系列便捷的方法来操作这些对象。

`createEntityAdapter`：接受一个配置对象，用于创建实体适配器。配置对象的`sortComparer`属性是一个可选的比较函数，用于对实体进行排序。

实体适配器的`getInitialState`方法是用**于获取初始状态对象**，这个对象包含了实体适配器管理的实体列表以及其他自定义的状态属性。

实体适配器的`getSelectors`方法会**返回一组选择器函数，用于从状态中选择特定的数据。**

- `selectById`：根据 ID 选择一个特定的数据。
- `selectIds`：选择所有数据的 ID 列表。
- `selectEntities`：选择所有数据的实体对象。
- `selectAll`：选择所有数据的数组。
- `selectTotal`：选择所有数据的总数。

```typescript 
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
// 创建实体适配器
const todosAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.text.localeCompare(b.text),
});
// 定义初始状态
// todosAdapter.getInitialState是用于获取初始状态对象。这个对象包含了实体适配器管理的实体列表以及其他自定义的状态属性。
const initialState = todosAdapter.getInitialState({
  status: 'idle', 
   error: null,
});
// 创建切片，包含切片名、切片初始状态、以及切片的reducer函数，用于处理特定的 action
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded: todosAdapter.addOne,
    todoRemoved: todosAdapter.removeOne,
    todosLoaded: todosAdapter.setAll,
  },
});
// 导出todosSlice.actions，包含由 createSlice 自动生成的所有返回action对象的函数
export const { todoAdded, todoRemoved, todosLoaded } = todosSlice.actions;
// 导出由实体适配器生成的选择器函数，用于从状态中选择特定的数据
export const { selectById, selectIds, selectEntities, selectAll, selectTotal } = todosAdapter.getSelectors();
// 导出由 createSlice 自动生成的 reducer 函数，用于管理 todos 切片的状态
export default todosSlice.reducer;
```


在React组件中使用：

```typescript 
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { todoAdded, todosLoaded, selectAll } from './features/todos/todosSlice';

function TodoList() {
    const dispatch = useDispatch();
    const todos = useSelector(selectAll);

    useEffect(() => {
        // 模拟从 API 加载 todos
        const loadTodos = async () => {
            const response = await fetch('https://api.example.com/todos');
            const data = await response.json();
            dispatch(todosLoaded(data));
        };

        loadTodos();
    }, [dispatch]);

    const handleAddTodo = () => {
        dispatch(todoAdded({ id: Date.now(), text: 'New Todo', completed: false }));
    };

    return (
        <div>
            <button onClick={handleAddTodo}>Add Todo</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.text}</li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;

```


在这个组件中，`todoAdded`和`todosLoaded`这两个方法被用来派发添加新`todo`和加载`todos`的请求。`selectAll`**选择器用于从 Redux store 中选择所有的 todos。**
