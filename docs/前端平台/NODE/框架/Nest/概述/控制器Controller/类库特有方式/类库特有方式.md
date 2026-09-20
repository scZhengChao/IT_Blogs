# 类库特有方式

到目前为止，我们已经讨论了 `Nest` **操作响应的标准方式**。操作响应的第二种方法是使用**类库特有的**[响应对象](http://expressjs.com/en/api.html#res "响应对象")[(Response)](http://expressjs.com/en/api.html#res "(Response)")。为了注入特定的响应对象，我们需要使用 `@Res()` 装饰器。为了对比差异，让我们来重写 `CatsController`：

```typescript title="cats.controller.ts"
import { Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Res() res: Response) {
    res.status(HttpStatus.CREATED).send();
  }

  @Get()
  findAll(@Res() res: Response) {
    res.status(HttpStatus.OK).json([]);
  }
}

```


尽管此方法有效，并且实际上通过提供**对响应对象的完全控制**（标头操作，特定于库的功能等）在某些方面提供了更大的灵活性，但应谨慎使用此种方法。通常来说，这种方式非常不清晰，并且有一些缺点 **。 主要的缺点是你的代码变得依赖于平台**（因为不同的底层库在响应对象（Response）上可能具有不同的 API），并且更加难以测试（您必须模拟响应对象等）。

而且，在上面的示例中，你失去**与依赖于 Nest 标准响应处理的 Nest 功能**（例如，拦截器（`Interceptors`） 和 `@HttpCode()`/`@Header()` 装饰器）的兼容性。**要解决此问题**，可以将 `passthrough` 选项设置为 `true`，如下所示：

```typescript 
@Get()
findAll(@Res({ passthrough: true }) res: Response) {
  res.status(HttpStatus.OK);
  return [];
}

```


现在，你就能与底层框架原生的响应对象（Response）进行交互（例如，根据特定条件设置 Cookie 或 HTTP 头），**并将剩余的部分留给 Nest 处理。**
