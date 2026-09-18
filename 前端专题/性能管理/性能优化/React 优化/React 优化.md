# React 优化

## 目录

- [SCU 优化](#SCU-优化)
- [Immutable 不可变数据](#Immutable-不可变数据)
  - [一、是什么](#一是什么)
  - [二、如何使用](#二如何使用)
  - [三、在React中应用](#三在React中应用)

# SCU 优化

shouldComponentUpdate方法

1. 缩短SCU方法的执行时间(或者不执行)。
2. 没必要的渲染，SCU应该返回false。

使用浅比较，也可以使用PureComponent代替。实际项目中，往往需要使用复杂的深比较，可以考虑使用([Immutable.js](https://facebook.github.io/immutable-js/ "Immutable.js"))

通过SCU返回false，我们避免了无谓的渲染。但是，

我们还是调用了1000次TodoItem的SCU方法，这也是一笔不小的性能开支。

是否可以不用调用呢？通过合理地规划组件粒度，可以做到：

![  ](1356058faca64d0d05fb8b36180090b7_k3S-SrG1bk.png "  ")

输入信息时触发变化的text这个state值，被下放到AddItem组件来管理，因此不会导致兄弟组件（TodoItem）的重新渲染。&#x20;

# Immutable 不可变数据

## 一、是什么

Immutable，不可改变的，在计算机中，即指一旦创建，就不能再被更改的数据&#x20;

对 Immutable对象的任何修改或添加删除操作都会返回一个新的 Immutable对象&#x20;

Immutable 实现的原理是 Persistent Data Structure（持久化数据结构）:&#x20;

- 用一种数据结构来保存数据
- 当数据被修改时，会返回一个对象，但是新的对象会尽可能的利用之前的数据结构而不会对内存造成浪费

也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变

，同时为了避免 deepCopy把所有节点都复制一遍带来的性能损耗，Immutable 使用了 Structural Sharing（结构共享）&#x20;

如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享&#x20;

一图胜千言：

![  ](2b4c801a7b40eefcd4ee6767fb984fdf_ypttyWSqex.gif "  ")

## 二、如何使用

使用Immutable对象最主要的库是immutable.js

immutable.js 是一个完全独立的库，无论基于什么框架都可以用它&#x20;

其出现场景在于弥补 Javascript 没有不可变数据结构的问题，通过 structural sharing来解决的性能问题&#x20;

内部提供了一套完整的 Persistent Data Structure，还有很多易用的数据类型，如Collection、List、Map、Set、Record、Seq，其中：&#x20;

- List: 有序索引集，类似 JavaScript 中的 Array&#x20;
- Map: 无序索引集，类似 JavaScript 中的 Object&#x20;
- Set: 没有重复值的集合&#x20;

主要的方法如下：&#x20;

- fromJS()：将一个js数据转换为Immutable类型的数据
- toJS()：将一个Immutable数据转换为JS类型的数据
- is()：对两个对象进行比较

```javascript 
 const obj = Immutable.fromJS({a:'123',b:'234'})
import { Map, is } from 'immutable'
const map1 = Map({ a: 1, b: 1, c: 1 })
const map2 = Map({ a: 1, b: 1, c: 1 })
map1 === map2   //false
Object.is(map1, map2) // false
is(map1, map2) // true
```


- get(key)：对数据或对象取值&#x20;
- getIn(\[]) ：对嵌套对象或数组取值，传参为数组，表示位置&#x20;

```javascript 
 let abs = Immutable.fromJS({a: {b:2}});
abs.getIn(['a', 'b']) // 2
abs.getIn(['a', 'c']) // 子级没有值

let arr = Immutable.fromJS([1 ,2, 3, {a: 5}]);
arr.getIn([3, 'a']); // 5
arr.getIn([3, 'c']); // 子级没有值

```


- set(key,value)
- setIn(\[],value) 对嵌套对象和数组赋值

```javascript 
 const foo = fromJS({a: {b: 1}});
       const  bar = foo.setIn(['a', 'b'], 2);   // 使用 setIn 赋值
        console.log(foo.getIn(['a', 'b']));  // 使用 getIn 取值，打印 1
        console.log(foo === bar);  //  打印 false
        const test = fromJS({a:'2'})
        const test2 =test.set('a',3)
        console.log(test.get('a'),test2.get('a'),test === test2,test2.equals(test))
```


- mergeDeep
- merge
- updateIn

```javascript 
 const { fromJS } = require('immutable');
const nested = fromJS({ a: { b: { c: [3, 4, 5] } } });

const nested2 = nested.mergeDeep({ a: { b: { d: 6 } } });
// Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 6 } } }
const nested5 = nested.merge({ a: { b: { d: 6 } ,e:7} });
// Map { a: Map { b: Map {  d: 6,e:7 } } }
console.log(nested2.getIn(['a', 'b', 'd'])); // 6

const nested3 = nested2.updateIn(['a', 'b', 'd'], value => value + 1);
console.log(nested3);
// Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 7 } } }

const nested4 = nested3.updateIn(['a', 'b', 'c'], list => list.push(6));
// Map { a: Map { b: Map { c: List [ 3, 4, 5, 6 ], d: 7 } } }
```


## 三、在React中应用

使用 Immutable可以给 React 应用带来性能的优化，主要体现在

减少渲染的次数

在做react性能优化的时候，为了避免重复渲染，我们会在shouldComponentUpdate()中做对比，当返回true执行render方法&#x20;

Immutable通过is方法则可以完成对比，而无需像一样通过深度比较的方式比较&#x20;

在使用redux过程中也可以结合Immutable，不使用Immutable前修改一个数据需要做一个深拷贝&#x20;

```javascript 
 import '_' from 'lodash';

const Component = React.createClass({
  getInitialState() {
    return {
      data: { times: 0 }
    }
  },
  handleAdd() {
    let data = _.cloneDeep(this.state.data);
    data.times = data.times + 1;
    this.setState({ data: data });
  }
}
使用 Immutable 后：
getInitialState() {
  return {
    data: Map({ times: 0 })
  }
},
  handleAdd() {
    this.setState({ data: this.state.data.update('times', v => v + 1) });
    // 这时的 times 并不会改变
    console.log(this.state.data.get('times'));
  }

```


同理，在redux中也可以将数据进行fromJS处理&#x20;

```javascript 
 import * as constants from './constants'
import {fromJS} from 'immutable'
const defaultState = fromJS({ //将数据转化成immutable数据
    home:true,
    focused:false,
    mouseIn:false,
    list:[],
    page:1,
    totalPage:1
})
export default(state=defaultState,action)=>{
    switch(action.type){
        case constants.SEARCH_FOCUS:
            return state.set('focused',true) //更改immutable数据
        case constants.CHANGE_HOME_ACTIVE:
            return state.set('home',action.value)
        case constants.SEARCH_BLUR:
            return state.set('focused',false)
        case constants.CHANGE_LIST:
            // return state.set('list',action.data).set('totalPage',action.totalPage)
            //merge效率更高，执行一次改变多个数据
            return state.merge({
                list:action.data,
                totalPage:action.totalPage
            })
        case constants.MOUSE_ENTER:
            return state.set('mouseIn',true)
        case constants.MOUSE_LEAVE:
            return state.set('mouseIn',false)
        case constants.CHANGE_PAGE:
            return state.set('page',action.page)
        default:
            return state
    }
}
```
