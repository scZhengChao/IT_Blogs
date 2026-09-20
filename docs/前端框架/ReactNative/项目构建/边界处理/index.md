# 边界处理

## 目录

- [1. Error bundary](#1-Error-bundary)
- [2.ErrorUtils.setGlobalHandler](#2ErrorUtilssetGlobalHandler)
- [3.Promise 错误](#3Promise-错误)
- [4.react-native-exception-handler](#4react-native-exception-handler)

灵感来源：

[React Native 避免崩溃 最近在做一个RN项目，其中出现了一个崩溃问题，原因是服务端数据结构变更导致RN代码报错“r.includes is not a function”。这么小的问题在浏览器里面不... https://www.jianshu.com/p/580511db9feb](https://www.jianshu.com/p/580511db9feb "React Native 避免崩溃 最近在做一个RN项目，其中出现了一个崩溃问题，原因是服务端数据结构变更导致RN代码报错“r.includes is not a function”。这么小的问题在浏览器里面不... https://www.jianshu.com/p/580511db9feb")

最为开发者；不希望错误引起app 闪退；不说错误收集上报日志；希望运行正常；

# 1. Error bundary

react 本身有他的错误边界处理，详细见react 文档

        但是有缺陷就是只能捕获生命周期里的同步错误，异步错误；和生命周期外的错误；是不能捕获的，好在是框架自带，而且对日志上报，和对错误优雅降级的非常的号

# 2.ErrorUtils.setGlobalHandler

        异步错误，在前后端都是头疼的问题，react-native 提供了global类似windows这样的全局变量，但要谨慎使用避免命名冲突

```javascript 
 global.ErrorUtils.setGlobalHandler(error => {
     console.log('ErrorUtils发现了语法错误，避免了崩溃，具体报错信息：');
     console.log(error.name, error.message, [{ text: 'OK' }])
;}, true);
```


        利用ErrorUtils.setGlobalHandler，我们就可以避免崩溃，统一处理问题这是一种简单的自带的错误捕获方式；

        尽管可以截获全局错误，但如果错误来自于render()函数或者组件的生命周期，你的应用可能也无法从错误状态恢复并继续运行，如果你试图继续运行.

      这个方法主要解决了异步错误；和防止程序闪退，统一处理，但是原生侧的错误，不知道靠不靠谱了

但是问题由来了，好像他只是捕获了console.error的错误，Promise的reject错误；并没有捕获&#x20;

![  ](./image/e1b1a9d7f16a62fd2963b0607735ddec_8E-avfHFNJ.png "  ")

![  ](./image/fba79a4363daa3d349551dbfe1345cd3_wP4tEGxzNz.png "  ")

# 3.Promise 错误

```javascript 
 
if (__DEV__) {
  require('promise/setimmediate/rejection-tracking').enable({
    allRejections: true,
    onUnhandled: (id, error) => {
      const {message, stack} = error;
      const warning =
        `Possible Unhandled Promise Rejection (id: ${id}):\n` +
        (message == null ? '' : `${message}\n`) +
        (stack == null ? '' : stack);
      console.warn(warning);
    },
    onHandled: (id) => {
      const warning =
        `Promise Rejection Handled (id: ${id})\n` +
        'This means you can ignore any previous messages of the form ' +
        `"Possible Unhandled Promise Rejection (id: ${id}):"`;
      console.warn(warning);
    },
  });}
```


             上面都是rn自己处理promise错误的方法；很高级，没有被catch的错误；会被onUnhandled 捕获，两秒后捕获的catch错误；会被onHandled捕获；

这下只剩下native端的

# 4.[react-native-exception-handler](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fmaster-atul%2Freact-native-exception-handler "react-native-exception-handler")

&#x20;待研究，能够捕获native端的错误
