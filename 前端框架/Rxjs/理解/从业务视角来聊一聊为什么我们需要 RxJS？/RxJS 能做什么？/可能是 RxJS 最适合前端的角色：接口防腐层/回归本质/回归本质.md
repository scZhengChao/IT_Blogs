# 回归本质

得益于 RxJS 可以很好的统一同步、异步数据，统一 Promise、回调函数、WebSocket 与 Http 调用等，使得这些内容都能够按照统一的操作符、流程进行处理，正如如下图所示：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c70b96d04494a028c93c165dc1f497f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

> 图片来自 2021 DevFest 杭州：如何使用 RxJS 构建稳健的前端应用[www.zhihu.com/zvideo/1458…](https://link.juejin.cn?target=https://www.zhihu.com/zvideo/1458183228482318336%EF%BC%8C%E4%BE%B5%E6%9D%83%E5%88%A0%E3%80%82 "www.zhihu.com/zvideo/1458…")

那我们是不是可以很自然的想到，如果使用 `RxJS` 接管前端与外部应用状态交互这部分角色，或者说 `Service` 层，然后组件层面（`View`）只需要与 `Service` 层进行交互：

1. 确保自己需要对数据进行改变时，通知 `Service` 层进行处理
2. 当需要对数据进行渲染时，确保 `Service` 层给到合适的数据
   1. 无论外部应用状态如何获取、处理、合并、加工等，都由 Service 层去处理
   2. 无论外应用状态**如何变化，接口字段改变、调用方式改变、多版本共存**等，都由 Service 层去处理

让我们拿上面提到的那些问题现状来提个需求：

现在接口可能存在多个版本，然后在 `V2/V3` 时调用方式也发生了变化，之前 V2 调用需要两个接口，但是 V3 进行了重构，只需要一个接口即可以获取之前两个接口获取的内容。

```javascript 
import React, { useEffect, useState } from "react";

function MemoryUsagePercent() {
  const [percent, setPercent] = useState<number>(0);
  useEffect(() => {
    (async () => {
      const free = await fetch("/api/v2/memory/free");
      const freeData = await free.json();
      const usage = await fetch("/api/v2/memory/usage");
      const usageData = await usage.json();
      setPercent(+((usageData / (usageData + freeData)) * 100).toFixed(2));
    })();
  }, []);
  return <div>Usage Percent: {percent} %</div>;
}

export default MemoryUsagePercent;


```


如果调用方式改变之后，变成了如下这样：

```javascript 
import React, { useEffect, useState } from "react";

function MemoryUsagePercent() {
  const [percent, setPercent] = useState<number>(0);
  useEffect(() => {
    (async () => {
      const memory = await fetch("/api/v3/memory");
      const memoryData = await memory.json()
      const { usage, free } = memoryData;
      setPercent(+((usage / (usage + free)) * 100).toFixed(2));
    })();
  }, []);
  return <div>Usage Percent: {percent} %</div>;
}

export default MemoryUsagePercent;

```


可以看到如果调用方式改变之后，我们需要对代码进行大量的修改，而且原计算内存占用率的公式也需要随之调整，当然我们上述的逻辑还没有实现一些必要的逻辑：

1. 多版本共存，如果 V3 的接口不可用，我们需要 backup 到 V2 的接口
2. 如果 V2/V3 都不可用时，我们可能需要数据兜底，才能保证应用不会崩溃

我们现在来实现一下上述逻辑：

```javascript 
import React, { useEffect, useState } from "react";

function MemoryUsagePercent() {
  const [percent, setPercent] = useState<number>(0);
  useEffect(() => {
    (async () => {
      try {
          // 首先使用 V3 接口
          const memory = await fetch("/api/v3/memory");
          const memoryData = await memory.json()
          const { usage, free } = memoryData;
          setPercent(+((usage / (usage + free)) * 100).toFixed(2));
      } catch (err) {
        try {
         // 如果不可用，就使用 V2
          const free = await fetch("/api/v2/memory/free");
          const freeData = await free.json();
          const usage = await fetch("/api/v2/memory/usage");
          const usageData = await usage.json();
          setPercent(+((usageData / (usageData + freeData)) * 100).toFixed(2));
        } catch (err) {
          // 如果 V2/V3 都不可用，直接 backup 一个兜底数据
          setPercent(0.00)
        }
      }
    })();
  }, []);
  return <div>Usage Percent: {percent} %</div>;
}

export default MemoryUsagePercent;

```


可以看到上述逻辑再引入**了多版本共存、数据兜底之后，组件层变得异常复杂**，而且各种中间字段的含义实际上这个组件本来是无需去感知的，但是为了进行对应的数据处理以得到最后的效果，我们需要编写大量的 `try/catch` 、中间变量等，如果此组件自身的 UI/逻辑还比较复杂，那么接口逻辑与组件自身逻辑混杂在一起就会变得特别混乱，而且后续一旦有新的变化，那么这个组件可能会轻易就崩溃了。当然有的同学会说，我们可以通过自动化测试来保障质量，但是将组件与外部状态混杂在一起的自动化测试实施会比较困难。

如果引入 `Service` 层的概念之后，通过 `RxJS` 来作为实现，我们上述的例子可以修改成如下这样：

```javascript 
import React, { useEffect, useState } from "react";
import { lastValueFrom } from "rxjs";
import { getMemoryUsagePercent } from "./service";

function MemoryUsagePercent() {
  const [percent, setPercent] = useState<number>(0);
  useEffect(() => {
    (async () => {
      const result = await lastValueFrom(getMemoryUsagePercent());
      setPercent(result);
    })();
  }, []);
  return <div>Usage Percent: {percent} %</div>;
}

export default MemoryUsagePercent;

```


```javascript 
// service.ts
import {
  catchError,
  forkJoin,
  map,
  mergeMap,
  Observable,
  of,
  race,
} from "rxjs";
import { fromFetch } from "rxjs/fetch";

export function getMemoryLegacy(): Observable<{ free: number; usage: number }> {
  const legacyUsage = fromFetch("/api/v2/memory/usage").pipe(
    mergeMap((res) => res.json())
  );
  const legacyFree = fromFetch("/api/v2/memory/free").pipe(
    mergeMap((res) => res.json())
  );
  return forkJoin([legacyUsage, legacyFree], (usage, free) => ({
    free: free.data.free,
    usage: usage.data.usage,
  }));
}

export function getMemory(): Observable<{ free: number; usage: number }> {
  const current = fromFetch("/api/v3/memory").pipe(
    mergeMap((res) => res.json()),
    map((data) => data.data)
  );
  return current.pipe(
    catchError(() => getMemoryLegacy()),
    catchError(() => of({ usage: 0.0, free: 10.0 }))
  );
}

export function getMemoryUsagePercent(): Observable<number> {
  return getMemory().pipe(
    map(({ usage, free }) => +((usage / (usage + free)) * 100).toFixed(2) || 0)
  );
}

```


可以看到我们的 `View` 层和接口有关的逻辑变成了短短的一行具有语义化的函数调用，主要是通过 `RxJS` 的 `lastValueFrom` `Operators` 来获取最近的一次结果（注意这里需要最近的一次结果，原因是 `getMemoryUsagePercent` 是一个 Stream，所以直接 `subscribe` **的话会依次从 ****`Stream`**** 的起点开始逐步返回数据**），这样 `View` 层就只无需关注所需的数据是怎么来的，只需要关心拿到自己需要的数据进行渲染即可。

而对应的我们抽出了对应的 Service 层代码，在 Service 层里面我们使用 RxJS 来进行逻辑实现，可以看到我们做了如下几件事：

1. 声明了 `getMemoryLegacy` 与 `getMemory` 两个方法，一个是 V2 版本的获取方式，一个是 V3 版本的获取方式，V3 将之前需要两个接口合并成了一个接口
2. 在 `getMemoryLegacy` 中我们使用 `forkJoin` 将两个接口的返回结果合并并返回，`getMemory` 则是首先声明一个获取 V3 接口的 Stream，然后通过 `race` 让 V3 与 V2 的结果进行 “**`赛跑`**”，那个先成功返回则使用哪个，如果两个都失败了，那么提供一个兜底数据 `{ usage: 0, free: 0 }`
3. 最后 `getMemoryUsagePercent` 则是拿最后的结果进行计算，然后给到 View 层去使用

可以看到我们在 Service 层**做了大量的合并、静态、兜底，并且处理了多版本共存等**问题，其中数据兜底其实相当于**我们前端直接实现了数据的 Mock，而无需一些 Mock 服务器的搭建**，后面无论接口如何变化，无论是返回字段、调用方式、多版本共存，还是各种处理网络状况等情况，我们**都可以在 Service 层（防腐层）去进行修改、适应，通过 RxJS 将这些内容简洁、有机的串联在一起的同时，保证了 View 层干净漂亮！**

> 较为理想的情况下，如果前端应用极其复杂，可以派出一人专注于维护 Service 层，以及与服务端、各种 Platform API 打交道，专注于对这些接口进行合理的设计、转换、合并、Mock 等（前端层面的 BFF），然后让这个人充当其他前端同学与接口之间的中间人，减少多人参与带来的重复性劳动与规范不一致性。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/632d57cb20e94686ba8316e6fe2d27c3~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)
