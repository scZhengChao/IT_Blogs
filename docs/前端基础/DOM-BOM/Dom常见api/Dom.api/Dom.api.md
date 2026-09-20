# Dom.api

## 目录

- [操作普通dom](#操作普通dom)
- [操作class 类名box.classList.contains()/add()/remove() ](#操作class类名boxclassListcontainsaddremove)
- [节点属性](#节点属性)
- [重排重绘](#重排重绘)

# **操作普通dom**

```javascript 
 document.createelement("div) --创建 
 box.remove()/box.removeChild() ---删除 
 box.outerHTML="<p></p>"; --- 修改  如果只是获取，则输出 box 及其子元素本身字符串 
 box.insertbefore("新的子元素","odl的子元素"); 
 box.replacechild("新的子元素","旧的子元素"); 
 box.cloneNode(true)  true 包括其子元素 
 box.firstChild  // 第一个节点 
 box.firstElementChild //第一个元素节点 
 box.lastElementChild  // 最后一个元素节点 
 box.childNodes;//[]   子节点 
 document.createDocumentFragment()// 创造一个元素片段 
 box.innerHTML = '' 
 box.contains(target)   // 判断box里面有没有target 
 //设置选择文本的内容或设置光标位置（两个参数：start,end；start为开始位置，end为结束位置；如果开始位置和结束位置相同则就是光标位置） 
 input.setSelectionRange(0, oldhtml.length);
```


# \*\*操作class 类名box.classList.contains()/add()/remove() \*\*​

```javascript 
  <div class="box abc"></div> 
   var box = document.querySelector('.box') 
     console.log( box.classList ) 
      
     DOMTokenList(2) ["box", "abc", value: "box abc"] 
     0: "box" 
     1: "abc" 
     length: 2 
     value: "box abc" 
     __proto__: DOMTokenList 
 
 
 //解决classList 的兼容问题 
 if (!("classList" in document.documentElement)) { 
     Object.defineProperty(HTMLElement.prototype, 'classList', { 
         get: function() { 
             var self = this; 
             function update(fn) { 
                 return function(value) { 
                     var classes = self.className.split(/\s+/g), 
                         index = classes.indexOf(value); 
                     fn(classes, index, value); 
                     self.className = classes.join(" "); 
                 } 
             } 
             return { 
                 add: update(function(classes, index, value) { 
                     if (!~index) classes.push(value); 
                 }), 
                 remove: update(function(classes, index) { 
                     if (~index) classes.splice(index, 1); 
                 }), 
                 toggle: update(function(classes, index, value) { 
                     if (~index) 
                         classes.splice(index, 1); 
                     else 
                         classes.push(value); 
                 }), 
                 contains: function(value) { 
                     return !!~self.className.split(/\s+/g).indexOf(value); 
                 }, 
                 item: function(i) { 
                     return self.className.split(/\s+/g)[i] || null; 
                 } 
             }; 
         } 
     }); 
 } 
 
 
 //原生方法  不支持svg  svg 和其他的dom 不一样 
 //import { addClass, removeClass } from 'element-ui/src/utils/dom';  这个地方就是element源码操作class 
 
 function hasClass( elements,cName ){ 
 // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断 
  return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") );  
 }; 
 function addClass( elements,cName ){ 
     if( !hasClass( elements,cName ) ){ 
         elements.className += " " + cName; 
     }; 
 } 
 function removeClass( elements,cName ){ 
     if( hasClass( elements,cName ) ){ 
         elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" )," " ); // replace方法是替换 
     }; 
 }; 
 
 //或者  
 npm install classlist-polyfill --save 
 npm install  babel-polyfill  --save 
 在webpack.base.conf.js中 加入classlist-polyfill 
 修改 module.exports    entry 如下： 
 module.exports = { 
     // app: './src/main.js' 
     entry: { app: ['classlist-polyfill', 'babel-polyfill', './src/main.js']} 
 }
```


# **节点属性**

```纯文本 
 节点属性 nodeType 返回值为数值 
                 * 节点类型(nodeType)    节点名字(nodeName)    节点值(nodeValue) 
        元素节点         1                  标签名                 null 
        文本节点         3                  #text                 文本 
        注释节点         8                 #comment             注释的文字 
        文档节点         9                 #document              null 
        属性节点         2                  属性名                属性值
```


# 重排重绘

&#x20;  \*\* 重排\*\*：当我们对 DOM 的修改引发了 DOM 几何尺寸的变化（**比如修改元素的宽、高或隐藏元素等**）时，浏览器需要重新计算元素的几何属性（其他元素的几何属性和位置也会因此受到影响），然后再将计算的结果绘制出来。这个过程就是回流（也叫重排）。
&#x20;   \*\*重绘：****当我们对 DOM 的修改导致了样式的变化****、却并未影响其几何属性（比如修改了颜色或背景色）\*\***时**，浏览器不需重新计算元素的几何属性、直接为该元素绘制新的样式（跳过了上图所示的回流环节）。这个过程叫做重绘。由此我们可以看出，重绘不一定导致回流，回流一定会导致重绘。

**重排操作:**
&#x20;   \* 常见的几何属性有 width、height、padding、margin、left、top、border 等等。
&#x20;   \* 最容易被忽略的操作：获取一些需要**通过即时计算得到的属**性,当你要用到像这样的属性：offsetTop、offsetLeft、 offsetWidth、offsetHeight、scrollTop、scrollLeft、scrollWidth、scrollHeight、clientTop、clientLeft、clientWidth、clientHeight 时，浏览器为了获取这些值，也会进行回流。**原理是一样的，都为求一个“即时性”和“准确性”。**

**避免方式：**
1\. **避免逐条改变样式，使用类名去合并样式**
2\. **将 DOM “离线”,使用DocumentFragment**
3\. 提升为合成层,如使用will-change

```css 
 #divId {
        will-change: transform;
    }
```


优点
&#x20;   \* 合成层的位图，会交由 GPU 合成，比 CPU 处理要快
&#x20;   \* 当需要 repaint 时，只需要 repaint 本身，不会影响到其他的层
&#x20;   \* 对于 transform 和 opacity 效果，不会触发 layout 和 paint

注意：

- 部分浏览器缓存了一个 flush 队列，把我们触发的回流与重绘任务都塞进去，待到队列里的任务多起来、或者达到了一定的时间间隔，或者“不得已”的时候，再将这些任务一口气出队。但是当我们访问一些即使属性时，浏览器会为了获得此时此刻的、最准确的属性值，而提前将 flush 队列的任务出队。
