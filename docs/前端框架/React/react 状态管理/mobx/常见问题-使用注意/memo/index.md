# memo

**注意:** `observer` or `React.memo`?`observer` 会自动的使用 `memo`, 所以 `observer` 不需要再包裹 `memo`。 `memo` 会被 observer 组件安全的使用，**因为任何在props中的改变(很深的) 都会被**\*\*`observer`\*\*响应。
