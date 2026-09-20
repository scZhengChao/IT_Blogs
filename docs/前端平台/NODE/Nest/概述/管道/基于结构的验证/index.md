# 基于结构的验证

让我们把验证管道变得更有用一点。仔细看看 `CatsController` 的 `create()` 方法，我们希望在该方法被调用之前，请求主体(post body)得到验证。

```java 
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}

```


注意到请求体参数为 `createCatDto`，其类型为 `CreateCatDto` :

```java title="create-cat.dto.ts"
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}

```


我们希望任何被该方法接收的请求主体都是有效的，因此我们必须验证 `createCatDto` 对象的三个成员。我们可以在**路由处理程序方法中**执行此操作，但这样做并不理想，因为它会破坏**单一职责原则** (single responsibility rule, SRP)。

另一种做法是创建一个验证类，把验证逻辑放在验证类中。这样做的缺点是我们必须要记得在每个该方法的前面，都调用一次验证类。

那么写一个验证中间件呢？可以，但做不到创建一个能在整个应用程序上下文中使用的**通用中间件**。因为中间件不知道**执行上下文**(execution context)，包括将被调用的处理程序及其任何参数。

管道就是为了处理这种应用场景而设计的。让我们继续完善我们的验证管道。
