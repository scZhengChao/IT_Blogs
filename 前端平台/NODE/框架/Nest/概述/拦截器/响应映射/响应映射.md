# 响应映射

我们已经知道, `handle()` 返回一个 `Observable`。此流包含**从路由处理程序返回的值**, 因此我们可以使用 `map()` 运算符轻松地对其进行改变。

> 响应映射功能不适用于特定于库的响应策略（禁止直接使用 `@Res()` 对象）。

让我们创建一个 TransformInterceptor, 它将打包响应并将其分配给 data 属性。

```nginx title="transform.interceptor.ts"
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(map(data => ({ data })));
  }
}

```


> `Nest` 拦截器就像使用异步 `intercept()` 方法的魅力一样, 意思是, 如果需要，您可以毫不费力地将方法切换为异步。

之后，当有人调用GET `/cats`端点时，请求将如下所示（我们假设路由处理程序返回一个空 arry `[]`）：

```nginx 
{
    "data": []
}

```


拦截器在创建**用于整个应用程序的可重用解决方案时具有巨大的潜力**。例如，我们假设我们需要将每个发生的 `null` 值转换为空字符串 `''`。我们可以使用一行代码并将拦截器绑定为全局代码。由于这一点，它会被每个注册的处理程序自动重用。

```nginx 
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExcludeNullInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map(value => value === null ? '' : value ));
  }
}

```
