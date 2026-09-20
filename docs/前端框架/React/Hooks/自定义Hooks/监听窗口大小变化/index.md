# 监听窗口大小变化

## 目录

- [使用](#使用)
- [优化](#优化)

```typescript 
import { useEffect, useState } from 'react';
export const useResize = () => {
  const [width, setWidth] = useState<number>(() =>
    window.document.body.offsetWidth);
  useEffect(() => {
    window.addEventListener('resize', (e) =>
      setWidth((e?.target as any).innerWidth),
    );
    return window.removeEventListener('resize', (e) =>
      setWidth((e?.target as any).innerWidth),
    );
  }, []);
  return width;
};

```


#### 使用

```typescript 
const width = useResize()
return width > 1200 ? <PcApp /> : width > 720 ? <PadApp /> : <PhoneApp />

```


#### 优化

为了防止因为频繁触发监听事件导致宽度也频繁变化，这里可以使用防抖
