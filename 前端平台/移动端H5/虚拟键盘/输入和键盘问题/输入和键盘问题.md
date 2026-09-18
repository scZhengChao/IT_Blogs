# 输入和键盘问题

## 目录

- [监听](#监听)
  - [android](#android)
  - [ios](#ios)
- [scrollIntoView()](#scrollIntoView)
  - [针对某个元素单独处理](#针对某个元素单独处理)
  - [全局处理](#全局处理)
- [获取软键盘高度](#获取软键盘高度)
  - [IOS 键盘弹起挡住原来的视图  ](#IOS-键盘弹起挡住原来的视图--)
  - [7.  IOS 键盘收起时页面没用回落，底部会留白，通过监听键盘回落时间滚动到原来的位置](#7-IOS-键盘收起时页面没用回落底部会留白通过监听键盘回落时间滚动到原来的位置)

# 监听

scrollIntoView 介绍
移动端的H5页面，当输入框元素获取焦点时，**会吊起软键盘，如果输入框被软键盘遮挡了，则页面会发生滚动使输入框显示在可视区。**浏览器这种默认处理机制在元**素设置了绝对定位或设置了html,body{height:100%;}时可能会失效**，通常需要手动处理。

防软键盘遮挡的处理思路：

- IOS系统中，软键盘吊起时，整个 window 往上滚，window的宽高不变，不会触发window\.onresize 事件。并且，软键盘始终不会遮挡输入框，所以在ios中不处理。有些版中的微信页面存在页面不回滚的bug，这个需要处理。
- 安卓系统中，软键盘吊起时，window 不滚动，window的高度减小，减少值等于软键盘的高度，会触发 window\.onresize 事件。如果输入框被遮挡，可使用 scrollIntoView 方法强制在可视区显示获取焦点的输入框元素。

## android

- 在android中软键盘弹起或收起时，会改变window的高度，因此**监听window的onresize事件**；

```javascript 
//获取原窗口的高度
var originalHeight=document.documentElement.clientHeight ||document.body.clientHeight;
window.οnresize=function(){   
  //键盘弹起与隐藏都会引起窗口的高度发生变化   
  var resizeHeight=document.documentElement.clientHeight || document.body.clientHeight;   
  if(resizeHeight-0<originalHeight-0){     
    //当软键盘弹起，在此处操作  
  }else{     
    //当软键盘收起，在此处操作   
  }
}
```


## ios

&#x20;        window\.onresize事件来做突破点的，但是**ios 中软键盘的弹起收起并不触发 window\.onresize**事件android才会触发**onresize事件**在 ios 中软键盘弹起时，**仅会引起 \$(‘body’).scrollTop 值**改变，但是我们可以通过输入框的获取焦点情况来做判断，但也**只能在 ios 中采用这个方案**，因为在 **android 中存在主动收起键盘后，但输入框并没有失焦**，而ios中键盘收起后就会失焦；

\*\* ios 中 focusin和focusout支持冒泡，对应focus和blur,**使用focusin和focusout的原因是focusin和focusout可以冒泡，**focus和blur不会冒泡**，这样就可**以使用事件代理，处理多个输入框存在的情况。\*\*

# scrollIntoView()

Element.scrollIntoView()\*\* 方法让当前的元素滚动到浏览器窗口的可视区域内。\*\*

接受对象或者布尔值  &#x20;

```typescript 
element.scrollIntoView(data);   // Boolean or object
```


- 如果是布尔值：
  - 如果为true，元素的顶端将和其所在滚动区的可视区**域的顶端对齐**。
  - 如果为false，元素的底端将和其所在滚动区的**可视区域的底端对齐**。
- 如果是对象：
  - behavior: "auto" | "instant" | "smooth",
  - block: "start" | "end",

&#x20;      behavior这个选项**决定页面是如何滚动的**，实测auto与instant都是瞬间跳到相应的位置，而smooth就是有动画的过程

&#x20;      block相当于参入布尔值；true 相当于{block: "start"}，false 相当于{block: "end"}

```javascript 
 var element = document.getElementById("box");
element.scrollIntoView();
element.scrollIntoView(false);
element.scrollIntoView({block: "end"});
element.scrollIntoView({block: "end", behavior: "smooth"});
document.body.scrollIntoView(false)
```


注意body的高度不能和html一致；换句话说；**element的父元素必须可以滚动**

取决于其它元素的布局情况，此元素可能不会完全滚动到顶端或底端。

## 针对某个元素单独处理

```typescript 
var inp = document.getElementById('inp');
//安卓中获取焦点时防遮挡
inp.onfocus = function(){
  if(this.scrollIntoViewIfNeeded){
    //懒滚动，当在可见区时不发生滚动，元素不再可见区时滚动到可见区中部
    this.scrollIntoViewIfNeeded(true);  
  }else{
    //无论怎样都会滚动到与可见区底部对齐
    this.scrollIntoView(false);           
  }  
}
//ios 中失去焦点时回滚
inp.onblur = function(){
   window.scrollTo(0, 0)
}

```


## 全局处理

```typescript 
//安卓中获取焦点时防遮挡
window.onresize = function () {
  if (document.activeElement.scrollIntoViewIfNeeded) { // 兼容性不阿红
    //懒滚动，当在可见区时不发生滚动，元素不再可见区时滚动到可见区中部
    document.activeElement.scrollIntoViewIfNeeded(true); 
  } else {
    //无论怎样都会滚动到与可见区底部对齐
    document.activeElement.scrollIntoView(false);
  }
}
//ios 中失去焦点时回滚
document.onkeyup = function(e){
   var name = e.target.tagName
   if (name != 'INPUT' && name != 'SELECT' && name != 'TEXTAREA') {
       window.scrollTo(0, 0)
   }
}

```


# 获取软键盘高度

&#x20;srcollTo（获得焦点的同时；异步获取innerHeight然后做个差值比较得出软键盘高度）

```javascript 
 var timer = {
  id:null,
  run:function (callback,time) {
    this.id = window.setInterval(callback,time);
  },
  clean:function () {
    var that = this;
    this.id = window.clearInterval(that.id);
  }
};
var keyboardHeight = 0,
    screenHeight = window.innerHeight;
input.addEventListener('focus',function (evt) {
  if(!keyboardHeight){
    timer.run(function () {
            if (screenHeight !== window.innerHeight) {
                keyboardHeight = screenHeight-window.innerHeight;
                timer.clean()
            }
    }, 50)
  }
});
input.focus();
window.scrollTo(0, screenHeight);
```


由于上面两种简单处理方式可能存在有些手机不触发等细节问题。推荐用下面这种方式。

```typescript 
<input type="text" onfocus="SV.focus(this)" name="">  
<script>
let SV = {
  _el:null,
  _isFocusNow:false,
  _ua:window.navigator.userAgent,
  _init:false,
  _scroll:function(){
    var el = this._el;
    if(!el) return false;
    if(el.scrollIntoViewIfNeeded){
      el.scrollIntoViewIfNeeded(true);    
    }else{
      el.scrollIntoView(false);           
    }      
  },
  _toTop:function(el){
    var _t = this;
    _t._isFocusNow = false;
  setTimeout(function(){
    if(!_t._isFocusNow){
      window.scrollTo(0, 0)
    } 
  },100) 
  },
  // 添加事件句柄
  on(elem, type, listener) {
    if (elem.addEventListener) {
      elem.addEventListener(type, listener, false)
    } else if (elem.attachEvent) {
      elem.attachEvent('on' + type, listener)
    } else {
      elem['on' + type] = listener
    }
  },
  // 移除事件句柄
  off(elem, type, listener) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, listener)
    } else if (elem.detachEvent) {
      elem.detachEvent('on' + type, listener)
    } else {
      elem['on' + type] = null
    }
  },
  init(){
    var _t = this;
    this._init = true;
  this.on(window,'resize',function(){
    setTimeout(()=>{ _t._scroll(); },0)
  })
  },
  focus(el){  
    !this_init && this.init();
    //ios中失去焦点时回滚
    if(!!this.ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
      this._el && this.off(this._el,'blur',this._toTop);
      this.on(el,'blur',this._toTop)         
    }
    this._isFocusNow = true; 
    this._el = el;
  }
}
</script>

```


### IOS 键盘弹起挡住原来的视图 &#x20;

解决方式：

&#x20;    可以通过监听移动端软键盘弹起 `Element`.`scrollIntoViewIfNeeded`（Boolean）方法用来将**不在浏览器窗口的可见区域内的元素滚动到浏览器窗口的可见区域**。 如果该元素已经在浏览器窗口的可见区域内，则不会发生滚动。  \* \*

- true，则元素将在其所在滚动区的可视区域中居中对齐。 &#x20;
- false，则元素将与其所在滚动区的可视区域最近的边缘对齐。&#x20;

根据可见区域最靠近元素的哪个边缘，元素的顶部将与可见区域的顶部边缘对准，或者元素的底部边缘将与可见区域的底部边缘对齐。

```javascript 
window.addEventListener('resize', function() {  
  if (  
    document.activeElement.tagName === 'INPUT' ||  
    document.activeElement.tagName === 'TEXTAREA'  
  ) {  
    window.setTimeout(function() {  
      if ('scrollIntoView' in document.activeElement) {  
        document.activeElement.scrollIntoView(false)  
      } else {  
        document.activeElement.scrollIntoViewIfNeeded(false)  
      }  
    }, 0)  
  }  
})
```


### 7.  IOS 键盘收起时页面没用回落，底部会留白，通过监听键盘回落时间滚动到原来的位置

```javascript 
window.addEventListener('focusout', function() {  
  window.scrollTo(0, 0)  
})。
```
