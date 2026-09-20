# 运行我们的状态机

## 目录

- [运行我们的状态机](#运行我们的状态机)
  - [#在 Node/Vanilla JS](#在-NodeVanilla-JS)
  - [在 React](#在-React)

## 运行我们的状态机

我们如何运行我们的状态机，取决于我们计划在哪里使用它。

### [#](https://xstate.js.org/docs/zh/guides/start.html#在-node-vanilla-js "#")在 Node/Vanilla JS

为了[解释（interpret）](https://xstate.js.org/docs/zh/guides/interpretation.html "解释（interpret）")状态机并使其运行，我们需要添加一个解释器。这将创建一个服务：

```typescript 
import { createMachine, interpret } from 'xstate';

const promiseMachine = createMachine({
  /* ... */
});

const promiseService = interpret(promiseMachine).onTransition((state) =>
  console.log(state.value)
);

// 开启 service
promiseService.start();
// => 'pending'

promiseService.send({ type: 'RESOLVE' });
// => 'resolved'

```


### 在 React

如果我们想在 React 组件中使用我们的状态机，我们可以使用[useMachine](https://xstate.js.org/docs/zh/packages/xstate-react/#api "useMachine")Hook：

> 你需要安装`@xstate/react`

```typescript 
import { useMachine } from '@xstate/react';

const Component = () => {
  const [state, send] = useMachine(promiseMachine);

  return (
    <div>
      {/** 你可以监听 service 处于什么状态 */}
      {state.matches('pending') && <p>Loading...</p>}
      {state.matches('rejected') && <p>Promise Rejected</p>}
      {state.matches('resolved') && <p>Promise Resolved</p>}
      <div>
        {/** 你可以发送事件到运行的 service 中 */}
        <button onClick={() => send('RESOLVE')}>Resolve</button>
        <button onClick={() => send('REJECT')}>Reject</button>
      </div>
    </div>
  );
};

```
