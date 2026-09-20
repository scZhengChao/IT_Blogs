# watch

```纯文本 
 var vm = new Vue({ 
   data: { 
     a: 1, 
     b: 2, 
     c: 3, 
     d: 4, 
     e: { 
       f: { 
         g: 5 
       } 
     } 
   }, 
   watch: { 
     a: function (val, oldVal) { 
       console.log('new: %s, old: %s', val, oldVal) 
     }, 
     // 方法名 
     b: 'someMethod', 
     // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深 
     c: { 
       handler: function (val, oldVal) { /* ... */ }, 
       deep: true 
     }, 
     // 该回调将会在侦听开始之后被立即调用 
     d: { 
       handler: 'someMethod', 
       immediate: true 
     }, 
     // 你可以传入回调数组，它们会被逐一调用 
     e: [ 
       'handle1', 
       function handle2 (val, oldVal) { /* ... */ }, 
       { 
         handler: function handle3 (val, oldVal) { /* ... */ }, 
         /* ... */ 
       } 
     ], 
     // watch vm.e.f's value: {g: 5} 
     'e.f': function (val, oldVal) { /* ... */ } 
   } 
 }) 
 vm.a = 2 // => new: 2, old: 1
```
