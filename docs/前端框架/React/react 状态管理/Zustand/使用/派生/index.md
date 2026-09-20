# 派生

状态派生是状态管理中一个不被那么多人提起，但是在实际场景中被大量使用的东西，只是大家没有意识到，这理应也是状态管理的一环。

状态派生可以很简单，也可以非常复杂。简单的例子，比如基于一个`name`字段，拼接出对应的 url 。

![](https://mmbiz.qpic.cn/mmbiz_jpg/M7OtEw9eDKHHIlCdf8ubMWwPDdHGdhvWaIQsibib6Re4aJ19mJISJTSsBGKcjwMDiakIIKfYKXF91XpsOdem4IFYw/640?wx_fmt=jpeg\&tp=webp\&wxfrom=5\&wx_lazy=1\&wx_co=1)

复杂的例子，比如基于 rgb 、hsl 值和色彩模式，得到一个包含色彩空间的对象。

![](https://mmbiz.qpic.cn/mmbiz_jpg/M7OtEw9eDKHHIlCdf8ubMWwPDdHGdhvWRvxjIE9LL8vsjGTxlojD3eIiba2ibfqfUG7gjDKVbosJrfaGfDdtPic1Q/640?wx_fmt=jpeg\&tp=webp\&wxfrom=5\&wx_lazy=1\&wx_co=1)

如果不考虑优化，其实都可以写一个中间的函数作为派生方法，但作为状态管理的一环，我们必须要考虑相应的优化。

在 hooks 场景下，状态派生的方法可以使用`useMemo`，例如：

```javascript 
// hooks 写法

const App = () => {
  const [name,setName]=useState('')
  const url = useMemo(() => URL_HITU_DS_BASE(name || ''),[name])
  // ...
}

```


而 `zustand` 用了类似 `redux selector` 的方法，实现相应的状态派生，这个方式使得 `useStore` 的用法变得极其灵活和实用。而这种 `selector` 的方式使得 `zustand` 下细颗粒度的性能优化变为可能，且优化成本很低。

```javascript 
// zustand 的 selector 用法

// 写法1
const App = () => {
  const url = useStore( s => URL_HITU_DS_BASE(s.name || ''));
  // ...
}

// 写法2 将 selector 单独抽为函数
export const dsUrlSelector = (s) => URL_HITU_DS_BASE(s.name || '');
const App = () => {
  const url = useStore(dsUrlSelector);
  // ...
}

```


由于写法 2 可以将 selector 抽为独立函数，那么我们就可以将其拆分到独立文件来管理派生状态。由于这些selector 都是纯函数，所以能轻松实现测试覆盖。

![](./assets/image/image_rnFaaxE0Gw.png)
