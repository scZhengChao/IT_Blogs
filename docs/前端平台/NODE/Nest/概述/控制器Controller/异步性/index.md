# 异步性

我们酷爱现代 Javascript，并且我们知道数据读取（data extraction）大多是**异步**的.这就是为什么 Nest 完美支持**异步函数**（Async Function）特性的原因。

了解更多关于 `Async / await` 请点击[这里](https://kamilmysliwiec.com/typescript-2-1-introduction-async-await "这里")

每个异步函数都必须返回一个 `Promise`。这意味着您可以返回延迟值，而 Nest 将自行解析它。让我们看看下面这个例子:

```typescript title="cats.controller.ts"
@Get()
async findAll(): Promise<any[]> {
  return [];
}

```


这是完全有效的。此外，**通过返回 RxJS **[**observable 流**](http://reactivex.io/rxjs/class/es8/Observable.js~Observable.html "observable 流")**，**Nest 路由处理程序将更加强大。 Nest **将自动订阅下面的源并**获取**最后发出的值**（在流完成后）。

```typescript title="cats.controller.ts"
@Get()
findAll(): Observable<any[]> {
  return of([]);
}

```


上述的两种方法都是可行的，你可以选择你喜欢的方式。
