# react-helmet 自定义头部信息

有时候我们为了`SEO`优化，除了优化我们的内部代码，同时还需要更新我们当前标签页的`头部标题信息`，因此就需要动态设置我们的头部了，react 默认在`index.html`就是里面写死我们的标题，但我们可以**通过内部设置我们当前页的标题，以此来解决头部标签页的标题问题**

因此，有一个非常好用的库出现了`react-helmet`其使用非常简单，代码也非常少，几乎忽略不计

安装该库

```bash 
yarn add react-helmet

```


使用时，在我们需要修改标题的页面填写我们的头部标题、内容即可完成修改🤣

```typescript 
import { Helmet } from "react-helmet";

<Helmet>
    <title>我的页面</title>
    <meta name="description" content="这是我的自定义页面" />
</Helmet>

```


我们只改变一个头部名称，实际上也可以直接更新`document.title`来调整

```javascript 
document.title = '我是当前页面的新标题';

```
