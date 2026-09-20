# 使用注意事项​

## 目录

- [Stale Props 和 "Zombie Children"](#Stale-Props-和-Zombie-Children)

### Stale Props 和 "Zombie Children"

> 自从 v7.1.0 中发布了 hook API，React-Redux 的 hook API 就已经可以被引入生产环境，**我们推荐你在组件中使用 hook API 作为默认方法**。然而，这可能会导致一些边缘情况，**我们将这些情况记录下来，以便你能了解它们**。
> 实际情况下，这些问题比较罕见——我们收到的关于文档中存在这些问题的评论远远多于关于这些问题在应用中成为实际问题的报告。

React Redux 实现中最困难的方面之一是明确你的 `mapStateToProps` 函数是否被定义为 `(state, ownProps)`，它每次都会以"最新的" props 被调用。直到第 4 个版本，经常有涉及边缘情况的错误报告，例如从 `mapState` 函数中抛出列表项的数据刚被删除之类的错误。

从版本 5 开始，React Redux 试图用 `ownProps` 来保证这种一致性。在第 7 版中，在 `connect()` 内部使用自定义的 `Subscription` 类实现这个过程，它形成了一个嵌套结构。这确保树中较低层的连接组件只有在最近的连接祖先被更新后才会收到 store 更新通知。然而，这依赖于每个 `connect()` 实例覆盖内部 React 上下文的一部分，并提供自己独特的 `Subscription` 实例以形成嵌套，并使用新上下文的值渲染 `<ReactReduxContext.Provider>`。

有了 hook，就没有办法渲染一个上下文 provider，这意味着也没有嵌套的订阅层次结构。正因为如此，应用中的"stale props"和"zombie child"问题有可能在使用 hook 而不是 `connect()` 时重新出现。

具体来说，"stale props" 是指当下述任何情况发生时：

- **一个 selector 函数依赖于这个组件的 props 来提取数据**
- **父级组件 *****会***** 重新渲染并向下传递新的 props 作为 action 的结果**
- **但这个组件的 selector 函数在这个组件有机会用新 props 重新渲染之前就已经执行了**

根据所使用的 props 和当前的 store state，这 *可能* 会导致从 selector 返回不正确的数据，甚至抛出一个错误。

"Zombie child" 是指当下述任何情况发生时：

- **多个嵌套连接的组件在一次传入时 mount，导致子组件先于其父组件订阅 store**
- **dispatch 一个 action 来删除 store 中的数据，例如一个 todo 项**
- **父组件会因此而停止渲染子组件**
- **然而，由于子组件先订阅了 store，其订阅会在父组件停止渲染子组件之前运行。当它依赖 props 从 store 中读取一个值时，该数据不存在，如果提取逻辑不细心，这可能会导致抛出一个错误。**

`useSelector()` 试图在 store 更新时，通过捕捉 selector 执行抛出的所有错误（但不是在渲染期间执行时）来处理这个问题。当错误发生时，该组件将被强制渲染，此时 selector 将被再次执行。只要 selector 是一个纯函数，并且不依赖于 selector 抛出的错误，这就可以了。

如果你喜欢自己处理这个问题，这里有一些可能的选择，可以用 `useSelector()` 完全避免这些问题：

- **不要在 selector 函数中依赖 props 来提取数据**
- 如果你在 selector 函数中依赖 props，*而且* 这些 props 可能会随着时间的推移而改变，*或者* 你要提取的数据可能是基于可以被删除的项目，请**尝试以防御的方式编写 selector 函数**。不要直接进入 `state.todos[props.id].name` ——首先读取 `state.todos[props.id]`，并在试图读取 `todo.name` 之前验证它是否存在。
- 因为 `connect` 向上下文 provider 添加了必要的 `Subscription`，并且直到被连接的组件重新渲染之前都不会评估子组件的订阅，因此，在组件树中使用 `useSelector` 在组件上方放置被连接组件，只要被连接组件由于 store 更新而重新渲染，就可以防止这些问题，其中被连接组件的 store 与 hook 组件的相同。
