# 自适应布局

## 目录

- [position:定位](#position定位)
- [calc(expression)](#calcexpression)
- [float+overflow:hidden         ](#floatoverflowhidden-)
- [弹性盒](#弹性盒)

# position:定位

```css 
 *{
  margin: 0;padding: 0; 
}
html,body{
    height: 100%;
    width: 100%;
}
.box{
    position: relative;
    height: 80%;
    width: 500px;
    border: 1px solid red;/***/
    padding: 10px;/***/
}
.box1{
    height: 100px;
    width: 100%;
    background-color: red
}
.box2{
    position:absolute;
    top: 110px;
    bottom: 0px;
    background-color: green;
    overflow: auto;
}
```


# calc(expression)

```css 
             *{margin: 0;padding: 0; }
           html,body{
              height: 100%;
              width: 100%;
              }
            .box{
                    height: 80%;
                    width: 500px;
                    border: 1px solid red;
              padding:10px;
            }
            .box1{
              height: 100px;
                    width: 100%;
                    background-color: red
            }
            .box2{
              height: calc(100vh - 100px); calc(100%-100px)
                    background-color: green;
              overflow: auto;
            }





```


# float+overflow:hidden         

```css 
 <style type="text/css">            
 * {
   margin:0; 
   padding:0;
}             
html,body {
  height:100%;
}             
.left {
  width:200px; 
  height:100%; 
  background:rgba(255,0,0,.7); 
  float:left;
}             
.right {
  width:200px; 
  height:100%; 
  background:rgba(0,255,0,.7); 
  float:right;
}            
.center {
  height:100%; 
  background:#00f; 
  overflow:hidden;
}         
</style>               
<body>                
  <div class="left"></div>             
  <div class="right"></div>             
  <div class="center"></div>
</body>


```


# 弹性盒

```css 
      <body>
            <header>ryeruyer</header>
            <section>
                <div class="left">rewyetruy</div>
                <div class="center">ryetru</div>
                <div class="right">etriujrtyi</div>
            </section>
            <footer>eetujtyit</footer>
        </body>


        <style type="text/css">
            * {margin:0; padding:0;}
            html,body {height:100%;}
            /* 弹性盒换轴 */
            body {display:flex; flex-direction:column;}
            /* 头和尾自定义高度, */
            header {height:100px; background:#f00; margin-bottom:10px;}
            footer {height:100px; background:#00f; margin-top:10px;}
            /* height为主轴方向上,flex=1,自动盛满屏幕,并且在设置弹性和 */
            section {background:#0f0; flex:1; overflow:auto; display:flex;}
            /* widht为主轴,定宽和弹性和布局 */
            .left {width:200px; background:#0ff; margin-right:10px;}
            .center {background:#ff0; flex:1;}
            .right {width:200px; background:#f0f; margin-left:10px;}
</style>   
```
