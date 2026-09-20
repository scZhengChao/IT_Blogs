# 创建惰性 observables {🚀}

Usage:

- `onBecomeObserved(observable, property?, listener: () => void): (() => void)`
- `onBecomeUnobserved(observable, property?, listener: () => void): (() => void)`

`onBecomeObserved`和`onBecomeUnobserved`方法可以给现有的可观察对象附加惰性行为或副作用。它们是MobX可观察系统的钩子并且 当**可观察对象\_开始\_和\_停止\_被观察时，它们会得到通知。它们都返回一个用来取消\_listener\_的\_disposer\_函数。**

在下面的示例中，我们只在实际使用被观察值时才使用它们来执行网络获取。

```typescript 
export class City {
    location
    temperature
    interval

    constructor(location) {
        makeAutoObservable(this, {
            resume: false,
            suspend: false
        })
        this.location = location
        // 只有在实际使用温度时才开始获取数据!
        onBecomeObserved(this, "temperature", this.resume)
        onBecomeUnobserved(this, "temperature", this.suspend)
    }

    resume = () => {
        log(`Resuming ${this.location}`)
        this.interval = setInterval(() => this.fetchTemperature(), 5000)
    }

    suspend = () => {
        log(`Suspending ${this.location}`)
        this.temperature = undefined
        clearInterval(this.interval)
    }

    fetchTemperature = flow(function* () {
        // 获取数据的逻辑...
    })
}
```
