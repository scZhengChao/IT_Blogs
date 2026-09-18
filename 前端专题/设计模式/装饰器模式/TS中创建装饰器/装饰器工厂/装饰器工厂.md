# 装饰器工厂

## 目录

- [创建装饰器工厂](#创建装饰器工厂)

# **创建装饰器工厂**

有时，我们需要在应用装饰器时将其他选项传递给装饰器，为此，我们必须使用装饰器工厂。

在这里，我们将学习如何创建和使用这些工厂。

装饰器工厂是返回另一个函数的函数。他们收到这个名字是因为他们不是装饰器实现本身。

相反，它们返回另一个负责实现装饰器的函数并充当包装函数。通过允许客户端代码在使用装饰器时将选项传递给装饰器，它们在使装饰器可定制方面很有用。

假设，有一个名为 decoratorA 的类装饰器，并且，我们想添加一个可以在调用装饰器时设置的选项，例如，布尔标志，可以通过编写类似于以下的装饰器工厂来实现此目的：

```javascript 
const decoratorA = (someBooleanFlag: boolean) => {
return (target: Function) => {
  }
}

```


在这里，decoratorA 函数返回另一个带有装饰器实现的函数。 注意，装饰器工厂如何接收一个布尔标志作为它的唯一参数：

我们可以在使用装饰器时传递此参数的值。

请参阅以下示例中突出显示的代码：

```javascript 
const decoratorA = (someBooleanFlag: boolean) => {
return (target: Function) => {
  }
}
@decoratorA(true)
class Person {}

```


在这里，当我们使用 decoratorA 装饰器时，将调用装饰器工厂，并将 someBooleanFlag 参数设置为 true。

然后，装饰器实现本身将运行。 这允许我们根据使用方式更改装饰器的行为，从而，使我们的装饰器易于自定义和通过应用程序重用。

请注意，我们需要传递装饰器工厂预期的所有参数。 如果，我们只是应用装饰器而不传递任何参数，如下例所示：

```javascript 
const decoratorA = (someBooleanFlag: boolean) => {
return (target: Function) => {
  }
}
@decoratorA
class Person {}

```


TypeScript 编译器会给你两个错误，这可能会因装饰器的类型而异。 对于类装饰器，错误是 1238 和 1240：

```javascript 
Unable to resolve signature of class decorator when called as an expression.
  Type '(target: Function) => void' is not assignable to type 'typeof Person'.
    Type '(target: Function) => void' provides no match for the signature 'new (): Person'. (1238)
Argument of type 'typeof Person' is not assignable to parameter of type 'boolean'. (2345)

```


我们刚刚创建了一个能够接收参数并根据这些参数更改其行为的装饰器工厂。

在下一步中，我们将学习如何创建属性装饰器。
