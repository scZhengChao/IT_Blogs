# ClipboardEvent

```javascript 
wrap.oncopy = function(event){}
wrap.oncut = function(event){}
wrap.onpaste = function(event) {}

```


任何软件上的内容，可以被复制粘贴，是因为**软件对操作系统复制粘贴操作的实现**，软件都会把复制剪切的内容存**入操作系统的剪切板上**。同样，浏览器也对操作系统的剪切板进行了实现，属于浏览器的自身的实现。

浏览器复制操作的默认行为是触发浏览器的 copy 事件，将 copy 的内容存入操作系统的剪切板中。

那如何**干预浏览器的这种默认的复制粘贴操**作呢？

可以通过`event.preventDefault`阻止事件的默认行为，即当触发这三个事件时，阻止对系统剪切板的数据操作。然后，我们对数据进行加工后，重新写入到剪贴板。

比如，当用户复制我们网站的内容时，可以在数据后面加一个版权的相关信息。

```javascript 
<div id="wrap">这是复制的复制内容</div>
    <script>
      var wrap = document.getElementById('wrap')
      wrap.oncopy = function (event) {
        // 通过copy事件监听，阻止将选中内容复制到系统剪切板上
        event.preventDefault() 
        // 获取选中内容对象
        const selection = document.getSelection() 
        // selection对象重构了toSring()方法，获取selection对象的选中内容
        var selectContent = selection.toString() 
        var dealContent =
          selectContent +
          '转载请联系作者，内容地址：xxxxx'
        // 把重写后的内容写入到剪贴板  
        event.clipboardData.setData('text/plain', dealContent)
      }
    </script>

```
