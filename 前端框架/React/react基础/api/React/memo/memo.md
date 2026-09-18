# memo

## 目录

- [React.memo](#Reactmemo)

# React.memo

```react tsx 
 const MyComponent = React.memo(function MyComponent(props) {
  /* 使用 props 渲染 */
});
```


      React.memo 为[高阶组件](https://react.docschina.org/docs/higher-order-components.html "高阶组件")。它与 [React.PureComponent](https://react.docschina.org/docs/react-api.html#reactpurecomponent "React.PureComponent")非常相似，但只适用于函数组件，而不适用 class 组件。

&#x20;     \*\*React.memo ****仅检查 props 变更****。如果函数组件被 React.memo 包裹，且其实现中有 \*\*[**useState**](https://react.docschina.org/docs/hooks-state.html "useState")\*\*或 \*\*[**useContext**](https://react.docschina.org/docs/hooks-reference.html#usecontext "useContext")**的 Hook，当 context 发生变化时，它仍会重新渲染。**

           默认情况下**其只会对复杂对象做浅层对比，**如果你想**要控制对比过程**，那么请将**自定义的比较函数通****过第二个参数传入来实现****。**

```react tsx 
function MyComponent(props) {
  /* 使用 props 渲染 */
}
 function areEqual(prevProps, nextProps) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
}
 export default React.memo(MyComponent, areEqual);
```


与 class 组件中 [shouldComponentUpdate()](https://react.docschina.org/docs/react-component.html#shouldcomponentupdate "shouldComponentUpdate()")方法不同的是，**如果 props 相等，areEqual 会返回 true；如果 props 不相等，则返回 false。这与 shouldComponentUpdate 方法的返回值相反。**
