# EventEmitter

```javascript 
class EventEmitter {
  constructor() {
    this.events = {}; // 用于存储事件及其对应的回调函数列表
  }

  // 订阅事件
  on(eventName, callback) {
    this.events[eventName] = this.events[eventName] || []; // 如果事件不存在，创建一个空的回调函数列表
    this.events[eventName].push(callback); // 将回调函数添加到事件的回调函数列表中
  }

  // 发布事件
  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => {
        callback(data); // 执行回调函数，并传递数据作为参数
      });
    }
  }

  // 取消订阅事件
  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(cb => cb !== callback); // 过滤掉要取消的回调函数
    }
  }
  
  // 添加一次性的事件监听器 
  once(eventName, callback) { 
      const onceCallback = data => { 
          callback(data); // 执行回调函数 
          this.off(eventName, onceCallback); // 在执行后取消订阅该事件 
      }; 
      this.on(eventName, onceCallback); 
  }
}

//  使用
    const emitter = new EventEmitter();

    const callback1 = data => {
      console.log('Callback 1:', data);
    };
   
    const callback2 = data => {
      console.log('Callback 2:', data);
    };
    
    // 添加一次性事件监听器 
    const onceCallback = data => { 
        console.log('Once Callback:', data); 
    };
    
    // 订阅事件
    emitter.on('event1', callback1);
    emitter.on('event1', callback2);
    emitter.once('event1', onceCallback);
    
    // 发布事件
    emitter.emit('event1', 'Hello, world!');

    // 输出：
    // Callback 1: Hello, world!
    // Callback 2: Hello, world!
    // Once Callback: Hello, world!
    
    // 取消订阅事件
    emitter.off('event1', callback1);

    // 发布事件
    emitter.emit('event1', 'Goodbye!');

    // 输出：
    // Callback 2: Goodbye!


```
