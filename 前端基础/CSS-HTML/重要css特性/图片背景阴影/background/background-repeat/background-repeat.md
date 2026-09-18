# background-repeat

```java 
background-repeat: repeat;/*同等于*/background-repeat: repeat-x repeat-y;/*但是实质上不能出现这种写法*/
background-repeat: repeat-x;/*同等于*/background-repeat: repeat-x no-repeat;/*但是实质上不能出现这种写法*/
background-repeat: repeat-y;/* 同等于*/background-repeat: no-repeat repeat-y;/*但是实质上不能出现这种写法*/
background-repeat: round;/*不能以整数次平铺时适度缩放背景图片*/background-repeat: round round;/*这两种写法一样*/
background-repeat: space;/* 不能整数平铺时均匀留白 */background-repeat: space space;/*这两种写法一样*/
background-repeat: round space;/* 表示不能整数次平铺时横向适度缩放 纵向均匀留白*/
```
