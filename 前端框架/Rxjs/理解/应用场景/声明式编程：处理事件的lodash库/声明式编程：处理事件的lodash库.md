# 声明式编程：处理事件的lodash库

## 目录

- [例子：用rxjs实现搜索功能](#例子用rxjs实现搜索功能)

采用声明式的方式来描述数据流和操作，使得代码更加清晰、简洁和可读，减少了出错的可能性，最常见的例子就是数组的forEach、map、filter操作符的使用。

而 rxjs 提供了丰富的operator，封装常见的复杂的代码逻辑，让你写出声明式的代码。

比较常用的operator有：

- 防抖处理 `debounce`、`throttle`
- 并发处理 `mergeMap`
- 竞态处理 `concatMap`、`switchMap`
- 失败捕获 `catchError`
- 失败重试 `retryWhen`
- 去重 `distinct`、`distinctUntilChanged`
- 截停 `take`、`takeUntil`
- 缓冲 `buffer`、`bufferWhen`
- 分支选择 `iif`
- 组合多个事件 `merge`、`withLatestFrom`、`combineLatest`

如果想快速了解和学习`operator`的话，推荐访问这个网站` `[www.learnrxjs.io/learn-rxjs/…](https://link.juejin.cn?target=https://www.learnrxjs.io/learn-rxjs/operators%E3%80%82%E6%9C%89%E5%88%86%E7%B1%BB%EF%BC%8C%E8%80%8C%E4%B8%94%E6%AF%94%E8%BE%83%E5%B8%B8%E7%94%A8%E7%9A%84 "www.learnrxjs.io/learn-rxjs/…") operator 都标记了⭐。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d54db04e10584047b7df90276d229a02~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=318\&h=171\&s=7463\&e=png\&b=ffffff)

另外，如果`rxjs`提供的`operator`不满足自己的需求，也可以自己实现。

### 例子：用rxjs实现搜索功能

要求对搜索框的输入进行失败处理、竞态处理、防抖处理、过滤空值、去重。

```html 
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
  <div>
    <input id="search" type="text" placeholder="搜索...">
    <span id="searchResult"></span>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.2.0/rxjs.umd.min.js"></script>
  <script>
    const {
      fromEvent,
      of ,
      from,
    } = rxjs;
    const {
      debounceTime,
      map,
      switchMap,
      catchError,
      tap,
      distinctUntilChanged,
      filter,
    } = rxjs.operators;

    // 获取输入框元素
    const inputElement = document.getElementById('search');
    // 结果
    const searchResult = document.getElementById('searchResult');

    // 创建一个 Observable 来监听输入事件
    const input$ = fromEvent(inputElement, 'input');

    // 模拟的请求函数
    const mockSearchService = (query) => {
      return new Promise((resolve, reject) => {
        const random = Math.random();
        console.log('request: ', query,  random, random > 0.7)
        setTimeout(() => {
          // 设置一个随机数，如果随机数小于0.2，则请求失败
          if (random > 0.2) {
            resolve(`搜索结果: ${query}`);
          } else {
            reject('搜索出错!');
          }
        }, 500);
      });
    };

    // 使用 pipe 方法来处理输入事件
    const search$ = input$.pipe(
      // 使用 debounceTime 来实现防抖功能，例如这里我们设置为 500 毫秒
      debounceTime(500),
      // 变化才会请求
      distinctUntilChanged(),
      // 使用 map 来获取输入框的值
      map(event => event.target.value),
      // 过滤空值
      filter((val) => val),
      // 使用 switchMap 来发送搜索请求
      switchMap(query => from(mockSearchService(query)).pipe(
        // 对请求进行失败处理
        catchError(error => of('搜索失败')),
      )),
      tap(console.log)
    );

    // 订阅 search$ Observable，然后在控制台打印搜索结果
    search$.subscribe(results => searchResult.textContent = results);
  </script>
</body>

</html>

```
