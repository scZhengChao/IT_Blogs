# 绑定验证管道

在之前，我们已经了解如何绑定转换管道(像 `ParseIntPipe` 和其他 `Parse*` 管道)。

绑定验证管道也十分直截了当。

在这种情况下，我们希望在方法调用级别绑定管道。在当前示例中，我们需要执行以下操作使用 `JoiValidationPipe`：

1. 创建一个 `JoiValidationPipe` 实例
2. 传递上下文特定的 Joi schema 给构造函数
3. 绑定到方法

我们用 `@UsePipes()` 装饰器来完成。代码如下:

```javascript 
@Post()
@UsePipes(new JoiValidationPipe(createCatSchema))
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}

```


> 从 `@nestjs/common` 包导入 `@UsePipes()` 装饰器
