# 通知父组件有关 state 变化的信息

## 目录

- [通知父组件有关 state 变化的信息](#通知父组件有关-state-变化的信息)

### 通知父组件有关 state 变化的信息

假设你正在编写一个有具有内部 state `isOn` 的 `Toggle` 组件，该 state 可以是 `true` 或 `false`。有几种不同的方式来进行切换（通过点击或拖动）。你希望在 `Toggle` 的 state 变化时通知父组件，因此你暴露了一个 `onChange` 事件并在 `Effect` 中调用它：

```javascript 
function Toggle({ onChange }) {
  const [isOn, setIsOn] = useState(false);

  // 🔴 避免：onChange 处理函数执行的时间太晚了
  useEffect(() => {
    onChange(isOn);
  }, [isOn, onChange])

  function handleClick() {
    setIsOn(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      setIsOn(true);
    } else {
      setIsOn(false);
    }
  }

  // ...
}

```


和之前一样，这不太理想。`Toggle` 首先更新它的 state，然后 React 会更新屏幕。然后 React 执行 Effect 中的代码，调用从父组件传入的 `onChange` 函数。现在父组件开始更新它自己的 state，开启另一个渲染流程。**更好的方式是在单个流程中完成所有操作**。

删除 Effect，并在同一个事件处理函数中更新 **两个** 组件的 state：

```javascript 
function Toggle({ onChange }) {
  const [isOn, setIsOn] = useState(false);

  function updateToggle(nextIsOn) {
    // ✅ 非常好：在触发它们的事件中执行所有更新
    setIsOn(nextIsOn);
    onChange(nextIsOn);
  }

  function handleClick() {
    updateToggle(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      updateToggle(true);
    } else {
      updateToggle(false);
    }
  }

  // ...
}

```


通过这种方式，`Toggle` 组件及其父组件都在**事件处理期间更新了各自的 state**。React 会 [**批量**](https://zh-hans.react.dev/learn/queueing-a-series-of-state-updates "批量")\*\* **处理来自不同组件的更新，所以**只会有一个渲染流程。\*\*

你也可以完全移除该 state，并从父组件中接收 `isOn`：

```javascript 
// ✅ 也很好：该组件完全由它的父组件控制
function Toggle({ isOn, onChange }) {
  function handleClick() {
    onChange(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      onChange(true);
    } else {
      onChange(false);
    }
  }

  // ...
}

```
