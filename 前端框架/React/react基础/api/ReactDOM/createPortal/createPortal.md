# createPortal

## 目录

- [通过 Portal 进行事件冒泡](#通过-Portal-进行事件冒泡)

Portal 提供了一种将子**节点渲染到存在于父组件以外的 DOM 节点**的优秀的方案。

```react tsx 
ReactDOM.createPortal(child, container)
```


上面这句话 了本质；&#x20;

- 第一个参数（child）是**任何可渲染的 React 子元素**，例如一个元素，字符串或 fragment。
- 第二个参数（container）是一个 DOM 元素。

一个 portal 的典型用例是当父组件有 overflow: hidden或 z-index样式时，但你需要**子组件能够在视觉上“跳出”其容器**。例如，对话框、悬浮卡以及提示框：

## 通过 Portal 进行事件冒泡

             尽管 portal 可以被**放置在 DOM 树中的任何地方**，但在**任何其他方面**，其**行为和普通的 React 子节点行为一致**。

\*\*由于 portal 仍存在于 \*\*​***React 树***，**且与 *****DOM 树*****中的位置无关**，那么无论其子节点是否是 portal，**像 context 这样的功能特性都是不变的。**

          这**包含事件冒泡** \*\*。一个从 portal 内部触发的事件会一直冒泡至包含 *****React 树*****的祖先，\*\***即便这些元素并不是 *****DOM 树*****中的祖先**。假设存在如下 HTML 结构：

```react tsx 
import React, { PureComponent, } from 'react'
import ReactDOM from 'react-dom';
const modalRoot = document.getElementById('modal-root');

class Modal  extends PureComponent {
    static propTypes = {

    }
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }
    componentDidMount() {
        // 在 Modal 的所有子元素被挂载后，
        // 这个 portal 元素会被嵌入到 DOM 树中，
        // 这意味着子元素将被挂载到一个分离的 DOM 节点中。
        // 如果要求子组件在挂载时可以立刻接入 DOM 树，
        // 例如衡量一个 DOM 节点，
        // 或者在后代节点中使用 ‘autoFocus’，
        // 则需添加 state 到 Modal 中，
        // 仅当 Modal 被插入 DOM 树中才能渲染子元素。
        modalRoot.appendChild(this.el);
    }
    
    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el
        );
    }
}
function Child() {
    //  这个按钮的点击事件会冒泡到父元素 
    // 因为这里没有定义 'onClick' 属性
    return (
      <div className="modal">
        <button>Click</button>
      </div>
    );
}

class Parent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {clicks: 0};
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
      // 当子元素里的按钮被点击时，
      // 这个将会被触发更新父元素的 state，
      // 即使这个按钮在 DOM 中不是直接关联的后代
      this.setState(state => ({
        clicks: state.clicks + 1
      }));
    }
  
    render() {
      return (
        <div onClick={this.handleClick}>
          <p>Number of clicks: {this.state.clicks}</p>
          <p>Open up the browser DevTools to observe that the button  is not a child of the div with the onClick handler.</p>
          <Modal>
            <Child />
          </Modal>
        </div>
      );
    }
  }


export default Parent
```


**一个很经典的例子；即使被点击的按钮不再dom树上，依然会被冒泡在react树上**
