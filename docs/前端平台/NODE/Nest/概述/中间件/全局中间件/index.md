# 全局中间件

如果我们想**一次性将中间件绑定到每个注册路**由，我们可以使用由`INestApplication`实例提供的 `use()`方法：

```typescript 
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);

```
