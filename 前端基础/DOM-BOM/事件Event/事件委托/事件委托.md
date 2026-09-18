# 事件委托

## 目录

- [事件委托](#事件委托)
- [target 和 currentTarget](#target-和-currentTarget)

# 事件委托

为什么要用事件委托呢？
&#x20;      当dom需要处理事件时，我们可以直接给dom添加事件处理程序，那么当许多dom都需要处理事件呢？比如一个ul中有100li，每个li都需要处理click事件，那我们可以遍历所有li，给它们添加事件处理程序，但是这样做会有什么影响呢？我们知道添加到页面上的事件处理程序的数量将直接影响到页面的整体运行性能，因为这需要不停地与dom节点进行交互，访问dom的次数越多，引起浏览器重绘和重排的次数就越多，自然会延长页面的交互就绪时间，这也是为什么可以减少dom操作来优化页面的运行性能；而如果使用委托，我们可以将事件的操作统一放在js代码里，这样与dom的操作就可以减少到一次，大大减少与dom节点的交互次数提高性能。同时，将事件的操作进行统一管理也能节约内存，因为每个js函数都是一个对象，自然就会占用内存，给dom节点添加的事件处理程序越多，对象越多，占用的内存也就越多；而使用委托，我们就可以只在dom节点的父级添加事件处理程序，那么自然也就节省了很多内存，性能也更好。
&#x20;    事件委托怎么实现呢？因为冒泡机制，既然点击子元素时，也会触发父元素的点击事件。那么我们就可以把点击子元素的事件要做的事情，交给最外层的父元素来做，让事件冒泡到最外层的dom节点上触发事件处理程序，这就是事件委托。

```javascript 
一般方法：
<ul id="list">
    <li id="item1" >item1</li>
    <li id="item2" >item2</li>
    <li id="item3" >item3</li>
</ul>


<script>
var item1 = document.getElementById("item1");
var item2 = document.getElementById("item2");
var item3 = document.getElementById("item3");


item1.onclick = function(event){
    alert(event.target.nodeName);
    console.log("hello item1");
}
item2.onclick = function(event){
    alert(event.target.nodeName);
    console.log("hello item2");
}
item3.onclick = function(event){
    alert(event.target.nodeName);
    console.log("hello item3");
}
</script>


事件委托：
<ul id="list">
    <li id="item1" >item1</li>
    <li id="item2" >item2</li>
    <li id="item3" >item3</li>
</ul>


<script>
var item1 = document.getElementById("item1");
var item2 = document.getElementById("item2");
var item3 = document.getElementById("item3");
var list = document.getElementById("list");
list.addEventListener("click",function(event){
var target = event.target;
if(target == item1){
    alert(event.target.nodeName);
    console.log("hello item1");
}else if(target == item2){
    alert(event.target.nodeName);
    console.log("hello item2");
}else if(target == item3){
    alert(event.target.nodeName);
    console.log("hello item3");
}
});
</script>


动态的添加dom时 事件委托
<ul id="list">
    <li id="item1" >item1</li>
    <li id="item2" >item2</li>
    <li id="item3" >item3</li>
</ul>

<script>
var list = document.getElementById("list");

document.addEventListener("click",function(event){
    var target = event.target;
    if(target.nodeName == "LI"){
        alert(target.innerHTML);
    }
});

var node=document.createElement("li");
var textnode=document.createTextNode("item4");
node.appendChild(textnode);
list.appendChild(node);

</script>
```


# target 和 currentTarget

`e.target`：触发事件的元素
`e.currentTarget`：绑定事件的元素
