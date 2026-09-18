# 监听ajax 时间

```javascript 
  var send =  XMLHttpRequest.prototype.send
  XMLHttpRequest.prototype.send = function(data){
      this.beginStamp = Date.now()
      this.addEventListener('readystatechange',function(){
          if(this.readyState == 4 && this.status === 200){
             var time =  Date.now() - this.beginStamp
              console.log("xhr success; 耗时："+time)
          }else{
              var time =  Date.now() - this.beginStamp
              console.log('xhr failed;耗时：'+time)
          }
      })
      return send.call(this,arguments)
  }
或者
// 监听ajax的状态
   var oldXHR = window.XMLHttpRequest;
  function newXHR() {
      var realXHR = new oldXHR();
      realXHR.addEventListener('abort', function () { ajaxEventTrigger.call(this, 'ajaxAbort'); }, false);
      realXHR.addEventListener('error', function () { ajaxEventTrigger.call(this, 'ajaxError'); }, false);
      realXHR.addEventListener('load', function () { ajaxEventTrigger.call(this, 'ajaxLoad'); }, false);
      realXHR.addEventListener('loadstart', function () { ajaxEventTrigger.call(this, 'ajaxLoadStart'); }, false);
      realXHR.addEventListener('progress', function () { ajaxEventTrigger.call(this, 'ajaxProgress'); }, false);
      realXHR.addEventListener('timeout', function () { ajaxEventTrigger.call(this, 'ajaxTimeout'); }, false);
      realXHR.addEventListener('loadend', function () { ajaxEventTrigger.call(this, 'ajaxLoadEnd'); }, false);
      realXHR.addEventListener('readystatechange', function() { ajaxEventTrigger.call(this, 'ajaxReadyStateChange'); }, false);
      // 此处的捕获的异常会连日志接口也一起捕获，如果日志上报接口异常了，就会导致死循环了。
      // realXHR.onerror = function () {
      //   siftAndMakeUpMessage("Uncaught FetchError: Failed to ajax", WEB_LOCATION, 0, 0, {});
      // }
      return realXHR;
  }
   window.XMLHttpRequest = newXHR;
  //自定义事件 ；不兼容ie 具体的见笔记自定义事件； 
  function ajaxEventTrigger(event) {
      var ajaxEvent = new CustomEvent(event, { detail: this });
      window.dispatchEvent(ajaxEvent);
  }
```
