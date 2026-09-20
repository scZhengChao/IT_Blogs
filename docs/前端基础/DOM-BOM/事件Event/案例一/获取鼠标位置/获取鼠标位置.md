# 获取鼠标位置

```javascript 
 您可以使用 MouseEvent 对象下 clientX 和 clientY 的属性值，获取鼠标的当前位置坐标信息。

document.addEventListener('mousemove', (e) => {
    console.log(`Mouse X: ${e.clientX}, Mouse Y: ${e.clientY}`);
});           
```
