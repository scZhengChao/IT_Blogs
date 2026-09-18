# 异常过滤器

虽然基本（内置）异常过滤器可以为您自动处理许多情况，但有时您可能希望对异常层拥有**完全控制权**，例如，您可能希望基于某些动态因素添加日志记录或使用不同的 `JSON` 模式。 **异常过滤器**正是为此目的而设计的。 它们使您**可以控制精确的控制流以及将响应的内容**发送回客户端。

让我们创建一个异常过滤器，它负责捕获作为`HttpException`类实例的异常，并为它们设置自定义响应逻辑。为此，我们需要访问底层平台 `Request`和 `Response`。我们将访问`Request`对象，以便提取原始 `url`并将其包含在日志信息中。我们将使用 `Response.json()`方法，使用 `Response`对象直接控制发送的响应。

```typescript title="http-exception.filter.ts"
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}

```


所有异**常过滤器都应该实现通用**的 `ExceptionFilter<T>` 接口。它需要你使用有效签名提供 `catch(exception: T, host: ArgumentsHost)`方法。`T` 表示异常的类型。

`@Catch()` 装饰器绑定所需的元数据到异常过滤器上。它告诉 `Nest`这个特定的过滤器正在寻找 `HttpException` 而不是其他的。在实践中，`@Catch()` 可以传递多个参数，所以你可以通过逗号分隔来为多个类型的异常设置过滤器。
