# 自定义事件

## 目录

- [自定义派发事件：](#自定义派发事件)
  - [Event](#Event)
  - [CustomEvent](#CustomEvent)
  - [document.createEvent](#documentcreateEvent)
- [封装](#封装)
  - [jq](#jq)
  - [custome](#custome)

# 自定义派发事件：

前言
　　除了浏览器提供的原生事件外，有时我们还需要自定义事件以满足特定的需求，比如小模块之间的通信，传递信息等。JavaScript提供了几种自定义事件的方式：

1. &#x20;Event() 构造函数, 创建一个新的事件对象 Event          ie不支持 　　　　
2. &#x20;CustomEvent()  创建一个自定义事件            支持传递额外字段  ie也不支持 　　　　
3. document.createEvent() 创建一个新的事件（Event）随之必须调用自身的 init 方法进行初始化。       浏览器都支持，ie也支持

## Event

```javascript 
Event()
　语法 ： event = new Event(typeArg, eventInit)
　　typeArg是一个表示事件类型的字符串。
　　eventInit是事件的配置项：
　　　　"bubbles"，可选，Boolean类型，默认值为 false，表示该事件是否冒泡。
　　　　"cancelable"，可选，Boolean类型，默认值为 false， 表示该事件能否被取消。
　　　　"composed"，可选，Boolean类型，默认值为 false，指示事件是否会在阴影根之外
　　自定义事件的监听和原生事件一样；触发的时候通过 targetDom.dispatchEvent(event)触发，看下面的栗子


//用来触发自定义事件
<button type="button" name="button" class="test">点我</button>
var button = document.querySelector('button');


var selfEvent = new Event('self',{
      "bubbles" : true,
      "cancelable" : false,
      "composed" : false
    });
    //监听
    document.addEventListener('self',function(e){
      alert('事件顺利触发啦！')
    })
    //触发
    button.addEventListener('click',function(){
      document.dispatchEvent(selfEvent) //触发自定义事件
    })
 需要注意的是，IE不支持该方法。 
如果自定义事件的时候，需要传递一些额外的字段，这个时候就可以用CustomEvent()
```


## CustomEvent

```javascript 
CustomEvent()
　　和Event()方法类似，不过在创建的时候，CustomEventInit中多了一个detail字段，可以用来传递额外的对象，而且少了composed字段。
        触发和监听都和Event()类似， 而且同样不支持IE 
//IE不支持  可携带数据
    var custom = new CustomEvent('custom',{
      "detail" : {  //可携带额外的数据
        age : 18
      },
      "bubbles" : true,
      "cancelable" : false,
    });

    //监听
    document.addEventListener('custom',function(e){
      console.log(e);
    })

    //触发
    button.addEventListener('click',function(){
      document.dispatchEvent(custom)
    })
```


## document.createEvent

```javascript 
document.createEvent()

　　这种方式已经被官方声明不推荐使用了。但是浏览器都是支持的，IE也都支持
　　document.createEvent('Event') 创建一个自定义事件之后，在触发事件之前一定需要进行初始化。而且要注意只能是document创建，不过使用的时候，所有元素都可以，和之前两种方式一样。
　　初始化事件的时候指定事件名及能否冒泡，能否被阻止等。

//只能是document创建  事件被触发前，必须通过 initEvent( ) 初始化   兼容性好IE支持 但是已废弃
    var create = document.createEvent('Event');
    create.initEvent('create', false, false);

    //监听
    document.addEventListener('create',function(e){
      console.log(e);
    })

    //触发
    button.addEventListener('click',function(){
      document.dispatchEvent(create)
    })

```


# 封装

### jq

```javascript 
 // 绑定自定义事件
 $(element).on('myCustomEvent', function(){});
 // 触发事件
 $(element).trigger('myCustomEvent');
 // 此外，你还可以在触发自定义事件时传递更多参数信息：
 $( "p" ).on( "myCustomEvent", function( event, myName ) {
   $( this ).text( myName + ", hi there!" );
 });
 $( "button" ).click(function () {
   $( "p" ).trigger( "myCustomEvent", [ "John" ] );
 });

```


### custome

兼容IE:

```javascript 
(function(){
    if(typeof window.CustomEvent === 'function') return false
    function CustomEvent(event,params){
        params = params || {bubbles:false,cancelable:false,detail:undefined}
        var evt = document.createEvent('CustomEvent')
        evt.initCustomEvent(event,params.bubbles,params.cancelable,params.detail)
        return evt
    }
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent
})()
// 使用
var event = new CustomEvent('abc'，{detail：'asgasg '})
event.arguments = ['asfa','sfa']
window.addEventListener('abc',function(e){
    console.log(e)
    console.log(e.arguments)
    console.log(e.detail)
})
window.dispatchEvent(event)
```


```typescript 
export function createCustomEvent<T = any>(eventName: string, payload: T): CustomEvent<T> {
  try {
    return new CustomEvent<T>(eventName, { detail: payload });
  } catch {
    const event = document.createEvent('CustomEvent') as CustomEvent<T>;
    event.initCustomEvent(eventName, false, true, payload);
    return event;
  }
}

window.dispatchEvent(createCustomEvent('xxx', payload));

window.addEventListener('xxx', functionA);
window.removeEventListener('xxx', functionA);

```
