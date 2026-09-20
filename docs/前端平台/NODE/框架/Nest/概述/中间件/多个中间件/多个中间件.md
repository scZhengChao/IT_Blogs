# 多个中间件

如前所述，为了绑定顺序执行的多个中间件，我们可以在 `apply()` 方法内用逗号分隔它们。

```typescript 
consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);

```
