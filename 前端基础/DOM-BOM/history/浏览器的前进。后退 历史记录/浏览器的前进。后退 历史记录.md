# 浏览器的前进。后退 历史记录

## 目录

- [一.history 对象](#一history-对象)
  - [1.1 API](#11-API)
  - [1.2 实际场景](#12-实际场景)
    - [1.2.1 禁止回退到上一页](#121-禁止回退到上一页)
    - [1.2.2 vue 全屏弹框 模拟 路由跳转](#122-vue-全屏弹框-模拟-路由跳转)

# 一.history 对象

| [back()](https://www.w3school.com.cn/jsref/met_his_back.asp "back()")          | 加载 history 列表中的前一个 URL。 |
| ------------------------------------------------------------------------------ | ----------------------- |
| [forward()](https://www.w3school.com.cn/jsref/met_his_forward.asp "forward()") | 加载 history 列表中的下一个 URL。 |
| [go()](https://www.w3school.com.cn/jsref/met_his_go.asp "go()")                | history.go(-2)          |

## 1.1 API

history.pushState()主要是在不刷新浏览器的情况下，创建新的浏览记录并插入浏览记录队列中。

1. 状态对象（stateObject）--stateObject是一个JavaScript对象，通过pushState方法可以将stateObject内容传递到新页面中。
2. 标题（title）--几乎没有浏览器支持该参数，但是传一个空字符串会比较安全。
3. 地址（url）--新的历史记录条目的地址（可选，不指定的话则为文档当前URL）；浏览器在调用pushState()方法后不会加载该地址；**传入的URL与当前URL应该是同源的，否则，pushState()会抛出异常。**

## 1.2 实际场景

    //说的是向历史记录添加 改变 url&#x20;

**但不会加载 ，**

    //vue spa 就是通过向历史记录添加的机制来控制页面的跳转 这

    //所以，必须在某一个 路由 页面里 比如 created 来进行这个逻辑

### 1.2.1 禁止回退到上一页

```javascript 
 if(window.history && window.history.pushState){
    let stateObj = { //这个可以随意 作为第一个参数就是 hostory对象里的state
        title:'hahah',
    }
    window.addEventListener('popstate',function(){ //后退与前进都会触发这个事件
        window.history.pushState(stateObj,null,'')  // 这个地方的执行顺序 是 先后退 在添加进去 （不会加载，但会作为前进后退的起点）
    // 这两个 二选一都可以
        //window.history.forward(1)    //前进  对于vue 来说可以不要这两个 前进按钮， 因为自带 前进跳转机制
    })
    window.history.pushState(stateObj,null,'')
    //window.history.forward(1)   //前进  对于vue 来说可以不要这两个 前进按钮， 因为自带 前进跳转机制
}
replaceState(stateObj,'',url)
```


### 1.2.2 vue 全屏弹框 模拟 路由跳转

          有这么个场景，全屏的video播放，回退希望回退到没有全屏的时候，而不是退出当前页，这个时候操作history就派上用场了

```javascript 
 //下面是伪代码，不过实际上我操作过，可行的
open（）{
  //弹框打开的时候，
  window.pushState(obj,'',url)
  window.addEventListener('popState',()=>{
    //这个时候就只后退了；不可能前进的
    //关闭当前弹窗，而不是退出当前页面
  })
}
close（）{
  //移除上面的监听
}
//完美解决了 弹框模拟push页面，因为video 要兼容页面，多次点击才行多次执行播放才行，有时候跳转页面不适合当时场景

```
