# 入门

> 可视化地址

[ XState Visualizer Visualizer for XState state machines and statecharts https://stately.ai/viz](https://stately.ai/viz " XState Visualizer Visualizer for XState state machines and statecharts https://stately.ai/viz")

我们将[状态机配置](https://xstate.js.org/docs/zh/guides/machines.html#configuration "状态机配置")传递到`createMachine`。我们需要提供：

- `id`- 去标识状态机
- `initial`- 指定这台状态机应该处于的初始状态节点
- `states`- 定义每个子状态：

```typescript 
import { createMachine } from 'xstate';

const promiseMachine = createMachine({
  id: 'promise',
  initial: 'pending',
  states: {
    pending: {},
    resolved: {},
    rejected: {}
  }
});

```


然后，我们需要向状态节点添加[**转换（transitions）**](https://xstate.js.org/docs/zh/guides/transitions.html "转换（transitions）")**。**

```javascript 
import { createMachine } from 'xstate';

const promiseMachine = createMachine({
  id: 'promise',
  initial: 'pending',
  states: {
    pending: {
      on: {
        RESOLVE: { target: 'resolved' },
        REJECT: { target: 'rejected' }
      }
    },
    resolved: {},
    rejected: {}
  }
});

```


我们还需要将`resolved`和`rejected`的状态节点标记为[最终状态节点](https://xstate.js.org/docs/zh/guides/final.html "最终状态节点")，因为 promise 状态机一旦达到这些状态就会终止运行：

```typescript 
import { createMachine } from 'xstate';

const promiseMachine = createMachine({
  id: 'promise',
  initial: 'pending',
  states: {
    pending: {
      on: {
        RESOLVE: { target: 'resolved' },
        REJECT: { target: 'rejected' }
      }
    },
    resolved: {
      type: 'final'
    },
    rejected: {
      type: 'final'
    }
  }
});

```
