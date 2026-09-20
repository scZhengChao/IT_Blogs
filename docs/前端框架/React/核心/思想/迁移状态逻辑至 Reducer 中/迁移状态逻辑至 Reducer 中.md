# 迁移状态逻辑至 Reducer 中

## 目录

- [第 1 步: 将设置状态的逻辑修改成 dispatch 的一个 action ](#第-1-步-将设置状态的逻辑修改成-dispatch-的一个-action-)
- [注意](#注意)
- [第 2 步: 编写一个 reducer 函数 ](#第-2-步-编写一个-reducer-函数-)
- [注意](#注意)
- [第 3 步: 在组件中使用 reducer ](#第-3-步-在组件中使用-reducer-)
- [对比 useState 和 useReducer ](#对比-useState-和-useReducer-)
- [编写一个好的 reducers ](#编写一个好的-reducers-)
- [使用 Immer 简化 reducers ](#使用-Immer-简化-reducers-)

Reducer 是处理状态的另一种方式。你可以通过三个步骤将 `useState` 迁移到 `useReducer`：

1. 将设置状态的逻辑 **修改** 成 dispatch 的一个 action；
2. **编写** 一个 reducer 函数；
3. 在你的组件中 **使用** reducer。

### 第 1 步: 将设置状态的逻辑修改成 dispatch 的一个 action&#x20;

你的事件处理程序目前是通过设置状态来 **实现逻辑的**：

```typescript 
function handleAddTask(text) {
  setTasks([
    ...tasks,
    {
      id: nextId++,
      text: text,
      done: false,
    },
  ]);
}

function handleChangeTask(task) {
  setTasks(
    tasks.map((t) => {
      if (t.id === task.id) {
        return task;
      } else {
        return t;
      }
    })
  );
}

function handleDeleteTask(taskId) {
  setTasks(tasks.filter((t) => t.id !== taskId));
}

```


移除所有的状态设置逻辑。只留下三个事件处理函数：

- `handleAddTask(text)` 在用户点击 “添加” 时被调用。
- `handleChangeTask(task)` 在用户切换任务或点击 “保存” 时被调用。
- `handleDeleteTask(taskId)` 在用户点击 “删除” 时被调用。

使用 reducers 管理状态与直接设置状态略有不同。**它不是通过设置状态来告诉 React “要做什么”**，而是通过事件处理程序\*\* dispatch 一个 “action” 来指明 “用户刚刚做了什么”**。（**而状态更新逻辑则保存在其他地方！**）因此，我们不再通过事件处理器直接 “设置 `task`”，而是 dispatch 一个 “添加/修改/删除任务” 的 action。这更加**符合用户的思维 \*\*。

```typescript 
function handleAddTask(text) {
  dispatch({
    type: 'added',
    id: nextId++,
    text: text,
  });
}

function handleChangeTask(task) {
  dispatch({
    type: 'changed',
    task: task,
  });
}

function handleDeleteTask(taskId) {
  dispatch({
    type: 'deleted',
    id: taskId,
  });
}

```


**你传递给 ****`dispatch`**** 的对象叫做 “action”：**

```typescript 
function handleDeleteTask(taskId) {
  dispatch(
    // "action" 对象：
    {
      type: 'deleted',
      id: taskId,
    }
  );
}

```


它是一个**普通的 JavaScript 对象**。它的结构是由你决定的，但通常来说，它应该至少包含可以表明 **发生了什么事情** 的信息。（在后面的步骤中，你将会学习如何添加一个 dispatch 函数。）

### 注意

action 对象可以有多种结构。

按照惯例，我们**通常会添加一个字符串类型的** `type` 字段来描述发生了什么，并通过其它字段传递额外的信息。`type` 是特定于组件的，在这个例子中 `added` 和 `addded_task` 都可以。选一个能描述清楚发生的事件的名字！

```typescript 
dispatch({
  // 针对特定的组件
  type: 'what_happened',
  // 其它字段放这里
});

```


### 第 2 步: 编写一个 reducer 函数&#x20;

reducer 函数就是你放置状态逻辑的地方。它接受两个参数，**分别为当前 state 和 action 对象，并且返回的是更新后的 state：**

```typescript 
function yourReducer(state, action) {
  // 给 React 返回更新后的状态
}

```


**React 会将状态设置为你从 reducer 返回的状态。**

```typescript 
function tasksReducer(tasks, action) {
  if (action.type === 'added') {
    return [
      ...tasks,
      {
        id: action.id,
        text: action.text,
        done: false,
      },
    ];
  } else if (action.type === 'changed') {
    return tasks.map((t) => {
      if (t.id === action.task.id) {
        return action.task;
      } else {
        return t;
      }
    });
  } else if (action.type === 'deleted') {
    return tasks.filter((t) => t.id !== action.id);
  } else {
    throw Error('未知 action: ' + action.type);
  }
}

```


由于 `reducer` 函数接受 `state`（tasks）作为参数，因此你可以 **在组件之外声明它**。这减少了代码的缩进级别，提升了代码的可读性。

### 注意

上面的代码使用了 `if/else` 语句，但是在 reducers 中使用` `[switch ](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/switch "switch ")[语句](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/switch "语句")\*\* 是一种惯例\*\*。**两种方式结果是相同的，** 但`switch` 语句读起来一目了然。

在本文档的后续部分我们会像这样使用：

```typescript 
function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('未知 action: ' + action.type);
    }
  }
}

```


**我们建议将每个 ****`case`**** 块包装到 ****`{`**** 和 ****`}`**** 花括号中，这样在不同 ****`case`**** 中声明的变量就不会互相冲突。**

### 第 3 步: 在组件中使用 reducer&#x20;

最后，你需要将 `tasksReducer` 导入到组件中。记得先从 React 中导入 `useReducer` Hook：

```typescript 
import { useReducer } from 'react';

const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);


```


useReducer 和 useState 很相似——**你必须给它传递一个初始状态**，它会**返回一个有状态的值和**一个**设置该状态的函数**（在这个例子中就是 dispatch 函数）。但是，它们两个之间还是有点差异的。

`useReducer` 钩子接受 2 个参数：

1. 一个 reducer 函数
2. 一个初始的 state

它返回如下内容：

1. 一个有状态的值
2. 一个 dispatch 函数（用来 “派发” 用户操作给 reducer）

现在一切都准备就绪了！我们在这里把 reducer 定义在了组件的末尾：

```typescript 
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <>
      <h1>布拉格的行程安排</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('未知 action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: '参观卡夫卡博物馆', done: true},
  {id: 1, text: '看木偶戏', done: false},
  {id: 2, text: '打卡列侬墙', done: false}
];

```


如果有需要，你**甚至可以把 reducer 移到一个单独的文件中**：

当像这样分离关注点时，我们可以**更容易地理解组件逻辑**。现在，事件处理程序只通过派发 `action` 来指定 **发生了什么**，而 `reducer` 函数通过响应 `actions` 来决定 **状态如何更新**。

## 对比 `useState` 和 `useReducer`&#x20;

Reducers 并非没有缺点！以下是比较它们的几种方法：

- **代码体积：** 通常，在使用 `useState` 时，一开始只需要编写少量代码。而 `useReducer` 必须提前编写 reducer 函数和需要调度的 actions。但是，当多个事件处理程序以相似的方式修改 state 时，`useReducer` 可以减少代码量。
- **可读性：** 当状态更新逻辑足够简单时，`useState` 的可读性还行。但是，一旦逻辑变得复杂起来，它们会使组件变得臃肿且难以阅读。在这种情况下，`useReducer` 允许你将状态更新逻辑与事件处理程序分离开来。
- **可调试性：** 当使用 `useState` 出现问题时, 你很难发现具体原因以及为什么。 而使用 `useReducer` 时， 你可以在 reducer 函数中通过打印日志的方式来观察每个状态的更新，以及为什么要更新（来自哪个 `action`）。 如果所有 `action` 都没问题，你就知道问题出在了 reducer 本身的逻辑中。 然而，与使用 `useState` 相比，你必须单步执行更多的代码。
- **可测试性：** reducer 是一个不依赖于组件的纯函数。这就意味着你可以单独对它进行测试。一般来说，我们最好是在真实环境中测试组件，但对于复杂的状态更新逻辑，针对特定的初始状态和 `action`，断言 reducer 返回的特定状态会很有帮助。
- **个人偏好：** 并不是所有人都喜欢用 reducer，没关系，这是个人偏好问题。你可以随时在 `useState` 和 `useReducer` 之间切换，它们能做的事情是一样的！

## 编写一个好的 reducers&#x20;

编写 `reducers` 时最好牢记以下两点：

- **reducers ****必须是纯粹的。** 这一点和 [状态更新函数](https://react.docschina.org/learn/queueing-a-series-of-state-updates "状态更新函数") 是相似的，`reducers` **在是在渲染时运行的！（actions 会排队直到下一次渲染)。** 这就意味着 `reducers` [必须纯净](https://react.docschina.org/learn/keeping-components-pure "必须纯净")，即当输入相同时，输出也是相同的。它们不应该**包含异步请求、定时器或者任何副作用（对组件外部有影响的操作）**。它们应该\*\*以不可变值的方式去更新 **[**对象**](https://react.docschina.org/learn/updating-objects-in-state "对象")** 和 \*\*[**数组**](https://react.docschina.org/learn/updating-arrays-in-state "数组")。
- **每个 action 都描述了一个单一的用户交互，即使它会引发数据的多个变化。** 举个例子，如果用户在一个由 `reducer` 管理的表单（包含五个表单项）中点击了 `重置按钮`，那么 dispatch 一个 `reset_form` 的 action 比 dispatch 五个单独的 `set_field` 的 action 更加合理。如果你在一个 `reducer` 中打印了所有的 `action` 日志，那么这个日志应该是很清晰的，它能让你以某种步骤复现已发生的交互或响应。这对代码调试很有帮助！

## 使用 Immer 简化 reducers&#x20;

与在平常的 state 中\*\* **[**修改对象**](https://react.docschina.org/learn/updating-objects-in-state#write-concise-update-logic-with-immer "修改对象")** 和 **[**数组**](https://react.docschina.org/learn/updating-arrays-in-state#write-concise-update-logic-with-immer "数组")**一样 \*\*，你可以使用`Immer` 这个库来简化 `reducer`。在这里，[**useImmerReducer**](https://github.com/immerjs/use-immer#useimmerreducer "useImmerReducer")\*\* 让你可以通过 ****`push`**** 或 ****`arr[i] =`**** 来修改 state ：\*\*

```typescript 
import { useImmerReducer } from 'use-immer';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

function tasksReducer(draft, action) {
  switch (action.type) {
    case 'added': {
      draft.push({
        id: action.id,
        text: action.text,
        done: false,
      });
      break;
    }
    case 'changed': {
      const index = draft.findIndex((t) => t.id === action.task.id);
      draft[index] = action.task;
      break;
    }
    case 'deleted': {
      return draft.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('未知 action：' + action.type);
    }
  }
}

export default function TaskApp() {
   const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks);
 
  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <>
      <h1>布拉格的行程安排</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: '参观卡夫卡博物馆', done: true},
  {id: 1, text: '看木偶戏', done: false},
  {id: 2, text: '打卡列侬墙', done: false},
];
```


Reducers 应该**是纯净的**，所以它们**不应该去修改 state**。而 Immer 为你提供了一种特殊的 `draft` 对象，你可以通过它**安全的修改 state**。在底层，Immer 会基于当前 state 创建一个副本。这就是为什么通过 `useImmerReducer` 来管理 reducers 时，可以修改第一个参数，且不需要返回一个新的 state 的原因。
