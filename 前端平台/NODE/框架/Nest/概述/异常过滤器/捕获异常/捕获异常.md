# 捕获异常

为了捕获每一个未处理的异常(不管异常类型如何)，将 `@Catch()` 装饰器的参数列表设为空，例如 `@Catch()`。

```typescript title="any-exception.filter.ts"
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

```


在上面的示例中，过滤器将捕获抛出的每个异常，而不管其类型(类)如何。
