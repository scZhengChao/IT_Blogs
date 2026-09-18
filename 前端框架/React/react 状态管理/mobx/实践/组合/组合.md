# 组合

## 目录

- [静态](#静态)
- [动态](#动态)

# 静态

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


# 动态

```typescript 
import UserStore from "@/store/userStore";
import TodoStore from "@/store/todoStore";
import Rtc from '@/store/rtc'
class RootStore<T> {
    userStore:UserStore<T>
    todoStore:todoStore<T>
    rtc
    uiStore:T
    constructor() {
        this.userStore = new UserStore<T>(this)
        this.todoStore = new TodoStore<T>(this)
        this.rtc = new Rtc(this)
    }
}
export default RootStore


```


```typescript 
import {createContext, useContext} from "react"
import  RootStore from '@/store/index'
class UiStore {

}
const rootStore = new RootStore<UiStore>()
rootStore.uiStore = new UiStore()
export const storeContext = createContext<RootStore>(rootStore)

```
