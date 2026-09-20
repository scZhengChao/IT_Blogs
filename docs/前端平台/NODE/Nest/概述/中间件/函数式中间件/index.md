# 函数式中间件

我们使用的 `LoggerMiddleware` 类非常简单。它没有成员，没有额外的方法，没有依赖关系。为什么我们不能只使用一个简单的函数？这是一个很好的问题，因为事实上 - 我们可以做到。这种类型的中间件称为**函数式中间件**。让我们把 `logger` 转换成函数。

```typescript title="logger.middleware.ts"
export function logger(req, res, next) {
  console.log(`Request...`);
  next();
};

```


现在在 `AppModule` 中使用它。

```typescript title="app.module.ts"
consumer
  .apply(logger)
  .forRoutes(CatsController);

```


> 当您的**中间件没有任何依赖关系时，我们可以考虑使用函数式中间件**。
