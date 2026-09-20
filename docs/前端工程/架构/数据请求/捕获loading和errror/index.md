# 捕获loading和errror

## 目录

- [自定义hooks](#自定义hooks)

# 自定义[*hooks*](https://blog.csdn.net/lin_fightin/article/details/119047633 "hooks")

```typescript 
import { useState,useCallback,useRef } from 'react'
interface State<T>{
  data: T;
  status: 'start'|'end';
  error: string | Error
}
interface PromiseFn<K,T> {
  (params: K): Promise<T>
}
const initState: State<null> = {
  data:null,
  status:'start',
  error:null
}
const useAsync =<K,T>(promiseApi: PromiseFn<K,T> ,options?: Partial<State<T>> )=>{
  const [state,setState] = useState<State<T>>({...initState,...options})
  const fetchRef = useRef<PromiseFn<K,T>>(promiseApi)
  const setData=(data: T)=>{
    setState({
      data,
      error:null,
      status:'end'
    })
  }
  const setError=(error: string | Error)=>{
    setState({
      data:null,
      error,
      status:'end'
    })
  }
  const sendHttp=useCallback<PromiseFn<K,T>>((params: K)=>{
    if(state.status === 'end'){
      setState({
        data:null,
        error:null,
        status:'start'
      })
    }
    const fn = fetchRef.current
    if(!fn || typeof fn !== 'function'){
      throw new Error('useAsync必传返回promise的函数')
    }
    const p = fetchRef.current(params)
    if(!p.then || typeof p.then !== 'function'){
      throw new Error('useAsync必传返回promise的函数')
    }
    return p.then((data)=>{
      setData(data)
      return Promise.resolve(data)
    }).catch(err=>{
      setError(err)
      return Promise.reject(err)
    })
  },[state])
  return {
    isLoading:state.status !== 'end',
    isError:state.error,
    setData,
    setError,
    sendHttp,
  }
}
export default  useAsync
```


```typescript 
import { useState,useCallback,useRef } from 'react'
interface State<T>{
  data: T;
  status: 'start'|'end';
  error: string | Error
}
interface PromiseFn<K,T> {
  (params: K): Promise<T>
}
const initState: State<null> = {
  data:null,
  status:'start',
  error:null
}
const useAsync =<K,T>(promiseApi: PromiseFn<K,T> ,options?: Partial<State<T>> )=>{
  const [state,setState] = useState<State<T>>({...initState,...options})
  const fetchRef = useRef<PromiseFn<K,T>>(promiseApi)
  const setData=(data: T)=>{
    setState({
      data,
      error:null,
      status:'end'
    })
  }
  const setError=(error: string | Error)=>{
    setState({
      data:null,
      error,
      status:'end'
    })
  }
  const sendHttp=useCallback<PromiseFn<K,T>>((params: K)=>{
    if(state.status === 'end'){
      setState({
        data:null,
        error:null,
        status:'start'
      })
    }
    const fn = fetchRef.current
    if(!fn || typeof fn !== 'function'){
      throw new Error('useAsync必传返回promise的函数')
    }
    const p = fetchRef.current(params)
    if(!p.then || typeof p.then !== 'function'){
      throw new Error('useAsync必传返回promise的函数')
    }
    return p.then((data)=>{
      setData(data)
      return Promise.resolve(data)
    }).catch(err=>{
      setError(err)
      return Promise.reject(err)
    })
  },[state])
  return {
    isLoading:state.status !== 'end',
    isError:state.error,
    setData,
    setError,
    sendHttp,
  }
}
export default  useAsync
```
