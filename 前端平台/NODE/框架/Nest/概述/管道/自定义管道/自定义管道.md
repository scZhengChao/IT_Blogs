# 自定义管道

正如上文所提到的，你可以构建自定义管道。虽然 Nest 提供了强大的内置 `ParseIntPipe` 和 `ValidationPipe`，但让我们从头开始构建它们**的简单自定义版本**，以了解如何构建自定义管道。

先从一个简单的 `ValidationPipe` 开始。最初，我们让它接受一个输入值并立即返回相同的值。

```typescript title="validation.pipe.ts"
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}

```


> `PipeTransform<T, R>` 是每个管道**必须要实现的泛型接口**。泛型 `T` 表明输入的 `value` 的类型，`R` 表明 `transfrom()` 方法的返回类型

为实现 `PipeTransfrom`，每个管道必须声明 `transfrom()` 方法。该方法有两个参数：

- `value`
- `metadata`

`value` 参数是**当前处理的方法参数**(在被路由处理程序方法接收之前)，`metadata` 是当前**处理的方法参数的元数据**。元数据对象具有以下属性：

```typescript 
export interface ArgumentMetadata {
  type: 'body' | 'query' | 'param' | 'custom';
  metatype?: Type<unknown>;
  data?: string;
}

```


这些属性描述了当前处理的参数。

| 参数         | 描述                                                                                                                               |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `type`     | 告诉我们参数是一个 body `@Body()`，query `@Query()`，param `@Param()` 还是自定义参数 [在这里阅读更多](https://docs.nestjs.cn/customdecorators "在这里阅读更多")。 |
| `metatype` | 参数的元类型，例如 `String`。 如果在函数签名中省略类型声明，或者使用原生 JavaScript，则为 `undefined`。                                                             |
| `data`     | 传递给装饰器的字符串，例如 `@Body('string')`。如果您将括号留空，则为 `undefined`。                                                                         |

> TypeScript 中的 interface 在**转译期间会消失**。因此，如果方法参数的类型被声明为接口(interface)而不是类(class)，则 `metatype` 将是 `Object`。
