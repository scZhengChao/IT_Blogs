# children的处理

## 目录

- [Children作判断条件](#Children作判断条件)
  - [toArray ](#toArray-)
- [子组件重复渲染](#子组件重复渲染)
- [总结：](#总结)

## Children作判断条件

在某些场景下我们可能会写一个组件来处理逻辑，例如：

```javascript 
function Wrap (props) {
   if (props.children) { 
    return (
     <div>
        <p>当前内容为：</p>
        <div>{props.children}</div>
      </div>
    )
  } else {
    return (
     <div>nothing</div>
    )
  }
}

function App () {
  return (
   <Wrap>
     <div>零一</div>
    </Wrap>
  )
}
```


这段代码看起来也是毫无问题（当有传递给 `<Wrap/>` 组件 `children` 属性时，直接展示内容；否则展示 `nothing` ，表示当前为空），但其实存在很多漏洞情况，例如：

```javascript 

function App () {
  return (
   <Wrap>
     {
        list.map(item => <span>{item}</span>)
      }
    </Wrap>
  )
}

```


假设此时变量`list` 为 `[]` ，那么 `Wrap` 组件中接收到的 `children` 则也为 `[]`，那么 `if (props.children)` 的判断结果也为 `true`，则页面会这样展示：

![](https://mmbiz.qpic.cn/mmbiz_png/lgHVurTfTcwH08e8Eibr8WqQn8oG2Cx98DgkcXMcJugqasibSjdeia3icV4DkPCdibau1p61ZxicfalljQcEC4KtPyxQ/640?wx_fmt=png\&tp=webp\&wxfrom=5\&wx_lazy=1\&wx_co=1)

这显然不是我们想要的结果。我们想要的效果是：当接收到空数组时，也展示 `nothing` ，即为空

有什么解决方案呢？

React 提供了现成的用于处理 `children`的 API：

- React.Children.map
- React.Children.forEach
- React.Children.count
- React.Children.only
- React.Children.toArray

这里就不一一介绍每个的作用了，[想要了解的可以直接去官网看：](https://zh-hans.reactjs.org/docs/react-api.html#reactchildren "想要了解的可以直接去官网看：")

### `toArray`&#x20;

我们直接挑重点说，可以直接用 `React.Children.toArray` 来做处理，该方法可以把 `children` 统一变成数组的形式

还是用刚才的那个例子，我们改造一下看看返回了什么：

```javascript 
import { Children } from 'react'

function Wrap (props) {
  // 用 Children.toArray 来处理 props.children
   if (Children.toArray(props.children).length) {
     return (
     <div>
        <p>当前内容为：</p>
        <div>{props.children}</div>
      </div>
    )
  } else {
    return (
     <div>nothing</div>
    )
  }
}

function App () {
  return (
   <Wrap>
     { // 返回空数组
        [].map(item => <span>{item}</span>)
      }
    </Wrap>
  )
}
```


此时页面展示的是：

![](image_HzCrl2aJ1w.png)

为什么会这样呢？打个断点进去看了一下 `React.Children.toArray` 大致都做了什么处理，这里简单总结一下：将 `children` **传过来的每个元素都放到一个数组中再返回，并会过滤掉空数组、Boolean、undefined**

所以我们刚才的例子中，空数组直接被过滤掉了。我们再来验证一下 `React.Children.toArray` 的强大，举个例子🌰

```javascript 
function App () {
  return (
   <Wrap>
      {
        false && <span>作者：零一</span>
      }
      {true}
     { // 返回空数组
        [].map(item => <span>{item}</span>)
      }
      {
        {}?.name
      }
    </Wrap>
  )
}
```


这种情况，`<Wrap/>` 组件接收到的 `children` 值应为：

```javascript 
[
  false,
  true,
  [],
  undefined,
]
```


那么页面展示的是什么呢？

![](image_oXg60sMBWL.png)

是的，还是`nothing`，因为这四种情况的值全都被 `React.Children.toArray` 给过滤掉了，最终返回的值为 `[]` ，这也十分符合我们开发时的预期

所以如果你真的需要把 `children` 作为条件判断的依据的话，我建议是用这个方法！

## 子组件重复渲染

现象：子组件内部状态没变；但是随着父组件不停的重复渲染

解决：

- 如果你需要以props的方式传给子组件；不要在render中定义**复杂的数据类型；比如 { }, \[ ], jsx对象，等等**…..；可以以一个函数的形式；传进去；这些都是导致重复渲染的元凶
- 接上一条：如果props 是jsx 或者组件；以函数的形式传进去；可能(PureComponent)导致数据更新但是视图不渲染
- 写在标签内的方式：

```javascript 
function Son(props) {
    console.log('child render!---',props);
    console.log(data === props)
    data = props
    return <div>Son</div>;
}

function Parent(props) {
    const [count, setCount] = React.useState(0);
    return (
        <div onClick={() => {setCount(count + 1)}} style={{
            backgroundColor:'red'
        }}>
            count:{count}
             {/*{props.children}*/}      ( props.children 是父组件第一次创建时生成好的jsx，所以Son对应的JSX与上次更新时一致，JSX中保存的props也就一致，也就不会重新渲染） 

 
            {/*<Son/>*/}
            {React.createElement(Son, null)}   注意：即使你传的是null；son收到的也是空对象；也是每次都要刷新的原因（每次的引用都不同）
        </div>
    );
}


function TestRender() {
  const [count, setCount] = React.useState(0);
    return (
       <div onClick={() => {setCount(count + 1)}} >
          <Parent>
            <Son/>  <===>  React.createElement(Son, null)
        </Parent>
        </div>
    );
}
export default TestRender
```


## 总结：

&#x20;         上面这个例子：在parent里setCount 和 TestRender 里 setCount 结果完全不同；尽管 parent son  都用不到数据更新视图；尽管本身也不会重新渲染；但是parent也会重新render；

****React.createElement(Son, null) ****每次渲染****都会生成新的jsx对象****； \*\*（**推荐props.children这种写法**）
