# 转换

## 目录

- [状态机.transition方法](#状态机transition方法)

[ 转换 Transitions | XState 文档 XState 文档：现代 Web 的状态机和状态图 https://xstate.js.org/docs/zh/guides/transitions.html#api](https://xstate.js.org/docs/zh/guides/transitions.html#api " 转换 Transitions | XState 文档 XState 文档：现代 Web 的状态机和状态图 https://xstate.js.org/docs/zh/guides/transitions.html#api")

```typescript 
import { createMachine, interpret } from 'xstate';
const lightMachine = createMachine({
    initial:'red',
    states: {
        red: {
            on:{
                click:'green',
            }
        },
        green: {
            on:{
                press:'yellow',
            }
        },
        yellow: {
            on:{
                keyup:'red',
            }
        },
    },
});
//获取初试状态
const  state0 = lightMachine.initialState; 
console.log(state0);
// 通过transition函数切换状态，第一个参数为原状态，第二个参数为自定义操作
 const state1 = lightMachine.transition(state0, 'click');
console.log(state1);
const state2 = lightMachine.transition(state1, 'press');
console.log(state2);
const state3 = lightMachine.transition(state2, 'keyup');
console.log(state3);



```


- 通过`createMachine`函数可以创建一个状态机，并将其赋值给`lightMachine`；
- `lightMachine`持有状态机实例，有很多属性和方法；
  - `lightMachine.initialState`可以获取初始化状态；
  - \*\*`lightMachine.transition(arg1, arg2)`\*\***可以手动切换状态，入参为原状态和状态对应的操作**，返回值为新状态；
    - 原状态 + 对应的操作 => 新状态；
    - 如果原状态和对应的操作不匹配，不报错但切换不生效，返回值仍为原状态；
- 通过initialState或者或者transition返回值持有的状态实例也有很多属性方法
  - state.value 可以获取状态的value；
  - state.matches(arg)**可以检查状态值**，入参为状态的value，匹配则返回true，否则为false，可以用于判断当前状态，等于state.value === arg；
  - state.nextEvents可以**列举状态的可触发操作**，比如red的click；

## 状态机`.transition`方法

如上所示，`machine.transition(...)`方法是一个纯函数，它接受两个参数：

- `state`- 要转换的[状态](https://xstate.js.org/docs/zh/guides/states.html "状态")
- `event`- 导致转换的[事件](https://xstate.js.org/docs/zh/guides/events.html "事件")

它返回一个新的[State](https://xstate.js.org/docs/zh/guides/states.html#state-definition "State")[实例](https://xstate.js.org/docs/zh/guides/states.html#state-definition "实例")，这是采用当前状态和事件，启用的所有转换的结果。
