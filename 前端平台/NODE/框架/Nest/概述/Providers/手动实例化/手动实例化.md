# 手动实例化

到目前为止，我们已经讨论了 `Nest` 如何**自动处理解决依赖关系的大多数细节**。在某些情况下，您可能需要**跳出内置的依赖注入系统**，并手动检索或实例化提供程序。我们在下面简要讨论两个这样的主题。

要获取**现有实例或动态实例化提供程序，** 可以使用[Module reference](https://docs.nestjs.cn/8/fundamentals "Module reference")。

要在 `bootstrap()` 函数内使用提供程序（例如，对于不带控制器的独立应用程序，或在引导过程中使用配置服务），请参见[独立应用程序](https://docs.nestjs.cn/8/standalone-applications "独立应用程序")。
