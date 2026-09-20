# 画出 Marble 图

当我们遇到复杂的 RxJS 代码时，如果通过 Tap 无法轻易的看出程序是如何执行的，因为 Tap 只能拿到某个中间的执行结果，但是无法可视化中间的执行过程，那么我们就可以通过之前介绍的，从 Stream 的起始态、中间态、错误态、完成态触发，通过 Marble 图体现 Stream 的变换，然后通过 Tap 验证变换的结果。

然后继续回顾上面的例子：

```javascript 
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
      

```


![](./image/image_iXL8Zf948A.png)
