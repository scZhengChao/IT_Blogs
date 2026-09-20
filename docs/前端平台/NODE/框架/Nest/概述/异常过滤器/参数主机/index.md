# 参数主机

让我们看一下该 `catch()` 方法的参数。该 `exception` 参数是当前正**在处理的异常对象**。该host参数是一个 `ArgumentsHost` 对象。 `ArgumentsHost` 是一个**功能强大的实用程序对象**，我们将在[应用上下文章节](https://docs.nestjs.cn/8/fundamentals?id=应用上下文 "应用上下文章节") \*中进一步进行研究。在此代码示例中，我们使用它来获取对 `Request` 和 `Response` 对象的引用，这些对象被传递给原始请求处理程序（在异常发生的控制器中）。在此代码示例中，我们使用了一些辅助方法 `ArgumentsHost` 来获取所需的 `Request` 和 `Response` 对象。`ArgumentsHost` 在[此处](https://docs.nestjs.cn/8/fundamentals?id=应用上下文 "此处")了解更多信息。

之所以如此抽象，是因为它 `ArgumentsHost` 可以在所有上下文中使用（例如，我们现在正在使用的 `HTTP` 服务器上下文，以及微服务和 `WebSocket` ）。在应用上下文章节中，我们将看到如何使用 `ArgumentsHost` 及其辅助函数访问任何应用上下文中相应的底层参数。这将使我们能够编写可在所有上下文中运行的通用异常过滤器。
