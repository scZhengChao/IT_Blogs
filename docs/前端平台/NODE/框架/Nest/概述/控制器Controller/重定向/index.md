# 重定向

要将响应重定向到特定的 `URL`，可以使用 `@Redirect()` 装饰器或特定于库的响应对象（或直接调用 `res.redirect()`）。

`@Redirect()` 装饰器有两个可选参数，`url` 和 `statusCode`。 如果省略，则 `statusCode` 默认为 `302`。

```typescript 
@Get()
@Redirect('https://nestjs.com', 301)

```


有时您可能想动态地决定 `HTTP` 状态代码或重定向 URL。通过**从路由处理方法**返回一个如下格式的对象：

```json 
{
  "url": string,
  "statusCode": number
}

```


返回的值将**覆盖传递给** `@Redirect()`装饰器的所有参数。 例如：

```typescript 
@Get('docs')
@Redirect('https://docs.nestjs.com', 302)
getDocs(@Query('version') version) {
  if (version && version === '5') {
    return { url: 'https://docs.nestjs.com/v5/' };
  }
}

```
