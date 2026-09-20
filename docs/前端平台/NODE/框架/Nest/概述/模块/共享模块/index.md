# 共享模块

在 Nest 中，默认情况下，模块是**单例**，因此您可以轻松地**在多个模块之间**共享**同一个**提供者实例。

![](https://docs.nestjs.com/assets/Shared_Module_1.png)

实际上，每个模块都是一个**共享模块**。**一旦创建就能被任意模块重复使用**。假设我们将在几个模块之间共享 `CatsService` 实例。 我们需要把 `CatsService` 放到 `exports` 数组中，如下所示：

```typescript title="cats.module.ts"
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
   exports: [CatsService]
 })
export class CatsModule {}
```


现在，**每个导入** `CatsModule` 的模块都可以访问 `CatsService` ，并且它们**将共享相同**的 `CatsService` 实例。
