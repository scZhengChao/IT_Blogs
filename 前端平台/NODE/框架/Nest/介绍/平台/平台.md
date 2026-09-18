# 平台

`Nest` 旨在成为一个**与平台无关的框架**。 由于平台无关性，我们以**创建可重用的逻辑组件**，开发人员可以跨越多种不同类型的应用程序来使用这些组件。 从技术上讲，创建了适配器以后，`Nest` 可以与任何 `node.js`的 HTTP 框架一起工作。有两个支持开箱即用的 HTTP 平台 \*\*：**[**express**](https://expressjs.com/ "express")** 和 **[**fastify**](https://www.fastify.io/ "fastify")**。您\*\*可以选择最适合您需求的产品。

|                  |                                                                                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| platform-express | [Express](https://expressjs.com/ "Express") 是一个众所周知的 node.js 简约 Web 框架。 这是一个经过实战考验，适用于生产的库，拥有大量社区资源。 默认情况下使用 `@nestjs/platform-express` 包。 许多用户都可以使用 Express ，并且无需采取任何操作即可启用它。 |
| platform-fastify | [Fastify](https://www.fastify.io/ "Fastify") 是一个高性能，低开销的框架，专注于提供最高的效率和速度。 在[这里](https://docs.nestjs.cn/8/techniques?id=性能（fastify） "这里")阅读如何使用它。                               |

无论使用哪种平台，它都会暴露自己的 API。 它们分别是 `NestExpressApplication` 和 `NestFastifyApplication`。

将类型传递给 NestFactory.create() 函数时，如下例所示，app 对象将具有专用于该特定平台的函数。 但是，请注意，除非您确实要访问底层平台 API，否则无需指定类型。

```typescript 
const app = await NestFactory.create<NestExpressApplication>(AppModule);

```
