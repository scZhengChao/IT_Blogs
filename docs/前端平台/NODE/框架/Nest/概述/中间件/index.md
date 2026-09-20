# 中间件

中间件是在路由处理程序 **之前**调用的函数。 中间件函数**可以访问请求和响应对象，** 以及应用程序请求响应周期中的`next()` 中间件函数。 `next()` 中间件函数通常由名为 `next` 的变量表示。

![](./image/image_d3qiVY-9k4.png)

Nest 中间件实际上等价于 [express](http://expressjs.com/en/guide/using-middleware.html "express") 中间件。 下面是Express官方文档中所述的中间件功能：

中间件函数可以执行以下任务:

- **执行任何代码。**
- **对请求和响应对象进行更改。**
- **结束请求-响应周期。**
- **调用堆栈中的下一个中间件函数。**
- **如果当前的中间件函数没有结束请求-响应周期, 它必须调用 ****`next()`**** 将控制传递给下一个中间件函数。否则, 请求将被挂起。**

您可以在函数中或在具有 `@Injectable()` 装饰器的类中实现自定义 `Nest`中间件。 这个类应该实现 `NestMiddleware` 接口, 而函数没有任何特殊的要求。 让我们首先使用类方法实现一个简单的中间件功能。

```typescript 
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}

```


[依赖注入](IT/前端平台/NODE/框架/Nest/概述/中间件/依赖注入/依赖注入.md "依赖注入")

[应用中间件](./应用中间件/index.md "应用中间件")

[路由通配符](IT/前端平台/NODE/框架/Nest/概述/中间件/路由通配符/路由通配符.md "路由通配符")

[中间件消费者](./中间件消费者/index.md "中间件消费者")

[函数式中间件](./函数式中间件/index.md "函数式中间件")

[多个中间件](./多个中间件/index.md "多个中间件")

[全局中间件](./全局中间件/index.md "全局中间件")
