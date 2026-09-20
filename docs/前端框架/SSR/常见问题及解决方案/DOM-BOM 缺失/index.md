# DOM/BOM 缺失

## 目录

- [解决方案](#解决方案)

SSR 是在 node 环境下运行 React 代码，而此时 window、document、navigator 等全局属性没有。如果直接使用了这些属性，就会报错`window is not defined, document is not defined, navigator is not defined`等。

常见的错误用法是在 Hooks 执行过程中，直接使用了 document 等全局属性。

```javascript 
import React, { useState } from 'react';

export default () => {
  const [state, setState] = useState(document.visibilityState);
  return state;
}
```


### 解决方案

1. 将访问 DOM/BOM 的方法放在 useEffect/useLayoutEffect 中（服务端不会执行），避免服务端执行时报错，例如：

```javascript 
import React, { useState, useEffect } from 'react';

export default () => {
  const [state, setState] = useState();
  
  useEffect(()=>{
    setState(document.visibilityState);
  }, []);
  
  return state;
}
```


1. 通过[isBrowser](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/utils/canUseDom.ts "isBrowser")来做环境判断

```typescript 
import React, { useState } from 'react';

function isBrowser() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

export default () => {
  const [state, setState] = useState(isBrowser() && document.visibilityState);
  
  return state;
}
```
