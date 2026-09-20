# sentry

## 目录

- [1. 核心功能](#1-核心功能)
- [2. 与其他 Sentry SDK 的关系](#2-与其他-Sentry-SDK-的关系)
- [3. 快速接入示例](#3-快速接入示例)
- [4. 适用场景](#4-适用场景)
- [5. 官方文档](#5-官方文档)

`@sentry/react`是 ​**​****Sentry****​**​ 官方提供的 ​**​React 专用错误监控 SDK​**​，用于实时捕获 React 应用中的错误、性能问题，并提供丰富的上下文信息帮助开发者快速诊断问题。以下是它的核心功能和应用场景：

### **1. 核心功能**

- **自动错误捕获**
  - 未处理的异常（`Error`）、Promise 拒绝（`Unhandled Promise Rejection`）。
  - React 组件渲染错误（通过`Error Boundary`集成）。
- **React 深度集成**
  - 内置`ErrorBoundary`组件，可捕获组件树中的错误并展示降级 UI。
  - 自动记录错误发生的组件名称、props、state 等 React 上下文。
- **性能监控（需配置）**
  - 追踪页面加载时间、组件渲染耗时、API 请求延迟（需搭配`@sentry/tracing`）。
- **手动上报**
  - 支持主动调用`Sentry.captureException()`、`Sentry.captureMessage()`上报自定义错误或日志。

***

### **2. 与其他 Sentry SDK 的关系**

- **基于**\*\*`@sentry/browser`\*\*：继承了浏览器环境的基础监控能力（如全局错误、XHR 请求监控）。
- **React 专属扩展**：增加了对 React 错误边界、组件上下文的支持。
- **可组合使用**：可与`@sentry/tracing`（性能监控）、`@sentry/replay`（用户会话录屏）等库搭配使用

### **3. 快速接入示例**

```typescript 
// 初始化 Sentry
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "YOUR_DSN", // 从 Sentry 后台获取
  integrations: [new BrowserTracing()],
  tracesSampleRate: 0.1, // 性能数据采样率（生产环境建议调低）
});

// 使用 ErrorBoundary 包裹组件
<Sentry.ErrorBoundary fallback={<p>组件崩溃了！</p>}>
  <BuggyComponent />
</Sentry.ErrorBoundary>
```


### **4. 适用场景**

- **生产环境监控**：实时收集线上错误，减少用户反馈的“白屏”问题。
- **性能优化**：分析慢渲染组件或 API 请求瓶颈。
- **错误分析**：通过 Sentry 后台查看完整的错误堆栈、用户操作路径、设备信息等。
- **详细上下文**：提供错误堆栈、用户操作轨迹、环境信息等
- **多平台支持**：除 React 外，还支持 React Native（需`@sentry/react-native`）

***

### **5. 官方文档**

- 详细配置和高级用法：Sentry React SDK 文档
- 错误边界使用指南：Error Boundary 文档

如果需要更轻量级的监控（如非 React 项目），可直接使用`@sentry/browser`。
