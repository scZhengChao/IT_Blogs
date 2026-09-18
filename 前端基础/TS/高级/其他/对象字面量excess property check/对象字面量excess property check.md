# 对象字面量excess property check

子类型中必须包含源类型所有的属性和方法:

```typescript 
function getPointX(point: { x: number }) {
  return point.x
}
const point = {
 x: 1,
  y: '2'
}
getPointX(point) // OK

```


注意: 如果**直接传入一个对象字面量是会报错的：**

```typescript 
function getPointX(point: { x: number }) {
  return point.x
}
getPointX({ x: 1, y: '2' }) // error

```


这是 ts 中的另一个特性，叫做:  `excess property check`  ，当传**入的参数是一个对象字面量时，会进行额外属性检查。**
