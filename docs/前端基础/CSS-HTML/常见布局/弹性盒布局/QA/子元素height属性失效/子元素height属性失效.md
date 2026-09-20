# 子元素height属性失效

## 目录

- [解决办法](#解决办法)

对于设置了父元素为flex布局的子元素而言，如果没有设置`flex-shrink`，那么子元素可能会被它的兄弟元素所挤压，使得子元素的高度失效。

```javascript 
// 采用tailwindcss写法
<div class="flex flex-col overflow-scroll">
    <div class="Title w-full h-12 bg-red-400">Title</div>
    <div class="Nav w-full h-12 bg-gray-400">Nav</div>
    <div class="Breadcumbs w-fulll h-12 bg-blue-400">首页/家用涂料</div>
    <div>多个列表</div>
</div>

```


上面是一个父盒子，设置了flex属性表示它是一个flex容器。内部装了三个子盒子，均设置了高度，下面则是多个列表项。 &#x20;
如果**列表项的数目足够多，将页面撑满后会使得上面三个子盒子的高度失效，变成跟随子盒子内文字高度。** &#x20;

![](https://img-blog.csdnimg.cn/img_convert/fbc1db851a848a71fabaf3b51f99d4ee.png)

子元素`heigth`属性失效，是因为被`flex-grow`影响了。
`flex-grow`属性定义了项目的放大比例，默认为`1，`即如果空间较大，该项目将放大。
如果所有项目的`flex-grow`属性都为1，当空间较大时，都将等比例放大。如果一个项目的`flex-gorw`属性为0，其他项目都为1，则空间较大时，前者不放大。

负值对该属性无效。

`flex-shrink`属性定义了**项目的缩小比例，默认为`1`**，即如果空间不足，该项目将缩小。 &#x20;
如果所有项目的`flex-shrink`\*\*属性都为1，当空间不足时，**都将等比例缩小。**如果一个项目的****`flex-shrink`****属性为****`0`，其他项目都为1，则空间不足时，前者不缩小。  \*\*负值对该属性无效。

#### 解决办法

- **父元素没有height；只有max-height的情况下；子元素有一个flex：1**；可能导致剩下子元素height失效；flex-shrink：0； 可以解决
- **height：0**；**flex-shrink：0；** （在 iphone 12 及一下会出现bug；非常诡异的bug）
- **overflow: scroll**&#x20;
