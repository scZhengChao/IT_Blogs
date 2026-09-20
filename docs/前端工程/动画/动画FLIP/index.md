# 动画FLIP

## 目录

- [示例](#示例)
- [FLIP](#FLIP)
- [现成的方案](#现成的方案)
- [结语](#结语)
  - [参考资料](#参考资料)

一个合理的动画是良好用户体验中必不可少的一部分。我们平常是怎样写动画的？CSS 中的 `animation` 和 `transition`，还有 `requestAnimationFrame`？相信大家写动画的时候心里也是在万马奔腾。今天我们从一个另辟蹊径的角度来探索一个动画实现。

## 示例

请看下面的示例：

![  ](./image/640_pKatQ117Sp.gif "  ")

这是一个可添加的数字的随机乱序列表。首先想一想，我们第一直觉可能会这样做：将这些数字的 DOM 节点用绝对定位来布局，数字变化后计算 `top`、`left` 的值，再配合 `transition` 实现该动画。这种方式看似简单，其实内部要维护各种位置信息，所有坐标都需要手动管理，相当繁杂，非常不利于后期扩展。如果这些节点换成高度不固定的图片，那计算量可想而知。

那有没有一种更好的方式实现呢？肯定的，接下来介绍一个金光闪闪的概念：`FLIP`。

提前预览：

[ Vite App  https://minjieliu.github.io/react-flip-demo/](https://minjieliu.github.io/react-flip-demo/ " Vite App  https://minjieliu.github.io/react-flip-demo/")

## FLIP

`FLIP` 其实是几个单词的缩写：即 **F**irst、**L**ast 、**I**nvert 、**P**lay。

让我们分解一下：

**First**

涉及动画的元素的初始状态（比如位置、缩放、透明等）。

**Last**

涉及动画的元素的最终状态。

**Invert**

这一步为核心，即找出这个元素是如何变化的。例如该元素在 **First** 和 **Last** 之间向右移动了 50px，你就需要在 X 方向 `translateX(-50px)`，使元素看起来在 **First** 位置。

这里有一个知识点值得注意，DOM 元素属性的改变（比如 `left`、`right`、`transform` 等），会被集中起来延迟到浏览器下一帧统一渲染，所以我们可以得到一个这样的中间时间点：DOM 位置信息改变了，而浏览器还没渲染\[1]。也就意味着在一定的时间内，我们能获取 DOM 改变后的位置，但在浏览器中位置还未改变。经测试，这个过程超过 10ms 就显得不稳定了。因此 `setTimeout(fn, 0)`、 `React useEffect` 和 `Vue $nextTick` 都可以实现 **Invert** 过程。

**Play**

即从 **Invert** 回到最终状态，有了两个点的位置信息，中间的过渡动画就可以使用 `transition` 实现。本文采用 Web Animation API\[2] 实现，动画执行过程中不会添加 CSS 到 DOM 上，相当干净。

![  ](<./image/640 (1)_BPfxTt1P6h.gif> "  ")

实现
这里主要使用 React 方式实现该效果，其他框架原理都一样可参考。

一个列表，将子元素 5 列为一行：

```javascript 
function ListShuffler() {
  const [data, setData] = useState([0, 1, 2, 3, 4, 5]);

  const listRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.list} ref={listRef}>
      {data.map((item) => (
        <div key={item} className={styles.item}>
          {item}
        </div>
      ))}
    </div>
  );
}

.list {
  display: flex;
  flex-wrap: wrap;
  width: 400px;
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border: 1px solid #eee;
}


```


首先，我们需要记录 `First` 和 `Last` 的位置信息，并用来计算 `Invert` 偏移差，因此用 `Map` 对象来存储最合适不过了，有了这个方法，我们就可以用它来生成前后快照：

```javascript 
function createChildElementRectMap(nodes: HTMLElement | null | undefined) {
  if (!nodes) {
    return new Map();
  }
  const elements = Array.from(nodes.childNodes) as HTMLElement[];
  // 使用节点作为 Map 的 key 存储当前快照，下次直接用 node 引用取值，相当方便
  return new Map(elements.map((node) => [node, node.getBoundingClientRect()]));
}

```


点击添加的时候记录 **First** 快照：

```javascript 
// 使用 ref 存储 DOM 之前的位置信息
const lastRectRef = useRef<Map<HTMLElement, DOMRect>>(new Map());

function handleAdd() {
  // 添加一条到顶部，让后面节点运动
  setData((prev) => [prev.length, ...prev]);
  // 并存储改变前的 DOM 快照
  lastRectRef.current = createChildElementRectMap(listRef.current);
}

```


接下来 DOM 更新后还需要改变后的快照，在 React 中，无论是 `useEffect` 还是 `useLayoutEffect` 这里都可以拿到：

```javascript 
useLayoutEffect(() => {
  // 改变后的 DOM 快照，此时 UI 并未更新
  const currentRectMap = createChildElementRectMap(listRef.current);
}, [data]);

```


现在，我们就可以把之前的快照进行遍历，实现 `Invert` 并 `Play`：

```javascript 
// 遍历之前的快照
lastRectRef.current.forEach((prevRect, node) => {
  // 前后快照的 DOM 引用一样，可以直接获取
  const currentRect = currentRectMap.get(node);

  // Invert
  const invert = {
    left: prevRect.left - currentRect.left,
    top: prevRect.top - currentRect.top,
  };

  const keyframes = [
    {
      transform: `translate(${invert.left}px, ${invert.top}px)`,
    },
    { transform: 'translate(0, 0)' },
  ];

  // Play 执行动画
  node.animate(keyframes, {
    duration: 800,
    easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
  });
});

```


大功告成！这里每个节点有单独的动画，各个节点之间互不冲突。也就是说无论节点位置多么复杂，处理起来都能从容应对。

比如图片乱序只需要从 `lodash` 引入 `shuffle` 修改数据就可以完美实现展现。

```javascript 
import { shuffle } from 'lodash-es';

function shuffleList() {
  setData(shuffle);
  // 并存储改变前的 DOM 快照
  lastRectRef.current = createChildElementRectMap(listRef.current);
}

```


以上总体思路就是 First -> Last -> Invert -> Play 的一个变换过程。预览下：

![  ](<./image/640 (2)_d2hwbJkN0s.gif> "  ")

你发现没有，每次做完操作都需要手动更新快照，作为开发者不能忍，我们要懒到极致，好好封装一下。

直白需求：

1. 数据变化后自动执行动画
2. 可以不关心任何动画逻辑
3. 不要限制 DOM 结构
4. 用法要简单
5. 性能要好

开干！

在 React 更新模型中，执行顺序为：**setState -> render -> layoutEffect**。因此可以把 `setState` 生成快照的步骤放到 `render` 中，从而与操作解耦。（如果放到 `useLayoutEffect` 中动画频繁会出现位置计算不准确的问题）

```javascript 
useMemo(() => {
  // render 时立即执行
  lastRectRef.current.forEach((item) => {
    item.rect = item.node.getBoundingClientRect();
  });
}, [data]);

```


加上之前 `useLayoutEffect` 那部分逻辑，我们可以抽到一个独立组件中（`Flipper`），用 `flipKey` 来控制，只要 `flipKey` 变化就执行动画，即实现 1、2 两点。

Flipper.tsx

```javascript 
export default function Flipper({ flipKey, children }: FlipperProps) {
  const lastRectRef = useRef<Map<number, FlipItemType>>(new Map());
  const uniqueIdRef = useRef(0);

  // 通过 ref 创建函数，传递 context 避免引起穿透渲染
  const fnRef = useRef<IFlipContext>({
    add(flipItem) {
      lastRectRef.current.set(flipItem.flipId, flipItem);
    },
    remove(flipId) {
      lastRectRef.current.delete(flipId);
    },
    nextId() {
      return (uniqueIdRef.current += 1);
    },
  });

  useMemo(() => {
    lastRectRef.current.forEach((item) => {
      item.rect = item.node.getBoundingClientRect();
    });
  }, [flipKey]);

  useLayoutEffect(() => {
    const currentRectMap = new Map<number, DOMRect>();
    lastRectRef.current.forEach((item) => {
      currentRectMap.set(item.flipId, item.node.getBoundingClientRect());
    });

    lastRectRef.current.forEach(() => {
      // 之前的 FLIP 代码
    });
  }, [flipKey]);

  return <FlipContext.Provider value={fnRef}>{children}</FlipContext.Provider>;
}

```


最开始的方式是通过原生方法遍历 DOM，因此我们只能限制子节点一个层级，并且操作方式也脱离的 React 的编写模型，加以改进可以使用 Context 来通信存储：

FlipContext.ts

```javascript 
import React, { createContext } from 'react';

export type FlipItemType = {
  // 子组件的唯一标识
  flipId: number;
  // 子组件通过 ref 获取的节点
  node: HTMLElement;
  // 子组件的位置快照
  rect?: DOMRect;
};

export interface IFlipContext {
  // mount 后执行 add
  add: (item: FlipItemType) => void;
  // unout 后执行 remove
  remove: (flipId: number) => void;
  // 自增唯一 id
  nextId: () => number;
}

export const FlipContext = createContext(
  undefined as unknown as React.MutableRefObject<IFlipContext>,
);

```


最后则是要实现采集每个动画元素的节点。将动画的节点使用自定义组件 `Flipped` 包裹并 `cloneElement(children { ref })` 劫持 ref，`mount` 时将子组件 `ref` 添加到 `Context`，`unmount` 时则移除。react-photo-view\[3] 的封装方式也是如此。即实现 3、4 两点。

Flipped.tsx

```javascript 
import React, {
  cloneElement,
  memo,
  useContext,
  useLayoutEffect,
  useRef,
} from 'react';
import { FlipContext } from './FlipContext';

export interface FlippedProps {
  children: React.ReactElement;
  innerRef?: React.RefObject<HTMLElement>;
}

function Flipped({ children, innerRef }: FlippedProps) {
  // Flipper.tsx 将 ref 通过 Context 传递，避免穿透渲染
  const ctxRef = useContext(FlipContext);
  const ref = useRef<HTMLElement>(null);
  const currentRef = innerRef || ref;

  useLayoutEffect(() => {
    const ctx = ctxRef.current;
    const node = currentRef.current;
    // 生成唯一 ID
    const flipId = ctx.nextId();

    if (node) {
      // mount 后添加节点
      ctx.add({ flipId, node });
    }

    return () => {
      // unmout 后删除节点
      ctx.remove(flipId);
    };
  }, []);

  return cloneElement(children, { ref: currentRef });
}

export default memo(Flipped);

```


好了，看一下如何使用，一共就两个 API，从原本的 JSX 只需包裹一下就有动画了：

```javascript 
<Flipper flipKey={data}>
  <div className={styles.list}>
    {data.map((item) => (
      <Flipped key={item}>
        <div className={styles.item}>{item}</div>
      </Flipped>
    ))}
  </div>
</Flipper>

```


是不是超简单！最后，还剩性能问题一个非常重要的指标。因为每个节点都是独立的动画，数据量大了之后渲染肯定卡顿。经过测试，5000 个 DIV 节点的数字数组的随机动画完成更新时间为大约 2 秒，这是很不能接受的。我们可以只允许屏幕内的节点有动画，其他节点就跳过，只需要稍微判断一下两个状态都不在屏幕内就好了，这可以节约 2 / 3 的时间：

```javascript 

const isLastRectOverflow =
  rect.right < 0 ||
  rect.left > innerWidth ||
  rect.bottom < 0 ||
  rect.top > innerHeight;

const isCurrentRectOverflow =
  currentRect.right < 0 ||
  currentRect.left > innerWidth ||
  currentRect.bottom < 0 ||
  currentRect.top > innerHeight;

if (isLastRectOverflow && isCurrentRectOverflow) {
  return;
}

// node.animate() ...

```


记得之前 react-beautiful-dnd\[4] 库刚出来的时候拖拽动画迷倒了不少人。但是现在有了 FLIP 再配合 react-dnd\[5] 就可以轻松实现此类动画，功能上就更是属于碾压状态。而 react-motion\[6] 之类的动画库实现该动画就繁杂很多，因为它用的是绝对定位控制的类型。下面的例子仅仅用刚封装的 `Flipper` 包裹了一下：

![  ](<./image/640 (3)_ABskY7XwwX.gif> "  ")

以下是源码：

[https://github.com/MinJieLiu/react-flip-demo](https://github.com/MinJieLiu/react-flip-demo "https://github.com/MinJieLiu/react-flip-demo") 其中里面的 `Flipper` 组件目录可以直接拷贝到项目中使用，100 来行代码相当轻量 🤭。

[Flipper.tsx](./file/Flipper_rSQx59wZHM.tsx " Flipper.tsx")

[Flipped.tsx](./file/Flipped_wwIpswHAOv.tsx " Flipped.tsx")

注意：`Web Animation` 只兼容 `Chrome 75` 以上，兼容古董浏览器可以考虑 Web Animations API polyfill\[7]。

## 现成的方案

什么？你有更复杂的动画需求，自己不想动手，可以看看这个，支持更多特性

react-flip-toolkit\[8] 一款有 3.4K Star FLIP 的库。实现了你所能想到的功能。

交错效果：

![  ](<./image/640 (4)_x_tcY_8b-5.gif> "  ")

嵌套比例变换：

![  ](<./image/640 (5)_sl_fejzgul.gif> "  ")

路由动画：

![  ](<./image/640 (6)_L4h6HO8gJI.gif> "  ")

以及更多

- Guitar 商城\[9]
- React-flip-toolkit logo\[10]
- 使用 Portals\[11]

## 结语

相信这种动画思路肯定能大幅度简化编写动画的门槛，想起自己以前傻傻的用绝对定位计算位置，真是可笑可笑\~ 😂😂

### 参考资料

\[1] DOM 位置信息改变了，而浏览器还没渲染: <https://juejin.cn/post/6844904165462769678>
\[2] Web Animation API: <https://developer.mozilla.org/zh-CN/docs/Web/API/Animation>
\[3] react-photo-view: <https://react-photo-view.vercel.app>
\[4] react-beautiful-dnd: <https://react-beautiful-dnd.netlify.app>
\[5] react-dnd: <https://react-dnd.github.io/react-dnd/examples/sortable/simple>
\[6] react-motion: <http://chenglou.github.io/react-motion/demos/demo8-draggable-list>
\[7] Web Animations API polyfill: <https://github.com/web-animations/web-animations-js>
\[8] react-flip-toolkit: <https://github.com/aholachek/react-flip-toolkit>
\[9] Guitar 商城: <https://react-flip-toolkit-demos.surge.sh/guitar>
\[10] React-flip-toolkit logo: <https://codepen.io/aholachek/pen/ERRpEj>
\[11] 使用 Portals: <https://react-flip-toolkit-demos.surge.sh/portal>
\[12] Vue 实现: <https://juejin.cn/post/6844904179572424711>
