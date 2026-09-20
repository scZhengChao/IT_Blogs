# append

要添加新的DOM节点，除了通过jQuery的`html()`这种暴力方法外，还可以用`append()`方法，例如：

```html 
<div id="test-div">
    <ul>
        <li><span>JavaScript</span></li>
        <li><span>Python</span></li>
        <li><span>Swift</span></li>
    </ul>
</div>
```


如何向列表新增一个语言？首先要拿到\<ul>节点：

```javascript 
let ul = $('#test-div>ul');
```


然后，调用`append()`传入HTML片段：

```javascript 
ul.append('<li><span>Haskell</span></li>');
```


**除了接受字符串**，`append()`还**可以传入原始的DOM对象，jQuery对象和函数对象**：

```javascript 
// 创建DOM对象:
let ps = document.createElement('li');
ps.innerHTML = '<span>Pascal</span>';
// 添加DOM对象:
ul.append(ps);

// 添加jQuery对象:
ul.append($('#scheme'));

// 添加函数对象:
ul.append(function (index, html) {
    return '<li><span>Language - ' + index + '</span></li>';
});
```


传入函数时，要求返回一个字符串、DOM对象或者jQuery对象。因为jQuery的`append()`**可能作用于一组DOM节点**，只有传入函数才能针对每个DOM生成不同的子节点。

\*\*`append()`****把DOM添加到最后，****`prepend()`\*\***则把DOM添加到最前**。
