# 组合使用

现在又有两个场景

- 判断容器有没有**子img**，有的话字体设置为 12px（上面的例子是后代选择器，不是子选择器）
- 判断容器有没有一个小**相邻的img**，有的话设置字体颜色为 red

我们可以这么去实现：

```javascript 
.container:has(>img) {
    font-size: 12px;
}

.container:has(+img) {
    color: red;
}

```


再来一个场景，当我 hover 到 子img 上时，我想要让 container 的字体变粗，可以这么去使用\~

```javascript 
.container:has(>img:hover) {
    color: red;
}

```
