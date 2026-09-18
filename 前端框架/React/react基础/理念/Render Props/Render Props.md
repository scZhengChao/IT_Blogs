# Render Props

## 目录

- [Render Props](#Render-Props)
  - [使用 Render Props 来解决横切关注点（Cross-Cutting Concerns）](#使用-Render-Props-来解决横切关注点Cross-Cutting-Concerns)
  - [注意事项](#注意事项)
    - [将 Render Props 与 React.PureComponent 一起使用时要小心](#将-Render-Props-与-ReactPureComponent-一起使用时要小心)

# Render Props

&#x20;术语 [“render prop”](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce "“render prop”")是指一种在**React 组件之间使用一个值为render函数的 prop 共享代码的简单技术**

具有 render prop 的组件接受一个函数，**该函数返回一个 React 元素并调用它而不是实现自己的渲染逻辑。**

```react jsx 
<DataProvider render={data => (<h1>Hello {data.target}</h1>)}/>
```


使用 render prop 的库有 [React Router](https://reacttraining.com/react-router/web/api/Route/render-func "React Router")、[Downshift](https://github.com/paypal/downshift "Downshift")以及 [Formik](https://github.com/jaredpalmer/formik "Formik")。

在这个文档中，我们将讨论为什么 render prop 是有用的，以及如何写一个自己的 render prop 组件。

## 使用 Render Props 来解决横切关注点（Cross-Cutting Concerns）

               这也是 render prop 的来历：我们可以**提供一个带有函数 prop 的 \<Mouse> 组件，它能够动态决定什么需要渲染的**，而不是将 \<Cat> 硬编码到 \<Mouse> 组件里，并有效地改变它的渲染结果。

```react tsx 
import React, { PureComponent } from 'react'

class Cat extends React.Component {
    render() {
      const mouse = this.props.mouse;
      return (
        <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
      );
    }
}
  
class Mouse extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = { x: 0, y: 0 };
    }

    handleMouseMove(event) {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }

render() {
    return (
    <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

        {/*
        Instead of providing a static representation of what <Mouse> renders,
        use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
    </div>
    );
}
}

class MouseTracker extends React.Component {
    render() {
        return (
            <div>
                <h1>移动鼠标!</h1>
                <Mouse render={mouse => (
                    <Cat mouse={mouse} />
                )}/>
            </div>
        );
    }
}
  
export default MouseTracker
```


       重要的是要记住，render prop 是因为模式才被称为 *render*prop ，你不一定要用名为 render的 prop 来使用这种模式。事实上，[***任何***](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce "任何")**被用于告知组件需要渲染什么内容的函数 prop 在技术上都可以被称为 “render prop**”

## 注意事项

### 将 Render Props 与 React.PureComponent 一起使用时要小心

             如果你在 render 方法里**创建函数**，那么**使用 render prop 会抵消使用 **[**React.PureComponent**](https://react.docschina.org/docs/react-api.html#reactpurecomponent "React.PureComponent")** 带来的优势**。因为**浅比较 props 的时候总会得到 false** **，** 并且在这种情况下每一个 render 对于 render prop 将会生成一个新的值。

     **为了绕过这一问题，有时你可以定义一个 prop 作为实例方法，类似这样****：** ​

```vue 
 class MouseTracker extends React.Component {
  // 定义为实例方法，`this.renderTheCat`始终
  // 当我们在渲染中使用它时，它指的是相同的函数
  renderTheCat(mouse) {
    return <Cat mouse={mouse} />;
  }

  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={this.renderTheCat} />
      </div>
    );
  }
}
```


             如果你无法静态定义 prop（例如，因为你需要关闭组件的 props 和/或 state），则 \<Mouse>应该扩展 React.Component。
