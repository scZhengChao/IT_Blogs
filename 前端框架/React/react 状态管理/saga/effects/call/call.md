# call

## 目录

- [call(fn, ...args)](#callfn-args)
- [call(\[context, fn\], ...args)](#callcontext-fn-args)
- [apply(context, fn, \[args\])](#applycontext-fn-args)

### call(fn, ...args)

> 创建一个 Effect 描述信息，用来命令 middleware 以参数 args 调用函数 fn。

### call(\[context, fn], ...args)

> 类似 call(fn, ...args)，但支持传递 this 上下文给 fn,在调用对象方法时很有用。

### apply(context, fn, \[args])

> call(\[context, fn], ...args) 的另一种写法。
