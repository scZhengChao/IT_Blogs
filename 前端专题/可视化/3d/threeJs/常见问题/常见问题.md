# 常见问题

## 目录

- [拖拽效果](#拖拽效果)

#### 拖拽效果

控制器自带的控制效果和我们平常的相反；

关键是标黄的两行代码；**重新控制器代码；然后把旋转方向取反**

```javascript 
function handleMouseMoveRotate( event ) {
  rotateEnd.set( event.clientX, event.clientY );

  rotateDelta.subVectors( rotateEnd, rotateStart ).multiplyScalar( scope.rotateSpeed );

  const element = scope.domElement;
 
  rotateLeft( -2 * Math.PI * rotateDelta.x / element.clientHeight ); // yes, height

  rotateUp( -2 * Math.PI * rotateDelta.y / element.clientHeight ); 

  rotateStart.copy( rotateEnd );

  scope.update();

}
```
