# 应用中间件

**中间件不能**在 `@Module()` 装饰器中列出。我们必须**使用模块类的** `configure()` **方法来设置它们**。包含\*\*中间件的模块必须实现 ****`NestModule`**** 接口。\*\*我们将 `LoggerMiddleware` 设置在 `ApplicationModule` 层上。

```typescript title="app.module.ts"
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
   imports: [CatsModule],
 })
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
     consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats');
   }
}
```


们还可以在配置中间件时将**包含路由路径的对象和请求方法**传递给`forRoutes()`方法。我们为之前在`CatsController`中定义的`/cats`路由处理程序设置了`LoggerMiddleware`。我们还可以在配置中间件时将包含路由路径的对象和请求方法传递给 `forRoutes()`方法，从而**进一步将中间件限制为特定的请求方法**。在下面的示例中，请注意我们导入了 `RequestMethod`来引用所需的请求方法类型。

```typescript title="app.module.ts"
import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}

```


可以使用 `async/await`来实现 `configure()`方法的异步化(例如，可以在 `configure()`方法体中等待异步操作的完成)。
