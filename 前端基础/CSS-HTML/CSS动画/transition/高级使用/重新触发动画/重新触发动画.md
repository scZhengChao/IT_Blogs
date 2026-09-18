# 重新触发动画

## 目录

- [通过定时器延迟渲染](#通过定时器延迟渲染)
- [强制获取当前内联样式](#强制获取当前内联样式)
- [触发重绘刷新DOM](#触发重绘刷新DOM)

## **通过定时器延迟渲染**

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
            opacity: 0;
            display: none;
        }
        .opt{
            display: block;
        }
        button{position: absolute;top: 200px;width: 100px;height: 40px;}
    </style>
</head>
<body>
    <div id="demo" class="demo">
    </div>
    <button id="button" onclick="change()">点击</button>
    <script type="text/javascript">
        var element = document.getElementById('demo')
        var button = document.getElementById('button')
        element.addEventListener('transitionend', handle, false)
        function handle(){
            alert('transitionend事件触发')
        }
        function change() {
          
            element.className = element.className === 'demo' ? 'demo opt': 'demo'
            console.log(element.className)
            if(element.className === 'demo'){
                    element.style.opacity = null
                    button.innerHTML = '点击'
            }else{
                setTimeout(function(){
                    element.style.opacity = '1'
                    button.innerHTML = '重置'
                },10)
            }
        }
    </script>
</body>
</html>


```


## **强制获取当前内联样式**

通过window\.getComputedStyle()方法返回应用样式后的元的所有CSS属性的值，并解析这些值可能包含的任何基本计算。

**也就是说返回的属性值是已计算后的值，即DOM元素的样式已经更新了。**

然后再改变对应属性值触发过渡效果。例如：

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
            opacity: 0;
            display: none;
        }
        .opt{
            display: block;
        }
        button{position: absolute;top: 200px;width: 100px;height: 40px;}
    </style>
</head>
<body>
    <div id="demo" class="demo">
    </div>
    <button id="button" onclick="change()">点击</button>
    <script type="text/javascript">
        var element = document.getElementById('demo')
        var button = document.getElementById('button')
        element.addEventListener('transitionend', handle, false)
        function handle(){
            alert('transitionend事件触发')
        }
        function change() {
            element.className = element.className === 'demo' ? 'demo opt': 'demo'
            if(element.className === 'demo'){
                        element.style.opacity = null
                    button.innerHTML = '点击'
            }else{
                // setTimeout(function(){
                //     element.style.opacity = '1'
                //     button.innerHTML = '重置'
                // },10)
                window.getComputedStyle(element, null).opacity
                element.style.opacity = '1'
                button.innerHTML = '重置'
            }
        }
    </script>
</body>
</html>
```


## **触发重绘刷新DOM**

**通过clientWidth触发重绘，例如：**

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
            opacity: 0;
            display: none;
        }
        .opt{
            display: block;
        }
        button{position: absolute;top: 200px;width: 100px;height: 40px;}
    </style>
</head>
<body>
    <div id="demo" class="demo">
    </div>
    <button id="button" onclick="change()">点击</button>
    <script type="text/javascript">
        var element = document.getElementById('demo')
        var button = document.getElementById('button')
        element.addEventListener('transitionend', handle, false)
        function handle(){
            alert('transitionend事件触发')
        }
        function change() {
            element.className = element.className === 'demo' ? 'demo opt': 'demo'
            if(element.className === 'demo'){
                        element.style.opacity = null
                    button.innerHTML = '点击'
            }else{
                // setTimeout(function(){
                //     element.style.opacity = '1'
                //     button.innerHTML = '重置'
                // },10)
                // window.getComputedStyle(element, null).opacity
                element.clientWidth;（这里就可以看出操作dom是不好太好的；会引起重绘）
                element.style.opacity = '1'
                button.innerHTML = '重置'
            }
        }
    </script>
</body>
</html>


```
