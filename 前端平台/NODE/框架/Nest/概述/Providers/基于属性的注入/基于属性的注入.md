# 基于属性的注入

我们目前使用的技术称为**基于构造函数的注入**，即通过构造函数方法注入 `providers`。在某些非常特殊的情况下，**基于属性的注入可能会有用**。例如，**如果顶级类依赖于一个或多个 providers**，那么通过从构造函数中调用子类中的 `super()` 来传递它们就会非常烦人了。因此，为了避免出现这种情况，**可以在属性上使用** `@Inject()` 装饰器。

```typescript 
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  @Inject('HTTP_OPTIONS')
  private readonly httpClient: T;
}

```


> 如果您的类**没有扩展其他提供者**，你应该**总是使用**基于**构造函数**的注入。
