# 依赖注入

Nest 是建立**在强大的设计模式，通常称为依赖注入**。我们建议在官方的 [Angular文档](https://angular.cn/guide/di/dependency-injection "Angular文档")中阅读有关此概念的精彩文章。

在 `Nest` 中，借助 **TypeScript** 功能，管理依赖项非常容易，因为它们仅按类型进行解析。在下面的示例中，`Nest` 将 `catsService` 通过创建并返回一个实例来解析 `CatsService`（或者，在单例的正常情况下，如果现有实例已在其他地方请求，则返回现有实例）。解析此依赖关系并将其传递给控制器的构造函数（或分配给指定的属性）：

```typescript 
constructor(private readonly catsService: CatsService) {}

```
