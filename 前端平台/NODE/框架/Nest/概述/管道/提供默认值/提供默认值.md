# 提供默认值

`Parse*` 管道期望参数值是被定义的。当接收到 `null` 或者 `undefined` 值时，它们会抛出异常。为了允许端点处理丢失的查询字符串参数值，我们必须在 `Parse*` 管道对这些值进行操作之前注入默认值。`DefaultValuePipe` 提供了这种能力。只需在相关 `Parse*` **管道之前**的 `@Query()` 装饰器中实例化 `DefaultValuePipe`，如下所示：

```javascript 
@Get()
async findAll(
  @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe) activeOnly: boolean,
  @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
) {
  return this.catsService.findAll({ activeOnly, page });
}

```
