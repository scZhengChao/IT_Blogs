# p-limit/

## 目录

- [使用案例](#使用案例)
  - [使用p-limit来限制一下并发数](#使用p-limit来限制一下并发数)
- [限制并发](#限制并发)
  - [并发](#并发)
  - [控制并发请求数-控制在并发数任务在pending的过程中，不再继续发送请求](#控制并发请求数-控制在并发数任务在pending的过程中不再继续发送请求)
- [源码](#源码)

# 使用案例

```javascript 
import delay from 'delay';
import timeSpan from 'time-span';
const end = timeSpan()
const fetchData = async () => {
    await delay(1000) // 延时1s
    return 10
}
const fetchData1 = async() => {
    await delay(2000) // 延时2s
    return 20
}
const fetchData2 = async () => {
    await delay(3000) // 延时3s
    return 30
}
const input = [
    fetchData(),
    fetchData1(),
    fetchData2()
];
const result = await Promise.all(input)
console.log(result); // [ 10, 20, 30 ]
console.log(end()) // 3011.592865 运行的毫秒数

```


## 使用p-limit来限制一下并发数

```javascript 
import pLimit from 'p-limit';
import delay from 'delay';
import timeSpan from 'time-span';
const limit = pLimit(1);
const end = timeSpan()

const input = [
  limit(() => fetchData()),
  limit(() => fetchData1()),
  limit(() => fetchData2())
];

const result = await Promise.all(input)
console.log(result); // [ 10, 20, 30 ]
console.log(end()) // 6012.97549 运行的毫秒数

```


# 限制并发

## 并发

&#x20;          代码的执行一般是按顺序执行的，所以同步任务是不存在并发的。但如果是异步任务的话，即使有先后顺序，它的执行的结果也是不受控制的。比如Promise.race()最终返回resolve的Promise是不确定的。

## 控制并发请求数-控制在并发数任务在pending的过程中，不再继续发送请求

# 源码

```javascript 
import Queue from 'yocto-queue';

export default function pLimit(concurrency) {
  if (!((Number.isInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY) && concurrency > 0)) {
    throw new TypeError('Expected `concurrency` to be a number from 1 and up');
  }

  const queue = new Queue();
  let activeCount = 0;

  const next = () => {
    activeCount--;

    if (queue.size > 0) {
      queue.dequeue()();
    }
  };

  const run = async (fn, resolve, args) => {
    activeCount++;

    const result = (async () => fn(...args))();

    resolve(result);

    try {
      await result;
    } catch {}

    next();
  };

  const enqueue = (fn, resolve, args) => {
    queue.enqueue(run.bind(undefined, fn, resolve, args));

    (async () => {
      // This function needs to wait until the next microtask before comparing
      // `activeCount` to `concurrency`, because `activeCount` is updated asynchronously
      // when the run function is dequeued and called. The comparison in the if-statement
      // needs to happen asynchronously as well to get an up-to-date value for `activeCount`.
      await Promise.resolve();

      if (activeCount < concurrency && queue.size > 0) {
        queue.dequeue()();
      }
    })();
  };

  const generator = (fn, ...args) => new Promise(resolve => {
    enqueue(fn, resolve, args);
  });

  Object.defineProperties(generator, {
    activeCount: {
      get: () => activeCount,
    },
    pendingCount: {
      get: () => queue.size,
    },
    clearQueue: {
      value: () => {
        queue.clear();
      },
    },
  });

  return generator;
}

```


·
