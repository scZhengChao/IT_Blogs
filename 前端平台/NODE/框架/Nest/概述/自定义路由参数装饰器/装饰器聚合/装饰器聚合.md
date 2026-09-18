# 装饰器聚合

`Nest` 提供了一种辅助方法来聚合多个装饰器。例如，假设您要将与身份验证相关的所有装饰器聚合到一个装饰器中。这可以通过以下方法实现：

```nginx 
import { applyDecorators } from '@nestjs/common';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized"' })
  );
}

```


然后，你可以参照以下方式使用 `@Auth()` 自定义装饰器：

```nginx 
@Get('users')
@Auth('admin')
findAllUsers() {}

```


这具有通过一个声明应用所有四个装饰器的效果。

> 来自 `@nestjs/swagger` 依赖中的 `@ApiHideProperty()` 装饰器无法聚合，因此此装饰器无法正常使用 `applyDecorators` 方法。
