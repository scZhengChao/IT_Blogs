# 更近一步，实现前端状态管理

随着 `React` `Hooks` 的发布，`RxJS` 从作为 `Service` 层充当前端防腐层的角色，可以扩充到承担起整个前端状态管理的职责，在状态管理中对外接口设计，可以使用 RxJS 进行合理的封装，而针对应用的其他状态，通用可以通过 `RxJS` 来进行管理、分发。

前端状态管理最重要的里程碑之一是基于 Flux 架构实现的 Redux，它的**单向数据流的思想很好**的支撑起构建大型应用的使命，但是 Redux 有种种问题，让我们来细数一下：

1. 实现一个状态的处理，需要先在 Store定义，然后定义 Action ，通过 Dispatch Action 来修改 State，然后经过 Reducer 的 switch case 进行过滤处理，更新状态，接着通过 `mapStateToProps` 将修改的状态丢入组件内进行渲染，完**成一次状态的全流程，整个流程复杂、样本代码繁多**
2. 因为状**态更新的流程比较复杂，随着而来的是 Debug 比较困**难，基本上只能通过 Redux Devtools 去查看，当状态比较复杂时，很难去剥离出当前 Action 待修改的状态
3. 当需要**处理异步情况时，事情会变得更加复杂**，我们需要添加 Middleware，如 redux-thunk、redux-saga 等，这会使得原本就很复杂的情况变得更加难懂
4. 因为 `Redux` 天生是**单向数据流**，如果遇到一些事件、`WebSocket` 等异步处理时，很难去将这些异步状态与 Redux 的单向数据流整合起来
5. Redux 的单向数据流是具有传染性的，如果某个子包使用了 `Redux`，要接入这个子包，也得去使用 `Redux`
6. 结合 TypeScript 的使用体验糟糕
7. ....

上述问题可以具体观看 Redux 的官方文档了解，Redux 官方文档通过[一个经典的 TodoList 来介绍如何使用 Redux](https://link.juejin.cn/?target=https://redux.js.org/basics/reducers#reducersjs "一个经典的 TodoList 来介绍如何使用 Redux")。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be2638cb6500421d984f5fd6e6bca654~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

说了这么多槽点，那么 RxJS 来做状态管理有什么好处呢？

话不多说，先看个用 RxJS 实现 Redux TodoList 的例子：

```javascript 
// service/todo.ts
import { BehaviorSubject } from 'rxjs';

export interface ITodo {
    text: string;
    completed: boolean;
}

export enum VisibilityFilter {
    SHOW_ALL,
    SHOW_COMPLETED,
    SHOW_ACTIVE,
}

export default class TodoService {
    todos = new BehaviorSubject([
        {
            text: 'hello rxjs state management',
            completed: false,
        }
    ]);
    visibilityFilter = new BehaviorSubject(VisibilityFilter.SHOW_ALL);

    addTodo(text: string) {
         let todos = this.todos.value;
         todos = todos.concat({
            text,
            completed: false,
        });

        this.todos.next(todos);
    }

    toggleTodo(index: number) {
         let todos = this.todos.value;
         todos = todos.map((todo, i) => (i === index ? { text: todo.text, completed: !todo.completed } : todo));

        this.todos.next(todos);
    }

    setVisibilityFilter(filter: VisibilityFilter) {
        this.visibilityFilter.next(filter);
    }
}
```


```javascript 
// service/index.ts
import TodoService from "./todo";

export const todoService = new TodoService();

```


```javascript 
// hooks.ts
import { useState, useEffect, EffectCallback } from 'react';
import { BehaviorSubject } from 'rxjs';

export function useObservable<T>(observable: BehaviorSubject<T>) {
    const [val, setVal] = useState(observable.value);

    useEffect(() => {
        const subscription = observable.subscribe(setVal)
        return () => subscription.unsubscribe();
    }, [observable])

    return val;
}

```


```javascript 
// index.tsx
import React from 'react';
import { useObservable } from './hooks';
import { todoService } from './services';
import { ITodo, VisibilityFilter } from './services/todo';

export default function() {
    const todos = useObservable(todoService.todos);
    const filter = useObservable(todoService.visibilityFilter)
    const visibleTodos = getVisibleTodos(todos, filter);
    return (
        <div>
            <ul>
                {visibleTodos.map((todo, index) => (
                    <TodoItem key={index} todo={todo} index={index} />
                ))}
            </ul>
            <p>
                Show: <FilterLink filter={VisibilityFilter.SHOW_ALL}>All</FilterLink>,
                <FilterLink filter={VisibilityFilter.SHOW_ACTIVE}>Active</FilterLink>,
                <FilterLink filter={VisibilityFilter.SHOW_ALL}>Completed</FilterLink>
            </p>
        </div>
    );
}

const FilterLink = ({ filter, children }: { filter: VisibilityFilter; children: React.ReactNode }) => {
    const activeFilter = useObservable(todoService.visibilityFilter);
    const active = filter === activeFilter;
    return active ? (
        <span>{children}</span>
    ) : (
        <a href="" onClick={() => todoService.setVisibilityFilter(filter)}>
            {children}
        </a>
    );
};

const TodoItem = ({ todo: { text, completed }, index }: { todo: ITodo; index: number }) => {
    return (
        <li
            style={{
                textDecoration: completed ? "line-through" : "none",
            }}
            onClick={() => todoService.toggleTodo(index)}
        >
            {text}
        </li>
    );
};

function getVisibleTodos(todos: ITodo[], filter: VisibilityFilter): ITodo[] {
    switch (filter) {
        case VisibilityFilter.SHOW_ALL:
            return todos;
        case VisibilityFilter.SHOW_COMPLETED:
            return todos.filter(t => t.completed);
        case VisibilityFilter.SHOW_ACTIVE:
            return todos.filter(t => !t.completed);
    }
}

```


上述例子实现效果如下：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23a79409413546dbb007c3c0c01632be~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

可以看到这样实现状态管理有如下好处：

- 状态的 `Model` 与组件一一对应，状态清晰、`Debug` 清晰，没有样板代码，非常简介，调用 `todoService.toggleTodo` 等方法时，更新 `Service` 状态，然后通过 `useObservable` 钩子自动触发视图更新
- 当其他组件需要使用到这个状态时，直接通过 `useObservable` 导入使用
- 使用非常简单，没有中间层，如果组件部分出错了，那么问题基本上就可以通过断点调试在 Service 层发现
- 开箱即用的 TypeScript 支持，无需一些 Trick
- RxJS Observable 或者说 `Stream` 天然就是 `Immutable` 的，所以也无需 `immer` 之类的库来保证数据的不可突变性
- 借助 RxJS，可以在处理接口设计时起到非常强大效用，可以直接使用 Async/Await 来处理异步逻辑
- 等等...

当然我们这里实现的 `useObservable` 钩子还非常 Naive，更加生产化的实现可以参考以下这两个库：

- [github.com/LeetCode-Op…](https://link.juejin.cn?target=https://github.com/LeetCode-OpenSource/rxjs-hooks%EF%BC%88%E7%9B%AE%E5%89%8D%E5%B7%B2%E7%BB%8F%E4%B8%8D%E7%BB%B4%E6%8A%A4%EF%BC%8C%E6%8E%A8%E8%8D%90%E5%90%8E%E8%80%85%EF%BC%89 "github.com/LeetCode-Op…")
- [observable-hooks.js.org/guide/](https://link.juejin.cn?target=https://observable-hooks.js.org/guide/ "observable-hooks.js.org/guide/")

这种使用 RxJS 实现状态管理的方式也比较 Naive，更成熟的方案可以参考 [CycleJS](https://link.juejin.cn?target=https://github.com/cyclejs/cyclejs "CycleJS")。

[Redux 与 RxJS 状态管理的区别？](<./Redux 与 RxJS 状态管理的区别？/index.md> "Redux 与 RxJS 状态管理的区别？")
