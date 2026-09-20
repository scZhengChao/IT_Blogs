# 状态store

## 目录

- [组合多个 stores](#组合多个-stores)

## 组合多个 stores

一个经常被问到的问题是：如何在不使用单例的情况下组合多个 stores，stores 之间如何相互通信？

创建一个 `RootStore` 是解决这个问题的有效模式：把所有 stores 实例化，并共享引用。这种模式的优点如下：

1. 易于设置
2. 支持强类型
3. 因为只需要实例化一个 root store，复杂的单元测试会变得简单一点

示例：

```typescript 
class RootStore {
    constructor() {
        this.userStore = new UserStore(this)
        this.todoStore = new TodoStore(this)
    }
}

class UserStore {
    constructor(rootStore) {
        this.rootStore = rootStore
    }

    getTodos(user) {
        // 通过 root store 来访问 todoStore
        return this.rootStore.todoStore.todos.filter(todo => todo.author === user)
    }
}

class TodoStore {
    todos = []
    rootStore

    constructor(rootStore) {
        makeAutoObservable(this, { rootStore: false })
        this.rootStore = rootStore
    }
}
```
