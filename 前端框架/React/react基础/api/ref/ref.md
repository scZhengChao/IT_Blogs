# ref

## 目录

- [Refs and the DOM](#Refs-and-the-DOM)
  - [何时使用 Refs](#何时使用-Refs)
  - [勿过度使用 Refs](#勿过度使用-Refs)
  - [在高阶组件中转发 refs](#在高阶组件中转发-refs)
  - [Refs 与函数组件](#Refs-与函数组件)
  - [回调 Refs](#回调-Refs)

# Refs and the DOM

## 何时使用 Refs

下面是几个适合使用 refs 的情况：

- 管理焦点，文本选择或媒体播放。
- 触发强制动画。
- 集成第三方 DOM 库。

**避免使用 refs 来做任何可以通过声明式实现来完成的事情。**

举个例子，避免在 Dialog 组件里暴露 open() 和 close() 方法，最好传递 isOpen 属性。

## 勿过度使用 Refs

       你可能首先会想到使用**refs 在你的 app 中“让事情发生”**。如果是这种情况，请花一点时间，认真再考虑一下 state 属性应该被安排在哪个组件层中。通常你会想明白，让**更高的组件层级拥有这个 state，是更恰当的** \*\*。查看 \*\*[**状态提升**](https://react.docschina.org/docs/lifting-state-up.html "状态提升")

**你不能在函数组件上使用 ref 属性，因为他们没有实例。函数式组件里的dom元素是可以添加ref的，组件不能**

## 在高阶组件中转发 refs

&#x20;        **refs 将不会透传下去。这是因为 ref不是 prop 属性。就像 key一样，其被 React 进行了特殊处理**。如果你对 HOC 添加 ref，**该 ref 将引用最外层的容器组件**，而不是被包裹的组件。

&#x20;        幸运的是，我们可以使用**React.forwardRefAPI 明确地将 refs 转发到内部的组件**或者元素

```vue 
function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      const {forwardedRef, ...rest} = this.props;

      // 将自定义的 prop 属性 “forwardedRef” 定义为 ref
      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  // 注意 React.forwardRef 回调的第二个参数 “ref”。
  // 我们可以将其作为常规 prop 属性传递给 LogProps，例如 “forwardedRef”
  // 然后它就可以被挂载到被 LogProps 包裹的子组件上。
   return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
 }
```


## Refs 与函数组件

&#x20;     默认情况下，你不能在函数组件上使用 ref 属性，因为它们没有实例：

**[**forwardRef**](https://react.docschina.org/docs/forwarding-refs.html "forwardRef")**（可与 \*\*[**useImperativeHandle**](https://react.docschina.org/docs/hooks-reference.html#useimperativehandle "useImperativeHandle")**结合使用）**，或者可以将该组件转化为 class 组件。

不管怎样，你可以在函数组件内部使用 ref 属性，只要它指向一个 DOM 元素或 class 组件：

```vue 
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);

```


## 回调 Refs

```vue 
 class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = null;
    this.setTextInputRef = element => {
      this.textInput = element;
    };
    this.focusTextInput = () => {
      // 使用原生 DOM API 使 text 输入框获得焦点
      if (this.textInput) this.textInput.focus();
    };
  }
  componentDidMount() {
    // 组件挂载后，让文本框自动获得焦点
    this.focusTextInput();
  }
  render() {
    // 使用 `ref` 的回调函数将 text 输入框 DOM 节点的引用存储到 React
    // 实例上（比如 this.textInput）
    return (
      <div>
        <input
          type="text"
          ref={this.setTextInputRef}
        />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```


\*\*         React 将在组件挂载时，会调用 ref 回调函数并传入 DOM 元素，当卸载时调用它并传入 null。\*\* **在 componentDidMount 或 componentDidUpdate 触发前，React 会保证 refs 一定是最新的。**

\*\*        如果 ref 回调函数是****以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数 null，然后第二次会传入参数 DOM 元素****。\*\*

        你可以在**组件间传递回调形式的 refs**，就像你可以传递通过 React.createRef() 创建的对象 refs 一样。

```vue 
 function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput
        inputRef={el => this.inputElement = el}
      />
    );
  }
}
```
