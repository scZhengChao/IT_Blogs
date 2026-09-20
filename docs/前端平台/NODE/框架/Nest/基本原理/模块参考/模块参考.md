# 模块参考

## 目录

- [获取实例](#获取实例)
- [处理范围提供者](#处理范围提供者)
- [注册REQUEST提供者](#注册REQUEST提供者)
- [获取当前子树](#获取当前子树)
- [动态实例化自定义类](#动态实例化自定义类)

Nest提供了一个`ModuleRef`类**来导航到内部提供者列表**，并使用**注入令牌作为查找键名来**获取一个引用。`ModuleRef`类也提供了一个动态实例化静态和范围的提供者的方法。`ModuleRef`可以通过常规方法注入到类中

```typescript title="cats.service.ts"
@Injectable()
export class CatsService {
  constructor(private moduleRef: ModuleRef) {}
}
```


`ModuleRef`从`@nestjs/core`中引入。

### [获取实例](https://docs.nestjs.cn/8/fundamentals?id=获取实例 "获取实例")

`ModuleRef`实例(下文称为**模块引用**) 拥有`get()`方法。该方法获取一个提供者，控制器或者通过注入令牌/类名获取一个在当前模块中可注入对象(例如守卫或拦截器等)。

```typescript title="cats.service.ts"
@Injectable()
export class CatsService implements OnModuleInit {
  private service: Service;
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.service = this.moduleRef.get (Service);
   }
}
```


> 不能通过`get()`方法获取一个范围的提供者(暂态的或者请求范围的)。要使用下列的技术，参考[这里](https://docs.nestjs.com/fundamentals/injection-scopes "这里")了解更多控制范围。

要从全局上下文获取一个提供者(例如，如果提供者在不同模块中注入)，向`get()`的第二个参数传递`{ strict: false }`选项。

```typescript 
this.moduleRef.get(Service, { strict: false });

```


### [处理范围提供者](https://docs.nestjs.cn/8/fundamentals?id=处理范围提供者 "处理范围提供者")

要动态处理一个范围提供者(瞬态的或请求范围的)，使用`resolve()`方法并将提供者的注入令牌作为参数提供给方法。

```typescript title="cats.service.ts"
@Injectable()
export class CatsService implements OnModuleInit {
  private transientService: TransientService;
  constructor(private moduleRef: ModuleRef) {}

  async onModuleInit() {
    this.transientService = await this.moduleRef.resolve(TransientService);
  }
}
```


`resolve()`方法从其自身的注入容器树返回一个提供者的唯一实例。每个子树都有一个独一无二的上下文引用。因此如果你调用该方法一次以上并进行引用比较的话，结果是不同的。

```typescript 
@Injectable()
export class CatsService implements OnModuleInit {
  constructor(private moduleRef: ModuleRef) {}

  async onModuleInit() {
    const transientServices = await Promise.all([
      this.moduleRef.resolve(TransientService),
      this.moduleRef.resolve(TransientService),
    ]);
     console.log(transientServices[0] === transientServices[1]); // false
   }
}
```


要在不同的`resolve()`调用之间产生一个单例，并保证他们共享同样生成的DI容器子树，向`resolve()`方法传递一个上下文引用，使用`ContextIdFactory`类来生成上下文引用。该类提供了一个`create()`方法，返回一个合适的独一无二的引用。

```typescript title="cats.service.ts"
@Injectable()
export class CatsService implements OnModuleInit {
  constructor(private moduleRef: ModuleRef) {}

  async onModuleInit() {
    const contextId = ContextIdFactory.create();
    const transientServices = await Promise.all([
       this.moduleRef.resolve(TransientService, contextId),
      this.moduleRef.resolve(TransientService, contextId), 
    ]);
    console.log(transientServices[0] === transientServices[1]); // true
  }
}
```


> `ContextIdFactory`类从`@nestjs/core`包中引入。

### [注册](https://docs.nestjs.cn/8/fundamentals?id=注册request提供者 "注册")[REQUEST](https://docs.nestjs.cn/8/fundamentals?id=注册request提供者 "REQUEST")[提供者](https://docs.nestjs.cn/8/fundamentals?id=注册request提供者 "提供者")

手动生成的上下文标识符（使用` ContextIdFactory.create()`）表示 DI 子树，其中 `REQUEST` 提供程序未定义，因为它们未被 Nest `依赖注入系统实例化和管理。`

要为手动创建的 DI 子树注册自定义 `REQUEST` 对象，请使用 `ModuleRef.registerRequestByContextId()` 方法，如下所示：

```typescript 
const contextId = ContextIdFactory.create();
this.moduleRef.registerRequestByContextId(/* YOUR_REQUEST_OBJECT */, contextId);

```


### [获取当前子树](https://docs.nestjs.cn/8/fundamentals?id=获取当前子树 "获取当前子树")

有时，也需要在请求上下文中**获取一个请求范围提供者的实例**。例如，`CatsService`是\*\*`请求范围的`\*\*，要获取的`CatsRepository`实例也被标识为请求范围。要分享同一个注入容器子树，你需要获取当前上下文引用而不是生成一个新的(像前面的`ContextIdFactory.create()`函数)。使用`@Inject()`来获取当前的请求对象。

```typescript title="cats.service.ts"
 @Injectable()
export class CatsService {
  constructor(
    @Inject(REQUEST) private request: Record<string, unknown>,
  ) {}
}
```


> 从[这里](https://docs.nestjs.com/fundamentals/injection-scopes#request-provider "这里")了解更多请求提供者

使用`ContextIdFactory`类的`getByRequest()`方法来基于请求对象创建一个上下文id 并传递`resolve()`调用:

```typescript 
const contextId = ContextIdFactory.getByRequest(this.request);
const catsRepository = await this.moduleRef.resolve(CatsRepository, contextId);
```


### [动态实例化自定义类](https://docs.nestjs.cn/8/fundamentals?id=动态实例化自定义类 "动态实例化自定义类")

要**动态实例化一个之前未注册的类**作为提供者，使用模块引用的`create()`方法。

```typescript 
@Injectable()
export class CatsService implements OnModuleInit {
  private catsFactory: CatsFactory;
  constructor(private moduleRef: ModuleRef) {}

  async onModuleInit() {
    this.catsFactory = await this.moduleRef.create(CatsFactory);
  }
}
```


该技术允许你在**框架容器之外偶然实例化一个不同的类。**
