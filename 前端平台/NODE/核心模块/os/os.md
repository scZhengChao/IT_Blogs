# os

## 目录

- [os](#os)
  - [获取本机ip4：](#获取本机ip4)

# os

```typescript 
//查看系统的总内存和闲置内存
var format = function (bytes) {
    return (bytes / 1024 / 1024 /1024).toFixed(2) + ' GB';
};
var total = os.totalmem() // 系统的总内存
var free = os.freemem()  // 闲置内存10g
console.log(format(total),format(free))

输出: 15.89 GB  10.06 GB   可以看出系统的总内存16g ；当前闲置内存10g
 



```


## 获取本机ip4：

```typescript 
const getIPAdress = ()=>{
    var interfaces = require('os').networkInterfaces();
    let IPV4 = null
    Object.values(interfaces).flat().forEach(item=>{
        if(item.family === 'IPv4' && item.address !== '127.0.0.1' && !item.internal){
            if(IPV4) return
            IPV4 = item.address
        }
    })
    console.log(IPV4)
    return IPV4
}
```
