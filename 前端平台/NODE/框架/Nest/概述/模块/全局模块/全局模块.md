# 全局模块

如果你不得不在**任何地方导入相同的模块**，那可能很烦人。在 [Angular](https://angular.io/ "Angular") 中，**提供者是在全局范围内注册的**。一旦定义，他们到处可用。另一方面，`Nest` 将**提供者封装在模块范围内**。您**无法在其他地方使用模块的提供者而不导入他们。**但是有时候，你可能只想提供一**组随时可用**的东西 - 例如：helper，数据库连接等等。这就是为什么你能够使模块成为全局模块。

```typescript 
import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}

```


`@Global` **装饰器使模块成为全局作用域。** **全局模块应该只注册一次**，最好由**根或核心模块注册**。 在上面的例子中，`CatsService` 组件将无处不在，而想要使用 `CatsService` 的模块**则不需要**在 `imports` 数组中导入 `CatsModule`

> 使一切全局化并不是一个好的解决方案。 **全局模块可用于减少必要模板文件的数量。 imports 数组仍然是使模块 API 透明的最佳方式。**
