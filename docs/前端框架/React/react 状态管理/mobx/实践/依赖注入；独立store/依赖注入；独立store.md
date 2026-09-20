# 依赖注入；独立store

MobX 支持[依赖注入](https://so.csdn.net/so/search?q=依赖注入\&spm=1001.2101.3001.7020 "依赖注入"),这使得在大型应用中管理 Store 变得更加灵活和可扩展。我们可以使用 `inject` 高阶组件或 `useLocalStore` 钩子注入 Store 实例到组件中。

```typescript 
import { useLocalStore } from 'mobx-react-lite';

const TodoList = () => {
  const todoStore = useLocalStore(() => new TodoStore());

  return (
    <div>
      {todoStore.todos.map(todo => (
        <div key={todo.id}>{todo.text}</div>
      ))}
    </div>
  );
};

```


在这个例子中,我们使用 `useLocalStore` 钩子创建了一个局部的 `TodoStore` 实例。这样可以确保每个组件实例都有自己独立的状态管理。
