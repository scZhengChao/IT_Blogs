# Nest

## 目录

- [NestJS：构建高效的后端应用](#NestJS构建高效的后端应用)

# NestJS：构建高效的后端应用

NestJS 是一个用于构建高效、可扩展后端应用的框架。它基于 Node.js 和 TypeScript，并受到 Angular 的启发。NestJS 提供了以下功能：

- 模块化架构： `NestJS` 鼓励使用模块来组织代码，使应用程序更易于维护和扩展。
- 依赖注入： `NestJS` 使用**依赖注入来管理组件之间的依赖关系**，提高了代码的可测试性和可维护性。
- 中间件和管道： 你可以使用中间件和管道来处理请求、验证数据以及执行其他任务。
- 强大的路由系统： NestJS 提供了强大的路由系统，使你能够轻松定义 API 端点和处理不同的 HTTP 请求。

> 官方网址：`https://nestjs.com`

以下是一个 NestJS 示例代码：

```javascript 
// cats.module.ts

import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}

```


英文文档

[ NestJS 简介 | NestJS 中文文档 | NestJS 中文网 Nest (NestJS) 是一个用于构建高效、可扩展的 Node.js 服务器端应用程序的开发框架。它利用 JavaScript 的渐进增强的能力，使用并完全支持 TypeScript （仍然允许开发者使用纯 JavaScript 进行开发），并结合了 OOP （面向对象编程）、FP （函数式编程）和 FRP （函数响应式编程）。 https://nestjs.bootcss.com/](https://nestjs.bootcss.com/ " NestJS 简介 | NestJS 中文文档 | NestJS 中文网 Nest (NestJS) 是一个用于构建高效、可扩展的 Node.js 服务器端应用程序的开发框架。它利用 JavaScript 的渐进增强的能力，使用并完全支持 TypeScript （仍然允许开发者使用纯 JavaScript 进行开发），并结合了 OOP （面向对象编程）、FP （函数式编程）和 FRP （函数响应式编程）。 https://nestjs.bootcss.com/")

中文文档

[   https://docs.nestjs.cn/8/exceptionfilters](https://docs.nestjs.cn/8/exceptionfilters "   https://docs.nestjs.cn/8/exceptionfilters")

[ NestJS 中文网 Nest 是一个用于构建高效、可扩展的 Node.js 服务器端应用程序的框架。 它使用渐进式 JavaScript，使用 TypeScript 构建，并结合了 OOP（面向对象编程）、FP（函数式编程）和 FRP（函数式反应式编程）的元素。 https://nest.nodejs.cn/fundamentals/lazy-loading-modules](https://nest.nodejs.cn/fundamentals/lazy-loading-modules " NestJS 中文网 Nest 是一个用于构建高效、可扩展的 Node.js 服务器端应用程序的框架。 它使用渐进式 JavaScript，使用 TypeScript 构建，并结合了 OOP（面向对象编程）、FP（函数式编程）和 FRP（函数式反应式编程）的元素。 https://nest.nodejs.cn/fundamentals/lazy-loading-modules")

`中文文档；有点不全`

[   https://docs.nestjs.cn/10/controllers](https://docs.nestjs.cn/10/controllers "   https://docs.nestjs.cn/10/controllers")

[介绍](IT/前端平台/NODE/框架/Nest/介绍/介绍.md "介绍")

[概述](IT/前端平台/NODE/框架/Nest/概述/概述.md "概述")

[案例](IT/前端平台/NODE/框架/Nest/案例/案例.md "案例")

[基本原理](基本原理.md "基本原理")

[开发者工具](开发者工具.md "开发者工具")

[理解特点](理解特点.md "理解特点")

[技术](技术.md "技术")

[常用插件](IT/前端平台/NODE/框架/Nest/常用插件/常用插件.md "常用插件")

[开发实践](开发实践.md "开发实践")
