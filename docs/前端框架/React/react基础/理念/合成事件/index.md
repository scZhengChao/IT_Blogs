# 合成事件

## 目录

- [合成事件](#合成事件)
  - [概览](#概览)
  - [事件池](#事件池)
  - [支持的事件](#支持的事件)

# 合成事件

## 概览

           SyntheticEvent 实例将被传递给你的事件处理函数，它是浏览器的原生事件的跨浏览器包装器。除兼容所有浏览器外，它还拥有和浏览器原生事件相同的接口，包括 stopPropagation() 和 preventDefault()。SyntheticEvent 实例将被传递给你的事件处理函数，它是浏览器的原生事件的跨浏览器包装器。除兼容所有浏览器外，它还拥有和浏览器原生事件相同的接口，包括 stopPropagation() 和 preventDefault()。

         如果因为某些原因，当你需要使用浏览器的底层事件时，只需要使用 nativeEvent 属性来获取即可。每个 SyntheticEvent 对象都包含以下属性：

```javascript 
boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
boolean isPropagationStopped()
void persist()
DOMEventTarget target
number timeStamp
string type
```


注意：

截止 v0.14，当事件处理函数返回 false 时，不再阻止事件冒泡。你可以选择使用 e.stopPropagation() 或者 e.preventDefault() 替代。

## 事件池

             SyntheticEvent 是合并而来。这意味着 SyntheticEvent 对象可能会被重用，而且在事件回调函数被调用后，所有的属性都会无效。**出于性能考虑，你不能通过异步访问事件。**

```vue 
 function onClick(event) {
  console.log(event); // => nullified object.
  console.log(event.type); // => "click"
  const eventType = event.type; // => "click"

  setTimeout(function() {
    console.log(event.type); // => null
    console.log(eventType); // => "click"
  }, 0);

  // 不起作用，this.state.clickEvent 的值将会只包含 null
  this.setState({clickEvent: event});

  // 你仍然可以导出事件属性
  this.setState({eventType: event.type});
}
```


注意：

如果你想异步访问事件属性，你需在事件上调用 event.persist()，此方法会从池中移除合成事件，允许用户代码保留对事件的引用。

## 支持的事件

          React 通过将事件 normalize 以让他们在不同浏览器中拥有一致的属性。

&#x20;   以下的事件处理函数在冒泡阶段被触发。如需注册捕获阶段的事件处理函数，则应为事件名添加 Capture。例如，处理

**捕获阶段的点击事件请使用 onClickCapture，而不是 onClick。** 具体实践：[https://react.docschina.org/docs/events.html](https://react.docschina.org/docs/events.html "https://react.docschina.org/docs/events.html")
