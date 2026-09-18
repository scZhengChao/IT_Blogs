# ​​处理不可避免的差异​​

```react jsx 
<div suppressHydrationWarning={true}>
  {new Date().toLocaleTimeString()}
</div>
```


1. \-   使用 `suppressHydrationWarning` 属性抑制特定元素的警告
