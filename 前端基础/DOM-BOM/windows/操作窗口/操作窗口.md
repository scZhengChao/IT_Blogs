# 操作窗口

## 目录

- [操作窗口](#操作窗口)
  - [聚焦:](#聚焦)
  - [移动变形](#移动变形)
  - [自动唤起浏览器](#自动唤起浏览器)

# 操作窗口

#### 聚焦:

    chrome  add FireFo &#x20;

**window\.focus()/ blur()  打开最小化的浏览器 ie11 支持**

    IE  document.onfocusin() / onfocusout()   不支持

#### 移动变形

**条件：必须由 window\.open() 打开的页面， 而且 不能有其他tab页面；**

- window\.resizeTo(800, 600);    //改变大小   制定大小  
- window\.resizeBy(800, 600);      //照指定的像素调整窗口的大小。 在现有的基础上增减 + 为 右 和 下
- window\.moveTo(0, 0);        //把窗口的左上角移动到一个指定的坐标。 
- window\.moveBy(100,200)     //可相对窗口的当前坐标把它移动指定的像素

window\.focus（）//onfocus    document/input  获取焦点   

#### 自动唤起浏览器

**究极大bug 有些事件只能有用户触发； 而不能有脚本触发； 特别是那些违反人性，阻止用户操作的行为**

**但是上有政策下有对策；无意间发现了怎么破解他这个问题：见代码；把操作写进回调里；貌似他失去了上下文（这个办法只在IE生效    ）**

**但是谷歌上刚刚相反（写在回调里反而不生效；必须让他有上下文；）**

```javascript 
    var myopen = document.querySelector('.open')
   var show = document.querySelector('.show')
   let opener;
   myopen.addEventListener('click',function(){
     opener =  window.open('./transition.html','','width=200;height=200')
   })
   show.addEventListener('click',function(){
        myfocus()
   })
   function myfocus(){
    opener.focus()
   }
   function test(cb){
        cb()
   }
   setTimeout(()=>{
        test(myfocus)
   },5000)
//实现了不经过用户操作也能，也能唤起浏览器
```
