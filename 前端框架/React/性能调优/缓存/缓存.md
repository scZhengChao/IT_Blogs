# 缓存

## 目录

- [useMemo](#useMemo)
  - [举个例子](#举个例子)
  - [优化ExpensiveTree](#优化ExpensiveTree)
  - [原理解析](#原理解析)
- [memoize-one](#memoize-one)

# useMemo

为\*\*「性能优化」\*\*手段，一般用useMemo缓存函数组件中比较消耗性能的计算结果：

```javascript 
 function App() {
  const memoizedValue = useMemo(
    () => computeExpensiveValue(a, b),
    [a, b]
  );
  // ...
}
```


只有在依赖项改变后才会重新计算新的memoizedValue。 你有没有想过，如果用useMemo缓存函数组件的返回值，会怎么样呢？&#x20;

## 举个例子

我们有个全局context—— AppContext。&#x20;

由于同学们偷懒，随着项目的迭代，新增的context都选择放在AppContext里，导致AppContext包含的内容越来越多。 现在我们有个Tree组件，他会渲染一个很耗性能的大组件ExpensiveTree。

```javascript 
 function Tree() {
  let appContextValue = useContext(AppContext);
  let theme = appContextValue.theme;

  return <ExpensiveTree className={theme} />;
}
```


该组件内部依赖AppContext中的theme状态。\*\* 由于AppContext中包含很多与theme无关的state，导致每次其他无关的state更新，Tree都会重新render\*\*，进而ExpensiveTree组件也重新render。 现在这个优化任务交到了你手上，该怎么办呢？&#x20;

## 优化ExpensiveTree

这时候，useMemo就能派上用场：&#x20;

```javascript 
 function Tree() {
  let appContextValue = useContext(AppContext);
  let theme = appContextValue.theme;

  return useMemo(() => {
    return <ExpensiveTree className={theme} />;
  }, [theme])
}
```


我们将返回的ExpensiveTree作为useMemo返回值，theme作为依赖。 这样，即使AppContext改变导致Tree反复render，ExpensiveTree也只会在theme改变后render。&#x20;

## 原理解析

要理解这么做有效的原因，需要了解三点：&#x20;

1. useMemo返回值是什么&#x20;
2. 函数组件的返回值是什么&#x20;
3. React组件在什么时候render

回答第一个问题：

&#x20;     useMemo会将第一个参数（函数）的返回值保存在组件对应fiber中，只有在依赖项（第二个参数）变化后才会重新调用第一个参数（函数）计算一个新值。&#x20;

回答第二个问题：

&#x20;    函数组件的返回值是JSX对象。 同一个函数组件调用多次，返回的是多个\*\*「不同」\*\*的JSX对象（即使props未变，但JSX是新的引用）。 按照以上两个回答，我们可以得出结论： 以上useMemo用法实际上在函数组件对应的fiber中缓存了一个完整的JSX对象&#x20;

第三个问题，

&#x20;     函数组件需要同时满足如下条件才不会render：&#x20;

1. oldProps === newProps前后两次更新props全等，注意是\*\*「全等」\*\*。&#x20;
2. 组件context没有变化&#x20;
3. workInProgress.type === current.type 组件更新前后fiber.type未变化，比如div没有变为p。&#x20;
4. !includesSomeLane(renderLanes, updateLanes)当前fiber上不存在更新，或者存在更新但优先级低。&#x20;

更详细的解释，可以参考这篇文章：

[React组件到底什么时候render？](http://mp.weixin.qq.com/s?__biz=MzU0MDg4NDY2Mg==\&mid=2247484376\&idx=1\&sn=0edb7c9857ba4603dfc410d5aaafe878\&chksm=fb332801cc44a1173f705fa67ff5d3ea2788ed1df6765e9760b0936375b7acf38d5503f73f9a\&scene=21#wechat_redirect "React组件到底什么时候render？")当我们不使用useMemo包裹返回值，每次Treerender返回的都是全新的JSX对象。 所以对于ExpensiveTree，oldProps !== newProps。&#x20;

再看2：ExpensiveTree内部context没变，满足&#x20;

再看3：ExpensiveTree更新前后type都是ExpensiveTree，满足&#x20;

再看4: ExpensiveTree内没有状态更新，满足&#x20;

所以，当我们使用useMemo包裹ExpensiveTree后，当theme不变，每次Treerender后返回的都是同一个JSX对象，满足第一条。 基于这个原因ExpensiveTree不会render。&#x20;

# memoize-one

当你想向组件传入jsx 当props 很难做到不重复渲染；这个时候缓存就像放重要了；特别是复杂的组件你能感受到卡顿时；更重要

```javascript 
// 这是当时 一个特别复杂页面 大概 3000 多行； 加上里面的组件 上万行代码不止；
import memoize from "memoize-one";
<PostSmsScanNavBar
    title={this._getTitle()}
    doneCount={cacheData.length}
    leftMiddleView={
      this.leftMiddleView
    }
    rightMiddleView={
      this.rightMiddleView(isFlashOpened)
    }
    onDonePress={this._onDonePress}
    onBackPressed={this._onBackPressed}
    onTitleLongPress={this._onTitleLongPress}
/>
public  rightMiddleView =  memoize( 
     (isFlashOpened)=>< View style={this.styles.navRightView}>
      <TouchableOpacity style={this.styles.navLeftSettingBtn} onPress={this._onFlashPress}>
        <Image
          source={
            isFlashOpened
              ? require('../../images/flash.png')
              : require('../../images/flash_close.png')
          }
        />
      </TouchableOpacity>
    </View>
  );
//极大的减少了不必要的渲染
```


**依赖项 要 找到所有的；否者会  导致数据更新；ui不渲染的情况**

[npm: memoize-one A memoization library which only remembers the latest invocation https://www.npmjs.com/package/memoize-one](https://www.npmjs.com/package/memoize-one "npm: memoize-one A memoization library which only remembers the latest invocation https://www.npmjs.com/package/memoize-one")

总结： 也就是说；只要setState() 了； 子组件一定会渲染；如果子组件用了 shouldComponentUpdate 或者 PureComponent 才会避免组件 不必要的渲染或者 导致数据跟新不渲染等bug；
