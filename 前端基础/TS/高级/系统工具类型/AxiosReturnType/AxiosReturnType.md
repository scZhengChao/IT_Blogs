# AxiosReturnType

开发经常使用 axios 进行封装 API层 请求, 通常是一个函数返回一个 AxiosPromise\<Resp>, 现在我想取到它的 Resp 类型, 根据上一个工具泛型的知识我们可以这样写.

```typescript 
import { AxiosPromise } from 'axios' // 导入接口
type AxiosReturnType<T> = T extends (...args: any[]) => AxiosPromise<infer R> ? R : any

// 使用
type Resp = AxiosReturnType<Api> // 泛型参数中传入你的 Api 请求函数
```
