# 更多操作符

使用 `RxJS` 运算符操作流的可能性为我们提供了许多功能。让我们考虑另一个常见的用例。假设您要处理路由请求超时。如果您的端点在一段时间后未返回任何内容，则您将以错误响应终止。以下构造可实现此目的：

```nginx title="timeout.interceptor.ts"
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, RequestTimeoutException } from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(5000),
      catchError(err => {
         if (err instanceof TimeoutError) { 
           return throwError(new RequestTimeoutException()); 
        }
         return throwError(err);
       }),
    );
  };
};
```


5秒后，请求处理将被取消。您还可以在抛出之前添加自定义逻辑`RequestTimeoutException`（例如，释放资源）。
