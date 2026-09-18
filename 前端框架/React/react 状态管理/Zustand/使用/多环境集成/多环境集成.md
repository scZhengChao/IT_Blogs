# 多环境集成

实际的复杂应用中，一定会存在某些不在 react 环境内的状态数据，以图表、画布、3D 场景最多。一旦要涉及到多环境下的状态管理，可以让人掉无数头发。

而 zustand 说了，不慌，我已经考虑到了，`useStore`上直接可以拿值，是不是很贴心\~

```javascript 
// 官方示例

// 1. 创建Store
const useDogStore = create(() => ({ paw: true, snout: true, fur: true }))

// 2. react 环境外直接拿值
const paw = useDogStore.getState().paw

// 3. 提供外部事件订阅
const unsub1 = useDogStore.subscribe(console.log)

// 4. react 世界外更新值
useDogStore.setState({ paw: false })

const Component = () => {
  // 5. 在 react 环境内使用
  const paw = useDogStore((state) => state.paw)
  ...

```
