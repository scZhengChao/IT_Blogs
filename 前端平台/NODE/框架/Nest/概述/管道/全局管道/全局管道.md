# 全局管道

由于 `ValidationPipe` 被创建为尽可能通用，所以我们将把它设置为一个**全局作用域**的管道，用于整个**应用程序中的每个路由处理器**。

```javascript title="main.ts"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

```


> 在 [**混合应用**](https://docs.nestjs.cn/8/faq?id=混合应用 "混合应用")中 `useGlobalPipes()` **方法不会为网关和微服务设置管道**, 对于标准(非混合) 微服务应用使用 `useGlobalPipes()` 全局设置管道。

全局管道用于**整个应用程序、每个控制器和每个路由处理程序。**

就依赖注入而言，从任何模块外部注册的全局管道（即使用了 `useGlobalPipes()`， 如上例所示）无法注入依赖，因为它们不属于任何模块。为了解决这个问题，可以使用**以下构造直接为任何模块设置管道：**

```javascript title="app.module.ts"
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ]
})
export class AppModule {}

```


> 请注意使用上述方式依赖注入时，请牢记**无论哪种模块采用了该结构，管道都是全局**的。那么它应该放在哪里呢？答案是选择管道(例如上面例子中的 `ValidationPipe`)被定义的模块。另外，`useClass` 并不是处理自定义提供者注册的唯一方法。在[这里](https://docs.nestjs.cn/8/fundamentals?id=custom-providers "这里")了解更多。
