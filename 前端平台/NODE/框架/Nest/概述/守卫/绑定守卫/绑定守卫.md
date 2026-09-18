# 绑定守卫

与**管道和异常过滤器一样，守卫可以是控制范围的**、**方法范围的或全局范围**的。下面，我们使用 `@UseGuards()`装饰器设置了一个控制范围的守卫。这个装饰器可以使用**单个参数，也可以使用逗号分隔的参数列表**。也就是说，你可以传递几个守卫并用逗号分隔它们。

```nginx 
@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {}

```


> `@UseGuards()` 装饰器需要从 `@nestjs/common` 包导入。

上例，我们已经传递了 RolesGuard 类型而不是实例, 让框架进行实例化，并启用了依赖注入。与管道和异常过滤器一样，我们也可以传递一个实例:

```nginx 
@Controller('cats')
@UseGuards(new RolesGuard())
export class CatsController {}

```


上面的构造将守卫附加到此控制器声明的每个处理程序。如果我们希望守卫只应用于单个方法，则需在**方法级别**应用 `@UseGuards()` 装饰器。

为了设置一个全局守卫，使用**Nest应用程序实例的 ****`useGlobalGuards()`**** 方法：**

```nginx 
const app = await NestFactory.create(AppModule);
app.useGlobalGuards(new RolesGuard());

```


> 对于混合应用程序，默认情况下 `useGlobalGuards()` 方法不会为网关和微服务设置守卫(可查阅[混合应用](https://docs.nestjs.cn/10/faq?id=混合应用 "混合应用")以了解如何改变此行为)。对于“标准”(非混合)微服务应用程序，`useGlobalGuards()` 在全局安装守卫。

全局守卫**用于整个应用程序**, **每个控制器和每个路由处理程序**。在依赖注入方面, 从任何模块外部注册的全局守卫 (使用 `useGlobalGuards()`，如上面的示例中所示)不能插入依赖项, 因为它们不属于任何模块。为了解决此问题, 您可以使用以下构造直接从任何模块设置一个守卫

```nginx title="app.module.ts"
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}

```


> 当使用此方法**为守卫程序执行依赖项注入时**，请注意，无论使用此构造的模块是什么，守卫**程序实际上是全局的**。应该在哪里进行?选择定义守卫的模块(上例中的 `RolesGuard`)。此外，`useClass`不是处理自定义 `providers` 注册的唯一方法。在[这里](https://docs.nestjs.cn/8/fundamentals?id=自定义providercustomer-provider "这里")了解更多。
