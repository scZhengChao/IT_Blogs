# babel-runtime

## 目录

- [主要功能](#主要功能)
- [补充](#补充)

[babel-runtime](https://link.juejin.cn/?target=https://babel.dev/docs/babel-runtime "babel-runtime") 是一个由 `Babel` 提供的运行时库，它包括了一些**在编译过程中需要用到的辅助函数和类**，例如 `ES6/ES7 `语法的 `polyfill`、`generator` 函数的处理、`Promise` 的实现等。

## 主要功能

`babel-runtime` 的实现主要功能有两点：

1. **将转译中需要的** **`helper`**\*\* 函数\*\* **从一个模块中引入，避免重复定义、减小打包体积**

下面是一些常见的辅助函数和类的实现：

- **classCallCheck**：用于实现 ES6 类的构造函数中的类检查。它会检查是否使用 `new` 关键字来调用类，并在没有正确调用的情况下抛出错误。
- **defineEnumerableProperties**：用于定义对象的可枚举属性。它接受一个对象和一组属性描述符，并将这些属性添加到对象中，并确保它们是可枚举的。
- **extends**：用于实现 ES6 类继承的辅助函数。它会创建一个新的子类，并确保正确设置原型链和构造函数。
- **asyncToGenerator**：用于将 `generator` 函数转换为基于 `Promise` 的异步函数的辅助函数。它接受一个 `generator` 函数并返回一个新的函数，该函数可以像普通的异步函数一样被调用。
- **regeneratorRuntime**：用于支持 `generator` 函数的运行时库。它提供了 `generator` 函数所需的运行时环境，包括状态机、迭代器和 `Promise` 的支持。

1. **开发类库/工具时，避免生产污染全局空间的方法。**

我们举个例子：

在一个项目中，我们定义了一个 Array 原型链上的方法（比如 `Array.includes()`)，项目依赖 `babel-polyfill` 实现转译。此时，项目引入一个依赖，调用的方法需要使用 `Array.includes()`，那么在打包时，由于 `polyfill` 导入于全局环境，就会出现冲突，导致出错。

解决方案就是用 `babel-runtime` 处理**全局内置对象，将其模块化，并通过模块导入的方式引入。**

## 补充

然而 `@babel/runtime` 没有支持实例方法，只能通过配置 `corejs` ，使用 `babel/runtime-corejs@x`

控制相关 `polyfill` 的引入，然而 `core-js2` 的 `polyfill` 覆盖范围相对较小，以下陈列了相关包的区别：

- **@babel/polyfill**：`core-js` + `regenerator-runtime`，`Babel` 7.4.0后弃用。
- **@babel/runtime**：`Babel` 默认的运行时依赖模块，提供相关 `helpers` 函数和`regenerator-runtime`，不包含任何 `polyfill` 功能。
- **@babel/runtime-corejs2**：基于 `@babel/runtime` ，提供了 `core-js2` 支持部分 `polyfill`。
- **@babel/runtime-corejs3**：基于 `@babel/runtime` ，提供了 `core-js3` 支持更广泛的 `polyfill`。

> 需要注意的是，`babel-runtime`\*\* 只是一个工具库\*\*，需要和 [babel-plugin-transform-runtime](https://link.juejin.cn?target=https://babeljs.io/docs/babel-plugin-transform-runtime "babel-plugin-transform-runtime") **配合使用。**

[babel-plugin-transform-runtime](babel-plugin-transform-runtime.md "babel-plugin-transform-runtime")
