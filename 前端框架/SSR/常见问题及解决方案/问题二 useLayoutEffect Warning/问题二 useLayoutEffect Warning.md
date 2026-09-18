# 问题二 useLayoutEffect Warning

## 目录

- [解决方案](#解决方案)
- [总结：写 Hooks 时需要注意](#总结写-Hooks-时需要注意)

如果使用了`useLayoutEffect`，在 SSR 模式下，会出现以下警告

> ⚠️Warning: useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See[https://fb.me/react-uselayouteffect-ssr](https://fb.me/react-uselayouteffect-ssr "https://fb.me/react-uselayouteffect-ssr")for common fixes.

### 解决方案

1. 使用 useEffect 代替 useLayoutEffect（废话）
2. 根据环境动态的指定是使用 `useEffect` 还是 `useLayoutEffect`。这是来自社区的一种 `hack` 解决方案，目前在[react-redux](https://github.com/reduxjs/react-redux/blob/d16262582b2eeb62c05313fca3eb59dc0b395955/src/components/connectAdvanced.js#L40 "react-redux")、[react-use](https://github.com/streamich/react-use/blob/master/src/useIsomorphicLayoutEffect.ts "react-use")、[react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd/blob/master/src/view/use-isomorphic-layout-effect.js "react-beautiful-dnd")均使用的这种方案。

```javascript 
import { useLayoutEffect, useEffect } from 'react';
const useIsomorphicLayoutEffect = isBrowser() ? useLayoutEffect : useEffect;
export default useIsomorphicLayoutEffect;
```


## 总结：写 Hooks 时需要注意

1. 不要在非 useEffect/useLayoutEffect 中，直接使用 DOM/BOM 属性
2. 在非 useEffect/useLayoutEffect 使用 DOM/BOM 属性时，使用`isBrowser`判断是否在浏览器环境执行
3. 如果某个 Hooks 需要接收 DOM/BOM 属性，需要支持函数形式传参。以 ahooks 的 useEventListener 举例，必须支持函数形式来指定 target 属性。

```typescript 
import React, { useState } from 'react';
import { useEventListener } from 'ahooks';

export default () => {
  const [value, setValue] = useState(0);

  const clickHandler = () => {
    setValue(value + 1);
  };

  useEventListener(
    'click', 
    clickHandler, 
    { 
 -       target: document.getElemenetById('click-btn') 
+       target: () => document.getElemenetById('click-btn') 
     }
  );

  return (
    <button id="click-btn" type="button">
      You click {value} times
    </button>
  );
};
```


1. 使用`useIsomorphicLayoutEffect`来代替`useLayoutEffect`
