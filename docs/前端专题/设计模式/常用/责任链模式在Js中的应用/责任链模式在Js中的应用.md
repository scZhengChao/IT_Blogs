# 责任链模式在Js中的应用

## 目录

- [责任链模式（Chain of Responsibility Pattern）](#责任链模式Chain-of-Responsibility-Pattern)
  - [定义：](#定义)
  - [特点：](#特点)
  - [参与者：](#参与者)
  - [工作流程：](#工作流程)
  - [优点：](#优点)
  - [缺点：](#缺点)
  - [使用场景：](#使用场景)
  - [示例：](#示例)
  - [原生实现：](#原生实现)
  - [总结：](#总结)
  - [扩展：](#扩展)

# 责任链模式（Chain of Responsibility Pattern）

## 定义：

一种行为型设计模式，它允许**多个对象按照顺序处理请求**，直到**其中一个对象能够处理请求为止**。这样的对象链被称为责任链。

## 特点：

- 在责任链模式中，*每个处理请求的对象都有一个对下一个对象的引用，形成一个链条*。
- 当客户端发送请求时，请求会沿着链条传递，直到被某个处理器对象处理或者整个链条结束。

## 参与者：

1. 抽象处理器（Abstract Handler）：定义了处理请求的接口和维护下一个处理器的引用。通常实现为抽象类或接口。
2. 具体处理器（Concrete Handler）：具体实现了处理请求的方法。如果可以处理请求，则进行处理；否则将请求传递给下一个处理器。

## 工作流程：

1. 客户端创建并初始化责任链中的**处理器对象**，并设置好它们的**处理顺序**。
2. 当客户端发送请求时，请求从链条的**开头**开始传递。
3. 每个处理器检查自己是否能够处理请求，**如果可以，则进行处理并停止传递**；否则将请求**传递给下一个处理器**。（这个过程必然会用到if else）
4. 这个过程持续进行，**直到请求被处理或者整个链条结束**。

## 优点：

- 解耦**发送者和接收者**，使得请求的发送者**不需要知道**哪个对象会处理请求。
- 可以**动态地添加或修改处理器对象**，从而避免将请求的处理逻辑硬编码到单个对象中，增加了代码的**可维护性和可扩展性**。

## 缺点：

- 整个链条的长度可能会对性能产生影响，特别是在链条非常长时。

## 使用场景：

- 处理者是\_动态的或者是**不能预先确定的**\_：有多个对象可以处理请求，但**具体的处理者只在运行时确定**
- 希望将\_**请求的发送者和接收者解耦**\_，让请求可以自由地在对象之间传递。

## 示例：

```typescript 
// 抽象处理器
class Handler {
  nextHandler: Handler | null = null;
  setNext(handler: Handler) {
    this.nextHandler = handler;
  }
  abstract handleRequest(request: number): void;

}

// 具体处理器1
class ConcreteHandler1 extends Handler {
  handleRequest(request: number) {
    request <= 10 ? 
    console.log(`Request ${request} handled by ConcreteHandler1`) : 
    this.nextHandler?.handleRequest(request);
  }
}

  


// 具体处理器2
class ConcreteHandler2 extends Handler {
  handleRequest(request: number) {
    request > 10 && request <= 20 ?
     console.log(`Request ${request} handled by ConcreteHandler2`) : 
     this.nextHandler?.handleRequest(request);
  }
}


// 具体处理器3
class ConcreteHandler3 extends Handler {
  handleRequest(request) {
    request > 20 && request <= 80 ? 
    console.log(`Request ${request} handled by ConcreteHandler3`) : 
    this.nextHandler?.handleRequest(request);
  }
}

 
// 异常处理器
class ConcreteHandlerX extends Handler {
  handleRequest(request) {
    throw new Error(`Request ${request} can not be handled by ConcreteHandler chain`);
  }
}
 
// 创建处理对象
const handler1 = new ConcreteHandler1();
const handler2 = new ConcreteHandler2();
const handler3 = new ConcreteHandler3();
const errorhandler = new ConcreteHandlerX();
// 处理对象成链
handler1.setNext(handler2);
handler2.setNext(handler3);
handler3.setNext(errorhandler);

// 客户端发送请求
handler1.handleRequest(5);   // 输出: Request 5 handled by ConcreteHandler1
handler2.handleRequest(15);  // 输出: Request 15 handled by ConcreteHandler2
handler3.handleRequest(25);  // 输出: Request 25 handled by ConcreteHandler3
handler1.handleRequest(90);  // 直接报错

```


## 原生实现：

1. 事件处理机制：在浏览器中，事件处理机制就是一个典型的责任链模式的应用。当事件发生时，它会从目标元素开始沿着 DOM 树向上传播，每个元素都有机会处理该事件。如果某个元素无法处理事件，它会将事件传递给它的父级元素，直到找到能够处理事件的元素或者事件冒泡至根元素。
2. 中间件（Middleware）模式：在 Web 开发中，中间件模式也是一种常见的责任链模式的应用。例如，Express.js 框架中的中间件允许你按照顺序添加不同的中间件函数来处理 HTTP 请求。请求将依次经过这些中间件函数，每个中间件函数都有可能对请求进行处理、修改或者将请求传递给下一个中间件函数。
3. JavaScript Promise：Promise 是 JavaScript 中用于处理异步操作的一种机制。当使用 Promise 链式调用时，每个 Promise 对象都有一个 `then()` 方法，可以将回调函数添加到链条中。当前一个 Promise 对象执行完成后，它会自动将结果传递给下一个 Promise 对象，形成一个责任链式的处理。
4. jQuery Ajax：在 jQuery 的 Ajax 功能中，可以使用 `$.ajax()` 方法发送异步请求，并通过 `.done()`、`.fail()`、`.always()` 等方法添加相应的回调函数。这些回调函数可以按照顺序连接起来，形成一个责任链，每个回调函数都有机会处理请求的结果。

## 总结：

构建抽象处理器类，然后子类具体处理器类重写处理逻辑；实际化出不同的具体处理器类的实例对象，调用setNext方法成链，然后选择链中某处作为入口，处理责任。

注意：不必从入口开始，因为可能在入链之前就已经判断过了，范围已经缩小了。

## 扩展：

链可以**成环**，例如将`handler3.setNext(errorhandler);`改成`handler3.setNext(handler1);`, 从而责任传递永无停息，直到问题被解决。

用责任环结合定时器可以实现**轮询**的效果。
