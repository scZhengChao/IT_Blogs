# 最后一步

控制器已经准备就绪，可以使用，但是 Nest 依然不知道 `CatsController` 是否存在，所以它不会创建这个类的一个实例。

**控制器总是属于模块**，这就是为什么我们在 `@Module()` 装饰器中包含 `controllers` 数组的原因。 由于除了根模块 `AppModule`之外，我们还没有定义其他模块，所以我们将使用它来介绍 `CatsController`：

```typescript title="app.module.ts"
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';

 @Module({
  controllers: [CatsController],
}) 
export class AppModule {}
```


我们使用 `@Module()` 装饰器将元数据附加到模块类中，现在，Nest 可以轻松反射（reflect）出哪些控制器（controller）必须被安装。
