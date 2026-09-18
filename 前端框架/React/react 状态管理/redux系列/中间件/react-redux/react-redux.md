# react-redux

[https://github.com/zalmoxisus/redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension "https://github.com/zalmoxisus/redux-devtools-extension")       react store  谷歌插件

`react-redux` 为 `redux` 解决了什么问题： 为什么要用`redux `？

- **监听state的变化然后进行render**
- **每次都要引入store，并且明文使用**

提供了两个api，仅此而已：( 其他的均是redux提供的 ）

- **Provider 为后代组件提供store**
- **connect 为组件提供数据和变更方法（自动render并且把值以属性的方法传给我）**
