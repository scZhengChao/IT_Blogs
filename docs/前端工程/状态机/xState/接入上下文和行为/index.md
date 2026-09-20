# 接入上下文和行为

```typescript 
import { createMachine, interpret, assign} from 'xstate'; 
const lightMachine = createMachine({ 
    id:'lightMachine', 
    initial:'red', 
    context:{ 
        redCount: 0, 
        greenCount: 0, 
        yellowCount: 0, 
    }, 
    states: { 
        red: { 
            //退出action 
            exit: assign({ redCount: (ctx) => ctx.redCount + 1 }), 
            on:{ 
                click:'green', 
            } 
        }, 
        green: { 
            on:{ 
                press:{ 
                    target:'yellow', 
                    actions: assign({ greenCount: (ctx) => ctx.greenCount + 1 }),//单个action 
                }, 
            }, 
        }, 
        yellow: { 
            //进入action 
            entry: assign({ yellowCount: (ctx) => ctx.yellowCount + 1 }), 
            on:{ 
                keyup:{ 
                    target:'red', 
                    actions: ['countAction','doSomething'],//actions数组 
                }, 
            } 
        }, 
    }, 
},{ 
    actions:{ 
        countAction: assign({ count: (ctx) => ctx.greenCount + ctx.redCount + ctx.yellowCount}), 
        doSomething: () => console.log("为所欲为"), 
    } 
}); 
 
 
//包装服务 
const service  = interpret(lightMachine); 
//启动服务 
service.start(); 
//获取当前上下文数据 
console.log('service.state.context',service.state.value,service.state.context) 
service.send('click'); 
console.log('service.state.context',service.state.value,service.state.context) 
service.send('press'); 
console.log('service.state.context',service.state.value,service.state.context) 
service.send('keyup'); 
console.log('service.state.context',service.state.value,service.state.context) 
service.stop(); 

```


![](./assets/image/image_fwFeJe0p6w.png)

- context是状态机声明的，与states同级，因此所有状态共享，context更接近Redux的store；
- XState的行为实际就是Side Effect，可以最大限度的为XState赋能，Effect的类型较多，适用于不同的场景，具体使用可以参考官方文档，本文介绍Action的用法，Activities类似，Promise等则有自己的规则；
  - 没有返回数据的Effect[点击跳转](https://link.juejin.cn/?target=https://xstate.js.org/docs/guides/actions.html#declarative-actions "点击跳转")
    - Actions 单次执行的，最常用
    - Activities 连续执行的，可将setInterval封装其内
  - 有返回数据的Effect[点击跳转](https://link.juejin.cn/?target=https://xstate.js.org/docs/guides/communication.html#the-invoke-property "点击跳转")
    - Invoked Promises
    - Invoked Callbacks
    - Invoked Observables
    - invoked Machines
- Action通过在state中新增actions来添加
  - 对比可以发现，之前的state为缩略写法；
  - **actions的执行时机是状态转换之后，****可以直接在****actions后面写函数，也可以通过配置的方式传入actions字符串或者数组来执行**
  - 有两个特殊的action，与一般的action区别在于触发的时机不同
    - entry：在进入状态时候触发
    - exit：在离开状态时候触发
  - action本身就是一个function，接收三個参数分別是context, **event 以及 actionMeta，context 就是当前machine的context，event 则是触发当前状态切换的事件**，actionMeta则存放当前的state 以及action。
- 上面代码出现率很高的还有assign函数，**用来修改context，用法与React的setState类似；**

```yaml 
green: { 
       on:{ 
           press:{ 
               target:'yellow', 
               actions: assign({ greenCount: (ctx) => ctx.greenCount + 1 }), 
                }, 
            }, 
        }, 

```


```yaml 
green: { 
        on:{ 
            press:'yellow', 
        } 
        }, 

```


[actions](./actions/index.md "actions")
