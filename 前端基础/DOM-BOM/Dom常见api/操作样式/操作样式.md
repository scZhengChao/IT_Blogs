# 操作样式

```javascript 
var style = document.querySelector('style')
style.innerHTML = str

target.style.animation ='mar 10s linear infinite';
target.style.animationPlayState=''running' / 'paused'

var a= document.getElementById("a");
a.style.display="block";
box.style.cssText="border:5px solid black; width:400px; height:200px;" //修改所有的
```


**1. 直接设置style的属性  某些情况用这个设置 !important值无效**
如果属性有'-‘号，就写成驼峰的形式（如textAlign）  如果想保留 - 号，就中括号的形式  element.style\[‘text-align'] = ‘100px';

```javascript 
element.style.height = '100px';
```


**2. 直接设置属性（只能用于某些属性，相关样式会自动识别）**

```javascript 
element.setAttribute('height', 100);
element.setAttribute('height', '100px');

```


**3. 设置style的属性**

```javascript 
element.setAttribute('style', 'height: 100px !important');
!important的css定义是拥有最高的优先级。

```


**4. 使用setProperty  如果要设置!important，推荐用这种方法设置第三个参数**

```css 
element.style.setProperty('height', '300px', 'important');
```


**5. 改变class   比如JQ的更改class相关方法**

```javascript 
element.className = 'blue';
element.className += 'blue fb';
```


**6. 设置cssText**

```javascript 
element.style.cssText = 'height: 100px !important';
element.style.cssText += 'height: 100px !important';


```


**7. 创建引入新的css样式文件**

```javascript 
function addNewStyle(newStyle) {
      var styleElement = document.getElementById('styles_js');
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = 'styles_js';
        document.querySelector('head')[0].appendChild(styleElement);
      }
      styleElement.appendChild(document.createTextNode(newStyle));
    }
    addNewStyle('.box {height: 100px !important;}');
```


**8. 使用addRule、insertRule**

```javascript 
// 在原有样式操作
    document.styleSheets[0].addRule('.box', 'height: 100px');
    document.styleSheets[0].insertRule('.box {height: 100px}', 0);
    document.styleSheets[0].deleteRule(6);//清除之前写入的动画样式
    // 或者插入新样式时操作
    var styleEl = document.createElement('style'),
    styleSheet = styleEl.sheet;
    styleSheet.addRule('.box', 'height: 100px');
    styleSheet.insertRule('.box {height: 100px}', 0);
    document.head.appendChild(styleEl);
```


**9.获取属性样式**

```javascript 
// 非行内样式的获取 区分浏览器  第一个参数是元素 第二个元素 是 不是为元素 
    function getStyle(obj,type,attr){
       if(getComputedStyle(obj,type)[attr]){
           return  getComputedStyle(obj,type)[attr]
      }else{
           return obj.currentStyle[attr]
      }
   }
```
