# 体验 Operators 带来的魔法

> RxJS 的 Operators 比较多，只需了解核心原理，然后剩下的查阅文档，或参考这个网站 [reactive.how/](https://link.juejin.cn?target=https://reactive.how/ "reactive.how/") 进行具体的学习即可。

先看一个兄弟团队那边的同学实现的一个搜索框的例子：

我们就可以认识到，认识与理解 `Observable` 与 `Stream` 的概念是第一步，当你能够做到心中有 `Stream`，那么再操起“ `Operators` 魔法，你就可以杀心自起！”

直接上一个类似搜索框的实际例子。

> 给定如下需求：让我们实现一个带 AutoComplete 的搜索框，类似上面的那个例子，每当用户输入一段内容，就展示对应内容的搜索结果。

我们先尝试用传统的 JS 过程式实现方式：

```javascript 
import React, { useState, useEffect } from "react";
import jsonp from "jsonp";

export default function OperatorsNormal() {
  const [items, setItems] = useState([]);

  const searchWikiPedia = (search) => {
    return new Promise((resolve, reject) => {
      return jsonp(
        `http://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=${search}&callback=JSON_CALLBACK`,
        null,
        (err, data) => {
          if (err) {
            console.log("err", err);
            reject(err);
          } else resolve(data);
        }
      );
    });
  };

  const debounce = (fn, delay) => {
    let timer;

    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  };

  const takeLatestRequest = (promiseCreator) => {
    let index = 0;
    return function () {
      index++;
      const promise = promiseCreator.apply(this, arguments);

      function guardLatest(func, reqIndex) {
        return function () {
          if (reqIndex === index) {
            func.apply(this, arguments);
          }
        };
      }

      return new Promise(function (resolve, reject) {
        promise.then(guardLatest(resolve, index), guardLatest(reject, index));
      });
    };
  };

  useEffect(() => {
    const inputSearch = document.querySelector(".search");
    const latestRequest = takeLatestRequest(searchWikiPedia);
    let lastInputValue = "";

    inputSearch.addEventListener(
      "input",
      debounce((e) => {
        if (!e.target.value) return;
        if (lastInputValue === e.target.value) return;
        else lastInputValue = e.target.value;

        latestRequest(e.target.value)
          .then((data) => setItems(data[1] || []))
          .catch((err) => console.log(err));
      }, 250)
    );
  }, []);

  return (
    <div>
      <input type="text" className="search" />
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

```


上述代码还有几个小的优化点：

1. 输入置空时，不应该发起请求
2. 过滤同样的请求
3. 不应该频繁发起请求，不能每输入一个字符就发起请求，一般中间的单个字符都没有搜索意义，也就是我们常说的防抖
4. 请求存在竞态
   1. 先输入 a，然后发起请求 a
   2. 在输入 b，发起请求 b
   3. b 比 a 的响应先回来，则先展示 b 的结果再展示 a 的结果，逻辑不符合

下面我们来分别实现它们。

首先实现置空时不要发起请求：

```javascript 
// ...
inputSearch.addEventListener("input", (e) => {
      if (!e.target.value) setItems([])
      else {
        searchWikiPedia(e.target.value)
        .then((data) => setItems(data[1] || []))
        .catch((err) => console.log(err)) 
      }
    });
// ...

```


接着我们来实现过滤同样的请求：

```javascript 
// 记录上次input value;
let lastInputValue = ''；

const value = e.target.value;
if (lastInputValue === value) {
  return;
} else {
  lastInputValue = value;
}

```


然后实现防抖，我们在 250MS 之后才能执行一次，如果 250MS 之内有新输入，我们就重新计时（面试都背的滚瓜乱熟了对吧🌚）：

```javascript 
let timer = null;

const debounce = (fn, delay) => {
    let timer;

    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  };

inputSearch.addEventListener("input", debounce((e) => {
  searchWikiPedia(e.target.value)
        .then((data) => setItems(data[1] || []))
        .catch((err) => console.log(err))
}));
```


最后我们还要实现竞态处理，即判断当前反馈的响应是否与发出的请求时一一对应，如果不是则不处理该响应：

```javascript 
let timer = null;

const takeLatestRequest = (promiseCreator) => {
    let index = 0;
    return function () {
      index++;
      const promise = promiseCreator.apply(this, arguments);

      function guardLatest(func, reqIndex) {
        return function () {
          if (reqIndex === index) {
            func.apply(this, arguments);
          }
        };
      }

      return new Promise(function (resolve, reject) {
        promise.then(guardLatest(resolve, index), guardLatest(reject, index));
      });
    };
  };

const latestRequest = takeLatestRequest(searchWikiPedia);
inputSearch.addEventListener("input", debounce((e) => {
   latestRequest(e.target.value)
      .then((data) => setItems(data[1] || []))
      .catch((err) => console.log(err))
}));

```


基本上搞定，我们来看一下实际的效果与对应的完整代码。

实际效果如下：

![](./assets/image/image_Xkfv_Bq-TK.png)

完整的代码如下：

```javascript 
import React, { useState, useEffect } from "react";
import jsonp from "jsonp";

export default function OperatorsNormal() {
  const [items, setItems] = useState([]);

  const searchWikiPedia = (search) => {
    return new Promise((resolve, reject) => {
      return jsonp(
        `http://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=${search}&callback=JSON_CALLBACK`,
        null,
        (err, data) => {
          if (err) {
            console.log("err", err);
            reject(err);
          } else resolve(data);
        }
      );
    });
  };

  const debounce = (fn, delay) => {
    let timer;

    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  };

  const takeLatestRequest = (promiseCreator) => {
    let index = 0;
    return function () {
      index++;
      const promise = promiseCreator.apply(this, arguments);

      function guardLatest(func, reqIndex) {
        return function () {
          if (reqIndex === index) {
            func.apply(this, arguments);
          }
        };
      }

      return new Promise(function (resolve, reject) {
        promise.then(guardLatest(resolve, index), guardLatest(reject, index));
      });
    };
  };

  useEffect(() => {
    const inputSearch = document.querySelector(".search");
    const latestRequest = takeLatestRequest(searchWikiPedia);
    let lastInputValue = "";

    inputSearch.addEventListener(
      "input",
      debounce((e) => {
        if (!e.target.value) return;
        if (lastInputValue === e.target.value) return;
        else lastInputValue = e.target.value;

        latestRequest(e.target.value)
          .then((data) => setItems(data[1] || []))
          .catch((err) => console.log(err));
      }, 250)
    );
  }, []);

  return (
    <div>
      <input type="text" className="search" />
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

```


可以看到，在我们需要实现一个类似上述这种较为复杂、边界条件、异步的业务场景时，需要很多的样板代码，光是边界判断，防抖处理、竞态处理就差不多要 50 行，当然我们还没有考虑失败重试、数据兜底等因素，如果将这些因素考虑进去的话，那么代码可能要突破 100 行。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3bc6665cf89d41d597d14fcc943fd659~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

我们再来看一下通过 RxJS 实现上述功能的完整代码：

```javascript 
import React, { useState, useEffect } from "react";
import jsonp from "jsonp";
import { fromEvent, switchMap, debounceTime, filter, map, distinctUntilChanged } from "rxjs";

export default function OperatorsRxJS() {
  const [items, setItems] = useState([]);

  const searchWikiPedia = (search) => {
    return new Promise((resolve, reject) => {
      return jsonp(
        `http://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=${search}&callback=JSON_CALLBACK`,
        null,
        (err, data) => {
          if (err) {
            console.log("err", err);
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  };

  useEffect(() => {
    const inputSearch = document.querySelector(".search");
    fromEvent(inputSearch, "input")
      .pipe(
        map((e) => e.target.value),
        filter((val) => val),
        debounceTime(250),
        distinctUntilChanged(),
        switchMap((val) => searchWikiPedia(val))
      )
      .subscribe((data) => {
        setItems(data[1] || []);
      });
  }, []);

  return (
    <div>
      <input type="text" className="search" />
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

```


上述代码实现的效果如下：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d686a7c31f424181913621ee36859f91~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

可以看到我们 Network 面板的变化，每次等到 250MS 没有输入时才进行请求，实现了防抖，同时与上次输入如果是一样的，那么就不重新发起请求。当然这里我们没有去模拟竟态的场景，感兴趣的小伙伴可以自己实现一个 Server 来看一下竟态的效果。

可以看到上述代码主要有如下几点优化：

- 我们的代码从 50 行缩短到 13 行，代码量减少将近 4 倍
- 同时我们不仅实现了同样的功能，如过滤空输入、防抖、处理重复输入请求、以及竟态处理（通过 `switchMap` ）
- 而且当我们需要删除某项功能时，我们可以直接删除对应的函数，不会对上下文产生任何影响
- 同时我们需要加功能时，再加个函数加到我们 pipe 处理链中即可，比如我们需要事先超时重试（`retryWhen` ）等逻辑

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c2e5fd1a20e46d991621f3d1840e80c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

上述逻辑再带来优点的同时，**也带来了一些心智负担**，比如 `distinctUntilChanged`，比如 `switchMap` 等，接下来我们就通过弹珠图来可视化上述过程。

首先我们将 `input.search` 的 `input` 事件变为 Observable，然后也随之开始了 Stream 图，也就是弹珠图：

![](./assets/image/image_8GFRq_16Rw.png)

上述过程如下，通过无次输入事件输入了一个 `hello`，然后最后进行了删除置空操作，将输入框清空：

- 即触发了第一次 input 事件，输入 `h`
- 然后 300ms 内没有触发第二次 input 事件
- 接着 300ms 时触发了第二次 input 事件，输入 `e`
- 然后紧接着 +100ms 触发了第三次 input 事件，输入 `l`
- 然后紧接着 +80ms 触发了第四次 input 事件，输入 `l`
- 然后接着 +300ms 触发了第五次 input 事件，输入 `o`
- 然后接着 +80ms 触发了第六次 input 事件，删除 `o`
- 然后借助 +300ms 触发了第七次 input 事件，添加 `o`
- 然后接着 +300ms 触发了第八次 input 事件，将输入框清空，变为了空字符串

上述 8 个事件在时间维度上组成了一个 Stream，接下来我们要做的第一个操作就是，拿到这些输入事件对应的输入框的值，即 `map(e => e.target.value)` ：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/306c90b773754e06960a705d781c0f41~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

接着，我们过滤空输入，使用 `filter(val => val)` ：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8202ef1c434c472ab5dee5ee501c7332~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

可以看到最后一个置空输入的事件被过滤掉了。

接着我们尝试加入防抖，即 `debounceTime(250)` 加入了一个 250ms 的防抖，这会对应到如下图：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/156b048972da463aaf458e75af84330e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

可以看到因为有了 250ms 的防抖，所以从第二个事件开始，中间的第三、四事件都小于 250ms，所以这些事件在经过防抖操作之后不会派发新的事件，而第六个事件也是小于 250ms，所以也不会派发新的事件，在我们的时间维度上只存在了四个事件。

紧接着我们尝试去除重复的请求，即在经过防抖之后，和**上次请求一样的请求数据其实是不必要的请求**，所以我们使用 `distinctUntilChanged` ，此是如何运作的呢？直接上图！

![](./assets/image/image_MTZROPbkrd.png)

从整个时间维度来看，剩下的四个事件中，第三和第四个事件的请求数据是一致的，所以第四个事件在经过 `distinctUntilChanged` 处理之后就不会派发新的事件，最后只剩下三个事件。

最后我们需要处理竟态，因为这里我们在例子中并没有出现竟态的情况，所以这里仅仅是说明，具体的竟态读者可以自行实现，有问题可以找我探讨🤓

我们直接使用 RxJS 文档里关于 `switchMap` 的弹珠图来说明什么是竟态，以及如何处理竟态

![](./assets/image/image_63JIlDo0GV.png)

根据 RxJS 的文档，`switchMap` 主要做的事情有两件：

- 对 `source Observable` 进行 `map` 操作，`map` 操作时**的每一项都会被压平之后**以 `Observable` 的形式返回
- 按照原 `source Observable` 的时序，`map` 操作之后，前一个事件被压平的 `Observable` 如果有**超过后一个事件的，那么选择后一个事件，而丢弃前一个事件**

这两句话有点绕，我们画个弹珠图来解释一下：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89f665b4c1704f639296d7c208af01c5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

我们有两个 Stream，第一条为 source Observable，第二条为 map 时操作 i 与待映射的 Stream，上述映射的中间态如下：

![](./assets/image/image_8nTrOcGm2F.png)

按照 source Observable 1 3 5 的顺序，然后按照 mapped Observable 的时间跨度进行映射，然后压平之后就会得到如上的结果，然后 switchMap 则会按照原 1 3 5 的顺序，对映射压平之后的上述结果进行一个判断，因为 3 映射之后的第三个 30 在原时序上是小于 5 的，所以超过第一个 50 的 30 会被丢弃，变成如下结果：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00eb63bc2e0b42eba20a57e25e90bf26~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

也就变成了我们一开始提到的 RxJS 文档里的图示（我画的和它有一丢丢偏差，但是问题不大🌚）：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ef9472b5259541faa067346a365b9cd0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

好的，我们了解了 `switchMap` 的作用，接下来我们来画图解释一下我们之前业务需求里面使用 `switchMap` 的效果：

```javascript 
  useEffect(() => {
    const inputSearch = document.querySelector(".search");
    fromEvent(inputSearch, "input")
      .pipe(
        map((e) => e.target.value),
        filter((val) => val),
        debounceTime(250),
        distinctUntilChanged(),
        switchMap((val) => searchWikiPedia(val))
      )
      .subscribe((data) => {
        setItems(data[1] || []);
      });
  }, []);

```


![](./assets/image/image_gtCdIZ74by.png)

我们拿前两个 `searchWikiPedia` 请求为例，经过 `switchMap` 之后，会映射成下面两个紫色的 Stream：

1. 第一个紫色的 Stream 中代表 `searchWikiPedia(value)` 生成的 Promise，这个 Promise 被转为了 Observable 对象，然后隔了 400ms 时间 Promise resolved 之后会派发一个事件
2. 第二个紫色的 Stream 中代表 `searchWikiPedia(value)` 生成的 Promise，这个 Promise 被转为了 Observable 对象,然后隔了 200ms 时间 Promise resolved 之后会派发一个事件
3. 第三个紫色的 Stream 中代表 `searchWikiPedia(value)` 生成的 Promise，这个 Promise 被转为了 Observable 对象,然后隔了 200ms 时间 Promise resolved 之后会派发一个事件

最后映射压平之后的中间态如下：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cfec9d2dbefb43ddab68e593bcd64e20~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

即第一个请求发出去之后间隔较久还没有响应，然后又发出去第二个请求，这个时候第一个请求响应回来了，但此时我们应该需要拿第二次请求的响应结果来更新最后的搜索结果，应该把第一个请求的响应丢掉，如果不这样做的话就会出现如下情况：

- 我输入了 he，但是显示的是 h 的结果，会让用户觉得很奇怪

而我们使用了 `switchMap` 之后，最后要做的操作就是按照原 source Observable 的顺序，丢掉那些时间不对的 observable，即中间的那个 `h` 响应会被丢弃，变成如下结果：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/14f6b63afdfb415f93c558f34e6c0dc2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

即我们会取第二次的响应的结果，去更新在第二次请求之后的结果，这样显示结果就会正确。

懂了吗？是不是很绕。。。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5b20588ad78433f80a7c0e756d4f3fc~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)
