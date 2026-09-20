# actions

## 目录

- [API](#API)
- [声明动作](#声明动作)
- [动作顺序](#动作顺序)
- [发送动作（send action）](#发送动作send-action)
  - [发送目标](#发送目标)

[ 动作 Actions | XState 文档 XState 文档：现代 Web 的状态机和状态图 https://xstate.js.org/docs/zh/guides/actions.html](https://xstate.js.org/docs/zh/guides/actions.html " 动作 Actions | XState 文档 XState 文档：现代 Web 的状态机和状态图 https://xstate.js.org/docs/zh/guides/actions.html")

动作，是即发即弃的[作用](https://xstate.js.org/docs/zh/guides/effects.html "作用")。 它们可以通过**三种方式声明**：

- `entry`动作，进入状态时执行
- `exit`动作，退出状态时执行
- 执行转换时，执行转换的动作

## API

可以像这样添加动作

```typescript 
const triggerMachine = createMachine(
  {
    id: 'trigger',
    initial: 'inactive',
    states: {
      inactive: {
        on: {
          TRIGGER: {
            target: 'active',
            // 转换 actions
            actions: ['activate', 'sendTelemetry']
          }
        }
      },
      active: {
        // 进入 actions
        entry: ['notifyActive', 'sendTelemetry'],
        // 退出 actions
        exit: ['notifyInactive', 'sendTelemetry'],
        on: {
          STOP: { target: 'inactive' }
        }
      }
    }
  },
  {
    actions: {
      // action 实现
      activate: (context, event) => {
        console.log('activating...');
      },
      notifyActive: (context, event) => {
        console.log('active!');
      },
      notifyInactive: (context, event) => {
        console.log('inactive!');
      },
      sendTelemetry: (context, event) => {
        console.log('time:', Date.now());
      }
    }
  }
);

```


> 提示
> 可以通过直接在状态机配置中指定\*\* 动作 函数来快速原型化 动作\*\* 实现：

```typescript 
// ...
TRIGGER: {
  target: 'active',
  actions: (context, event) => { console.log('activating...'); }
}
// ...
```


> 在状态机选项的`actions`属性中重构内联 动作 实现，可以更容易地调试、序列化、测试和准确地可视化 动作。

## 声明动作

从`machine.transition(...)`返回的`State`实例有一个`.actions`属性，它是一个供 解释（interpret） 执行的 动作 对象数组：

```javascript 
const activeState = triggerMachine.transition('inactive', { type: 'TRIGGER' });

console.log(activeState.actions);
// [
//   { type: 'activate', exec: ... },
//   { type: 'sendTelemetry', exec: ... },
//   { type: 'notifyActive', exec: ... },
//   { type: 'sendTelemetry', exec: ... }
// ]

```


每个 动作 对象都有两个属性（以及其他可以指定的属性）：

- `type`- 动作 类型
- `exec`- 动作 执行函数

`exec`函数有 3 个参数：

| 参数             | 类型           | 描述                   |
| -------------- | ------------ | -------------------- |
| \`context\`    | TContext     | 当前状态机的上下文            |
| \`event\`      | event object | 导致转换的事件              |
| \`actionMeta\` | meta object  | 包含有关 动作 的元数据的对象（见下文） |

`actionMeta`对象包括以下属性：

| 参数         | 类型            | 描述            |
| ---------- | ------------- | ------------- |
| \`action\` | action object | 原始 动作 对象      |
| \`state\`  | State         | 转换后的已解析的状态机状态 |

解释（interpret）将调用带有`currentState.context`、`event`和状态机转换到的`state`的`exec`函数。 你可以自定义此 动作。 阅读[执行 动作](https://xstate.js.org/docs/zh/guides/interpretation.html#executing-actions "执行 动作")了解更多详情。

## 动作顺序

在执行状态图时，动作的顺序不一定重要（也就是说，它们不应该相互依赖）。 但是，`state.actions`数组中的操作顺序是：

1. `exit`动作 - 退出状态节点的所有退出 动作，从原子状态节点开始
2. 转换`actions`- 在所选转换上定义的所有 动作
3. `entry`动作 - 进入状态节点的所有进入 动作，从父状态开始

> 警告
> 此处记录的所有 动作 创建者都返回 动作 对象； **它是一个纯函数，****它只返回一个 动作 对象****，并 ****不是 命令式的发送一个事件****。 不要命令式的调用 动作 创建者； 因为 他们什么都不会做！**

```javascript 
// 🚫 不要这样做！
entry: () => {
  // 🚫 这将什么也不做； send() 不是命令式函数！
  send({ type: 'SOME_EVENT' });
};

console.log(send({ type: 'SOME_EVENT' }));
// => { type: 'xstate.send', event: { type: 'SOME_EVENT' } }

// ✅ 这样替换
entry: send({ type: 'SOME_EVENT' });
```


## 发送动作（send action）

`send(event)`动作 创建者创建了一个**特殊的“发送” 动作** 对象，它告诉服务（即，[解释（interpret） 状态机](https://xstate.js.org/docs/zh/guides/interpretation.html "解释（interpret） 状态机")）将该事件发送给它自己。 它在外部事件队列中，将一个事件排入正在运行的服务中，这意味着该事件将在 解释（interpret） 的下一步“步骤”上发送。

| 参数           | 类型                                         | 描述                             |
| ------------ | ------------------------------------------ | ------------------------------ |
| \`event\`    | string or event object or event expression | 发送到指定\`options.to\`（或 self）的事件 |
| \`options?\` | send options (见下文)                         | 发送事件的选项。                       |

send`options`参数是一个包含以下内容的对象：

| 参数         | 类型     | 描述                          |
| ---------- | ------ | --------------------------- |
| \`id?\`    | string | send ID (用于取消)              |
| \`to?\`    | string | 事件的目标（默认为 self）             |
| \`delay?\` | number | 发送事件前的超时时间（毫秒），如果在超时前没有取消事件 |

注意

`send(...)`函数是一个**动作 创建者**；\*\* 它是一个纯函数，它只返回一个 动作 对象，并*****不会*****命令式地发送一个事件。\*\*

```typescript 
import { createMachine, send } from 'xstate';

const lazyStubbornMachine = createMachine({
  id: 'stubborn',
  initial: 'inactive',
  states: {
    inactive: {
      on: {
        TOGGLE: {
          target: 'active',
          // 再次向服务发送 TOGGLE 事件
          actions: send('TOGGLE')
        }
      }
    },
    active: {
      on: {
        TOGGLE: { target: 'inactive' }
      }
    }
  }
});

const nextState = lazyStubbornMachine.transition('inactive', {
  type: 'TOGGLE'
});

nextState.value;
// => 'active'
nextState.actions;
// => [{ type: 'xstate.send', event: { type: 'TOGGLE' }}]

// 该服务将继续向自己发送 { type: 'TOGGLE' } 事件。

```


传递给`send(event)`的`event`参数可以是：

- 一个字符串事**件，** 例如`send('TOGGLE')`
- **一个对象事件**，例如`send({ type: 'TOGGLE', payload: ... })`
- **一个事件表达式**，它是一个函数，它接收触发`send()`动作 的当前`context`和`event`，并返回一个事件对象：

```javascript 
import { send } from 'xstate';

// 人为的例子 - 从 `context` 读取并发送动态创建的事件
const sendName = send((context, event) => ({
  type: 'NAME',
  name: context.user.name
}));

const machine = createMachine({
  // ...
  on: {
    TOGGLE: {
      actions: sendName
    }
  }
  //...
});

```


### 发送目标

从`send(...)`动作 创建者发送的事件，可以表示它应该发送到特定目标，例如[调用 服务](https://xstate.js.org/docs/zh/guides/communication.html "调用 服务")或[创建 演员](https://xstate.js.org/docs/zh/guides/actors.html "创建 演员")。 这是通过在`send(...)`操作中指定`{ to: ... }`属性来完成的：

```javascript 
// ...
invoke: {
  id: 'some-service-id',
  src: 'someService',
  // ...
},
// ...
// 表示向调用的服务发送 { type: 'SOME_EVENT' }
actions: send({ type: 'SOME_EVENT' }, { to: 'some-service-id' })

```


`to`属性中的 target 也可以是一个**target 表达式**，它是一个函数，它接受当前触发动作的`context`和`event`，并返回一个字符串 target 或一个[演员](https://xstate.js.org/docs/zh/guides/actors.html#spawning-actors "演员"):

```typescript 
entry: assign({
  someActor: () => {
    return spawn(someMachine, 'some-actor-name');
  }
}),
  // ...

  // 发送 { type: 'SOME_EVENT' } 到 演员 引用
  {
    actions: send(
      { type: 'SOME_EVENT' },
      {
        to: (context) => context.someActor
      }
    )
  };

```


> 注意

同样，`send(...)`函数是一个 动作 创建者，**不会命令式发送事件。** 相反，它返回一个 动作 对象，描述事件将发送到的位置：
