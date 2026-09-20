# 自定义提供者

## 目录

- [依赖注入](#依赖注入)
- [标准提供者](#标准提供者)
- [自定义提供者](#自定义提供者)
- [值提供者 (useValue)](#值提供者-useValue)
- [非类提供者](#非类提供者)
- [类提供者 (useClass)](#类提供者-useClass)
- [工厂提供者 (useFactory)](#工厂提供者-useFactory)
- [别名提供者 (useExisting)](#别名提供者-useExisting)
- [非服务提供者](#非服务提供者)
- [导出自定义提供者](#导出自定义提供者)

在前面几章中，我们讨论了依赖注入(`DI`)的各个方面，以及如何在 `Nest` 中使用它。其中一个**例子是基于**[**构造函数**](https://docs.nestjs.com/providers#dependency-injection "构造函数")**的依赖注入**，用于将实例(通常是服务提供者)注入到类中。当您了解到依赖注入是以一种基本的方式构建到 `Nest` 内核中时，您不会感到惊讶。到目前为止，我们只探索了一个主要模式。随着应用程序变得越来越复杂，您可能需要利用 `DI` 系统的所有特性，因此让我们更详细地研究它们。

### [依赖注入](https://docs.nestjs.cn/10/fundamentals?id=依赖注入 "依赖注入")

依赖注入是一种控制反转（`IoC`）技术，您可以将依赖的实例化委派给 `IoC` 容器（在我们的示例中为 `NestJS` 运行时系统），而不是必须在自己的代码中执行。 让我们从[“提供者”](https://docs.nestjs.cn/providers "“提供者”")一章中检查此示例中发生的情况。

首先，我们定义一个提供者。`@Injectable()`装饰器将 `CatsService` 类标记为提供者。

```typescript title="cats.service.ts"
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  findAll(): Cat[] {
    return this.cats;
  }
}
```


然后，我们要求 `Nest` 将提供程序注入到我们的控制器类中：

```typescript title="cats.controller.ts"
import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```


最后，我们在 `Nest IoC` 容器中注册提供程序

```nginx title="app.module.ts"
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}

```


这个过程有三个关键步骤:

1. 在 `cats.service.ts` 中 `@Injectable()` 装饰器声明 `CatsService` 类是一个可以由`Nest IoC`容器管理的类。
2. 在 `cats.controller.ts` 中 `CatsController` 声明了一个依赖于 `CatsService` 令牌(`token`)的构造函数注入:

```typescript 
constructor(private readonly catsService: CatsService)
```


1. 在 `app.module.ts` 中，我们将标记 `CatsService`与 `cats.service.ts`文件中的 `CatsService` 类相关联。 我们将在下面确切地看到这种关联（也称为注册）的发生方式。

当 `Nest IoC` 容器实例化 `CatsController` 时，它**首先查找所有依赖项 \*。** 当找到 `CatsService` 依赖项时，它将对 `CatsService`令牌(`token`)执行查找，并根据上述步骤（上面的＃3）返回 `CatsService` 类。 假定单例范围（默认行为），`Nest` 然后将创建 `CatsService` 实例，将其缓存并返回，或者如果已经缓存，则返回现有实例。

这个解释稍微简化了一点。我们忽略的一个重要方面是，**分析依赖项代码的过程非常复杂，并且发生在应用程序引导期间**。一个关键特性是**依赖关系分析(或“创建依赖关系图”)是可传递的。** 在上面的示例中，如果 `CatsService` 本身具有依赖项，**那么那些依赖项也将得到解决。** **依赖关系图确保以正确的顺序解决依赖关系-本质上是“自下而上”**。 这种机制使开发人员不必管理此类复杂的依赖关系图。

### [标准提供者](https://docs.nestjs.cn/10/fundamentals?id=标准提供者 "标准提供者")

让我们仔细看看 `@Module()`装饰器。在中 `app.module` ，我们声明：

```typescript 
@Module({
  controllers: [CatsController],
  providers: [CatsService],
})

```


providers属性接受一个提供者数组。到目前为止，我们已经通过一个类名列表提供了这些提供者。实际上，该语法`providers: [CatsService]`**是更完整语法的简写：**

```typescript 
providers: [
  {
    provide: CatsService,
    useClass: CatsService,
  },
];

```


现在我们看到了**这个显式的构造，我们可以理解注册过程**。在这里，我们\*\*明确地将****令牌**** \*\***`CatsService`****与****类 ****`CatsService`**** 关联起来**。简写表示法只是为了简化最常见的用例，其中令牌用于请求同名类的实例。

### [自定义提供者](https://docs.nestjs.cn/10/fundamentals?id=自定义提供者-1 "自定义提供者")

当您的要求超出标准提供商所提供的要求时，会发生什么？这里有一些例子：

- 您要创建自定义实例，而不是让 `Nest` 实例化（或返回其缓存实例）类
- 您想在第二个依赖项中重用现有的类
- 您想使用模拟版本覆盖类进行测试

`Nest` 可让您定义自定义提供程序来处理这些情况。它提供了几种定义自定义提供程序的方法。让我们来看看它们。

### [值提供者 (useValue)](https://docs.nestjs.cn/10/fundamentals?id=值提供者-usevalue "值提供者 (useValue)")

`useValue` 语法对于**注入常量值、将外部库放入 ****`Nest`**** 容器或使用模拟对象替换实际实现非常有用**。假设您希望强制 `Nest` 使用模拟 `CatsService` 进行测试。

```typescript 
import { CatsService } from './cats.service';

const mockCatsService = {
  /* mock implementation
  ...
  */
};

@Module({
  imports: [CatsModule],
  providers: [
    {
      provide: CatsService,
      useValue: mockCatsService,
    },
  ],
})
export class AppModule {}
```


在本例中，`CatsService` 令牌将解析为 `mockCatsService` 模拟对象。`useValue` 需要一个值——在本例中是一个文字对象，**它与要替换的 ****`CatsService`**** 类具有相同的接口**。由于 `TypeScript` 的结构类型化，您可以使用任何具有兼容接口的对象，包括文本对象或用 `new` 实例化的类实例。

### [非类提供者](https://docs.nestjs.cn/10/fundamentals?id=非类提供者 "非类提供者")

到目前为止，我们已经使用了**类名**作为我们的提供者标记（ `providers` 数组中列出的提供者中的 `Provide` 属性的值）。 **这与基于构造函数的注入所使用的标准模式相匹配，其中令牌也是类名**。 （如果此概念尚不完全清楚，请参阅[DI](https://docs.nestjs.cn/8/fundamentals?id=依赖注入 "DI")基础知识，以重新学习令牌）。 有时，我们可能希望灵活使用字符串或符号作为 `DI` 令牌。 例如：

```typescript 
import { connection } from './connection';

@Module({
  providers: [
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ],
})
export class AppModule {}
```


在本例中，我们将字符串值令牌('`CONNECTION`')与从外部文件导入的已存在的连接对象相关联。

> 除了使用字符串作为令牌之外，还可以使用`JavaScript Symbol`。

我们前面已经看到了如何使用基于标准构造函数的注入模式注入提供者。此模式要求用类名声明依赖项。`'CONNECTION'` 自定义提供程序使用字符串值令牌。让我们看看如何注入这样的提供者。为此，我们使用 `@Inject()` 装饰器。**这个装饰器只接受一个参数——令牌**。

```typescript 
@Injectable()
export class CatsRepository {
  constructor(@Inject('CONNECTION') connection: Connection) {}
}

```


> `@Inject()`装饰器是从`@nestjs/common`包中导入的。

虽然我们在上面的例子中直接使用字符串 `'CONNECTION'` 来进行说明，但是为了清晰的代码组织，最佳实践是在单独的文件（例如 `constants.ts` ）中定义标记。 对待它们就像对待在其自己的文件中定义并在需要时导入的符号或枚举一样。

### [类提供者 (useClass)](https://docs.nestjs.cn/10/fundamentals?id=类提供者-useclass "类提供者 (useClass)")

`useClass`语法允许您动态确定令牌应解析为的类。 例如，假设我们有一个抽象（或默认）的 `ConfigService` 类。 根据当前环境，我们希望 \`Nest 提供配置服务的不同实现。 以下代码实现了这种策略。

```typescript 
const configServiceProvider = {
  provide: ConfigService,
  useClass:
    process.env.NODE_ENV === 'development'
      ? DevelopmentConfigService
      : ProductionConfigService,
};

@Module({
  providers: [configServiceProvider],
})
export class AppModule {}
```


让我们看一下此代码示例中的一些细节。 您会注意到，我们首先定义对象 `configServiceProvider`，然后将其传递给模块装饰器的 `providers` 属性。 这只是一些代码组织，但是在功能上等同于我们到目前为止在本章中使用的示例。

另外，我们使用 `ConfigService` 类名称作为令牌。 **对于任何依赖 ****`ConfigService`**** 的类，****`Nest`**** 都会注入提供的类的实例**（ `DevelopmentConfigService` 或 `ProductionConfigService`），**该实例将覆盖在其他地方已声明的任何默认实现（** 例如，使用`@Injectable()` 装饰器声明的 `ConfigService`）。

### [工厂提供者 (useFactory)](https://docs.nestjs.cn/10/fundamentals?id=工厂提供者-usefactory "工厂提供者 (useFactory)")

`useFactory` 语法允许动态创建提供程序。实工厂函数的返回实际的 `provider` 。工厂功能可以根据需要简单或复杂。一个简单的工厂可能不依赖于任何其他的提供者。更复杂的工厂可以自己注入它需要的其他提供者来计算结果。对于后一种情况，工厂提供程序语法有一对相关的机制:

1. 工厂函数可以接受(可选)参数。
2. `inject` 属性接受一个提供者数组，在实例化过程中，`Nest` 将解析该数组并将其作为参数传递给工厂函数。这两个列表应该是相关的: `Nest` 将从 `inject` 列表中**以相同的顺序将实例作为参数传递给工厂函数**。

下面示例演示：

```typescript 
const connectionFactory = {
  provide: 'CONNECTION',
  useFactory: (optionsProvider: OptionsProvider) => {
    const options = optionsProvider.get();
    return new DatabaseConnection(options);
  },
  inject: [OptionsProvider],
};

@Module({
  providers: [connectionFactory],
})
export class AppModule {}
```


### [别名提供者 (useExisting)](https://docs.nestjs.cn/10/fundamentals?id=别名提供者-useexisting "别名提供者 (useExisting)")

`useExisting` 语法允许您**为现有的提供程序创建别名**。这将创建两种访问同一提供者的方法。在下面的示例中，(基于`string`)令牌 `'AliasedLoggerService'` 是(基于类的)令牌 `LoggerService` 的别名。假设我们有两个不同的依赖项，一个用于 `'AlilasedLoggerService'` ，另一个用于 `LoggerService` 。如果两个**依赖项都用单例作用域指定，它们将解析为同一个实例**。

```typescript 
@Injectable()
class LoggerService {
  /* implementation details */
}

const loggerAliasProvider = {
  provide: 'AliasedLoggerService',
  useExisting: LoggerService,
};

@Module({
  providers: [LoggerService, loggerAliasProvider],
})
export class AppModule {}

```


### [非服务提供者](https://docs.nestjs.cn/10/fundamentals?id=非服务提供者 "非服务提供者")

虽然提供者经常**提供服务**，但他们并不限于这种用途。提供者可以提供任何值。例如，提供程序可以根据当前**环境提供配置对象数组**，如下所示:

```typescript 
const configFactory = {
  provide: 'CONFIG',
  useFactory: () => {
    return process.env.NODE_ENV === 'development'
      ? devConfig
      : prodConfig;
  },
};

@Module({
  providers: [configFactory],
})
export class AppModule {}
```


### [导出自定义提供者](https://docs.nestjs.cn/10/fundamentals?id=导出自定义提供者 "导出自定义提供者")

与任何提供程序一样，自定义**提供程序的作用域仅限于其声明模块**。要使它**对其他模块**可见，**必须导出它**。要导出自定义提供程序，我们可以使用其令牌或完整的提供程序对象。

以下示例显示了使用 `token` 的例子：

```typescript 
const connectionFactory = {
   provide: 'CONNECTION',
   useFactory: (optionsProvider: OptionsProvider) => {
    const options = optionsProvider.get();
    return new DatabaseConnection(options);
  },
  inject: [OptionsProvider],
};

@Module({
  providers: [connectionFactory],
   exports: ['CONNECTION'], 
})
export class AppModule {}
```


但是你也可以使用整个对象：

```typescript 
const connectionFactory = {
  provide: 'CONNECTION',
  useFactory: (optionsProvider: OptionsProvider) => {
    const options = optionsProvider.get();
    return new DatabaseConnection(options);
  },
  inject: [OptionsProvider],
};

@Module({
   providers: [connectionFactory],
  exports: [connectionFactory], 
})
export class AppModule {}
```
