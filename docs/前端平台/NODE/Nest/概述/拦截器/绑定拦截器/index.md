# 绑定拦截器

为了设置拦截器, 我们使用从 `@nestjs/common` 包导入的 `@UseInterceptors()` 装饰器。与守卫一样, 拦截器可以是控制器范围内的, 方法范围内的或者全局范围内的。

```nginx title="cats.controller.ts"
@UseInterceptors(LoggingInterceptor)
export class CatsController {}

```


> `@UseInterceptors()` 装饰器从 `@nestjs/common` 导入。

由此，`CatsController` 中定义的每个路由处理程序都将使用 `LoggingInterceptor`。当有人调用 GET `/cats` 端点时，您将在控制台窗口中看到以下输出：

```nginx 
Before...
After... 1ms

```


请注意，我们传递的是 `LoggingInterceptor` 类型而不是实例，让框架承担实例化责任并启用依赖注入。另一种可用的方法是传递立即创建的实例：

```nginx title="cats.controller.ts"
@UseInterceptors(new LoggingInterceptor())
export class CatsController {}

```


如上所述, 上面的构造将拦截器附加到此控制器声明的每个处理程序。如果我们决定只限制其中一**个, 我们只需在方法级别设置拦截器**。为了绑定全局拦截器, 我们使用 Nest 应用程序实例的 `useGlobalInterceptors()` 方法:

```nginx 
const app = await NestFactory.create(ApplicationModule);
app.useGlobalInterceptors(new LoggingInterceptor());

```


全局拦截器用于整个应用程序、每个控制器和每个路由处理程序。在依赖注入方面, 从任何模块外部注册的全局拦截器 (如上面的示例中所示) 无法插入依赖项, 因为它们不属于任何模块。为了解决此问题, 您可以使用以下构造**直接从任何模块设**置一个拦截器:

```nginx title="app.module.ts"
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}

```


> 另一种选择是使用[执行上下文](https://docs.nestjs.cn/8/executioncontext "执行上下文")功能。另外，useClass 并不是处理自定义提供商注册的唯一方法。在[这里](https://docs.nestjs.cn/8/fundamentals "这里")了解更多。
