# Hooks FAQ

## 目录

- [向外暴露方法给父组件使用](#向外暴露方法给父组件使用)
- [有类似实例变量的东西吗？](#有类似实例变量的东西吗)
  - [注意：](#注意)
- [推荐实践：](#推荐实践)
  - [组件定义 ](#组件定义-)
    - [FAQ ](#FAQ-)
  - [局部状态 ](#局部状态-)
    - [useState ](#useState-)
    - [useRef ](#useRef-)
    - [useReducer ](#useReducer-)
    - [FAQ ](#FAQ-)
  - [函数 ](#函数-)

[Hooks FAQ ](https://zh-hans.reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback "Hooks FAQ ")

# 向外暴露方法给父组件使用

[https://www.jianshu.com/p/2bf67fe2ff46](https://www.jianshu.com/p/2bf67fe2ff46 "https://www.jianshu.com/p/2bf67fe2ff46")

[https://www.v2ex.com/t/678059](https://www.v2ex.com/t/678059 "https://www.v2ex.com/t/678059")

推荐：

useImperativeHandle 向外暴露api

```javascript 
 function  AddAbnormalGoods (props:ISProps,ref:any):React.ReactElement {   
  useImperativeHandle(ref,()=>({
            componentWillAppear(){
                removeOnPlayCompletionSubscript = audioRecordUtils.onPlayCompletion(() => {
                    setIsPlaying(false)
                })
            },
            componentWillDisappear(){
                if (removeOnPlayCompletionSubscript) {
                    removeOnPlayCompletionSubscript()
                    removeOnPlayCompletionSubscript = null
                }
                stopRecord()
            },
            props
        })
    )
}
```


# 有类似实例变量的东西吗？

```javascript 
 function Timer() {
  //可以存储一些跨声明周期的 数据；渲染前后数据不变
  const intervalRef = useRef();

  useEffect(() => {
    const id = setInterval(() => {
      // ...
    });
    intervalRef.current = id;
    return () => {
      clearInterval(intervalRef.current);
    };
  });

  // ...
}


```


## 注意：

```javascript 
 
//不能结构出来

//下面这种写法是无效的的，
function  AddAbnormalGoods (props:ISProps,ref:any):React.ReactElement {
     const instance = useRef<ISRefInstance>({
          removeOnPlayCompletionSubscript:null,
          timer:null,
          voiceImg:null,
          animatedView:null
      })
    
      let {removeOnPlayCompletionSubscript,timer,voiceImg,animatedView} = instance
   }

//这样也不行
  let clientPicker = useRef<any>(null).current
  let brands = useRef<any[]>([]).current
  let customers = useRef<any[]>([]).current
  let timeDurations = useRef<any[]>([]).current


```


# [推荐实践：](https://segmentfault.com/a/1190000020329053#item-2-5 "推荐实践：")

## 组件定义&#x20;

Function Component 采用 const + 箭头函数方式定义：&#x20;

```javascript 
 const App: React.FC<{ title: string }> = ({ title }) => {
    return React.useMemo(() => <div>{title}</div>, [title]);
};
App.defaultProps = {
    title: 'Function Component'

```


上面的例子包含了：&#x20;

1. 用 React.FC 申明 Function Component 组件类型与定义 Props 参数类型。
2. 用 React.useMemo  优化渲染性能。
3. 用 App.defaultProps 定义 Props 的默认值。

React.FC 只能有一个入参；如果用到forwardRef，就不行了

### FAQ&#x20;

为什么不用 React.memo?&#x20;

推荐使用 React.useMemo 而不是 React.memo，因为在组件

**通信时存在 React.useContext 的用法，这种用法会使所有用到的组件重渲染，只有 React.useMemo 能处理这种场景的按需渲染。**

没有性能问题的组件也要使用 useMemo 吗？&#x20;

要，考虑未来维护这个组件的时候，随时可能会通过 useContext 等注入一些数据，这时候谁会想起来添加 useMemo 呢？&#x20;

为什么不用解构方式代替 defaultProps?&#x20;

虽然解构方式书写 defaultProps 更优雅，但存在一个硬伤：

**对于**

**对象类型每次**

\*\* Rerender 时引用都会变化，这会带来性能问题，因此不要这么做。 \*\*

## 局部状态&#x20;

局部状态有三种，根据常用程度依次排列： useState useRef useReducer 。&#x20;

#### useState&#x20;

```javascript 
 const [hide, setHide] = React.useState(false); 
const [name, setName] = React.useState('BI');
```


状态函数名要表意，尽量聚集在一起申明，方便查阅。&#x20;

#### useRef&#x20;

```javascript 
 const dom = React.useRef(null);
```


useRef 尽量少用，大量 Mutable 的数据会影响代码的可维护性。&#x20;

但对于不需重复初始化的对象推荐使用 useRef 存储，比如 new G2() 。&#x20;

#### useReducer&#x20;

局部状态不推荐使用 useReducer ，会导致函数内部状态过于复杂，难以阅读。 useReducer 建议在多组件间通信时，结合 useContext 一起使用。&#x20;

### FAQ&#x20;

可以在函数内直接申明普通常量或普通函数吗？&#x20;

不可以，Function Component 每次渲染都会重新执行，常量推荐放到函数外层避免性能问题，函数推荐使用 useCallback 申明。&#x20;

## 函数&#x20;

所有 Function Component 内函数必须用 React.useCallback 包裹，以保证准确性与性能。&#x20;

```javascript 
 const [hide, setHide] = React.useState(false);    
const handleClick = React.useCallback(() => {   setHide(isHide => !isHide) }, [])
```


useCallback 第二个参数必须写，

[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks "eslint-plugin-react-hooks")

 插件会自动填写依赖项。&#x20;

不敢苟同；官网也明确说了；对于传给经过优化，并使用引用相等性的子组件非常有效memo

![  ](./image/e7170eb3df06830e8986ef438a63d772_2opnaPr6UH.png "  ")
