# 获取元素的纵坐标（相对于窗口）

`offsetParent`属性返回一个对象的引用，这个对象是**距离调用 offsetParent的父级元素中最近的（在包含层次中最靠近的），并且是已进行过CSS定位的容器元素**。如果这个容器元素**未进行CSS定位, 则 offsetParent属性的取值为根元素的引用**。

1. 如果当前元素的父级元素中没有进行CSS定位（position为 absolute/relative）， offsetParent 为 body
2. 如果当前元素的父级元素中有CSS定位（ position 为 absolute/relative）， offsetParent 取父级中最近的元素

```typescript 
//获取元素的纵坐标（相对于窗口）
function getTop(e){
  var offset=e.offsetTop;
  if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
  return offset
}
```
