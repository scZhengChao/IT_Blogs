# 绑定管道

为了使用管道，我们需要将一个管道类的实例绑定到合适的情境。在我们的 `ParseIntPipe` 示例中，我们希望将管道与特定的路由处理程序方法相关联，并确保它在该方法被调用之前运行。我们使用以下构造来实现，并其称为在方法参数级别绑定管道:

```typescript 
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}

```


这确保了我们在 `findOne()` 方法中接收的参数是一个数字(与 `this.catsService.findOne()` 方法的诉求一致)，或者在路由处理程序被调用之前抛出异常。

举个例子，假设路由是这样子的

```typescript 
GET localhost:3000/abc

```


Nest将会抛出这样的异常:

```typescript 
{
  "statusCode": 400,
  "message": "Validation failed (numeric string is expected)",
  "error": "Bad Request"
}

```


这个异常阻止了 `findOne()` 方法的执行。

在上述例子中，我们传递了一个类(`ParseIntPipe`)，而不是一个实例，将实例化留给框架去处理，做到了依赖注入。对于管道和守卫，我们也可以选择传递一个实例。如果我们想通过传递选项来自定义内置管道的行为，传递实例很有用：

```typescript 
@Get(':id')
async findOne(
  @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
  id: number,
) {
  return this.catsService.findOne(id);
}

```


绑定其他转换管道(即所有 `Parse*` 管道)的方法类似。这些管道都在验证路由参数、查询字符串参数和请求体正文值的情境中工作。

验证查询字符串参数的例子：

```typescript 
@Get()
async findOne(@Query('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}

```


使用 `ParseUUIDPipe` 解析字符串并验证是否为UUID的例子

```typescript 
@Get(':uuid')
async findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
  return this.catsService.findOne(uuid);
}

```


> 当使用 `ParseUUIDPipe()` 时，将解析版本3、版本4或版本5的UUID，如果你只需要特定版本的UUID，你可以在管道选项中传递版本。

上文我们看到的例子都是绑定不同的 `Parse*` 系列内置管道。绑定验证管道有一些不同；我们将在后续篇章讨论。

> 此外，可前往[验证技术](https://docs.nestjs.cn/10/techniques?id=验证 "验证技术")章节查阅验证管道的大量例子。
