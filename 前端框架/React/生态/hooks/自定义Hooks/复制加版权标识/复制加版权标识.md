# 复制加版权标识

## 目录

- [使用](#使用)

```typescript 
import { useEffect } from "react"
export const useCopy = () => {
  useEffect(() => {
    const onCopy = () => navigator.clipboard.readText()
      .then((text) => {
        navigator.clipboard.writeText(text + ': @copyright萌萌哒草头将军')
      })
      
    addEventListener('copy', () => onCopy())
    
    return removeEventListener('copy', () => onCopy())
  }, [])
}

```


### 使用

```typescript 
useCopy() // 复制：abc
// 粘贴：abc ：@copyright萌萌哒草头将军
```
