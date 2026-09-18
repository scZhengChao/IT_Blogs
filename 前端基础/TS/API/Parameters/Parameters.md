# Parameters

**获取函数的参数类型，将每个参数类型放在一个元组中**

```typescript 
/**
 * @example
 * type Eg = [arg1: string, arg2: number];
 */
type Eg = Parameters<(arg1: string, arg2: number) => void>;
```
