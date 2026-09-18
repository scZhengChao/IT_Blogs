# buffer相关操作符案例

> 有点感觉像缓存

`bufferTime`： 比如你写一个基于 `websocket` 的在线聊天室，不可能每次 `ws` 收到新消息，都立刻渲染出来，这样在很多人同时说话的时候，一般会有渲染性能问题。。

所以你需要收集一段时间的消息，然后把它们一起渲染出来，例如**每一秒批量渲染一次**。用原生 `JS` 写的话，你需要维护**一个队列池**，和**一个定时器**，收到消息，先**放进队列池，然后定时器负责把消息渲染出来**，类似：

```javascript 
let messagePool = []
ws.on('message', (message) => {
    messagePool.push(message)
})

setInterval(() => {
    render(messagePool)
    messagePool = []
}, 1000)

```


这里已经是最简化的代码了，但逻辑依然很破碎，并且还要考虑清理定时器的问题。如果用 RxJS，代码就好看了很多

```javascript 
import { fromEvent } from 'rxjs';
import { switchMap } from 'rxjs/operators';
 fromEvent(ws, 'message')
     .pipe(bufferTime(1000))
    .subscribe(messages => render(messages))

```


**记录鼠标两秒能点击多少次**

```javascript 
fromEvent(document,'click').pipe(
    bufferTime(2000),
    map(array=>array.length)
).subscribe(count => {
    console.log("两秒内点击次数", count);
  });

```


`bufferCount`: 另外一个例子，比如我们在写一个游戏，当用户连续输入"上上下下左右左右BABA"的时候，就弹出隐藏的彩蛋，用原生 JS 的话也是需要维护一个队列，队列中放入最近12次用户的输入。然后每次按键的时候，都识别是否触发了彩蛋。RxJS 的话就简化了很多，主要是少了维护队列的逻辑：

```javascript 
const code = [
   "ArrowUp",
   "ArrowUp",
   "ArrowDown",
   "ArrowDown",
   "ArrowLeft",
   "ArrowRight",
   "ArrowLeft",
   "ArrowRight",
   "KeyB",
   "KeyA",
   "KeyB",
   "KeyA"
]

fromEvent(document, 'keyup').pipe(
   map(e => e.code),
   bufferCount(12, 1)
).subscribe(last12key => {
        if (_.isEqual(last12key, code)) {
            console.log('隐藏的彩蛋 \(^o^)/~')
        }
    })

```


当然 `RxJS` 还可以复杂得多的逻辑，比如**要求只有在两秒内连续输入秘籍，才能触发**彩蛋，这里该怎么写

```javascript 
import { bufferWhen, filter, fromEvent, tap, interval } from 'rxjs';
import * as _ from 'lodash';
import { bufferCount, map, withLatestFrom } from 'rxjs/operators';

const code = ['KeyA', 'KeyB', 'KeyA'];

const secondSource = interval(1000);
fromEvent(document, 'keyup')
  .pipe(
    map((e) => (e as any).code),
    withLatestFrom(secondSource),
    bufferCount(3, 1),
    filter((last3key) => {
      let arr1 = [];
      let arr2 = [];
      last3key.forEach((v) => {
        arr1.push(v[0]);
        arr2.push(v[1]);
      });
      return _.isEqual(arr1, code) && arr2[2] - arr2[0] <= 2;
    })
  )
  .subscribe((last3key) => {
    console.log('last3key', last3key);
  });


```
