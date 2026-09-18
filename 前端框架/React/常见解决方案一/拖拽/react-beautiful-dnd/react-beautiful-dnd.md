# react-beautiful-dnd

## 目录

- [简介](#简介)
- [API参数介绍](#API参数介绍)
  - [1. DragDropContext](#1-DragDropContext)
    - [1.1 编码实战](#11-编码实战)
    - [1.2 参数](#12-参数)
      - [1.2.1 Props](#121-Props)
      - [1.2.2 参数列表](#122-参数列表)
    - [1.3 总结](#13-总结)
  - [2. Droppable](#2-Droppable)
    - [2.1 编码实战](#21-编码实战)
    - [2.2 参数](#22-参数)
      - [2.2.1 Droppable props](#221-Droppable-props)
      - [2.2.2 参数列表](#222-参数列表)
      - [2.2.3 参数说明](#223-参数说明)
    - [2.3 Droppable的子函数](#23-Droppable的子函数)
      - [2.3.1 子函数的provided参数](#231-子函数的provided参数)
        - [2.3.1.1 provided: (DroppableProvided)](#2311-provided-DroppableProvided)
    - [2.3.1.2 参数说明](#2312-参数说明)
    - [2.3.1.3 编码实战](#2313-编码实战)
      - [2.3.2 子函数的snapshot参数](#232-子函数的snapshot参数)
        - [2.3.2.1 snapshot: (DroppableStateSnapshot)](#2321-snapshot-DroppableStateSnapshot)
    - [2.3.2.2 编码实战](#2322-编码实战)
    - [2.4 总结](#24-总结)
  - [Draggable](#Draggable)
    - [3.2 参数](#32-参数)
      - [3.2.1 Draggable Props](#321-Draggable-Props)
      - [3.2.2 参数列表
        &#x20; ](#322-参数列表--)
    - [3.2.3 参数说明](#323-参数说明)
    - [3.3 draggable的子函数](#33-draggable的子函数)
      - [3.3.1 子函数的provided参数](#331-子函数的provided参数)
    - [3.3.1.1 provided: (DraggableProvided)](#3311-provided-DraggableProvided)
    - [3.3.1.2 参数说明](#3312-参数说明)
      - [3.3.2 子函数的snapshot参数](#332-子函数的snapshot参数)
        - [3.3.2.1 Snapshot: (DraggableStateSnapshot)](#3321-Snapshot-DraggableStateSnapshot)
    - [3.3.2.2 编码实战](#3322-编码实战)
- [附录](#附录)
  - [参考资料](#参考资料)
  - [相关DEMO](#相关DEMO)
- [](#)

[ demo文档  https://tiandisheng.top/tools/drag#docs-tools-drag-demo-dynamicdrag](https://tiandisheng.top/tools/drag#docs-tools-drag-demo-dynamicdrag " demo文档  https://tiandisheng.top/tools/drag#docs-tools-drag-demo-dynamicdrag")

[ 基于react的拖拽组件库react-beautiful-dnd API参数简易说明-CSDN博客 文章浏览阅读3w次，点赞14次，收藏50次。简介react-beautiful-dnd基于react的一个组件库,主要包含三个组件.DragDropContext : 用于包装拖拽根组件，Draggable和Droppable都需要包裹在DragDropContex内Droppable 用于包装你需要拖动的组件，使组件能够被拖拽（make it draggable）Draggable 用于包装接收 https://blog.csdn.net/tianxintiandisheng/article/details/107109890](https://blog.csdn.net/tianxintiandisheng/article/details/107109890 " 基于react的拖拽组件库react-beautiful-dnd API参数简易说明-CSDN博客 文章浏览阅读3w次，点赞14次，收藏50次。简介react-beautiful-dnd基于react的一个组件库,主要包含三个组件.DragDropContext : 用于包装拖拽根组件，Draggable和Droppable都需要包裹在DragDropContex内Droppable 用于包装你需要拖动的组件，使组件能够被拖拽（make it draggable）Draggable 用于包装接收 https://blog.csdn.net/tianxintiandisheng/article/details/107109890")

## 简介

`react-beautiful-dnd`基于react的一个[组件库](https://so.csdn.net/so/search?q=组件库\&spm=1001.2101.3001.7020 "组件库"),主要包含三个组件.

- **DragDropContext** : 用于包装拖拽根组件，Draggable和Droppable都需要包裹在`DragDropContext`内
- **Droppable** 用于包装你需要拖动的组件，使组件能够被拖拽（make it draggable）
- **Draggable** 用于包装接收拖拽元素的组件，使组件能够放置（dropped on it）

## API参数介绍

### 1. DragDropContext

为了使用拖放功能，您需要将`React`希望使用拖放功能的树的部分包装在中`<DragDropContext />`。建议仅将整个应用程序包装在`<DragDropContext />>`。

有嵌套`<DragDropContext />`的是\_不\_支持的。您将能够达到你想要的条件拖放使用的道具`<Droppable />`和`<Draggable />`。

您可以认为`<DragDropContext />`其目的与[react-redux Provider组件](https://react-redux.js.org/api/provider "react-redux Provider组件")相似。如果提供，则将内容安全保护随机数属性添加到注入的样式标签中。

#### 1.1 编码实战

```javascript 
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

class App extends React.Component {
  onBeforeCapture = () => {
    /*...*/
  };

  onBeforeDragStart = () => {
    /*...*/
  };

  onDragStart = () => {
    /*...*/
  };
  onDragUpdate = () => {
    /*...*/
  };
  onDragEnd = () => {
    // the only one that is required
  };

  render() {
    return (
      <DragDropContext
        onBeforeCapture={this.onBeforeCapture}
        onBeforeDragStart={this.onBeforeDragStart}
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <div>Hello world</div>
      </DragDropContext>
    );
  }
}

```


#### 1.2 参数

##### 1.2.1 Props

```javascript 
type Responders = {|
  // optional
  onBeforeCapture?: OnBeforeCaptureResponder
  onBeforeDragStart?: OnBeforeDragStartResponder,
  onDragStart?: OnDragStartResponder,
  onDragUpdate?: OnDragUpdateResponder,
  // required
  onDragEnd: OnDragEndResponder,
|};

import type { Node } from 'react';

type Props = {|
  ...Responders,
  // We do not technically need any children for this component
  children: Node | null,
  // Read out by screen readers when focusing on a drag handle
  dragHandleUsageInstructions?: string,
  // Used for strict content security policies
  nonce?: string,
  // Used for custom sensors
  sensors?: Sensor[],
  enableDefaultSensors?: ?boolean,
|};

```


##### 1.2.2 参数列表

| 参数                | 是否必要 | 类型       | 说明      |
| ----------------- | ---- | -------- | ------- |
| onBeforeCapture   | 否    | function | 在捕获之前   |
| onBeforeDragStart | 否    | function | 在拖动开始之前 |
| onDragStart       | 否    | function | 在拖动开始时  |
| onDragUpdate      | 否    | function | 在拖动变化时  |
| onDragEnd         | 是    | function | 在拖动结束时  |

#### 1.3 总结

- `<DragDropContext />` 是总体的包装
- `<DragDropContext />` 用于包装拖拽根组件，Draggable和Droppable都需要包裹在DragDropContex内
- `<DragDropContext />` 不支持嵌套
- 必须设置`<DragDropContext />` 的onDragEnd钩子函数(拖拽后的数组重新排序操作在这里进行)

### 2. Droppable

`<Droppable />` 用于包装你需要拖动的组件，使组件能够被拖拽.

#### 2.1 编码实战

```javascript 
import { Droppable } from 'react-beautiful-dnd';

<Droppable droppableId="droppable-1" type="PERSON">
  {(provided, snapshot) => (
    <div
      ref={provided.innerRef}
      style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
      {...provided.droppableProps}
    >
      <h2>I am a droppable!</h2>
      {provided.placeholder}
    </div>
  )}
</Droppable>;

```


#### 2.2 参数

##### 2.2.1 Droppable props

```javascript 
import type { Node } from 'react';

type Props = {|
  // required
  droppableId: DroppableId,
  // optional
  type?: TypeId,
  mode?: DroppableMode,
  isDropDisabled?: boolean,
  isCombineEnabled?: boolean,
  direction?: Direction,
  ignoreContainerClipping?: boolean,
  renderClone?: DraggableChildrenFn,
  getContainerForClone?: () => HTMLElement,
  children: (DroppableProvided, DroppableStateSnapshot) => Node,
|};

type DroppableMode = 'standard' | 'virtual';
type Direction = 'horizontal' | 'vertical';

```


##### 2.2.2 参数列表

| 参数                      | 是否必传 | 数据类型    |
| ----------------------- | ---- | ------- |
| droppableId             | 是    | string  |
| type                    | 否    | string  |
| isDropDisabled          | 否    | boolean |
| isCombineEnabled        | 否    | boolean |
| direction               | 否    | string  |
| ignoreContainerClipping | 否    | boolean |
| mode                    | 否    |         |
| renderClone             | 否    |         |
| getContainerForClone    | 否    |         |

##### 2.2.3 参数说明

- droppableId: 必要的参数
- type: 可用于仅接受指定的类。总是从定义它们的继承type。 例如，如果您使用type=“person”，那么它将只允许将类型“person”的放到自身上。type=‘task’的将不能被拖放到type为‘person’的上。如果没有提供类型，它将被设置为“DEFAULT”。
- isDropDisabled: 一个控制列表中的所有拖放是否能够被组合的标志。它将默认为false。
- direction : 项目流动的方向。选项有 `"vertical"` (默认)和 `"horizontal"`。
- ignoreContainerClipping : 当`<Droppable />`在一个可滚动容器内，它的区域是受限制的，所以你只能在`<Droppable />`的部分上，你可以看到。设置此道具可以避免这种行为，允许您在`<Droppable />`上的任何位置放下，即使它在视觉上被可滚动的父元素隐藏。默认的行为适用于大多数情况，所以你可能永远不需要使用这个道具，但是如果你有很长的`<Draggable />`在一个短滚动容器中，它会很有用。请记住，如果在同一页面上的滚动容器中有多个`<Droppable />`，则可能会导致一些意想不到的行为。
- mode : `standard` (默认) or `virtual`。 用于将列表指定为虚拟列表。虚拟列表模式详情参考官方文档。
- renderClone : 用于在发生拖拽时渲染拖拽<可拖拽/>的克隆(替换)。有关使用细节，请参阅我们的reparenting指南。虚拟列表必须使用克隆。您可以不使用虚拟列表而使用克隆
- getContainerForClone : 在拖动过程中返回克隆的包含元素(父元素)的函数。请参阅我们的 [reparenting guide](https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/reparenting.md "reparenting guide") 。

#### 2.3 Droppable的子函数

`<Droppable />`的React子节点必须是返回react元素的函数

```javascript 
<Droppable droppableId="droppable-1">
  {(provided, snapshot) => ({
    /*...*/
  })}
</Droppable>

```


该函数有两个参数:

##### 2.3.1 子函数的provided参数

###### 2.3.1.1 `provided: (DroppableProvided)`

```javascript 
import type { Node } from 'react';

type DroppableProvided = {|
  innerRef: (?HTMLElement) => void,
  droppableProps: DroppableProps,
  placeholder: ?Node,
|};

type DroppableProps = {|
  // used for shared global styles
  'data-rbd-droppable-context-id': ContextId,
  // Used to lookup. Currently not used for drag and drop lifecycle
  'data-rbd-droppable-id': DroppableId,
|};
```


#### 2.3.1.2 参数说明

- provided.innerRef : 为了使droppable正确运行，您必须绑定所提供的。innerRef指向ReactElement中尽可能高的DOM节点。这样做是为了避免使用ReactDOM查找DOM节点。
- provided.placeholder :用于在拖动过程中根据需要在< Droppable />中创建空格。当用户拖动非主列表的列表时，需要此空间。请确保将占位符放在您提供ref的组件中。我们需要增加本身的大小。
- provided.droppableProps (DroppableProps) :这是一个包含需要应用于可删除元素的属性的对象。它需要应用到与应用`provided.innerRef`相同的元素。它目前包含用于样式化和查找的数据属性。

#### 2.3.1.3 编码实战

```javascript 
<Droppable droppableId="droppable-1">
  {(provided, snapshot) => (
    <div ref={provided.innerRef} {...provided.droppableProps}>
      Good to go
      {provided.placeholder}
    </div>
  )}
</Droppable>

```


##### 2.3.2 子函数的snapshot参数

###### 2.3.2.1 `snapshot: (DroppableStateSnapshot)`

```javascript 
type DroppableStateSnapshot = {|
  // Is the Droppable being dragged over?
  // Is the Droppable being dragged over?
  isDraggingOver: boolean,
  // What is the id of the draggable that is dragging over the Droppable?
  // Is the Droppable being dragged over?
  draggingOverWith: ?DraggableId,
  // What is the id of the draggable that is dragging from this list?
  // Useful for styling the home list when not being dragged over
  // What is the id of the draggable that is dragging from this list?
  // Useful for styling the home list when not being dragged over
  draggingFromThisWith: ?DraggableId,
  // Whether or not the placeholder is actively being used.
  // This is useful information when working with virtual lists
  // (See our virtual list pattern)
  // Whether or not the placeholder is actively being used.
  // This is useful information when working with virtual lists
  // (See our virtual list pattern)
  isUsingPlaceholder: boolean,
|};

```


#### 2.3.2.2 编码实战

`children`函数还提供了与当前拖动状态相关的少量状态。这可以选择性地用于增强组件。一个常见的用例是在拖动`<Droppable />`时改变其外观。

```javascript 
<Droppable droppableId="droppable-1">
  {(provided, snapshot) => (
    <div
      ref={provided.innerRef}
      style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
      {...provided.droppableProps}
    >
      I am a droppable!
      {provided.placeholder}
    </div>
  )}
</Droppable>

```


#### 2.4 总结

- `<Droppable />` 可以作为`<Draggable />`和`<DragDropContext />`的子组件。
- `<Draggable />`必须包含在`<Droppable />` 中，即`<Draggable />`只能作为`<Droppable />` 的子组件

### Draggable

`<Draggable />` -用于包装接收拖拽元素的组件，使组件能够放置.

`<Draggable />`组件可以被拖放到`<Droppable />`上。`<Draggable />`必须始终包含在`< drop ppable />`中。可以对一个`<Draggable />`在其父 `<Droppable />`内重新排序，或者移动到另一个`<Droppable />`。这是可能的，因为`<Droppable />`可以自由地控制它允许什么被丢弃在它上面。

每个`<Draggable />`都有一个拖动句柄。拖动句柄是用户为了拖动`<Draggable />`而与之交互的元素。一个拖动句柄可以是`<Draggable />`元素本身，或者是`<Draggable />`的子元素。注意，默认情况下，拖放句柄不能是交互元素，因为事件处理程序在嵌套的交互元素上被阻塞。将可访问性的适当语义添加到拖动句柄元素中。如果您希望使用交互式元素，必须设置`disableInteractiveElementBlocking`。

```javascript 
import { Draggable } from 'react-beautiful-dnd';

<Draggable draggableId="draggable-1" index={0}>
  {(provided, snapshot) => (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <h4>My draggable</h4>
    </div>
  )}
</Draggable>;

```


#### 3.2 参数

##### 3.2.1 Draggable Props

```javascript 
import type { Node } from 'react';

type Props = {|
  // required
  draggableId: DraggableId,
  index: number,
  children: DraggableChildrenFn,
  // optional
  isDragDisabled: ?boolean,
  disableInteractiveElementBlocking: ?boolean,
  shouldRespectForcePress: ?boolean,
|};

```


##### 3.2.2 参数列表&#xA; &#x20;

| 参数                                | 是否必传 | 数据类型    |
| --------------------------------- | ---- | ------- |
| draggableId                       | 是    | string  |
| index                             | 是    | string  |
| isDragDisabled                    | 否    | boolean |
| disableInteractiveElementBlocking | 否    | boolean |
| shouldRespectForcePress           | 否    | boolean |

#### 3.2.3 参数说明

- draggableId :一个\_需要\_`DraggableId(string)`唯一标识的`Draggable`为应用程序. 请不要更改此 Props - 特别是在拖动时
- index: 一个需要number它与Draggable的顺序相匹配在Droppable里面. 它只是简单的索引Draggable在列表中. 该index在一个内部需要是唯一的Droppable, 但不需要是唯一的Droppables. 通常情况下index价值将是简单的index由Array.prototype.map函数提供; **必须唯一;必须连续**。\[0,1,2]而不是\[1,2,8]
- isDragDisabled: 默认false，一个可选标志，用于控制是否允许Draggable拖动
- disableInteractiveElementBlocking: 选择退出以阻止来自交互式元素的拖动的标志。欲了解更多信息，请参阅节内的交互式子元素`<Draggable />`
- shouldRespectForcePress :\_拖动手柄\_是否应遵守强制按动交互。请参阅[强制按下](https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/draggable.md#force-press "强制按下")。

#### 3.3 draggable的子函数

`<Draggable/>`的React子节点必须是返回react元素的函数。

```javascript 
<Draggable draggableId="draggable-1" index={0}>
  {(provided, snapshot) => (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      Drag me!
    </div>
  )}
</Draggable>

```


```javascript 
type DraggableChildrenFn = (
  DraggableProvided,
  DraggableStateSnapshot,
  DraggableRubric,
) => Node;

```


**该子函数包含三个参数**

##### 3.3.1 子函数的provided参数

#### 3.3.1.1 provided: (DraggableProvided)

```javascript 
type DraggableProvided = {|
  innerRef: (HTMLElement) => void,
  draggableProps: DraggableProps,
  // will be null if the draggable is disabled
  dragHandleProps: ?DragHandleProps,
|};

```


#### 3.3.1.2 参数说明

- provided.innerRef (innerRef: (HTMLElement) => void):为了使`<Draggable />`正确运行，必须将innerRef函数绑定到ReactElement，您希望将其视为`<Draggable />`节点。这样做是为了避免使用ReactDOM查找DOM节点。
- provided.draggableProps: 这是一个包含数据属性和内联样式的对象。此对象需要应用于将innerRef应用于的同一节点。它控制可拖动控件在拖动和不拖动时的移动。欢迎您添加自己的样式到DraggableProps-style -但请不要删除或替换任何属性
- provided.dragHandleProps: 这是用来拖动整个`<Draggable />`的。这个节点通常与`<Draggable />`相同，但有时也可能是`<Draggable />`的子节点。拖柄道具需要应用到您想要作为拖柄的节点。这是一些需要应用到`<Draggable />`节点的道具。最简单的方法是将道具分散到可拖动节点上`({…provider . draghandleprops})`。但是，如果你还需要回复他们，也欢迎你给这些道具打补丁。当isDragDisabled被设置为true时，DragHandleProps将为null。

##### 3.3.2 子函数的snapshot参数

###### 3.3.2.1 Snapshot: (DraggableStateSnapshot)

```javascript 
type DraggableStateSnapshot = {|
  // Set to true if a Draggable is being actively dragged, or if it is drop animating
  // Both active dragging and the drop animation are considered part of the drag
  // *Generally this is the only property you will be using*
  isDragging: boolean,
  // Set to true if a Draggable is drop animating. Not every drag and drop interaction
  // as a drop animation. There is no drop animation when a Draggable is already in its final
  // position when dropped. This is commonly the case when dragging with a keyboard
  isDropAnimating: boolean,
  // Information about a drop animation
  dropAnimation: ?DropAnimation
  // What Droppable (if any) the Draggable is currently over
  draggingOver: ?DroppableId,
  // the id of a draggable that you are combining with
  combineWith: ?DraggableId,
  // if something else is dragging and you are a combine target, then this is the id of the item that is dragging
  combineTargetFor: ?DraggableId,
  // There are two modes that a drag can be in
  // 'FLUID': everything is done in response to highly granular input (eg mouse)
  // 'SNAP': items snap between positions (eg keyboard);
  mode: ?MovementMode,
|};

```


#### 3.3.2.2 编码实战

children函数还提供了与当前拖动状态相关的少量状态。这可以选择性地用于增强组件。一个常见的用例是在拖动`<Draggable />`时改变它的外观。注意:如果你想把光标变成像grab这样的东西，你需要把拖拽样式添加进去。(参见扩展上面的“DraggableProps-style”)

```javascript 
<Draggable draggableId="draggable-1" index={0}>
  {(provided, snapshot) => {
    const style = {
      backgroundColor: snapshot.isDragging ? 'blue' : 'grey',
      ...provided.draggableProps.style,
    };

    return (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={style}
      >
        Drag me!
      </div>
    );
  }}
</Draggable>

```


## 附录

### 参考资料

[react-beautiful-dnd 官方API文件](https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api "react-beautiful-dnd 官方API文件")

[中文翻译文档](https://links.jianshu.com/go?to=https://github.com/chinanf-boy/react-beautiful-dnd-zh "中文翻译文档")

### 相关DEMO

[基于react-beautiful-dnd的一些拖拽示例](https://tiandisheng.top/tools/drag "基于react-beautiful-dnd的一些拖拽示例")

#

```javascript 
import React, { useState,memo } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`,
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
});

interface DemoProps {

}

const Demo: React.FC<DemoProps> = (props) => {
  const [state, setState] = useState([getItems(10), getItems(5, 10)]);

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    console.log(source,destination,'---destination----')
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter((group) => group.length));
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setState([...state, []]);
        }}
      >
        Add new group
      </button>
      <button
        type="button"
        onClick={() => {
          setState([...state, getItems(1)]);
        }}
      >
        Add new item
      </button>
      <div style={{ display: 'flex' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  {el.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-around',
                            }}
                          >
                            {item.content}
                            <button
                              type="button"
                              onClick={() => {
                                const newState = [...state];
                                newState[ind].splice(index, 1);
                                setState(newState.filter((group) => group.length));
                              }}
                            >
                              delete
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};
Demo.displayName = 'Demo';

export default memo(Demo);


```
