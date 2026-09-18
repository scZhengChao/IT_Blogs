# 对象的方法then

## 目录

- [普通对象](#普通对象)

## 普通对象

**promise.resolve()当传入对象,且对象有then这个key;value为函数时:**

```typescript 
let obj = {
    then:function(a){
        let obj = {
            then:function(b){
                b(80) 
             }
        }
        a(obj) // a就相当于 resolve 函数他会遍历知道不满足条件为止；为啥这么做；见手写详情     
    }
}
let p2 = Promise.resolve(obj)
p2.then(res=>{
    console.log(res) //为a函数传入的对象  80 
})
```
