# 转换的应用场景

验证不是管道唯一的用处。在本章的开始部分，我已经提到管道也可以**将输入数据转换**为**所需的输出**。这是可以的，因为从 `transform` 函数**返回的值完全覆盖了参数先前的值**。

在什么时候有用？*有时从客户端传来的数据需要经过一些修改（例如字符串转化为整数）*，然后处理函数才能正确的处理。还有种情况，有些数据的必填字段缺失，那么可以使用默认值。**转换管道**被插入在**客户端请求和请求处理程序之间用来处理客户端请求**。

这是一个简单的 `ParseIntPipe`，负责将字符串转换为整数。（如上所述，Nest 有一个更复杂的内置 `ParseIntPipe`； 这个例子仅作为自定义转换管道的简单示例）

```javascript title="parse-int.pipe.ts"
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}

```


如下所示, 我们可以很简单的配置管道来处理所参数 id:

```javascript 
@Get(':id')
async findOne(@Param('id', new ParseIntPipe()) id) {
  return this.catsService.findOne(id);
}

```


由于上述结构，`ParseIntpipe` 将在请求触发相应的处理程序之前执行。

另一个有用的例子是按 ID 从数据库中选择一个现有的**用户实体**。

```javascript 
@Get(':id')
findOne(@Param('id', UserByIdPipe) userEntity: UserEntity) {
  return userEntity;
}

```


请读者自己实现, 这个管道接收 id 参数并返回 UserEntity 数据, 这样做就可以抽象出一个根据 id 得到 UserEntity 的公共管道, 你的程序变得更符合声明式(Declarative 更好的代码语义和封装方式), 更 DRY (Don’t repeat yourself 减少重复代码) 编程规范.
