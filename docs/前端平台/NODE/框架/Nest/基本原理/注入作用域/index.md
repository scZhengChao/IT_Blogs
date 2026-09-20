# 注入作用域

## 目录

- [提供者范围](#提供者范围)
- [使用 (Usage)](#使用-Usage)
- [控制器范围](#控制器范围)
- [所有请求注入](#所有请求注入)
- [请求提供者](#请求提供者)
- [性能](#性能)

来自不同语言背景的开发者,在学习Nest时可能预料不到在请求中几乎所有内容都是共享的。我们建立一个连接池到数据库,在全局状态下使用单例服务。 要记住Node.js并不遵循多线程下请求/响应的无状态模式。因此,在我们的应用中使用单例是安全的。

然而,在需要考虑请求生命周期的情况下,存在边缘情况.例如,在GraphQL应用的预请求缓存中,以及请求追踪和多租户条件下,注入作用域提供了一个机制来获取需要的提供者生命周期行为.

### [提供者范围](https://docs.nestjs.cn/8/fundamentals?id=提供者范围 "提供者范围")

基本上，**每个提供者都可以作为一个单例**，被请求范围限定，并切换到瞬态模式。请参见下表，以熟悉它们之间的区别。

|             |                                                                          |
| ----------- | ------------------------------------------------------------------------ |
| `DEFAULT`   | 每个提供者可以跨多个类共享。提供者生命周期严格绑定到应用程序生命周期。**一旦应用程序启动，所有提供程序都已实例化**。默认情况下使用单例范围。 |
| `REQUEST`   | 在请求处理完成后，将为每个传入请求和垃圾收集专门创建提供者的新实例                                        |
| `TRANSIENT` | 临时提供者不能在提供者之间共享。每当其他提供者向 `Nest` 容器请求特定的临时提供者时，该容器将创建一个新的专用实例             |

> 使用单例范围始终是**推荐的方法**。请求之间共享提供者可**以降低内存消耗**，从而提高应用程序的性能 **(不需要每次实例化类)。**

### [使用 (Usage)](https://docs.nestjs.cn/8/fundamentals?id=使用-usage "使用 (Usage)")

为了切换到另一个注入范围，您必须向 `@Injectable()` 装饰器传递一个选项对象。

```typescript 
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class CatsService {}
```


在[自定义提供者](https://docs.nestjs.cn/8/fundamentals?id=自定义提供者 "自定义提供者")的情况下，您必须设置一个额外的范围属性。

```typescript 
{
  provide: 'CACHE_MANAGER',
  useClass: CacheManager,
  scope: Scope.TRANSIENT,
}
```


> `Scope`从`@nestjs/common`中导入。

> **网关不应该使用请求范围提供者,因为其必须作为单例提供。每个网关都封装了一个socket并且不能多次实例化。**

**默认使用单例范围,并且不需要声明。** 如果你想声明一个单例范围的提供者,在`scope`属性中使用`Scope.DEFAULT`值。

### [控制器范围](https://docs.nestjs.cn/8/fundamentals?id=控制器范围 "控制器范围")

当**涉及到控制器时，** 传递`ControllerOptions` 对象

```typescript 
@Controller({
  path: 'cats',
  scope: Scope.REQUEST,
})
export class CatsController {}
```


> **网关永远不应该依赖于请求范围的提供者**，因为它们充当单例。**一个网关封装了一个真正的套接字，不能多次被实例化**

### [所有请求注入](https://docs.nestjs.cn/8/fundamentals?id=所有请求注入 "所有请求注入")

必须非常谨慎地使用请求范围的提供者。请记住，`scope` 实际上是在注入链中冒泡的。如果您的**控制器依赖于一个请求范围的提供者，这意味着您的控制器实际上也是请求范围。**

想象一下下面的链: `CatsController <- CatsService <- CatsRepository` 。如果您的 `CatsService` 是请求范围的(从理论上讲，其余的都是单例)，那么 `CatsController` 也将成为请求范围的(因为必须将请求范围的实例注入到新创建的控制器中)，而 `CatsRepository` 仍然是单例的。

> 在这种情况下，循环依赖关系将导致非常痛苦的副作用，因此，您当然应该避免创建它们

### [请求提供者](https://docs.nestjs.cn/8/fundamentals?id=请求提供者 "请求提供者")

在 `HTTP` 应用程序中(例如使用`@nestjs/platform-express`或`@nestjs/platform-fastify`)，当使用请求范围提供者时,可能需要获取原始的请求对象。这通过注入`REQUEST`对象实现:

```typescript 
import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class CatsService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}
}
```


由于底层平台和协议不同，该功能与微服务和 `GraphQL` 应用程序略有不同。在 `GraphQL` 应用程序中，可以注入 `CONTEXT`来替代`REQUEST`。

```typescript 
import { Injectable, Scope, Inject } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';

@Injectable({ scope: Scope.REQUEST })
export class CatsService {
  constructor(@Inject(CONTEXT) private readonly context) {}
}
```


然后，您可以配置您的 `context` 值(在`GraphQLModule`中)，以包含请求作为其属性。

### [性能](https://docs.nestjs.cn/8/fundamentals?id=性能 "性能")

使用**请求范围的提供者将明显影响应用程序性能**。即使 `Nest` 试图缓存尽可能多的元数据，**它仍然必须为每个请求创建类的实例**。因此，它将降低您的平均响应时间和总体基准测试结果。如果您的提供者不一定需要请求范**围，那么您应该坚持使用单例范围。**
