# 单播

## 目录

- [单播](#单播)

#### 单播

普通的`Observable` 是单播的，那么什么是单播呢？

单播的意思是，每个普通的 `Observables` 实例都只能被一个观察者订阅，当它被其他**观察者订阅的时候会产生一个新的实例**。也就是普通 `Observables` 被不同的观察者订阅的时候，会有多个实例，**不管观察者是从何时开始订阅，每个实例都是从头开始把值发给对应的观察者。**

```javascript 
const Rx = require('rxjs/Rx')

const source = Rx.Observable.interval(1000).take(3);

source.subscribe((value) => console.log('A ' + value))

setTimeout(() => {
    source.subscribe((value) => console.log('B ' + value))
}, 1000)

// A 0
// A 1
// B 0
// A 2
// B 1
// B 2

```
