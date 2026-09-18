# 注册提供者

现在我们已经定义了提供者（`CatsService`），并且已经有了该服务的使用者（`CatsController`），我们需要在 `Nest` 中注册该服务，以便它可以执行注入。 为此，我们可以编辑模块文件（`app.module.ts`），然后将服务添加到`@Module()`装饰器的 `providers` 数组中。

```typescript title="app.module.ts"
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}

```


得益于此，`Nest` 现在将能够解决 `CatsController` 类的依赖关系。这就是我们目前的目录结构：

```typescript 
src
├── cats
│    ├──dto
│    │   └──create-cat.dto.ts
│    ├── interfaces
│    │       └──cat.interface.ts
│    ├──cats.service.ts
│    └──cats.controller.ts
├──app.module.ts
└──main.ts

```
