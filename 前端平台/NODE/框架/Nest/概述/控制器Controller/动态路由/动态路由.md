# 动态路由

当您需要接受**动态数据**（dynamic data）作为请求的一部分时（例如，使用`GET /cats/1` 来获取 id 为 `1` 的 `cat`），带有静态路径的路由将无法工作。为了定义带参数的路由，我们可以在路由路径中添加路由参数**标记**（token）以捕获请求 URL 中该位置的动态值。下面的 `@Get()` 装饰器示例中的路由参数标记（route parameter token）演示了此用法。以这种方式声明的路由参数可以使用 `@Param()` 装饰器访问，该装饰器应添加到函数签名中。

```typescript 
@Get(':id')
findOne(@Param() params): string {
  console.log(params.id);
  return `This action returns a #${params.id} cat`;
}

```


`@Param()` 用于修饰一个方法的参数（上面示例中的 `params`），并在该方法内将**路由参数**作为被修饰的方法参数的属性。如上面的代码所示，我们可以通过引用 `params.id`来访问（路由路径中的） `id` 参数。 您还可以将特定的参数标记传递给装饰器，然后在方法主体中按参数名称直接引用路由参数。

> `Param` 需要从 `@nestjs/common` 包导入。

```typescript 
@Get(':id')
findOne(@Param('id') id): string {
  return `This action returns a #${id} cat`;
}

```
