# Promise

## 目录

- [判断Promise](#判断Promise)

## 判断Promise

```typescript 
判断:
    a instanceof  Promise     // true     常用来判断 promis
    typeof promise         //object  new 之后   typeof promise === object
    typeof Promise         //function  没有new 之前
    

var {then} = p2
then.call(p2,(res)=>{  //一定要call执行, 否证prototype 找不到this
    console.log(res)
})
```


[用例](./用例/index.md "用例")

[手写源码](./手写源码/index.md "手写源码")

[中断promise](./中断promise/index.md "中断promise")

[取消promise](./取消promise/index.md "取消promise")
