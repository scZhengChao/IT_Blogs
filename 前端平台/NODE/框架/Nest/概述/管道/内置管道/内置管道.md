# 内置管道

`Nest` 自带九个开箱即用的管道，即

- `ValidationPipe`
- `ParseIntPipe`
- `ParseFloatPipe`
- `ParseBoolPipe`
- `ParseArrayPipe`
- `ParseUUIDPipe`
- `ParseEnumPipe`
- `DefaultValuePipe`
- `ParseFilePipe`

他们从 `@nestjs/common` 包中导出。

我们先来快速看看如何使用`ParseIntPipe`。这是一个**转换**的应用场景，管道确保传给路由处理程序的参数是一个整数(若转换失败，则抛出异常)。在本章后面，我们将展示 `ParseIntPipe` 的简单自定义实现。下面的示例写法也适用于其他内置转换管道（`ParseBoolPipe`、`ParseFloatPipe`、`ParseEnumPipe`、`ParseArrayPipe` 和 `ParseUUIDPipe`，我们在本章中将其称为 `Parse*` 管道）。
