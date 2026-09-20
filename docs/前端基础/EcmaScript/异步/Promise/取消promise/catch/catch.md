# catch

## 目录

- [取消Promise](#取消Promise)

## 取消Promise

```javascript 
  let p = new Promise((resolve,reject)=>{
      console.log('1111111111111----')
      setTimeout(()=>{
          console.log('2222222222------')
          resolve(2)
      },3000)
      throw 'asgasg'
      console.log('3333333---------------')
  }).catch(e=>{

  })


```


![](image_OJoU65nlFm.png)

- \*抛出错误 必须catch; \*
- 注意：传给 Promise的函数不能加async；必须是同步函数
