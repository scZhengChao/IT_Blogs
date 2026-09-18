# useFormStatus

## 目录

- [参考](#参考)
  - [useFormStatus() ](#useFormStatus-)
    - [参数 ](#参数-)
    - [返回值 ](#返回值-)
    - [注意 ](#注意-)
- [用法 ](#用法-)
  - [在表单提交期间显示待定状态 ](#在表单提交期间显示待定状态-)
  - [陷阱](#陷阱)
    - [useFormStatus 不会返回在同一组件中渲染的 \<form> 的状态信息 ](#useFormStatus-不会返回在同一组件中渲染的-form-的状态信息-)
  - [查看正在提交的表单数据 ](#查看正在提交的表单数据-)
- [疑难解答 ](#疑难解答-)
  - [status.pending 从不为 true ](#statuspending-从不为-true-)

`useFormStatus` 是一个提供上次表单提交状态信息的 Hook。

```typescript 
const { pending, data, method, action } = useFormStatus();

```


- [参考](https://zh-hans.react.dev/reference/react-dom/hooks/useFormStatus#reference "参考")
  - [useFormStatus()](https://zh-hans.react.dev/reference/react-dom/hooks/useFormStatus#use-form-status "useFormStatus()")
- [用法](https://zh-hans.react.dev/reference/react-dom/hooks/useFormStatus#usage "用法")
  - [在表单提交期间显示待定状态](https://zh-hans.react.dev/reference/react-dom/hooks/useFormStatus#display-a-pending-state-during-form-submission "在表单提交期间显示待定状态")
  - [查看正在提交的表单数据](https://zh-hans.react.dev/reference/react-dom/hooks/useFormStatus#read-form-data-being-submitted "查看正在提交的表单数据")
- [疑难解答](https://zh-hans.react.dev/reference/react-dom/hooks/useFormStatus#troubleshooting "疑难解答")
  - [status.pending](https://zh-hans.react.dev/reference/react-dom/hooks/useFormStatus#pending-is-never-true "status.pending")[ 从不为 ](https://zh-hans.react.dev/reference/react-dom/hooks/useFormStatus#pending-is-never-true " 从不为 ")[true](https://zh-hans.react.dev/reference/react-dom/hooks/useFormStatus#pending-is-never-true "true")

***

## 参考

### `useFormStatus()`&#x20;

`useFormStatus` Hook 提供了上次表单提交的状态信息。

```typescript 
import { useFormStatus } from "react-dom";
import action from './actions';

function Submit() {
  const status = useFormStatus();
  return <button disabled={status.pending}>提交</button>
}

export default function App() {
  return (
    <form action={action}>
      <Submit />
    </form>
  );
}

```


`Submit` 组件必须在 `<form>` 内部渲染以获取状态信息。该 Hook 返回诸如 `pending` 属性的信息，用于指示表单是否正在提交中。

在上面的示例中，`Submit` 利用此信息来在表单提交时禁用 `<button>` 按钮的按压操作。

#### 参数&#x20;

`useFormStatus` 不接收任何参数。

#### 返回值&#x20;

`useFormStatus` 返回一个包含以下属性的 `status` 对象：

- `pending`：布尔值。如果为 `true`，则表示父级 `<form>` 正在等待提交；否则为 `false`。
- `data`：实现了 [FormData interface](https://developer.mozilla.org/en-US/docs/Web/API/FormData "FormData interface") 的对象，包含父级 `<form>` 正在提交的数据；如果没有进行提交或没有父级 `<form>`，它将为 `null`。
- `method`：字符串，可以是 `'get'` 或 `'post'`。表示父级 `<form>` 使用 `GET` 或 `POST` [HTTP 方法](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods "HTTP 方法") 进行提交。默认情况下，`<form>` 将使用 `GET` 方法，并可以通过 [method](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#method "method") 属性指定。
- `action`：一个传递给父级 `<form>` 的 `action` 属性的函数引用。如果没有父级 `<form>`，则该属性为 `null`。如果在 `action` 属性上提供了 URI 值，或者未指定 `action` 属性，`status.action` 将为 `null`。

#### 注意&#x20;

- `useFormStatus` Hook **必须从**在 `<form>` 内渲染的组件中调用。
- `useFormStatus` **仅会返回父**级 `<form>` 的状态信息。它不会返回同一组件或子组件中渲染的任何 `<form>` 的状态信息。

## 用法&#x20;

### 在表单提交期间显示待定状态&#x20;

可以在 `<form>` 中渲染的子组件中调用 `useFormStatus` Hook，并读取返回的 `pending` 属性，以在表单提交期间显示待定状态。

下面的示例使用 `pending` 属性指示表单正在提交。

```typescript 
import { useFormStatus } from "react-dom";
import { submitForm } from "./actions.js";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "提交中……" : "提交"}
    </button>
  );
}

function Form({ action }) {
  return (
    <form action={action}>
      <Submit />
    </form>
  );
}

export default function App() {
  return <Form action={submitForm} />;
}

```


### 陷阱

##### `useFormStatus` 不会返回在**同一组件中**渲染的 `<form>` 的状态信息&#x20;

`useFormStatus` Hook\*\* 只会返回父级\*\* `<form>` 的状态信息，而不会返回在调用 Hook 的同一组件中渲染的任何 `<form>` 的状态信息，也不会返回子组件的状态信息。

```typescript 
function Form() {
  // 🚩 `pending` 永远不会为 true
  // useFormStatus 不会跟踪在此组件中渲染的表单
  const { pending } = useFormStatus();
  return <form action={submit}></form>;
}

```


正确的做法是从位于 `<form>` 内部的组件中调用 `useFormStatus`。

```typescript 
function Submit() {
  // ✅ `pending` 将从包裹 Submit 组件的表单派生
  const { pending } = useFormStatus(); 
  return <button disabled={pending}>...</button>;
}

function Form() {
  // <form> `useFormStatus` 将会追踪它
  return (
    <form action={submit}>
      <Submit />
    </form>
  );
}

```


### 查看正在提交的表单数据&#x20;

可以使用从 `useFormStatus` 返回的状态信息中的 `data` 属性**来显示用户正在提交的数据是什么。**

下面的示例中有一个表单，用户可以请求一个用户名。那么可以使用 `useFormStatus` 来显示一个临时状态消息，确认请求了什么用户名。

```typescript title="UsernameForm"
import {useState, useMemo, useRef} from 'react';
import {useFormStatus} from 'react-dom';

export default function UsernameForm() {
  const {pending, data} = useFormStatus();

  return (
    <div>
      <h3>请求用户名：</h3>
      <input type="text" name="username" disabled={pending}/>
      <button type="submit" disabled={pending}>
        提交  
      </button>
      <br />
      <p>{data ? `请求 ${data?.get("username")}...`: ''}</p>
    </div>
  );
}

```


```typescript title="app.js"
import UsernameForm from './UsernameForm';
import { submitForm } from "./actions.js";
import {useRef} from 'react';

export default function App() {
  const ref = useRef(null);
  return (
    <form ref={ref} action={async (formData) => {
      await submitForm(formData);
      ref.current.reset();
    }}>
      <UsernameForm />
    </form>
  );
}

```


## 疑难解答&#x20;

### `status.pending` 从不为 `true`&#x20;

`useFormStatus` 仅会返回父级 `<form>` 的状态信息。

如果调用 `useFormStatus` 的组件未嵌套在 `<form>` 中，`status.pending` 总是返回 `false`。请验证 `useFormStatus` 是否在 `<form>` 元素的子组件中调用。

`useFormStatus` 不会追踪同一组件中渲染的 `<form>` 的状态。参阅 [陷阱](https://zh-hans.react.dev/reference/react-dom/hooks/useFormStatus#useformstatus-will-not-return-status-information-for-a-form-rendered-in-the-same-component "陷阱") 以了解更多详细信息。
