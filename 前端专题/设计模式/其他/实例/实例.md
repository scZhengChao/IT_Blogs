# 实例

很简单； 

工厂 == 》 流水线似的  ==》 源源不断的产出一些标准产品 ===》 不同的输入返回不同的标准实列

```纯文本 
 // router.js 
 import Vue from 'vue' 
 import Router from 'vue-router' 
 import Index from './components/Index' 
 import Kkb from './components/Kkb' 
 Vue.use(Router) 
 export function createRouter () { 
      return new Router({ 
          routes: [ 
                {path:"/",component:Index }, 
                {path:"/kkb",component:Kkb }, 
                // ... 
                ] 
           }) 
      }
```
