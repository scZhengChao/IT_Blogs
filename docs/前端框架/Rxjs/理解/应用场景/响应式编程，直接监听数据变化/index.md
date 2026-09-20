# 响应式编程，直接监听数据变化

## 目录

- [响应式编程与事件驱动编程的关系](#响应式编程与事件驱动编程的关系)
- [对比命令式编程，能实现关注点分离](#对比命令式编程能实现关注点分离)
- [使用rxjs前：代码耦合、状态过多](#使用rxjs前代码耦合状态过多)
- [使用rxjs后：简化状态、单向数据流、关注点分离](#使用rxjs后简化状态单向数据流关注点分离)

### 响应式编程与事件驱动编程的关系

![](./assets/image/image_QgprAULAu7.png)

**`响应式编程`** 是基于\*\*`事件驱动编程`\*\*的方式来处理 **`数据流`**。

事件驱动编程中，被观察者（`observable`）发出的是事件（`event`）。在响应式编程中，被观察者（`observable`）发出的是数据（`data`）。

所以**二者发送数据的方式有点区别**，在事件驱动编程中，我们经常把数据作为事件的 `payload`，通过事件去传递数据，观察者监听到事件时，再从事件中取出数据。而在响应式编程中，数据是直接“响应”的，观察者直接监听到数据的变化，拿到最新的数据。所以响应式编程的响应数据的特性可以减少手动处理和更新数据的工作量。

### 对比命令式编程，能实现关注点分离

因为事件驱动编程能将不同的关注点分离开来，而响应式编程是基于事件驱动编程的，所以响应式编程自然也能实现关注点分离。

![](./assets/image/image_UCccQuk3sY.png)

### 使用rxjs前：代码耦合、状态过多

接下来让我们来设想一个简单的场景：假设我们有一个网页应用，用于输入和显示不同货币的转换结果。

这个应用包含以下几个模块：

1. 输入模块：用户输入一个金额和选择货币类型。

2. 转换模块：对输入的金额进行货币转换。

3. 显示模块：显示转换后的结果。

4. 日志模块：记录每次转换的历史记录。

用户在输入模块中输入金额并选择货币类型，转换模块会监听这个输入事件进行转换，显示模块会监听转化结果的事件来更新显示，日志模块会记录转换记录。然而，这些模块独立维护状态，并手动同步，导致状态管理复杂和数据流动混乱。

```typescript 
// 输入模块
class InputModule {
  constructor() {
    this.amount = 0;
    this.currencyType = 'USD';
    this.listeners = [];
  }

  onInputChange(callback) {
    this.listeners.push(callback);
  }

  updateAmount(newAmount) {
    this.amount = newAmount;
    this.notifyListeners();
  }

  updateCurrencyType(newCurrencyType) {
    this.currencyType = newCurrencyType;
    this.notifyListeners();
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback(this.amount, this.currencyType));
  }
}

// 转换模块
class ConversionModule {
  constructor(displayModule, loggingModule) {
    this.amount = 0;
    this.currencyType = 'USD';
    this.convertedAmount = 0;
    this.displayModule = displayModule;
    this.loggingModule = loggingModule;
  }

  onInputChange(amount, currencyType) {
    this.amount = amount;
    this.currencyType = currencyType;
    this.convert();
  }

  convert() {
    // 模拟转换逻辑
    this.convertedAmount = this.amount * (this.currencyType === 'USD' ? 0.85 : 1.15);
    this.updateDisplay();
       this.logConversion();
  }

  updateDisplay() {
    this.displayModule.update(this.convertedAmount);
  }

  logConversion() {
    this.loggingModule.log(this.amount, this.currencyType, this.convertedAmount);
  }
}

// 显示模块
class DisplayModule {
  constructor() {
    this.displayValue = 0;
  }

  update(value) {
    this.displayValue = value;
    console.log(`显示转换结果: ${this.displayValue}`);
  }
}

// 日志模块
class LoggingModule {
  log(amount, currencyType, convertedAmount) {
    console.log(`记录转换: ${amount} ${currencyType} 转换为 ${convertedAmount}`);
  }
}

// 实例化所有模块
const displayModule = new DisplayModule();
const loggingModule = new LoggingModule();
const conversionModule = new ConversionModule(displayModule, loggingModule);
const inputModule = new InputModule();

// 输入模块监听输入变化
inputModule.onInputChange((amount, currencyType) =>     
    conversionModule.onInputChange(amount, currencyType));

// 用户的交互
inputModule.updateAmount(100);
inputModule.updateCurrencyType('EUR');

```


尽管输入的数据来源是相同的，但每个模块都需要手动维护状态和同步状态，这么做会造成以下问题：

1. **复杂的状态管理**：每个模块需要维护和更新自己的状态，增加了代码的复杂性，容易出错。比如代码中 ConversionModule ，维护了5个状态。
2. **手动同步状态**：模块间需要手动传递和更新数据，容易导致数据不一致和同步错误。
3. **存在数据流动不单向的风险**：数据在模块之间相互传递，各自保存，难以跟踪数据的变化。
4. **关注点不分离**：在 ConversionModule 还要加入调用 DisplayModule、loggingModule 方法的代码，属于命令式编程，关注点不够分离。

### 使用rxjs后：简化状态、单向数据流、关注点分离

改造后的数据流动图：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47483d58533345f4bc361a84e4d68b38~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1654\&h=588\&s=59235\&e=png\&b=fdfdfd)

```typescript 
import { BehaviorSubject, combineLatest, withLatestFrom } from 'rxjs';
import { map } from 'rxjs/operators';

// 输入模块
class InputModule {
  constructor() {
    this.amount$ = new BehaviorSubject(0);
    this.currencyType$ = new BehaviorSubject('USD');
  }

  updateAmount(newAmount) {
    this.amount$.next(newAmount);
  }

  updateCurrencyType(newCurrencyType) {
    this.currencyType$.next(newCurrencyType);
  }
}

// 转换模块
class ConversionModule {
  constructor(inputModule) {
    this.convertedAmount$ = combineLatest([inputModule.amount$, inputModule.currencyType$]).pipe(
      map(([amount, currencyType]) => this.convert(amount, currencyType))
    );
  }

  convert(amount, currencyType) {
    // 模拟转换逻辑
    return amount * (currencyType === 'USD' ? 0.85 : 1.15);
  }
}

// 显示模块
class DisplayModule {
  constructor(conversionModule) {
    this.subscription = conversionModule.convertedAmount$.subscribe(value => this.update(value));
  }

  update(value) {
    console.log(`显示转换结果: ${value}`);
  }
}

// 日志模块
class LoggingModule {
  constructor(inputModule, conversionModule) {
    this.subscription = conversionModule.convertedAmount$.pipe(
      withLatestFrom(inputModule.amount$, inputModule.currencyType$)
    ).subscribe(([convertedAmount, amount, currencyType]) => this.log(amount, currencyType, convertedAmount));
  }

  log(amount, currencyType, convertedAmount) {
    console.log(`记录转换: ${amount} ${currencyType} 转换为 ${convertedAmount}`);
  }
}

// 实例化所有模块
const inputModule = new InputModule();
const conversionModule = new ConversionModule(inputModule);
const displayModule = new DisplayModule(conversionModule);
const loggingModule = new LoggingModule(inputModule, conversionModule);

// 用户交互
inputModule.updateAmount(100);
inputModule.updateCurrencyType('EUR');

```


对比使用rxjs前的优点：

- **单向数据流**：数据从输入模块流向转换模块，再流向显示和日志模块，确保了数据的单向流动。
- **简化的状态管理**：利用 RxJS 的可观察对象和运算符管理状态和数据流，减少了手动同步的复杂性。
- **实现关注点分离**：利用 RxJS 的响应式编程模型，使得各模块可以自动响应数据变化。每个模块都只关注自己的部分，它们不需要关注其他模块如何获取数据、如何处理数据。比如 InputModule 只负责获取用户的输入，当有新的输入时，它只需要将新的数据传递给 BehaviorSubject ，而不需要关注这个数据会被如何使用。ConversionModule 则只关注如何将输入的金额进行转换，它不需要关心这个金额是如何获取的，也不需要关心转换结果会如何显示和记录。这样，每个模块都只需要关注自己的任务，从而实现了关注点的分离。
