# Clipboard

## 目录

- [复制到剪贴板](#复制到剪贴板)
- [复制粘贴](#复制粘贴)

## 复制到剪贴板

您可以使用 Clipboard API 创建“复制到剪贴板”功能：

```javascript 
function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}           

```


剪贴板 API 允许我们**读取和写入剪贴板中的数据**。这对于实现复制到剪贴板的功能非常有用。

# 复制粘贴

\*\*Clipboard \*\*​

[利用剪切板JS API优化输入框的粘贴体验 «  张鑫旭-鑫空间-鑫生活 输入框输入内容我们有时候为了方便，会直接粘贴内容，例如IP，网址，或者陌生人的手机号。但是，有时候我们复制的内容包含冗余信息，或者格式不准确，还需要重新编辑，体验就不好了。实际上，我们可以直接控制剪切板里面的复制的文字内容，可以实现粘贴的数据是我们希望的准确的数据格式，省去用户重新自己编辑的麻烦，可以有效提升用户的交互体验。 具体该如何实现呢？请看本文的介绍以及可以直接复制粘贴就可以使用的JS代码 https://www.zhangxinxu.com/wordpress/2018/09/js-clipboard-api-paste-input/](https://www.zhangxinxu.com/wordpress/2018/09/js-clipboard-api-paste-input/ "利用剪切板JS API优化输入框的粘贴体验 «  张鑫旭-鑫空间-鑫生活 输入框输入内容我们有时候为了方便，会直接粘贴内容，例如IP，网址，或者陌生人的手机号。但是，有时候我们复制的内容包含冗余信息，或者格式不准确，还需要重新编辑，体验就不好了。实际上，我们可以直接控制剪切板里面的复制的文字内容，可以实现粘贴的数据是我们希望的准确的数据格式，省去用户重新自己编辑的麻烦，可以有效提升用户的交互体验。 具体该如何实现呢？请看本文的介绍以及可以直接复制粘贴就可以使用的JS代码 https://www.zhangxinxu.com/wordpress/2018/09/js-clipboard-api-paste-input/")

这是真大神；

```javascript 
const btn = document.querySelector("#btn");

btn.addEventListener("click", function() {

    // 创建一个input框

    const input = document.createElement("input");

    // 设置 input框内容

    input.setAttribute("value", "copy content");

    // 添加到body元素中

    document.body.appendChild(input);

    // 将新添加进去的input元素进行选中

    input.select();

    // 为input添加监听事件方便对剪贴板内容进行二次修改

    input.addEventListener("copy", function(event) {

        // 使用ClipboardApi来设置剪贴板里的内容

        // 参考张鑫旭的博客， 需要的文末有地址

        var clipboardData = event.clipboardData || window.clipboardData;

        if (!clipboardData) {

            return;

        }

        var text = window.getSelection().toString();

        if (text) {

            event.preventDefault();

            clipboardData.setData("text/plain", text + "\n\n 我是添加进来的内容");

        }

    });

    // 执行复制操作

    if (document.execCommand("copy")) {

        console.log("复制成功");

    } else {

        console.log("复制失败");

    }

    // document.execCommand('copy') 如果内容复制的不全

    // document.execCommand('copy')前先进行document.execCommand('selectAll')选中所有内容即可

    // 移除input框

    document.body.removeChild(input);

});、
```
