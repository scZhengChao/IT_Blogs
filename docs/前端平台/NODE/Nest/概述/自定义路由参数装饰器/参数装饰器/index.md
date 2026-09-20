# 参数装饰器

`Nest` 提供了一组非常实用的参数装饰器，可以结合 `HTTP` 路由处理器（`route handlers`）一起使用。下面的列表展示了`Nest` 装饰器和原生 `Express`（或 `Fastify`）中相应对象的映射。

|                            |                                    |
| -------------------------- | ---------------------------------- |
| `@Request()，@Req()`        | `req`                              |
| `@Response()，@Res()`       | `res`                              |
| `@Next()`                  | `next`                             |
| `@Session()`               | `req.session`                      |
| `@Param(param?: string)`   | `req.params / req.params[param]`   |
| `@Body(param?: string)`    | `req.body / req.body[param]`       |
| `@Query(param?: string)`   | `req.query / req.query[param]`     |
| `@Headers(param?: string)` | `req.headers / req.headers[param]` |
| `@Ip()`                    | `req.ip`                           |
| `@HostParam()`             | `req.hosts`                        |

另外，你还可以创建**自定义装饰器**。这非常有用。

在 `Node.js` 中，会经常将需要**传递的值加到请求对象的属性中**。然后在每个路由处理程序中手动提取它们，使用如下代码：

```nginx 
const user = req.user;

```


为了使代码更具可读性和透明性，我们可以创建一个 `@User()` 装饰器并在所有控制器中使用它。

```nginx title="user.decorator.ts"
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});

```


现在你可以在任何你想要的地方很方便地使用它。

```typescript 
@Get()
async findOne(@User() user: UserEntity) {
  console.log(user);
}
```
