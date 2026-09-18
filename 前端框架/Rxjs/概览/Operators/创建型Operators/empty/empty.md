# empty

定义：

- `public static empty(scheduler: Scheduler): Observable`

顾名思义，该操作符创建一个**什么数据都不发出，直接发出完成通知的操作符。**

> 这里可能会有读者问了，那这玩意有啥用。

其实不然，在与某些操作符进行配合时，它的作用还真不可小觑，比如`mergeMap`，后面会进行配合讲解，等不及的小伙伴可以直接跳到`mergeMap`。
