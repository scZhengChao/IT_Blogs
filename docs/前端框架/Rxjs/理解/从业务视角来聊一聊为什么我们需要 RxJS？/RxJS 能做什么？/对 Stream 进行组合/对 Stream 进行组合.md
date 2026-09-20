# 对 Stream 进行组合

我们了解了 `Stream` 其实也是一个数组，但是 `Stream` 还拥有一个 “时间” 维度的概念，即随着时间的增长，`Stream` 上会不断的增加元素，这么说你可能还没有什么体感，可能还会反问：“我数组不也可以随着时间增加元素吗🐴？”

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f50434d997244ab9b236d75b35d649c2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

最能体现 `RxJS` 中对 `Stream` 这个具有时间维度属性的方法就是 `merge` ，我们来看它的 Stream 图示：

![](image_qdrWq-hP1Q.png)

因为 `Stream` 具有时间的属性，所以上述两个 `Stream` 合并之后会变成最下面的 `Stream`，红色和蓝色的 1 会插入在中间，如果在数组里对两个数组进行 `merge` 只能是 `concat`：

```javascript 
let arr1 = [20, 40, 60, 80, 100]
let arr2 = [1, 1]

let arr3 = arr1.concat(arr2) // [20, 40, 60, 80, 100, 1, 1]
let arr4 = arr2.concat(arr1) // [1, 1, 20, 40, 60, 80, 100]

```


这就是时间属性在 Stream 上最明显的体现。

我们通过一个实际的例子来了解组合的强大力量：

> 给定一个需求，实现一个计数器，当点击 +/- 时能够正确的显示对应的数字

实现效果如下：

![](image_f7DCQKEga-.png)

我们用常规的代码实现如下：

```javascript 
import React, { useState } from "react";

export default function Merge() {
  const [count, setCount] = useState(0);

  const handlePlus = () => {
    setCount(count + 1);
  };

  const handleMinus = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <div className="count">{count}</div>
      <button className="plus-button" onClick={handlePlus}>
        +
      </button>
      <button className="minus-button" onClick={handleMinus}>
        -
      </button>
    </div>
  );
}

```


上述代码很好懂，是完全的命令式的实现，即我加 1 的时候就手动加 1，减 1 的时候就手动减 1，我告诉计算机如何做（how），然后得到我要的结果 （what）

然后我们切换成 RxJS 的形式：

```javascript 
import React, { useState, useEffect } from "react";
import { fromEvent, merge, mapTo, scan } from "rxjs";

export default function Merge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    merge(
      fromEvent(document.querySelector(".plus-button"), "click").pipe(mapTo(1)),
      fromEvent(document.querySelector(".minus-button"), "click").pipe(
        mapTo(-1)
      )
    )
      .pipe(scan((total, curr) => total + curr, 0))
      .subscribe((val) => {
        setCount(val);
      });
  }, []);

  return (
    <div>
      <div className="count">{count}</div>
      <button className="plus-button">+</button>
      <button className="minus-button">-</button>
    </div>
  );
}

```


实现的效果类似：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ea654c546c5b4e82a5ca85864a919af8~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

可以看到由以下几个部分组成：

- 将 `plus-button` 的点击事件转换成 Observable 可观察对象，每次点击就 `mapTo(1)` ，转为 1
- 将 `minus-button` 的点击事件转换成 Observable 可观察对象，每次点击就 `mapTo(-1)` ，转为 -1
- 将这两个 Stream 在时间维度上进行 merge，得到如下效果

![](image_yoPpHMzi1a.png)

即我前后点击 +1 与 -1，然后**按照时间维度进行 merge**，会变成最底部的形式，然后只需要执行最后一步，将所有的值加起来就是最终计数器的结果，这个时候用到 `scan` 这个聚合操作符，类似数组中的 `reduce`，执行聚合操作即可，然后将得到的值更新结果。

可以看到我们通过 `RxJS` `Stream` 的思想，通过在**时间维度上** `merge` 两个流，来实现**计数器的效果**，而我们在实现的过程中**完全遵循声明式**的写法，即你告诉计算机你要什么（what），然后计算机会自己推导出如何做（how），比如 `mapTo` 就是你告诉计算机每当一个点击事件发生时，我需要拿到数据 1，而 `scan` 则是告诉计算机我需要对数据进行聚合操作，然后计算机就会自动完成 merge 之后 Stream 的聚合操作。
