# 常见错误

## 目录

- [2349无法调用其类型缺少调用签名的表达式](#2349无法调用其类型缺少调用签名的表达式)
  - [解决](#解决)
- [Cannot find name ‘\_\_dirname‘](#Cannot-find-name-__dirname)

# 2349无法调用其类型缺少调用签名的表达式

就是你调用的方法 不知道类型；

`Type 'number' has no call signatures.`

`Not all constituents of type 'number | Dispatch>' are callable.  ``Type 'number' has no call signatures.`

```typescript 
import * as React from 'react'

/**
 *
 * @param defaultCount
 * 自定义hooks
 */
const useCount = (defaultCount: number) => {
  const [count, setCount] = React.useState(defaultCount)
  const it: any = React.useRef()

  React.useEffect(() => {
    it.current = setInterval(() => {
      console.log('add...', count)
      setCount(() => count + 1)
    }, 1000)
  }, [])

  React.useEffect(() => {
    if (count >= 10) {
      clearInterval(it.current)
    }
  });
  return [count, setCount]
}

export default useCount
```


```typescript 
import * as React from 'react'
import useCount from './useCount';

export default function index() {
  const [count, setCount] = useCount(3)
   // ts报错
  // This expression is not callable.
  // Not all constituents of type 'number | Dispatch>' are callable.
  //   Type 'number' has no call signatures.
  const add = () => setCount(0)

  return (
      usecount: { count }
      add
  )
}
```


## 解决

```typescript 
return [count, setCount] 返回的是 (number|Function)[] 不是你想要那個tuple類型.

你可以return ... as const (需要近期的ts版本) 或者手寫那個tuple.
```


# Cannot find name ‘\_\_dirname‘

- npm install @types/node --save-dev

```typescript 
{
 "compilerOptions": {
  ...
  "types": [
    "node"
  ]
  ...
  }
}

```
