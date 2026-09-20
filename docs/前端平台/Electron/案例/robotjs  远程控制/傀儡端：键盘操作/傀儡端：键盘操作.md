# 傀儡端：键盘操作

## 目录

- [lib](#lib)
- [按下抬起](#按下抬起)
- [工具](#工具)
- [类型](#类型)

# lib

```javascript 
npm i vkey
```


# 按下抬起

```typescript 
[HandleTypeEnum.键盘按下]: (params: unknown) => {
    const data = params as MessageDataKeyDown;
    const key = getKeyName(data.keyCode);
    const modifiers = getModifyKeys(data);
    try {
      robot.keyToggle(key, 'down', modifiers);
    } catch (e) {
      // @ts-ignore
      Logger.info(`${key};--${JSON.stringify(modifiers)}---${e.message}`);
    }
  },
  [HandleTypeEnum.键盘抬起]: (params: unknown) => {
    const data = params as MessageDataKeyDown;
    const key = getKeyName(data.keyCode);
    const modifiers = getModifyKeys(data);
    try {
      robot.keyToggle(key, 'up', modifiers);
    } catch (e) {
      Logger.info(`${key};--${JSON.stringify(modifiers)}---${JSON.stringify(e)}`);
    }
  },
```


# 工具

```typescript 
import vkey from 'vkey'
function getKeyName(keyCode: number) {
  return vkey[keyCode].toLowerCase().replace(/<([^>]+)>/g, '$1');
}
function getModifyKeys(data: MessageDataKeyDown) {
  const modifiers: string[] = [];
  if (data.meta) {
    modifiers.push(getKeyName(ModifyKeyCode.meta));
  }
  if (data.shift) {
    modifiers.push(getKeyName(ModifyKeyCode.shift));
  }
  if (data.alt) {
    modifiers.push(getKeyName(ModifyKeyCode.alt));
  }
  if (data.ctrl) {
    modifiers.push(getKeyName(ModifyKeyCode.ctrl));
  }
  return modifiers;
}
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
