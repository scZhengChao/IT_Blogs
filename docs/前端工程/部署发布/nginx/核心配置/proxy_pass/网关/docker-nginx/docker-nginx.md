# docker/nginx

## 目录

- [动态资源的反向代理](#动态资源的反向代理)
  - [均衡策略](#均衡策略)
- [总结](#总结)

# 动态资源的反向代理

测试 nginx 做反向代理服务器之前，我们先创建个 nest 服务。

```bash 
npx nest new nest-app -p npm

```


![](image_dKL6fdAJnH.png)

把服务跑起来：

```bash 
npm run start:dev

```


![](image_5xwztcZMTY.png)

浏览器就访问 [http://localhost:3000](https://link.juejin.cn/?target=http://localhost:3000 "http://localhost:3000") 看到 hello world 就代表 nest 服务跑成功了：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e857fe44156440684cf014f53f35ca9~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

添加一个全局的前缀 /api

![](image_AEk-oMR5V8.png)

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/479209c942c240efb58f07ab2ca03ef4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

改下 nginx 配置，添加个路由：

```bash 
location ^~ /api {
    proxy_pass http://192.168.1.6:3000;
}

```


这个路由是根据前缀匹配 /api 开头的 url， ^\~ 是提高优先级用的。

然后复制到容器里，并 reload：

```bash 
docker cp ~/nginx-html/conf.d/default.conf nginx1:/etc/nginx/conf.d/default.conf

```


![](image_24DGTyhUmJ.png)

然后你访问 [http://localhost:81/api](https://link.juejin.cn/?target=http://localhost:81/api "http://localhost:81/api") 就可以看到 nest 服务返回的响应了：

![](image__WLpNEBj_l.png)

也就是这样的：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/027fbc84896647eeb5598ed32a8b2cd3~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

为什么要多 nginx 这一层代理呢？

自然是可以在这一层做很多事情的。

**比如修改 header：**

![](image_aqm3-kVUMc.png)

然后复制到容器里，并 reload：

```bash 
docker cp ~/nginx-html/conf.d/default.conf nginx1:/etc/nginx/conf.d/default.conf

```


![](image_HxxwnliMYA.png)

在 nest 服务的 handler 里注入 headers，打印一下：

![](image_4hsyeUop-q.png)

然后浏览器访问下。

直接访问 nest 服务的话，是没有这个 header 的：

![](image_LQ5is4TMsN.png)

![](image_wJIUqPrFZo.png)

访问 nginx 的反向代理服务器，做一次中转：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/220ff528185d418abf5f940a15b0b0e8~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/807b50f73cc144ebab6317c048f2c306~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这就是**反向代理服务器的作用，可以透明的修改请求、响应。**

而且，还可以用它**实现负载均衡**。

在 controlller 里打印下访问日志：

![](image_K6EP1-catV.png)

把 nest 服务停掉，然后重新 npm run start

![](image_G4WPJH0KAB.png)

3001 和 3002 端口各跑一个：

![](image_d9yRutorby.png)

浏览器访问下，都是正常的：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c68f71eb3dc4b6a915b9a169a7e852a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87548445dfc749b693e64ad1190758b3~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

控制台也打印了访问日志：

![](image_pFEcbMVXDD.png)

问题来了，现在有一个 nginx 服务器，两个 nest 服务器了，nginx 该如何应对呢？

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b51f76b08bc74cadae95cb0d0c6f936a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

**nginx 的解决方式就是负载均衡，把请求按照一定的规则分到不同的服务器。**

改下 nginx 配置文件：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b7e3ed96deaf4037a5aab7444ae98a3e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

**在 upstream 里配置它代理的目标服务器的所有实例。**

下面 proxy\_pass 通过 upstream 的名字来指定。

然后复制到容器里，并 reload：

```bash 
docker cp ~/nginx-html/conf.d/default.conf nginx1:/etc/nginx/conf.d/default.conf

```


![](image_C3hOBy7LzK.png)

这时候我访问 [http://localhost:81/api](https://link.juejin.cn/?target=http://localhost:81/api "http://localhost:81/api") 刷新 5 次页面：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/67d1a60b7fdf4f8b81fb9ccd6fed01ce~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

可以看到两个 nest 服务，一个 3 次，一个 2 次。

![](image_XKyGGZtIDK.png)

因为默认是轮询的方式。

## 均衡策略

一共有 4 种负载***均衡策略***：

- **轮询：默认方式。**
- **weight：在轮询基础上增加权重，也就是轮询到的几率不同。**
- **ip\_hash：按照 ip 的 hash 分配，保证每个访客的请求固定访问一个服务器，解决 session 问题。**
- **fair：按照响应时间来分配，这个需要安装 nginx-upstream-fair 插件。**

我们测试下 weight 和 ip\_hash 的方式。

**添加一个 weight=2，默认是 1，这样两个服务器轮询到的几率是 2 比 1。**

![](image_joFodW7yrd.png)

然后复制到容器里，并 reload：

```bash 
docker cp ~/nginx-html/conf.d/default.conf nginx1:/etc/nginx/conf.d/default.conf

```


![](image_B8-YUZwpuj.png)

按 command + k，把 nest 服务的控制台日志清空下：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6899294da7274c7d89002d7e60b33090~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

然后我访问了 8 次 [http://localhost:81/api](https://link.juejin.cn/?target=http://localhost:81/api "http://localhost:81/api")

看打印的日志来看，差不多就是 2:1 的轮询几率。

![](image_EMeFlOYGXS.png)

这就是带权重的轮询。

我们再试下 ip\_hash 的方式；

![](image_nHMlxWWISS.png)

然后复制到容器里，并 reload：

```bash 
docker cp ~/nginx-html/conf.d/default.conf nginx1:/etc/nginx/conf.d/default.conf

```


![](image_HuVA-ILUKL.png)

按 command + k，把 nest 服务的控制台日志清空下：

![](image_KhIUyNrmhO.png)

再次访问了 [http://localhost:81/api](https://link.juejin.cn/?target=http://localhost:81/api "http://localhost:81/api")

**可以看到一直请求到了一台服务器：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2202ecd0ee484ba58129b632b73f1777~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这就是 Nginx 的负载均衡的策略。

# 总结

除了静态资源托管外，nginx 还可以对动态资源做反向代理。

也就是请求发给 nginx，由它转发给应用服务器，这一层也可以叫做网关。

nginx 反向代理可以修改请求、响应信息，比如设置 header。

当有多台应用服务器的时候，可以通过 upstream 配置负载均衡，有 4 种策略：**轮询、带权重的轮询、ip\_hash、fair**。

掌握了静态资源托管、动态资源的反向代理+负载均衡，就算是掌握了 Nginx 的核心用法了。
