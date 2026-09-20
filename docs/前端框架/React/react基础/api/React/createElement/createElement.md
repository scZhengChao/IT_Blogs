# createElement

## 目录

- [语法](#语法)
- [案例](#案例)

# 语法

vnode

```react tsx 
React.createElement(
  type,
  [props],
  [...children]
)

```


React.createElement函数是用于创建并返回指定类型的新 React 元素。

- type参数可以是一个**html标签名称字符串**，也可以是**一个ReactClasss**
- props表示组件的入参即传入组件的属性，
- children表示子组件。

# 案例

```react tsx 
var child1 = React.createElement('li', null, 'First Text Content');
var child2 = React.createElement('li', null, 'Second Text Content');
var child3 = React.createElement('li', null, 'Third Text Content');
var root = React.createElement('ul', { className: 'my-list' }, [child1, child2, child3]);
ReactDOM.render(
    root,
    document.getElementById('content')
);

var cli = React.createClass({
    render:function(){
        return (
                <li>
                {this.props.text}
                </li>
        )
    }
})
var child1 = React.createElement(cli, {key:'F',text:'First Text Content'});
var child2 = React.createElement(cli, {key:'S',text:'Second Text Content'});
var child3 = React.createElement(cli, {key:'T',text:'Third Text Content'});
var root = React.createElement('ul', { className: 'my-list' }, [child1, child2, child3]);
ReactDOM.render(
        root,
        document.getElementById('content')
);

```
