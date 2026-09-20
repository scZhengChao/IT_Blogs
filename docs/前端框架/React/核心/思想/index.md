# 思想

## 目录

- [构建 state 的原则](#构建-state-的原则)
- [对 state 进行保留和重置](#对-state-进行保留和重置)
  - [UI 树 ](#UI-树-)
  - [state 与树中的某个位置相关联 ](#state-与树中的某个位置相关联-)
    - [陷阱](#陷阱)
  - [相同位置的不同组件会使 state 重置](#相同位置的不同组件会使-state-重置)
    - [陷阱](#陷阱)
  - [在相同位置重置 state](#在相同位置重置-state)
    - [方法一：将组件渲染在不同的位置](#方法一将组件渲染在不同的位置)
    - [方法二：使用 key 来重置 state ](#方法二使用-key-来重置-state-)
    - [注意](#注意)
    - [使用 key 重置表单](#使用-key-重置表单)

## 构建 state 的原则

当你编写一个存有 state 的组件时，你需要选择使用多少个 state 变量以及它们都是怎样的数据格式。尽管选择次优的 state 结构下也可以编写正确的程序，但有几个原则可以指导您做出更好的决策：

1. **合并关联的 state**。如果你总是同时更新两个或更多的 state 变量，请考虑将它们合并为一个单独的 state 变量。
2. **避免互相矛盾的 state**。当 state 结构中存在多个相互矛盾或“不一致”的 state 时，你就可能为此会留下隐患。应尽量避免这种情况。
3. **避免冗余的 state**。如果你能在渲染期间从组件的 props 或其现有的 state 变量中计算出一些信息，则不应将这些信息放入该组件的 state 中。
4. **避免重复的 state**。当同一数据在多个 state 变量之间或在多个嵌套对象中重复时，这会很难保持它们同步。应尽可能减少重复。
5. **避免深度嵌套的 state**。深度分层的 state 更新起来不是很方便。如果可能的话，最好以扁平化方式构建 state。

重点讲一下避免深度嵌套的state

想象一下，一个由行星、大陆和国家组成的旅行计划。你可能会尝试使用嵌套对象和数组来构建它的 state，就像下面这个例子：

```typescript 
export const initialTravelPlan = {
  id: 0,
  title: '(Root)',
  childPlaces: [{
    id: 1,
    title: 'Earth',
    childPlaces: [{
      id: 2,
      title: 'Africa',
      childPlaces: [{
        id: 3,
        title: 'Botswana',
        childPlaces: []
      }, {
        id: 4,
        title: 'Egypt',
        childPlaces: []
      }, {
        id: 5,
        title: 'Kenya',
        childPlaces: []
      }, {
        id: 6,
        title: 'Madagascar',
        childPlaces: []
      }, {
        id: 7,
        title: 'Morocco',
        childPlaces: []
      }, {
        id: 8,
        title: 'Nigeria',
        childPlaces: []
      }, {
        id: 9,
        title: 'South Africa',
        childPlaces: []
      }]
    }, {
      id: 10,
      title: 'Americas',
      childPlaces: [{
        id: 11,
        title: 'Argentina',
        childPlaces: []
      }, {
        id: 12,
        title: 'Brazil',
        childPlaces: []
      }, {
        id: 13,
        title: 'Barbados',
        childPlaces: []
      }, {
        id: 14,
        title: 'Canada',
        childPlaces: []
      }, {
        id: 15,
        title: 'Jamaica',
        childPlaces: []
      }, {
        id: 16,
        title: 'Mexico',
        childPlaces: []
      }, {
        id: 17,
        title: 'Trinidad and Tobago',
        childPlaces: []
      }, {
        id: 18,
        title: 'Venezuela',
        childPlaces: []
      }]
    }, {
      id: 19,
      title: 'Asia',
      childPlaces: [{
        id: 20,
        title: 'China',
        childPlaces: []
      }, {
        id: 21,
        title: 'Indonesia',
        childPlaces: []
      }, {
        id: 22,
        title: 'India',
        childPlaces: []
      }, {
        id: 23,
        title: 'Singapore',
        childPlaces: []
      }, {
        id: 24,
        title: 'South Korea',
        childPlaces: []
      }, {
        id: 25,
        title: 'Thailand',
        childPlaces: []
      }, {
        id: 26,
        title: 'Vietnam',
        childPlaces: []
      }]
    }, {
      id: 27,
      title: 'Europe',
      childPlaces: [{
        id: 28,
        title: 'Croatia',
        childPlaces: [],
      }, {
        id: 29,
        title: 'France',
        childPlaces: [],
      }, {
        id: 30,
        title: 'Germany',
        childPlaces: [],
      }, {
        id: 31,
        title: 'Italy',
        childPlaces: [],
      }, {
        id: 32,
        title: 'Portugal',
        childPlaces: [],
      }, {
        id: 33,
        title: 'Spain',
        childPlaces: [],
      }, {
        id: 34,
        title: 'Turkey',
        childPlaces: [],
      }]
    }, {
      id: 35,
      title: 'Oceania',
      childPlaces: [{
        id: 36,
        title: 'Australia',
        childPlaces: [],
      }, {
        id: 37,
        title: 'Bora Bora (French Polynesia)',
        childPlaces: [],
      }, {
        id: 38,
        title: 'Easter Island (Chile)',
        childPlaces: [],
      }, {
        id: 39,
        title: 'Fiji',
        childPlaces: [],
      }, {
        id: 40,
        title: 'Hawaii (the USA)',
        childPlaces: [],
      }, {
        id: 41,
        title: 'New Zealand',
        childPlaces: [],
      }, {
        id: 42,
        title: 'Vanuatu',
        childPlaces: [],
      }]
    }]
  }, {
    id: 43,
    title: 'Moon',
    childPlaces: [{
      id: 44,
      title: 'Rheita',
      childPlaces: []
    }, {
      id: 45,
      title: 'Piccolomini',
      childPlaces: []
    }, {
      id: 46,
      title: 'Tycho',
      childPlaces: []
    }]
  }, {
    id: 47,
    title: 'Mars',
    childPlaces: [{
      id: 48,
      title: 'Corn Town',
      childPlaces: []
    }, {
      id: 49,
      title: 'Green Hill',
      childPlaces: []      
    }]
  }]
};

```


&#x20;       现在，假设你想添加一**个按钮来删除一个你已经去过的地方**。你会怎么做呢？[**更新嵌套的 state**](https://react.docschina.org/learn/updating-objects-in-state#updating-a-nested-object "更新嵌套的 state")\*\* 需要从更改部分一直向上复制对象。删除一个深度嵌套的地点将涉及复制其整个父级地点链。这样的代码可能非常冗长。\*\* ​

&#x20;      **如果 state 嵌套太深，难以轻松更新，可以考虑将其“****扁平化**”**。** 这里有一个方法可以重构上面这个数据。不同于树状结构，每个节点的 `place` 都是一个包含 **其子节点** 的数组，你可以让每个节点**的 ****`place`**** 作为数组保存 其子节点的 ID**。然后**存储一个节点 ID 与相应节点的映射关系。**

这个数据重组可能会让你想起看到一个数据库表：

```typescript 
export const initialTravelPlan = {
  0: {
    id: 0,
    title: '(Root)',
    childIds: [1, 43, 47],
  },
  1: {
    id: 1,
    title: 'Earth',
    childIds: [2, 10, 19, 27, 35]
  },
  2: {
    id: 2,
    title: 'Africa',
    childIds: [3, 4, 5, 6 , 7, 8, 9]
  }, 
  3: {
    id: 3,
    title: 'Botswana',
    childIds: []
  },
  4: {
    id: 4,
    title: 'Egypt',
    childIds: []
  },
  5: {
    id: 5,
    title: 'Kenya',
    childIds: []
  },
  6: {
    id: 6,
    title: 'Madagascar',
    childIds: []
  }, 
  7: {
    id: 7,
    title: 'Morocco',
    childIds: []
  },
  8: {
    id: 8,
    title: 'Nigeria',
    childIds: []
  },
  9: {
    id: 9,
    title: 'South Africa',
    childIds: []
  },
  10: {
    id: 10,
    title: 'Americas',
    childIds: [11, 12, 13, 14, 15, 16, 17, 18],   
  },
  11: {
    id: 11,
    title: 'Argentina',
    childIds: []
  },
  12: {
    id: 12,
    title: 'Brazil',
    childIds: []
  },
  13: {
    id: 13,
    title: 'Barbados',
    childIds: []
  }, 
  14: {
    id: 14,
    title: 'Canada',
    childIds: []
  },
  15: {
    id: 15,
    title: 'Jamaica',
    childIds: []
  },
  16: {
    id: 16,
    title: 'Mexico',
    childIds: []
  },
  17: {
    id: 17,
    title: 'Trinidad and Tobago',
    childIds: []
  },
  18: {
    id: 18,
    title: 'Venezuela',
    childIds: []
  },
  19: {
    id: 19,
    title: 'Asia',
    childIds: [20, 21, 22, 23, 24, 25, 26],   
  },
  20: {
    id: 20,
    title: 'China',
    childIds: []
  },
  21: {
    id: 21,
    title: 'Indonesia',
    childIds: []
  },
  22: {
    id: 22,
    title: 'India',
    childIds: []
  },
  23: {
    id: 23,
    title: 'Singapore',
    childIds: []
  },
  24: {
    id: 24,
    title: 'South Korea',
    childIds: []
  },
  25: {
    id: 25,
    title: 'Thailand',
    childIds: []
  },
  26: {
    id: 26,
    title: 'Vietnam',
    childIds: []
  },
  27: {
    id: 27,
    title: 'Europe',
    childIds: [28, 29, 30, 31, 32, 33, 34],   
  },
  28: {
    id: 28,
    title: 'Croatia',
    childIds: []
  },
  29: {
    id: 29,
    title: 'France',
    childIds: []
  },
  30: {
    id: 30,
    title: 'Germany',
    childIds: []
  },
  31: {
    id: 31,
    title: 'Italy',
    childIds: []
  },
  32: {
    id: 32,
    title: 'Portugal',
    childIds: []
  },
  33: {
    id: 33,
    title: 'Spain',
    childIds: []
  },
  34: {
    id: 34,
    title: 'Turkey',
    childIds: []
  },
  35: {
    id: 35,
    title: 'Oceania',
    childIds: [36, 37, 38, 39, 40, 41, 42],   
  },
  36: {
    id: 36,
    title: 'Australia',
    childIds: []
  },
  37: {
    id: 37,
    title: 'Bora Bora (French Polynesia)',
    childIds: []
  },
  38: {
    id: 38,
    title: 'Easter Island (Chile)',
    childIds: []
  },
  39: {
    id: 39,
    title: 'Fiji',
    childIds: []
  },
  40: {
    id: 40,
    title: 'Hawaii (the USA)',
    childIds: []
  },
  41: {
    id: 41,
    title: 'New Zealand',
    childIds: []
  },
  42: {
    id: 42,
    title: 'Vanuatu',
    childIds: []
  },
  43: {
    id: 43,
    title: 'Moon',
    childIds: [44, 45, 46]
  },
  44: {
    id: 44,
    title: 'Rheita',
    childIds: []
  },
  45: {
    id: 45,
    title: 'Piccolomini',
    childIds: []
  },
  46: {
    id: 46,
    title: 'Tycho',
    childIds: []
  },
  47: {
    id: 47,
    title: 'Mars',
    childIds: [48, 49]
  },
  48: {
    id: 48,
    title: 'Corn Town',
    childIds: []
  },
  49: {
    id: 49,
    title: 'Green Hill',
    childIds: []
  }
};

```


**现在 state 已经“扁平化”（也称为“规范化”），更新嵌套项会变得更加容易。**

现在要删除一个地点，您只需要更新两个 state 级别：

- 其 **父级** 地点的更新版本应该从其 `childIds` 数组中排除已删除的 ID。
- 其根级“表”对象的更新版本应包括父级地点的更新版本。

下面是展示如何处理它的一个示例：

```typescript 
import { useState } from 'react';
import { initialTravelPlan } from './places.js';

export default function TravelPlan() {
  const [plan, setPlan] = useState(initialTravelPlan);

  function handleComplete(parentId, childId) {
    const parent = plan[parentId];
    // 创建一个其父级地点的新版本
    // 但不包括子级 ID。
    const nextParent = {
      ...parent,
      childIds: parent.childIds
        .filter(id => id !== childId)
    };
    // 更新根 state 对象...
    setPlan({
      ...plan,
      // ...以便它拥有更新的父级。
      [parentId]: nextParent
    });
  }

  const root = plan[0];
  const planetIds = root.childIds;
  return (
    <>
      <h2>Places to visit</h2>
      <ol>
        {planetIds.map(id => (
          <PlaceTree
            key={id}
            id={id}
            parentId={0}
            placesById={plan}
            onComplete={handleComplete}
          />
        ))}
      </ol>
    </>
  );
}

function PlaceTree({ id, parentId, placesById, onComplete }) {
  const place = placesById[id];
  const childIds = place.childIds;
  return (
    <li>
      {place.title}
      <button onClick={() => {
        onComplete(parentId, id);
      }}>
        Complete
      </button>
      {childIds.length > 0 &&
        <ol>
          {childIds.map(childId => (
            <PlaceTree
              key={childId}
              id={childId}
              parentId={id}
              placesById={placesById}
              onComplete={onComplete}
            />
          ))}
        </ol>
      }
    </li>
  );
}

```


你确实**可以随心所欲地嵌套 state**，但是将其 \*\*“扁平化”**可以解决许多问题。这使得**state 更容易更新 \*\*，并且有助**于确保在嵌套对象的不同部分中没有重复。**

# 对 state 进行保留和重置

&#x20;       各个组件的\*\* state 是各自独立的\*\*。根据**组件在 UI 树中的位置**，React 可以**跟踪哪些 state 属于哪个组件**。你可以**控制**在**重新渲染过程中何时对 state 进行保留和重置。**

## UI 树&#x20;

&#x20;    浏览器使用**许多树形结构来为 UI 建立模型**。[DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction "DOM")` 用于`表示 `HTML` 元素，[CSSOM](https://developer.mozilla.org/docs/Web/API/CSS_Object_Model "CSSOM")` 则`表示 `CSS` 元素。甚至还有 [Accessibility tree](https://developer.mozilla.org/docs/Glossary/Accessibility_tree "Accessibility tree")！

&#x20;     React 也使用树形结构来对你创造的 UI 进行管理和建模。React 根据你的 `JSX 生成 `**`UI 树`**`。`React DOM 根据 UI 树去更新浏览器的 DOM 元素。（React Native 则将这些 UI 树转译成移动平台上特有的元素。）

![](./assets/image/image_YNODklepE6.png)

## state 与树中的某个位置相关联&#x20;

当你为一个组件添加 state 时，你**可能会觉得 state “活”在组件内部**。但实际上，**state 被保存在 React 内部**。根据**组件在 UI 树中的位置**，`React` 将它所持有的**每个 state 与正确的组件关联起来**。

下面只定义了一个 `<Counter />` JSX 标签，但将它渲染在了两个不同的位置：

```typescript 
import { useState } from 'react';

export default function App() {
  const counter = <Counter />;
  return (
    <div>
      {counter}
      {counter}
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        加一
      </button>
    </div>
  );
}

```


下面是它们的树形结构的样子：

![](./assets/image/image_8xgNpgGhzp.png)

**这是两个独立的 counter，因为它们在树中被渲染在了各自的位置。** 一般情况下你不用去考虑这些位置来使用 React，但知道它们是如何工作会很有用。

在 React 中，屏幕中的每个组件都有完全独立的 state。举个例子，当你并排渲染两个 `Counter` 组件时，它们都会拥有各自独立的 `score` 和 `hover` state。它们互不影响

只有**当你在相同的位置渲染相同的组件时，**React 才会**一直保留着组件的 state**。

```typescript 
import { useState } from 'react';

export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? (
        <Counter isFancy={true} /> 
      ) : (
        <Counter isFancy={false} /> 
      )}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={e => {
            setIsFancy(e.target.checked)
          }}
        />
        使用好看的样式
      </label>
    </div>
  );
}

function Counter({ isFancy }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }
  if (isFancy) {
    className += ' fancy';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        加一
      </button>
    </div>
  );
}

```


当你勾选或清空复选框的时候，计数器 state 并没有被重置。不管 `isFancy` 是 `true` 还是 `false`，根组件 `App` 返回的 `div` 的第一个子组件都是 `<Counter />`：

![](https://react.docschina.org/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fpreserving_state_same_component.dark.png\&w=1200\&q=75)

更新 `App` 的状态不会重置 `Counter`，因为 `Counter` 始终保持在同一位置。

它是位于相同位置的相同组件，所以对 React 来说，它是同一个计数器。

### 陷阱

记住 **对 React 来说重要的是组件在**\*\* UI 树中的位置,而不是在 JSX 中的位置\*\* **！** 这个组件在`if` 内外有两个`return` 语句，它们带有不同的 `<Counter />` JSX 标签：

```typescript 
import { useState } from 'react';

export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  if (isFancy) {
    return (
      <div>
        <Counter isFancy={true} />
        <label>
          <input
            type="checkbox"
            checked={isFancy}
            onChange={e => {
              setIsFancy(e.target.checked)
            }}
          />
          使用好看的样式
        </label>
      </div>
    );
  }
  return (
    <div>
      <Counter isFancy={false} />
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={e => {
            setIsFancy(e.target.checked)
          }}
        />
        使用好看的样式
      </label>
    </div>
  );
}

function Counter({ isFancy }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }
  if (isFancy) {
    className += ' fancy';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        加一
      </button>
    </div>
  );
}

```


你可能以为当你勾选复选框的时候 state 会被重置，但它并没有！这是因为 **两个 ****`<Counter />`**** 标签被渲染在了相同的位置**\*\*。\*\* React 不知道你的函数里是如何进行条件判断的，它只会“看到”你返回的树。在这两种情况下，`App` 组件都会返回一个包裹着 `<Counter />` 作为第一个子组件的 `div`。这就是 React 认为它们是 **同一个** `<Counter />` 的原因。

你可以认为它们有相同的“地址”：根组件的第一个子组件的第一个子组件。不管你的逻辑是怎么组织的，这就是 React 在前后两次渲染之间将它们进行匹配的方式。

## 相同位置的不同组件会使 state 重置

### 陷阱

```typescript 
import { useState } from 'react';

export default function MyComponent() {
  const [counter, setCounter] = useState(0);

  function MyTextField() {
    const [text, setText] = useState('');

    return (
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
    );
  }

  return (
    <>
      <MyTextField />
      <button onClick={() => {
        setCounter(counter + 1)
      }}>点击了 {counter} 次</button>
    </>
  );
}

```


每次你点击按钮，输入框的 state 都会消失！**这是因为每次 ****`MyComponent`**** 渲染时都会创建一个 不同 的 ****`MyTextField`**** 函数**。你在相同位置渲染的是 **不同** 的组件，所以 React 将其下所有的 state 都重置了。这样会导致 bug 以及性能问题。为了避免这个问题， **永远要将组件定义在最上层并且不要把它们的定义嵌套起来。**

- 不要嵌套组件的定义，否则你会意外地导致 state 被重置。

## 在相同位置重置 state

有两个方法可以在它们相互切换时重置 state：

1. 将组件渲染在不同的位置
2. 使用 `key` 赋予每个组件一个明确的身份

### 方法一：将组件渲染在不同的位置

你如果想让两个 `Counter` 各自独立的话，可以将它们渲染在不同的位置：

```typescript 
import { useState } from 'react';

export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
       {isPlayerA &&
        <Counter person="Taylor" />
      }
      {!isPlayerA &&
        <Counter person="Sarah" />
      }
       <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        下一位玩家！
      </button>
    </div>
  );
}

function Counter({ person }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{person} 的分数：{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        加一
      </button>
    </div>
  );
}
```


### 方法二：使用 key 来重置 state&#x20;

还有另一种更通用的重置组件 state 的方法。

你可能在` `[渲染列表](https://react.docschina.org/learn/rendering-lists#keeping-list-items-in-order-with-key "渲染列表")` `时见到过 `key`。但\*\* key 不只可以用于列表\*\*！你可以使用\*\* key 来让 React 区分任何组件\*\*。默认情况下，React 使用父组件内部的顺序（“第一个计数器”、“第二个计数器”）来区分组件。但是 **key** 可以**让你告诉 React **这不仅仅是 **第一个** 或者 **第二个** 计数器，而且还是**一个特定的计数器—**

在这个例子中，即使两个 `<Counter />` 会出现在 JSX 中的同一个位置，它们也不会共享 state：

```typescript 
import { useState } from 'react';

export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA ? (
        <Counter key="Taylor" person="Taylor" />
      ) : (
        <Counter key="Sarah" person="Sarah" />
      )}
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        下一位玩家！
      </button>
    </div>
  );
}

function Counter({ person }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{person} 的分数：{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        加一
      </button>
    </div>
  );
}

```


指定一个 `key` 能够让 React 将 `key` 本身**而非它们在父组件中的顺序**作为位置的一部分。这就是为什么尽管你用 JSX 将组件渲染在相同位置，但在 React 看来它们是两个不同的计数器。因此它们永远都不会共享 state。每当一个计数器出现在屏幕上时，它的 state 会被创建出来。每当它被移除时，它的 state 就会被销毁。在它们之间切换会一次又一次地使它们的 state 重置。

### 注意

请记住 key **不是全局唯一的**。它们`只能指定` **父组件内部** 的顺序。

### 使用 key 重置表单

使用 key 来重置 state 在处理表单时特别有用。

在这个聊天应用中， `<Chat>` 组件包含文本输入 state：

```typescript 
import { useState } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';

export default function Messenger() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={contact => setTo(contact)}
      />
      <Chat contact={to} />
    </div>
  )
}

const contacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];

```


![](./assets/image/image_WUxhmDKMBL.png)

尝试在输入框中输入一些内容，然后点击 “Alice” 或 “Bob” 来选择不同的收件人。**你会发现因为 ****`<Chat>`**** 被渲染在了树的相同位置，输入框的 state 被保留下来了。**

**在很多应用里这可能会是大家所需要的特性，但在这个聊天应用里并不是！** 你不应该让用户因为一次偶然的点击而把他们已经输入的信息发送给一个错误的人。**要修复这个问题，只需给组件添加一个 ****`key`**** ：**

```typescript 
<Chat key={to.id} contact={to} />

```


这样确保了当你选择一个不同的收件人时， `Chat` 组件——**包括其下方树中的任何 state——都将从头开始重新创建**。 React 还将重新创建 DOM 元素，而不是复用它们。

现在切换收件人就总会清除文本字段了：

```typescript 
import { useState } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';

export default function Messenger() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={contact => setTo(contact)}
      />
      <Chat key={to.id} contact={to} />
    </div>
  )
}

const contacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];

```


[迁移状态逻辑至 Reducer 中](<./迁移状态逻辑至 Reducer 中/index.md> "迁移状态逻辑至 Reducer 中")

[使用 Context 深层传递参数](<./使用 Context 深层传递参数/index.md> "使用 Context 深层传递参数")

[使用 Reducer 和 Context 拓展你的应用](<./使用 Reducer 和 Context 拓展你的应用/index.md> "使用 Reducer 和 Context 拓展你的应用")

[渲染和提交](./渲染和提交/index.md "渲染和提交")
