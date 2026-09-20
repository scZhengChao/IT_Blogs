# 延迟加载模块

## 目录

- [入门](#入门)
- [延迟加载控制器、网关和解析器#](#延迟加载控制器网关和解析器)
- [常见用例](#常见用例)

默认情况下，模块是预先加载的，这意味着一旦应用加载，所有模块也会加载，无论它们是否立即需要。虽然这对于大多数应用来说没问题，但它可能会成为在无服务器环境中运行的应用/工作进程的瓶颈，其中启动延迟 ("冷启动") 至关重要。

延迟加载可以通过仅加载特定无服务器函数调用所需的模块来帮助减少引导时间。此外，你还可以在无服务器功能为 "warm" 时异步加载其他模块，以进一步加快后续调用的引导时间（延迟模块注册）。

> **提示**如果你熟悉 [Angular](https://angular.dev/ "Angular") 框架，你之前可能见过“[延迟加载模块](https://angular.dev/guide/ngmodules/lazy-loading#lazy-loading-basics "延迟加载模块")”术语。请注意，此技术在 Nest 中的功能有所不同，因此请将其视为具有相似命名约定的完全不同的功能。

> **警告**请注意，延迟加载的模块和服务中不会调用 [生命周期钩子方法](https://nest.nodejs.cn/fundamentals/lifecycle-events "生命周期钩子方法")。

#### 入门

为了按需加载模块，Nest 提供了 `LazyModuleLoader` 类，可以以正常方式注入到类中：

```typescript 
@Injectable()
export class CatsService {
  constructor(private lazyModuleLoader: LazyModuleLoader) {}
}
```


> **提示**`LazyModuleLoader` 类是从 `@nestjs/core` 包中导入的。

或者，你可以从应用引导程序文件 (`main.ts`) 中获取对 `LazyModuleLoader` 提供程序的引用，如下所示：

```typescript 
// "app" represents a Nest application instance
const lazyModuleLoader = app.get(LazyModuleLoader);
```


有了这个，你现在可以使用以下结构加载任何模块：

```typescript 
const { LazyModule } = await import('./lazy.module');
const moduleRef = await this.lazyModuleLoader.load(() => LazyModule);
```


**提示**"延迟加载" 模块在第一次 `LazyModuleLoader#load` 方法调用时被缓存。这意味着，每次连续尝试加载 `LazyModule` 将非常快，并且将返回缓存的实例，而不是再次加载模块。

```bash 
Load "LazyModule" attempt: 1
time: 2.379ms
Load "LazyModule" attempt: 2
time: 0.294ms
Load "LazyModule" attempt: 3
time: 0.303ms
```


此外，"**延迟加载" 模块**与那些在应用引导程序中**预加载的模块**以及稍后在你的应用中注册的**任何其他惰性模块共享相同的模块图。**

其中 `lazy.module.ts` 是导出常规 Nest 模块的 TypeScript 文件（无需额外更改）。

`LazyModuleLoader#load` 方法返回 [模块参考](https://nest.nodejs.cn/fundamentals/module-ref "模块参考")（属于 `LazyModule`），它允许你导航内部提供器列表并使用其注入令牌作为查找键获取对任何提供器的引用。

例如，假设我们有一个具有以下定义的 `LazyModule`：

```typescript 
@Module({
  providers: [LazyService],
  exports: [LazyService],
})
export class LazyModule {}
```


> **提示**
> 延迟加载的模**块不能注册为全局模块**，因为它根本没有意义（因为当所有静态注册的模块都已实例化时，它们是按需延迟注册的）。同样，注册的全局增强器（守卫/拦截器/等）也将无法正常工作。

有了这个，我们可以获得对 `LazyService` 提供器的引用，如下所示：

```typescript 
const { LazyModule } = await import('./lazy.module');
const moduleRef = await this.lazyModuleLoader.load(() => LazyModule);

const { LazyService } = await import('./lazy.service');
const lazyService = moduleRef.get(LazyService);
```


> **警告**
> 如果你使用 Webpack，请确保更新你的 `tsconfig.json` 文件 - 将 `compilerOptions.module` 设置为 `"esnext"` 并添加 `compilerOptions.moduleResolution` 属性并使用 `"node"` 作为值：

```json 
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "node",
    ...
  }
}
```


设置这些选项后，你将能够利用 [代码拆分](https://webpack.js.org/guides/code-splitting/ "代码拆分") 功能。

#### 延迟加载控制器、网关和解析器[#](https://nest.nodejs.cn/fundamentals/lazy-loading-modules#延迟加载控制器、网关和解析器 "#")

由于 Nest 中的控制器（或 GraphQL 应用中的解析器）表示**路由/路径/主题（或查询/修改）集**，因此你无法使用 `LazyModuleLoader` 类**延迟加载它们。**

> **警告**
> 在延迟加载模块内注册的控制器、[resolvers](https://nest.nodejs.cn/graphql/resolvers "resolvers") 和 [gateways](https://nest.nodejs.cn/websockets/gateways "gateways") 将不会按预期运行。同样，你不能按需注册中间件函数（通过实现 `MiddlewareConsumer` 接口）。

例如，假设你正在使用底层的 Fastify 驱动程序（使用 `@nestjs/platform-fastify` 包）构建一个 REST API（HTTP 应用）。Fastify 不允许你在应用准备好/成功监听消息后注册路由。这意味着即使我们分析了在模块控制器中注册的路由映射，所有延迟加载的路由也将无法访问，因为无法在运行时注册它们。

同样，我们作为 `@nestjs/microservices` 包的一部分提供的一些传输策略（包括 Kafka、gRPC 或 RabbitMQ）需要在建立连接之前订阅/收听特定主题/通道。一旦你的应用开始收听消息，框架将无法订阅/收听新主题。

最后，启用了代码优先方法的 `@nestjs/graphql` 包会根据元数据自动即时生成 GraphQL 模式。这意味着，它需要预先加载所有类。否则，将无法创建适当的、有效的模式。

#### 常见用例

最常见的情况是，当你的 `worker/cron` 作业/`lambda` 和无服务器函数/`webhook` 必须根据**输入参数（路由路径/日期/查询参数等）触发不同的服务（不同的逻辑）时**，你会看到延迟加载的模块。另一方面，**延迟加载模块对于整体应用可能没有太大意义，因为启动时间与整体应用无关。**
