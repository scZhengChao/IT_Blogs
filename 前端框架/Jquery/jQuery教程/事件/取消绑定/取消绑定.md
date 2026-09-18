# 取消绑定

一个已被绑定的事件可以解除绑定，通过`off('click', function)`实现：

```javascript 
function hello() {
    alert('hello!');
}

a.click(hello); // 绑定事件

// 10秒钟后解除绑定:
setTimeout(function () {
    a.off('click', hello);
}, 10000);
```


**需要特别注意的是，下面这种写法是无效的：**

```javascript 
// 绑定事件:
a.click(function () {
    alert('hello!');
});

// 解除绑定:
a.off('click', function () {
    alert('hello!');
});
```


这是因为两个匿名函数虽然长得一模一样，但是它们是两个\_不同\_的函数对象，`off('click', function () {...})`无法移除已绑定的第一个匿名函数。

为了实现移除效果，可以使用`off('click')`**一次性移除已绑定的**\*\*`click`\*\***事件的所有处理函数。**

同理，无参数调用`off()`**一次性移除已绑定的所有类型的事件处理函数。**
