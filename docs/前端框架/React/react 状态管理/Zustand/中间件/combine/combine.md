# combine

## 目录

- [基本使用示例](#基本使用示例)
- [处理多个状态切片](#处理多个状态切片)

在 Zustand 中，`combine`是一个实用工具，它允许你将多个状态切片（state slices）合并成一个单一的存储（store）。这种方式有助于组织和管理复杂的状态，将不同功能模块的状态分离到不同的切片中，使代码结构更加清晰和易于维护。以下是关于`combine`的详细使用介绍：

### 基本使用示例

以下是一个简单的示例，展示了如何使用`combine`合并两个状态切片：

```typescript 
import create, { combine } from 'zustand';

// 定义第一个状态切片
const counterSlice = (set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 }))
});

// 定义第二个状态切片
const userSlice = (set) => ({
    user: { name: 'Guest' },
    setUserName: (name: string) => set(() => ({ user: { name } }))
});

// 使用 combine 合并两个状态切片
 const useStore = create(combine(counterSlice, userSlice));
 
// 在组件中使用合并后的存储
const App = () => {
    const { count, increment, decrement, user, setUserName } = useStore();

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
            <p>User: {user.name}</p>
            <input
                type="text"
                value={user.name}
                onChange={(e) => setUserName(e.target.value)}
            />
        </div>
    );
};

export default App;
```


### 处理多个状态切片

`combine`可以处理任意数量的状态切片，你可以根据需要添加更多的状态切片：

```typescript 
// 使用 combine 合并三个状态切片
const useMultiSliceStore = create(combine(counterSlice, userSlice, themeSlice));

```
