# 递归

```typescript 
.loop(@i) when (@i <= 2) {
  &:nth-of-type(@{i}) {
    left: calc((@i - 1) * 60px);
  }
  .loop(@i + 1);
}
.loop(1);
```
