# Request请求对象

处理程序有时需要访问客户端的**请求**细节。Nest 提供了对底层平台（默认为 `Express`）的[**请求对象**](http://expressjs.com/en/api.html#req "请求对象")（`request`）的**访问方式。** 我们可以在处理函数的签名中使用`@Req()` 装饰器，指示 Nest 将请求对象注入处理程序。

```typescript title="cats.controller.ts"
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
}

```


> 为了在 `express` 中使用 `Typescript` （如 `request: Request` 上面的参数示例所示），请安装 `@types/express` 。

`Request` 对象代表 `HTTP` 请求，并具有**查询字符串，请求参数**，**HTTP 标头**（HTTP header） 和 **正文（**HTTP body）的属性（在[这里](https://expressjs.com/en/api.html#req "这里")阅读更多）。在**多数情况下，不必手动获取它们**。 我们可以**使用专用的装饰器**，比如开箱即用的 `@Body()` 或 `@Query()` 。 下面是 Nest 提供的装饰器及其代表的底层平台特定对象的对照列表。

|                           |                                   |
| ------------------------- | --------------------------------- |
| `@Request()，@Req()`       | `req`                             |
| `@Response()，@Res()`      | `res`                             |
| `@Next()`                 | `next`                            |
| `@Session()`              | `req.session`                     |
| `@Param(key?: string)`    | `req.params`/`req.params[key]`    |
| `@Body(key?: string)`     | `req.body`/`req.body[key]`        |
| `@Query(key?: string)`    | `req.query`/`req.query[key]`      |
| `@Headers(name?: string)` | `req.headers`/`req.headers[name]` |
| `@Ip()`                   | `req.ip`                          |
| `@HostParam()`            | `req.hosts`                       |

为了与底层 HTTP 平台（例如，`Express` 和 `Fastify`）之间的类型兼容， Nest 提供了 `@Res()`和 `@Response()` 装饰器。`@Res()` 只是 `@Response()` 的**别名。**两者都直接暴露了底层平台的 `response` 对象接口。在使用它们时，您还应该**导入底层库的类型声明**（如：`@types/express`）以充分利用它们。需要注意的是，**在请求处理函数中注入** `@Res()`或 `@Response()` 时，会将 Nest 置于该处理函数的**特定于库**（Library-specific mode）的模式下，**并负责管理响应。** 这样做时，\*\*必须通过调用****`response`**** 对象（例如，****`res.json(…)`**** 或 ****`res.send(…)`****）发出某种响应，\*\***否则 HTTP 服务器将挂起。**
