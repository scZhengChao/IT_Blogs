# 功能模块

`CatsController` 和 `CatsService` 属于同一个**应用程序域。 应该考虑将它们移动到一个功能模块下**，即 `CatsModule`。

```typescript title="cats/cats.module.ts"
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}

```


> 要使用 CLI 创建模块，只需执行 `$ nest g module cats` 命令。

我已经创建了 `cats.module.ts` 文件，并把与这个模块相关的所有东西都移到了 cats 目录下。我们需要做的最后一件事是将这个模块导入根模块 `(ApplicationModule)`。

```typescript title="app.module.ts"
import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class ApplicationModule {}

```


现在 `Nest` 知道除了 `ApplicationModule` 之外，注册 `CatsModule` 也是非常重要的。 这就是我们现在的目录结构:

```typescript 
src
├──cats
│    ├──dto
│    │   └──create-cat.dto.ts
│    ├──interfaces
│    │     └──cat.interface.ts
│    ├─cats.service.ts
│    ├─cats.controller.ts
│    └──cats.module.ts
├──app.module.ts
└──main.ts

```
