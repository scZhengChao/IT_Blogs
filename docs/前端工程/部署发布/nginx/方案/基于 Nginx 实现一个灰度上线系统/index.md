# 基于 Nginx 实现一个灰度上线系统

## 目录

- [总结](#总结)

软件开发一般不会上来就是最终版本，而是会一个版本一个版本的迭代。

新版本上线前都会经过测试，但就算这样，也不能保证上线了不出问题。

所以，在公司里上线新版本代码一般都是通过灰度系统。

**灰度系统可以把流量划分成多份，一份走新版本代码，一份走老版本代码。**

![](./image/image_3Va2zzoR6a.png)

而且**灰度系统支持设置流量的比例，比如可以把走新版本代码的流程设置为 5%，没啥问题再放到 10%，50%，最后放到 100% 全量。**

这样可以把出现问题的影响降到最低。

不然一上来就全量，万一出了线上问题，那就是大事故。

而且灰度系统不止这一个用途，**比如产品不确定某些改动是不是要的，就要做 AB 实验，也就是要把流量分成两份，一份走 A 版本代码，一份走 B 版本代码。**

那这样的灰度系统是怎么实现的呢？

其实很多都是用 nginx 实现的。

**nginx 是一个反向代理的服务，用户请求发给它，由它转发给具体的应用服务器。**（见docker下面的动态资源反向代理）

![](./image/image_VwQ3B5ok5B.png)

这**一层也叫做网关层。**

由它负责**转发请求给应用服务器，** 那自然就可以在这里控制流量的分配，哪些流量走版本 A，哪些流量走版本 B。

下面我们实现一下：

首先，我们准备两个版本的代码。

这里创建个 nest 项目：

```typescript 
npx nest new gray_test -p npm

```


![](./image/image_IXLS1Y_Ehg.png)

把 nest 服务跑起来：

```typescript 
npm run start

```


![](./image/image_B41tfZH84e.png)

浏览器访问下：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7a43ccf04054d4b8e5e7cd05f0566bc~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

看到 hello world 代表 nest 服务跑起来了。

然后改下 AppService：

![](./image/image_ohvEcKmUjP.png)

修改下端口：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f9ac916173f42f387da9660558a6998~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

然后再 npm run start：

![](./image/image_8R8n0RsUX_.png)

浏览器访问下：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cfda351df43e48808cbbfa4819ecd72a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

现在我们就有了两个版本的 nest 代码。

接下来的问题是，如何用 nginx 实现灰度，让一部分请求走一个版本的代码，一部分请求走另一个版本呢？

我们先跑一个 nginx 服务。

docker desktop 搜索 nginx 镜像（这步需要科学上网），点击 run：

![](./image/image_x_3G2RuH53.png)

设置容器名为 gray1，端口映射宿主机的 82 到容器内的 80

![](./image/image_1KNFJOoXGE.png)

现在访问 [http://localhost:82](https://link.juejin.cn/?target=http://localhost:82 "http://localhost:82") 就可以看到 nginx 页面了：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/faa73d7cac0241ad87d09f13c8f69b0b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

我们要修改下配置文件，把它复制出来：

```typescript 
docker cp gray1:/etc/nginx/conf.d ~/nginx-config

```


![](./image/image_h_HxMwLpGb.png)

然后编辑下这个 default.conf

添加这么一行配置：

```typescript 
location ^~ /api {
    rewrite ^/api/(.*)$ /$1 break;
    proxy_pass http://192.168.1.6:3001;
}

```


这行就是加了**一个路由，把 /api/ 开头的请求转发给 **[**http://宿主机IP:3001**](https://link.juejin.cn/?target=http://%E5%AE%BF%E4%B8%BB%E6%9C%BAIP:3001 "http://宿主机IP:3001")** 这个服务。**

用\*\* rewrite 把 url 重写了，比如 /api/xxx 变成了 /xxx。\*\*

然后我们重新跑个 nginx 容器：

![](./image/image_gX5C9VcxKB.png)

容器名为 gray2，端口映射 83 到容器内的 80。

指定数据卷，挂载本地**的 ～/nginx-config 目录到容器内的 /etc/nginx/conf.d 目录。**

点击 run。

然后看下 files 部分：

可以看到容器内的 /etc/nginx/conf.d 目录标识为了 mounted。

![](./image/image_jq3Z016-4F.png)

点开看看：

![](./image/image_9PIHEzEu9x.png)

这就是本地的那个文件。

我们在本地改一下试试：

![](./image/image_82mhlTI4Ea.png)

容器内也同样修改了。

![](./image/image_XkouUKY1G2.png)

**在容器内修改这个文件，本地同样也会修改。**

**也就是说挂载数据卷之后，容器内的这个目录就是本地目录，是同一份。**

然后我们访问下 [http://localhost:83/api/](https://link.juejin.cn/?target=http://localhost:83/api/ "http://localhost:83/api/") 看看：

![](./image/image_dsdrFKR2mV.png)

nest 服务访问成功了。

现在我们不**是直接访问 nest 服务了，而是经历了一层 nginx 反向代理或者说网关层。**

![](./image/image_gjXymBd057.png)

自然，我们可以在这一层实现流量控制的功能。

前面我们讲负载均衡的时候，是这么配的：

![](./image/image_RzkXNWpcHi.png)

默认会轮询把请求发给 upstream 下的 server。

现在需要有多组 upstream：

```typescript 
upstream version1.0_server {
    server 192.168.1.6:3000;
}
 
upstream version2.0_server {
    server 192.168.1.6:3001;
}

upstream default {
    server 192.168.1.6:3000;
}

```


有版本 1.0 的、版本 2.0 的，默认的 server 列表。

**然后需要根据某个条件来区分转发给哪个服务。**

**我们这里根据 cookie 来区分：**

```typescript 
set $group "default";
if ($http_cookie ~* "version=1.0"){
    set $group version1.0_server;
}

if ($http_cookie ~* "version=2.0"){
    set $group version2.0_server;
}

location ^~ /api {
    rewrite ^/api/(.*)$ /$1 break;
    proxy_pass http://$group;
}

```


如果**包含 version=1.0 的 cookie，那就走 version1.0\_server 的服务，有 version=2.0 的 cookie 就走 version2.0\_server 的服务，否则，走默认的。**

![](./image/image_7vn0FFAzYy.png)

这样就实现了流量的划分，也就是灰度的功能。

然后我们重新跑下容器：

![](./image/image_M48b-MAoUa.png)

这时候 \*\*，你访问**[**http://localhost:83/api/**](https://link.juejin.cn/?target=http://localhost:83/api/ "http://localhost:83/api/")** 走到的就是默认的版本。\*\*

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c342eceabaac41c58adfb504c26ae1dc~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

然后带上 version=2.0 的 cookie，走到的就是另一个版本的代码：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/212db4023f22441597742a814425832a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这样，我们就实现了灰度的功能。

但现在还有一个问题：

\*\*什么时候设置的这个 cookie 呢？
\*\*比如我想实现 80% 的流量走版本 1.0，20% 的流量走版本 2.0
其实公司内部一般都有灰度配置系统，可以配置不同的版本的比例，然后流量经过这个系统之后，就会返回 Set-Cookie 的 header，里面按照比例来分别设置不同的 cookie。
比如随机数载 0 到 0.2 之间，就设置 version=2.0 的 cookie，否则，设置 version=1.0 的 cookie。
这也叫做流量染色。
完整的灰度流程是这样的：

![](./image/image_bubJA_mwwV.png)

第一次请求的时候，会按照设定的比例随机对流量染色，也就是设置不同 cookie。

再次访问的时候会根据 cookie 来走到不同版本的代码。

这就实现了灰度功能，可以用来做 5% 10% 50% 100% 这样逐步上线的灰度上线机制。

也可以用来做产品的 AB 实验。

公司里都会用这样的灰度系统。

## 总结

新版本代码的上线基本都会用灰度系统，可以**逐步放量的方式来保证上线过程不会出大问题，也可以用来做产品 AB 实验。**

我们可以用 nginx 实现这样的功能。

nginx 有反向代理的功能，可以转发请求到应用服务器，也叫做网关层。

我们可以在这一层根据 cookie 里的 version 字段来决定转发请求到哪个服务。

在这之前，还需要按照比例来给流量染色，也就是返回不同的 cookie。

不管灰度系统做的有多复杂，**底层也就是流量染色、根据标记转发流量这两部分**，我们完全可以自己实现一个。
