# 动态 observable

有时我们需要在运行时创建可观察的[数据结构](https://edu.csdn.net/course/detail/40020?utm_source=glcblog\&spm=1001.2101.3001.7020 "数据结构")。MobX 提供了 `observable.map`、`observable.set` 和 `observable.array` 等 API 来动态创建可观察的集合。

```typescript 
import { observable } from 'mobx';

class TodoStore {
  @observable todos = observable.map();

  addTodo(id, text) {
    this.todos.set(id, { id, text, completed: false });
  }

  toggleTodo(id) {
    const todo = this.todos.get(id);
    todo.completed = !todo.completed;
  }
}

const todoStore = new TodoStore();
todoStore.addTodo(1, 'Learn MobX');
todoStore.addTodo(2, 'Build an app');
todoStore.toggleTodo(1);

```


在这个例子中,我们使用 observable.map 创建了一个可观察的 Map 来存储 todos。这样我们可以在运行时动态添加和修改 todos,同时 MobX 也能自动追踪这些变化,确保相关组件能够正确更新。
