# @container

它让组件可以根据**自身容器的尺寸**来响应，而不是永远盯着整个屏幕。

```css 
.card-wrapper {
container-type: inline-size;
}

.card {
display: grid;
gap: 10px;
}

@container (min-width:400px) {
.card {
    grid-template-columns: 1fr 2fr;
  }
}
```
