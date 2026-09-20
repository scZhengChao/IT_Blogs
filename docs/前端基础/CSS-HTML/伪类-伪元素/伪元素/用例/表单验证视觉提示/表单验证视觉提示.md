# 表单验证视觉提示

&#x20;       仅使用CSS，您就可以向用户显示有关表单输入有效性的视觉提示。我们可以在表单元素上使用 `:valid` 和 `:invalid` CSS伪类，当其内容验证成功或失败时，应用适当的样式。

&#x20;      请考虑以下HTML页面结构：

```html 
<!-- Regex in pattern attribute means input can accept `firstName Lastname` (whitespace sepearated names) -->
<!-- And invalidates any other symbols like `*` -->
<input
    type="text"
    pattern="([a-zA-Z0-9]\s?)+"
    placeholder="Enter full name"
    required
/>
<span></span>

```


`<span>` 将用于显示验证结果。以下的CSS根据其验证结果来设置输入框的样式：

```css 
input + span {
    position: relative;
}

input + span::before {
    position: absolute;
    right: -20px;
    bottom: 0;
}

input:not(:placeholder-shown):invalid {
    border: 2px solid red;
}

input:not(:placeholder-shown):invalid + span::before {
    content: "✖";
    color: red;
}

input:not(:placeholder-shown):valid + span::before {
    content: "✓";
    color: green;
}

```
