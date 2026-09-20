# js监听动画

## 目录

- [transitionEnd](#transitionEnd)
- [事件多次触发问题](#事件多次触发问题)
- [事件失效问题](#事件失效问题)
  - [在transiton动画完成前设置display:none，事件不会触发。](#在transiton动画完成前设置displaynone事件不会触发)
  - [当transition完成前移除transition一些属性时，事件也不会触发，例如：](#当transition完成前移除transition一些属性时事件也不会触发例如)
  - [元素从display:none到block，不会有过渡，导致无法触发transitionend事件](#元素从displaynone到block不会有过渡导致无法触发transitionend事件)

## **transitionEnd**

```css 
 element.addEventListener('transitionend', handle, false) 
function handle(){ 
  alert('transitionend事件触发') 
}
```


## **事件多次触发问题**

**当存在多个属性过渡变化时****，结束时会多次触发transitionend事件****。看个例子：** ​

**当过渡结束时，width和background-color都发生变化，会触发两次transionend事件**

```vue 
 <!DOCTYPE html>
<html>
<head>
    <title>transtionend demo</title>
    <style type="text/css">
        *{margin:0;padding: 0;}
        .demo{
            width:100px;
            height: 100px;
            background-color: #ddc;
            transition: all 0.5s ease-out;
        }
        .w200{
            width: 200px;
            background-color: #fef;
        }
    </style>
</head>
<body>
    <div id="demo" class="demo" onmouseover="change()" onmouseout="change()">
    </div>
    <script type="text/javascript">
        var element = document.getElementById('demo')
        element.addEventListener('transitionend', handle, false)
        function handle(){
            alert('transitionend事件触发')
        }
        function change() {
            element.className = element.className === 'demo' ? 'demo w200': 'demo'
        }
    </script>
</body>
</html>
```


# **事件失效问题**

### **在transiton动画完成前设置display:none，事件不会触发****。** ​

```vue 
 <!DOCTYPE html>
<html>
<head>
    <title>transtionend demo</title>
    <style type="text/css">
        *{margin:0;padding: 0;}
        .demo{
            width:100px;
            height: 100px;
            background-color: #ddc;
            transition: all 0.5s ease-out;
        }
        .w200{
            width: 200px;
        }
    </style>
</head>
<body>
    <div id="demo" class="demo" onmouseover="change()" onmouseout="change()">
    </div>
    <script type="text/javascript">
        var element = document.getElementById('demo')
        element.addEventListener('transitionend', handle, false)
        function handle(){
            alert('transitionend事件触发')
        }
        function change() {
            element.className = element.className === 'demo' ? 'demo w200': 'demo'
            // 500ms后设置display:none
            setTimeout(function (){
                element.style.display = 'none'
            },400)
        }
    </script>
</body>
</html>


```


### **当transition完成前移除transition一些属性时，事件也不会触发，例如：**

```vue 
 <!DOCTYPE html>
<html>
<head>
    <title>transtionend demo</title>
    <style type="text/css">
        *{margin:0;padding: 0;}
        .demo{
            width:100px;
            height: 100px;
            background-color: #ddc;
            transition: all 0.5s ease-out;
        }
        .noTranstion{
            width:100px;
            height: 100px;
            background-color: #ddc;
        }
        .w200{
            width: 200px;
        }
    </style>
</head>
<body>
    <div id="demo" class="demo" onmouseover="change()" onmouseout="change()">
    </div>
    <script type="text/javascript">
        var element = document.getElementById('demo')
        element.addEventListener('transitionend', handle, false)
        function handle(){
            alert('transitionend事件触发')
        }
        function change() {
            element.className = element.className === 'demo' ? 'demo w200': 'demo'
            setTimeout(function(){
                element.className = 'noTranstion'
            },400)
        }
    </script>
</body>
</html>


```


### **元素从display:none到block，不会有过渡，导致无法触发transitionend事件**

**例如：元素从display:none 到block opacity从0到1，无法触发过渡效果。**

```vue 
 <!DOCTYPE html>
<html>
<head>
    <title>transtionend demo</title>
    <style type="text/css">
        *{margin:0;padding: 0;}
        body{padding: 50px;}
        .demo{
            width:100px;
            height: 100px;
            background-color: #ddc;
            transition: all 0.5s ease-out;
            opacity:0;
            display: none;
        }
        .noTranstion{
            width:100px;
            height: 100px;
            background-color: #ddc;
        }
        .opt{
            display: block;
            opacity:1
        }


        .w200{
            width: 200px;
        }
        button{position: absolute;top: 200px;width: 100px;height: 40px;}
    </style>
</head>
<body>
    <div id="demo" class="demo" onmouseover="change()" onmouseout="change()">
    </div>
    <button onclick="change()">Click</button>
    <script type="text/javascript">
        var element = document.getElementById('demo')
        element.addEventListener('transitionend', handle, false)
        function handle(){
            alert('transitionend事件触发')
        }
        function change() {
            element.className = element.className === 'demo' ? 'demo opt': 'demo'
        }
    </script>
</body>
</html>
```


**无法触发过渡效果原因：**

**元素从none到block，刚生成未能即时渲染，导致过渡失效。所以需要主动触发页面重绘，刷新DOM。页面重绘可以通过改变一些CSS属性来触发，例如：offsetTop、offsetLeft、offsetWidth、scrollTop等。**
