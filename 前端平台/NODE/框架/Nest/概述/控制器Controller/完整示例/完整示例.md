# 完整示例

下面是一个示例，该示例利用几个**可用的装饰器来创建基本控制**器。 该控制器暴露了几个访问和操作内部数据的方法。

```typescript title="cats.controller.ts"
import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}

```


> `Nest CLI` 提供了一个能够**自动生成所有这些模板代码的生成器**，它帮助我们规避手动建立这些文件，并使开发体验变得更加简单。在[这里](https://docs.nestjs.cn/8/recipes?id=crud生成器 "这里")阅读关于该功能的更多信息。
