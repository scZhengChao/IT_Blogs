# &#x20;hotkeys-js

## 目录

- [Usage](#Usage)

1. 学会快捷键实现原理，也可以分析其他的快捷键的js库

[ GitHub - jaywcjlove/hotkeys-js: ➷ A robust Javascript library for capturing keyboard input. It has no dependencies. ➷ A robust Javascript library for capturing keyboard input. It has no dependencies.  - GitHub - jaywcjlove/hotkeys-js: ➷ A robust Javascript library for capturing keyboard input. It has no dependencie https://github.com/jaywcjlove/hotkeys-js](https://github.com/jaywcjlove/hotkeys-js " GitHub - jaywcjlove/hotkeys-js: ➷ A robust Javascript library for capturing keyboard input. It has no dependencies. ➷ A robust Javascript library for capturing keyboard input. It has no dependencies.  - GitHub - jaywcjlove/hotkeys-js: ➷ A robust Javascript library for capturing keyboard input. It has no dependencie https://github.com/jaywcjlove/hotkeys-js")

## Usage

```javascript 
import hotkeys from 'hotkeys-js';

hotkeys('f5', function(event, handler){
  // Prevent the default refresh event under WINDOWS system
  event.preventDefault()
  alert('you pressed F5!')
});
```


```javascript 
<script src="https://unpkg.com/hotkeys-js/dist/hotkeys.min.js"></script>
<script type="text/javascript">
hotkeys('ctrl+a,ctrl+b,r,f', function (event, handler){
  switch (handler.key) {
    case 'ctrl+a': alert('you pressed ctrl+a!');
      break;
    case 'ctrl+b': alert('you pressed ctrl+b!');
      break;
    case 'r': alert('you pressed r!');
      break;
    case 'f': alert('you pressed f!');
      break;
    default: alert(event);
  }
});
</script>
```
