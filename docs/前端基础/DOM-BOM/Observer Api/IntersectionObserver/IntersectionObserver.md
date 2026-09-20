# IntersectionObserver

## 目录

- [兼容性](#兼容性)

> IntersectionObserver

&#x20;           IntersectionObserver API 是用来**监视某****个元素是****否滚动进了浏览器窗口的可视区域（视口）或者滚动进了它的某个祖先元素的可视区域内。**（一定是**滚动的情况；其他情况下不可取**）

它的主要功能是用来实现**延迟加载和展现量统计**。

[http://www.ruanyifeng.com/blog/2016/11/intersectionobserver\_api.html](http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html "http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html")    阮一峰大神的文档

[https://www.cnblogs.com/ziyunfei/p/5558712.html](https://www.cnblogs.com/ziyunfei/p/5558712.html "https://www.cnblogs.com/ziyunfei/p/5558712.html")   [紫云飞](https://www.cnblogs.com/ziyunfei/ "紫云飞")  大神（这个大神讲的很清楚，这个是真大神）

# **兼容性**

**主要在 Safari 上兼容性较差，需要 12.2 及以上才兼容，不过还好，有 polyfill 可食用。**

[https://github.com/w3c/IntersectionObserver/tree/master/polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill "https://github.com/w3c/IntersectionObserver/tree/master/polyfill")

网上已经出了

**`<script src="https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver"></script>`**\*\*  ie11 是没问题的\*\*​

![  ](e5e0e162c88b942e7c7ea30d448a34c5_6LV4eCPlnU.png "  ")

&#x20;       一直以来，**检测元素的可视状态或者两个元素的相对可视状态**都不是件容易事。传统的各种方案不但复杂，而且性能成本很高，比如需要监听滚动事件，然后查询 DOM , 获取元素高度、位置，计算距离视窗高度等等。

    这就是 Intersection Observer 要解决的问题。它为开发人员提供一种便捷的新方法来**异步查询元素**相对于**其他元素或视窗**的位置，**消除了昂贵的 DOM 查询和样式读取成本。**

IntersectionObserver观察一个DOM元素的可见性，监听其位置的变化。

api：

```javascript 
var observer = new IntersectionObserver(callback,options);

// 选择要观察突变的节点 
const targetNode = document.getElementById('element'); 
// 观察者的选项（观察哪些突变） 
const config = {   rootMargin: '-100% 0px 0px 0px', }; 
// 创建一个观察者实例，链接到一个回调，以便在观察到突变时执行。 
const intersectionObserver = new IntersectionObserver((entries, observer) => {   
      entries.forEach(entry => {    
           if (entry.isIntersecting) {       
                console.log('Observing.');       
                // 之后，你可以停止观察       
                observer.unobserve(entry.target);    
           }   
      }); 
  }); 

// 开始观察 
intersectionObserver.observe(targetNode, config);
```


这在**基于目标元素的可见性和位置的懒惰加载和动画内容方面非常有用。**

***

[api讲解](api讲解.md "api讲解")

[特殊特例](特殊特例.md "特殊特例")

[应用场景](IT/前端基础/DOM-BOM/Observer%20Api/IntersectionObserver/应用场景/应用场景.md "应用场景")
