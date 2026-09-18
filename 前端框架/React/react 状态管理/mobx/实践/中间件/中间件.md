# 中间件

```typescript 
import { observable, configure } from 'mobx';

// 定义一个日志中间件
const logger = store => {
  let prevState = store.getState();

  return next => {
    return action => {
      console.log('prev state', prevState);
      const nextState = next(action);
      console.log('next state', store.getState());
      prevState = store.getState();
      return nextState;
    };
  };
};

// 应用中间件
configure({
  enforceActions: 'observed',
  middleware: [logger]
});

const counterStore = observable({
  count: 0,
  increment() {
    this.count++;
  },
  decrement() {
    this.count--;
  }
});

counterStore.increment();
// 控制台输出:
// prev state { count: 0 }
// next state { count: 1 }

```
