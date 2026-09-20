# 性能优化

## 目录

- [throttle](#throttle)
- [IntersectionObserver API](#IntersectionObserver-API)
- [结合方案](#结合方案)

众所周知，所有的scroll问题都逃不过高强度reflow带来的性能压力

解决方法也非常明确——**牺牲平滑度，减少触发次数**

### throttle

在通常情况下，我们可以直接使用节流函数直接来限制触发次数,比如这么做

```javascript 
 // 假设你封装好了一个throttle(func,time)的节流函数
window.addEventListener('scroll', throttle(handleScroll, 20)); 复制代码
```


但这么使用有一个问题。。那就是会出现吸顶时有一定卡顿的情况，就不够润。

那咋办呢？

我们不妨换种思路。。。不**如精确控制handleScroll()函数的触发时机？**

自然我们就想到了 IntersectionObserver API

### IntersectionObserver API

IntersectionObserver API 的使用教程请移步[这里](http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html "这里")

这个api的主要目的是用来判断一个元素是否在可视范围内（并可以控制触发时机）

兼容性：

![  ](./image/bb88b08afa30533a8c6a422d7f3d6720_o69U5bDIlF.png "  ")

不难发现还是有那么一点兼容性问题的。所以我们不如将throttle和IntersectionObserver 方案结合起来使用

### 结合方案

```javascript 
this.flag == false

scrollFunc(e) {
    if( IntersectionObserver ){
        const observer = new IntersectionObserver(function(){
            const offsetTop = e.target.getBoundingClientRect().top;
            if(offsetTop < 0){
                // 吸顶
                this.flag == true
            }else{
                this.flag == false
            }
        }, {
            // 100%时触发回调函数
            threshold: [1]
        });
        observer.observe(e.target);
    } else {
        window.addEventListener('scroll', throttle(()=>{
            let offsetTop = e.target.getBoundingClientRect().top;
            if(offsetTop < 0){
                // 吸顶
                this.flag == true
            }else{
                this.flag == false
            }
        }, 20));
    }
}
```
