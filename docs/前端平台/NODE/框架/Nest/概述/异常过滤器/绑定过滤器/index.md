# 绑定过滤器

让我们将 `HttpExceptionFilter` 绑定到 `CatsController` 的 `create()` 方法上。

```typescript title="cats.controller.ts"
@Post()
@UseFilters(new HttpExceptionFilter())
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}

```


> `@UseFilters()` 装饰器需要从 `@nestjs/common` 包导入。

我们在这里使用了 `@UseFilters()` 装饰器。和 `@Catch()`装饰器类似，它可以使用单个过滤器实例，也可以使用逗号分隔的过滤器实例列表。 我们创建了 `HttpExceptionFilter` 的实例。另一种可用的方式是传递类（不是实例），让框架承担实例化责任并启用依赖注入。

```typescript title="cats.controller.ts"
@Post()
@UseFilters(HttpExceptionFilter)
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}

```


> 尽可能**使用类而不是实例**。由于 `Nest` 可以轻松地在**整个模块中重复使用同一类的实例**，因此可以减少**内存使用**。

在上面的示例中，`HttpExceptionFilter` 仅应用于单个 `create()` 路由处理程序，使其**成为方法范围的**。 异常过滤器的作用域可以划分为不同的级别：**方法范围，控制器范围或全局范围**。 例如，要将过滤器设置为控制器作用域，您可以执行以下操作：

```typescript title="cats.controller.ts"
@UseFilters(new HttpExceptionFilter())
export class CatsController {}

```


此结构为 `CatsController` 中的每个路由处理程序设置 `HttpExceptionFilter`。

要创建一个全局范围的过滤器，您需要执行以下操作:

```typescript title="main.ts"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();

```


> 该 `useGlobalFilters()` 方法不会为网关和混合应用程序设置过滤器。

全局过滤器用于**整个应用程序、每个控制器和每个路由处理程序。**就依赖注入而言，从任何模块外部注册的全局过滤器（使用上面示例中的 `useGlobalFilters()`）**不能注入依赖，因为它们不属于任何模块**。为了解决这个问题，你**可以注册一个全局范围的过滤器直接为任何模块设置过滤器：**

```typescript title="app.module.ts"
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

```


> 当使用此方法对过滤器执行依赖注入时，请注意，无论采用哪种结构的模块，过滤器实际上都是全局的。 应该在哪里做？ 选择定义了过滤器（以上示例中为 `HttpExceptionFilter`）的模块。 同样，`useClass`不是处理自定义提供程序注册的唯一方法。 在[这里](https://docs.nestjs.cn/8/fundamentals?id=自定义提供者 "这里")了解更多。

您可以根据需要添加任意数量的过滤器;只需将每个组件添加到 `providers`（提供者）数组。
