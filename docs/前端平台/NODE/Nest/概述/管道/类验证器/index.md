# 类验证器

> 本节中的技术需要 `TypeScript` ，如果您的应用是使用原始 `JavaScript`编写的，则这些技术不可用。

让我们看一下验证的另外一种实现方式。

`Nest` 与 [**class-validator**](https://github.com/typestack/class-validator "class-validator")\*\* **配合得很好。这个优秀的库**允许您使用基于装饰器的验证 **。** 装饰器的功能非常强大，\*\*尤其是与 Nest 的**Pipe** 功能相结合使用时，因为我们可以通过访问 `metatype` 信息做很多事情，在开始之前需要安装一些依赖。

```javascript 
$ npm i --save class-validator class-transformer

```


安装完成后，我们就可以向 `CreateCatDto` 类添加一些装饰器。在这里，我们看到了这种技术实现的一个显著优势：`CreateCatDto` 类仍然是我们的 Post body 对象的单一可靠来源（而不是必须创建一个单独的验证类）。

```javascript title="create-cat.dto.ts"
import { IsString, IsInt } from 'class-validator';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}

```


> 在[此处](https://github.com/typestack/class-validator#usage "此处")了解有关类验证器修饰符的更多信息。

现在我们来创建一个 `ValidationPipe` 类。

```javascript title="validate.pipe.ts"
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

```


> 上面代码，我们使用了 [class-transformer](https://github.com/typestack/class-transformer "class-transformer") 库。它和 [class-validator](https://github.com/typestack/class-validator "class-validator") 库由同一个作者开发，所以他们配合的很好。

让我们来看看这个代码。首先你会发现 `transform()` 函数是 `异步` 的, Nest 支持**同步**和**异步**管道。这样做的原因是因为有些 `class-validator` 的验证是[可以异步的](https://github.com/typestack/class-validator#custom-validation-classes "可以异步的")(利用 Promise)

接下来请注意，我们正在使用解构赋值提取 metatype 字段（只从 `ArgumentMetadata` 中提取了该成员）赋值给 `metatype` 参数。这是一个先获取全部 `ArgumentMetadata` 然后用附加语句提取某个变量的简写方式。

下一步，请观察 `toValidate()` 方法。当正在处理的参数是原生 JavaScript 类型时，它负责绕过验证步骤（它们不能附加验证装饰器，因此没有理由通过验证步骤运行它们）。

下一步，我们使用 `class-transformer` 的 `plainToInstance()` 方法**将普通的 JavaScript 参数对象转换为可验证的类型对象**。必须这样做的原因是传入的 post body 对象在从网络请求反序列化时**不携带任何类型信息**（这是底层平台（例如 Express）的工作方式）。 Class-validator 需要使用我们之前为 DTO 定义的验证装饰器，因此我们需要执行此转换，将传入的主体转换为有装饰器的对象，而不仅仅是普通的对象。

最后，如前所述，这就是一个**验证管道**，它要么返回值不变，要么抛出异常。

最后一步是绑定 `ValidationPipe` 。管道可以是参数范围(parameter-scoped)的、方法范围(method-scoped)的、控制器范围的(controller-scoped)或者全局范围(global-scoped)的。之前，我们已经见到了在方法层面绑定管道的例子，即利用基于 Joi 的验证管道。接下来的例子，我们会将**一个管道实例绑定到路由处理程序**的 `@Body` 装饰器上，让它能够检验 post body。

```javascript 
@Post()
async create(
  @Body(new ValidationPipe()) createCatDto: CreateCatDto,
) {
  this.catsService.create(createCatDto);
}

```


当验证逻辑仅涉及一个指定的参数时，参数范围的管道非常有用。
