# 传递数据

当装饰器的行为取决于某些条件时，可以使用 `data` 参数将参数传递给装饰器的工厂函数。 一个用例是自定义装饰器，它**通过键从请求对象中提取属**性。 例如，假设我们的身份验证层验证请求并将用户实体附加到请求对象。 经过身份验证的请求的用户实体可能类似于：

```nginx 
{
  "id": 101,
  "firstName": "Alan",
  "lastName": "Turing",
  "email": "alan@email.com",
  "roles": ["admin"]
}

```


让我们定义一个将属性名作为键的装饰器，如果存在则返回关联的值（如果不存在或者尚未创建 `user` 对象，则返回 undefined）。

```nginx title="user.decorator.ts"
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;

  return data ? user && user[data] : user;
});

```


然后，您可以通过控制器中的 `@User()` 装饰器访问以下特定属性：

```nginx 
@Get()
async findOne(@User('firstName') firstName: string) {
  console.log(`Hello ${firstName}`);
}

```


您可以使用具有不同键的相同装饰器来访问不同的属性。如果用户对象复杂，使用此方法可以使请求处理程序编写更容易、并且可读性更高。

> 对于 `TypeScript` 用户，请注意这 `createParamDecorator<T>()` 是通用的。`这意味着您可以显式实施类型安全性，例如`createParamDecorator\<string>((data, ctx) => ...)`或者，在工厂函数中指定参数类型，例如`createParamDecorator((data: string, ctx) => ...)`。如果省略这两个， 参数`data`的类型为`any\`。
