# render

## 目录

- [条件渲染](#条件渲染)
- [列表渲染](#列表渲染)
- [Modal函数式调用](#Modal函数式调用)

```text 
1、ReactDOM.render函数是整个  React 应用程序首次渲染的入口函数 
2、ReactDOM.render是React的最基本方法用于将 模板转为HTML语言，并插入指定的DOM节点。ReactDOM.render(template,targetDOM)。 
3、该方法接收两个参数：第一个是创建的模板，多个dom元素外层需使 用一个标签进行包裹，第二个参数是插入该模板的目标位置。 
4、ReactDOM.render( JSX写的html模板，dom容器对象);
5、总结：一个react的程序，就是把JSX通过ReactDOM.render()函数渲染到网页上。程序员完成的是JSX的编写。
```


> 注意：会丢失上下文

> antd的表述：直接调用 Modal 方法，antd 会通过 `ReactDOM.render` 动态**创建新的 React 实体**。**其 context 与当前代码所在 context 并不相同，因而无法获取 context 信息**。当你需要 context 信息（例如 ConfigProvider 配置的内容）时，可以通过 `Modal.useModal` 方法会返回 `modal` 实体以及 `contextHolder` 节点。将其插入到你需要获取 context 位置即可：

# 条件渲染

```react tsx 
var sex='女';
if(sex=='男'){
  var sexJSX=<p>我是男的</p>;
}else{
  var sexJSX=<p>我是女的</p>;
}
ReactDOM.render(
  <ul>
    {sexJSX}
  </ul>,
  document.getElementById('box')
);

注意：if语句不要写在单花括号里。

```


# 列表渲染

```react tsx 
//普通for循环

let arr = ["铅笔","油笔","钢笔","毛笔"];
var arr2 =[];
for(let i in arr){
  arr2.push(<li>{arr[i]}</li>);
}

const show = ()=> (
  <ul>{arr2}</ul>
)

ReactDOM.render(show(),document.getElementById("box"));


//map
//案例1
const goods = ['铅笔','钢笔'];
const goodsJSX = goods.map(function(val,index){
  return <li>{val}</li>
});        

ReactDOM.render(
    //以下相当于react里的模板，不能出现js的语句，可以有表达式
  <ul>
    {goodsJSX}
  </ul>,
  document.getElementById('box')
);


//案例2
 var arr = [
        "大学",
        "中庸",
        "孟子",
        "论语"
    ]

let jsxArr = arr.map(book=><li>{book}</li>);

// ReactDOM.render(
//     <div>
//         <ul>
//             {jsxArr}
//         </ul>
//     </div>
//     , document.getElementById("box"));

ReactDOM.render(
    <div>
        <ul>
            {arr.map(book=><li>{book}</li>)}
        </ul>
    </div>
    , document.getElementById("box"));

```


# Modal函数式调用

[Modal（函数式调用）](../../../../../经典效果组件/组件封装/Modal（函数式调用）/index.md "Modal（函数式调用）")
