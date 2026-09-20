# Motion

在 React 中实现动画效果，Motion\[12] 是最佳选择。它支持声明式动画，易于理解，对各种手势的支持也很出色，还具备共享布局动画等高级功能，无论是简单的过渡效果，还是复杂的动画设计，它都能完美胜任。

[   https://motion.ant.design/api/queue-anim](https://motion.ant.design/api/queue-anim "   https://motion.ant.design/api/queue-anim")

动画
&#x20;   css tansition
&#x20;   CSSTransition/CSSTransitionGroup 官网推荐
&#x20;   ant.desinge动画  √
&#x20;       [https://motion.ant.design/api/queue-anim](https://motion.ant.design/api/queue-anim "https://motion.ant.design/api/queue-anim")
&#x20;       QueueAnim:进退场动画  组件
&#x20;       QueueAnim组件内部的 一级元素&& 进退场,做动画
&#x20;       一级元素要有key，根据编号依次做动画,无key不动画
&#x20;       包裹路由组件无效(一级元素&& 进退场)
