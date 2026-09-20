# 使用 Reducer 和 Context 拓展你的应用

## 目录

- [结合使用 reducer 和 context ](#结合使用-reducer-和-context-)
  - [第一步: 创建 context ](#第一步-创建-context-)
  - [第二步: 将 state 和 dispatch 函数 放入 context ](#第二步-将-state-和-dispatch-函数-放入-context-)
  - [Step 3: 在组件树中的任何地方使用 context ](#Step-3-在组件树中的任何地方使用-context-)
- [将相关逻辑迁移到一个文件当中 ](#将相关逻辑迁移到一个文件当中-)
  - [app.js](#appjs)
  - [taskContext.js](#taskContextjs)
  - [使用](#使用)
  - [注意](#注意)

Reducer 可以**整合组件的状态更新逻辑。**Context 可以将**信息深入传递给其他组件**。你可以组合使用它们来**共同管理一个复杂页面的状态**。

## 结合使用 reducer 和 context&#x20;

在 [reducer 介绍](https://react.docschina.org/learn/extracting-state-logic-into-a-reducer "reducer 介绍") 的例子里面，状态被 reducer 所管理。reducer 函数包含了所有的状态更新逻辑并在此文件的底部声明：

```react tsx 
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

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
      task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  return (
    <>
      <h1>Day off in Kyoto</h1>
      <AddTask
        onAddTask={handleAddTask}
      />
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
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];

```


Reducer 有助于保持事件处理程序的简短明了。但随着应用规模越来越庞大，你就可能会遇到别的困难。**目前，****`tasks`**** 状态和 ****`dispatch`**** 函数仅在顶级 ****`TaskApp`**** 组件中可用**。要让其他组件读取任务列表或更改它，你必须显式 [传递](https://react.docschina.org/learn/passing-props-to-a-component "传递") 当前状态和事件处理程序，将其作为 props。

例如，`TaskApp` 将 一系列 task 和事件处理程序传递给 `TaskList`：

```react tsx 
<TaskList
  tasks={tasks}
  onChangeTask={handleChangeTask}
  onDeleteTask={handleDeleteTask}
/>

```


这就是为什么，比起通过 props 传递它们，你可能想把 `tasks` 状态和 `dispatch` 函数都 [放入 context](https://react.docschina.org/learn/passing-data-deeply-with-context "放入 context")。**这样，所有的在 ****`TaskApp`**** 组件树之下的组件都不必一直往下传 props 而可以直接读取 tasks 和 dispatch 函数**。

下面将介绍如何结合使用 reducer 和 context：

1. **创建** context。
2. 将 state 和 dispatch **放入** context。
3. 在组件树的任何地方 **使用** context。

### 第一步: 创建 context&#x20;

`useReducer` 返回当前的 `tasks` 和 `dispatch` 函数来让你更新它们：

```react tsx 
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

```


为了将它们从组件树往下传，你将 [创建](https://react.docschina.org/learn/passing-data-deeply-with-context#step-2-use-the-context "创建") 两个不同的 context：

- `TasksContext` 提供当前的 tasks 列表。
- `TasksDispatchContext` 提供了一个函数可以让组件分发动作。

将它们从单独的文件导出，以便以后可以从其他文件导入它们：

```react tsx 
import { createContext } from 'react';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);
```


在这里，你把 `null` 作为默认值传递给两个 context。实际值是由 TaskApp 组件提供的。

### 第二步: 将 state 和 dispatch 函数 放入 context&#x20;

现在，你可以将所有的 context 导入 `TaskApp` 组件。获取 `useReducer()` 返回的 `tasks` 和 `dispatch` 并将它们 [提供](https://react.docschina.org/learn/passing-data-deeply-with-context#step-3-provide-the-context "提供") 给整个组件树：

```react tsx 
import { TasksContext, TasksDispatchContext } from './TasksContext.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  // ...
  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        ...
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

```


现在，你可以同时通过 props 和 context 传递信息：

```react tsx 
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import { TasksContext, TasksDispatchContext } from './TasksContext.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

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
      task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        <h1>Day off in Kyoto</h1>
        <AddTask
          onAddTask={handleAddTask}
        />
        <TaskList
          tasks={tasks}
          onChangeTask={handleChangeTask}
          onDeleteTask={handleDeleteTask}
        />
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];

```


在下一步中，你将删除通过 props 传递的代码。

### Step 3: 在组件树中的任何地方使用 context&#x20;

现在你不需要将 tasks 和事件处理程序在组件树中传递：

```react tsx 
<TasksContext.Provider value={tasks}>
  <TasksDispatchContext.Provider value={dispatch}>
    <h1>Day off in Kyoto</h1>
    <AddTask />
    <TaskList />
  </TasksDispatchContext.Provider>
</TasksContext.Provider>

```


相反，任何需要 tasks 的组件都可以从 `TaskContext` 中读取它：

```react tsx 
export default function TaskList() {
  const tasks = useContext(TasksContext);
  // ...

```


任何组件都可以从 context 中读取 `dispatch` 函数并调用它，从而更新任务列表：

```react tsx 
export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useContext(TasksDispatchContext);
  // ...
  return (
    // ...
    <button onClick={() => {
      setText('');
      dispatch({
        type: 'added',
        id: nextId++,
        text: text,
      });
    }}>Add</button>
    // ...

```


**state 仍然 “存在于” 顶层 Task 组件中，由 useReducer 进行管理**。不过，组件树里的组件只要导入这些 context 之后就可以获取 tasks 和 dispatch。

## 将相关逻辑迁移到一个文件当中&#x20;

这不是必须的，但你可以通过将 `reducer` 和 `context` 移动到单个文件中来进一步整理组件。目前，“TasksContext.js” 仅包含两个 context 声明：

#### app.js

```react tsx 

import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import { TasksProvider } from './TasksContext.js';

export default function TaskApp() {
  return (
    <TasksProvider>
      <h1>Day off in Kyoto</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  );
}


```


#### taskContext.js

```react tsx 
import { createContext, useReducer } from 'react';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];

```


#### 使用

addTask

```react tsx 
import { useState, useContext } from 'react';
import { TasksDispatchContext } from './TasksContext.js';

export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useContext(TasksDispatchContext);
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        dispatch({
          type: 'added',
          id: nextId++,
          text: text,
        }); 
      }}>Add</button>
    </>
  );
}

let nextId = 3;

```


TaskList.js

```react tsx 
import { useState, useContext } from 'react';
import { TasksContext, TasksDispatchContext } from './TasksContext.js';

export default function TaskList() {
  const tasks = useContext(TasksContext);
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useContext(TasksDispatchContext);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={e => {
            dispatch({
              type: 'changed',
              task: {
                ...task,
                text: e.target.value
              }
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={e => {
          dispatch({
            type: 'changed',
            task: {
              ...task,
              done: e.target.checked
            }
          });
        }}
      />
      {taskContent}
      <button onClick={() => {
        dispatch({
          type: 'deleted',
          id: task.id
        });
      }}>
        Delete
      </button>
    </label>
  );
}

```


你也可以从 `TasksContext.js` 中导出使用 context 的函数：

```react tsx 

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}
组件可以通过以下函数读取 context：
const tasks = useTasks();
const dispatch = useTasksDispatch();

```


这**不会改变任何行为**，但它会允许你之后**进一步分割这些 context 或向这些函数添加一些逻辑**。**现在所有的 context 和 reducer 连接部分都在 ****`TasksContext.js`**** 中。这保持了****组件的干净和整洁****，让我们专注于它们显示的内容，而不是它们从哪里获得数据：**

### 注意

像 `useTasks` 和 `useTasksDispatch` 这样的函数被称为 [**自定义 Hook**](https://react.docschina.org/learn/reusing-logic-with-custom-hooks "自定义 Hook")**。** 如果你的函数名以 `use` 开头，它就被认为是一个自定义 Hook。这让你可以使用其他 Hook，比如 `useContext`。
