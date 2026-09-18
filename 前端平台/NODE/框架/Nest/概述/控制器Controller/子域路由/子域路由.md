# 子域路由

`@Controller` 装饰器可以接受一个 `host` 选项，以要求传入请求的 `HTTP` 主机匹配某个特定值。

```typescript 
@Controller({ host: 'admin.example.com' })
export class AdminController {
  @Get()
  index(): string {
    return 'Admin page';
  }


```


> 由于 **Fastify** 缺乏对嵌套路由器的支持，因此当使用子域路由时，应该改用（默认） **Express** 适配器（Express adapter）。

与一个路由路径 `path` 类似，该 `hosts` 选项可以使用参数标识（token）来捕获主机**名中该位置的动态值**。下面的 `@Controller()` 装饰器示例中的主机参数标识（host parameter token）演示了此用法。可以使用 `@HostParam()` 装饰器访问以这种方式声明的主机参数，该装饰器应添加到方法签名中。

```typescript 
@Controller({  host: ':account .example.com' })
export class AccountController {
  @Get()
  getInfo(@HostParam('account') account: string) {
    return account;
  }
```
