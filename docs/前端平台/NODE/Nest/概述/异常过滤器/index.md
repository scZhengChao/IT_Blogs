# 异常过滤器

**内置的异常层**负责处理**整个应用程序中的所有抛出的异常**。当捕获到未处理的异常时，最终用户将收到友好的响应。

![](./assets/image/image_I45TzTsA81.webp)

**开箱即用，此操作由内置的全局异常过滤器执行**，该过滤器处理类型 `HttpException`（及其子类）的异常。每个发生的异常都由全局异常过滤器处理, 当这个异常**无法被识别**时 (既不是 `HttpException` 也不是继承的类 `HttpException` ) , 用户将收到以下 `JSON` 响应:

```typescript 
{
    "statusCode": 500,
    "message": "Internal server error"
}

```


[基础异常类](./基础异常类/index.md "基础异常类")

[自定义异常](./自定义异常/index.md "自定义异常")

[内置HTTP异常](./内置HTTP异常/index.md "内置HTTP异常")

[异常过滤器](./index.md "异常过滤器")

[参数主机](./参数主机/index.md "参数主机")

[绑定过滤器](./绑定过滤器/index.md "绑定过滤器")

[捕获异常](./捕获异常/index.md "捕获异常")

[继承](./继承/index.md "继承")

## 子目录与文章

- [异常过滤器](./异常过滤器/index.md)
