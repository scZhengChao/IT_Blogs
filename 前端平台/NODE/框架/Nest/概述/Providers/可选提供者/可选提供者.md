# 可选提供者

有时，您可能需要解决一些依赖项。例如，您的类可能**依赖于一个配置对象，** 但如果没有传递，则应使用默认值。在这种情况下，关联变为可选的，`provider` 不会因为缺少配置导致错误。

要指示 provider 是可选的，请在 `constructor` 的参数中使用 `@Optional()` 装饰器

```typescript 
import { Injectable, Optional, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  constructor(
    @Optional() @Inject('HTTP_OPTIONS') private readonly httpClient: T
  ) {}
}

```


请注意，在上面的示例中，我们使用自定义 `provider`，这是我们包含 `HTTP_OPTIONS`自定义标记的原因。前面的示例显示了基于构造函数的注入，通过构造函数中的类指示依赖关系。[在此处](https://docs.nestjs.cn/8/fundamentals "在此处")详细了解自定义providers及其关联的 `toke`
