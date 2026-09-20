# 享元模式在 前端开发实际场景下的

## 目录

- [享元模式(Flyweight Pattern)在前端开发中的实际应用](#享元模式Flyweight-Pattern在前端开发中的实际应用)
  - [一、DOM元素复用场景](#一DOM元素复用场景)
    - [1. 虚拟列表/无限滚动](#1-虚拟列表无限滚动)
    - [2. 表格单元格复用](#2-表格单元格复用)
  - [二、图形和动画优化](#二图形和动画优化)
    - [1. Canvas/WebGL对象复用](#1-CanvasWebGL对象复用)
    - [2. SVG图标复用](#2-SVG图标复用)
  - [三、数据模型管理](#三数据模型管理)
    - [1. 状态管理中的共享状态](#1-状态管理中的共享状态)
    - [2. 配置对象共享](#2-配置对象共享)
  - [四、前端框架中的应用](#四前端框架中的应用)
    - [1. React中的享元模式](#1-React中的享元模式)
    - [2. Vue中的计算属性](#2-Vue中的计算属性)
  - [五、实际应用建议](#五实际应用建议)

# 享元模式(Flyweight Pattern)在前端开发中的实际应用

享元模式在前端开发中是一种非常实用的优化手段，主要用于**减少内存占用**和**提高性能**。以下是享元模式在前端开发中的典型应用场景和实现方式：

## 一、DOM元素复用场景

### 1. 虚拟列表/无限滚动

```javascript 
// 只创建可见区域的DOM元素，滚动时复用
class VirtualList {
  constructor(container, itemCount, itemHeight, renderItem) {
    this.pool = []; // 元素池
    this.visibleItems = []; // 当前可见项
    
    // 滚动时复用元素
    container.addEventListener('scroll', () => {
      const startIdx = Math.floor(container.scrollTop / itemHeight);
      this.recycleItems(startIdx);
    });
  }
  
  recycleItems(startIdx) {
    // 将离开可视区域的元素放回池中
    this.visibleItems.forEach(item => {
      if (item.index < startIdx || item.index > startIdx + visibleCount) {
        this.pool.push(item.element);
        item.element.remove();
      }
    });
    
    // 从池中获取或创建新元素
    for (let i = 0; i < visibleCount; i++) {
      const element = this.pool.pop() || document.createElement('div');
      // 配置元素...
      container.appendChild(element);
    }
  }
}
```


### 2. 表格单元格复用

大型数据表格中，只渲染可见区域的单元格，滚动时复用DOM元素。

## 二、图形和动画优化

### 1. Canvas/WebGL对象复用

```typescript 
// 游戏开发中的子弹对象池
class BulletPool {
  constructor() {
    this.pool = [];
  }
  
  getBullet() {
    return this.pool.pop() || new Bullet();
  }
  
  returnBullet(bullet) {
    bullet.reset(); // 重置状态
    this.pool.push(bullet);
  }
}

// 使用
const bullet = bulletPool.getBullet();
// 子弹超出屏幕后
bulletPool.returnBullet(bullet);
```


### 2. SVG图标复用

```svg 
// 定义SVG symbol
<svg style="display:none">
  <symbol id="icon-edit" viewBox="0 0 24 24">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
  </symbol>
</svg>

// 多处复用
<svg class="icon"><use xlink:href="#icon-edit"></use></svg>
```


## 三、数据模型管理

### 1. 状态管理中的共享状态

Redux/Vuex中的状态共享就是享元模式的体现：

```javascript 
// Redux中的reducer可以看作是享元工厂
function todoReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload] // 共享不变的state其他部分
      };
    // ...
  }
}
```


### 2. 配置对象共享

```typescript 
// 共享按钮配置
const buttonConfigs = {
  primary: { color: 'blue', size: 'medium' },
  danger: { color: 'red', size: 'medium' }
};

function createButton(type) {
  const config = buttonConfigs[type] || buttonConfigs.primary;
  return new Button(config); // 多个按钮共享同一配置对象
}
```


## 四、前端框架中的应用

### 1. React中的享元模式

```javascript 
// React.memo缓存组件
const MemoizedComponent = React.memo(function MyComponent(props) {
  // 只有props改变时才会重新渲染
});

// 使用useMemo缓存计算结果
function ExpensiveComponent({ items }) {
  const computedValue = useMemo(() => expensiveCalculation(items), [items]);
  return <div>{computedValue}</div>;
}
```


### 2. Vue中的计算属性

```javascript 
export default {
  data() {
    return {
      items: [...]
    }
  },
  computed: {
    // 缓存计算结果，只有依赖变化时重新计算
    filteredItems() {
      return this.items.filter(item => item.active);
    }
  }
}
```


## 五、实际应用建议

1. **适用场景**：
   - **需要创建大量相似对象**
   - **内存占用是主要瓶颈**
   - **对象的大部分状态可以外部化**
2. **实现要点**：

```javascript 
class FlyweightFactory {
  constructor() {
    this.flyweights = {};
  }
  
  getFlyweight(key) {
    if (!this.flyweights[key]) {
      this.flyweights[key] = new ConcreteFlyweight(key);
    }
    return this.flyweights[key];
  }
}
```


1. **权衡考虑**：
   - 内存 vs CPU：**享元模式节省内存但可能增加CPU开销**（查找/计算）
   - 可读性：过度优化可能降低代码可读性
   - 现代浏览器优化：浏览器自身已对DOM操作有优化，不必过度设计

享元模式在前端性能优化中非常实用，**特别是在处理大量相似对象时。合理使用可以显著提升应用性能**，但也要注意不要过早优化，应在性能分析后有针对性地应用。
