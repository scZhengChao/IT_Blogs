# 手写系列一

## 目录

- [event事件总线、发布订阅 ](#event事件总线发布订阅-)
- [sleep](#sleep)

[前端手写系列\_sayid760的博客-CSDN博客 js原生类效果 https://blog.csdn.net/qq\_14993375/article/details/110422952](https://blog.csdn.net/qq_14993375/article/details/110422952 "前端手写系列_sayid760的博客-CSDN博客 js原生类效果 https://blog.csdn.net/qq_14993375/article/details/110422952")

# event事件总线、发布订阅&#x20;

```javascript 
 /* cache = {'event1': [_on, fun2], 'event2': [fun1, fun2]}
    注册：往某个属性，添加函数
    注册一次：把_on函数push到某个属性中，_on只要被emit一次，就在数组中删除
    移除：delete某个属性，或者某个属性对应value值的某个元素
    发布emit：找出某个属性对应的value值，把它们都遍历出来执行
*/
class Event{
  constructor(){
    this.cache = {}
  }
  // 注册监听
  on(eventType, func){
    // 判断是否已存在某个属性，存在就直接插入监听函数，否则先创建空数组，再插入函数
    (this.cache[eventType]||(this.cache[eventType]=[])).push(func)
  }
  /* 监听一次，把之前注册的先移除掉，再注册
    往数组中push的是_on函数，当_on函数被执行，就移除这个函数
  */
  once(eventType, func){
    function _on(){
      func.apply(this, arguments)
      this.off(eventType, _on)
    }
    this.on(eventType, _on)
  }
  // 移除监听，移除某个数组或者某个数组中的一个元素
  off(eventType, func){
    // 根据传入参数，判断是整个移除，还是移除某属性的一个
    if(func){
      const stack = this.cache[eventType]
      if(stack && stack.length>0){
      /*  for(let i=0; i<stack.length;i++){
          if(stack[i]==func){
            console.log(stack[j])
            stack.splice(i, 1)
            break
          }
        }*/
        const index = stack.findIndex((f) => f === fn )
        if (index >= 0) stack.splice(index, 1)
      }
    }else{
      delete this.cache[eventType]
    }
  }
  // 发布订阅通知
  emit(eventType, ...args){
    // 可以考虑创建副本，避免回调函数内继续注册相同事件，会造成死循环this.cache[eventType].slice() 
    const stack = this.cache[eventType] 
    if(stack && stack.length>0){
      stack.forEach(item=> item.apply(this, args) )
    }
  }
}

const ge = new Event()
function fun1(a, b){
    console.log(a, b, a + b)
    return a + b
}
ge.once('event1', fun1)
ge.emit('event1', 1, 2)
// ge.off('event1', fun1)
ge.emit('event1', 1, 2)
```


# sleep

sleep()可以将一个线程睡眠，参数可以指定一个时间

wait()可以将一个线程挂起，直到超时或者该线程被唤醒            &#x20;

```javascript 
 const sleep = function(time){
    const startTime = new Date().getTime() + parseInt(time, 10)
    // 不停的while循环，制造阻塞
    while(new Date().getTime() < startTime){}
}
// 测试
function fn(){
    sleep(3000)
    console.log('2222222')
}
fn()
```
