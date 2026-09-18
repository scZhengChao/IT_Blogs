# skew

```css 
transform:skewX(45deg);
    - X方向倾斜:transform:  skewX(angle)
               skewX(45deg):参数值以deg为单位 代表与y轴之间的角度

    - Y方向倾斜:transform:  skewY(angle)
               skewY(45deg):参数值以deg为单位 代表与x轴之间的角度

     - 二维倾斜:transform:  skew(ax[, ay]);  如果ay未提供，在Y轴上没有倾斜
               skew(45deg,15deg):参数值以deg为单位 第一个参数代表与y轴之间的角度
                                 第二个参数代表与x轴之间的角度
                单值时表示只X轴扭曲，Y轴不变，如transform: skew(30deg);等价于transform: skew(30deg, 0);
                考虑到可读性，不推荐用单值，应该用transform: skewX(30deg);。skewY表示只Y轴扭曲，X轴不变  
            
 正值:拉正斜杠方向的两个角
 负值:拉反斜杠方向的两个角


```
