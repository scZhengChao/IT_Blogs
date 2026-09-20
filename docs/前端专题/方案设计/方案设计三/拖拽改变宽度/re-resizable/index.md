# re-resizable

## 目录

- [目录](#目录)
- [一、效果展示](#一效果展示)
- [二、实现方法](#二实现方法)
- [三、使用方法](#三使用方法)

[   https://www.npmjs.com/package/re-resizable](https://www.npmjs.com/package/re-resizable "   https://www.npmjs.com/package/re-resizable")

#### 目录

- \*   [一、效果展示](https://blog.csdn.net/weixin_44298385/article/details/123433601#_2 "一、效果展示")
  - [二、实现方法](https://blog.csdn.net/weixin_44298385/article/details/123433601#_8 "二、实现方法")
  - [三、使用方法](https://blog.csdn.net/weixin_44298385/article/details/123433601#_15 "三、使用方法")

### 一、效果展示

![](https://i-blog.csdnimg.cn/blog_migrate/446eb6ddbff1abb003b64cc3574fbf3e.gif#pic_center)

### 二、实现方法

![](https://i-blog.csdnimg.cn/blog_migrate/1894805d1407f92addb81fa8c44af463.png#pic_center)

此效果的实现使用了[第三方组件re-resizable](https://github.com/bokuweb/re-resizable "第三方组件re-resizable")，通过此[React](https://so.csdn.net/so/search?q=React\&spm=1001.2101.3001.7020 "React")组件可以很便捷的实现可拖拽改变组件大小的需求。

### 三、使用方法

1. 安装`re-resizable`组件。

```typescript 
npm install --save re-resizable

```


1. 简单使用

```typescript 
import React, {Component} from 'react';
import { Resizable } from "re-resizable";

export default class Demo extends Component {
    render() {
        return (
            <Resizable
                defaultSize={{width:320, height:200}}
            >
                可拖拽组件
            </Resizable>
        );
    }
}

```


1. 相关常用属性方法

| 参数              | 说明                              | 类型                            |
| --------------- | ------------------------------- | ----------------------------- |
| defaultSize     | 初始默认宽高                          | string / number               |
| minWidth        | 宽度下限                            | string / number&#xA;          |
| minHeight       | 高度下限                            | string / number               |
| maxWidth        | 宽度上限                            | string / number               |
| maxHeight       | 高度上限                            | string / number               |
| enable          | 设置可调整方向权限，可调整很多方向具体请参考官网  &#xA; |                               |
| lockAspectRatio | 用于锁定纵横比，还有相关属性方法，具体参考官网         | boolean / number              |
| bounds          | 指定边界大小                          | window / parent / HTMLElement |

1. 当组件调整时常用方法

- `onResizeStart` 调整组件开始时调用。
- `onResize` 调整组件进行时调用。
- `onResizeStop` 调整组件完成时调用。

简单的使用案例：

```typescript 
import React, {Component} from 'react';
import { Resizable } from "re-resizable";

export default class Demo extends Component {

    onResizeStart = (e) => {
        console.log("onResizeStart执行");
        console.log(e);
    };
    onResize = (e) => {
        console.log("onResize执行");
        console.log(e);
    };
    onResizeStop = (e) => {
        console.log("onResizeStop执行");
        console.log(e);
    };

    render() {
        return (
            <Resizable
                style={{background: "#8cdbd5"}}
                defaultSize={{width:320, height:200}}
                onResize={(e) => this.onResize(e)}
                onResizeStart={(e) => this.onResizeStart(e)}
                onResizeStop={(e) => this.onResizeStop(e)}
            >
                可拖拽组件
            </Resizable>
        );
    }
}


```
