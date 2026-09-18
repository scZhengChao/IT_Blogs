# 平台无关

## 目录

- [一次构建，到处使用](#一次构建到处使用)

Nest 是一个与平台无关的框架。这意味着你可以开发可在不同类型的应用中使用的可重用逻辑部分。例如，大多数组件都可以在不同的底层 HTTP 服务器框架（例如 Express 和 Fastify）甚至不同类型的应用（例如 HTTP 服务器框架、具有不同传输层的微服务和 Web 套接字）之间进行重用而无需更改 .

#### 一次构建，到处使用

文档的概述部分主要展示使用 HTTP 服务器框架的编码技术（例如，提供 REST API 的应用或提供 MVC 风格的服务器端渲染应用）。但是，所有这些构建块都可以在不同的传输层（[microservices](https://nest.nodejs.cn/microservices/basics "microservices") 或 [websockets](https://nest.nodejs.cn/websockets/gateways "websockets")）之上使用。

此外，Nest 还配备了专用的 [GraphQL](https://nest.nodejs.cn/graphql/quick-start "GraphQL") 模块。你可以交替使用 GraphQL 作为 API 层和提供 REST API。

此外，[应用上下文](https://nest.nodejs.cn/application-context "应用上下文") 功能有助于创建任何类型的 Node.js 应用 - 包括 CRON 作业和 CLI 应用等 - 在鸟 Nest 的顶部。

Nest 渴望成为 Node.js 应用的成熟平台，为你的应用带来更高级别的模块化和可重用性。一次构建，到处使用！
