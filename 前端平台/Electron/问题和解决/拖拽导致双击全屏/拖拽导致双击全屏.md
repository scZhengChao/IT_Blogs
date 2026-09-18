# 拖拽导致双击全屏

## 目录

- [自定义拖拽](#自定义拖拽)

在electron中使用css的 `-webkit-app-region: drag` 将元素设置成可拖拽状态后发现，双击该元素触发了系统的最大化方法，尝试使用js禁止该元素的双击、点击事件，还有css的 pointer-events: none 都没效果，有没有办法能解决这个问题呢？

在新建窗口时设置：

|   |                            |
| - | -------------------------- |
| 1 | \`maximizable:\` \`false\` |

这样的话双击就不可以最大化了，然后在具体需要最大化的地方再用 &#x20;

```javascript 
mainWindow.setMaximizable(true)
```


# 自定义拖拽

[ 『快速入门electron』之实现窗口拖拽-腾讯云开发者社区-腾讯云 对于一些进程通信的基本demo可以去看下我的这个文章：手把手带你快速入门Electron https://cloud.tencent.com/developer/article/2065649](https://cloud.tencent.com/developer/article/2065649 " 『快速入门electron』之实现窗口拖拽-腾讯云开发者社区-腾讯云 对于一些进程通信的基本demo可以去看下我的这个文章：手把手带你快速入门Electron https://cloud.tencent.com/developer/article/2065649")

```typescript 
import type React from 'react';
import { useRef } from 'react';
import { useEventListener } from 'ahooks';
interface DragMoveWrapperProps {
  className?: string;
  onMouseMove?: (data: MouseMoveOptions) => void;
}
export interface MouseMoveOptions {
  baseX: number;
  baseY: number;
  screenX: number;
  screenY: number;
}

const DragMoveWrapper: React.FC<React.PropsWithChildren<DragMoveWrapperProps>> = (props) => {
  const { children, className, onMouseMove } = props;
  const dragEl = useRef<HTMLDivElement>(null);
  const movePosition = useRef<{
    isMouseDown: boolean;
    baseX: number;
    baseY: number;
  }>({
    isMouseDown: false,
    baseX: 0,
    baseY: 0,
  });
  useEventListener(
    'mousedown',
    (e) => {
      movePosition.current.isMouseDown = true;
      movePosition.current.baseX = e.x;
      movePosition.current.baseY = e.y;
    },
    { target: dragEl },
  );
  useEventListener(
    'mousemove',
    (e) => {
      if (!movePosition.current.isMouseDown) {return;}
      const x = e.screenX - movePosition.current.baseX;
      const y = e.screenY - movePosition.current.baseY;
      window.BridgeJS.setBounds({ width: 562, height: 196, x, y });
      onMouseMove?.({
        baseX: movePosition.current.baseX,
        baseY: movePosition.current.baseY,
        screenX: e.screenX,
        screenY: e.screenY,
      });
    },
    { target: document },
  );
  useEventListener(
    'mouseup',
    () => {
      movePosition.current.isMouseDown = false;
    },
    { target: dragEl },
  );
  return (
    <div className={className} ref={dragEl}>
      {children}
    </div>
  );
};
export default DragMoveWrapper;
```
