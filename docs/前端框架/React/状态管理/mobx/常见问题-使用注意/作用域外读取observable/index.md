# 在 action 和 reaction 之外使用 observable的值 符合规范嘛

## 目录

- [可以在action和reaction之外使用的情形](#可以在action和reaction之外使用的情形)
- [不建议在action和reaction之外使用的情形](#不建议在action和reaction之外使用的情形)

在 MobX 框架里，在`action`和`reaction`之外使用可观察值（observable）是符合规范的，但这需要依据具体的使用场景来判断是否合适。以下是不同情况的分析：

### 可以在`action`和`reaction`之外使用的情形

- **读取可观察值**：在组件渲染或普通函数里**读取可观察值是完全可行**的。MobX 会自动追踪这些读取操作，并且在可观察值发生变化时更新相关的计算值与反应。 &#x20;

  示例代码如下：

```typescript 
import { makeObservable, observable } from 'mobx';

class Store {
    // 定义一个可观察的状态
    count = 0;

    constructor() {
        // 将count标记为可观察状态
        makeObservable(this, {
            count: observable
        });
    }
}

const store = new Store();

// 在action和reaction之外读取可观察值
function logCount() {
    console.log(store.count); 
}

logCount();
```


在这个例子中，`logCount`函数在`action`和`reaction`之外读取了可观察值`store.count`，这是符合规范的。

### 不建议在`action`和`reaction`之外使用的情形

- **修改可观察值**：在 MobX 里，建议在`action`中修改可观察值，因为`action`能够**批量处理状态变更，还可以避免不必要的重新计算与渲染**。要是在`action`之外修改可观察值，**可能会致使代码难以调试和维护**。 &#x20;

  下面是一个不规范的示例：

```javascript 
import { makeObservable, observable } from 'mobx';

class Store {
    // 定义一个可观察的状态
    count = 0;

    constructor() {
        // 将count标记为可观察状态
        makeObservable(this, {
            count: observable
        });
    }
}

const store = new Store();

// 不建议在action之外修改可观察值
store.count = 1; 
```


更规范的做法是使用`action`来修改可观察值：

```typescript 
import { makeObservable, observable, action } from 'mobx';

class Store {
    // 定义一个可观察的状态
    count = 0;

    constructor() {
        // 将count标记为可观察状态，increment标记为action
        makeObservable(this, {
            count: observable,
            increment: action
        });
    }

    // 定义一个action来修改可观察值
    increment() {
        this.count++;
    }
}

const store = new Store();
// 使用action来修改可观察值
store.increment(); 
```


总之，在`action`和`reaction`之外读取可观察值是符合规范的，不过修改可观察值时建议使用`action`。
