# 渲染原理到性能优化

## 目录

- [JSX ](#JSX-)
- [React.createElement的表达式](#ReactcreateElement的表达式)
- [element如何生成真实节点 ](#element如何生成真实节点-)
  - [初始化的规则](#初始化的规则)
    - [ReactDOMComponent](#ReactDOMComponent)
- [首次渲染 ](#首次渲染-)
- [更新渲染](#更新渲染)

# JSX&#x20;

这里是**一段写在render里的**jsx代码。&#x20;

```javascript 
 return (
    <div className="cn">
         <Header> Hello, This is React </Header>
         <div>Start to learn right now!</div>
         Right Reserve.
    </div>
)
```


# React.createElement的表达式

首先，它会经过\*\*babel编译成React.createElement的表达式。 \*\*

```javascript 
 return (
    React.createElement(
        'div',
        { className: 'cn' },
        React.createElement(
            Header,
            null,
            'Hello, This is React'
        ),
        React.createElement(
            'div',
            null,
            'Start to learn right now!'
        ),
        'Right Reserve'
    )
)

```


这个`createElement`方法是做什么的呢？&#x20;

其实从它的名字就可以看出，这是用来生成`element`的。`element`在`React`里，其实\*\*就是组成虚拟`DOM`树的节点，\*\*它用来描述你想要在浏览器上看到什么。

它的参数有三个：&#x20;

1. \*\*type -> 标签 \*\*
2. **`attributes`**\*\* -> 标签属性，没有的话，可以为null\*\*​
3. **`children`**\*\* -> 标签的子节点 \*\*

这个`React.createElement`的表达式会在`render`函数被调用的时候执行，换句话说，当`render`函数被调用的时候，会返回一个`element`。&#x20;

说了那么久`element`，这个element究竟长什么样呢？ 其实，**它就是一个对象**，如下:&#x20;

我们来观察一下这个对象的children，现在有三种类型：&#x20;

1. \*\*string \*\*
2. \*\*原生DOM节点 \*\*
3. \*\*React Component - 自定义组件 \*\*

除了这三种，还有两种类型：&#x20;

1. \*\*fale ,null, undefined,number \*\*
2. \*\*数组 - 使用map方法的时候 \*\*

这里需要记住一个点：\*\*element不一定是Object类型。 \*\*

# element如何生成真实节点&#x20;

顺利得到`element`之后，我们再来看看**React是如何把element转化成真实DOM节点的。**&#x20;

首先，需要去初始化`element`,\*\*初始化的规则如下： \*\*

## 初始化的规则

先判断是否为`Object`类型，是的话，**看它的**\*\*`type`****是否是原生****`DOM`\*\***标签**，是的话，给它创建`ReactDOMComponent`的实例对象，其他同理。&#x20;

![  ](./assets/image/2da306d799762cd213fac39fb72bb7a4_hhBS4fLwIR.png "  ")

这时候有的人可能会有所疑问：这些个`ReactDOMComponent`, `ReactCompositeComponentWrapper`怎么开发的时候都没有见过？    &#x20;

其实这些**都是React的私有类，React**自己使用，不会暴露给用户的。它们的常用方法有：`mountComponent`,`updateComponent`等。其中mountComponent 用于创建组件，而updateComponent用于用户更新组件。而我们自定义组件的生命周期函数以及render函数都是在这些私有类的方法里被调用的。&#x20;

既然这些私有类的方法那么重要我们就先来简单了解一下吧\~&#x20;

#### ReactDOMComponent

首先是ReactMComponent的mountComponent方法，这个方法的作用是：将element转成真实DOM节点，并且插入到相应的container里，然后返回markup（realDOM）。&#x20;

由此可知ReactDOMComponent的mountComponent是element生成真实节点的关键。&#x20;

下面看个栗子它是怎么做到的吧。&#x20;

假设有这样一个type类型是原生DOM的element:&#x20;

```javascript 
 {
  type: 'div',
    props: {
    className: 'cn',
      children: 'Hello world',
    }
}
```


简单`mountComponent`的实现：

```javascript 
 mountComponent(container) {
  const domElement = document.createElement(this._currentElement.type);
  const textNode = document.createTextNode(this._currentElement.props.children);

  domElement.appendChild(textNode);
  container.appendChild(domElement);
  return domElement;
}

```


其实实现的过程很简单，就是根据type生成domElement,再将子节点append进来返回。当然，真实的mountComponent没有那么简单，感兴趣的可以自己去看源码啦。&#x20;

**这里需要记住的一个点是：** ​**这个类的mountComponent方法会自己操作浏览器DOM元素。**

讲完ReactDOMComponent，再来看看ReactCompositeComponentWrapper。&#x20;

ReactCompositeComponentWrapper&#x20;

这个类的mountComponent方法作用是：实例化自定义组件，最后是通过递归调用到ReactDOMComponent的mountComponent方法来得到真实DOM。&#x20;

注意：也就是说他自己是不直接生成DOM节点的。&#x20;

那这个递归是一个怎样的过程呢？我们通过首次渲染来看下。&#x20;

# 首次渲染&#x20;

假设我们有一个Example的组件，它返回\<div>hello world\</div> 这样一个标签。&#x20;

首次渲染的过程如下：&#x20;

![  ](./assets/image/629fb5cb1000382cc29a75ffde13ce97_gDuVMczSAA.png "  ")

首先从React.render开始，由于我们刚刚说，render函数被调用的时候会返回一个element，所以此时返回给我们的element是：  &#x20;

```javascript 
 {
  type: function Example,
  props: {
    children: null
  }
}
```


由于这个`type`**是一个自定义组件类**，此时要初始化的类是ReactCompositeComponentWrapper,接着调用它的mountComponent方法。这里面会做四件事情，详情可以看上图。其中，第二步的render的得到的element为：&#x20;

```javascript 
 {
  type: 'div',
    props: {
    children: 'Hello World'
  }
}

```


        由于这个type是一个原生DOM标签，此时要初始化的类是ReactDOMComponent。接下来它的mountComponent方法就可以帮我们生成对应的DOM节点放在浏览器里啦。&#x20;

        这时候有人可能会有疑问，如果第二步render出来的element 类型也是自定义组件呢？&#x20;

这时候它就会去调用ReactCompositeComponentWrapper的mountComponent方法，从而形成了一个递归。不管你的自定义组件嵌套多少层，最后总会生成原生dom类型的element，所以最后一定能调用到ReactDOMComponent的mountComponent方法。&#x20;

但是还有一个问题：前面我们说自定义组件的生命周期跟render函数都是在私有类的方法里被调用的，现在只看到render函数被调用了，那么首次渲染时候生命周期函数 componentWillMount 跟 componentDidMount 在哪被调用呢？&#x20;

由图可知，在第一步得到instance对象之后，就会去看instance.componentWillMount是否有被定义，有的话调用，而在整个渲染过程结束之后调用componentDidMount。  &#x20;

以上，就是渲染原理的部分，让我们来总结以下：&#x20;

          **JSX代码经过babel编译之后变成React.createElement的表达式，** 这个表达式在render函数被调用的时候执行生成一个element。

            在首次渲染的时候，先去按照规则初始化element，接着ReactComponentComponentWrapper通过递归，最终调用ReactDOMComponent的mountCompo&#x20;

# 更新渲染

触发组件的更新有两种更新方式：props以及state改变带来的更新。本次主要解析state改变带来的更新。整个过程流程图如下：

![  ](./assets/image/e23fc3e39c4140dd49dd1f83ea78c721_FwwcZjKvmY.png "  ")

1、一般改变state，都是从setState开始，这个函数被调用之后，会将我们传入的state放进pendingState的数组里存起来，然后判断当前流程是否处于批量更新，如果是，则将当前组件的instance放进dirtyComponent里，当这个更新流程中所有需要更新的组件收集完毕之后（这里面涉及到事务的概念，感兴趣的可以自己去了解一下）就会遍历dirtyComponent这个数组，调用他们的uptateComponent对组件进行更新。当然，如果当前不处于批量更新的状态，会直接去遍历dirtyComponent进行更新。&#x20;

2、在我们这个例子中，由于Example是自定义组件，所以调用的是ReactCompositeComponentWrapper这个类的updateComponent方法，这个方法做三件事。&#x20;

- 计算出nextState&#x20;
- render()得到nextRenderElement&#x20;
- 与prevElement 进行Diff 比较（这个过程后面会介绍）,更新节点&#x20;

最后这个需要去更新节点的时候，跟首次渲染一样，也需要调用ReactDOMComponent的updateComponent来更新。其中第二步render得到的也是自定义组件的话， 会形成递归调用。

shouldComponentUpdate&#x20;

由图可知，shouldComponentUpdate在第一步调用得到nextState之后调用，因为nextState也是它的其中一个参数嘛\~这个函数很重要，它是我们性能优化的一个很关键的点：

\*\*由图可以看到，当shouldComponentUpdate返回false的时候，下面的一大块都不会被去执行，包括已经被优化的diff算法。 \*\*

当shouldComponentUpdate返回true的时候，会先调用componentWillUpdate，在整个更新过程结束之后调用componentDidUpdate。&#x20;
