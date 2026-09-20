# 对象结构验证

有几种方法可以实现。一种常见的方式是使用**基于结构**的验证。我们来尝试一下。

[**Joi**](https://github.com/sideway/joi "Joi")库允许使用可读的 API 以直接的方式创建`schema`，让我们构建一个基于 Joi schema 的验证管道。

首先安装依赖：

```javascript 
$ npm install --save joi
$ npm install --save-dev @types/joi

```


在下面的代码中，我们先创建一个简单的 `class`，在构造函数中传递 `schema` 参数。然后我们使用 `schema.validate()` 方法验证参数是否符合提供的 `schema`。

就像前面说过的，**验证管道**要么返回该值，要么抛出一个错误。

在下一节中，你将看到我们如何使用 `@UsePipes()` 修饰器给指定的控制器方法提供需要的 schema。这么做能让验证管道跨上下文重用，像我们准备做的那样。

```javascript 
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}

```
