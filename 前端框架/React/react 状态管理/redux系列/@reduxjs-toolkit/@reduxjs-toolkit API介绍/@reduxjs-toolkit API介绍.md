# @reduxjs/toolkit API介绍

## 目录

- [createSlice](#createSlice)
- [createAction](#createAction)
- [createReducer](#createReducer)
- [configureStore](#configureStore)

### `createSlice`

`createSlice`用于创建包含切片初始状态、切片`reducers`和 切片`actions`的对象，**它简化了**\*\*`reducer`\*\***函数的编写过程**。

```javascript 
// 创建切片
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    // 切片的名称，用于生成唯一的 action 类型
    name: 'counter',
    // 初始状态对象
    initialState: {
        value: 0,
    },
    // reducers对象包含多个 reducer 函数，每个 reducer 函数定义了如何根据特定的 action 更新状态
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
});
// counterSlice.actions 是一个对象，包含所有由 createSlice 自动生成的一个返回 action 对象的函数
// 通过解构，具名导出reducers对象中的reducer 函数
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
// counterSlice.reducer 是由 createSlice 自动生成的 reducer 函数。
// 将这个 reducer 导出，以便在创建 Redux store 时使用。
export default counterSlice.reducer;

```


### `createAction`

`createAction`用于创建一个返回`action`对象的函数，这个`action`对象包含一个`type`属性和`pa``yload`属性。将创建`action`对象的逻辑封装在一个函数中，这样\*\*避免在多个地方手动创建相同的`action`\*\***对象**，通过函数名明确表示要派发的`action`类型，使代码更具可读性

手动创建`action`对象

```typescript 
// 手动创建 action 对象
const action = {
  type: ADD_TODO,
  payload: {
    text: 'Buy milk',
    completed: false,
  },
};

// 派发 action
store.dispatch(action);

```


`createAction`接受两个参数：

- `type`: 字符串，表示`action`的类型。在下面这个例子中，类型是`todos/add`。
- `prepare`: 可选的准备函数，用于准备`action`对象 的`payload`属性。**这个函数接受一个参数，并返回一个对象**，该对象必须包含`payload`属性。

返回的`action`对象：`createAction`返回的这个函数会生成一个标准的 Redux action 对象。这个对象包含两个属性：

- `type`: 由`createAction`的第一个参数指定。
- `payload`: 由`prepare`函数返回的对象中的`payload`属性决定

```javascript 
// 定义返回action对象的函数
import { createAction } from '@reduxjs/toolkit';
// 由 createAction 返回的创建action对象的函数
const addTodo = createAction('todos/add', (text) => ({
  payload: {
    text,
    completed: false,
  },
}));
// 调用返回action对象的函数，并传入一个字符串作为参数。
const todoAdded = addTodo('Buy milk');
// todoAdded是调用 addTodo 函数后返回的 action 对象
console.log(todoAdded); // { type: 'todos/add', payload: { text: 'Buy milk', completed: false } 
// 派发 action
store.dispatch(action);
}

```


### `createReducer`

`createReducer`用于创建一个`reducer`函数，可以更方便地处理多个`action`类型

`reducer`**函数是一个纯函数，用于根据当前的状态和接收到的**\*\*`action`对象来计算新的状态。它是 Redux 应用的核心部\*\*分，负责管理应用的状态变化。

注意点：

1. 纯函数：`reducer`函数必须是纯函数，即它的输出仅依赖于输入参数，**并且没有副作用（如网络请求、直接修改外部变量等）**。
2. 参数：
   - `state`：当前的状态。通常在第一次调用时，`state`会使用默认值 定义的`initialState`作为初始状态。
   - `action`：一个包含 type 属性的对象，可能还包含其他属性（如 payload）。 &#x20;

     返回值：
3. `reducer`函数必须返回一个新的状态对象。

手动编写`reducer`函数

```javascript 
const initialState = {
    count: 0,
};

function counterReducer(state = initialState, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, count: state.count + 1 };
        case 'DECREMENT':
            return { ...state, count: state.count - 1 };
        default:
            return {...state };
    }
}

```


`createReducer(initialState, builder)`：接受两个参数

- `initialState`：reducer 的初始状态。
- `builder`：**一个函数，用于构建**\*\*`reducer`****。这个函数接收一个****`builder`****对象，通过调用****`builder`****的****`addCase`****方法来定义如何处理不同的****`action`。\*\*​

`builder.addCase(actionCreator, reducerFunction)`：`addCase`方法用于定义如何处理特定的`action`，接受两个参数

- `actionCreator`：**一个返回**\*\*`action`****对象的函数，用于生成特定类型的****`action`\*\***对象**。
- `reducerFunction`：**一个函数，用于更新状态。这个函数接收两个参数：**
  - `state`：当前的状态。
  - `action`：被 dispatch 的 action 对象

```javascript 
import { createReducer } from '@reduxjs/toolkit';
// 导入addTodo 和 toggleTodo，这两个函数用于生成特定类型的 action 对象
import { addTodo, toggleTodo } from './actions.js';
// initialState变量定义了reducer 的初始状态
const initialState = {
  todos: [],
};
// 创建 Reducer
const todoReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addTodo, (state, action) => {
      state.todos.push(action.payload);
    })
    .addCase(toggleTodo, (state, action) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    });
});

export default todoReducer;

```


在上面这个例子中，处理`addTodo action`是当`addTodo action`被`dispatch`时，`state.todos.push(action.payload)`会被执行，将新的`todo`添加到`todos`数组中。处理`toggleTodo action`是当`toggleTodo action`被`dispatch`时，`const todo = state.todos.find((t) => t.id === action.payload.id)`会查找匹配的`todo`元素。如果找到了匹配的`todo`元素，执行`todo.completed = !todo.completed`，切换该`todo`元素 的`completed`属性。

### `configureStore`

`configureStore`用于创建 Redux store仓库，**并自动配置常用的中间件（如 redux-thunk）。**

```typescript 
import { configureStore } from '@reduxjs/toolkit';
// 从 counter/counterSlice 文件中导入reducer，用于管理计数器的状态
import counterReducer from './counter/counterSlice';
// 从 user/userSlice 文件中导入 reducer，用于管理用户的状态
import userReducer from './user/userSlice';
// 创建 Store
const store = configureStore({
  // 配置对象中的 reducer 属性，它是一个对象，用于定义应用的状态树。
  // 每个键值对表示一个切片创建时定义的名称及其对应的管理切片的 reducer 函数。
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});
// 导出 Store
export default store;

```


在React应用中使用这个 store

```react jsx 
// main.jsx
import { createRoot } from 'react-dom/client' // 用于渲染页面的
import React from 'react' // 用于创建组件的
import { Provider } from 'react-redux'
import store from './store/index.js'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)

```


react-redux的`Provider`组件将 Redux store 传递给整个应用，使得应用中的所有组件都可以访问`store`。

[createAsyncThunk](createAsyncThunk.md "createAsyncThunk")

[createSelector](createSelector.md "createSelector")

[createEntityAdapter](createEntityAdapter.md "createEntityAdapter")

[总结](IT/前端框架/React/react%20状态管理/redux系列/@reduxjs-toolkit/@reduxjs-toolkit%20API介绍/总结/总结.md "总结")
