# 推荐配置

[ Configuration | MobX中文文档 | MobX中文网 根据你的使用偏好，目标JavaScript引擎以及是否需要MobX达到最佳表现，MobX提供了一系列的配置项。绝大部分配置项都可以使用 configure方法控制。 https://www.mobxjs.com/configuration](https://www.mobxjs.com/configuration " Configuration | MobX中文文档 | MobX中文网 根据你的使用偏好，目标JavaScript引擎以及是否需要MobX达到最佳表现，MobX提供了一系列的配置项。绝大部分配置项都可以使用 configure方法控制。 https://www.mobxjs.com/configuration")

```javascript 
configure({
    enforceActions: "always", // 让你不会忘记使用 action 包裹事件处理函数。
    computedRequiresReaction: true, // 禁止在action或者reaction之外，直接获取未被观察的计算属性的值
    reactionRequiresObservable: true, // 当一个reaction(比如:autorun)被创建时不包含任何observable对象发出警告
    observableRequiresReaction: true, // 当未被观察对象以可观察方式访问时发出警告
    disableErrorBoundaries: true // 通过禁用错误边界处理，异常能够逃逸被捕获
})
```
