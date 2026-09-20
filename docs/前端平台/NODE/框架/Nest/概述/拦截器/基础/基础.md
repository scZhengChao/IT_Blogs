# 基础

每个拦截器都有 `intercept()` 方法，它接收2个参数。 第一个是 `ExecutionContext` 实例（与守卫完全相同的对象）。 `ExecutionContext` 继承自 `ArgumentsHost` 。 `ArgumentsHost` 是传递给原始处理程序的参数的一个包装 ，它根据应用程序的类型包含不同的参数数组。你可以在[这里](https://docs.nestjs.cn/8/exceptionfilters?id=arguments-host "这里")读更多关于它的内容（在异常过滤器章节中）。
