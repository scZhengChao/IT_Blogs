# Headers

要指定**自定义响应头**，可以使用 `@header()` 装饰器或类库特有的响应对象，（或直接调用 `res.header()`）。

```typescript 
@Post()
@Header('Cache-Control', 'none')
create() {
  return 'This action adds a new cat';
}

```


> `Header` 需要从` @nestjs/common` 包导入。
