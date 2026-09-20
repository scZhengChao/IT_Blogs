# 注册事件监听器

通常你这样注册事件监听器。

```typescript 
document.addEventListener('click', () => console.log('Clicked!'));
```


如果使用 RxJS，要改为创建 observable。

```typescript 
import { fromEvent } from 'rxjs';

fromEvent(document, 'click').subscribe(() => console.log('Clicked!'));
```
