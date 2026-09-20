# 控制并发

## 目录

- [方法1 全部并发](#方法1-全部并发)
- [方法2 分批并发](#方法2-分批并发)
- [方法3 限制并发](#方法3-限制并发)

最后我们来看看RxJS，这其实是我最想说的方法，笔者深度使用RxJS多年，相信绝大部分人都不太了解RxJS，RxJS号称异步编程的lodash，对于这个问题，其代码实现会非常简单。

> RxJS 是一个用于处理异步数据流的 JavaScript 库，它通过**可观察对象**（Observable）来代表随时间推移发出值的数据流。你可以使用一系列操作符（如 `map`、`filter`、`merge` 等）来处理这些数据流，并通过**订阅**（subscribe）来观察并执行相关操作。RxJS 使得处理复杂的异步逻辑变得简单而优雅，特别适合于实现并发控制等场景。

上面是RxJS的简介，相信看完了还是不理解，RxJS其实是比较难学的，建议大家阅读其他扩展资料，这里让我们聚焦我们的问题。

下面先用RxJS改造我们的`get`函数，改造完如下所示，这需要用到`Observable`和`observer`，这些都是RxJS的概念，即便不知道其含义，看代码和Promise是比较相似的。

```javascript 
import { Observable } from 'RxJS';

function get(id) {
  return new Observable((observer) => {
    setTimeout(() => {
      observer.next({ id });
      observer.complete();
    }, Math.ceil(Math.random() * 5));
  });
}

```


下面我们参考Promise中的思路，依次看看在RxJS中如何实现。

##### 方法1 全部并发

在RxJS中和`Promise.all`类似的功能是`forkJoin`，这种方法最简单，代码如下所示，和`Promise.all`类似，这并不满足我们的需求。

```javascript 
import { forkJoin } from 'RxJS';

function gets(ids) {
  const observables = ids.map(get);
  return forkJoin(observables);
}

```


##### 方法2 分批并发

下面来看下如何实现分批并发，在Promise中我们使用递归+`Promise.all`来实现的。

在RxJS中，我们使用`concatMap`操作符来确保这些**组是依次处理的，而不是同时处理。在处理每个组时**，我们使用`forkJoin`来**并行处理组内的所有请求**。最后，我们使用`reduce`操作符来将**所有组的结果合并成一个一维数组。**

如果不理解RxJS，我们单纯看代码，可以看到RxJS代码的表现性更强，通过语义化的操作符串联，就完成了Promise中很多命令式的代码。

```javascript 
import { from, forkJoin } from 'RxJS';
import { concatMap, reduce } from 'RxJS/operators';

function gets(ids, max) {
  // 将ids按max分组
  const groups = [];
  for (let i = 0; i < ids.length; i += max) {
    groups.push(ids.slice(i, i + max));
  }

  // 使用concatMap控制组之间的串行执行，并在每一组内使用forkJoin实现并行请求
  // 使用reduce来收集和合并所有组的结果
  return from(groups).pipe(
    concatMap((group) => forkJoin(group.map(get))),
    reduce((acc, results) => acc.concat(results), [])
  );
}

```


##### 方法3 限制并发

最后我们来看看RxJS如何实现限制并发，在这个实现中，我们使用`mergeMap`来**控制并发**，并使用一个`Map`对象来存储每个请求的结果，其中键是ID，值是请求结果。这样，我们可以在所有请求完成后，按照原始ID数组的顺序从`Map`中提取结果。

示例代码如下，控制并发是RxJS支持的功能，实现就是一个参数，非常简单，对比前面的代码，可以看到RxJS的代码非常短小精悍，操作符的也非常容易读懂。

```javascript 
function gets(ids, max) {
  return from(ids).pipe(
    mergeMap((id) => get(id).pipe(
      map(result => ({ id, result }))
    ), max),
    reduce((acc, { id, result }) => acc.set(id, result), new Map()),
    map(resMap => ids.map(id => resMap.get(id)))
  );
}

```


[异步难题：前端并发控制全解析](../../../../前端专题/算法+设计模式（案例）/控制并发/异步难题：前端并发控制全解析/index.md "异步难题：前端并发控制全解析")
