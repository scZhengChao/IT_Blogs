# 中间件消费者

`MiddlewareConsumer` 是**一个帮助类**。它提供**了几种内置方法来管理中间**件。他们都可以被**简单地链接起来**。`forRoutes()` 可接受一个**字符串、多个字符串、对象、一个控制器类甚至多个控制器类**。在大多数情况下，您可能只会**传递一个由逗号分隔的控制器列表**。以下是单个控制器的示例：

```typescript title="app.module.ts"
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller.ts';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(CatsController);
  }
}

```


> 该 `apply()` 方法可以使用单个中间件，也可以使用多个参数来指定多个**多个中间件**。

有时我们想从**应用中间件中排除某些路由**。我们可以使用该 `exclude()` 方法轻松排除某些路由。此方法可以采用一个字符串，多个字符串或一个 `RouteInfo` 对象来标识要排除的路由，如下所示：

```typescript 
consumer
  .apply(LoggerMiddleware)
  .exclude(
    { path: 'cats', method: RequestMethod.GET },
    { path: 'cats', method: RequestMethod.POST },
    'cats/(.*)',
  )
  .forRoutes(CatsController);

```


该 `exclude()` 方法使用 `path-to-regexp` 包支持通配符参数。

在上面的示例中，`LoggerMiddleware` 将绑定到内部定义的所有路由，`CatsController` 但传递给 `exclude()` 方法的三个路由除外。
