# 循环删除数组元素，解决导致因为下标变化出现问题

```react tsx 
let length = routes.length
    while(length--) {
      const item = routes[length]
      if (item.authCode && !authCode.includes(item.authCode[0])) {
        routes.splice(length, 1)
      } else {
        if (item.routes) {
          composeRouteHandle(item.routes)
        }
      }
    }
```


> 其执行过程如下：
> forEach()第一次循环，寻找数组中的第一个元素，发现arr\[0]==1后，立即执行删除操作，数组arr变成\[2,3,1];
> forEach()第二次循环，寻找数组中的第二个元素即arr\[1]，而此时我们发现arr\[0]并没有被遍历到，也就因此newarr数组中缺少了2这个元
