# error 对象

## 目录

- [序列化stringify](#序列化stringify)

# 序列化stringify

```javascript 
try {
    throw new Error('asgasg')
  }catch (e) {

    let data= JSON.stringify(e, Object.getOwnPropertyNames(e),2)
    console.log(data)
  }
```
