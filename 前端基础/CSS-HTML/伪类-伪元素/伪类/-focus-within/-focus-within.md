# :focus-within

它干的事情非常直白：

只要一个容器里的任意子元素获得焦点，这个容器本身就可以被选中并应用样式。

```css 
<div class="form-field">
  <input placeholder="Type something meaningful..." />
</div>


.form-field {
  border: 1px solid #ccc;
  padding: 12px;
}
.form-field:focus-within {
  border-color: hotpink;
}

```


这类场景最常见的地方，就是表单 UI。你原本只是想让整块输入区域在用户操作时更明显一些，结果以前得靠 JS 才能完成；现在，用一条 CSS 规则就够了。

而且支持情况也很稳，主流浏览器基本都没什么问题。
