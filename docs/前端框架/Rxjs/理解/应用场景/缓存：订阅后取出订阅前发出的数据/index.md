# 缓存：订阅后取出订阅前发出的数据

## 目录

- [使用rxjs前：手动缓存数据，额外的变量](#使用rxjs前手动缓存数据额外的变量)
- [使用rxjs后：直接从流取出缓存](#使用rxjs后直接从流取出缓存)

开发经常遇到发出事件发出早于订阅，结果订阅者错过了这条事件，`rxjs`的 `ReplaySubject`、`BehaviorSubject` 都很适合解决这一类问题，一订阅就可以取出数据流中的前几次数据。另外，操作符 `shareReplay` 也可以将普通的 `obserable` 流转成可缓存的 `obserable` 流。

### 使用rxjs前：手动缓存数据，额外的变量

如果不使用 `RxJS`，而是手动来实现类似功能，需要额外的**一个数据结构（例如数组、队列等）来缓存数据，和额外的逻辑来同步数据**，增加了代码复杂度。

这里就不举例子了。

### 使用rxjs后：直接从流取出缓存

`ReplaySubject` 是 `RxJS` 中的一种 `Subject`，它可以缓存并向新的订阅者回放以前发出的值，每次订阅的时候再拿出来。它特别适用于需要缓存之前的数据，并希望确保新订阅者在订阅时可以接收到它们的场景。

Rxjs 弹珠图如下：subscriber1在ReplaySubject发出值前订阅，subscriber2在ReplaySubject发出值后订阅，二者都能拿到ReplaySubject最近发出的值。

![](./assets/image/image_CsQ-n4Ykr5.png)

以下是一个使用 ReplaySubject 的例子：

模拟股市价格更新的场景，新订阅者需要获取最近三次的价格更新。

```typescript 
import { ReplaySubject } from 'rxjs';

class StockPriceNotifier {
  constructor(bufferSize = 3) {
    this.priceSubject$ = new ReplaySubject(bufferSize);
  }

  // 更新股票价格，存入缓存，并通知所有订阅者
  updatePrice(newPrice) {
    this.priceSubject$.next(newPrice);
  }

  // 添加新的订阅者，并将缓存的数据发送给他们
  subscribe(subscriber) {
    const subscription = this.priceSubject$.subscribe(subscriber);
    return subscription;
  }
}

// 使用示例
const notifier = new StockPriceNotifier();

// 模拟股市价格更新
notifier.updatePrice(100);
notifier.updatePrice(101);
notifier.updatePrice(102);
notifier.updatePrice(103);

// 第一个订阅者，应该会收到最近的3个价格
const subscriber1 = price => console.log(`订阅者1 价格: ${price}`)
notifier.subscribe(subscriber1);

// 新的一次价格更新
notifier.updatePrice(104);

// 第二个订阅者，应该收到最近的3个价格 (102, 103, 104)
const subscriber2 = price => console.log(`订阅者2 价格: ${price}`)
notifier.subscribe(subscriber2);

// 再次更新价格
notifier.updatePrice(105);

// 现在第一个和第二个订阅者都会收到最新的价格更新

```
