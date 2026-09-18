# 动态模块

`Nest` 模块系统包括一个称为动态模块的强大功能。此功能使您可以**轻松创建可自定义的模块**，这些模块可以动态注册和配置提供程序。动态模块在这里广泛介绍。在[本章](https://docs.nestjs.cn/8/fundamentals/dynamic-modules "本章")中，我们将简要概述以完成模块介绍。

以下是一个动态模块定义的示例 `DatabaseModule`：

```typescript 
import { Module, DynamicModule } from '@nestjs/common';
import { createDatabaseProviders } from './database.providers';
import { Connection } from './connection.provider';

@Module({
  providers: [Connection],
})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    const providers = createDatabaseProviders(options, entities);
    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}

```


> `forRoot()` 可以同步或异步（`Promise`）返回动态模块。

此模块 `Connection` **默认情况下**（在 `@Module()` 装饰器元数据中）**定义提供程序**，但此外-根据传递给方法的 `entities` 和 `options` 对象 `forRoot()` -公开提供程序的集合，例如存储库。请注意，**动态模块返回的属性扩展**（**而不是覆盖）**`@Module()` 装饰器中定义的基本模块元数据。这就是从模块导出静态声明的 `Connection` 提供程序和动态生成的存储库提供程序的方式。

如果要在全局范围内注册动态模块，请将 `global` 属性设置为 `true`。

```json 
{
  global: true,
  module: DatabaseModule,
  providers: providers,
  exports: providers,
}

```


如上所述，将所有内容全局化不是一个好的设计决策。

所述 `DatabaseModule` 可以被导入，并且被配置以下列方式：

```typescript 
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { User } from './users/entities/user.entity';

@Module({
   imports: [DatabaseModule.forRoot([User])],
 })
export class AppModule {}
```


如果要**依次重新导出动态模块**，则可以 `forRoot()` 在导出数组中省略方法调用：

```typescript 
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [DatabaseModule.forRoot([User])],
  exports: [DatabaseModule],
})
export class AppModule {}

```


[动态模块](https://docs.nestjs.cn/10/fundamentals?id=动态模块 "动态模块")章介绍中更详细地在本主题，并且包括一个[实例](https://github.com/nestjs/nest/tree/master/sample/25-dynamic-modules "实例")。
