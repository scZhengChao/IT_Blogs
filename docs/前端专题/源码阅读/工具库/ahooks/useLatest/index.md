# useLatest

用于 不放在依赖里（deps）又要获取最新的场景

```javascript 
function useLatest<T>(value: T) {
  const ref = useRef(value);
   // 核心：每次重渲染都更新ref
  ref.current = value;
 
  return ref;
}

// 使用场景
const { counter } = this.state;
// 创建一个 ref 来存储最新的 counter 值
const counterRef = useLatest(counter);
useEffect(() => {
  const timerId = setInterval(() => {
     console.log(counterRef.current); // 每次打印的都是最新的 counter 值
   }, 1000);
  return () => clearInterval(timerId);
}, [])
// 比如在其他的地方改变 counter
this.setState({ counter: counter + 1 });
```
