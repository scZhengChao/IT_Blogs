# 拖放  draggable

## 目录

- [一：深入理解原生js拖放（draggable）](#一深入理解原生js拖放draggable)
- [1.提炼知识点：](#1提炼知识点)
  - [拖拽元素事件：事件对象为被拖拽元素](#拖拽元素事件事件对象为被拖拽元素)
  - [ 目标元素事件：事件对象为目标元素](#目标元素事件事件对象为目标元素)
  - [ 事件的执行顺序：drop不触发的时候](#事件的执行顺序drop不触发的时候)
  - [事件执行顺序：drop触发的时候](#事件执行顺序drop触发的时候)
- [2.兼容](#2兼容)
- [3.拖放事件](#3拖放事件)
  - [dragstart](#dragstart)
  - [drag](#drag)
  - [dragend](#dragend)
- [4拖放目标](#4拖放目标)
  - [dragenter](#dragenter)
  - [dragover](#dragover)
  - [dragleave](#dragleave)
  - [drop](#drop)
- [5.dataTransfer对象](#5dataTransfer对象)
- [6.改变光标](#6改变光标)
  - [dropEffect](#dropEffect)
    - [effectAllowed](#effectAllowed)
- [子页面](#子页面)

# 一：深入理解原生js拖放（draggable）

# **1.提炼知识点：**

**draggable**

```html title="draggable：设置为true，元素就可以拖拽了"
 
 < img src="http://photos.tuchong.com/38538/f/6864556.jpg" id="img1" draggable="true">
```


#### 拖拽元素事件：事件对象为被拖拽元素

- dragstart,拖拽前触发
- drag,拖拽前、拖拽结束之间，连续触发
- dragend,拖拽结束触发

####  目标元素事件：事件对象为目标元素

- dragenter,进入目标元素触发，相当于mouseover
- dragover,进入目标、离开目标之间，连续触发
- dragleave,离开目标元素触发，，相当于mouseout
- drop,在目标元素上释放鼠标触发

####  **事件的执行顺序：drop不触发的时候**

> **dragstart > drag > dragenter > dragover > dragleave>dragend**

#### **事件执行顺序：drop触发的时候**

> \*\* dragstart>drag>dragenter>dragover>drop>dragend\*\*​

```纯文本 
 不能释放的光标和能释放的光标不一样 
 解决火狐下的问题——必须设置dataTransfer对象才可以拖拽除图片外的其他标签 
 dataTransfer对象： 
     ——setDate():设置数据key和value（必须是字符串） 
     ——getDate():获取数据，根据key值，获取对应的value 
     ——effectAllowed:设置光标样式（none,copy,copyLink,copyMove,link,linkMove,move,all,uninitialized） 
     ——setDragimage(三个参数：指定的元素，坐标X，坐标Y) 
     ——files:获取外部拖拽的文件，返回一个filesList列表，fileList下有个type属性，返回文件的类型//这些博主的文章中并没有提及，我会在后续的文章中提到。） 
 FileReader(读取文件信息) 
     ——readAsDataURL(参数为要读取的文件对象，将文件读取为DataUrl) 
     ——onload(当读取文件成功完成的时候触发此事件，this.result：来获取读取的文件数据，如果是图片，将返回base64格式的图片数据)
```


# 2.兼容

> **注意：**

- 如果让firefox支持draggable属性，必须添加一个ondragstart事件处理程序，并在dataTransfer对象使用setData()方法来启动效果
- IE9-浏览器不支持draggable属性，但可通过mousedown事件处理程序调用dragDrop()方法来实现拖动效果

```html 
 <div id="test" style="height:30px;width:300px;background:pink;"></div> 
 <script> 
 test.onmousedown = function(){ 
     this.dragDrop(); 
 } 
 </script>
```


# **3.拖放事件**

　　拖放源涉及到3个拖放事件。拖动拖放源时，依次触发dragstart、drag和dragend这3个事件

##### dragstart

- 按下鼠标键并开始移动鼠标时，会在被拖放的元素上触发dragstart事件。此时光标变成“不能放”符号(圆环中有一条反斜线)，表示不能把元素放到自己上面

##### drag

- 触发dragstart事件后，随即会触发drag事件，而且在元素被拖动期间会持续触发该事件

##### dragend

- 当拖动停止时(无论是把元素放到了有效的放置目标，还是放到了无效的放置目标上)，会触发dragend事件

```html 
 <div id="test" draggable="true" style="height:30px;width:100px;background:pink;">0</div> 
 <script> 
 var timer,i=0; 
 test.ondragstart = function(){ 
     this.style.backgroundColor = 'lightgreen'; 
 } 
 test.ondrag = function(){ 
     if(timer) return; 
         timer = setInterval(function(){ 
             test.innerHTML = i++; 
         },100) 
     } 
 test.ondragend = function(){ 
     clearInterval(timer); 
     timer = 0; 
     this.style.backgroundColor = 'pink'; 
 } 
 </script>
```


# **4拖放目标**

**拖放目标是指被拖动的元素松开鼠标时被放置的目标**

**拖放源被拖动到拖放目标上时，将依次触发dragenter、dragover和dragleave或drop这四个事件**

##### dragenter

- 只要有元素被拖动到放置目标上，触发dragenter事件

##### dragover

- 被拖动的元素在放置目标的范围内移动时，持续触发dragover事件

##### dragleave

- 如果元素被拖出了放置目标，触发dragleave事件

##### drop

- 如果元素被放到了放置目标中，触发drop事件

> 注意:
> firefox浏览器的drop事件的默认行为是打开被放到放置目标上的URL。为了让firefox支持正常的拖放，还要取消drop事件的默认行为
>
> 默认情况下，目标元素是不允许被放置的，所以不会发生drop事件。只要在dragover和dragenter事件中阻止默认行为，才能成为被允许的放置目标，才能允许发生drop事件。此时，光标变成了允许放置的符号

```html 
<div id="test" draggable="true" style="height:30px;width:130px;background:pink;float:left;">拖放源</div>
<div id="target" style="float:right;height: 200px;width:200px;background:lightblue;">拖放目标</div>

<script>
var timer,i=0;
var timer1,i1=0;
//兼容IE8-浏览器
test.onmousedown = function(){
    if(this.dragDrop){
        this.dragDrop();
    }
}
test.ondragstart = function(){
    this.style.backgroundColor = 'lightgreen';
    this.innerHTML = '开始拖动';
}
test.ondrag = function(){
    if(timer) return;
    timer = setInterval(function(){
        test.innerHTML = '元素已被拖动' + ++i + '秒';
    },1000);
}
test.ondragend = function(){
    clearInterval(timer);
    timer = 0;i =0;
    this.innerHTML = '结束拖动';
    this.style.backgroundColor = 'pink';
}
target.ondragenter = function(e){
    e = e || event;
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
    this.innerHTML = '有元素进入目标区域';
    this.style.background = 'red';
}
target.ondragover = function(e){
    e = e || event;
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
    if(timer1) return;
    timer1 = setInterval(function(){
        target.innerHTML = '元素已进入' + (++i1) + '秒';
    },1000);
}
target.ondragleave = function(){
    clearInterval(timer1);
    timer1 = 0;i1=0;
    this.innerHTML = '元素已离开目标区域';
    this.style.backgroundColor = 'lightblue';
}
target.ondrop = function(){
    clearInterval(timer1);
    timer1 = 0;i1=0;
    this.innerHTML = '元素已落在目标区域';
    this.style.backgroundColor = 'orange';
}
</script>
```


# **5.dataTransfer对象**

为了在拖放操作时实现数据交换，引入了`dataTransfer`对象，**它是事件对象的一个属性**，用于从**被拖动元素向放置目标传递字符串格式的数**

- dataTransfer对象有两个主要方法：`getData`()和`setData`()
  - getData()可以取得由setData()保存的值。
  - setData()方法的第一个参数，也是getData()方法唯一的一个参数，是一个字符串，表示保存的数据类型，取值为"text"或"URL"

&#x20;     &#x20;

> IE**只定义了"text"和"URL"两种有效的数据类型，**而HTML5则对此加以扩展**,允许指定各种MIME类型。考虑到向后兼容**，HTML5也支持"text"和"URL"，但这两种类型会被映射为"text/plain"和"text/uri-list"

　　

> 实际上，`dataTransfer`对象可以为每种MIME类型都保存一个值。换句话说，同时在这个对象中保存一段文本和一个URL不会有任何问题

\*\*　\*\*​

> **\[注意]** 保存在dataTransfer对象中的数据只能在drop事件处理程序中读取

**在拖动文本框中的文本时，****浏览器会调用setData()方法****，将拖动的**文本以"text"格式保存在dataTransfer对象**中。类似地，****在拖放链接或图像时，会调用setData()方法并保存URL****。然后，在这些元素被拖放到放置目标时，就可以通过getData()读到这些数据**

```html 
< div>请将从这行文字中挑选一些移动到拖放目标中</div>
<div id="target" style="margin-top:20px;height: 100px;width:200px;background:lightblue;">拖放目标</div>
<div id="result"></div>
<script>
target.ondragenter = function(e){
    e = e || event;
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
    this.innerHTML = '有元素进入目标区域';
    this.style.background = 'red';
}
target.ondragover = function(e){
    e = e || event;
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
}
target.ondragleave = function(e){
    e = e || event;
    this.innerHTML = '元素已离开目标区域';
    this.style.backgroundColor = 'lightblue';
}
target.ondrop = function(e){
    e = e || event;
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
    result.innerHTML = '落入目标区域的文字为:' + e.dataTransfer.getData('text');
    this.innerHTML = '元素已落在目标区域';
    this.style.backgroundColor = 'orange';
}
</script>
```


\*\*当然，也可以在dragstart****事件处理程序中调用setData()，手动保存自己要传输的数据****，以便将来使用 \*\*

```html 
 <div id="test" draggable="true" data-value="这是一个秘密" style="height:30px;width:100px;background:pink;">拖动源</div> 
 <div id="target" style="margin-top:20px;height: 100px;width:200px;background:lightblue;">拖放目标</div> 
 <div id="result"></div> 
 <script> 
 //兼容IE8-浏览器 
 test.onmousedown = function(){ 
     if(this.dragDrop){ 
         this.dragDrop(); 
     } 
 } 
 test.ondragstart = function(e){ 
     e = e || event; 
     e.dataTransfer.setData('text',test.getAttribute('data-value')); 
 } 
 target.ondragenter = function(e){ 
     e = e || event; 
     if(e.preventDefault){ 
         e.preventDefault(); 
     }else{ 
         e.returnValue = false; 
     } 
     this.innerHTML = '有元素进入目标区域'; 
     this.style.background = 'red'; 
 } 
 target.ondragover = function(e){ 
     e = e || event; 
     if(e.preventDefault){ 
         e.preventDefault(); 
     }else{ 
         e.returnValue = false; 
     } 
 } 
 target.ondragleave = function(e){ 
     e = e || event; 
     this.innerHTML = '元素已离开目标区域'; 
     this.style.backgroundColor = 'lightblue'; 
 } 
 target.ondrop = function(e){ 
     e = e || event; 
     if(e.preventDefault){ 
         e.preventDefault(); 
     }else{ 
         e.returnValue = false; 
     } 
     result.innerHTML = '落入目标区域的文字为:' + e.dataTransfer.getData('text'); 
     this.innerHTML = '元素已落在目标区域'; 
     this.style.backgroundColor = 'orange'; 
 } 
 </script>
```


# 6.改变光标

**利用dataTransfer对象，不仅可以传输数据，还能通过它来****确定被拖动的元素以及作为放罝目标的元素能够接收什么操作****。为此，需要访问dataTransfer对象的两个属性：`dropEffect`****和****`effectAllowed`**

**实际上，这两个属性并没有什么用，只是拖动源在拖动目标上移动时，改变不同的光标而已(但是，有一种情况除外)**

#### dropEffect

- **dropEffect属性可以知道被拖动的元素能够执行哪种放置行为。这个属性有下列4个可能的值**
  - &#x20;"none":不能把拖动的元素放在这里。这是除文本框之外所有元素的默认值(此时，将无法触发drop事件)
  - "move":应该把拖动的元素移动到放置目标
  - "copy":应该把拖动的元素复制到放置目标
  - "link":表示放置目标会打开拖动的元素（但拖动的元素必须是一个链接，有URL)

> 在把元素拖动到放置目标上时，以上每一个值都会导致光标显示为不同的符号
> \*\*\[注意]\*\***必须在ondragover事件处理程序中针对放置目标来设置dropEffect属性**

##### effectAllowed

- **dropEffect属性只有搭配effectAllowed属性才有用。effectAllowed属性表示允许拖动元素的哪种dropEffect**
- effectAllowed属性可能的值如下
  - "uninitialized":没有给被拖动的元素设置任何放置行为
  - "none":被拖动的元素不能有任何行为
  - "copy":只允许值为"copy"的dropEffect
  - "link"只允许值为"link"的dropEffect
  - "move":只允许值为"move"的dropEffect
  - "copyLink":允许值为"copy"和"link"的dropEffect
  - "copyMove":允许值为"copy"和"move"的dropEffect
  - "linkMove":允许值为"link"和"move"的dropEffect
  - "all":允许任意dropEffect　

> **\[注意]必须在ondragstart事件处理程序中设置effectAllowed属性**

```html 
 <div id="test" draggable="true" style="height:30px;width:100px;background:pink;display:inline-block;">拖放源</div> 
 <div id="target1" style="margin-top:20px;height: 100px;width:150px;background:lightblue;display:inline-block;">(none)拖放目标</div> 
 <div id="target2" style="margin-top:20px;height: 100px;width:150px;background:lightblue;display:inline-block;">(move)拖放目标</div> 
 <div id="target3" style="margin-top:20px;height: 100px;width:150px;background:lightblue;display:inline-block;">(copy)拖放目标</div> 
 <div id="target4" style="margin-top:20px;height: 100px;width:150px;background:lightblue;display:inline-block;">(link)拖放目标</div> 
 <div id="result"></div> 
 <script> 
 //兼容IE8-浏览器 
 test.onmousedown =function(){ 
     if(this.dragDrop){ 
         this.dragDrop(); 
     } 
 } 
 test.ondragstart = function(e){ 
     e = e || event; 
     //兼容firefox浏览器 
     e.dataTransfer.setData('text',''); 
     e.dataTransfer.effectAllowed = 'all'; 
 } 
 target1.ondragenter = target2.ondragenter =target3.ondragenter =target4.ondragenter =function(e){ 
     e = e || event; 
     if(e.preventDefault){ 
         e.preventDefault(); 
     }else{ 
         e.returnValue = false; 
     }this.style.background = 'red'; 
 } 
 target1.ondragover = function(e){ 
     e = e || event; 
     if(e.preventDefault){ 
         e.preventDefault(); 
     }else{ 
         e.returnValue = false; 
     } 
     e.dataTransfer.dropEffect = 'none'; 
 } 
 target2.ondragover = function(e){ 
     e = e || event; 
     if(e.preventDefault){ 
         e.preventDefault(); 
     }else{ 
         e.returnValue = false; 
     } 
     e.dataTransfer.dropEffect = 'move'; 
 } 
 target3.ondragover = function(e){ 
     e = e || event; 
     if(e.preventDefault){ 
         e.preventDefault(); 
     }else{ 
         e.returnValue = false; 
     } 
     e.dataTransfer.dropEffect = 'copy'; 
 } 
 target4.ondragover = function(e){ 
     e = e || event; 
     if(e.preventDefault){ 
         e.preventDefault(); 
     }else{ 
         e.returnValue = false; 
     } 
     e.dataTransfer.dropEffect = 'link'; 
 } 
 target1.ondragleave = target2.ondragleave =target3.ondragleave =target4.ondragleave =function(e){ 
     e = e || event; this.style.backgroundColor = 'lightblue'; 
 } 
 target1.ondrop = target2.ondrop =target3.ondrop =target4.ondrop =function(e){ 
     e = e || event; 
     if(e.preventDefault){ 
         e.preventDefault(); 
     }else{ 
         e.returnValue = false; 
     } 
     this.style.backgroundColor = 'orange'; 
 } 
 </script>
```


[drag.html](./assets/file/drag_a76c6wDKQL.html "drag.html")

**拖拽改变顺序：**

[drag.html](./assets/file/drag_qIh-03jeEK.html "drag.html")

# 子页面

[api](./api/index.md "api")
