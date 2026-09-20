# 继承

通常，您将创建完全定制的异常过滤器，以满足您的应用程序需求。如果您希望重用已经实现的核心异常过滤器，并基于某些因素重写行为，请看下面的例子。

为了将异常处理委托给基础过滤器，需要继承 `BaseExceptionFilter` 并调用继承的 `catch()` 方法。

```typescript title="all-exceptions.filter.ts"
import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}

```


> **继承自基础类**的**过滤器必须由框架本身实例化**（不要使用 `new` 关键字手动创建实例）

上面的实现只是一个演示。扩展异常过滤器的实现将包括定制的业务逻辑(例如，处理各种情况)。

全局过滤器可以扩展基本过滤器。这可以通过两种方式来实现。

您可以通过注入 `HttpServer` 来使用继承自基础类的全局过滤器。

```typescript 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();

```


第二种方法是使用 `APP_FILTER` `token`，[如下所示](https://docs.nestjs.cn/10/exceptionfilters?id=绑定过滤器 "如下所示")。
