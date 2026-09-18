# react-draggable

## 目录

- [属性](#属性)
  - [常用属性](#常用属性)
  - [属性列表](#属性列表)
- [事件列表](#事件列表)
- [举例](#举例)
  - [首先安装 react-draggable](#首先安装-react-draggable)
  - [实现移动](#实现移动)

[ react-draggable - npm React draggable component. Latest version: 4.4.6, last published: a year ago. Start using react-draggable in your project by running \`npm i react-draggable\`. There are 2199 other projects in the npm r https://www.npmjs.com/package/react-draggable](https://www.npmjs.com/package/react-draggable " react-draggable - npm React draggable component. Latest version: 4.4.6, last published: a year ago. Start using react-draggable in your project by running `npm i react-draggable`. There are 2199 other projects in the npm r https://www.npmjs.com/package/react-draggable")

[   https://juejin.cn/post/7206974675027984443](https://juejin.cn/post/7206974675027984443 "   https://juejin.cn/post/7206974675027984443")

# 属性

## 常用属性

| 属性       | 默认值 | 介绍                                          |
| -------- | --- | ------------------------------------------- |
| axis     | x   | handle拖动的方向，可选值 x ,y,both                   |
| handle   | 无   | 指定拖动handle的class                            |
| position | 无   | handle的位置，需要实时改变，否则handle无法拖动，类似于react的受控组件 |
| onStrat  | 方法  | 拖动开始                                        |
| onDrag   | 方法  | 拖动中                                         |
| onStop   | 方法  | 结束拖动                                        |

## 属性列表

| **属性名称**​           | 说明                                                                                                   |
| ------------------- | ---------------------------------------------------------------------------------------------------- |
| bounds              | 指定移动的边界值；可以设置的值 left:number,top:number,right:number,bottom:number                                    |
| group               | group= "name"，相同的组之间可以相互拖拽                                                                           |
| sort                | sort= "true",是否开启内部排序,如果设置为false,它所在组无法排序，在其他组可以拖动排序                                                 |
| delay               | delay= "0", 鼠标按下后多久可以拖拽                                                                              |
| touchStartThreshold | 鼠标移动多少px才能拖动元素                                                                                       |
| disabled            | disabled= "true",是否启用拖拽组件                                                                            |
| animation           | 拖动时的动画效果，还是很酷的,数字类型。如设置animation=1000表示1秒过渡动画效果                                                      |
| handle              | handle=".mover" 只有当鼠标移动到css为mover类的元素上才能拖动                                                           |
| filter              | filter=".unmover" 设置了unmover样式的元素不允许拖动                                                               |
| draggable           | draggable=".item" 那些元素是可以被拖动的                                                                        |
| ghostClass          | ghostClass="ghostClass" 设置拖动元素的占位符类名,你的自定义样式可能需要加!important才能生效，并把forceFallback属性设置成true             |
| chosenClass         | ghostClass="hostClass" 被选中目标的样式，你的自定义样式可能需要加!important才能生效，并把forceFallback属性设置成true                  |
| dragClass           | dragClass="dragClass"拖动元素的样式，你的自定义样式可能需要加!important才能生效，并把forceFallback属性设置成true                     |
| dataIdAttr          | dataIdAttr: 'data-id'                                                                                |
| forceFallback       | 默认false，忽略HTML5的拖拽行为，因为h5里有个属性也是可以拖动，你要自定义ghostClass chosenClass dragClass样式时，建议forceFallback设置为true |
| fallbackClass       | 默认false，克隆的DOM元素的类名                                                                                  |
| allbackOnBody       | 默认false，克隆的元素添加到文档的body中                                                                             |
| fallbackTolerance   | 拖拽之前应该移动的px                                                                                          |
| scroll              | 默认true,有滚动区域是否允许拖拽                                                                                   |
| scrollFn            | 滚动回调函数                                                                                               |
| scrollSensitivity   | 距离滚动区域多远时，滚动滚动条                                                                                      |
| scrollSpeed         | 滚动速度                                                                                                 |

# 事件列表

| 属性名称     | 说明                                       |
| -------- | ---------------------------------------- |
| start    | 开始拖动时触发的事件                               |
| add      | 从一个数组拖拽到另外一个数组时触发的事件                     |
| remove   | 移除事件                                     |
| update   | 拖拽变换位置时触发的事件                             |
| end      | 拖拽完成时的事件                                 |
| choose   | 鼠标点击选中要拖拽元素时的事件                          |
| unchoose | 选中后松开鼠标的事件                               |
| sort     | 位置变化时的事件                                 |
| clone    | 从一个数组拖拽到另外一个数组时触发的事件和add不同，clone是复制了数组元素 |
| move     | 自定义控制那些元素可以拖拽或不允许拖拽并控制是否允许停靠             |

# 举例

## 首先安装 react-draggable

```markdown 
yarn add react-draggable / npm i react-draggable

```


在页面中导入react-draggable

```typescript 
import Draggable from 'react-draggable'

```


## 实现移动

**在Draggable 中必须要用一个容器来包裹住你要拖动的东西，否则不能用**

1. 基本

```react jsx 
 <Draggable size={200}>
   <div>
        <div className='mover' ></div>
          <div className='unmover'>
           asdasdasd
        </div>
   </div>
</Draggable>

```


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0f5eaca0451042208779e41f3132a349~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

1. 初始化开始位置

```react jsx 
 <Draggable size={200} defaultPosition={{ x: 25, y: 25 }}>
   <div>
        <div className='mover' ></div>
          <div className='unmover'>
           asdasdasd
        </div>
   </div>
</Draggable>

```


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b03424a1a81e4fda9ca88d377872fe26~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

1. 限制拖拽范围

```typescript 
 <Draggable size={200} defaultPosition={{ x: 25, y: 25 }} 
 bounds={{ top: 0 }}
 >
   <div>
        <div className='mover' ></div>
          <div className='unmover'>
           asdasdasd
        </div>
   </div>
</Draggable>

```


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97330c92c3c6485094515699d25a5fde~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

1. 限制拖拽内容

```react jsx 
 <Draggable size={200} 
   defaultPosition={{ x: 25, y: 25 }} 
   bounds={{ top: 0 }}
   handle=".mover"
   filter=".unmover" 
 >
   <div>
        <div className='mover' ></div>
          <div className='unmover'>
           asdasdasd
        </div>
   </div>
</Draggable>

```


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f3486d6d4963425db1be835cc7f9f4f9~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)
