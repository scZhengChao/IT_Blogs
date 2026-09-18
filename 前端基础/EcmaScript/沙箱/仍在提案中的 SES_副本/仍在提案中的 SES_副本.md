# 仍在提案中的 SES\_副本

该特性是还在提案中的特性，但是已经可以在大多数引擎中使用了，它支持 `ESM` 模块调用，也可以直接通过 `<script>` 直接引入使用。

该特性主要是通过 `Object.freeze` 来隔离出安全沙箱，从而安全地执行第三方代码，使用方法如下：

```javascript 
<script src="https://unpkg.com/ses" charset="utf-8"></script>
<script>
    const c = new Compartment();
    const code = `
        (function () {
            const arr = [1, 2, 3, 4];
            return arr.filter(x => x > 2);
        })
    `
    const fn = c.evaluate(code);
    console.log(arr); // ReferenceError: arr is not defined
    console.log(fn()); // [3, 4]
</script>

```


相关文档：

[www.npmjs.com/package/ses](https://link.juejin.cn?target=https://www.npmjs.com/package/ses "www.npmjs.com/package/ses")

由于该特性仍在提案中，因此未来改动可能会比较大，例如，最初是由 iframe 来实现，但现在已经由 `Proxy + Object.freeze` 来实现了。

也得益于放弃使用 `iframe` 从而使得代码可以同步执行，不必再使用 `postMessage` 来异步通信了。
