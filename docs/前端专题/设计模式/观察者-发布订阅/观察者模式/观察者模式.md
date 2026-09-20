# 观察者模式

## 目录

- [场景：](#场景)
  - [二](#二)

定义：**当一个对象的状态发生变化时，所有依赖于他的对象都将得到通知**

实现：指定一个发布者，给发布者添加一个缓存列表，**列表用于存放回调函数以便通知订阅者，** 发布者发布消息的时候，会遍历这个缓存列表，触发里面存放的订阅者回调函数

# 场景：

```纯文本 
//订阅消息
 myDiv.addEventListener( 'click' , function(){
    console.log( "myDiv被点击了" )
});
 //发布消息
 myDiv.click();
```


简单实现 (ES6)：

```typescript 
//发布者(售楼处)
 class SalesOffices{
    constructor(){
         //缓存列表(售楼花名册)
         this.clientList = [];
    }
     //订阅函数(订阅售楼消息)
     listen(fn){
        this.clientList.push(fn);
    }
     //发布函数(发布售楼消息)
     trigger(){
         //遍历花名册，给他们发消息
         for(var i= 0 ;i<this.clientList.length;i++){
            var fn = this.clientList[i];
            fn.apply(this,arguments);
        }
    }
}
 //实例化
 var salesOffices = new SalesOffices();
 //小明订阅售楼消息
 salesOffices.listen(function(price){
    console.log( "小明"  + price);
});
 //小红订阅售楼消息
 salesOffices.listen(function(price){
    console.log( "小红"  + price);
});
 //售楼处发布售楼消息
 salesOffices.trigger( "你好，今天的房价为2万一平！" );
 //打印结果:
 小明你好 ， 今天的房价为2万一平 ！ 
小红你好 ， 今天的房价为2万一平 ！
```


## 二

```typescript 
class Observerd{
constructor() {
    // 我要看看到底有多少人在观察俺
    this.observerList = []
  }
  addObserver(observer) {
    // 添加一个观察俺的人
    this.observerList.push(observer)
  }
  notify() {
    // 我要闹点动静，所有观察者都会知道这个信息，具体怎么做就是他们自己的事情了
    this.observerList.forEach(observer => observer.update())
  }
}


class Observer{
constructor(doSome) {
    // 观察到小白鼠有动静之后，观察者做的事情
    this.doSome = doSome
  }
  update() {
    console.log(this.doSome)
  }
}

const ob1 = new Observer('我是ob1，我观察到小白鼠有反应了，太饿了，我得去吃个饭了')
const ob2 = new Observer('我是ob2，我观察到小白鼠有反应了，我要继续工作！')
const xiaoBaiShu = new Observerd()
xiaoBaiShu.addObserver(ob1)
xiaoBaiShu.addObserver(ob2)
xiaoBaiShu.notify() // .... .
```
