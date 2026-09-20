# 异步操作与 runInAction:

## 目录

- [或者 flow](#或者-flow)

```typescript 
import { observable, action, runInAction } from 'mobx';

class TodoStore {
  @observable todos = [];
  @observable loading = false;
  @observable error = null;

  @action
  async fetchTodos() {
    this.loading = true;
    try {
      const response = await fetch('/api/todos');
      const data = await response.json();
      runInAction(() => {
        this.todos = data;
        this.loading = false;
        this.error = null;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err.message;
        this.loading = false;
      });
    }
  }
}

const todoStore = new TodoStore();
todoStore.fetchTodos();

```


在这个例子中,我们使用 `runInAction` 来确保异步操作中状态更新的原子性。无论是更新 `todos` 还是 `loading` 和 `error` 状态,都会包裹在 `runInAction` 中,确保状态的一致性。

从本质上讲，异步进程在 MobX 中不需要任何特殊处理，因为不论是何时引发的所有 reactions 都将会自动更新。 而且因为可观察对象是可变的，因此在 action 执行过程中保持对它们的引用一般是安全的。 然而，在异步进程中**更新可观察对象的每个步骤（tick）都应该被标识为`action`**。 我们可以通过利用上述的 API 以多种方式实现这一点，如下所示。

例如，在处理 Promise 时，更新 state 的处理程序应该被 `action` 包装起来，或者被标记为 actions，如下所示。

Promise 的决议处理程序是我们以内联的方式处理的，但是会在一开始的 action 执行完成之后运行，因此需要使用 `action` 对它们进行包装：

```typescript 
import { action, makeAutoObservable } from "mobx"

class Store {
    githubProjects = []
    state = "pending" // "pending", "done" or "error"

    constructor() {
        makeAutoObservable(this)
    }

    fetchProjects() {
        this.githubProjects = []
        this.state = "pending"
        fetchGithubProjectsSomehow().then(
            action("fetchSuccess", projects => {
                const filteredProjects = somePreprocessing(projects)
                this.githubProjects = filteredProjects
                this.state = "done"
            }),
            action("fetchError", error => {
                this.state = "error"
            })
        )
    }
}
```


如果 Promise 的处理函数是类的字段，它们将由 `makeAutoObservable` 自动包装为 `action`：

```typescript 
import { makeAutoObservable } from "mobx"

class Store {
    githubProjects = []
    state = "pending" // "pending", "done" or "error"

    constructor() {
        makeAutoObservable(this)
    }

    fetchProjects() {
        this.githubProjects = []
        this.state = "pending"
        fetchGithubProjectsSomehow().then(this.projectsFetchSuccess, this.projectsFetchFailure)
    }

    projectsFetchSuccess = projects => {
        const filteredProjects = somePreprocessing(projects)
        this.githubProjects = filteredProjects
        this.state = "done"
    }

    projectsFetchFailure = error => {
        this.state = "error"
    }
}
```


`await` **之后的任何操作都不与其同在一个 tick 中**，因此它们需要使用 action 包装。 在这里，我们可以利用 `runInAction`

```typescript 
import { runInAction, makeAutoObservable } from "mobx"

class Store {
    githubProjects = []
    state = "pending" // "pending", "done" or "error"

    constructor() {
        makeAutoObservable(this)
    }

    async fetchProjects() {
        this.githubProjects = []
        this.state = "pending"
        try {
            const projects = await fetchGithubProjectsSomehow()
            const filteredProjects = somePreprocessing(projects)
            runInAction(() => {
                this.githubProjects = filteredProjects
                this.state = "done"
            })
        } catch (e) {
            runInAction(() => {
                this.state = "error"
            })
        }
    }
}
```


# 或者 flow

MobX 提供了一个名为 `flow` 的[生成器](https://marketing.csdn.net/p/3127db09a98e0723b83b2914d9256174?pId=2782\&utm_source=glcblog\&spm=1001.2101.3001.7020 "生成器")函数,可以帮助我们更好地管理异步操作。`flow` 可以让我们**编写同步风格的异步代码,同时仍能享受 MobX 的自动依赖追踪和状态更新机制。**

```typescript 
import { flow, makeAutoObservable, flowResult } from "mobx"

class Store {
    githubProjects = []
    state = "pending"

    constructor() {
        makeAutoObservable(this, {
            fetchProjects: flow
        })
    }

    // 注意星号, 这是一个 generator 函数!
    *fetchProjects() {
        this.githubProjects = []
        this.state = "pending"
        try {
            // Yield 代替 await.
            const projects = yield fetchGithubProjectsSomehow()
            const filteredProjects = somePreprocessing(projects)
            this.state = "done"
            this.githubProjects = filteredProjects
        } catch (error) {
            this.state = "error"
        }
    }
}

const store = new Store()
const projects = await flowResult(store.fetchProjects())
```
