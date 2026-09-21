# hashchange与popstate

## 目录

- [hashchange与popstate的比较](#hashchange与popstate的比较)

# hashchange与popstate的比较

\*\*    hashchange与popstate事件都是windowAPI，两者都是HTML5中的API，\*\* ​

    在支持H5的浏览器中，有一个**window\.onpopstate**事件，该事件可以监听如下操作：

        1. **点击浏览器的前进按钮/后退按钮**

        2. **执行js代码:history.go(n) / history.forward() / history.back()**

    相对而言**popstate**比hashchange更为强大。能出发hashchange的都能触发popstate注意这两种历史**记录管理都受同源策略的限**制，这里厘清下两者的区别以及相关应用：

```javascript 
  // 改写
    function handleHistoryState(type) {
        var historyState = window.history[type]
        return  function () {
            var rv = historyState.apply(this, arguments)  //触发原本的history【type】事件

            // var e = new Event(type.toLowerCase())  // 自定义事件
            // e.arguments = arguments  // 赋值
            // window.dispatchEvent(e)  // 触发事件

            // window.onpopstate(arguments)

            //创建 事件并且 触发
            const event = new Event('popstate')
            window.dispatchEvent(event);
            return rv
        }
    };
    // 替换
    window.history.pushState = handleHistoryState('pushState')
    window.history.replaceState = handleHistoryState('replaceState')
    //监听
    window.addEventListener('popstate',function(){
        console.log('addEventListener: popstate')
    })
   window.addEventListener('hashchange',function(){  
     // 不用监听； 
    // 能出发hashchange的都能触发popstate
      console.log('hashchange')
    },false)
```


改写 pushState  和 replaceState

[index.html](https://github.com/scZhengChao/IT_Blogs/releases/download/assets-v1/index_L73Zh75Gc0.html "index.html")
