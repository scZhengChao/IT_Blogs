# Nginx动静分离

动静分离应该是听的次数较多的性能优化方案，那先思考一个问题：**「「为什么需要做动静分离呢？它带来的好处是什么？」」** 其实这个问题也并不难回答，当你搞懂了网站的本质后，自然就理解了动静分离的重要性。先来以淘宝为例分析看看：

![](image_KTlpih6Q18.png)

当浏览器输入`www.taobao.com`访问淘宝首页时，打开开发者调试工具可以很明显的看到，首页加载会出现`100+`的请求数，而正常项目开发时，静态资源一般会放入到`resources/static/`目录下：

![](https://mmbiz.qpic.cn/mmbiz_jpg/xVsWr7feY090btJAY42ARzO3YU9qHPJHZgXULShoRSM4aibJHb5UNQiauWic6yGty5VLRfkY1IOmBl4vQJ0zd2p4g/640?wx_fmt=jpeg\&wxfrom=5\&wx_lazy=1\&wx_co=1\&random=0.7203878876450811\&tp=webp)

在项目上线部署时，这些静态资源会一起打成包，那此时思考一个问题：**「「假设淘宝也是这样干的，那么首页加载时的请求最终会去到哪儿被处理？」」** 答案毋庸置疑，首页`100+`的所有请求都会来到部署`WEB`服务的机器处理，那则代表着一个客户端请求淘宝首页，就会对后端服务器造成`100+`的并发请求。毫无疑问，这对于后端服务器的压力是尤为巨大的。

❝

但此时不妨分析看看，首页`100+`的请求中，是不是至少有`60+`是属于`*.js、*.css、*.html、*.jpg.....`这类静态资源的请求呢？答案是`Yes`。

❞

既然有这么多请求属于静态的，这些资源大概率情况下，长时间也不会出现变动，那为何还要让这些请求到后端再处理呢？能不能在此之前就提前处理掉？当然`OK`，因此经过分析之后能够明确一点：**「「****做了动静分离之后，至少能够让后端服务减少一半以上的并发量。****」」** 到此时大家应该明白了动静分离能够带来的性能收益究竟有多大。

OK\~，搞清楚动静分离的必要性之后，如何实现动静分离呢？其实非常简单，实战看看。

①先在部署`Nginx`的机器，`Nginx`目录下创建一个目录`static_resources`：

```nginx 
mkdir static_resources  

```


②将项目中所有的静态资源全部拷贝到该目录下，而后将项目中的静态资源移除重新打包。

③稍微修改一下`nginx.conf`的配置，增加一条`location`匹配规则：

```nginx 
location ~ .*\.(html|htm|gif|jpg|jpeg|bmp|png|ico|txt|js|css){  
    root   /soft/nginx/static_resources;  
    expires 7d;  
}  
```


然后照常启动nginx和移除了静态资源的WEB服务，你会发现原本的样式、js效果、图片等依旧有效，如下：

![](image_FYv30W3XQo.png)

其中`static`目录下的`nginx_style.css`文件已被移除，但效果依旧存在（绿色字体+蓝色大边框)：

![](https://mmbiz.qpic.cn/mmbiz/eQPyBffYbucU3YYnB5Fvfaw8O67WQqDzmsYVpdvtl6gE2qWy9mUT6yljnvqAETSLKGG1l39vYKXQyCqnbbPniaA/640?wx_fmt=jpeg\&wxfrom=5\&wx_lazy=1\&wx_co=1\&random=0.9401871471588625\&tp=webp)

最后解读一下那条location规则：

```nginx 
location ~ .*\.(html|htm|gif|jpg|jpeg|bmp|png|ico|txt|js|css)

```


- `~`代表匹配时区分大小写
- `.*`代表任意字符都可以出现零次或多次，即资源名不限制
- `.`代表匹配后缀分隔符.
- `(html|...|css)`代表匹配括号里所有静态资源类型

综上所述，简单一句话概述：该配置表示匹配以`.html~.css`为后缀的所有资源请求。

**「最后提一嘴，也可以将静态资源上传到文件服务器中，然后**\*\*`location`中配置一个新的`upstream`指向。」\*\*
