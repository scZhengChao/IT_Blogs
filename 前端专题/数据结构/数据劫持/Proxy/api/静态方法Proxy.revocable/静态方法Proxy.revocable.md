# 静态方法Proxy.revocable

## 目录

- [语法](#语法)
  - [参数](#参数)
  - [返回值](#返回值)
- [描述](#描述)
- [示例](#示例)
  - [使用 Proxy.revocable()](#使用-Proxyrevocable)

**`Proxy.revocable()`** 静态方法创建一个可撤销的 [Proxy](https://mdn.org.cn/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy "Proxy") 对象。

## [语法](https://mdn.org.cn/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/revocable#syntax "语法")

```javascript 
Proxy.revocable(target, handler)
```


### [参数](https://mdn.org.cn/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/revocable#parameters "参数")

[target](https://mdn.org.cn/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/revocable#target "target")

要使用 `Proxy` 包装的目标对象。它可以是任何类型的对象，包括原生数组、函数，甚至另一个代理。

[handler](https://mdn.org.cn/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/revocable#handler "handler")

一个对象，其属性是定义在对代理执行操作时其行为的函数。

### [返回值](https://mdn.org.cn/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/revocable#return_value "返回值")

一个具有以下两个属性的普通对象

[proxy](https://mdn.org.cn/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/revocable#proxy "proxy")

一个与使用 [new Proxy(target, handler)](https://mdn.org.cn/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy "new Proxy(target, handler)") 调用创建的代理对象完全相同的代理对象。

[revoke](https://mdn.org.cn/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/revocable#revoke "revoke")

一个没有参数的函数，用于撤销（关闭）代理。

## [描述](https://mdn.org.cn/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/revocable#description "描述")

`Proxy.revocable()` 工厂函数与 [Proxy()](https://mdn.org.cn/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy "Proxy()") 构造函数相同，不同之处在于，除了创建代理对象之外，它还创建了一个 `revoke` 函数，该函数可以被调用以禁用代理。代理对象和 `revoke` 函数都封装在一个普通对象中。

`revoke` 函数不接受任何参数，也不依赖于 `this` 值。创建的 `proxy` 对象作为 [私有属性](https://mdn.org.cn/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties "私有属性") 附加到 `revoke` 函数上，`revoke` 函数在被调用时访问自身上的该属性（私有属性的存在在外部不可观察，但它对垃圾回收是如何发生的具有影响）。`proxy` 对象\_不会\_被捕获在 `revoke` 函数的 [闭包](https://mdn.org.cn/en-US/docs/Web/JavaScript/Closures "闭包") 中（如果 `revoke` 仍然存活，这将使 `proxy` 的垃圾回收变得不可能）。

在 `revoke()` 函数被调用后，代理将变得不可用：对处理程序的任何陷阱都会抛出一个 [TypeError](https://mdn.org.cn/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError "TypeError")。**一旦代理被撤销，它将保持撤销状态，再次调用 ****`revoke()`**** 不会有任何效果**——事实上，对 `revoke()` 的调用会将 `proxy` 对象从 `revoke` 函数中分离，因此 `revoke` 函数将完全无法再次访问代理。如果代理在其他地方没有被引用，那么它将有资格进行垃圾回收。`revoke` 函数还会将 `target` 和 `handler` 从 `proxy` 中分离，因此，即使其代理仍然存活，如果 `target` 在其他地方没有被引用，它也将有资格进行垃圾回收，因为不再有任何方法可以有意义地与目标对象交互。

允许用户通过可撤销代理与对象交互，**使您可以 控制公开给用户的对象的生命周期——即使用户仍然持有其代理的引用，您也可以使该对象成为垃圾回收的目标。**

## [示例](https://mdn.org.cn/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/revocable#examples "示例")

### [使用 Proxy.revocable()](https://mdn.org.cn/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/revocable#using_proxy.revocable "使用 Proxy.revocable()")

```typescript 
const revocable = Proxy.revocable(
  {},
  {
    get(target, name) {
      return `[[${name}]]`;
    },
  },
);
const proxy = revocable.proxy;
console.log(proxy.foo); // "[[foo]]"

revocable.revoke();

console.log(proxy.foo); // TypeError is thrown
proxy.foo = 1; // TypeError again
delete proxy.foo; // still TypeError
typeof proxy; // "object", typeof doesn't trigger any trap

```
