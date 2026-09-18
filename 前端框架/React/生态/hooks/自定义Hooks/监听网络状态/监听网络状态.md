# 监听网络状态

## 目录

- [定义](#定义)
- [使用](#使用)

#### 定义

这个hook主要借助了`navigator`全局属性和`offline/online`事件监听

```typescript 
import { useEffect, useState } from "react"
export const useNetwork = () => {
  const [state, setState] = useState<boolean>(navigator.onLine)
  useEffect(() => {
    window.addEventListener('offline', () => setState(false))
    window.addEventListener('online', () => setState(true))
    return () => {
      window.removeEventListener('offline', () => setState(false))
      window.removeEventListener('online', () => setState(true))
    }
  }, [])
  return state
}


```


#### 使用

```typescript 
const onlineState = useNetwork()
return onlineState ? <App /> : <OfflineTip />

```


类似的方法还可以探索很多有意思的事件属性，例如`复制`时加版权标识
