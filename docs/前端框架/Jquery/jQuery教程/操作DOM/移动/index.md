# 移动

另外注意，**如果要添加的DOM节点已经存在于HTML文档中，它会首先从文档移除，然后再添加**，也就是说，用`append()`，你可以**移动一个DOM节点。**

如果**要把新节点插入到指定位置**，例如，JavaScript和Python之间，那么，可以先定位到JavaScript，然后用`after()`方法：

```javascript 
let js = $('#test-div>ul>li:first-child');
js.after('<li><span>Lua</span></li>');
```


也就是说，**同级节点可以用**`after()`或者`before()`方法。

[after](./after/index.md "after")
