# 傀儡端：鼠标操作

## 目录

- [控制端](#控制端)
- [傀儡端](#傀儡端)
- [算法](#算法)
- [移动](#移动)
- [鼠标按下](#鼠标按下)
- [鼠标抬起](#鼠标抬起)
- [双击](#双击)
- [滚轮](#滚轮)
- [类型](#类型)

# 控制端

- x: 相对位置 offsetX
- y: 相对位置 offsetY
- canvasWidth； 展示元素的宽
- canvasHeight。 展示元素的高

# 傀儡端

- appwidth： 共享的元素的宽
- appHeight； 共享元素的高
- postionX:  共享元素的 距离屏幕 的 x坐标
- positionY: 共享元素的 距离屏幕 的 y坐标

# 算法

```javascript 
鼠标位置x = （x/canvasWidth）*appWidth + positionX
鼠标位置y = （y/canvasHeight)*appHeight + positionY
```


# 移动

```typescript 
[HandleTypeEnum.鼠标移动]: (params: unknown) => {
    const data = params as MessageDataMouseMove;
    const { x, y, canvasHeight, canvasWidth, appHeight, appWidth, positionY, positionX } = data;
    const mouseX = (x / canvasWidth) * appWidth + positionX;
    const mouseY = (y / canvasHeight) * appHeight + positionY;
    robot.moveMouse(mouseX, mouseY);
  },
```


# 鼠标按下

```typescript 
[HandleTypeEnum.鼠标按下]: (params: { state: MouseHandlerStateEnum }) => {
    switch (params.state) {
      case MouseHandlerStateEnum.左键: {
        robot.mouseToggle('down', 'left');
        break;
      }
      case MouseHandlerStateEnum.右键: {
        robot.mouseToggle('down', 'right');
        break;
      }
      case MouseHandlerStateEnum.中键: {
        robot.mouseToggle('down', 'middle');
        break;
      }
      default: {
        Logger.info(`无此操作`);
      }
    }
  },
```


# 鼠标抬起

```typescript 
  [HandleTypeEnum.鼠标抬起]: (params: { state: MouseHandlerStateEnum }) => {
    switch (params.state) {
      case MouseHandlerStateEnum.左键: {
        robot.mouseToggle('up', 'left');
        break;
      }
      case MouseHandlerStateEnum.右键: {
        robot.mouseToggle('up', 'right');
        break;
      }
      case MouseHandlerStateEnum.中键: {
        robot.mouseToggle('up', 'middle');
        break;
      }
      default: {
        Logger.info(`无此操作`);
      }
    }
  },
```


# 双击

```typescript 
[HandleTypeEnum.鼠标双击]: () => {
    robot.mouseClick('left', true);
  },
```


# 滚轮

```typescript 
[HandleTypeEnum.滚轮事件]: (params: unknown) => {
    const data = params as MessageDataMouseWheel;
    robot.scrollMouse(data.deltaX, data.deltaY);
  },
```


# 类型

```typescript 
export enum ModifyKeyCode {
  'ctrl' = 17,
  'alt' = 18,
  'shift' = 16,
  'meta' = 91,
}

export enum HandleTypeEnum {
  '鼠标移动' = 'move',
  '键盘按下' = 'keydown',
  '键盘抬起' = 'keyup',
  鼠标按下 = 'mouseDown',
  鼠标抬起 = 'mouseUp',
  '鼠标双击' = 'doubleClick',
  '滚轮事件' = 'wheel',
  '复制' = 'copy',
}
export enum MouseHandlerStateEnum {
  左键 = 'left',
  右键 = 'right',
  中键 = 'middle',
}

export interface MessageType {
  type: HandleTypeEnum;
  [key: string]: SafeAny;
}

export interface MessageDataMouseMove {
  x: number;
  y: number;
  canvasWidth: number;
  canvasHeight: number;
  appWidth: number;
  appHeight: number;
  positionX: number;
  positionY: number;
}
export interface MessageDataKeyDown {
  keyCode: number;
  shift: true;
  meta: true;
  alt: true;
  ctrl: true;
}
export interface MessageDataMouseWheel {
  deltaY: number;
  deltaX: number;
}
export interface MessageDataCopy {
  text: string;
}
```
