# s & ms

CSS中的时间单位有两个：秒（s）和毫秒（ms）。这两个时间单位都是CSS新增的单位。这两个单位的换算关系如下：

```javascript 
1s = 1000ms
```


时间单位主要用于过度和动画中，用于定义持续时间或延迟时间。下面两种定义是等效的：

```javascript 
a[href] {
 transition-duration: 2.5s;
}
a[href] {
 transition-duration: 2500s;
}
```
