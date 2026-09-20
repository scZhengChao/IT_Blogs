# 请求负载

此前我们列举的的 `POST` 路由处理程序样例中，处理程序没有接受任何客户端参数。我们在这里通过添加 `@Body()` 参数来解决这个问题。

首先（如果您使用 TypeScript），我们需要确定 `DTO`（数据传输对象）模式。`DTO`是一个对象，它定义了如何通过网络发送数据。我们可以通过使用 **TypeScript** 接口（Interface）或简单的类（Class）来定义 DTO 模式。有趣的是，我们在这里推荐使用**类**。为什么？类是 JavaScript ES6 标准的一部分，因此它们**在编译后的 JavaScript 中被保留为实际实体**。另一方面，**由于 TypeScript 接口在转换过程中被删除，所以 Nest 不能在运行时引用它们。**这一点很重要，因为诸如**管道**（Pipe）之类的特性为**在运行时访问变量的元类型**提供更多的可能性。

现在，我们来创建 `CreateCatDto` 类：

```typescript 
/*
  create-cat.dto.ts
*/
export class CreateCatDto {
  readonly name: string;r  readonly age: number;
  readonly breed: string;
}

```


它只有三个基本属性。 之后，我们可以在 `CatsController` 中使用新创建的`DTO`：

```typescript title="cats.controller.ts"
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  return 'This action adds a new cat';
}

```
