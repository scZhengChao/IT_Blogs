# useRafState

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86e87cbecaed43b5a44b938f97438632~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1580\&h=232\&s=65234\&e=png\&b=fdfdfd)

只在 [requestAnimationFrame](https://link.juejin.cn?target=https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame "requestAnimationFrame") callback 时更新 state，一般用于性能优化，避免页面卡顿。可能会有以下使用场景

1. **高频更新状态：**  如果在 React 组件中有一个状态需要在短时间内更新很多次，对性能要求较高，例如拖拽操作、游戏、音视频播放、画布操作等，那么 `useRafState` 就会非常有用。
2. **动画和过渡效果：**  对于涉及到动画和过渡效果的场景，`useRafState` 可以更平滑地控制动作，提高用户体验。
3. **复杂或大数据集的交互：**  在处理稍微复杂或大量的数据，并且这些数据更改可能导致频繁更新状态和重绘的情况下，`useRafState` 可以优化性能，确保界面响应顺畅。

```javascript 
function useRafState<S>(initialState?: S | (() => S)) {
  // 通过ref记录AnimationFrame，卸载时清理
  const ref = useRef(0);
  const [state, setState] = useState(initialState);

  const setRafState = useCallback((value: S | ((prevState: S) => S)) => {
    cancelAnimationFrame(ref.current);
    
    //【核心】 在requestAnimationFrame callback时才更新state
    ref.current = requestAnimationFrame(() => {
      setState(value);
    });
  }, []);

  useUnmount(() => {
    cancelAnimationFrame(ref.current);
  });

  return [state, setRafState] as const;
}

```
