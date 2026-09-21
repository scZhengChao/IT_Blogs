# field-sizing

## 目录

- [一、快速了解field-sizing](#一快速了解field-sizing)
- [二、其他输入元素](#二其他输入元素)
- [三、相比可编辑 div 的好处](#三相比可编辑-div-的好处)

最近`Chrome 123`又推出了一个新的 CSS 属性：`field-sizing`。有了它，可以轻松实现输入框尺寸自动跟随输入内容的效果，花一分钟了解一下吧\~

## 一、快速了解field-sizing

`field-sizing` 表示“场地”尺寸，在这里指的是表单输入框的尺寸，语法很简单，可以取两个值，如下

```javascript 
field-sizing: fixed | content

```


其中，`fixed`表示固定大小，也就是目前浏览器的默认行为，输入框必须要给定一个具体的尺寸

而`content`表示输入框的尺寸完全由输入内容决定。

举个例子，下面是一个文本域

```javascript 
<textarea></textarea>

```


默认表现是这样的

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b4389f49436d47f8b30e02a5ec4a66a6~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1000\&h=542\&s=129062\&e=gif\&f=215\&b=ebf5fd)

可以看到，按回车时，出现了滚动条，这个大家应该再熟悉不过了

这时，如果添加以下属性

```javascript 
textarea{
  field-sizing: content;
}

```


结果...变成了这样

![](./assets/image/image_f_wdZSL7fG.webp)

因为这时没有内容，所以也就没有了尺寸，所以一般还需要手动加个尺寸

```javascript 
textarea{
  field-sizing: content;
  width： 200px;
}

```


**现在宽度固定了，高度仍然有内容决定**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45a7936c77004606a0c7f729cc55a8dc~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1000\&h=542\&s=143490\&e=gif\&f=218\&b=ebf5fd)

这样就实现了一个回车自动增加高度的输入框了，是不是很方便？

还可以设置最小尺寸，这样就更符实际规需求了

```javascript 
textarea{
  field-sizing: content;
  width： 200px;
  min-height: 40px;
}

```


效果如下

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d16071d2c6bc4cc4b3dbab22c231227f~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1000\&h=542\&s=86814\&e=gif\&f=164\&b=ebf5fd)

## 二、其他输入元素

除了前面的文本域`textarea`，`input`也比较实用，比如要实现一个宽度自适应内容的输入框

```javascript 
input{
  min-width: 100px;
  field-sizing: content;
}

```


效果如下

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09759dd04fa541c484a8821889d47380~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1000\&h=542\&s=209585\&e=gif\&f=227\&b=ebf5fd)

另外，`select`元素也是支持的

```javascript 
<select>
  <option>HTML</option>
  <option>CSS</option>
  <option>JavaScript</option>
  <option>这是一个很长很长的选项</option>
</select>

```


默认情况下，`select`元素的宽度是由最长的那一项决定的

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a8320f818bd4280935d646f4d6ace00~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1000\&h=542\&s=367418\&e=gif\&f=171\&b=ebf5fd)

这样**在比较短的选项在选中时就比较突兀，现在我们设置自适应内容尺寸**

```javascript 
select{
  field-sizing: content;
}

```


比上面要好很多了

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b52b29727394a76aa3e48b695a7af08~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1000\&h=542\&s=526279\&e=gif\&f=206\&b=ebf5fd)

以上几个demo可以查看以下链接（Chrome 123+）

- [CSS field-sizing (juejin.cn)](https://code.juejin.cn/pen/7349831204134191131 "CSS field-sizing (juejin.cn)")

## 三、相比可编辑 div 的好处

在以往，我们通常是通过给`div`设置可编辑属性，来实现内容自适应

```javascript 
<div contenteditable="true">
  
</div>

```


虽然也能实现，但是有很多表单特性就丢失了。

1. `onchange`事件缺失，由于只是普通的`div`，所以无法监听`change`事件
2. `value`属性缺失，也就是无法通过`div.value`读取或者设置输入内容
3. `minLength`、`maxLength`属性缺失，无法直接设置最大最小长度
4. 表单提交信息缺失，无法通过默认的`new Form(表单)`来获取表单内容
5. 在 `vue`、`react`这些框架中也无法直接双向绑定等等
