# useActionState

## 目录

- [useActionState(action, initialState, permalink?) ](#useActionStateaction-initialState-permalink-)
  - [参数 ](#参数-)
  - [返回值 ](#返回值-)
- [用法 ](#用法-)
  - [使用某个表单动作返回的信息 ](#使用某个表单动作返回的信息-)
- [疑难解答 ](#疑难解答-)
  - [我的 action 无法再获取提交的 form data 了](#我的-action-无法再获取提交的-form-data-了)

`useActionState` 是一个可以根据某个表单动作的结果更新 state 的 Hook。

```javascript 
const [state, formAction, isPending] = useActionState(fn, initialState, permalink?);

```


### `useActionState(action, initialState, permalink?)`&#x20;

在组件的顶层调用 `useActionState` 即可创建一个随 [表单动作被调用](https://zh-hans.react.dev/reference/react-dom/components/form "表单动作被调用") 而更新的 state。在调用 `useActionState` 时在参数中传入现有的表单动作函数以及一个初始状态，无论 Action 是否在 pending 中，它都会返回一个新的 action 函数和一个 form state 以供在 form 中使用。这个新的 form state 也会作为参数传入提供的表单动作函数。

```typescript 
import { useActionState } from "react";

async function increment(previousState, formData) {
  return previousState + 1;
}

function StatefulForm({}) {
  const [state, formAction] = useActionState(increment, 0);
  return (
    <form>
      {state}
      <button formAction={formAction}>+1</button>
    </form>
  )
}
```


#### 参数&#x20;

- `fn`：当按钮被按下或者表单被提交时触发的函数。当函数被调用时，该函数会接收到表单的上一个 state（初始值为传入的 `initialState` 参数，否则为上一次执行完该函数的结果）作为函数的第一个参数，余下参数为普通表单动作接到的参数。
- `initialState`：state 的初始值。任何可序列化的值都可接收。当 action 被调用一次后该参数会被忽略。
- **可选的** `permalink`: A string containing the unique page URL that this form modifies. For use on pages with dynamic content (eg: feeds) in conjunction with progressive enhancement: if `fn` is a [server function](https://zh-hans.react.dev/reference/rsc/server-functions "server function") and the form is submitted before the JavaScript bundle loads, the browser will navigate to the specified permalink URL, rather than the current page’s URL. Ensure that the same form component is rendered on the destination page (including the same action `fn` and `permalink`) so that React knows how to pass the state through. Once the form has been hydrated, this parameter has no effect.

#### 返回值&#x20;

`useActionState` 返回一个包含以下值的数组：

1. 当前的 state。第一次渲染期间，该值为传入的 `initialState` 参数值。在 action 被调用后该值会变为 action 的返回值。
2. 一个新的 action 函数用于在你的 `form` 组件的 `action` 参数或表单中任意一个 `button` 组件的 `formAction` 参数中传递。
3. 一个 `isPending` 标识，用于表明是否有正在 pending 的 Transition

## 用法&#x20;

### 使用某个表单动作返回的信息&#x20;

在组件的顶层调用 `useActionState` 以获取上一次表单被提交时触发的 action 的返回值。

```typescript 
import { useActionState } from 'react';
import { action } from './actions.js';

function MyComponent() {
  const [state, formAction] = useActionState(action, null);
  // ...
  return (
    <form action={formAction}>
      {/* ... */}
    </form>
  );
}

```


`useActionState` 返回一个包含以下值的数组：

1. 该表单的 当前 state，初始值为提供的 初始 state，当表单被提交后则改为传入的 action 的返回值。
2. 传入 `<form>` 标签的 `action` 属性的 新 action。
3. 一个 pending state，可以在处理 action 的过程中使用它。

表单被提交后，传入的 action 函数会被执行。返回值将会作为该表单的新的 当前 state。

传入的 action 接受到的第一个参数将会变为该表单的 当前 state。**当表单第一次被提交时将会传入提供的 初始 state，之后都将传入上一次调用 action 函数的返回值**。余下参数与未使用 `useActionState` 前接受的参数别无二致[\[1\]](https://zh-hans.react.dev/reference/react/useActionState#note1 "\[1]")。

```javascript 
function action(currentState, formData) {
  // ...
  return 'next state';
}

```


## 疑难解答&#x20;

### 我的 action 无法再获取提交的 form data 了

当使用 `useActionState` 包裹 action 时，第一个参数变为了 form 的当前 state，提交的表单数据被顺移到了第二个参数中，与直接使用表单动作是不同的。

```javascript 
function action(currentState, formData) {
  // ...
}

```
