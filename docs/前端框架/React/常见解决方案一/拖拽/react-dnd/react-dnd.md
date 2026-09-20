# react-dnd

## 目录

- [三个核心点](#三个核心点)
  - [DndProvider组件](#DndProvider组件)
  - [useDrag函数](#useDrag函数)
  - [useDrop函数](#useDrop函数)
- [2.3 monitor详细内容](#23-monitor详细内容)
- [三、效果图](#三效果图)
- [四、学习感悟](#四学习感悟)

安装

```javascript 
npm install react-dnd -S // react-dnd包,其核心包
npm install react-dnd-html5-backend -S // 拖拽的底层实现所需要的
```


### 三个核心点

> 通过使用React DnD这个库，我认为里面最有用的部分包含一个组件和两个Hook API，它们分别是：

1. DndProvider组件
2. useDrag函数
3. useDrop函数

#### DndProvider组件

> 如果想让某一内容使用React DnD的能力，需要将该部分用DndProvider进行包裹，其接收参数如下所示：

- **`backend`**：必填。一个React DnD后端。目前官方文档有三个，分别为：react-dnd-html5-backend、react-dnd-touch-backend、react-dnd-test-backend，但是常用的还是react-dnd-html5-backend。
- **`context`**：可选的。用于配置后端的后端上下文。这取决于后端实现。
- **`options`**：可选的。用于配置后端的选项对象。这取决于后端实现。

> 下面来一起看看该组件的简单使用：

```javascript 
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        此处将放拖拽相关内容
      </DndProvider>
    </div>
  );
}

export default App;
```


#### useDrag函数

> 既然知道了整个操纵空间，接下来需要了解的就是从什么位置进行拖拽，该库提供了useDrag hook API，该元素可以让一个DOM元素实现拖拽效果。

1. 参数

(1) spec：创建规范对象的规范对象或函数，其详细内容如下所示：

1）type;必须，是一个字符串或Symbol，只有drop和此值相同才可以进行放置；

2）item必须，用于描述被拖动的数据

3）previewOptions可选的，一个简单对象，用于描述拖动预览选项；

4）options 可选的，一个简单对象

5）end(item, monitor) 可选的，当拖拽停止，该函数被调用；

6）canDrag(monitor) 可选的，使用它指定当前是否允许拖动；

7）isDragging(monitor)  可选的，默认情况下，只有启动拖动操作的拖动源才被视为拖动；

8）collect 可选的，监听功能

2.返回值

返回值是一个数组，数组内容分别为：

- collected：一个对象，包含从collect函数收集的属性，如果collect未定义函数，则返回一个空对象；
- drag：拖动器的连接器功能，必须附加到DOM的可拖动部分；
- dragPreview:用于拖动预览的连接器功能，可以附加到DOM的预览部分；

1. 与拖动部分建立连接

通过ref属性，将drag或dragPreview绑定到拖拽源上。

下面一起来看看useDrag部分的使用

```javascript 
import {useDrag} from 'react-dnd';

const SourceBox = props => {
    const {children} = props;

    /**
     * 返回的参数
     * collected：一个对象，包含从collect函数收集的属性，如果collect未定义函数，则返回一个空对象
     * drag：拖动器的连接器功能，必须附加到DOM的可拖动部分
     * dragPreview:用于拖动预览的连接器功能，可以附加到DOM的预览部分
     */
    const [collected, drag, dragPreview] = useDrag({
        // 只有drop和此值相同才可以进行放置
        type: 'box',
        // 描述要拖动的数据
        item: {
            detail: '我是可以拖动的数据！！！'
        },
        // 拖动停止的手end将会被调用
        end: (item, monitor) => {
            // getDropResult()获取释放后的结果
            console.log('monitor.getDropResult():', monitor.getDropResult());
            // source是否已经drop在target
            console.log('monitor.didDrop()', monitor.didDrop());
        },
        // 指定当前是否允许拖动，默认允许
        canDrag: monitor => {
            return true;
        },
        // 监听功能
        collect: (monitor, props) => {
            return {
                isDragging: monitor.isDragging()
            };
        }
    });
    return (
        <div ref={drag}>
            {children}
        </div>
    );
};

export default SourceBox;

```


#### useDrop函数

> 为了将内容放置到目标位置，提供了useDrop函数，如下所示：

1. 参数

(1) spec：创建规范对象的规范对象或函数，其详细内容如下所示：

1）accept 必须，一个字符串，此放置目标将仅对于指定类型的拖动源产生的项目作出反应；

2）options可选的，一个普通的对象；

3）drop（item，monitor）可选的，当兼容项目放在目标时被调用；

4）hover（item，monitor）可选的，将项目悬停在组件时调用；

5）canDrop（item，monitor）可选的，用它来指定放置目标是否接受该拖拽内容；

6）collect可选的，监听功能

1. 返回值

返回值是一个数组，数组内容分别为：

- collected：一个对象，包含从collect函数收集的属性，如果collect未定义函数，则返回一个空对象；
- drop：一个用于放置目标的连接器函数，必须附加到DOM的放置部分；

1. 与放置部分建立连接

通过ref属性，将drop与放置部分建立连接。

> 下面一起来看看useDrop部分的使用

```javascript 
import {useDrop} from "react-dnd";

const TargetBox = () => {
    const [collected, drop] = useDrop({
        //  此放置目标将仅对于指定类型的拖动源产生的项目作出反应
        accept: 'box',
        // 当兼容项目放在目标时调用
        drop: (item, monitor) => {
            console.log('我已经被放到目标！！！')
        },
        // 监听功能
        collect: monitor => {
            return {
                // 是否重叠
                isOver: monitor.isOver(),
                // 是否可以放置
                canDrop: monitor.canDrop(),
                item: monitor.getItem(),
                didDrop: monitor.didDrop()
            };
        }
    });

    return (
        <div ref={drop}>
            <div className="targetBox">
                这是放置的区块
            </div>
        </div>
    );
};

export default TargetBox;
```


### 2.3 monitor详细内容

> useDrag和useDrop上挂载了很多选项，这些选项中很多存在monitor对象，该对象上挂载了很多方法，下面就简要概述几个主要方法，如下所示：

1. drag上的monitor上的方法

![](image_tI22TRmJkF.png)

1. drop上的monitor上的方法

![](image_F-NJ1IDYN6.png)

## 三、效果图

1. 拖拽前

![](https://mmbiz.qpic.cn/mmbiz_png/q4qrl2ddrUutgVVy8AbL6F2GmoRAy2VkVFIU9eJuibUanbzicLA6QLyQnuw1Jsh261MLH98BCobs9kacNYlMXxqg/640?wx_fmt=png\&tp=webp\&wxfrom=5\&wx_lazy=1\&wx_co=1)

1. 拖拽中

拖拽中拖拽的内容跟随鼠标移动

![](https://mmbiz.qpic.cn/mmbiz_png/q4qrl2ddrUutgVVy8AbL6F2GmoRAy2VktIGBibLWvOAOt5Cwow7j3WMhVmhkCvOibKrMDtautk8bojDibBL5M1N7g/640?wx_fmt=png\&tp=webp\&wxfrom=5\&wx_lazy=1\&wx_co=1)

1. 拖拽后

拖拽释放鼠标后，一些内容被打印出来，打印的结果是先输出drop中的内容再输出end中的内容，所以我们想做一些处理最后在SourceBox中进行处理，如果在drop中改变React相关的数据会报错。

![](https://mmbiz.qpic.cn/mmbiz_png/q4qrl2ddrUutgVVy8AbL6F2GmoRAy2VkEIFaMzkj6t54qh0gl08P2K9EH7YGhFREFLoXGWMW6Rn5A81nXIglLQ/640?wx_fmt=png\&tp=webp\&wxfrom=5\&wx_lazy=1\&wx_co=1)

## 四、学习感悟

> 这个库的资料千篇一律，在使用过程中遇到了一些坑，接下来与各位老铁分享一下这些坑，防止后续深陷其中。

1. end方法的调用时机晚于drop的调用时机，所以只有在end中做释放后的数据处理才能保证系统的正确性，如果在drop中就更新state或React redux中数据，会引发错误；
2. item数据是从Drag到Drop之间的桥梁，在drag中定义的item数据可以通过monitor.getItem()获取；
3. drop回调的返回值是从Drop到Drag之间的桥梁，在end中可以通过monitor.getDropResult()其返回值；
4. 一些挂载在monitor上的位置函数并不一定适用于所有的场景，需要引入DOM相关的位置操作。
