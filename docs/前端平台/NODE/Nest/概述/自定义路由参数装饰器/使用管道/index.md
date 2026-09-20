# 使用管道

`Nest` 对待自定义的路由参数装饰器和自身内置的装饰器（`@Body()`，`@Param()` 和 `@Query()`）一样。这意味着**管道也**会因为自定义注释参数（在本例中为 `user` 参数）而被执行。此外，你还可以**直接将管道应用到自定义**装饰器上：

```nginx 
@Get()
async findOne(@User(new ValidationPipe()) user: UserEntity) {
  console.log(user);
}

```


> 请注意，`validateCustomDecorators` 选项必须设置为 `true`。默认情况下，`ValidationPipe` 不验证使用自定义装饰器注释的参数。
