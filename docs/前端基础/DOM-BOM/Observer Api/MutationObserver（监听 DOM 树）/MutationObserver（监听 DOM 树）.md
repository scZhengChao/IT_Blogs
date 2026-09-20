# MutationObserver（监听 DOM 树）

## 目录

- [样例](#样例)
- [兼容性](#兼容性)
- [Api介绍：](#Api介绍)
- [options：](#options)
- [MutationRecord ：](#MutationRecord-)
  - [disconnect](#disconnect)
  - [takeRecords](#takeRecords)
  - [2.api  observe方法](#2api-observe方法)
    - [2.1MutationRecord](#21MutationRecord)
  - [3.示例](#3示例)

> 注意：在`transform` 的 scale 的 z 有这个参数值为0；和没有这个参数；效果一样；但是会不停的触发这个回调

# 样例

MutationObserver**观察DOM树，监听DOM的变化**。

```javascript 
// 选择要观察突变的节点
const targetNode = document.getElementById('element');
// 观察者的选项（观察哪些突变）
const config = {   attributes: true,   childList: true,   subtree: true, };
// 创建一个观察者实例，链接到一个回调，以便在观察到突变时执行。
const observer = new MutationObserver((mutations, observer) => {   
      mutations.forEach(mutation => {    
        if (mutation.type === 'childList') {       
            console.log('A child node has been added or removed.');    
         } else if (mutation.type === 'attributes') {      
           console.log(`The ${mutation.attributeName} attribute was modified.`);    
         }  
      });
});
// 开始观察目标节点的配置突变情况
observer.observe(targetNode, config);
// 之后，你可以停止观察
observer.disconnect();
```


       当一个**元素的属性、文本或内容发生变化时，我们会得到通知，同时也会****监控子节点是否被添加或删除****。**这对于**调整DOM中元素的大小以及重置DOM值特别有用。**

# 兼容性

            Mutation Observer 是在DOM4中定义的，用于替代 mutation events 的新API，它的不同于events的是，所有监听操作以及相应处理都是在**其他脚本执行完成之后异步执行**的，并且是所以变动触发之后，将变得记录在数组中**统一进行回调的，**

也就是说，当你使用observer监听多个DOM变化时，并且这若干个DOM发生了变化，那么observer会将变化记录到变化数组中，等待一起都结束了，然后一次性的从变化数组中执行其对应的回调函数。

![  ](3b6916d0e7758721558eed9ffbdffcfd_QTxXcy10B7.png "  ")

[https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver "https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver"). mdn 地址

`MutationObserver`是一个构造器，接受一个callback参数，用来处理节点变化的回调函数，返回两个参数，

- mutations：节点变化记录列表（sequence\<MutationRecord>）
- observer：构造MutationObserver对象。

```javascript 
var observe = new MutationObserver(function(mutations,observer){  })
```


# Api介绍：

MutationObserver对象有三个方法，分别如下：

1. observe：设置观察目标，接受两个参数，target：观察目标，options：通过对象成员来设置观察选项
2. disconnect：阻止观察者观察任何改变
3. takeRecords：清空记录队列并返回里面的内容

# options：

1. childList：设置true，表示观察目标子节点的变化，比如添加或者删除目标子节点，不包括修改子节点以及子节点后代的变化
2. attributes：设置true，**表示观察目标属性的改变**
3. characterData：设置true，表示观察目标数据的改变
4. subtree：设置为true，目标以及目标的后代改变都会观察
5. attributeOldValue：如果属性为true或者省略，则相当于设置为true，表示需要记录改变前的目标属性值，设置了attributeOldValue可以省略attributes设置
6. characterDataOldValue：如果characterData为true或省略，则相当于设置为true,表示需要记录改变之前的目标数据，设置了characterDataOldValue可以省略characterData设置
7. attributeFilter：如果不是所有的属性改变都需要被观察，并且attributes设置为true或者被忽略，那么设置一个需要观察的属性本地名称（不需要命名空间）的列表

# MutationRecord ：

1. type：如果是属性变化，返回"attributes"，如果是一个CharacterData节点（Text节点、Comment节点）变化，返回"characterData"，节点树变化返回"childList"
2. target：返回影响改变的节点
3. addedNodes：返回添加的节点列表
4. removedNodes：返回删除的节点列表
5. previousSibling：返回分别添加或删除的节点的上一个兄弟节点，否则返回null
6. nextSibling：返回分别添加或删除的节点的下一个兄弟节点，否则返回null
7. attributeName：返回已更改属性的本地名称，否则返回null
8. attributeNamespace：返回已更改属性的名称空间，否则返回null
9. oldValue：返回值取决于type。对于"attributes"，它是更改之前的属性的值。对于"characterData"，它是改变之前节点的数据。对于"childList"，它是null

其中 type、target**这两个属性不管是哪种观察方式都会有返回值，其他属性返回值与观察方式有关**，比如只有当attributeOldValue或者characterDataOldValue为true时oldValue才有返回值，只有改变属性时，attributeName才有返回值等。

## disconnect

disconnect方法是用来阻止观察的，当你不再想观察目标节点的变化时可以调用**observe.disconnect()方法来取消观察。**

## takeRecords

takeRecords方法是用来取出记录队列中的记录。它的一个作用是，比如你对一个节点的操作你不想马上就做出反应，过段时间在显示改变了节点的内容。

## 2.api  observe方法

        MutationObserver使用observe方法进行监听指定的元素节点变化，MutationObserver使用observe方法进行监听指定的元素节点变化，

observe方法接受两个参数：

```javascript 
 mutationObserver.observe（target，props）
```


\*\*      DOM 每次发生变化，就会生成一条变动记录（MutationRecord 实例）。该实例包含了与变动相关的所有信息。\*\* ​**Mutation Observer 处理的就是一个个MutationRecord实例所组成的数组。**

### 2.1MutationRecord

MutationRecord对象包含了DOM的相关信息，有如下属性：

    type：观察的**变动类型**（attribute、characterData或者childList）。

    target：发生**变动的DOM节点**。

    addedNodes：**新增的DOM节点**。

    removedNodes：**删除的DOM节点**。

    previousSibling：**前一个同级节点**，如果没有则返回null。

    nextSibling：**下一个同级节点**，如果没有则返回null。

    attributeName：**发生变动的属性。如果设置了attributeFilter，则只返回预先指定的属性。**

    oldValue：**变动前的值。这个属性只对attribute和characterData变动有效，如果发生childList变动，则返回null**。

## 3.示例

```javascript 
 var mutationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        console.log(mutation);
        // type: "attributes"
        // target: input#text2
        // addedNodes: NodeList []
        // removedNodes: NodeList []
        // previousSibling: null
        // nextSibling: null
        // attributeName: "data-count"
        // attributeNamespace: null
        // oldValue: "0"
    });
});
mutationObserver.observe(document.documentElement, {
    attributes: true,    //属性的变动
    characterData: true,// 节点内容或节点文本的变动
    childList: true,  //子节点的变动（指新增，删除或者更改）
    subtree: true,     //表示是否将该观察器应用于该节点的所有后代节点
    attributeOldValue: true,//表示观察attributes变动时，是否需要记录变动前的属性值
    characterDataOldValue: true ,//表示观察characterData变动时，是否需要记录变动前的值
    //attributeFilter:['class','src','value']   表示需要观察的特定属性
}); 
```
