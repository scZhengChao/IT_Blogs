# children

## 目录

- [Children](#Children)
  - [map](#map)
  - [给props.children传参](#给propschildren传参)
  - [forEach](#forEach)
  - [count](#count)
  - [only](#only)
  - [toArray](#toArray)

# Children

### map

```react tsx 
React.Children.map(children, function[(thisArg)] )

<SafeAreaView style={style} edges={['right', 'bottom', 'left']}>
            {React.Children.map(children, child => child)}
 </SafeAreaView>

```


### 给props.children传参

```react tsx 
React.Children.map(this.props.children, child => {
     return React.cloneElement(child, {
        params: () => {}  // your props  
     });
 })
```


### forEach

```react tsx 
 React.Children.forEach(children, function[(thisArg)])
```


与 [React.Children.map()](https://zh-hans.reactjs.org/docs/react-api.html#reactchildrenmap "React.Children.map()")类似，但它不会**返回一个数组。**&#x20;

### count

```react tsx 
 React.Children.count(children)
```


 返回 children中的组件总数量，等同于通过 map或 forEach调用回调函数的次数。

### only

```react tsx 
 React.Children.only(children)
```


验证 **children是否只有一个子节点（一个 React 元素），如果有则返回它，否则此方法会抛出错误**。

注意：
React.Children.only() 不接受 [React.Children.map()](https://zh-hans.reactjs.org/docs/react-api.html#reactchildrenmap "React.Children.map()")的返回值，因为它是一个数组而并不是 React 元素。

### toArray

```react tsx 
 React.Children.toArray(children)
```


将 children 这个复杂的数据结构以数组的方式扁平展开并返回，并为每个子节点分配一个 key。**当你想要在渲染函数中操作子节点的集合时，它会非常实用**，特别是当你想要在\*\*向下传递 this.props.children 之前对内容重新排序或获取子集时。 \*\*

注意：

React.Children.toArray() 在拉平展开子节点列表时，更改 key 值以保留嵌套数组的语义。也就是说，toArray 会为返回数组中的每个 key 添加前缀，以使得每个元素 key 的范围都限定在此函数入参数组的对象内。
