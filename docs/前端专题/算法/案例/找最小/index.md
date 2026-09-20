# 找最小

## 目录

- [解法一](#解法一)
- [解法二](#解法二)

假设以屏幕左上角为原点，坐标（0，0），可以在屏幕上通过位置x，y（横向为x，纵向为y），大小width，height 来定义一个矩形（矩形位置为矩形左上角点在屏幕上的位置）。屏幕上现有任意多个矩形，请计算一个新的最小矩形，其位置和大小刚好能包含屏幕上的所有矩形。

例如：下图中A，B，C三个矩形构成的矩形区域用黑线表示，需要计算黑线框矩形的位置和大小。

![](./image/image_2iNvw6Uc7y.png)

# 解法一

```typescript 
// 矩形数据结构如下，坐标（x，y），宽高（width，height）
interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

// 请完善函数，需要考虑矩形数量较多的场景
function computeBounds(rects: Array<Rectangle>): Rectangle {
// 1. 其实就是找 最左；最右；最上；最下的边
// 从小到大排序
  const xArr = rects.sort((a,b)=>a.x-b.x )
  const yArr = rects.sort((a,b)=>a.y-b.y)
  //2.答案矩形
  const x = xArr[0].x
  const y = yArr[0].y
  // 最右；最下
  const bottomYArr = rects.sort((a,b)=>(a.y+a.height   ) - (b.y-b.height))
  const rightXArr = rects.sort((a,b)=>(a.x+a.width)-(b.x+b.width))
  cont width = rightXArr[-1].x+rightXArr.width - x
  const height = bottomYArr[-1] .y + bottomYArr[-1].height - y 
  return {
    x,y,width,height
   }
}
```


# 解法二

```javascript 
/**
 * 计算最小包围矩形
 * @param {Array} rectangles - 矩形数组，格式为 [{x, y, width, height}, ...]
 * @returns {Object} 包围矩形的 {x, y, width, height}
 */
function calculateBoundingRect(rectangles) {
  if (rectangles.length === 0) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  rectangles.forEach(rect => {
    const right = rect.x + rect.width;
    const bottom = rect.y + rect.height;
    
    minX = Math.min(minX, rect.x);
    minY = Math.min(minY, rect.y);
    maxX = Math.max(maxX, right);
    maxY = Math.max(maxY, bottom);
  });

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}

// 定义三个矩形 A, B, C
const rectA = { x: 10, y: 20, width: 50, height: 30 };
const rectB = { x: 40, y: 50, width: 60, height: 40 };
const rectC = { x: 80, y: 10, width: 20, height: 60 };

// 计算包围矩形
const boundingRect = calculateBoundingRect([rectA, rectB, rectC]);

console.log(boundingRect);
// 输出: {x: 10, y: 10, width: 90, height: 80}

```
