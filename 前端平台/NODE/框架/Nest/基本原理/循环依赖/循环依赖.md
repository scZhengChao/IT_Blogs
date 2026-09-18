# 循环依赖

## 目录

- [前向引用](#前向引用)
- [可选的模块引用(ModuleRef)类](#可选的模块引用ModuleRef类)
- [模块前向引用](#模块前向引用)

当两个类互相依赖时就会出现循环依赖. 例如，当 `A` 类需要 `B` 类，而 `B` 类也需要 `A` 类时，就会产生**循环依赖**。`Nest` 允许在提供者( `provider` )和模块( `module` )**之间创建循环依赖关系**.

建议尽可能避免循环依赖。但是有时候难以避免，Nest提供了**两个方法**来解决这个问题.本章中我们提供了两种技术，即`正向引用(forward reference)`和`模块引用(ModuleRef)`来从注入容器中获取一个提供者。

我们也讨论了在模块间处理循环依赖的问题。

> 循环依赖也可以使用`封装桶文件/index.ts`文件成组导入。桶(Barrel)文件应该从模块/类中省略掉。例如，当在同一个目录下作为桶文件导入时不应使用桶文件，例如，cats/cats.controller不应该导入cat到cats/cats.service文件。更多内容参见[github issue](https://github.com/nestjs/nest/issues/1181#issuecomment-430197191 "github issue")

### [前向引用](https://docs.nestjs.cn/8/fundamentals?id=前向引用 "前向引用")

**前向引用**允许 `Nest` **引用目前尚未被定义的引用**。当`CatsService` 和 `CommonService` 相互依赖时，关系的双方都需要使用 `@Inject()` 和 `forwardRef()` ，否则 `Nest` 不会实例化它们，因为所有基本元数据都不可用。让我们看看下面的代码片段：

```typescript title="cats.service.ts"
@Injectable()
export class CatsService {
  constructor(
    @Inject(forwardRef(() => CommonService))
    private readonly commonService: CommonService,
  ) {}
}
```


> `forwardRef()` 需要从 `@nestjs/common` 包中导入的。

这只是关系的一方面。现在让我们对 `CommonService` 做同样的事情:

```typescript title="common.service.ts"
@Injectable()
export class CommonService {
  constructor(
    @Inject(forwardRef(() => CatsService))
    private readonly catsService: CatsService,
  ) {}
}
```


> 实例化的顺序是不确定的。不能保证哪个构造函数会被先调用。

### [可选的模块引用(](https://docs.nestjs.cn/8/fundamentals?id=可选的模块引用moduleref类 "可选的模块引用(")[ModuleRef](https://docs.nestjs.cn/8/fundamentals?id=可选的模块引用moduleref类 "ModuleRef")[)类](https://docs.nestjs.cn/8/fundamentals?id=可选的模块引用moduleref类 ")类")

一个选择是使用`forwardRef()`来重构你的代码，并使用`ModuleRef`类来在循环引用关系一侧获取提供者。更多关于`ModuleRef`类的内容参考[这里](https://docs.nestjs.com/fundamentals/module-ref "这里")。

### [模块前向引用](https://docs.nestjs.cn/8/fundamentals?id=模块前向引用 "模块前向引用")

为了处理模块( `module` )之间的循环依赖，必须在模块关联的两个部分上使用相同的 `forwardRef()`：

```typescript title="common.module.ts"
@Module({
  imports: [forwardRef(() => CatsModule)],
})
export class CommonModule {}
```
