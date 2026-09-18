# key

## 目录

- [基本用法](#基本用法)
- [事件对象属性](#事件对象属性)
- [示例：检测组合键](#示例检测组合键)
- [示例：检测按键按下和抬起](#示例检测按键按下和抬起)
- [注意事项](#注意事项)
- [按下不松；会一直触发 keyDown 事件吗](#按下不松会一直触发-keyDown-事件吗)
  - [keydown事件的重复触发机制\*\*](#keydown事件的重复触发机制)
  - [如何避免重复触发](#如何避免重复触发)
  - [event.repeat属性\*\*](#eventrepeat属性)
  - [总结](#总结)

在 JavaScript 中，可以通过监听键盘事件来捕获按键的按下和抬起动作。浏览器提供了以下键盘事件：

1. **`keydown`**：当键盘上的键被按下时触发。
2. **`keyup`**：当键盘上的键被抬起时触发。

### **基本用法**

以下是一个简单的示例，演示如何监听键盘的按下和抬起事件：

```javascript 
// 监听 keydown 事件
document.addEventListener("keydown", (event) => {
    console.log(`Key pressed: ${event.key}`);
});

// 监听 keyup 事件
document.addEventListener("keyup", (event) => {
    console.log(`Key released: ${event.key}`);
});
```


### **事件对象属性**

键盘事件对象（`event`）包含以下常用属性：

1. **`event.key`**：
   - 返回按下的键的字符串值（例如`"a"`,`"Enter"`,`"Shift"`）。
   - 对于非字符键（如`Shift`、`Ctrl`），返回键的名称。

```javascript 
document.addEventListener("keydown", (event) => {
    console.log(`Key pressed: ${event.key}`);
});
```


1. **`event.code`**：

- 返回按下的键的物理键码（例如`"KeyA"`,`"Enter"`,`"ShiftLeft"`）。
- 无论键盘布局如何，`event.code`的值都是固定的。

```javascript 
document.addEventListener("keydown", (event) => {
    console.log(`Key code: ${event.code}`);
});
```


1. `event.ctrlKey`**、****`event.shiftKey`****、****`event.altKey`****、`event.metaKey`**：

- 返回布尔值，表示是否按下了`Ctrl`、`Shift`、`Alt`或`Meta`（Windows 上的`Win`键，macOS 上的`Command`键）。

```javascript 
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey) {
        console.log("Ctrl key is pressed");
    }
    if (event.shiftKey) {
        console.log("Shift key is pressed");
    }
});
```


### **示例：检测组合键**

以下示例演示如何检测`Ctrl + S`组合键：

```javascript 
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "s") {
        event.preventDefault(); // 阻止默认行为（如保存页面）
        console.log("Ctrl + S pressed");
    }
});
```


### **示例：检测按键按下和抬起**

以下示例记录按键的按下和抬起时间：

```javascript 
let keyPressTime;

document.addEventListener("keydown", (event) => {
    if (event.key === "a") {
        keyPressTime = Date.now();
        console.log("Key 'a' pressed at:", keyPressTime);
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key === "a") {
        const keyReleaseTime = Date.now();
        console.log("Key 'a' released at:", keyReleaseTime);
        console.log("Key 'a' was held for:", keyReleaseTime - keyPressTime, "ms");
    }
});
```


### **注意事项**

1. **事件目标**：
   - 键盘事件通常绑定到`document`或特定的输入元素（如`<input>`）。
2. **阻止默认行为**：
   - 使用`event.preventDefault()`可以阻止键盘事件的默认行为（例如阻止`Ctrl + S`保存页面）。
3. **兼容性**：
   - `event.key`和`event.code`在现代浏览器中广泛支持，但在旧版浏览器中可能不完全支持。

# 按下不松；会一直触发 keyDown 事件吗

是的，**当按下键盘上的某个键不松开时，浏览器会持续触发**\*\*`keydown`\*\***事件**。这种行为是浏览器的默认机制，通常用于处理长按键盘的场景（例如长按`Backspace`删除多个字符，或长按方向键移动光标）。

### `keydown`事件的重复触发机制\*\*

1. **首次按下**：
   - 当按下某个键时，浏览器会立即触发一次`keydown`事件。
2. **长按不松开**：
   - 如果按住键不松开，浏览器会在一段时间后开始重复触发`keydown`事件。
   - 重复触发的频率取决于操作系统和浏览器的设置。
3. **松开按键**：
   - 当松开按键时，浏览器会触发一次`keyup`事件。

### **如何避免重复触发**

如果你不希望`keydown`事件在长按时重复触发，可以通过以下方式实现：

1. **使用标志变量**：
   - 使用一个标志变量来记录按键是否已经被按下。

```javascript 
let isKeyDown = false;

document.addEventListener("keydown", (event) => {
    if (!isKeyDown) {
        isKeyDown = true;
        console.log(`Key pressed: ${event.key}`);
    }
});

document.addEventListener("keyup", (event) => {
    isKeyDown = false;
    console.log(`Key released: ${event.key}`);
});
```


**检查**\*\*`event.repeat`\*\***属性**：

- `event.repeat`是一个布尔值，表示当前`keydown`事件是否是由于长按导致的重复触发。

```javascript 
document.addEventListener("keydown", (event) => {
    if (!event.repeat) {
        console.log(`Key pressed: ${event.key}`);
    }
});
```


### `event.repeat`属性\*\*

`event.repeat`是`KeyboardEvent`对象的一个属性，用于判断当前`keydown`事件是否是重复触发：

- **`true`**：表示当前事件是由于长按导致的重复触发。
- **`false`**：表示当前事件是首次按下。

```javascript 
document.addEventListener("keydown", (event) => {
    if (event.repeat) {
        console.log(`Key repeated: ${event.key}`);
    } else {
        console.log(`Key pressed: ${event.key}`);
    }
});
```


### **总结**

- 当按下键盘上的某个键不松开时，浏览器会持续触发`keydown`事件。
- 如果你不希望重复触发，可以使用`event.repeat`属性或标志变量来过滤重复事件。
- `keyup`事件只会在松开按键时触发一次。
