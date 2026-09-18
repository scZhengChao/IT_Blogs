# less

## 目录

- [01.:global（css module）](#01globalcss-module)
- [02.css3属性选择器（css module）](#02css3属性选择器css-module)
- [03.全局样式](#03全局样式)

## 01.`:global`（css module）

在scss或者less中，这个作用域中的样式不会被加scope的序列号。也就是有类似全局css的效果。

在vue中也有类似的，叫做深度作用选择器

```javascript 
举个例子

  /* 在test.module.scss文件中 */

  .main {

    width: 100px;

    :global {

      .ant-popover-title{

        color: red;

      }

    }

打包完的结果是这样的。

  .main__3D0Xe{ width: 100px; }

  .main__3D0Xe .ant-popover-title{

    color: red;

  }

因为组件内的样式也是没有序列号的，所以可以用这个方法覆盖。
```


## 02.css3属性选择器（css module）

属性选择器是css3新增的语法

- [\[attr=val\]](https://links.jianshu.com/go?to=https://www.lanmper.cn/css/t10.html "\[attr=val]") 值等于指定值的元素
- [\[attr\~=val\]](https://links.jianshu.com/go?to=https://www.lanmper.cn/css/t11.html "\[attr~=val]") 选择包含指定值的元素
- [\[attr^=val\]](https://links.jianshu.com/go?to=https://www.lanmper.cn/css/t12.html "\[attr^=val]") \_CSS3\_选择指定值开头的元素
- [\[attr\$=val\]](https://links.jianshu.com/go?to=https://www.lanmper.cn/css/t13.html "\[attr\$=val]") \_CSS3\_选择指定值结尾的元素
- [\[attr \*=val\]](https://links.jianshu.com/go?to=https://www.lanmper.cn/css/t14.html "\[attr*=val]") \_CSS3\_包含指定值的元素
- [\[attr|=val\]](https://links.jianshu.com/go?to=https://www.lanmper.cn/css/t15.html "\[attr|=val]") 选择指定值开头

我们使用属性选择器也可以起到选中对应的dom设置样式的效果。

常用的就是按照类名包含来修改

比如下面的样式就可以覆盖antd里Modal组件的标题部分的背景色。

```javascript 
[class~='xh-modal-header'] {

  background: #ebeff8;

}
```


## 03.全局样式

最基本的一种方法，一般用来进行全局统一的样式调整。

通常是一次性覆盖所有用到组件的地方。
