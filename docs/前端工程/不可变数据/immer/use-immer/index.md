# use-immer

## 目录

- [更新状态中的对象](#更新状态中的对象)
- [更新状态中的数组](#更新状态中的数组)
- [使用 Immer 简化 reducers](#使用-Immer-简化-reducers)

## 更新状态中的对象

状态可以持有任何类型的 JavaScript 值，包括对象。但你不应该直接改变你在 React 状态中持有的对象和数组。相反，当你想更新一个对象和数组时，你需要创建一个**新的对象（或复制现有的对象），然后用这个副本来更新状态。**

通常情况下，你会使用 `...` 展开语法来复制你想改变的对象和数组。例如，更新一个嵌套对象可以是这样的：

```react tsx 
const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    setPerson({
      ...person,
      name: e.target.value
    });
  }

  function handleTitleChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        title: e.target.value
      }
    });
  }

  function handleCityChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        city: e.target.value
      }
    });
  }

  function handleImageChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        image: e.target.value
      }
    });
  }

```


如果在**代码中复制对象感觉乏味**，可以使用 [Immer](https://github.com/immerjs/use-immer "Immer") 之类的库来减少重复代码：

```react tsx 
const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    updatePerson(draft => {
      draft.name = e.target.value;
    });
  }

  function handleTitleChange(e) {
    updatePerson(draft => {
      draft.artwork.title = e.target.value;
    });
  }

  function handleCityChange(e) {
    updatePerson(draft => {
      draft.artwork.city = e.target.value;
    });
  }

  function handleImageChange(e) {
    updatePerson(draft => {
      draft.artwork.image = e.target.value;
    });
  }
```


## 更新状态中的数组

数组是另一种可以存在状态中的可变 JavaScript 对象，应将**其视为只读**。就像对象一样，当你想更新存在状态中的数组时，你需**要创建一个新数组（或者复制现有数组）**，然后用新数组来更新状态。

```react tsx 
let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

const [list, setList] = useState(
    initialList
  );

  function handleToggle(artworkId, nextSeen) {
    setList(list.map(artwork => {
      if (artwork.id === artworkId) {
        return { ...artwork, seen: nextSeen };
      } else {
        return artwork;
      }
    }));
  }

```


如果在代码中复制数组感觉乏味，可以使用 [Immer](https://github.com/immerjs/use-immer "Immer") 之类的库来减少重复代码：

```react tsx 
import { useState } from 'react';
import { useImmer } from 'use-immer';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

 const [list, updateList] = useImmer(initialList);

  function handleToggle(artworkId, nextSeen) {
    updateList(draft => {
      const artwork = draft.find(a =>
        a.id === artworkId
      );
      artwork.seen = nextSeen;
    });
  }

```


# 使用 Immer 简化 reducers

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

[源码](./源码/index.md "源码")
