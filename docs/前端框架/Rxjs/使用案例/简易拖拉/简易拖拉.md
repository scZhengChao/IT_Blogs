# 简易拖拉

实现内容如下：

**1、首先页面上有一個元素(#drag)**

**2、当鼠标在元素(#drag)上按下左键(mousedown)时，开始监听鼠标移动(mousemove)的位置**

**3、当鼠标左键释放（mouseup）时，结束监听鼠标的移动**

**4、当鼠标移动被监听时，跟着修改原件的样式属性**

```javascript 
import { of, fromEvent} from 'rxjs'; 
import { map, concatMap, takeUntil, withLatestFrom } from 'rxjs/operators';

 // 样式省略是绝对定位
const dragEle = document.getElementById('drag')
const mouseDown = fromEvent(dragEle, 'mousedown')
const mouseUp = fromEvent(document, 'mouseup')
const mouseMove = fromEvent(document, 'mousemove')

mouseDown.pipe(
  concatMap(e => mouseMove.pipe(takeUntil(mouseUp))),
  withLatestFrom(mouseDown, (move: MouseEvent, down: MouseEvent) => {
        return {
            x: move.clientX - down.offsetX,
            y: move.clientY - down.offsetY
        }
  })
).subscribe(pos => {
        dragEle.style.top = pos.y + 'px';
        dragEle.style.left = pos.x + 'px';
})

```


在线预览：[stackblitz.com/edit/rxjs-s…](https://link.juejin.cn/?target=https://stackblitz.com/edit/rxjs-saiq3h?devtoolsheight=60\&file=index.ts "stackblitz.com/edit/rxjs-s…")
