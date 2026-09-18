# useRef

## 目录

- [useRef](#useRef)
- [createRef](#createRef)

# useRef

（是hooks一种，一般在**函数组件使用**）

- useRef只会在组件首次渲染时创建

# createRef

createRef（一般用于class组件，获取子组件dom）也可以用于函数；每次调用函数都创建

createRef创建的ref对象，组件每更新一次，ref对象就会被重新创建。

```javascript 
 const ref = useRef<null>(null);
```


- `createRef` 总是返回一个 **不同的** 对象。这相当于你自己编写了 `{ current: null }`。
- 在函数组件中，你可能想要使用 [useRef](https://react.docschina.org/reference/react/useRef "useRef")，因为它始终返回相同的对象。
- `const ref = useRef()` 等同于 `const [ref, _] = useState(() => createRef(null))`
