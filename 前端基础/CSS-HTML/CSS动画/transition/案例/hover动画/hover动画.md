# hover动画

## 目录

- [hover：颜色变化](#hover颜色变化)
- [hover:位置变化    .](#hover位置变化-)

## hover：颜色变化

```css 
 .box {width:100px; height:100px; background:#f00; transition:all 2s linear 2s;}
.box:hover {width:600px; background:#0f0;}

// opacity：0 -1 透明度的渐变变化；给人一种渐隐渐显得感觉；
// display：none/block 则不会触发


```


## hover:位置变化    .

```css 
 view{
  position: absolute;
  top: 0;
  width: 100%;
  transition: all 2s linear;
}
.view:hover{
  top: 100px;
  background: red;
}


```


**或者**

**动态添加class的方法**

```css 
     .view{
          position: absolute;
          top: 0;
          width: 100%;
          transition: all 2s linear;
      }
      .view.scroll{
          top: 100px;
          background: red;
}
```


**或者**

**transiform**

```css 
     .view{
          width: 100%;
          transition: all 2s linear;
      }
      .view.scroll{
          top: 100px;
          background: red;
          transform: translateY(100px);
      }
```
