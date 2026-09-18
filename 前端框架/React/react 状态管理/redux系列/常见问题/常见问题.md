# 常见问题

## 目录

- [connect无法获取ref实例](#connect无法获取ref实例)
  - [解决方案](#解决方案)

## connect无法获取ref实例

[combineReducers-Redux 中文文档(Redux in Chinese) combineReducers,Redux 中文文档,Redux in Chinese https://www.cntofu.com/book/4/docs/api/combineReducers.md](https://www.cntofu.com/book/4/docs/api/combineReducers.md "combineReducers-Redux 中文文档(Redux in Chinese) combineReducers,Redux 中文文档,Redux in Chinese https://www.cntofu.com/book/4/docs/api/combineReducers.md")

使用redux重构项目时，遇到了一个小问题：当使用connect连接forwardRef的函数组件时，无法获取组件实例，后台报错：

> Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?

### 解决方案

通过搜索发现connect的第四个属性可以解决此问题，传入{forwardRef: true}即可（class组件为{withRef:true}）,如下:

```javascript 
 export default connect(mapStateToProps,mapDispatchToProps,null,{forwardRef: true})(AiMap);
```
