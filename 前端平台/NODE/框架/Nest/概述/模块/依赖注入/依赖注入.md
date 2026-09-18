# 依赖注入

提供者**也可以注入到模块(类)中（例如，用于配置目的）：**

```typescript 
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {
  constructor(private readonly catsService: CatsService) {}
}

```


但是，由于[循环依赖](https://docs.nestjs.cn/8/fundamentals?id=circular-dependency "循环依赖")性，**模块类**不能注入到**提供者中**。
