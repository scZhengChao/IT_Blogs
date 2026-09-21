# vue 源码

[笔记\_vue04\_源码串讲【瑞客论坛 www.ruike1.com】.pdf](<https://github.com/scZhengChao/IT_Blogs/releases/download/assets-v1/_vue04_.www.ruike1.com._tq82UwVeG7.pdf> "笔记_vue04_源码串讲【瑞客论坛 www.ruike1.com】.pdf")

[笔记\_vue05\_源码串讲2【瑞客论坛 www.ruike1.com】.pdf](<https://github.com/scZhengChao/IT_Blogs/releases/download/assets-v1/_vue05_.2.www.ruike1.com._YHBluE95tg.pdf> "笔记_vue05_源码串讲2【瑞客论坛 www.ruike1.com】.pdf")

```纯文本 
 数据劫持  没有你想的那么简单 ； 但是大体原理是相同 ； 
 
 export const fu = ()=>{}   //导出 
 
 更高级的导出:（vue就是这么做的） 
     export * from 'shared/util' 
     export * from './lang' 
     export * from './env' 
     export * from './options' 
     export * from './debug' 
     export * from './props' 
     export * from './error' 
     export * from './next-tick' 
     export { defineReactive } from '../observer/index' 
      
 vue 非常善于模块化 和 各种导出 善于用while do 循环 
 
 next-tick 的实现 ： 有重要 设计宏观任务；微观任务； 浏览器渲染； 
 
 patching算法 
 patch将新老VNode节点进行比对（diﬀ算法），然后根据比较结果进行小量DOM操作，而不是将整个视图根据 新的VNode重绘 
 
 diﬀ算法：通过同层的树节点进行比较而非对树进行逐层搜索遍历的方式，同层级只做三件事：增删改。具体规则 是：new VNode不存在就删；old VNode不存在就增；都存在就比较类型，类型不同直接替换、类型相同执行更 新
```
