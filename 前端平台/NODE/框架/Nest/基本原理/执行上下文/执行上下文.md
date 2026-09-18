# 执行上下文

## 目录

- [执行上下文](#执行上下文)
  - [ArgumentsHost 类](#ArgumentsHost-类)
  - [当前应用上下文#](#当前应用上下文)
  - [主机处理程序参数](#主机处理程序参数)
  - [执行上下文类#](#执行上下文类)
  - [反射和元数据#](#反射和元数据)
  - [底层方法](#底层方法)

### 执行上下文

`Nest` 提供了几个实用程序类，有助于轻松编写跨多个应用上下文（例如，基于 `Nest HTTP` 服务器、微服务和 `WebSockets` 应用上下文）运行的应用。这些**实用程序提供有关当前执行上下文的信息**，这些信息可用于构建通用的 [guards](https://nest.nodejs.cn/guards "guards")、[filters](https://nest.nodejs.cn/exception-filters "filters") 和 [interceptors](https://nest.nodejs.cn/interceptors "interceptors")，它们可以跨广泛的控制器、方法和执行上下文集工作。

我们在本章中介绍了两个这样的类：`ArgumentsHost` 和 `ExecutionContext`。

#### ArgumentsHost 类

`ArgumentsHost` 类提供了用于检索传递给处理程序的参数的方法。它允许选择适当的上下文（例如 HTTP、RPC（微服务）或 WebSockets）以从中检索参数。该框架在你可能想要访问它的地方提供了一个 `ArgumentsHost` 的实例，通常作为 `host` 参数引用。例如，使用 `ArgumentsHost` 实例调用 [异常过滤器](https://nest.nodejs.cn/exception-filters#arguments-host "异常过滤器") 的 `catch()` 方法。

`ArgumentsHost` 只是作为处理程序参数的抽象。例如，对于 HTTP 服务器应用（当使用 `@nestjs/platform-express` 时），`host` 对象封装了 Express 的 `[request, response, next]` 数组，其中 `request` 是请求对象，`response` 是响应对象，`next` 是控制应用请求-响应周期的函数。另一方面，对于 [GraphQL](https://nest.nodejs.cn/graphql/quick-start "GraphQL") 应用，`host` 对象包含 `[root, args, context, info]` 数组。

#### 当前应用上下文[#](https://nest.nodejs.cn/fundamentals/execution-context#当前应用上下文 "#")

在构建旨在**跨多个应用上下文运行的通用** [guards](https://nest.nodejs.cn/guards "guards")、[filters](https://nest.nodejs.cn/exception-filters "filters") 和 [interceptors](https://nest.nodejs.cn/interceptors "interceptors")时，我们需要一种方法来**确定我们的方法当前运行的应用类型。** 使用`ArgumentsHost` 的 `getType()` 方法执行此操作：

```typescript 
if (host.getType() === 'http') {
  // do something that is only important in the context of regular HTTP requests (REST)
} else if (host.getType() === 'rpc') {
  // do something that is only important in the context of Microservice requests
} else if (host.getType<GqlContextType>() === 'graphql') {
  // do something that is only important in the context of GraphQL requests
}
```


> 提示
> `GqlContextType` 是从 `@nestjs/graphql` 包导入的。

有了可用的应用类型，我们可以编写更通用的组件，如下所示。

#### 主机处理程序参数

要检索传递**给处理程序的参数数组**，一种方法是使用宿主对象的 `getArgs()` 方法。

```typescript 
const [req, res, next] = host.getArgs();
```


你可以使用 `getArgByIndex()` 方法按索引提取特定参数：

```typescript 
const request = host.getArgByIndex(0);
const response = host.getArgByIndex(1);
```


在这些示例中，我们通过索引检索请求和响应对象，这通常不被推荐，因为它将应用耦合到特定的执行上下文。相反，你可以通过使用 `host` 对象的实用方法之一切换到适合你的应用的应用上下文，从而使你的代码更加健壮和可重用。上下文切换实用程序方法如下所示。

```typescript 
/**

 * Switch context to RPC.
 */
switchToRpc(): RpcArgumentsHost;
/**

 * Switch context to HTTP.
 */
switchToHttp(): HttpArgumentsHost;
/**

 * Switch context to WebSockets.
 */
switchToWs(): WsArgumentsHost;
```


让我们使用 `switchToHttp()` 方法重写前面的示例。`host.switchToHttp()` 辅助程序调用返回适合 HTTP 应用上下文的 `HttpArgumentsHost` 对象。`HttpArgumentsHost` 对象有两个有用的方法可以用来提取所需的对象。在这种情况下，我们还使用 Express 类型断言来返回原生 Express 类型的对象：

```typescript 
const ctx = host.switchToHttp();
const request = ctx.getRequest<Request>();
const response = ctx.getResponse<Response>();
```


同样，`WsArgumentsHost` 和 `RpcArgumentsHost` 具有在微服务和 WebSockets 上下文中返回适当对象的方法。以下是 `WsArgumentsHost` 的方法：

```typescript 
export interface WsArgumentsHost {
  /**

   * Returns the data object.
   */
  getData<T>(): T;
  /**

   * Returns the client object.
   */
  getClient<T>(): T;
}
```


以下是 `RpcArgumentsHost` 的方法：

```typescript 
export interface RpcArgumentsHost {
  /**

   * Returns the data object.
   */
  getData<T>(): T;

  /**

   * Returns the context object.
   */
  getContext<T>(): T;
}
```


#### 执行上下文类[#](https://nest.nodejs.cn/fundamentals/execution-context#执行上下文类 "#")

`ExecutionContext` 扩展 `ArgumentsHost`，提供有关当前执行过程的更多详细信息。与 `ArgumentsHost` 一样，Nest 在你可能需要的地方提供了 `ExecutionContext` 的实例，例如 [guard](https://nest.nodejs.cn/guards#execution-context "guard") 的 `canActivate()` 方法和 [interceptor](https://nest.nodejs.cn/interceptors#execution-context "interceptor") 的 `intercept()` 方法。它提供了以下方法：

```typescript 
export interface ExecutionContext extends ArgumentsHost {
  /**

   * Returns the type of the controller class which the current handler belongs to.
   */
  getClass<T>(): Type<T>;
  /**

   * Returns a reference to the handler (method) that will be invoked next in the

   * request pipeline.
   */
  getHandler(): Function;
}
```


`getHandler()` 方法返回对**即将被调用的处理程序的引用**。`getClass()` 方法返回此特定处理程序所属的 `Controller`\*\* 类的类型\*\*。例如，在 HTTP 上下文中，如果当前处理的请求是 `POST` 请求，绑定到 `CatsController` 上的 `create()` 方法，则 `getHandler()` 返回对 `create()` 方法的引用，`getClass()` 返回 `CatsController` 类（不是实例）。

```typescript 
const methodKey = ctx.getHandler().name; // "create"
const className = ctx.getClass().name; // "CatsController"
```


访问对当前类和处理程序方法的引用的能力提供了极大的灵活性。最重要的是，它使我们有机会通过 `Reflector#createDecorator` 创建的装饰器或来自守卫或拦截器内的内置 `@SetMetadata()` 装饰器来访问元数据集。我们在下面介绍了这个用例。

#### 反射和元数据[#](https://nest.nodejs.cn/fundamentals/execution-context#反射和元数据 "#")

Nest 提供了通过 `Reflector.createDecorator` 方法创建的装饰器和内置 `@SetMetadata()`装饰器将**自定义元数据附加到路由处理程序的功能。** 在本节中，我们将比较这两种方法，并了解如何从防护程序或拦截器中访问元数据。

要使用 `Reflector#createDecorator` 创建强类型装饰器，我们需要指定类型参数。例如，让我们创建一个 `Roles` 装饰器，它将字符串数组作为参数。

```typescript 
import { Reflector } from '@nestjs/core';

export const Roles = Reflector.createDecorator<string[]>();
```


这里的 `Roles` 装饰器是一个接受 `string[]` 类型的单个参数的函数。

现在，要使用这个装饰器，我们只需用它注释处理程序：

```typescript 
@Post()
@Roles(['admin'])
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```


这里我们将 `Roles` 装饰器元数据附加到 `create()` 方法，表明只有具有 `admin` 角色的用户才可以访问此路由。

要**访问路由的角色（自定义元数据）**，我们**将再次使用 ****`Reflector`**** 辅助程序类**。`Reflector` 可以通过正常方式注入到一个类中：

```typescript 
@Injectable()
export class RolesGuard {
  constructor(private reflector: Reflector) {}
}
```


**提示**`Reflector` 类是从 `@nestjs/core` 包中导入的。

现在，要读取处理程序元数据，请使用 get() 方法：

```typescript 
const roles = this.reflector.get(Roles, context.getHandler());
```


`Reflector.get` 方法允许我们通过传入两个参数轻松访问元数据：**装饰器引用和从中检索元数据的上下文**（装饰器目标）。在这个例子中，指定的装饰器是 `Roles`（参考上面的 `roles.decorator.ts` 文件）。上下文由对 `context.getHandler()` 的调用提供，这会导致为当前处理的路由处理程序提取元数据。请记住，`getHandler()` 为我们**提供了路由处理函数的引用**。

者，我们可以通过在控制器级别应用元数据来组织我们的控制器，应用于控制器类中的所有路由。

```typescript 
@Roles(['admin'])
@Controller('cats')
export class CatsController {}
```


在这种情况下，为了提取控制器元数据，我们将 `context.getClass()` 作为第二个参数传递（以提供控制器类作为元数据提取的上下文）而不是 `context.getHandler()`：

```typescript 
const roles = this.reflector.get(Roles, context.getClass());
```


鉴于在多个级别提供元数据的能力，你可能需要从多个上下文中提取和合并元数据。`Reflector` 类提供了两个实用方法来帮助解决这个问题。这些方法同时提取控制器和方法元数据，并以不同的方式组合它们。

考虑以下场景，你在两个级别都提供了 `Roles` 元数据。

```typescript 
@Roles(['user'])
@Controller('cats')
export class CatsController {
  @Post()
  @Roles(['admin'])
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }
}
```


如果你打算将 `'user'` 指定为默认角色，并针对某些方法有选择地覆盖它，你可能会使用 `getAllAndOverride()` 方法。

```typescript 
const roles = this.reflector.getAllAndOverride(Roles, [context.getHandler(), context.getClass()]);
```


使用此代码的守卫，在具有上述元数据的 `create()` 方法的上下文中运行，将导致 `roles` 包含 `['admin']`。

要获取两者的元数据并将其合并（此方法合并数组和对象），请使用 `getAllAndMerge()` 方法：

```typescript 
const roles = this.reflector.getAllAndMerge(Roles, [context.getHandler(), context.getClass()]);
```


这将导致 `roles` 包含 `['user', 'admin']`。

对于这两种合并方法，你将元数据键作为第一个参数传递，并将元数据目标上下文数组（即对 `getHandler()` 和/或 `getClass()` 方法的调用）作为第二个参数传递。

#### 底层方法

如前所述，你还可以使用内置的 `@SetMetadata()` 装饰器来将元数据附加到处理程序，而不是使用 `Reflector#createDecorator`。

```typescript 
@Post()
@SetMetadata('roles', ['admin'])
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```


**提示**`@SetMetadata()` 装饰器是从 `@nestjs/common` 包导入的。

通过上面的构造，我们将 `roles` 元数据（`roles` 是元数据键，`['admin']` 是关联值）附加到 `create()` 方法。虽然这可行，但在你的路由中直接使用 `@SetMetadata()` 并不是好的做法。相反，你可以创建自己的装饰器，如下所示：

```typescript 
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
```


这种方法更简洁、更具可读性，并且有点类似于 `Reflector#createDecorator` 方法。不同之处在于，使用 `@SetMetadata`，你可以更好地控制元数据键和值，并且还可以创建采用多个参数的装饰器。

现在我们有了一个自定义的 `@Roles()` 装饰器，我们可以用它来装饰 `create()` 方法。

```typescript 
@Post()
@Roles('admin')
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```


要访问路由的角色（自定义元数据），我们将再次使用 `Reflector` 辅助程序类：

```typescript 
@Injectable()
export class RolesGuard {
  constructor(private reflector: Reflector) {}
}
```


**提示**`Reflector` 类是从 `@nestjs/core` 包中导入的。

现在，要读取处理程序元数据，请使用 `get()` 方法。

```typescript 
const roles = this.reflector.get<string[]>('roles', context.getHandler());
```


这里我们没有传递装饰器引用，而是传递元数据键作为第一个参数（在我们的例子中是 `'roles'`）。其他一切与 `Reflector#createDecorator` 示例中的相同。
