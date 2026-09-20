# react-sortable-hoc

## 目录

- [SortableContainer HOC](#SortableContainer-HOC)
- [SortableElement HOC](#SortableElement-HOC)

[ npm: react-sortable-hoc Set of higher-order components to turn any list into a sortable, touch-friendly, animated list. Latest version: 2.0.0, last published: 2 years ago. Start using react-sortable-hoc in your project by ru https://www.npmjs.com/package/react-sortable-hoc](https://www.npmjs.com/package/react-sortable-hoc " npm: react-sortable-hoc Set of higher-order components to turn any list into a sortable, touch-friendly, animated list. Latest version: 2.0.0, last published: 2 years ago. Start using react-sortable-hoc in your project by ru https://www.npmjs.com/package/react-sortable-hoc")

[ React-Sortable-HOC - 掘金 安装 使用 效果 踩坑 已经排过序的图片无法拖动，未排序的图片拖动报错 页面一加载就报错，无法拖动图片 批量上传图片多次调用接口导致请求canceled 用到的部分API SortableContai https://juejin.cn/post/6956558536273100831](https://juejin.cn/post/6956558536273100831 " React-Sortable-HOC - 掘金 安装 使用 效果 踩坑 已经排过序的图片无法拖动，未排序的图片拖动报错 页面一加载就报错，无法拖动图片 批量上传图片多次调用接口导致请求canceled 用到的部分API SortableContai https://juejin.cn/post/6956558536273100831")

```react 

import { SortableContainer, SortableElement } from "react-sortable-hoc";

// 需要拖动的元素的容器
const SortableItem = SortableElement(() => (
    <div className={style.imgContent}>
                    <PictureList/>   //拖动元素
    </div>
  )
);
// 整个元素排序的容器
const SortableList = SortableContainer(() => {
        return <div>
                    <SortableItem
                        key={`item-${index}`}
                        index={index}
                    />
        </div>
    })
 
 // 拖动排序组件
const SortableComponnet: React.FC<Props> = props => {
    ...
    return <div>
        <SortableList
            distance={5}
            axis={"xy"}
            helperClass={style.helperClass}
            onSortEnd={({ oldIndex, newIndex }) => onPicSortEnd({ oldIndex, newIndex })}
        />
    </div>
}

export default SortableComponnet


```


![](./assets/image/image_MCcn4qxLqS.png)

```react 

import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

const SortableItem = SortableElement(({value}) => <li>{value}</li>);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </ul>
  );
});

class SortableComponent extends Component {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
  };
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({items}) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };
  render() {
    return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
  }
}

render(<SortableComponent />, document.getElementById('root'));


```


# SortableContainer HOC

| Property                          | Type                                                     | Default                                                                                                                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| axis                              | String                                                   | `y`                                                                                                                       | Items can be sorted horizontally, vertically or in a grid. Possible values: `x`, `y` or `xy`                                                                                                                                                                                                                                                                                                                                                                           |
| lockAxis                          | String                                                   |                                                                                                                           | If you'd like, you can lock movement to an axis while sorting. This is not something that is possible with HTML5 Drag & Drop. Possible values: `x` or `y`.                                                                                                                                                                                                                                                                                                             |
| helperClass                       | String                                                   |                                                                                                                           | You can provide a class you'd like to add to the sortable helper to add some styles to it                                                                                                                                                                                                                                                                                                                                                                              |
| transitionDuration                | Number                                                   | `300`                                                                                                                     | The duration of the transition when elements shift positions. Set this to `0` if you'd like to disable transitions                                                                                                                                                                                                                                                                                                                                                     |
| keyboardSortingTransitionDuration | Number                                                   | `transitionDuration`                                                                                                      | The duration of the transition when the helper is shifted during keyboard sorting. Set this to `0` if you'd like to disable transitions for the keyboard sorting helper. Defaults to the value set for `transitionDuration` if undefined                                                                                                                                                                                                                               |
| keyCodes                          | Array                                                    | `{`  `lift: [32],`  `drop: [32],`  `cancel: [27],`  `up: [38, 37],`  `down: [40, 39]}`                                    | An object containing an array of keycodes for each keyboard-accessible action.                                                                                                                                                                                                                                                                                                                                                                                         |
| pressDelay                        | Number                                                   | `0`                                                                                                                       | If you'd like elements to only become sortable after being pressed for a certain time, change this property. A good sensible default value for mobile is `200`. Cannot be used in conjunction with the `distance` prop.                                                                                                                                                                                                                                                |
| pressThreshold                    | Number                                                   | `5`                                                                                                                       | Number of pixels of movement to tolerate before ignoring a press event.                                                                                                                                                                                                                                                                                                                                                                                                |
| distance                          | Number                                                   | `0`                                                                                                                       | If you'd like elements to only become sortable after being dragged a certain number of pixels. Cannot be used in conjunction with the `pressDelay` prop.                                                                                                                                                                                                                                                                                                               |
| shouldCancelStart                 | Function                                                 | [Function](https://github.com/clauderic/react-sortable-hoc/blob/master/src/SortableContainer/index.js#L48 "Function")     | This function is invoked before sorting begins, and can be used to programatically cancel sorting before it begins. By default, it will cancel sorting if the event target is either an `input`, `textarea`, `select`, `option`, or `button`.                                                                                                                                                                                                                          |
| updateBeforeSortStart             | Function                                                 |                                                                                                                           | This function is invoked before sorting begins. It can return a promise, allowing you to run asynchronous updates (such as `setState`) before sorting begins. `function({node, index, collection, isKeySorting}, event)`                                                                                                                                                                                                                                               |
| onSortStart                       | Function                                                 |                                                                                                                           | Callback that is invoked when sorting begins. `function({node, index, collection, isKeySorting}, event)`                                                                                                                                                                                                                                                                                                                                                               |
| onSortMove                        | Function                                                 |                                                                                                                           | Callback that is invoked during sorting as the cursor moves. `function(event)`                                                                                                                                                                                                                                                                                                                                                                                         |
| onSortOver                        | Function                                                 |                                                                                                                           | Callback that is invoked when moving over an item. `function({index, oldIndex, newIndex, collection, isKeySorting}, e)`                                                                                                                                                                                                                                                                                                                                                |
| onSortEnd                         | Function                                                 |                                                                                                                           | Callback that is invoked when sorting ends. `function({oldIndex, newIndex, collection, isKeySorting}, e)`                                                                                                                                                                                                                                                                                                                                                              |
| useDragHandle                     | Boolean                                                  | `false`                                                                                                                   | If you're using the `SortableHandle` HOC, set this to `true`                                                                                                                                                                                                                                                                                                                                                                                                           |
| useWindowAsScrollContainer        | Boolean                                                  | `false`                                                                                                                   | If you want, you can set the `window` as the scrolling container                                                                                                                                                                                                                                                                                                                                                                                                       |
| hideSortableGhost                 | Boolean                                                  | `true`                                                                                                                    | Whether to auto-hide the ghost element. By default, as a convenience, React Sortable List will automatically hide the element that is currently being sorted. Set this to false if you would like to apply your own styling.                                                                                                                                                                                                                                           |
| lockToContainerEdges              | Boolean                                                  | `false`                                                                                                                   | You can lock movement of the sortable element to it's parent `SortableContainer`                                                                                                                                                                                                                                                                                                                                                                                       |
| lockOffset                        | `OffsetValue`\* \| \[`OffsetValue`*, \*\*`OffsetValue`*] | `"50%"`                                                                                                                   | When`lockToContainerEdges`is set to`true`, this controls the offset distance between the sortable helper and the top/bottom edges of it's parent`SortableContainer`. Percentage values are relative to the height of the item currently being sorted. If you wish to specify different behaviours for locking to the *top* of the container vs the *bottom*, you may also pass in an`array`(For example:`["0%", "100%"]`).                                             |
| getContainer                      | Function                                                 |                                                                                                                           | Optional function to return the scrollable container element. This property defaults to the `SortableContainer` element itself or (if `useWindowAsScrollContainer` is true) the window. Use this function to specify a custom container object (eg this is useful for integrating with certain 3rd party components such as `FlexTable`). This function is passed a single parameter (the `wrappedInstance` React element) and it is expected to return a DOM element. |
| getHelperDimensions               | Function                                                 | [Function](https://github.com/clauderic/react-sortable-hoc/blob/master/src/SortableContainer/index.js#L74-L77 "Function") | Optional `function({node, index, collection})` that should return the computed dimensions of the SortableHelper. See [default implementation](https://github.com/clauderic/react-sortable-hoc/blob/master/src/SortableContainer/defaultGetHelperDimensions.js "default implementation") for more details                                                                                                                                                               |
| helperContainer                   | HTMLElement \| Function                                  | `document.body`                                                                                                           | By default, the cloned sortable helper is appended to the document body. Use this prop to specify a different container for the sortable clone to be appended to. Accepts an `HTMLElement` or a function returning an `HTMLElement` that will be invoked before right before sorting begins                                                                                                                                                                            |
| disableAutoscroll                 | Boolean                                                  | `false`                                                                                                                   | Disables autoscrolling while dragging                                                                                                                                                                                                                                                                                                                                                                                                                                  |

- `OffsetValue` can either be a finite `Number` or a `String` made up of a number and a unit (`px` or `%`). Examples: `10` (which is the same as `"10px"`), `"50%"`

# SortableElement HOC

| Property   | Type             | Default | Required? | Description                                                                                                                                                                                                                                         |
| ---------- | ---------------- | ------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| index      | Number           |         | ✓         | This is the element's sortableIndex within it's collection. This prop is required.                                                                                                                                                                  |
| collection | Number or String | `0`     |           | The collection the element is part of. This is useful if you have multiple groups of sortable elements within the same `SortableContainer`. [Example](http://clauderic.github.io/react-sortable-hoc/#/basic-configuration/multiple-lists "Example") |
| disabled   | Boolean          | `false` |           | Whether the element should be sortable or not                                                                                                                                                                                                       |
