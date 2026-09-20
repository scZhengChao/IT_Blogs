# 竟态问题

![](./assets/image/image_iBgSAX6XgB.png)

再进一步说明问题

按钮A按了之后，ajax请求的数据显示在input type=text框里，B按钮也是。

问题就是如果先按A，此时ajax发出去了，但是数据还没返回来, 我们等不及了，马上按B按钮，结果此时A按钮请求的数据先回来，这就尴尬了，按的B按钮，结果先显示A按钮返回的数据，怎么解决？

这个问题可以**在在A按钮按了之后，再按B按钮的时候，取消a按钮发出的请求，这个ajax和fetch都是有方法实现的，ajax原生自带cancel方法，fetch的话要自己写一下，大概思路如下（如何取消fetch）**

```javascript 
function abortableFetch(request, opts) {
  const controller = new AbortController();
  const signal = controller.signal;

  return {
    abort: () => controller.abort(),
    ready: fetch(request, { ...opts, signal })
  };
}

```


别看上面封装的挺不错的，但是用起来还是有点麻烦，而且耦合性有点高，因为我要在B按钮的`onClick`事件里面去调用A按钮的`abort`方法。

好了，我们基于`rxjs`来写一个通用的处理方案（**要说函数间的解耦，发布订阅模式有点万能的感觉**，rxjs的`new Subject`也是一样的思想）

```javascript 
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// 假设这是你的http请求函数
function httpGet(url: any): any {
  return new Promise(resolve =>
    setTimeout(() => resolve(`Result: ${url}`), 2000)
  );
}

class abortableFetch {
  search: Subject<any>;
  constructor() {
    this.search = new Subject();
    this.init();
  }
  init() {
    this.search
      .pipe((switchMap as any)((value: any): any => httpGet(value)))
      .subscribe(val => console.log(val));
  }

  trigger(value) {
    this.search.next(value);
  }
}

// 使用方式，非常简单，就一个trigger方法就可以了
const switchFetch = new abortableFetch();

switchFetch.trigger(123);
setTimeout(() => {
  switchFetch.trigger(456);
}, 1000);


```


请注意此案例控制台**输出的是456而不是123，因为456后输出把之前的123覆盖了，相当于取消了之前的请求**

操作符：`switchMap`
