# &#x20;Cannot assign to read only property 'isCheck' of object '#\<Object>'

大概理解 的就是 immer 操作 的时候 ，把这个对象 给冻上了 ，别人是不能修改的， 但是 immer 在操作的时候

react 可能 也对 对象 进行 操作了， 这个时候 就报错 ，说不能操作 只读对象

解决方法 是

```typescript 
import {setAutoFreeze} from 'immer';
setAutoFreeze(false)


```


**把冻结禁用就好了 ，但是现在不清楚这么 做的 副作用 后面 在填坑吧**
