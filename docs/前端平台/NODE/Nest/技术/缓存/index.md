# 缓存

## 目录

- [安装#](#安装)
- [内存缓存#](#内存缓存)
- [与缓存存储交互#](#与缓存存储交互)
- [自动缓存响应](#自动缓存响应)
- [自定义缓存](#自定义缓存)
- [全局使用模块](#全局使用模块)
- [全局缓存覆盖](#全局缓存覆盖)
- [WebSocket 和微服务](#WebSocket-和微服务)
- [调整跟踪](#调整跟踪)
- [不同的存储](#不同的存储)

缓存是一项很棒而简单的技术，有助于提高应用的性能。它充当提供高性能数据访问的临时数据存储。

#### 安装[#](https://nest.nodejs.cn/techniques/caching#安装 "#")

首先安装需要的包：

```text 
npm install @nestjs/cache-manager cache-manager
```


> **警告**`cache-manager` 版本 4 对 `TTL (Time-To-Live)` 使用秒。`cache-manager` (v5) 的当前版本已改为使用毫秒。NestJS 不转换值，只是将你提供的 ttl 转发给库。换句话说：
>
> \*   如果使用 `cache-manager` v4，以秒为单位提供 ttl
>
> \*   如果使用 `cache-manager` v5，以毫秒为单位提供 ttl
>
> \*   文档指的是秒，因为 NestJS 是针对缓存管理器版本 4 发布的。

#### 内存缓存[#](https://nest.nodejs.cn/techniques/caching#内存缓存 "#")

`Nest` 为各种缓存存储提供器提供统一的 `API`。内置的是内存数据存储。但是，你可以轻松切换到更全面的解决方案，例如 Redis。

为了启用缓存，导入 `CacheModule` 并调用其 `register()` 方法。

```typescript 
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';

@Module({
  imports: [CacheModule.register()],
  controllers: [AppController],
})
export class AppModule {}
```


#### 与缓存存储交互[#](https://nest.nodejs.cn/techniques/caching#与缓存存储交互 "#")

要与缓存管理器实例交互，请使用 `CACHE_MANAGER` 令牌将其注入你的类，如下所示：

```typescript 
constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
```


> **提示**`Cache` 类是从 `cache-manager` 中导入的，而 `CACHE_MANAGER` 令牌是从 `@nestjs/cache-manager` 包中导入的。

`Cache` 实例（来自 `cache-manager` 包）上的 `get` 方法用于从缓存中检索项目。如果缓存中不存在该项，则返回 `null`。

```javascript 
const value = await this.cacheManager.get('key');
```


要将项目添加到缓存，请使用 `set` 方法：

```javascript 
await this.cacheManager.set('key', 'value');
```


> **注意****内存缓存存储只能存储 **[**结构化克隆算法**](https://web.nodejs.cn/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#javascript_types "结构化克隆算法")** 支持的类型的值。**

缓存的默认过期时间为 5 秒。

你可以为此特定密钥手动指定 TTL（以秒为单位的过期时间），如下所示：

```javascript 
await this.cacheManager.set('key', 'value', 1000);
```


要禁用缓存过期，请将 `ttl` 配置属性设置为 `0`：

```javascript 
await this.cacheManager.set('key', 'value', 0);
```


要从缓存中删除项目，请使用 `del` 方法：

```javascript 
await this.cacheManager.del('key');
```


要清除整个缓存，请使用 `reset` 方法：

```javascript 
await this.cacheManager.reset();
```


#### 自动缓存响应

> **警告**
> 在 [GraphQL](https://nest.nodejs.cn/graphql/quick-start "GraphQL") 应用中，拦截器是为每个字段解析器单独执行的。因此，`CacheModule`（使用拦截器来缓存响应）将无法正常工作。

要启用自动缓存响应，只需将 `CacheInterceptor` 绑定到要缓存数据的位置。

```typescript 
@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  @Get()
  findAll(): string[] {
    return [];
  }
}
```


> **警告**
> 仅缓存 `GET` 端点。此外，注入原生响应对象 (`@Res()`) 的 HTTP 服务器路由不能使用缓存拦截器。有关详细信息，请参阅 [响应映射](https://nest.nodejs.cn/interceptors#response-mapping "响应映射")。

为了减少所需样板文件的数量，你可以将 `CacheInterceptor` 全局绑定到所有端点：

```typescript 
import { Module } from '@nestjs/common';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [CacheModule.register()],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
```


#### 自定义缓存

所有缓存数据都有自己的过期时间 ([TTL](https://en.wikipedia.org/wiki/Time_to_live "TTL"))。要**自定义默认值**，请将选项对象传递给 `register()` 方法。

```typescript 
CacheModule.register({
  ttl: 5, // seconds
  max: 10, // maximum number of items in cache
});
```


#### 全局使用模块

当你想在其他模块中使用 `CacheModule` 时，你需要导入它（这是任何 Nest 模块的标准）。或者，通过将选项对象的 `isGlobal` 属性设置为 `true` 来将其声明为 [全局模块](https://nest.nodejs.cn/modules#global-modules "全局模块")，如下所示。在这种情况下，一旦 `CacheModule` 被加载到根模块（例如，`AppModule`）中，你就不需要在其他模块中导入它。

```typescript 
CacheModule.register({
  isGlobal: true,
});
```


#### 全局缓存覆盖

启用全局缓存后，缓存条目存储在根据路由路径自动生成的 `CacheKey` 下。你可以在每个方法的基础上覆盖某些缓存设置（`@CacheKey()` 和 `@CacheTTL()`），从而允许为各个控制器方法自定义缓存策略。这在使用 [不同的缓存存储。](https://nest.nodejs.cn/techniques/caching#different-stores "不同的缓存存储。") 时可能最相关

你可以根据每个控制器应用 `@CacheTTL()` 装饰器来为整个控制器设置缓存 TTL。在定义了控制器级和方法级缓存 TTL 设置的情况下，在方法级别指定的缓存 TTL 设置将优先于在控制器级别设置的设置。

```typescript 
@Controller()
@CacheTTL(50)
export class AppController {
  @CacheKey('custom_key')
  @CacheTTL(20)
  findAll(): string[] {
    return [];
  }
}
```


> **提示**`@CacheKey()` 和 `@CacheTTL()` 装饰器是从 `@nestjs/cache-manager` 包导入的。

`@CacheKey()` 装饰器可以与或不与相应的 `@CacheTTL()` 装饰器一起使用，反之亦然。可以选择仅覆盖 `@CacheKey()` 或仅覆盖 `@CacheTTL()`。未被装饰器覆盖的设置将使用全局注册的默认值（参见 [自定义缓存](https://nest.nodejs.cn/techniques/caching#customize-caching "自定义缓存")）。

#### WebSocket 和微服务

你还可以将 `CacheInterceptor` 应用于 WebSocket 订阅者以及微服务的模式（无论使用何种传输方法）。

```typescript 
@CacheKey('events')
@UseInterceptors(CacheInterceptor)
@SubscribeMessage('events')
handleEvent(client: Client, data: string[]): Observable<string[]> {
  return [];
}
```


但是，需要额外的 `@CacheKey()` 装饰器来指定用于随后存储和检索缓存数据的键。另外，请注意，你不应该缓存所有内容。执行某些业务操作而不是简单地查询数据的操作不应该被缓存。

此外，你可以使用 `@CacheTTL()` 装饰器指定缓存过期时间 (TTL)，这将覆盖全局默认 TTL 值。

```typescript 
@CacheTTL(10)
@UseInterceptors(CacheInterceptor)
@SubscribeMessage('events')
handleEvent(client: Client, data: string[]): Observable<string[]> {
  return [];
}
```


> **提示**`@CacheTTL()` 装饰器可以与相应的 `@CacheKey()` 装饰器一起使用，也可以不与相应的 `@CacheKey()` 装饰器一起使用。

#### 调整跟踪

默认情况下，Nest 使用请求 URL（在 HTTP 应用中）或缓存键（在 websockets 和微服务应用中，通过 `@CacheKey()` 装饰器设置）将缓存记录与你的端点相关联。然而，有时你可能希望根据不同因素设置跟踪，例如，使用 HTTP 标头（例如 `Authorization` 以正确识别 `profile` 端点）。

为此，创建 `CacheInterceptor` 的子类并覆盖 `trackBy()` 方法。

```typescript 
@Injectable()
class HttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    return 'key';
  }
}
```


#### 不同的存储

该服务在底层利用了 [cache-manager](https://github.com/node-cache-manager/node-cache-manager "cache-manager")。`cache-manager` 包支持作用域广泛的有用存储，例如 [Redis 存储](https://github.com/dabroek/node-cache-manager-redis-store "Redis 存储")。[此处](https://github.com/node-cache-manager/node-cache-manager#store-engines "此处") 提供了受支持存储的完整列表。要设置 Redis 存储，只需将包和相应的选项一起传递给 `register()` 方法。
