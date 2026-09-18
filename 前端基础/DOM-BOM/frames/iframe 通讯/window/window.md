# window

## 目录

- [获取windows](#获取windows)
  - [获取iframe的windows](#获取iframe的windows)
    - [同域下](#同域下)

# 获取windows

- `window.parent`   parent 是父窗口
- `window.top`    最顶级父窗口
- `window.self` 当前窗口
- `window.opener`   opener 为open 打开的窗口
- **window\.parent 获取上一级的window对象，如果还是iframe则是该iframe的window对象**
- **window\.top 获取最顶级容器的window对象，即，就是你打开页面的文档**
- **window\.self 返回自身window的引用。可以理解 window===window\.self(脑残)**

## 获取iframe的windows

### 同域下

同理，在同域下，父页面可以获取子iframe的内容，那么子`iframe`同样也能操作父页面内容。在`iframe`中，可以通过在`window`上挂载的几个API进行获取.

- **`iframe.contentWindow`, 获取iframe的window对象**
- **`iframe.contentDocument`, 获取iframe的document对象**

&#x20;         &#x20;

```typescript 
var iframe = document.querySelector('iframe')
<iframe src="./test.html" name="test"></iframe>


获取子页面的window

var iframe = document.getElementById("iframe1");
var iwindow = iframe.contentWindow;

或者：
iframes['name']

```
