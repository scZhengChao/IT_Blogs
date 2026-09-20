# React 性能优化的那些事儿

## 目录

- [为什么页面会出现卡顿的现象？](#为什么页面会出现卡顿的现象)
- [React 到底是在哪里出现了卡顿？](#React-到底是在哪里出现了卡顿)
- [React 有哪些场景会需要性能优化？](#React-有哪些场景会需要性能优化)
  - [一：父组件刷新，而不波及子组件。](#一父组件刷新而不波及子组件)
  - [二：组件自己控制自己是否刷新](#二组件自己控制自己是否刷新)
  - [三：减少波及范围，无关刷新数据不存入state中](#三减少波及范围无关刷新数据不存入state中)
  - [四：合并 state,减少重复 setState 的操作](#四合并-state减少重复-setState-的操作)
  - [五：如何更快的完成diff的比较，加快进程](#五如何更快的完成diff的比较加快进程)

[ React 性能优化的那些事儿  https://mp.weixin.qq.com/s?\_\_biz=MzA4Nzg0MDM5Nw==\&mid=2247515762\&idx=1\&sn=8056c1daab30bcbb3e8dffa4dbd670c0\&chksm=9031bd90a74634866c641cf6b2fcfc908c8cd4cfcaa3bea0ba24b68d5b76a15bc9eb2dfb5a27\&mpshare=1\&scene=1\&srcid=1108QSnEf4A8O46AFwvTQvvI\&sharer\_sharetime=1667903447048\&sharer\_shareid=26732caa83170683d9307abbbbf69ab9#rd](https://mp.weixin.qq.com/s?__biz=MzA4Nzg0MDM5Nw==\&mid=2247515762\&idx=1\&sn=8056c1daab30bcbb3e8dffa4dbd670c0\&chksm=9031bd90a74634866c641cf6b2fcfc908c8cd4cfcaa3bea0ba24b68d5b76a15bc9eb2dfb5a27\&mpshare=1\&scene=1\&srcid=1108QSnEf4A8O46AFwvTQvvI\&sharer_sharetime=1667903447048\&sharer_shareid=26732caa83170683d9307abbbbf69ab9#rd " React 性能优化的那些事儿  https://mp.weixin.qq.com/s?__biz=MzA4Nzg0MDM5Nw==\&mid=2247515762\&idx=1\&sn=8056c1daab30bcbb3e8dffa4dbd670c0\&chksm=9031bd90a74634866c641cf6b2fcfc908c8cd4cfcaa3bea0ba24b68d5b76a15bc9eb2dfb5a27\&mpshare=1\&scene=1\&srcid=1108QSnEf4A8O46AFwvTQvvI\&sharer_sharetime=1667903447048\&sharer_shareid=26732caa83170683d9307abbbbf69ab9#rd")

要讲清楚性能优化的原理，就需要知道它的前世今生，需要回答如下的问题：

- React 是如何进行页面渲染的？
- 造成页面的卡顿的罪魁祸首是什么呢？
- 我们为什么需要性能优化？
- React 有哪些场景会需要性能优化？
- React 本身的性能优化手段？
- 还有哪些工具可以提升性能呢？

## 为什么页面会出现卡顿的现象？

为什么浏览器会出现页面卡顿的问题？是不是浏览器不够先进？这都 2202 年了，怎么还会有这种问题呢？

实际上问题的根源来源于浏览器的刷新机制。

我们人类眼睛的刷新率是 60Hz，浏览器依据人眼的刷新率 计算出了

1000 Ms / 60 = 16.6ms

也就是说，浏览器要在16.6Ms 进行一次刷新，人眼就不会感觉到卡顿，而如果超过这个时间进行刷新，就会感觉到卡顿。

而浏览器的主进程在仅仅需要页面的渲染，还需要做解析执行Js，他们运行在一个进程中。

如果**js的在执行的长时间占用主进程的资源**，就会导致没有资源进行页面的渲染刷新，进而导致页面的卡顿。

那么这个又和 React 的性能优化又有什么关系呢？

## React 到底是在哪里出现了卡顿？

&#x20;        基于我们上的知识，js\*\* 长期霸占浏览器主线程\*\*造成无法刷新而造成卡顿。

&#x20;        那么 `React `的卡顿也是基于这个原因。

&#x20;       `React `在`render`的时候，会根据现有render**产生的新的jsx的数据**和现有fiberRoot **进行比对**，找到不同的地方，然后生成新的`workInProgress`，进而在挂载阶段把新的workInProgress交给服务器渲染。

&#x20;        在这个过程中，React 为了让**底层机制更高效快速**，进行了大量的优化处理，如**设立任务优先级**、**异步调度**、**diff算法**、**时间分片**等。

&#x20;       整个链路就是了**高效快速的完成**从**数据更新到页面渲染的**整体流程。

&#x20;       为了**不让递归遍历寻找所有更新节点**太大而**占用浏览器资源**，React **升级了fiber架构，时间分片**，让其**可以增量更新**。

&#x20;       为了找出所有的更新节点，**设立了diff算法**，**高效的查找所有的节点**。

&#x20;       为了更高效的更新，**及时响应用户的操作**，**设计任务调度优先级**。

&#x20;        而我们的性能优化就是为了不给 React 拖后腿，让其更快，更高效的遍历。

那么性能优化的奥义是什么呢？？

**就是控制****刷新渲染的波及范围****，我们只让****改更新的更新****，****不该更新的不要更新****，让我们的****更新链路尽可能的短的走完****，那么页面当然就会及时刷新不会卡顿了。**

## React 有哪些场景会需要性能优化？

- 父组件刷新，而不波及子组件
- 组件自己控制自己是否刷新
- 减少波及范围，无关刷新数据不存入state中
- 合并 state,减少重复 setState 的操作
- 如何更快的完成diff的比较，加快进程

我们分别从这些场景说一下：·

### 一：父组件刷新，而不波及子组件。

&#x20;          我们知道 React 在组件刷新判定的时候，如果触发刷新，那么它会**深度遍历所有子组件**，查找所有更新的节点，依据新的jsx数据和旧的 fiber ，生成新的workInProgress，进而进行页面渲染。

&#x20;         所以**父组件刷新的话，子组件必然会跟着刷新**，但是假如这次的刷新，和我们子组件没有关系呢？怎么减少这种波及呢？

```typescript 
export default function Father1 (){
    let [name,setName] = React.useState('');

    return (
        <div>
            <button onClick={()=>setName("获取到的数据")}>点击获取数据</button>
            {name}
            <Children/>
        </div>
    )
}

function Children(){
    return (
        <div>
            这里是子组件
        </div>
    )
}
```


运行结果：

![](image_jKUo8LPeQk.png)

可以看到我们的子组件被波及了，解决办法有很多，总体来说分为两种。

- **子组件自己判断是否需要更新 ,典型的就是 PureComponent，shouldComponentUpdate，memo**
- 父组件对子组件做个缓冲判断

看下面这段逻辑，我们的子组件只关心`count`数据，当我们刷新`name`数据的时候，并不会触发刷新 `Children1`子组件，实现了我们对组件的缓冲控制。

```typescript 
export default function Father1 (){
    let [count,setCount] = React.useState(0);
    let [name,setName] = React.useState(0);
     const render = React.useMemo(()=><Children1 count = {count}/>,[count]) 
    return (
        <div>
            <button onClick={()=>setCount(++count)}>点击刷新count</button>
            <br/>
            <button onClick={()=>setName(++name)}>点击刷新name</button>
            <br/>
            {"count"+count}
            <br/>
            {"name"+name}
            <br/>
            {render}
        </div>
    )
}
class Children1 extends React.PureComponent{
    render() {
        return (
            <div>
                子组件只关系count 数据
                {this.props.count}
            </div>
        )
    }
}
```


### 二：组件自己控制自己是否刷新

这里就需要用到上面提到的`shouldComponentUpdate`以及`PureComponent`,这里不再赘述。

### 三：减少波及范围，无关刷新数据不存入state中

&#x20;        这种场景就是我们**有意识的控制**，如果**有一个数据我们在页面上并没有用到它**，但是**它又和我们的其他的逻辑有关**系，那么我们就可以把**它存储在其他的地方**，**而不是state中**。

### 四：合并 state,减少重复 setState 的操作

&#x20;       合并 `state` ,减少重复 `setState` 的操作,实际上 `React`**已经帮我们做了，那就是批量更新**，在`React18` 之前的版本中，批量更新只有在 React自己的生命周期或者点击事件中有提供，而异步更新则没有，例如`setTimeout`，`setInternal`等。

&#x20;            所以如果我们想在`React18` 之前的版本中也想在异步代码添加对批量更新的支持，就可以使用`React`给我们提供的`api`。

```typescript 
import ReactDOM from 'react-dom';
const { unstable_batchedUpdates } = ReactDOM;
```


使用方法如下：

```typescript 
componentDidMount() {
    setTimeout(()=>{
        unstable_batchedUpdates(()=>{
            this.setState({ number:this.state.number + 1 })
            console.log(this.state.number)
            this.setState({ number:this.state.number + 1})
            console.log(this.state.number)
            this.setState({ number:this.state.number + 1 })
            console.log(this.state.number)
        })
    })
}
```


&#x20;     而在 React 18中的话，就不需要我们这样做了，它 对settimeout、promise、原生事件、react事件、外部事件处理程序进行自动批量处理。

### 五：如何更快的完成diff的比较，加快进程

`diff`算法就是为了帮助我们**找到需要更新的异同点**，那么有什么办法可以让我们的`diff`算法更快呢？

那就是**合理的使用`key`**

而在单节点处理函数`reconcileSingleElement`中，会执行如下逻辑：

- 通过 `key`,判断上次更新的时候的 `Fiber` 节点是否存在对应的 `DOM` 节点。 如果没有 则直接走创建流程，新生成一个 Fiber 节点，并返回
- 如果有，那么就会继续判断，`DOM` 节点是否可以复用？
- 如果有，就将上次更新的 `Fiber` 节点的副本作为本次新生的`Fiber` 节点并返回
- 如果没有，那么就标记 `DOM` 需要被删除，新生成一个 `Fiber` 节点并返回。
