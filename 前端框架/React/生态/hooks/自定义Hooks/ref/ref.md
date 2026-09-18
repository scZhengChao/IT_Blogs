# ref

## 目录

- [useCallbackRefState](#useCallbackRefState)

# useCallbackRefState

```javascript 
import { useCallback, useState } from "react";

export const useCallbackRefState = <T>() => {
  const [refValue, setRefValue] = useState<T | null>(null);
  const refCallback = useCallback((value: T | null) => setRefValue(value), []);
  return [refValue, refCallback] as const;
};

```


使用

```javascript 
const [excalidrawAPI, excalidrawRefCallback] =
    useCallbackRefState<ExcalidrawImperativeAPI>();
   
   
<Excalidraw
   ref={excalidrawRefCallback}
/>
```
