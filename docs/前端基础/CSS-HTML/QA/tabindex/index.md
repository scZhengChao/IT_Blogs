# tabindex

## 目录

- [tabindex = -1](#tabindex---1)

### `tabindex = -1`

`tabindex`属性是一个全局属性，也就是所有 HTML 标签都可以用的属性，比方说`id`，`class`属性等。所以，可以在`div`上使用。同时，这个属性是一个非常老的属性，**没有兼容性问**题，放心使用。

`tabindex`属性是一个与键盘访问行为息息相关的属性。平常可能感觉不到它的价值，但是一旦我们的鼠标坏掉了或者没电了，我们就只能使用键盘。亦或者在电视机上，或者投影设备上访问我们的网页的时候，我们只能使用遥控器。就算设备都完全正常，对于资深用户而言，键盘访问可以大大提高我们的使用效率。

当一个元素设置`tabindex`属性值为`-1`的时候，元素会变得`focusable`，所谓`focusable`指的是元素可以被鼠标或者JS `focus`，在 Chrome 浏览器下表现为会有`outline`发光效果，IE浏览器下是虚框，同时能够响应`focus`事件。默认的`focusable`元素有`<a>, <area>, <button>, <input>, <object>, <select> 以及 <textarea>`。

**但是，****`tabindex = -1`****不能被键盘的****`tab`****键进行****`focus`****。这种鼠标可以**\*\*`focus`****，但是键盘却不能****`focus`****的状态，只要****`tabindex`\*\***属性值为负值就可以了。**

因此，我们可以设置`div`被`focus`的样式，当鼠标点击`div`时，我们可以改变它的边框，如下：

```sass (scss)  
.area:focus {
    border-style: solid;
 }

```


`tabindex`**属性值是一个整数，它来决定被**\*\*`tab`****键****`focus`****的顺序，顺序越小越先被****`focus`，但是 ​`0`****除外，如下****`div`****被****`focus`\*\***的顺序依次是：1，2，3。**

```sass (scss)  
<div id="area" class="area" tabindex="1"></div>
<div class="area" tabindex="3"></div>
<div class="area" tabindex="2"></div>

```


**那**\*\*`tabindex="0"`\*\***又是怎么回事呢？**

元素设置`tabindex="-1"`，可以鼠标和JS可以`focus`，但键盘不能`focus`；

`tabindex="0"`和`tabindex="-1"`的唯\*\*一区别就是键盘也能`focus`****，但是被****`focus`\*\***的顺序是最后的**。或者你可以这么理解，`<div>`设置了`tabindex="0"`，从键盘访问的角度来讲，相对于`<div>`元素变成了`<button>`元素。
