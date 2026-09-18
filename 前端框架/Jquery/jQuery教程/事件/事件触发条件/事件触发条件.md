# 事件触发条件

一个需要注意的问题是，**事件的触发总是由用户操作引发**的。例如，我们监控文本框的内容改动：

```javascript 
let input = $('#test-input');
input.change(function () {
    console.log('changed...');
});
```


当用户在文本框中输入时，就会触发`change`事件。但是，如果用JavaScript代码去改动文本框的值，将\_不会\_触发`change`事件：

```javascript 
let input = $('#test-input');
input.val('change it!'); // 无法触发change事件
```


有些时候，我们希望用代码触发`change`事件，可以**直接调用无参数**的`change()`**方法来触发该事件：**

```javascript 
let input = $('#test-input');
input.val('change it!');
input.change(); // 触发change事件
```


`input.change()`相当于`input.trigger('change')`，它是`trigger()`方法的简写。

为什么我们希望手动触发一个事件呢？如果不这么做，很多时候，我们就得写两份一模一样的代码。
