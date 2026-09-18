# 状态码

如上所述，默认情况下，响应的**状态码**总是默认为 **200**，除了 POST 请求（默认响应状态码为 **201**），我们可以通过在处理函数外添加 `@HttpCode（...）` **装饰器来轻松更改此行为。**

```typescript 
@Post()
@HttpCode(204)
create() {
  return 'This action adds a new cat';
}

```


> `HttpCode` 需要从 `@nestjs/common` 包导入。

通常，状态码不是固定的，而是取决于各种因素。在这种情况下，您可以使用类库特有（library-specific）的 **`response`** （通过 `@Res()`注入 ）对象（或者在出现错误时，抛出异常）。
