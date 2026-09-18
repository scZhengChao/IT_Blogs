# vue

worker 线程 ；多线程

&#x20;  实际使用

[  https://blog.csdn.net/lansezhaji/article/details/88655717%C2%A0](https://blog.csdn.net/lansezhaji/article/details/88655717%C2%A0 "  https://blog.csdn.net/lansezhaji/article/details/88655717%C2%A0")

    阮一峰全面教程

[Web Worker 使用教程 - 阮一峰的网络日志  http://www.ruanyifeng.com/blog/2018/07/web-worker.html](http://www.ruanyifeng.com/blog/2018/07/web-worker.html "Web Worker 使用教程 - 阮一峰的网络日志  http://www.ruanyifeng.com/blog/2018/07/web-worker.html")

可以用于前端埋点，处理复杂的数据但是，还是有很多的限制 ，不完善

```javascript 
 export default {
  install:function(Vue,options){
    function work(){
      self.onmessage = function(e){
        console.log(e.data)
        let type = e.data.type
        if(type == '1'){
            let sum = 0,num = e.data.data;
            for(var i=1;i<=num;i++){
                sum += i
            }
            postMessage(sum);
        }else if(type == '2'){
          postMessage(e.data.data)
        }  
      }
    }
    const code = work.toString();
    const blob = new Blob(["(" + code + ")()"]);
    let worker = new Worker(URL.createObjectURL(blob))
      // this.worker = new WebWorker(work)
    Vue.prototype.worker = worker
  }
}
```


自己的demo

```javascript 
使用：
<template>
  <div>
     <h1>Web Workers</h1>
      <input type="button" @click="someEvent" value="worker">
      <input type="button" @click="someEvent2" value="worker2"><br/>
      {{like}}
      <input type="button" @click="changeMixin" value="mixin数据是否是响应式">
  </div>
</template>
<script>
// 方法三 推荐  见api中的worker.js
import mixin from '../mixin'
export default {
  name:'worker',
  data(){return {
    name:'abc'
  }},
  mounted(){
    this.worker.onmessage = function(res){
        console.log("累加结果 : ",res.data)
    }
  },
  mixins:[mixin],
  created(){
    this.do()
  },
  methods:{
    someEvent(){
      this.worker.postMessage({type:1,data:1000000000})
    },
    someEvent2(){
      this.worker.postMessage({type:2,data:20})
    },
    changeMixin(){
      this.like = 'afasfa'
    }
  }
}
</script>
<style>
  
</style>
api：
export default {
  install:function(Vue,options){
    function work(){
      self.onmessage = function(e){
        console.log(e.data)
        let type = e.data.type
        if(type == '1'){
            let sum = 0,num = e.data.data;
            for(var i=1;i<=num;i++){
                sum += i
            }
            postMessage(sum);
        }else if(type == '2'){
          postMessage(e.data.data)
        }  
      }
    }
    const code = work.toString();
    const blob = new Blob(["(" + code + ")()"]);
    let worker = new Worker(URL.createObjectURL(blob))
      // this.worker = new WebWorker(work)
    Vue.prototype.worker = worker
  }
}

main.js:
    // 方法三 推荐
import Worker from '@/api/worker'
Vue.use(Worker)
```
