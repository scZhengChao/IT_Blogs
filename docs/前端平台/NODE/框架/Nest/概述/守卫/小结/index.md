# 小结

让我们再次回到 `RolesGuard` 。 它只是在所有情况下返回 `true`，到目前为止允许请求继续。我们希望根据分配给当前用户的角色与正在处理的当前路由所需的实际角色之间的比较来设置返回值的条件。 **为了访问路由的角色(自定义元数据)**，我们将使用在 `@nestjs/core` 中提供的 `Reflector` 帮助类。

```nginx 
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return matchRoles(roles, user.roles);
  }
}

```


> 在 `node.js` 世界中，将授权用户附加到 `request` 对象是一种常见的做法。 因此，在上面的示例代码中。我们假设 `request.user` 包含用户实例和允许的角色。 在您的应用中，您可能会在自定义身份验证（或中间件）中建立该关联。查阅[此处](https://docs.nestjs.cn/10/security?id=认证（authentication） "此处")以了解更多。

> matchRoles() 函数内部的逻辑可以根据需要简单或复杂。该示例的重点是显示防护如何适应请求/响应周期。

查阅**执行上下文**章节的\[反射和元数据]部分，以了解如何以上下文相关(context-sensitive)的方式利用 `Reflector` 。

当权限不足的用户请求端点时，Nest 会自动返回以下响应：

```nginx 
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}

```


其背后的原理是，当守卫返回 `false` 时，框架会抛出一个 `ForbiddenException` 异常。如果您想要返回不同的错误响应，你应该抛出一个你自己的准确声明的异常。

```nginx 
throw new UnauthorizedException();

```


由**守卫引发的任何异常**都将由[**异常层**](https://docs.nestjs.cn/10/exceptionfilters "异常层")(全局异常过滤器和应用于当前上下文的任何异常过滤器)处理。

> 如果你正在寻找有关如何实现授权的真实示例，请查看[本章](https://docs.nestjs.cn/10/security?id=权限（authorization） "本章")。
