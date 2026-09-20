# 起步

将会创建 `project-name` 目录， 安装 node\_modules 和一些其他样板文件，并将创建一个 `src` 目录，目录中包含几个核心文件。

```typescript 
src
 ├── app.controller.spec.ts
 ├── app.controller.ts
 ├── app.module.ts
 ├── app.service.ts
 └── main.ts

```


以下是这些核心文件的简要概述：

|                        |                                            |
| ---------------------- | ------------------------------------------ |
| app.controller.ts      | 带有单个路由的基本控制器示例。                            |
| app.controller.spec.ts | 对于基本控制器的单元测试样例                             |
| app.module.ts          | 应用程序的根模块。                                  |
| app.service.ts         | 带有单个方法的基本服务                                |
| main.ts                | 应用程序入口文件。它使用 `NestFactory` 用来创建 Nest 应用实例。 |

`main.ts` 包含一个异步函数，它负责**引导**我们的应用程序：

```typescript title="main.ts"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

```


要创建一个 Nest 应用实例，我们使用了 `NestFactory` 核心类。`NestFactory` 暴露了一些静态方法用于创建应用实例。 `create()` 方法返回一个实现 `INestApplication` 接口的对象。该对象提供了一组可用的方法，我们会在后面的章节中对这些方法进行详细描述。 在上面的 `main.ts` 示例中，**我们只是启动 HTTP 服务，让应用程序等待 HTTP 请求。**

请注意，使用 Nest CLI 搭建的项目会创建一个初始项目结构，我们鼓励开发人员将每个模块保存在自己的专用目录中。
