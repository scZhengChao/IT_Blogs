# 缓存计算属性

## 目录

- [一、核心思路：避免重复计算](#一核心思路避免重复计算)
- [二、方案 1：使用 Zustand 的 Selector 和浅层比较](#二方案-1使用-Zustand-的-Selector-和浅层比较)
  - [示例代码](#示例代码)
  - [优点](#优点)
  - [缺点](#缺点)
- [三、方案 2：使用 Memoization 缓存计算结果](#三方案-2使用-Memoization-缓存计算结果)
  - [示例代码](#示例代码)
  - [优点](#优点)
  - [缺点](#缺点)
- [四、方案 3：将计算属性存储为派生状态](#四方案-3将计算属性存储为派生状态)
  - [示例代码](#示例代码)
  - [优点](#优点)
  - [缺点](#缺点)
- [五、性能优化对比](#五性能优化对比)
- [六、最佳实践建议](#六最佳实践建议)

在 Zustand 中缓存计算属性的性能优化，可以通过 **Selector 选择器 + 浅层比较**或 **Memoization 缓存函数**实现。以下是具体方案和示例：

***

### 一、核心思路：避免重复计算

当状态中的某个计算属性（如`totalPrice`）依赖其他状态（如`items`）时，如果直接通过`get()`计算，每次状态更新都会触发重新计算。通过缓存机制，可以确保 **仅在依赖项变化时重新计算**。

***

### 二、方案 1：使用 Zustand 的 Selector 和浅层比较

Zustand 允许通过`shallow`比较选择器结果，避免无关状态变更触发重新渲染。

#### 示例代码

```typescript 
import { create } from 'zustand';
import { shallow } from 'zustand/shallow';

// 定义 Store
const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  // 计算属性（无缓存）
  getTotalPrice: () => get().items.reduce((sum, item) => sum + item.price, 0),
}));

// 在组件中使用 Selector + 浅层比较
function CartTotal() {
  const total = useCartStore(
    (state) => state.getTotalPrice(),
    shallow // 仅在结果变化时触发重渲染
  );
  return <div>Total: {total}</div>;
}
```


#### 优点

- 简单易用，无需额外依赖
- 自动跳过无关状态变更的重新渲染

#### 缺点

- **计算逻辑仍会在每次依赖项变化时执行**

### 三、方案 2：使用 Memoization 缓存计算结果

通过 **缓存函数**（如`lodash.memoize`）仅在依赖项变化时触发计算。

#### 示例代码

```typescript 
import { create } from 'zustand';
import memoize from 'lodash.memoize';

type CartItem = { id: string; price: number };

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  // 缓存计算函数（依赖 items）
  getTotalPrice: () => number;
};

// 缓存计算逻辑的函数
const calculateTotal = memoize(
  (items: CartItem[]) => items.reduce((sum, item) => sum + item.price, 0),
  (items) => JSON.stringify(items) // 依赖项序列化为缓存 Key
);

const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  getTotalPrice: () => calculateTotal(get().items), // 调用缓存函数
}));

// 组件中使用
function CartTotal() {
  const total = useCartStore((state) => state.getTotalPrice()); //返回的基础类型
  return <div>Total: {total}</div>;
}
```


#### 优点

- 依赖项未变化时直接返回缓存值
- 适合计算成本高的场景

#### 缺点

- 需手动管理缓存依赖项（如序列化`items`）

### 四、方案 3：将计算属性存储为派生状态

在状态更新时直接计算并存储派生值，适合 **依赖项明确且更新频率低** 的场景。

#### 示例代码

```typescript 
import { create } from 'zustand';

type CartStore = {
  items: CartItem[];
  total: number; // 派生状态
  addItem: (item: CartItem) => void;
};

const useCartStore = create<CartStore>((set) => ({
  items: [],
  total: 0,
  addItem: (item) =>
    set((state) => {
      const newItems = [...state.items, item];
      const newTotal = newItems.reduce((sum, item) => sum + item.price, 0);
      return { items: newItems, total: newTotal }; // 更新时计算并存储
    }),
}));

// 组件中直接读取 total
function CartTotal() {
  const total = useCartStore((state) => state.total);
  return <div>Total: {total}</div>;
}
```


#### 优点

- 计算逻辑仅在依赖项更新时触发
- 直接读取派生状态，性能最优

#### 缺点

- 需手动维护派生状态，代码冗余

### 五、性能优化对比

| 方案             | 计算时机    | 渲染触发条件  | 适用场景        |
| -------------- | ------- | ------- | ----------- |
| Selector + 浅比较 | 每次依赖项变化 | 结果值变化时  | 轻量计算，频繁更新   |
| Memoization 缓存 | 依赖项变化时  | 缓存值变化时  | 计算成本高，依赖项明确 |
| 派生状态存储         | 状态更新时   | 派生状态变化时 | 依赖项少，更新低频   |

***

### 六、最佳实践建议

1. **轻量计算**：优先使用 **Selector +`shallow`**，简单高效。
2. **复杂计算**：使用 **Memoization 缓存**（如`lodash.memoize`）。
3. **低频更新**：直接存储 **派生状态**，性能最佳。
4. **避免滥用缓存**：仅在必要时引入，防止内存泄漏。

通过合理选择缓存策略，可以在 Zustand 中高效管理计算属性，显著提升应用性能
