# 判断滑屏手势的方向

## 目录

- [方法一](#方法一)

# **方法一**

1. 当开始一个touchstart事件的时候，获取此刻手指的横坐标startX和纵坐标startY；
2. 当触发touchmove事件时，在获取此时手指的横坐标moveEndX和纵坐标moveEndY;最后，通过这两次获取的坐标差值来判断手指在手机屏幕上的滑动方向。

**思路**：用touchmove的最后坐标减去touchstart的起始坐标，X的结果如果正数，则说明手指是从左往右划动；X的结果如果负数，则说明手指是从右往左划动；Y的结果如果正数，则说明手指是从上往下划动；Y的结果如果负数，则说明手指是从下往上划动。

**具体代码如下**：

```typescript 
  var mybody = document.getElementsByTagName('body')[0];
    //滑动处理
    var startX, startY, moveEndX, moveEndY, X, Y;   
    mybody.addEventListener('touchstart', function(e) {
        e.preventDefault();
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
    });
 
    mybody.addEventListener('touchmove', function(e) {
        e.preventDefault();
        moveEndX = e.changedTouches[0].pageX;
        moveEndY = e.changedTouches[0].pageY;
        X = moveEndX - startX;
        Y = moveEndY - startY;
        if ( X > 0 ) {alert(‘向右’);}
        else if ( X < 0 ) {alert(‘向左’);}
        else if ( Y > 0) {alert(‘向下’);}
        else if ( Y < 0 ) { alert(‘向上’);}
        else{alert(‘没滑动’); }
    });
```


**然而在实际的操作中，手指的上下滑动很难做到直上直下，只要稍微有点斜，只要稍微有点斜，就会被X轴的判断先行接管，而与我们实际的操作意愿相背离**。此时就需要添加特殊的判断技巧，**修改代码如下**：

```typescript 
   var mybody = document.getElementsByTagName('body')[0];
 
    //滑动处理
 
    var startX, startY, moveEndX, moveEndY, X, Y;   
 
    mybody.addEventListener('touchstart', function(e) {
 
        e.preventDefault();
 
        startX = e.touches[0].pageX;
 
        startY = e.touches[0].pageY;
 
    }, false);
 
    mybody.addEventListener('touchmove', function(e) {
 
        e.preventDefault();
 
        moveEndX = e.changedTouches[0].pageX;
 
        moveEndY = e.changedTouches[0].pageY;
 
        X = moveEndX - startX;
 
        Y = moveEndY - startY;
 
        
 
        if ( Math.abs(X) > Math.abs(Y) && X > 0 ) {
 
            alert("向右");
 
        }
 
        else if ( Math.abs(X) > Math.abs(Y) && X < 0 ) {
 
            alert("向左");
 
        }
 
        else if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
 
            alert("向下");
 
        }
 
        else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
 
            alert("向上");
 
        }
 
        else{
 
            alert("没滑动");
 
        }
 
    });
```
