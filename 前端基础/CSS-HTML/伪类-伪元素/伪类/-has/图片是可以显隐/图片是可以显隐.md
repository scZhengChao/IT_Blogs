# 图片是可以显隐

举一个场景例子，我们看以下代码，一个容器中，图片是可以显隐的，我想要实现：

- 图片显示时，字体大小为 12px
- 图片隐藏时，字体大小为 20px

```javascript 
<div class="container">
    哈哈哈哈哈
    <img class="test-img" v-if="showImg"></img>
</div>

```


如果按照以前的做法，就是使用 动态`class` 的方式去玩完成这个功能，但是现在有 `:has()`可以通过 css 的方式去完成这件事\~

```javascript 
.container {
    font-size: 20px;
}
.container:has(img) {
    font-size: 12px;
}

或者
.container:has(.test-img) {
    font-size: 12px;
}

```
