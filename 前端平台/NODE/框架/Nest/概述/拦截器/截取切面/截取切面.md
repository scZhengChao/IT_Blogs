# 截取切面

第一个用例是使用拦截器在函数执行之前或之后添加额外的逻辑。当我们要记录与应用程序的交互时，它很有用，例如 存储用户调用，异步调度事件或计算时间戳。作为一个例子，我们来创建一个简单的例子 `LoggingInterceptor`。

```nginx title="logging.interceptor.ts"
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
     return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
   }
}
```


> `NestInterceptor<T，R>` 是一个通用接口，其中 `T` 表示已处理的 `Observable<T>` 的类型（在流后面），而 `R` 表示包含在返回的 `Observable<R>` 中的值的返回类型。

> 拦截器的作用与控制器，提供程序，守卫等相同，这意味着它们可以通过构造函数注入依赖项。

由于 `handle()` 返**回一个RxJS** `Observable`，我们有很多种操作符可以用来操作流。在上面的例子中，我们使用了 `tap()` 运算符，该运算符在可观察序列的正常或异常终止时调用函数。
