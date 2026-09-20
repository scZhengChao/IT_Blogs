# 服务service

让我们从创建一个简单的 `CatsService` 开始。该服务将**负责数据存储和检索**，**其由 ****`CatsController`**** 使用**，因此把它定义为 `provider`，**是一个很好的选择**。因此，我们用 `@Injectable()` 来装饰这个类 。

```typescript title="cats.service.ts"
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}

```


> 要使用 `CLI` 创建服务类，只需执行 `$ nest g service cats` 命令。

我们的 `CatsService` 是具有一个属性和两个方法的基本类。唯一的新特点是它使用 `@Injectable()` 装饰器。该 `@Injectable()` 附加有元数据，因此 `Nest` **知道这个类是一个** `Nest` provider。需要注意的是，上面有一个 `Cat` 接口。看起来像这样：

```typescript title="interfaces/cat.interface.ts"
export interface Cat 
  name: string;
  age: number;
  breed: string;
}

```


现在我们有一个服务类来检索 `cat` ，让我们在 `CatsController` 里使用它 ：

```typescript title="cats.controller.ts"
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}

```


`CatsService` 是通过类**构造函数注入的。注意这里使用了私有的只读语法**。这意味着我们**已经在同一位置创建并初始化了** `catsService` 成员。
