# react FAQ

## 目录

- [memoization](#memoization)
- [pureComponent 和 Component ](#pureComponent-和-Component-)
  - [灵魂拷问：](#灵魂拷问)
- [不必要的渲染](#不必要的渲染)
- [watch](#watch)
- [内存泄漏](#内存泄漏)
  - [react在组件卸载跟新state会警告](#react在组件卸载跟新state会警告)

# memoization

            把派生 state 用作 memoization 并不是什么坏事情，但是这并不是好的方法。管理派生 state 本来就很复杂，而且这种复杂度是随着需要管理的属性变得越来越庞大。比如，如果我们想在组件 state 里添加第二个派生 state，那就需要写两份跟踪变化的逻辑。

           这里有个示例，组件使用一个 prop ————一个列表————并在用户输入查询条件时显示匹配的项，我们可以使用派生 state 存储过滤后的列表：

```vue 
 class Example extends Component {
  state = {
    filterText: "",
  };

  // *******************************************************
  // 注意：这个例子不是建议的方法。
  // 下面的例子才是建议的方法。
  // *******************************************************

  static getDerivedStateFromProps(props, state) {
    // 列表变化或者过滤文本变化时都重新过滤。
    // 注意我们要存储 prevFilterText 和 prevPropsList 来检测变化。
    if (
      props.list !== state.prevPropsList ||
      state.prevFilterText !== state.filterText
    ) {
      return {
        prevPropsList: props.list,
        prevFilterText: state.filterText,
        filteredList: props.list.filter(item => item.text.includes(state.filterText))
      };
    }
    return null;
  }

  handleChange = event => {
    this.setState({ filterText: event.target.value });
  };

  render() {
    return (
      <Fragment>
        <input onChange={this.handleChange} value={this.state.filterText} />
        <ul>{this.state.filteredList.map(item => <li key={item.id}>{item.text}</li>)}</ul>
      </Fragment>
    );
  }
}
```


               这个实现避免了重复计算 filteredList，但是过于复杂。因为它必须单独追踪并检测 prop 和 state 的变化，在能及时的更新过滤后的 list。我们

**可以使用 PureComponent，把过滤操作放到 render 方法里来简化这个组件：（非常的好，类似比computed）**

```vue 
 // PureComponents 只会在 state 或者 prop 的值修改时才会再次渲染。
// 通过对 state 和 prop 的 key 做浅比较（ shallow comparison ）来确定有没有变化。
class Example extends PureComponent {
  // state 只需要保存 filter 的值：
  state = {
    filterText: ""
  };

  handleChange = event => {
    this.setState({ filterText: event.target.value });
  };

  render() {
    // PureComponent 的 render 只有
    // 在 props.list 或 state.filterText 变化时才会调用
    const filteredList = this.props.list.filter(
      item => item.text.includes(this.state.filterText)
    )

    return (
      <Fragment>
        <input onChange={this.handleChange} value={this.state.filterText} />
        <ul>{filteredList.map(item => <li key={item.id}>{item.text}</li>)}</ul>
      </Fragment>
    );
  }
}
```


            上面的方法比派生 state 版本更加清晰明了。**只有在过滤很大的列表时，这样做的效率不是很好**。当有 prop 改变时 ；**PureComponent不会阻止再次渲染。**为了解决这两个问题，我们可以添加 memoization 帮助函数来**阻止非必要的过滤：**

```vue 
 import memoize from "memoize-one";

class Example extends Component {
  // state 只需要保存当前的 filter 值：
  state = { filterText: "" };

  // 在 list 或者 filter 变化时，重新运行 filter：
  filter = memoize(
    (list, filterText) => list.filter(item => item.text.includes(filterText))
  );

  handleChange = event => {
    this.setState({ filterText: event.target.value });
  };

  render() {
    // 计算最新的过滤后的 list。
    // 如果和上次 render 参数一样，`memoize-one` 会重复使用上一次的值。
    const filteredList = this.filter(this.props.list, this.state.filterText);

    return (
      <Fragment>
        <input onChange={this.handleChange} value={this.state.filterText} />
        <ul>{filteredList.map(item => <li key={item.id}>{item.text}</li>)}</ul>
      </Fragment>
    );
  }
}
```


# pureComponent 和 Component&#x20;

          PureComponent  与 Component  的唯一差别就在于：**PureComponent  帮你做了 shouldComponentUpdate  的判断。**

           **一个对象指向同一个引用地址会导致 PureComponent 不更新，相反的，每次都传入一个新对象就会导致 PureComponent 每次都执行 render**，与 Component 也就不再有区别。&#x20;

**有下面几种情况会导致 props 每次都传入一个新对象。**&#x20;

1. bind a function

```javascript 
 <CommentItem likeComment={() => this.likeComment(user.id)} />
```


1. 在 render 中生成新对象往子组件中传递

```javascript 
 render() {
  const { posts } = this.props;
  const topTen = [...posts].sort((a, b) => 
    b.likes - a.likes).slice(0, 9);
  return (
    <Posts items={topTen} />
  );
}
```


1. someArray || \[], someObject || {}, ...

```javascript 
 render() {
  const { posts } = this.props;
  // 当 posts == false 时，传入 [] 相当于每次都传入一个新对象
  return (
    <Posts items={posts || []} />
  );
}
```


## 灵魂拷问：

是不是应该总是优先使用 PureComponent 而不是 Component ？&#x20;

1. 子组件也需要是纯组件

Make sure all the children components are also “pure”.

父组件如果是 PureComponent，当 state 和 props 保持不变时是不会重新渲染的，子组件也就不会重新渲染了。如果你遇到 props 更新时组件无法更新，就可以排查一下是不是组件树的哪一级误用了 PureComponent。

1. PureComponent 是不是任何情况下都比 Component 性能好？

         由于每次传入的 style 都是一个新对象，所以我们已经可以预知这个组件是每次都需要 rerender 的。**此时 PureComponent 每次都要执行一次 shallowEqual 对比，反而比 Component 更消耗性能。**

```javascript 
 render() {
  const { item } = this.props;
  return <Post item={item} style={{ 'width': 120 }} />;
}
```


         所以结论是，如果你**已经预期到某个组件的 props 或是 state 会「频繁变动**」 **，那就根本不用使用 PureComponent，因为这样反而会变慢。**

# 不必要的渲染

```javascript 
 //不要在组件上定义 引用性对象 作为props
//例如：
class App {
  render() {
    return <Child id={this.state.id} onChange={id => this.setState({ id })} />
  }
}
useEffect(() => {
  props.onChange(props.id)
}, [props.onChange, props.id])

//这样会导致死循环。虽然看上去 <App> 只是将更新 id 的时机交给了子元素 <Child>，但由于 onChange 函数在每次渲染时都会重新生成，因此引用总是在变化，就会出现一个无限死循环：

//新 onChange -> useEffect 依赖更新 -> props.onChange -> 父级重渲染 -> 新 onChange...

//想要阻止这个循环的发生，只要改为 onChange={this.handleChange} 即可，useEffect 对外部依赖苛刻的要求，只有在整体项目都注意保持正确的引用时才能优雅生效。


```


# watch

       vue的watch和computed 属性非常好用；但是**react的思想就是单项数据流**，只解决视图层面的问题。react的状态 都是setState触发的 **，react本身不监听数据**。

[常见处理](evernote:///view/21815029/s49/fdcaa43c-2b5e-42a4-956f-e07349c799ef/fdcaa43c-2b5e-42a4-956f-e07349c799ef/ "常见处理")

      那react怎么处理：在实践中可以尝试在 state 里放一个**定义了 getter 和 setter 的对象，在 setter 里来发这个请求，响应后再 setState 回去**。。。不知道getter 和 setter 可以去对象里了解一下。

如果单纯react的话 如果状态发生变化，会触发组件生命周期中的如下方法：

```vue 
 componentWillUpdate(object nextProps, object nextState) 
componentDidUpdate(object prevProps, object prevState)
```


如果使用redux等的话，一般状态变化是由dispatch引起的，你在dispatch的回调中执行你想要的就可以了。

所以要么 mobx 了解一下？

# 内存泄漏

## react在组件卸载跟新state会警告

Can't perform a React state update on an unmounted component.

大意就是说不能更新一个已经被卸载的组件的state.

万精油解决方案：

```javascript 
componentWillUnmount(){
  this.setState = (state,callback)=>{
    return 
  }
}
```
