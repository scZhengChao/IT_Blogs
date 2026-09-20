# （Keep-Alive）实现方式概览

## 目录

- [一、什么是状态保存？](#一什么是状态保存)
- [二、如何实现状态保存？](#二如何实现状态保存)
- [三、自动状态保存](#三自动状态保存)
  - [3.1 改变路由机制](#31-改变路由机制)
  - [3.2 改变React组件被移除的方式](#32-改变React组件被移除的方式)
- [四、总结](#四总结)

## **一、什么是状态保存？**

状态保存是一个前端页面实现过程中非常常见的功能，如果你用过Vue`<keep-alive>`标签的话，那么这部分就可以直接跳过了，我们希望在React中实现的状态保存就是和该标签基本一致的功能。但如果你对于什么是状态保存还不清楚的的话，那么请看我们给出的这个例子：

1. 页面上存在一个一次展示10行的搜索列表，用户输入相关条件并点击进行了模糊搜索，接着点击列表导航跳转到第3页，找到其所需要的数据，点击查看详情按钮。
2. 跳转到详情页面并查看相关数据详情，之后，用户点击返回按钮回到列表页。
3. 此时，如果不做任何特殊处理，默认情况下，列表页面会被重新渲染，所有搜索条件都被清空且列表渲染第1页。用户需要再次手动输入所搜条件并跳转第3页才能继续查看下一条数据。
4. 但是，如果我们做了状态保存，则列表页面会保持跳转前的状态，用户不必再次重复之前的操作就可以查看下一条数据。

## **二、如何实现状态保存？**

在 Vue 中，我们可以非常便捷地通过`<keep-alive>`标签实现状态的保存，该标签会缓存不活动的组件实例，而不是销毁它们。

但是在React中目前并不存在这个功能，此前曾经有人提出过相关的Issues

1. `<keep-alive>` 是用在**其一个直属的子组件被切换的情形**。如果你在其中有 v-for 则不会工作。如果有上述的多个条件性的子元素，`<keep-alive>` 要求同时只有一个子元素被渲染。React官方不希望引入这种只在某些特定情况下才能工作的API，他们的设计理念希望React中的API在所有情况下都能够以相同的方式工作。这样，用户只需要学习一次API就能够在任何地方使用。
2. `<keep-alive>`包裹动态组件时 **，会缓存不活动的组件实例**，而不是销毁它们。React官方认为**这种行为是一种内存泄漏，当用户在不同页面间导航时会使得内存占据不断变大**。这种内存占据在一开始时可能不会引起开发者的关注，然而当应用越来越大，越来越复杂，直到内存占据成为问题时，开发者会发现所有页面都依赖这种工作方式，此时再去修改很可能已经悔之晚矣。因此React官方认为这是一种“不负责任的内存使用”。

因此，React官方暂时没有实现`<keep-alive>`类似的功能。为了达到状态保存的效果，官方推荐以下两种手动保存状态的方式：

1. 将需要保存状态组件的state提升至父组件中保存。
2. **使用css visible属性来控制需要保存状态组件的渲染**，而不是使用if/else，避免React将其卸载。

虽说手动保存状态是React官方推荐的最佳实现方式，然而我们在实际开发中将所有页面的状态都手动保存几乎是不现实的，为了不需要每次都关心如何对数据进行保存恢复，我们还是需要某些方式来自动实现状态保存。

## **三、自动状态保存**

目前市面上自动状态保存库主要从两方面下手：

1. 改变路由机制，通常基于React-Router二次开发。React-Router在路由切换时默认卸载非活动组件，因此这些库通过重写React-Router中的部分功能或者将其拓展的方式使得在路由切换时相关组件不被直接卸载，而是缓存下来。这种实现方式决定了状态保存的粒度只能具体到SPA的页面级别。
2. 改变React组件被移除的方式。React在组件被移除时默认是被卸载的，这些库通过某些方式阻止或欺骗React使相关组件在移除时不被直接卸载，而是缓存下来。通过这种实现方式，状态保存的粒度可以精细到组件级别。

可以看到，无论对于哪种实现，**最最最重要的思想就是阻止组件卸载，将相关组件移出页面展示，但是保存在内存之中**。在之后需要恢复状态时直接将内存中的组件挂载在页面之中。

为什么不unmount 时储存状态，re-mount 时取回状态呢？这篇文章[为 react-router 写一个可以缓存的 Route](https://juejin.cn/post/6844903639253778445#heading-3 "为 react-router 写一个可以缓存的 Route")中给出了很好的回答。

> 1\. 需要自己选择要存储的信息。
> 2\.  父组件无法拿到子组件的状态进行保存。
> 3\.  会重新 unmount 和 re-mount，这其实是不应该发生的，被隐藏的列表页应该是“潜伏”在详情页的下面，等到重新进入列表页时才出现，而不是已经被 unmount 了。

### 3.1 改变路由机制

- **重写路由库**，如[**react-keeper**](https://link.juejin.cn/?target=https://github.com/lanistor/react-keeper "react-keeper")

  React-Keeper**不单单实现了页面缓存，还提供了3种不同的页面缓存方式：**

> 1.永久缓存，只要根组件不卸载，页面将永久缓存。
> 2\.  父组件缓存，在父组件不卸载的情况下会维持缓存状态。
> 3\.  临时缓存，作用在页面跳转时，打开新页面后会临时缓存链接的来源页面，当返回时至之前页面（或路由状态变更）时，提取缓存页面展示，并清除缓存。非常适合于列表页的缓存。

其好处是不仅可以实现状态保存，还可以更进一步的提供一些强大缓存管理机制。但是React-Keeper直接替换了React-Router，这样做风险比较大，可能需要踩坑。

参考文档： [zhuanlan.zhihu.com/p/25081540](https://link.juejin.cn/?target=https://zhuanlan.zhihu.com/p/25081540 "zhuanlan.zhihu.com/p/25081540")

- \*\*重写 ****`<Route/>`****` `\*\***组件**，如[**react-live-route**](https://link.juejin.cn?target=https://github.com/fi3ework/react-live-route "react-live-route")

  React-Live-Router中重写并导出了一个LiveRoute组件，通过LiveRouter包裹的页面可以自动保存状态。

  其大致原理是**根据路由匹配情况来隐藏/显示对应页面。**

  相比于重写路由库，这种方案的实现成本和使用成本都低一些，但是其缺陷也是非常明显的，开发者需要考虑其与React-Router版本的兼容情况，库作者也需要跟随React-Router的升级而升级库。React-Live-Router目前只支持4版本的React-Router（截止2022-01-11，React-Router已经更新到6版本）。

  参考文档：[juejin.cn/post/684490…](https://juejin.cn/post/6844903639253778445#heading-12 "juejin.cn/post/684490…")
- **基于 ****`<Route>`**** 组件现有**行为做拓展，如[react-rou](https://link.juejin.cn?target=https://github.com/CJY0208/react-router-cache-route "react-rou")[**ter-cache-route**](https://link.juejin.cn?target=https://github.com/CJY0208/react-router-cache-route "ter-cache-route")

`React-Router-Cache-Route`在提供了页面缓存功能之外，还**提供了useDidCa**che/useDidRecover这种类似于Vue中deactive/active的生命周期钩子。

其大致原理是在React-Router的Router子组件中不使用component或者render属性，取而代之使用children属性当作方法来使用，从而获得手动控制渲染的行为的能力，将Router不匹配时的行为由卸载更改为隐藏。

React-Router-Cache-Route目前只支持到React-Router5，React-Router6的子组件渲染方式发生了改变，其原作者目前正在开发新的库[github.com/CJY0208/umi…](https://link.juejin.cn?target=https://github.com/CJY0208/umi4-keep-demo%EF%BC%8C%E4%BD%86%E8%B7%9D%E7%A6%BB%E7%94%9F%E4%BA%A7%E4%BD%BF%E7%94%A8%E8%BF%98%E5%AD%98%E5%9C%A8%E5%BE%88%E5%A4%9A%E9%97%AE%E9%A2%98%E3%80%82 "github.com/CJY0208/umi…")

```javascript 
<Route exact path="/list">
  {props => (
    <div style={props.match ? null : { display: 'none' }}>
        <List {...props} />
    </div>
  )}
</Route>

```


参考文档：[v5.reactrouter.com/web/api/Rou…](https://link.juejin.cn/?target=https://v5.reactrouter.com/web/api/Route/children-func "v5.reactrouter.com/web/api/Rou…")

### 3.2 改变React组件被移除的方式

- **基于ReactDom.createPortal实现**，如[**react-keep-alive**](https://link.juejin.cn?target=https://github.com/StructureBuilder/react-keep-alive "react-keep-alive")

  React-Keep-Alive有两个主要的组件 `<Provider>` 和 `<KeepAlive>`；`<Provider>` 负责保存组件的缓存，并在处理之前通过 `React.createPortal` API 将缓存的组件渲染在应用程序的外面。缓存的组件必须放在 `<KeepAlive>` 中，`<KeepAlive>` 会把在应用程序外面渲染的组件挂载到真正需要显示的位置。

  React-Keep-Alive原理大致为将`<KeepAlive>`的children 提取出来渲染到`<Provider>` 节点下，而非 `<KeepAlive>`之下，这也导致 `<KeepAlive>`中的组件无法被 React认为是在其所处的上下文之中，会对Context 造成破坏。

  目前React-Keep-Alive基本处于弃更状态了，它存在着以下几个问题：

参考文档： [github.com/StructureBu…](https://link.juejin.cn/?target=https://github.com/StructureBuilder/react-keep-alive/issues/36 "github.com/StructureBu…")

- **基于Dom操作实现**，如[**react-activation**](https://link.juejin.cn?target=https://github.com/CJY0208/react-activation "react-activation")

React-Activation使用上非常简单，直接用其导出的 `<KeepAlive>`组件包裹希望保存状态的组件即可。React-Activation与React-Router-Cache-Route作者一致，因此也提供了useActivate和useUnactivate生命周期钩子。

React-Activation的实现受到了React-Keep-Alive的启发，不过移除了对 `React.createPortal` API的使用，改为直接DOM操作，实现方式更优雅。并且，React-Activation解决了React-Keep-Alive中的一些问题。

其原作者给出了一个简单的实现示例：[codesandbox.io/s/zuijian-r…](https://link.juejin.cn/?target=https://codesandbox.io/s/zuijian-react-keepalive-shixian-ovh90%E3%80%82%E4%B8%8D%E8%BF%87%E8%BF%99%E4%B8%AA%E7%A4%BA%E4%BE%8B%E4%B8%AD%E4%BD%BF%E7%94%A8%E4%BA%86class "codesandbox.io/s/zuijian-r…") components、装饰器等一些语法。为了更加简洁的阐述其原理，在下方贴出我自己的实现。

```javascript 
import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useContext,
  useMemo,
  useCallback
} from "react";

const Context = createContext();

// 缓存的虚拟DOM元素会储存在AliveScope 组件中，所以它不能被卸载
export function AliveScope(props) {
  // state用来存储keepalive组件的id与其children
  const [state, setState] = useState({});
  // ref只创建一次，用来存储子组件渲染后的实例
  const ref = useMemo(() => {
    return {};
  }, []);

  const keep = useCallback((id, children) =>
    new Promise((resolve) => {
      // 存储KeepAlive中的id与children对应关系，用于在AliveScope中渲染
      setState(state => ({
        ...state,
        [id]: { id, children },
      }));
      // 将渲染后的实例dom ref[id]返回KeepAlive中，便于其移动到真实需要展示的位置
      setTimeout(() => {
        //需要等待setState渲染完拿到实例返回给子组件。
        resolve(ref[id]);
      });
    }), [ref]);

  return (
    <Context.Provider value={keep}>
      {props.children}
      {/* 这里react对KeepAlive组件的children进行渲染，渲染完成后会被appendChild移动至其真实需要渲染的位置 */}
      {Object.values(state).map(({ id, children }) => (
        <div
          key={id}
          ref={(node) => {
            ref[id] = node;
          }}
        >
          {children}
        </div>
      ))}
    </Context.Provider>
  );
}

export function KeepAlive(props) {
  const ref = useRef(null);
  const keep = useContext(Context);

  useEffect(() => {
    const init = async ({ id, children }) => {
      // 通过keep函数将KeepAlive中的信息传递给父组件AliveScope处理
      // AliveScope帮助渲染children,并将渲染后的实例dom realContent返回
      const realContent = await keep(id, children);
      // 将渲染后的realContent移动到KeepAlive中展示
      if (ref.current) {
        ref.current.appendChild(realContent);
      }
    };
    init(props);
  }, [props, keep]);

  return <div ref={ref} />;
}

export default KeepAlive;

```


```javascript 
import React, { useState } from 'react';
import KeepAlive, { AliveScope } from './ActivationKeepAlive';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      count: {count}
      <button style={{marginLeft: 20}} onClick={() => setCount((count) => count + 1)}>add</button>
    </div>
  );
}

export default function Page() {
  const [show, setShow] = useState(true);
  return (
      <AliveScope>
        <div>
          <button onClick={() => setShow((show) => !show)}>Toggle</button>
          <p>无 KeepAlive</p>
          {show && <Counter />}
          <p>有 KeepAlive</p>
          {show && (
            <KeepAlive id="Test">
              <Counter />
            </KeepAlive>
          )}
        </div>
      </AliveScope>
  );
}

```


当然，以上只是其大致原理，React-Activation中对于其它的一些由于打破了React原有层级关系而造成的问题做了一些修复，包括：

- 渲染延迟（已修复）
- `Context` 上下文功能失效（已修复）
- `Error Boundaries` 失效（已修复）
- `React.Suspense` & `React.lazy` 失效（已修复）
- React 合成事件冒泡失效（未修复）
- 其他未发现的功能

参考文档： [juejin.cn/post/684490…](https://juejin.cn/post/6844903942522929160 "juejin.cn/post/684490…")

## **四、总结**

目前看来自动状态缓存相关的库不管基于何种方式实现，都非存在着各自的一些问题。这里要感谢[CJY0208](https://link.juejin.cn?target=https://github.com/CJY0208 "CJY0208")的努力，目前还在不断更新且活跃的相关库作者也基本只有他了。

根据对目前市场上存在的相关解决方案的调研，这里给出以下几点建议：

- 如果项目中需要状态缓存处理的数据量较小，那最好还是按照`React`官方的建议，**手动解决状态缓存问题。**
- 如果处理数据量较大，且缓存粒度为页面级别，那么推荐使用[**react-router-cache-route**](https://link.juejin.cn?target=https://github.com/CJY0208/react-router-cache-route "react-router-cache-route")**。**
- 如果处理数据量较大，且缓存粒度为组件级别，或者你的项目框架采用了umi（无法直接触及react-router），或者干脆没有使用react-router路由，那么推荐使**用**[**react-activation**](https://link.juejin.cn?target=https://github.com/CJY0208/react-activation "react-activation")**。此外umi中使用react-activation可以直接使用其封装插件**[**umi-plugin-keep-alive**](https://link.juejin.cn?target=https://github.com/alitajs/umi-plugin-keep-alive "umi-plugin-keep-alive")**。**

最后的最后，React官方在一些关于[strict mode的回复](https://link.juejin.cn?target=https://github.com/reactwg/react-18/discussions/19 "strict mode的回复")中提到了其正在开发的`<Offscreen>` 组件，并且预计其在[react@18.X](https://link.juejin.cn?target=mailto:react@18.X "react@18.X")（非18早期版本）中可能会出现，其功能与vue`<keep-alive>`类似。如果React官方能够支持的话想必是自动状态保存最好的出路。
